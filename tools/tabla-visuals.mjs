/*
 * tabla-visuals.mjs — Grafica „Cântecelului tablei înmulțirii”.
 *
 * Obiectele tematice sunt desenate programatic ca SVG (nu emoji — fonturile
 * headless nu au emoji color) și instanțiate cu <use>, ca să țină cadrele mici.
 * Mascota „Steluțul Socotel” are stări de gură (vorbește) și poză de urale.
 *
 * Scenele unui capitol:
 *   intro  — titlul capitolului + trucul de memorare;
 *   verse  — lista înmulțirilor capitolului, care se completează pe măsură
 *            ce vocea le narează (cele precedente rămân la vedere), plus
 *            rețeaua de obiecte a×b care crește cu un rând per operație;
 *   outro  — „Bravo!” cu confetti.
 */

/* ---------- Obiectele tematice (definite o dată, folosite cu <use>) ---------- */
const OBJECT_DEFS = {
  star: `<g id="ob"><path d="M20 2 L24.7 14.2 L37.8 14.9 L27.6 23.2 L31 35.8 L20 28.6 L9 35.8 L12.4 23.2 L2.2 14.9 L15.3 14.2 Z"
      fill="#fbbf24" stroke="#d97706" stroke-width="1.6" stroke-linejoin="round"/>
    <circle cx="15.5" cy="19" r="1.7" fill="#78350f"/><circle cx="24.5" cy="19" r="1.7" fill="#78350f"/>
    <path d="M15.5 24 Q20 27.5 24.5 24" fill="none" stroke="#78350f" stroke-width="1.6" stroke-linecap="round"/></g>`,
  duck: `<g id="ob"><ellipse cx="18" cy="26" rx="14" ry="10" fill="#fde047" stroke="#ca8a04" stroke-width="1.4"/>
    <path d="M28 24 Q34 22 33 28 Q30 32 25 31 Z" fill="#facc15" stroke="#ca8a04" stroke-width="1.2"/>
    <circle cx="13" cy="13" r="8.5" fill="#fde047" stroke="#ca8a04" stroke-width="1.4"/>
    <path d="M5.5 13 L-0.5 15 L5.8 16.8 Z" fill="#fb923c" stroke="#c2410c" stroke-width="1"/>
    <circle cx="11" cy="11" r="1.8" fill="#422006"/>
    <path d="M14 27 Q20 24 24 28" fill="none" stroke="#ca8a04" stroke-width="1.4" stroke-linecap="round"/></g>`,
  flower: `<g id="ob"><g fill="#f472b6" stroke="#be185d" stroke-width="1.2">
      <circle cx="20" cy="8" r="7"/><circle cx="31.4" cy="16.3" r="7"/><circle cx="27" cy="29.7" r="7"/>
      <circle cx="13" cy="29.7" r="7"/><circle cx="8.6" cy="16.3" r="7"/></g>
    <circle cx="20" cy="20" r="6.5" fill="#fde047" stroke="#ca8a04" stroke-width="1.4"/>
    <circle cx="18" cy="18.5" r="1.2" fill="#92400e"/><circle cx="22" cy="18.5" r="1.2" fill="#92400e"/>
    <path d="M17.5 22 Q20 24 22.5 22" fill="none" stroke="#92400e" stroke-width="1.2" stroke-linecap="round"/></g>`,
  apple: `<g id="ob"><path d="M20 10 C 28 4 37 9 36.5 19 C 36 29 29 37 20 37 C 11 37 4 29 3.5 19 C 3 9 12 4 20 10 Z"
      fill="#ef4444" stroke="#b91c1c" stroke-width="1.6"/>
    <path d="M20 9 Q19 4 16 1.5" fill="none" stroke="#78350f" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M21 6 Q28 1 31 5 Q27 9 21 6 Z" fill="#4ade80" stroke="#15803d" stroke-width="1.2"/>
    <ellipse cx="12" cy="16" rx="3.4" ry="5" fill="#fca5a5" opacity=".75" transform="rotate(-18 12 16)"/></g>`,
  bee: `<g id="ob"><ellipse cx="13" cy="8.5" rx="7.5" ry="5.5" fill="#bfdbfe" stroke="#60a5fa" stroke-width="1.2" opacity=".9" transform="rotate(-22 13 8.5)"/>
    <ellipse cx="27" cy="8.5" rx="7.5" ry="5.5" fill="#bfdbfe" stroke="#60a5fa" stroke-width="1.2" opacity=".9" transform="rotate(22 27 8.5)"/>
    <ellipse cx="20" cy="23" rx="14" ry="10.5" fill="#fde047" stroke="#a16207" stroke-width="1.6"/>
    <path d="M13 13.6 L13 32.4 M20 12.6 L20 33.6 M27 13.6 L27 32.4" stroke="#1c1917" stroke-width="3.4" stroke-linecap="round"/>
    <circle cx="8.5" cy="20" r="2" fill="#1c1917"/><path d="M33.5 23 L38.5 23" stroke="#1c1917" stroke-width="1.6" stroke-linecap="round"/></g>`,
  ladybug: `<g id="ob"><circle cx="20" cy="12" r="6.5" fill="#1c1917"/>
    <path d="M14.5 8 L11 3.5 M25.5 8 L29 3.5" stroke="#1c1917" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M4 22 A16 14 0 0 1 36 22 A16 14 0 0 1 4 22 Z" fill="#ef4444" stroke="#991b1b" stroke-width="1.6"/>
    <path d="M20 9 L20 35" stroke="#1c1917" stroke-width="2"/>
    <circle cx="12" cy="19" r="2.6" fill="#1c1917"/><circle cx="28" cy="19" r="2.6" fill="#1c1917"/>
    <circle cx="14" cy="28" r="2.6" fill="#1c1917"/><circle cx="26" cy="28" r="2.6" fill="#1c1917"/>
    <circle cx="17.6" cy="11" r="1.4" fill="#fff"/><circle cx="22.4" cy="11" r="1.4" fill="#fff"/></g>`,
  balloon: `<g id="ob"><path d="M20 32 Q17 36 20 39 Q23 36 20 32" fill="none" stroke="#9a3412" stroke-width="1.4"/>
    <ellipse cx="20" cy="16" rx="13" ry="15.5" fill="#fb923c" stroke="#c2410c" stroke-width="1.6"/>
    <path d="M17 31 L23 31 L20 34.5 Z" fill="#c2410c"/>
    <ellipse cx="14.5" cy="10" rx="3.6" ry="5.5" fill="#fed7aa" opacity=".85" transform="rotate(-20 14.5 10)"/></g>`,
  fish: `<g id="ob"><path d="M4 20 L11 12 L11 28 Z" fill="#fb923c" stroke="#c2410c" stroke-width="1.4" stroke-linejoin="round"/>
    <ellipse cx="23" cy="20" rx="14" ry="10" fill="#fdba74" stroke="#c2410c" stroke-width="1.6"/>
    <path d="M20 11.5 Q25 6 28 11 Q25 13.5 20 11.5 Z" fill="#fb923c" stroke="#c2410c" stroke-width="1.2"/>
    <circle cx="29.5" cy="17.5" r="2.2" fill="#1c1917"/><circle cx="30.2" cy="16.8" r=".8" fill="#fff"/>
    <path d="M20 16 Q17 20 20 24" fill="none" stroke="#c2410c" stroke-width="1.4"/></g>`,
  butterfly: `<g id="ob"><path d="M19 18 Q8 4 4.5 9 Q1.5 14 12 20 Q2 25 5.5 30.5 Q9.5 34 19 22 Z"
      fill="#c084fc" stroke="#7e22ce" stroke-width="1.4" stroke-linejoin="round"/>
    <path d="M21 18 Q32 4 35.5 9 Q38.5 14 28 20 Q38 25 34.5 30.5 Q30.5 34 21 22 Z"
      fill="#5eead4" stroke="#0f766e" stroke-width="1.4" stroke-linejoin="round"/>
    <ellipse cx="20" cy="21" rx="2.6" ry="9" fill="#44403c"/>
    <path d="M18.5 12 L15.5 7 M21.5 12 L24.5 7" stroke="#44403c" stroke-width="1.4" stroke-linecap="round"/>
    <circle cx="9" cy="13" r="2.2" fill="#f0abfc"/><circle cx="31" cy="13" r="2.2" fill="#99f6e4"/></g>`,
  candy: `<g id="ob"><path d="M8 20 L1 13 L4 20 L1 27 Z" fill="#f472b6" stroke="#be185d" stroke-width="1.3" stroke-linejoin="round"/>
    <path d="M32 20 L39 13 L36 20 L39 27 Z" fill="#f472b6" stroke="#be185d" stroke-width="1.3" stroke-linejoin="round"/>
    <circle cx="20" cy="20" r="11" fill="#f9a8d4" stroke="#be185d" stroke-width="1.6"/>
    <path d="M20 9.5 A10.5 10.5 0 0 1 20 30.5 A5 5 0 0 1 20 20 A5 5 0 0 0 20 9.5 Z" fill="#fff" opacity=".85"/></g>`,
};

