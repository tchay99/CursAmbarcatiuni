#!/usr/bin/env node
/*
 * server.js — Server pentru Curs Ambarcațiuni (Node pur, fără dependențe npm).
 *
 * Funcționalități:
 *  - Servește aplicația (fișierele statice) DOAR utilizatorilor autentificați
 *    și aprobați.
 *  - Înregistrare printr-un LINK PRIVAT (token secret): /register?token=...
 *    Contul nou intră în starea "pending" până îl aprobă adminul.
 *  - Autentificare cu email + parolă (hash scrypt), sesiuni pe cookie semnat
 *    HMAC (stateless).
 *  - Panou de administrare (/admin): aprobare/respingere utilizatori,
 *    regenerarea linkului de înregistrare.
 *
 * Stocare: data/users.json + data/config.json (scrieri atomice). Suficient și
 * robust pentru zeci de utilizatori — fără bază de date de administrat.
 *
 * Pornire:  node server/server.js            (implicit port 3000)
 *   PORT=8080 node server/server.js
 * Creare admin:
 *   node server/server.js --create-admin admin@exemplu.ro parolaSigura123
 * Afișare link de înregistrare:
 *   node server/server.js --show-link
 */

"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = process.env.DATA_DIR || path.join(ROOT, "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const CONFIG_FILE = path.join(DATA_DIR, "config.json");
const PORT = parseInt(process.env.PORT || "3000", 10);
const SESSION_DAYS = 30;

/* ============================ Stocare ============================ */

function ensureData() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(CONFIG_FILE)) {
    atomicWrite(CONFIG_FILE, JSON.stringify({
      sessionSecret: crypto.randomBytes(32).toString("hex"),
      registrationToken: crypto.randomBytes(16).toString("hex"),
    }, null, 2));
  }
  if (!fs.existsSync(USERS_FILE)) atomicWrite(USERS_FILE, JSON.stringify({ users: [] }, null, 2));
}
function atomicWrite(file, content) {
  const tmp = file + ".tmp";
  fs.writeFileSync(tmp, content, { mode: 0o600 });
  fs.renameSync(tmp, file);
}
function loadConfig() { return JSON.parse(fs.readFileSync(CONFIG_FILE, "utf8")); }
function saveConfig(cfg) { atomicWrite(CONFIG_FILE, JSON.stringify(cfg, null, 2)); }
function loadUsers() { return JSON.parse(fs.readFileSync(USERS_FILE, "utf8")); }
function saveUsers(db) { atomicWrite(USERS_FILE, JSON.stringify(db, null, 2)); }

/* ============================ Parole ============================ */

function hashPassword(password) {
  const salt = crypto.randomBytes(16);
  const hash = crypto.scryptSync(password, salt, 64);
  return `scrypt:${salt.toString("hex")}:${hash.toString("hex")}`;
}
function verifyPassword(password, stored) {
  try {
    const [, saltHex, hashHex] = stored.split(":");
    const hash = crypto.scryptSync(password, Buffer.from(saltHex, "hex"), 64);
    return crypto.timingSafeEqual(hash, Buffer.from(hashHex, "hex"));
  } catch (_) { return false; }
}

/* ============================ Sesiuni (cookie semnat) ============================ */

function b64url(buf) { return Buffer.from(buf).toString("base64url"); }
function signSession(email, secret) {
  const payload = JSON.stringify({ e: email, x: Date.now() + SESSION_DAYS * 864e5 });
  const p = b64url(payload);
  const sig = crypto.createHmac("sha256", secret).update(p).digest("base64url");
  return `${p}.${sig}`;
}
function verifySession(token, secret) {
  if (!token || !token.includes(".")) return null;
  const [p, sig] = token.split(".");
  const expect = crypto.createHmac("sha256", secret).update(p).digest("base64url");
  try {
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expect))) return null;
    const data = JSON.parse(Buffer.from(p, "base64url").toString());
    if (Date.now() > data.x) return null;
    return data.e;
  } catch (_) { return null; }
}
function parseCookies(req) {
  const out = {};
  (req.headers.cookie || "").split(";").forEach((c) => {
    const i = c.indexOf("=");
    if (i > 0) out[c.slice(0, i).trim()] = decodeURIComponent(c.slice(i + 1).trim());
  });
  return out;
}

