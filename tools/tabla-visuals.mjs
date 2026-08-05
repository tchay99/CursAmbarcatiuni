/*
 * tabla-visuals.mjs — Grafica videoclipurilor „Tabla înmulțirii”.
 *
 * Stil gândit pentru pre-adolescenți (9–10 ani): temă întunecată cu accente
 * neon (nu pastel de grădiniță), tipografie mare și curată, fără mascotă.
 * Cantitățile a×b sunt arătate cu forme neon (fulger, hexagon, romb…) —
 * câte o formă și o culoare de accent per capitol.
 *
 * Scenele unui capitol:
 *   intro  — titlul capitolului + trucul de memorare;
 *   verse  — lista înmulțirilor capitolului, care se completează pe măsură
 *            ce vocea le narează (cele precedente rămân la vedere), plus
 *            rețeaua de forme a×b care crește cu un rând per operație;
 *   outro  — lista completă, lăsată pe ecran pentru repetare.
 */

/* ---------- Formele neon (definite o dată, folosite cu <use>) ---------- */
const SHAPE_DEFS = {
  bolt: (c) => `<g id="ob"><path d="M22 2 L9 23 L18 23 L14 38 L31 15 L21 15 Z"
    fill="${c}" stroke="#fff" stroke-width="1.4" stroke-linejoin="round" opacity=".95"/></g>`,
  hex: (c) => `<g id="ob"><path d="M20 3 L34.7 11.5 L34.7 28.5 L20 37 L5.3 28.5 L5.3 11.5 Z"
    fill="${c}" stroke="#fff" stroke-width="1.4" stroke-linejoin="round" opacity=".95"/></g>`,
  diamond: (c) => `<g id="ob"><path d="M20 3 L36 20 L20 37 L4 20 Z"
    fill="${c}" stroke="#fff" stroke-width="1.4" stroke-linejoin="round" opacity=".95"/></g>`,
  tri: (c) => `<g id="ob"><path d="M20 4 L37 34 L3 34 Z"
    fill="${c}" stroke="#fff" stroke-width="1.4" stroke-linejoin="round" opacity=".95"/></g>`,
  star: (c) => `<g id="ob"><path d="M20 2 L24.7 14.2 L37.8 14.9 L27.6 23.2 L31 35.8 L20 28.6 L9 35.8 L12.4 23.2 L2.2 14.9 L15.3 14.2 Z"
    fill="${c}" stroke="#fff" stroke-width="1.3" stroke-linejoin="round" opacity=".95"/></g>`,
  circle: (c) => `<g id="ob"><circle cx="20" cy="20" r="16"
    fill="${c}" stroke="#fff" stroke-width="1.4" opacity=".95"/></g>`,
  penta: (c) => `<g id="ob"><path d="M20 3 L36.5 15.4 L30.2 35 L9.8 35 L3.5 15.4 Z"
    fill="${c}" stroke="#fff" stroke-width="1.4" stroke-linejoin="round" opacity=".95"/></g>`,
  square: (c) => `<g id="ob"><rect x="5" y="5" width="30" height="30" rx="7"
    fill="${c}" stroke="#fff" stroke-width="1.4" opacity=".95"/></g>`,
  ring: (c) => `<g id="ob"><circle cx="20" cy="20" r="14" fill="none"
    stroke="${c}" stroke-width="8" opacity=".95"/><circle cx="20" cy="20" r="14" fill="none"
    stroke="#fff" stroke-width="1.2" opacity=".7"/></g>`,
  spark: (c) => `<g id="ob"><path d="M20 2 L24.5 15.5 L38 20 L24.5 24.5 L20 38 L15.5 24.5 L2 20 L15.5 15.5 Z"
    fill="${c}" stroke="#fff" stroke-width="1.3" stroke-linejoin="round" opacity=".95"/></g>`,
};

const NUM_WORDS = ["", "unu", "doi", "trei", "patru", "cinci", "șase", "șapte", "opt", "nouă", "zece"];
export const numWord = (n) => NUM_WORDS[n];