/* ---------- Mascota: Steluțul Socotel ---------- */
export function mascotSVG({ mouthOpen = false, cheer = false } = {}) {
  const arms = cheer
    ? `<path d="M62 150 Q40 120 34 96" fill="none" stroke="#b45309" stroke-width="9" stroke-linecap="round"/>
       <path d="M178 150 Q200 120 206 96" fill="none" stroke="#b45309" stroke-width="9" stroke-linecap="round"/>
       <circle cx="32" cy="90" r="10" fill="#fbbf24" stroke="#b45309" stroke-width="3"/>
       <circle cx="208" cy="90" r="10" fill="#fbbf24" stroke="#b45309" stroke-width="3"/>`
    : `<path d="M62 150 Q40 170 36 192" fill="none" stroke="#b45309" stroke-width="9" stroke-linecap="round"/>
       <path d="M178 150 Q200 170 204 192" fill="none" stroke="#b45309" stroke-width="9" stroke-linecap="round"/>
       <circle cx="35" cy="198" r="10" fill="#fbbf24" stroke="#b45309" stroke-width="3"/>
       <circle cx="205" cy="198" r="10" fill="#fbbf24" stroke="#b45309" stroke-width="3"/>`;
  const mouth = mouthOpen
    ? `<ellipse cx="120" cy="165" rx="16" ry="11" fill="#7c2d12"/><ellipse cx="120" cy="169" rx="9" ry="5" fill="#f87171"/>`
    : `<path d="M102 162 Q120 176 138 162" fill="none" stroke="#7c2d12" stroke-width="6" stroke-linecap="round"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 300" width="240" height="300">
  <path d="M120 22 L148 96 L226 100 L165 150 L186 226 L120 182 L54 226 L75 150 L14 100 L92 96 Z"
    fill="#fbbf24" stroke="#d97706" stroke-width="7" stroke-linejoin="round"/>
  ${arms}
  <path d="M96 226 L92 266 M144 226 L148 266" stroke="#b45309" stroke-width="9" stroke-linecap="round"/>
  <ellipse cx="88" cy="272" rx="15" ry="8" fill="#dc2626"/><ellipse cx="152" cy="272" rx="15" ry="8" fill="#dc2626"/>
  <circle cx="98" cy="128" r="9" fill="#1c1917"/><circle cx="142" cy="128" r="9" fill="#1c1917"/>
  <circle cx="101" cy="125" r="3" fill="#fff"/><circle cx="145" cy="125" r="3" fill="#fff"/>
  <path d="M84 112 Q98 104 110 111 M130 111 Q142 104 156 112" fill="none" stroke="#b45309" stroke-width="5" stroke-linecap="round"/>
  <circle cx="88" cy="150" r="8" fill="#fb923c" opacity=".65"/><circle cx="152" cy="150" r="8" fill="#fb923c" opacity=".65"/>
  ${mouth}
  <path d="M86 52 Q120 -14 158 46 L146 58 Q120 20 98 60 Z" fill="#7c3aed" stroke="#5b21b6" stroke-width="4" stroke-linejoin="round"/>
  <circle cx="158" cy="44" r="8" fill="#fde047" stroke="#ca8a04" stroke-width="2.5"/>
  <path d="M104 44 l3 7 8 1 -6 5 2 8 -7 -4 -7 4 2 -8 -6 -5 8 -1 Z" fill="#fde047"/>
</svg>`;
}