/* ============================ Utilitare HTTP ============================ */

const MIME = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".json": "application/json",
  ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml",
  ".mp4": "video/mp4", ".webm": "video/webm", ".ico": "image/x-icon",
  ".woff2": "font/woff2", ".md": "text/plain; charset=utf-8",
};

function sendJSON(res, code, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(code, { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(body) });
  res.end(body);
}
function readBody(req, limit = 64 * 1024) {
  return new Promise((resolve, reject) => {
    let size = 0; const chunks = [];
    req.on("data", (c) => { size += c.length; if (size > limit) { reject(new Error("too large")); req.destroy(); } else chunks.push(c); });
    req.on("end", () => { try { resolve(JSON.parse(Buffer.concat(chunks).toString() || "{}")); } catch (e) { reject(e); } });
    req.on("error", reject);
  });
}
function validEmail(e) { return typeof e === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e) && e.length <= 200; }

// Servire fișiere statice cu suport pentru Range (necesar redării video).
function serveFile(req, res, filePath) {
  fs.stat(filePath, (err, st) => {
    if (err || !st.isFile()) { res.writeHead(404); res.end("Not found"); return; }
    const ext = path.extname(filePath).toLowerCase();
    const type = MIME[ext] || "application/octet-stream";
    const range = req.headers.range;
    if (range && /^bytes=\d*-\d*$/.test(range)) {
      let [start, end] = range.replace("bytes=", "").split("-").map((v) => (v === "" ? NaN : parseInt(v, 10)));
      if (isNaN(start)) { start = st.size - end; end = st.size - 1; }
      if (isNaN(end) || end >= st.size) end = st.size - 1;
      if (start > end || start < 0) { res.writeHead(416, { "Content-Range": `bytes */${st.size}` }); res.end(); return; }
      res.writeHead(206, {
        "Content-Type": type, "Content-Length": end - start + 1,
        "Content-Range": `bytes ${start}-${end}/${st.size}`, "Accept-Ranges": "bytes",
      });
      if (req.method === "HEAD") { res.end(); return; }
      fs.createReadStream(filePath, { start, end }).pipe(res);
    } else {
      res.writeHead(200, { "Content-Type": type, "Content-Length": st.size, "Accept-Ranges": "bytes" });
      if (req.method === "HEAD") { res.end(); return; }
      fs.createReadStream(filePath).pipe(res);
    }
  });
}

/* ============================ Rate limiting simplu ============================ */

const attempts = new Map(); // ip -> {count, resetAt}
function rateLimited(ip) {
  const now = Date.now();
  const a = attempts.get(ip);
  if (!a || now > a.resetAt) { attempts.set(ip, { count: 1, resetAt: now + 15 * 60e3 }); return false; }
  a.count++;
  return a.count > 30; // max 30 încercări auth / 15 min / IP
}

/* ============================ CLI ============================ */

ensureData();
const cli = process.argv.slice(2);
if (cli[0] === "--create-admin") {
  const [, email, password] = cli;
  if (!validEmail(email) || !password || password.length < 8) {
    console.error("Utilizare: node server/server.js --create-admin email parola(min 8 caractere)");
    process.exit(1);
  }
  const db = loadUsers();
  const existing = db.users.find((u) => u.email === email.toLowerCase());
  if (existing) { existing.password = hashPassword(password); existing.role = "admin"; existing.status = "approved"; }
  else db.users.push({ email: email.toLowerCase(), password: hashPassword(password), role: "admin", status: "approved", createdAt: new Date().toISOString() });
  saveUsers(db);
  console.log(`✔ Admin ${email} ${existing ? "actualizat" : "creat"}.`);
  process.exit(0);
}
if (cli[0] === "--show-link") {
  const cfg = loadConfig();
  console.log(`Link privat de înregistrare: /register?token=${cfg.registrationToken}`);
  process.exit(0);
}