/*
 * Rețeaua de forme pentru a×b: b rânduri a câte a forme — crește cu un rând
 * la fiecare operație a capitolului (modelul „array” al înmulțirii).
 */
function arrayHTML(ch, verse, panelW, panelH) {
  const { a, b } = verse;
  const os = Math.max(16, Math.min(44, Math.floor(panelW / a) - 5, Math.floor(panelH / b) - 5));
  const gw = a * (os + 5), gh = b * (os + 5);
  let objs = "";
  for (let r = 0; r < b; r++) {
    for (let c = 0; c < a; c++) {
      objs += `<svg viewBox="0 0 40 40" style="position:absolute;width:${os}px;height:${os}px;
        filter:drop-shadow(0 0 ${Math.max(3, os / 7)}px ${ch.theme.accent});
        left:${Math.round((panelW - gw) / 2 + c * (os + 5))}px;top:${Math.round((panelH - gh) / 2 + r * (os + 5))}px"><use href="#ob"/></svg>`;
    }
  }
  return `<div style="position:relative;width:${panelW}px;height:${panelH}px">${objs}</div>`;
}

/* ---------- Șablonul general al cadrului (1280×720) ---------- */
function shell(ch, headerRight, mainHTML, bubbleHTML) {
  const ac = ch.theme.accent;
  return `<!DOCTYPE html><html lang="ro"><head><meta charset="utf-8"><style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:1280px; height:720px; overflow:hidden; font-family:"DejaVu Sans",sans-serif;
    background:radial-gradient(ellipse 1100px 700px at 22% -10%, #1e293b, #0b1120 70%);
    display:flex; flex-direction:column; }
  .top { height:66px; display:flex; align-items:center; justify-content:space-between; padding:0 30px; }
  .top .brand { display:flex; align-items:center; gap:12px; }
  .top .logo { width:30px; height:30px; }
  .top .name { color:#94a3b8; font-weight:bold; font-size:19px; letter-spacing:2px; text-transform:uppercase; }
  .top .chip { background:${ac}; color:#0b1120; font-weight:bold; font-size:19px;
    border-radius:999px; padding:6px 20px; letter-spacing:1px; box-shadow:0 0 18px ${ac}55; }
  .top .right { color:#e2e8f0; font-size:19px; font-weight:bold; background:rgba(148,163,184,.12);
    border:1px solid rgba(148,163,184,.25); border-radius:999px; padding:5px 18px; }
  .main { flex:1; display:flex; gap:26px; padding:0 30px; }
  .bubble { height:92px; margin:12px 30px 18px; background:rgba(148,163,184,.09);
    border:1px solid rgba(148,163,184,.22); border-radius:18px;
    display:flex; align-items:center; justify-content:center; gap:14px; padding:0 28px; text-align:center; }
  svg.defs { position:absolute; width:0; height:0; }
  </style></head><body>
  <svg class="defs" xmlns="http://www.w3.org/2000/svg"><defs>${SHAPE_DEFS[ch.theme.shape](ch.theme.accent)}</defs></svg>
  <div class="top">
    <div class="brand">
      <svg class="logo" viewBox="0 0 40 40" style="filter:drop-shadow(0 0 5px ${ac})"><use href="#ob"/></svg>
      <span class="name">Tabla înmulțirii</span>
    </div>
    <span class="chip">× ${ch.n}</span>
    <span class="right">${headerRight}</span>
  </div>
  <div class="main">${mainHTML}</div>
  <div class="bubble">${bubbleHTML}</div>
</body></html>`;
}

/*
 * Lista capitolului: operațiile deja narate rămân completate, cea curentă
 * (cur) e evidențiată, iar cele care urmează așteaptă cu rezultatul gol.
 * cur = -1 → lista completă (folosită în scena finală).
 */