/* ---------- Ajutoare de așezare în pagină ---------- */
const NUM_WORDS = ["", "unu", "doi", "trei", "patru", "cinci", "șase", "șapte", "opt", "nouă", "zece"];
export const numWord = (n) => NUM_WORDS[n];

/*
 * Rețeaua de obiecte pentru a×b: b rânduri a câte a obiecte — crește cu un
 * rând la fiecare operație a capitolului (modelul „array” al înmulțirii).
 */
function arrayHTML(ch, verse, panelW, panelH) {
  const { a, b } = verse;
  const os = Math.max(16, Math.min(46, Math.floor(panelW / a) - 4, Math.floor(panelH / b) - 4));
  const gw = a * (os + 4), gh = b * (os + 4);
  let objs = "";
  for (let r = 0; r < b; r++) {
    for (let c = 0; c < a; c++) {
      objs += `<svg viewBox="0 0 40 40" style="position:absolute;width:${os}px;height:${os}px;
        left:${Math.round((panelW - gw) / 2 + c * (os + 4))}px;top:${Math.round((panelH - gh) / 2 + r * (os + 4))}px"><use href="#ob"/></svg>`;
    }
  }
  return `<div style="position:relative;width:${panelW}px;height:${panelH}px">${objs}</div>`;
}

/* ---------- Șablonul general al cadrului (1280×720) ---------- */
function shell(ch, headerRight, visualHTML, bubbleHTML, mascotState) {
  return `<!DOCTYPE html><html lang="ro"><head><meta charset="utf-8"><style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:1280px; height:720px; overflow:hidden; font-family:"DejaVu Sans",sans-serif;
    background:linear-gradient(140deg,${ch.theme.bg1},${ch.theme.bg2}); display:flex; flex-direction:column; }
  .top { height:60px; display:flex; align-items:center; justify-content:space-between; padding:0 26px; }
  .top .brand { color:rgba(255,255,255,.85); font-weight:bold; font-size:20px; }
  .top .right { color:#fff; font-size:19px; font-weight:bold; background:rgba(0,0,0,.28);
    border-radius:999px; padding:5px 18px; }
  .main { flex:1; display:flex; gap:14px; padding:0 20px; }
  .visual { width:952px; display:flex; flex-direction:column; }
  .narr { flex:1; display:flex; flex-direction:column; gap:10px; }
  .avatar { flex:1; background:rgba(0,0,0,.25); border-radius:16px; border:3px solid rgba(255,255,255,.35);
    display:flex; align-items:flex-end; justify-content:center; overflow:hidden; }
  .avatar svg { width:82%; }
  .plate { background:rgba(0,0,0,.35); border:2px solid rgba(255,255,255,.3); border-radius:12px;
    color:#fff; text-align:center; padding:8px 6px; }
  .plate .nm { font-weight:bold; font-size:19px; }
  .plate .rl { font-size:13px; opacity:.8; margin-top:2px; }
  .chip { background:${ch.theme.accent}; color:#1c1917; border-radius:12px; text-align:center;
    padding:8px 6px; font-weight:bold; font-size:17px; }
  .bubble { height:96px; margin:12px 20px 16px; background:#fff; border-radius:20px;
    display:flex; align-items:center; justify-content:center; gap:14px; padding:0 28px;
    box-shadow:0 8px 26px rgba(0,0,0,.35); text-align:center; }
  svg.defs { position:absolute; width:0; height:0; }
  </style></head><body>
  <svg class="defs" xmlns="http://www.w3.org/2000/svg"><defs>${OBJECT_DEFS[ch.theme.object]}</defs></svg>
  <div class="top">
    <span class="brand">♪ Cântecelul tablei înmulțirii</span>
    <span class="right">${headerRight}</span>
  </div>
  <div class="main">
    <div class="visual">${visualHTML}</div>
    <div class="narr">
      <div class="avatar">${mascotSVG(mascotState)}</div>
      <div class="plate"><div class="nm">Steluțul Socotel</div><div class="rl">cântă cu tine</div></div>
      <div class="chip">Tabla cu ${ch.n}</div>
    </div>
  </div>
  <div class="bubble">${bubbleHTML}</div>
</body></html>`;
}