/* ============================ Pagini de autentificare ============================ */

const AUTH_CSS = `
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:"Segoe UI",system-ui,sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;
    background:linear-gradient(135deg,#0b1a3a,#14274e);color:#0f172a;padding:20px}
  .card{background:#fff;border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,.35);padding:34px;width:100%;max-width:420px}
  h1{font-size:22px;margin-bottom:4px}
  .sub{color:#64748b;font-size:14px;margin-bottom:22px}
  label{display:block;font-weight:600;font-size:14px;margin:14px 0 6px}
  input{width:100%;padding:11px 12px;border:1px solid #cbd5e1;border-radius:10px;font-size:15px}
  input:focus{outline:2px solid #2563eb;border-color:#2563eb}
  button{width:100%;margin-top:20px;padding:12px;background:#2563eb;border:none;border-radius:10px;color:#fff;font-size:16px;font-weight:700;cursor:pointer}
  button:hover{background:#1d4ed8}
  .msg{margin-top:14px;padding:10px 12px;border-radius:10px;font-size:14px;display:none}
  .msg.err{display:block;background:#fef2f2;border:1px solid #fecaca;color:#b91c1c}
  .msg.ok{display:block;background:#f0fdf4;border:1px solid #bbf7d0;color:#166534}
  .alt{margin-top:16px;text-align:center;font-size:14px}
  .alt a{color:#2563eb}
  .logo{font-size:34px;text-align:center;margin-bottom:10px}`;

function loginPage() {
  return `<!DOCTYPE html><html lang="ro"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Autentificare — Curs Ambarcațiuni</title><style>${AUTH_CSS}</style></head><body>
<div class="card"><div class="logo">⚓</div>
<h1>Curs Conducător de Ambarcațiune</h1><p class="sub">Autentifică-te pentru a accesa cursul.</p>
<form id="f"><label>Email</label><input type="email" id="email" required autocomplete="username">
<label>Parolă</label><input type="password" id="pass" required autocomplete="current-password">
<button type="submit">Intră în cont</button><div class="msg" id="msg"></div></form>
<p class="alt">Nu ai cont? Înregistrarea se face doar pe bază de invitație (link privat).</p></div>
<script>
document.getElementById('f').addEventListener('submit', async (e) => {
  e.preventDefault();
  const msg = document.getElementById('msg'); msg.className = 'msg';
  const r = await fetch('/api/login', {method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({email: document.getElementById('email').value, password: document.getElementById('pass').value})});
  const d = await r.json();
  if (r.ok) location.href = '/';
  else { msg.textContent = d.error || 'Eroare'; msg.className = 'msg err'; }
});
</script></body></html>`;
}

