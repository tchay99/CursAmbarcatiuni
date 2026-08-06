/*
 * sw.js — Service worker-ul aplicației „Tabla înmulțirii”.
 *
 * La instalare descarcă tot (pagina + cele 10 videoclipuri, ~13MB) în Cache
 * Storage, ca aplicația să meargă complet offline după prima vizită.
 *
 * Videoclipurile cer atenție specială pe iOS: playerul cere intervale de
 * octeți (antet Range), iar un răspuns 200 întreg din cache îl blochează.
 * De aceea cererile video primesc felii 206 tăiate manual din copia salvată.
 */
const CACHE = "tabla-v1";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icons/icon-180.png", "./icons/icon-192.png", "./icons/icon-512.png"];
const VIDEOS = Array.from({ length: 10 }, (_, i) => "./videos/tabla-" + String(i + 1).padStart(2, "0") + ".mp4");

self.addEventListener("install", (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await c.addAll(SHELL);
    // videoclipurile pe rând — dacă unul pică (rețea slabă), instalarea nu
    // eșuează: se va salva la prima redare
    for (const v of VIDEOS) {
      try { if (!(await c.match(v))) await c.add(v); } catch (_) {}
    }
    self.skipWaiting();
  })());
});

self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== CACHE) await caches.delete(k);
    await self.clients.claim();
  })());
});

async function videoResponse(req) {
  const c = await caches.open(CACHE);
  let full = await c.match(req.url);
  if (!full) {
    try { await c.add(req.url); full = await c.match(req.url); } catch (_) {}
  }
  if (!full) return fetch(req);

  const buf = await full.arrayBuffer();
  const range = req.headers.get("range");
  if (!range) {
    return new Response(buf, { status: 200, headers: {
      "Content-Type": "video/mp4", "Content-Length": String(buf.byteLength), "Accept-Ranges": "bytes",
    }});
  }
  const m = /bytes=(\d+)-(\d*)/.exec(range);
  const start = Number(m[1]);
  const end = m[2] ? Math.min(Number(m[2]), buf.byteLength - 1) : buf.byteLength - 1;
  return new Response(buf.slice(start, end + 1), { status: 206, headers: {
    "Content-Type": "video/mp4",
    "Content-Range": "bytes " + start + "-" + end + "/" + buf.byteLength,
    "Content-Length": String(end - start + 1),
    "Accept-Ranges": "bytes",
  }});
}

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin || e.request.method !== "GET") return;

  if (url.pathname.endsWith(".mp4")) {
    e.respondWith(videoResponse(e.request));
    return;
  }
  e.respondWith((async () => {
    const cached = await caches.match(e.request, { ignoreSearch: true });
    if (cached) return cached;
    const resp = await fetch(e.request);
    if (resp.ok) (await caches.open(CACHE)).put(e.request, resp.clone());
    return resp;
  })());
});