/* ---------- Scenele ---------- */
export function introHTML(ch, mouthOpen) {
  const objs = Array.from({ length: ch.n }, () =>
    `<svg viewBox="0 0 40 40" style="width:64px;height:64px"><use href="#ob"/></svg>`).join("");
  const visual = `
    <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:22px">
      <div style="color:#fff;font-size:40px;font-weight:bold;text-shadow:0 3px 10px rgba(0,0,0,.4)">Capitolul ${ch.n}</div>
      <div style="display:flex;align-items:center;gap:26px">
        <div style="color:#fff;font-size:52px;font-weight:bold;text-shadow:0 3px 10px rgba(0,0,0,.4)">Înmulțirea cu</div>
        <div style="width:150px;height:150px;border-radius:50%;background:${ch.theme.accent};display:flex;
          align-items:center;justify-content:center;font-size:92px;font-weight:bold;color:#1c1917;
          border:6px solid #fff;box-shadow:0 8px 30px rgba(0,0,0,.4)">${ch.n}</div>
      </div>
      <div style="display:flex;gap:10px;background:rgba(255,255,255,.18);border-radius:20px;padding:14px 22px">${objs}</div>
    </div>`;
  const bubble = `<span style="font-size:30px;font-weight:bold;color:#1e293b">💡 ${ch.trick}</span>`;
  return shell(ch, `10 cântecele`, visual, bubble, { mouthOpen });
}