function registerPage(tokenValid) {
  if (!tokenValid) {
    return `<!DOCTYPE html><html lang="ro"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Înregistrare — Curs Ambarcațiuni</title><style>${AUTH_CSS}</style></head><body>
<div class="card"><div class="logo">🔒</div><h1>Link de înregistrare invalid</h1>
<p class="sub">Înregistrarea se face doar printr-un link privat de invitație. Cere administratorului linkul corect.</p>
<p class="alt"><a href="/login">Înapoi la autentificare</a></p></div></body></html>`;
  }
  return `<!DOCTYPE html><html lang="ro"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Înregistrare — Curs Ambarcațiuni</title><style>${AUTH_CSS}</style></head><body>
<div class="card"><div class="logo">⚓</div>
<h1>Creează-ți contul</h1><p class="sub">După înregistrare, contul tău va fi activat de administrator.</p>
<form id="f"><label>Email</label><input type="email" id="email" required autocomplete="username">
<label>Parolă (minim 8 caractere)</label><input type="password" id="pass" required minlength="8" autocomplete="new-password">
<label>Confirmă parola</label><input type="password" id="pass2" required minlength="8" autocomplete="new-password">
<button type="submit">Creează contul</button><div class="msg" id="msg"></div></form>
<p class="alt"><a href="/login">Ai deja cont? Autentifică-te</a></p></div>
<script>
document.getElementById('f').addEventListener('submit', async (e) => {
  e.preventDefault();
  const msg = document.getElementById('msg'); msg.className = 'msg';
  const p1 = document.getElementById('pass').value, p2 = document.getElementById('pass2').value;
  if (p1 !== p2) { msg.textContent = 'Parolele nu coincid.'; msg.className = 'msg err'; return; }
  const token = new URLSearchParams(location.search).get('token');
  const r = await fetch('/api/register', {method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({email: document.getElementById('email').value, password: p1, token})});
  const d = await r.json();
  if (r.ok) { msg.textContent = 'Cont creat! Vei putea intra după ce administratorul îți aprobă contul.'; msg.className = 'msg ok'; e.target.querySelector('button').disabled = true; }
  else { msg.textContent = d.error || 'Eroare'; msg.className = 'msg err'; }
});
</script></body></html>`;
}

function pendingPage(email) {
  return `<!DOCTYPE html><html lang="ro"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Cont în așteptare — Curs Ambarcațiuni</title><style>${AUTH_CSS}</style></head><body>
<div class="card"><div class="logo">⏳</div><h1>Contul așteaptă aprobarea</h1>
<p class="sub">Contul <strong>${email}</strong> a fost creat, dar nu a fost încă aprobat de administrator. Revino după aprobare.</p>
<p class="alt"><a href="#" onclick="fetch('/api/logout',{method:'POST'}).then(()=>location.href='/login');return false;">Deconectare</a></p>
</div></body></html>`;
}

function adminPage() {
  return `<!DOCTYPE html><html lang="ro"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Administrare — Curs Ambarcațiuni</title><style>${AUTH_CSS}
  body{align-items:flex-start;padding-top:40px}
  .card{max-width:760px}
  table{width:100%;border-collapse:collapse;margin-top:10px;font-size:14px}
  th,td{text-align:left;padding:9px 10px;border-bottom:1px solid #e2e8f0}
  th{color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:.4px}
  .b{padding:6px 12px;border-radius:8px;border:none;cursor:pointer;font-weight:600;font-size:13px;width:auto;margin:0 4px 0 0}
  .b.ok{background:#16a34a;color:#fff}.b.no{background:#dc2626;color:#fff}.b.gray{background:#e2e8f0;color:#0f172a}
  .tag{padding:3px 10px;border-radius:999px;font-size:12px;font-weight:700}
  .tag.pending{background:#fef3c7;color:#92400e}.tag.approved{background:#dcfce7;color:#166534}.tag.rejected{background:#fee2e2;color:#991b1b}
  .linkbox{display:flex;gap:8px;margin-top:8px}
  .linkbox input{flex:1;font-size:13px;background:#f8fafc}
  .top{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}
  h2{font-size:17px;margin-top:26px}</style></head><body>
<div class="card">
  <div class="top"><h1>⚓ Panou de administrare</h1>
    <button class="b gray" onclick="fetch('/api/logout',{method:'POST'}).then(()=>location.href='/login')">Deconectare</button></div>
  <p class="sub">Aprobă sau respinge utilizatori; distribuie linkul privat de înregistrare.</p>

  <h2>Link privat de înregistrare</h2>
  <div class="linkbox"><input id="reglink" readonly>
    <button class="b gray" onclick="navigator.clipboard.writeText(document.getElementById('reglink').value)">Copiază</button>
    <button class="b no" onclick="rotate()" title="Invalidează linkul curent și generează altul">Regenerează</button></div>

  <h2>Utilizatori</h2>
  <table><thead><tr><th>Email</th><th>Stare</th><th>Creat</th><th>Acțiuni</th></tr></thead><tbody id="rows"></tbody></table>
  <p class="alt"><a href="/">← Înapoi la curs</a></p>
</div>
<script>
async function load() {
  const r = await fetch('/api/admin/users'); if (!r.ok) { location.href = '/'; return; }
  const d = await r.json();
  document.getElementById('reglink').value = location.origin + '/register?token=' + d.registrationToken;
  document.getElementById('rows').innerHTML = d.users.map(u => \`
    <tr><td>\${u.email}\${u.role==='admin' ? ' 👑' : ''}</td>
    <td><span class="tag \${u.status}">\${{pending:'în așteptare',approved:'aprobat',rejected:'respins'}[u.status]||u.status}</span></td>
    <td>\${(u.createdAt||'').slice(0,10)}</td>
    <td>\${u.role==='admin' ? '' : \`
      \${u.status!=='approved' ? \`<button class="b ok" onclick="act('approve','\${u.email}')">Aprobă</button>\` : ''}
      \${u.status!=='rejected' ? \`<button class="b no" onclick="act('reject','\${u.email}')">Respinge</button>\` : ''}
      <button class="b gray" onclick="if(confirm('Ștergi contul \${u.email}?'))act('delete','\${u.email}')">Șterge</button>\`}</td></tr>\`).join('')
    || '<tr><td colspan="4" style="color:#64748b">Niciun utilizator încă.</td></tr>';
}
async function act(action, email) {
  await fetch('/api/admin/' + action, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({email})});
  load();
}
async function rotate() {
  if (!confirm('Linkul curent devine invalid. Continui?')) return;
  await fetch('/api/admin/rotate-link', {method:'POST'});
  load();
}
load();
</script></body></html>`;
}