function listHTML(ch, cur, showResult) {
  const ac = ch.theme.accent;
  const rows = ch.verses.map((w, i) => {
    const done = cur === -1 || i < cur || (i === cur && showResult);
    const isCur = i === cur;
    let style = `opacity:.32;background:rgba(148,163,184,.06);color:#94a3b8;
      border:1px solid rgba(148,163,184,.15);`;
    if (done && !isCur) style = `background:rgba(148,163,184,.10);color:#f1f5f9;
      border:1px solid rgba(148,163,184,.2);border-left:5px solid ${ac};`;
    if (isCur) style = `background:${ac};color:#0b1120;border:1px solid #fff;
      transform:scale(1.04);box-shadow:0 0 22px ${ac}88;`;
    const res = done ? w.r : isCur ? "?" : "";
    return `<div style="display:flex;align-items:center;justify-content:center;gap:12px;height:43px;
      border-radius:11px;font-weight:bold;font-size:28px;${style}">
      <span style="width:124px;text-align:right">${w.a} × ${w.b}</span>
      <span style="opacity:.75">=</span>
      <span style="width:82px;text-align:left">${res}</span>
    </div>`;
  }).join("");
  return `<div style="width:452px;display:flex;flex-direction:column;gap:7px;justify-content:center">${rows}</div>`;
}

/* ---------- Scenele ---------- */
export function introHTML(ch) {
  const shapes = Array.from({ length: ch.n }, () =>
    `<svg viewBox="0 0 40 40" style="width:52px;height:52px;filter:drop-shadow(0 0 7px ${ch.theme.accent})"><use href="#ob"/></svg>`).join("");
  const main = `
    <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:26px">
      <div style="color:#94a3b8;font-size:30px;font-weight:bold;letter-spacing:6px;text-transform:uppercase">Capitolul ${ch.n}</div>
      <div style="color:${ch.theme.accent};font-size:150px;font-weight:bold;line-height:1;
        text-shadow:0 0 40px ${ch.theme.accent}66">× ${ch.n}</div>
      <div style="display:flex;gap:12px">${shapes}</div>
    </div>`;
  const bubble = `<span style="font-size:30px;font-weight:bold;color:#e2e8f0">${ch.trick}</span>`;
  return shell(ch, "10 înmulțiri", main, bubble);
}

export function verseHTML(ch, vIdx, showResult) {
  const v = ch.verses[vIdx];
  const ac = ch.theme.accent;
  const eq = `<div style="height:124px;display:flex;align-items:center;justify-content:center;gap:18px;
      color:#f1f5f9;font-size:72px;font-weight:bold">
    <span>${v.a}</span><span style="color:${ac}">×</span><span>${v.b}</span><span style="opacity:.7">=</span>
    ${showResult
      ? `<span style="background:${ac};color:#0b1120;border-radius:16px;padding:0 26px;
          box-shadow:0 0 34px ${ac}aa">${v.r}</span>`
      : `<span style="opacity:.4">?</span>`}
  </div>`;
  const right = `<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-start">
    ${eq}<div style="flex:1;display:flex;align-items:center">${arrayHTML(ch, v, 470, 368)}</div>
  </div>`;
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const bubble = `
    <span style="font-size:31px;font-weight:bold;color:#e2e8f0">${cap(numWord(v.a))} ori ${numWord(v.b)} fac</span>
    <span style="font-size:34px;font-weight:bold;color:${showResult ? ac : "#475569"}">${showResult ? v.rWord + "!" : "…"}</span>`;
  return shell(ch, `${vIdx + 1} / 10`, listHTML(ch, vIdx, showResult) + right, bubble);
}

/* Scena finală: lista completă rămâne pe ecran, ca să poată fi repetată. */
export function outroHTML(ch) {
  const full = ch.verses[ch.verses.length - 1];
  const right = `<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-start">
    <div style="height:124px;display:flex;align-items:center;justify-content:center;
      color:#f1f5f9;font-size:38px;font-weight:bold;white-space:nowrap">
      Toată tabla <span style="color:${ch.theme.accent};margin-left:12px">× ${ch.n}</span>
    </div>
    <div style="flex:1;display:flex;align-items:center">${arrayHTML(ch, full, 470, 368)}</div>
  </div>`;
  const bubble = `<span style="font-size:30px;font-weight:bold;color:#e2e8f0">${ch.outro[ch.outro.length - 1]}</span>`;
  return shell(ch, "Recapitulare", listHTML(ch, -1, true) + right, bubble);
}