export function verseHTML(ch, vIdx, showResult, mouthOpen) {
  const v = ch.verses[vIdx];
  // lista capitolului — operațiile deja narate rămân completate, cea curentă
  // e evidențiată, iar cele care urmează așteaptă cu rezultatul gol
  const rows = ch.verses.map((w, i) => {
    const done = i < vIdx || (i === vIdx && showResult);
    const cur = i === vIdx;
    let style = "opacity:.45;background:rgba(255,255,255,.12);color:#fff;";
    if (done && !cur) style = "background:rgba(255,255,255,.9);color:#1e293b;";
    if (cur) style = `background:${ch.theme.accent};color:#1c1917;transform:scale(1.05);box-shadow:0 0 18px ${ch.theme.accent};`;
    return `<div style="display:flex;align-items:center;justify-content:center;gap:10px;height:42px;
      border-radius:10px;font-weight:bold;font-size:27px;${style}">
      <span style="width:118px;text-align:right">${w.a} × ${w.b}</span>
      <span>=</span>
      <span style="width:78px;text-align:left">${done ? w.r : cur ? "?" : ""}</span>
    </div>`;
  }).join("");
  const list = `<div style="width:420px;display:flex;flex-direction:column;gap:6px;justify-content:center;padding:8px 0">${rows}</div>`;

  const eq = `<div style="height:110px;display:flex;align-items:center;justify-content:center;gap:16px;
      color:#fff;font-size:64px;font-weight:bold;text-shadow:0 4px 12px rgba(0,0,0,.45)">
    <span>${v.a}</span><span style="color:${ch.theme.accent}">×</span><span>${v.b}</span><span>=</span>
    ${showResult
      ? `<span style="background:${ch.theme.accent};color:#1c1917;border-radius:18px;padding:0 24px;
          border:4px solid #fff;box-shadow:0 0 30px ${ch.theme.accent}">${v.r}</span>`
      : `<span style="opacity:.55">?</span>`}
  </div>`;
  const right = `<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-start">
    ${eq}<div style="flex:1;display:flex;align-items:center">${arrayHTML(ch, v, 480, 372)}</div>
  </div>`;

  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const bubble = showResult
    ? `<span style="font-size:31px;font-weight:bold;color:#334155">${cap(numWord(v.a))} ori ${numWord(v.b)} fac</span>
       <span style="font-size:35px;font-weight:bold;color:#b45309">${v.rWord}!</span>`
    : `<span style="font-size:31px;font-weight:bold;color:#334155">${cap(numWord(v.a))} ori ${numWord(v.b)} fac</span>
       <span style="font-size:31px;font-weight:bold;color:#94a3b8">…</span>`;
  return shell(ch, `Înmulțirea ${vIdx + 1} / 10`,
    `<div style="flex:1;display:flex;gap:14px">${list}${right}</div>`, bubble,
    { mouthOpen, cheer: showResult });
}

export function outroHTML(ch, mouthOpen) {
  let seed = ch.n * 37 + 11;
  const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
  const colors = ["#fbbf24", "#f472b6", "#4ade80", "#60a5fa", "#fb923c", "#a78bfa"];
  let confetti = "";
  for (let i = 0; i < 46; i++) {
    confetti += `<rect x="${Math.round(rnd() * 940)}" y="${Math.round(rnd() * 430)}" width="11" height="17"
      rx="3" fill="${colors[i % colors.length]}" opacity=".9"
      transform="rotate(${Math.round(rnd() * 360)} ${Math.round(rnd() * 940)} ${Math.round(rnd() * 430)})"/>`;
  }
  const visual = `
    <div style="flex:1;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px">
      <svg style="position:absolute;inset:0" viewBox="0 0 952 460" xmlns="http://www.w3.org/2000/svg">${confetti}</svg>
      <div style="position:relative;color:${ch.theme.accent};font-size:120px;font-weight:bold;
        text-shadow:0 6px 0 rgba(0,0,0,.3)">BRAVO!</div>
      <div style="position:relative;color:#fff;font-size:34px;font-weight:bold;text-align:center;
        text-shadow:0 3px 8px rgba(0,0,0,.4);max-width:820px">${ch.outro[0].replace(/^Bravo!\s*/, "")}</div>
    </div>`;
  const bubble = `<span style="font-size:29px;font-weight:bold;color:#1e293b">${ch.outro[ch.outro.length - 1]}</span>`;
  return shell(ch, `Felicitări!`, visual, bubble, { mouthOpen, cheer: true });
}