/* ============================ Serverul HTTP ============================ */

// Căi statice permise (whitelist de prefixe în interiorul ROOT).
const STATIC_PREFIXES = ["/index.html", "/assets/", "/videos/"];

function resolveStatic(urlPath) {
  if (urlPath === "/") urlPath = "/index.html";
  if (!STATIC_PREFIXES.some((p) => urlPath === p || urlPath.startsWith(p))) return null;
  const full = path.normalize(path.join(ROOT, decodeURIComponent(urlPath)));
  if (!full.startsWith(ROOT + path.sep)) return null; // anti path-traversal
  return full;
}

const server = http.createServer(async (req, res) => {
  const cfg = loadConfig();
  const url = new URL(req.url, "http://x");
  const p = url.pathname;
  const ip = req.socket.remoteAddress || "?";
  const cookies = parseCookies(req);
  const sessionEmail = verifySession(cookies.session, cfg.sessionSecret);
  const db = loadUsers();
  const user = sessionEmail ? db.users.find((u) => u.email === sessionEmail) : null;
  const authed = user && user.status === "approved";

  const setSession = (email) => {
    const secure = req.headers["x-forwarded-proto"] === "https" ? " Secure;" : "";
    res.setHeader("Set-Cookie",
      `session=${signSession(email, cfg.sessionSecret)}; HttpOnly;${secure} SameSite=Lax; Path=/; Max-Age=${SESSION_DAYS * 86400}`);
  };
  const clearSession = () => res.setHeader("Set-Cookie", "session=; HttpOnly; Path=/; Max-Age=0");

  try {
    /* ---------- API ---------- */
    if (p === "/api/login" && req.method === "POST") {
      if (rateLimited(ip)) return sendJSON(res, 429, { error: "Prea multe încercări. Reîncearcă în 15 minute." });
      const { email, password } = await readBody(req);
      const u = validEmail(email) && db.users.find((x) => x.email === email.toLowerCase());
      if (!u || !verifyPassword(password || "", u.password)) return sendJSON(res, 401, { error: "Email sau parolă incorecte." });
      if (u.status === "rejected") return sendJSON(res, 403, { error: "Contul a fost respins de administrator." });
      setSession(u.email);
      return sendJSON(res, 200, { ok: true, status: u.status, role: u.role });
    }
    if (p === "/api/register" && req.method === "POST") {
      if (rateLimited(ip)) return sendJSON(res, 429, { error: "Prea multe încercări. Reîncearcă în 15 minute." });
      const { email, password, token } = await readBody(req);
      if (token !== cfg.registrationToken) return sendJSON(res, 403, { error: "Link de înregistrare invalid." });
      if (!validEmail(email)) return sendJSON(res, 400, { error: "Email invalid." });
      if (!password || password.length < 8) return sendJSON(res, 400, { error: "Parola trebuie să aibă minim 8 caractere." });
      if (db.users.find((x) => x.email === email.toLowerCase())) return sendJSON(res, 409, { error: "Există deja un cont cu acest email." });
      db.users.push({ email: email.toLowerCase(), password: hashPassword(password), role: "user", status: "pending", createdAt: new Date().toISOString() });
      saveUsers(db);
      return sendJSON(res, 200, { ok: true });
    }
    if (p === "/api/logout" && req.method === "POST") { clearSession(); return sendJSON(res, 200, { ok: true }); }
    if (p === "/api/me") {
      if (!user) return sendJSON(res, 401, { error: "neautentificat" });
      return sendJSON(res, 200, { email: user.email, status: user.status, role: user.role });
    }

    /* ---------- API admin ---------- */
    if (p.startsWith("/api/admin/")) {
      if (!authed || user.role !== "admin") return sendJSON(res, 403, { error: "Doar pentru administratori." });
      if (p === "/api/admin/users" && req.method === "GET") {
        return sendJSON(res, 200, {
          registrationToken: cfg.registrationToken,
          users: db.users.map(({ email, role, status, createdAt }) => ({ email, role, status, createdAt })),
        });
      }
      if (req.method === "POST") {
        if (p === "/api/admin/rotate-link") {
          cfg.registrationToken = crypto.randomBytes(16).toString("hex");
          saveConfig(cfg);
          return sendJSON(res, 200, { ok: true });
        }
        const { email } = await readBody(req);
        const target = db.users.find((x) => x.email === (email || "").toLowerCase());
        if (!target) return sendJSON(res, 404, { error: "Utilizator inexistent." });
        if (target.role === "admin") return sendJSON(res, 400, { error: "Nu poți modifica un admin." });
        if (p === "/api/admin/approve") target.status = "approved";
        else if (p === "/api/admin/reject") target.status = "rejected";
        else if (p === "/api/admin/delete") db.users = db.users.filter((x) => x !== target);
        else return sendJSON(res, 404, { error: "necunoscut" });
        saveUsers(db);
        return sendJSON(res, 200, { ok: true });
      }
    }

    /* ---------- Pagini de autentificare ---------- */
    if (p === "/login") { res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" }); return res.end(loginPage()); }
    if (p === "/register") {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      return res.end(registerPage(url.searchParams.get("token") === cfg.registrationToken));
    }
    if (p === "/admin") {
      if (!authed || user.role !== "admin") { res.writeHead(302, { Location: "/login" }); return res.end(); }
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      return res.end(adminPage());
    }

    /* ---------- Aplicația (protejată) ---------- */
    if (!user) { res.writeHead(302, { Location: "/login" }); return res.end(); }
    if (!authed) { res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" }); return res.end(pendingPage(user.email)); }

    const filePath = resolveStatic(p);
    if (!filePath) { res.writeHead(404); return res.end("Not found"); }
    return serveFile(req, res, filePath);
  } catch (err) {
    return sendJSON(res, 400, { error: "Cerere invalidă." });
  }
});

server.listen(PORT, () => {
  const cfg = loadConfig();
  console.log(`⚓ Curs Ambarcațiuni pornit pe http://0.0.0.0:${PORT}`);
  console.log(`   Link privat de înregistrare: /register?token=${cfg.registrationToken}`);
  console.log(`   Panou admin: /admin  (creează un admin cu: node server/server.js --create-admin email parola)`);
});
