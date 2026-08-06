/*
 * visuals.mjs — Ilustrațiile explicative ale scenelor video.
 *
 * Fiecare scenă (dayNN-sM) are o diagramă SVG desenată programatic:
 * ambarcațiuni etichetate, geamanduri IALA, reguli de drum, lumini de
 * navigație etc. Zona de desen: 940×560 (¾ din cadrul video 1280×720).
 */

/* ============================ Primitive ============================ */

const F = `font-family="DejaVu Sans,sans-serif"`;

export function svgWrap(inner, bg = "#f8fafc") {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 940 560" width="940" height="560">
  <defs>
    ${["#0f172a", "#dc2626", "#16a34a", "#2563eb", "#d97706", "#475569", "#ffffff", "#0891b2"]
      .map((c) => `<marker id="m${c.slice(1)}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${c}"/></marker>`).join("")}
    <linearGradient id="waterG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#7dd3fc"/><stop offset="1" stop-color="#0284c7"/>
    </linearGradient>
    <linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#e0f2fe"/><stop offset="1" stop-color="#bae6fd"/>
    </linearGradient>
    <linearGradient id="nightG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0b1220"/><stop offset="1" stop-color="#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="940" height="560" fill="${bg}"/>
  ${inner}</svg>`;
}

const T = (x, y, text, { s = 22, c = "#0f172a", a = "middle", b = false, o = 1 } = {}) =>
  `<text x="${x}" y="${y}" ${F} font-size="${s}" fill="${c}" text-anchor="${a}" ${b ? 'font-weight="bold"' : ""} opacity="${o}">${text}</text>`;

const arrow = (x1, y1, x2, y2, c = "#0f172a", w = 4, dash = "") =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}" ${dash ? `stroke-dasharray="${dash}"` : ""} marker-end="url(#m${c.slice(1)})"/>`;

const arc = (x1, y1, x2, y2, bx, by, c = "#0f172a", w = 4, dash = "") =>
  `<path d="M ${x1},${y1} Q ${bx},${by} ${x2},${y2}" fill="none" stroke="${c}" stroke-width="${w}" ${dash ? `stroke-dasharray="${dash}"` : ""} marker-end="url(#m${c.slice(1)})"/>`;

const line = (x1, y1, x2, y2, c = "#475569", w = 2, dash = "") =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}" ${dash ? `stroke-dasharray="${dash}"` : ""}/>`;

const badge = (x, y, text, c = "#2563eb", tc = "#fff", s = 19) => {
  const w = text.length * s * 0.62 + 26;
  return `<rect x="${x - w / 2}" y="${y - s * 0.85}" width="${w}" height="${s * 1.65}" rx="${s * 0.8}" fill="${c}"/>` +
    T(x, y + s * 0.35, text, { s, c: tc, b: true });
};

const card = (x, y, w, h, r = 14, fill = "#ffffff", stroke = "#cbd5e1") =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;

const waterRect = (y = 300, h = 260) => `<rect x="0" y="${y}" width="940" height="${h}" fill="url(#waterG)"/>` +
  [0, 1, 2].map((i) => `<path d="M 0 ${y + 24 + i * 60} q 40 -14 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0" fill="none" stroke="#ffffff" stroke-width="3" opacity="0.35"/>`).join("");

const sky = (h = 300) => `<rect x="0" y="0" width="940" height="${h}" fill="url(#skyG)"/>`;

const check = (x, y, s = 16) => `<path d="M ${x - s},${y} l ${s * 0.7},${s * 0.8} l ${s * 1.3},-${s * 1.6}" fill="none" stroke="#16a34a" stroke-width="6" stroke-linecap="round"/>`;
const cross = (x, y, s = 14) => `<path d="M ${x - s},${y - s} l ${2 * s},${2 * s} M ${x + s},${y - s} l ${-2 * s},${2 * s}" stroke="#dc2626" stroke-width="6" stroke-linecap="round"/>`;
const warn = (x, y, s = 30) => `<path d="M ${x},${y - s} L ${x + s * 0.9},${y + s * 0.7} L ${x - s * 0.9},${y + s * 0.7} Z" fill="#fbbf24" stroke="#b45309" stroke-width="3"/>` + T(x, y + s * 0.45, "!", { s: s * 1.05, b: true, c: "#7c2d12" });

/* Barcă văzută de sus (prova în direcția heading, 0 = în sus). */
const boatTop = (cx, cy, L, heading = 0, hull = "#e2e8f0", outline = "#334155") => {
  const b = L * 0.19;
  return `<g transform="translate(${cx},${cy}) rotate(${heading})">
    <path d="M 0,${-L / 2} C ${b},${-L / 5} ${b},${L / 2 - 8} ${b * 0.8},${L / 2} L ${-b * 0.8},${L / 2} C ${-b},${L / 2 - 8} ${-b},${-L / 5} 0,${-L / 2} Z"
      fill="${hull}" stroke="${outline}" stroke-width="3"/>
    <path d="M ${-b * 0.62},${-L * 0.12} q ${b * 0.62},${-L * 0.13} ${b * 1.24},0" fill="none" stroke="${outline}" stroke-width="2.5"/>
    <rect x="${-b * 0.34}" y="${L / 2 - 13}" width="${b * 0.68}" height="12" rx="3" fill="#475569"/>
  </g>`;
};

/* Barcă văzută din lateral (prova la dreapta). */
const boatSide = (cx, cy, L, hull = "#e2e8f0", cabin = true) => {
  const H = L * 0.16;
  return `<g transform="translate(${cx},${cy})">
    <path d="M ${-L / 2},${-H * 0.4} L ${L / 2 - L * 0.16},${-H * 0.4} Q ${L / 2},${-H * 0.55} ${L / 2},${-H * 1.05}
             L ${L / 2 - L * 0.06},${-H * 0.35} L ${L * 0.38},${H * 0.75} L ${-L * 0.42},${H * 0.75} Z"
      fill="${hull}" stroke="#334155" stroke-width="3"/>
    ${cabin ? `<path d="M ${-L * 0.3},${-H * 0.4} L ${-L * 0.26},${-H * 1.1} L ${L * 0.08},${-H * 1.1} L ${L * 0.16},${-H * 0.4} Z" fill="#cbd5e1" stroke="#334155" stroke-width="2.5"/>` : ""}
    <rect x="${-L / 2 - 10}" y="${-H * 0.55}" width="14" height="${H * 1.15}" rx="4" fill="#475569"/>
  </g>`;
};

/* Om simplu. pose: stand | water | lie | point */
const person = (x, y, s = 1, pose = "stand", c = "#2563eb") => {
  const g = (inner) => `<g transform="translate(${x},${y}) scale(${s})">${inner}</g>`;
  const head = `<circle cx="0" cy="-34" r="11" fill="#fcd9b6" stroke="#92400e" stroke-width="2"/>`;
  if (pose === "water") return g(head + `<path d="M -18,-46 Q -10,-58 -4,-46 M 18,-46 Q 10,-58 4,-46" fill="none" stroke="${c}" stroke-width="6" stroke-linecap="round"/>
    <path d="M -12,-24 q 12,10 24,0" fill="none" stroke="${c}" stroke-width="9" stroke-linecap="round"/>`);
  if (pose === "lie") return g(`<circle cx="-34" cy="0" r="11" fill="#fcd9b6" stroke="#92400e" stroke-width="2"/>
    <rect x="-22" y="-8" width="52" height="16" rx="8" fill="${c}"/>`);
  if (pose === "point") return g(head + `<rect x="-8" y="-24" width="16" height="34" rx="7" fill="${c}"/>
    <line x1="6" y1="-18" x2="30" y2="-30" stroke="${c}" stroke-width="7" stroke-linecap="round"/>
    <line x1="-8" y1="10" x2="-8" y2="30" stroke="${c}" stroke-width="7" stroke-linecap="round"/>
    <line x1="8" y1="10" x2="8" y2="30" stroke="${c}" stroke-width="7" stroke-linecap="round"/>`);
  return g(head + `<rect x="-8" y="-24" width="16" height="34" rx="7" fill="${c}"/>
    <line x1="-8" y1="-16" x2="-20" y2="2" stroke="${c}" stroke-width="7" stroke-linecap="round"/>
    <line x1="8" y1="-16" x2="20" y2="2" stroke="${c}" stroke-width="7" stroke-linecap="round"/>
    <line x1="-8" y1="10" x2="-8" y2="30" stroke="${c}" stroke-width="7" stroke-linecap="round"/>
    <line x1="8" y1="10" x2="8" y2="30" stroke="${c}" stroke-width="7" stroke-linecap="round"/>`);
};

/* Colac de salvare */
const ring = (x, y, r = 26) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#f97316" stroke-width="${r * 0.55}"/>
  <circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#ffffff" stroke-width="${r * 0.55}" stroke-dasharray="${r * 0.7} ${r * 0.85}"/>`;

/* Vestă de salvare */
const vest = (x, y, s = 1, c = "#f97316") => `<g transform="translate(${x},${y}) scale(${s})">
  <path d="M -26,-30 Q -30,20 -22,34 L -4,34 L -4,-16 Q -14,-34 -26,-30 Z" fill="${c}" stroke="#9a3412" stroke-width="2.5"/>
  <path d="M 26,-30 Q 30,20 22,34 L 4,34 L 4,-16 Q 14,-34 26,-30 Z" fill="${c}" stroke="#9a3412" stroke-width="2.5"/>
  <rect x="-24" y="-2" width="20" height="10" rx="3" fill="#facc15"/><rect x="4" y="-2" width="20" height="10" rx="3" fill="#facc15"/>
</g>`;

/* Stingător */
const exting = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})">
  <rect x="-16" y="-34" width="32" height="72" rx="12" fill="#dc2626" stroke="#7f1d1d" stroke-width="3"/>
  <rect x="-8" y="-46" width="16" height="12" rx="3" fill="#334155"/>
  <path d="M -8,-44 Q -34,-40 -30,-16" fill="none" stroke="#334155" stroke-width="6" stroke-linecap="round"/>
  <rect x="-11" y="-12" width="22" height="26" rx="4" fill="#ffffff"/>
</g>`;

/* Flăcări */
const flames = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})">
  <path d="M 0,0 C -26,-16 -18,-52 2,-64 C -2,-42 16,-40 14,-20 C 26,-30 28,-12 20,-2 Z" fill="#f97316"/>
  <path d="M 2,-2 C -12,-12 -8,-32 4,-42 C 2,-28 14,-26 12,-12 Z" fill="#fbbf24"/>
</g>`;

/* Ancoră */
const anchorIcon = (x, y, s = 1, c = "#334155") => `<g transform="translate(${x},${y}) scale(${s})" stroke="${c}" fill="none" stroke-width="7" stroke-linecap="round">
  <circle cx="0" cy="-34" r="9"/><line x1="0" y1="-25" x2="0" y2="26"/><line x1="-18" y1="-8" x2="18" y2="-8"/>
  <path d="M -26,10 Q -22,32 0,34 Q 22,32 26,10 M -26,10 l -6,12 M -26,10 l 12,4 M 26,10 l 6,12 M 26,10 l -12,4"/>
</g>`;

/* Elice */
const propIcon = (x, y, s = 1, c = "#64748b") => `<g transform="translate(${x},${y}) scale(${s})">
  ${[0, 120, 240].map((a) => `<ellipse cx="0" cy="-17" rx="10" ry="18" fill="${c}" stroke="#334155" stroke-width="2" transform="rotate(${a})"/>`).join("")}
  <circle r="7" fill="#334155"/>
</g>`;

/* Stație radio VHF */
const radioIcon = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})">
  <rect x="-20" y="-30" width="40" height="64" rx="8" fill="#334155" stroke="#0f172a" stroke-width="3"/>
  <line x1="12" y1="-30" x2="12" y2="-56" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>
  <rect x="-13" y="-22" width="26" height="16" rx="3" fill="#a7f3d0"/>
  <circle cx="-6" cy="8" r="4" fill="#94a3b8"/><circle cx="8" cy="8" r="4" fill="#94a3b8"/>
  <circle cx="-6" cy="20" r="4" fill="#94a3b8"/><circle cx="8" cy="20" r="4" fill="#94a3b8"/>
</g>`;

/* Geamanduri IALA */
const buoyCan = (x, y, s = 1, c = "#dc2626") => `<g transform="translate(${x},${y}) scale(${s})">
  <rect x="-22" y="-58" width="44" height="52" rx="4" fill="${c}" stroke="#1f2937" stroke-width="2.5"/>
  <path d="M -30,-6 L 30,-6 L 20,12 L -20,12 Z" fill="#94a3b8" stroke="#1f2937" stroke-width="2.5"/>
</g>`;
const buoyCone = (x, y, s = 1, c = "#16a34a") => `<g transform="translate(${x},${y}) scale(${s})">
  <path d="M 0,-62 L 26,-6 L -26,-6 Z" fill="${c}" stroke="#1f2937" stroke-width="2.5"/>
  <path d="M -30,-6 L 30,-6 L 20,12 L -20,12 Z" fill="#94a3b8" stroke="#1f2937" stroke-width="2.5"/>
</g>`;
/* Geamandură pilon cu benzi + semn de vârf.
   topmark: 'NN'|'SS'|'EE'|'WW'|'sphere2'|'sphere'|'x' */
const buoyPillar = (x, y, s, bands, topmark) => {
  const h = 84, bh = h / bands.length;
  const bandRects = bands.map((c, i) => `<rect x="-14" y="${-20 - h + i * bh}" width="28" height="${bh}" fill="${c}" stroke="#1f2937" stroke-width="1.5"/>`).join("");
  const cone = (cy, up) => `<path d="M 0,${cy + (up ? -14 : 0)} L 11,${cy + (up ? 0 : -14)} L -11,${cy + (up ? 0 : -14)} Z" fill="#1f2937"/>`;
  let tm = "";
  const top = -20 - h;
  if (topmark === "NN") tm = cone(top - 4, true) + cone(top - 22, true);
  if (topmark === "SS") tm = cone(top - 4, false) + cone(top - 22, false);
  if (topmark === "EE") tm = cone(top - 22, true) + cone(top - 4, false);   // baze apropiate? nu: vârfuri în afară
  if (topmark === "WW") tm = cone(top - 22, false) + cone(top - 4, true);   // vârf la vârf (pahar)
  if (topmark === "sphere2") tm = `<circle cx="0" cy="${top - 10}" r="9" fill="#1f2937"/><circle cx="0" cy="${top - 32}" r="9" fill="#1f2937"/>`;
  if (topmark === "sphere") tm = `<circle cx="0" cy="${top - 12}" r="10" fill="#dc2626"/>`;
  if (topmark === "x") tm = `<path d="M -10,${top - 22} L 10,${top - 2} M 10,${top - 22} L -10,${top - 2}" stroke="#facc15" stroke-width="6" stroke-linecap="round"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})">
    ${bandRects}${tm}
    <path d="M -26,-20 L 26,-20 L 18,0 L -18,0 Z" fill="#94a3b8" stroke="#1f2937" stroke-width="2"/>
  </g>`;
};

/* Vânt: trei săgeți paralele */
const windArrows = (x, y, angle, label = "VÂNT", c = "#0891b2") => `<g transform="translate(${x},${y}) rotate(${angle})">
  ${[-24, 0, 24].map((o) => `<line x1="${o}" y1="-34" x2="${o}" y2="30" stroke="${c}" stroke-width="5" marker-end="url(#m${c.slice(1)})"/>`).join("")}
  <g transform="rotate(${-angle})">${T(0, -52, label, { s: 19, c, b: true })}</g>
</g>`;

/* Ponton văzut de sus */
const dockTop = (x, y, w, h) => `<g transform="translate(${x},${y})">
  <rect width="${w}" height="${h}" fill="#a16207" stroke="#713f12" stroke-width="3"/>
  ${Array.from({ length: Math.floor(w / 34) }, (_, i) => `<line x1="${(i + 1) * 34}" y1="0" x2="${(i + 1) * 34}" y2="${h}" stroke="#713f12" stroke-width="1.5"/>`).join("")}
</g>`;

/* Nor / soare / fulger */
const cloud = (x, y, s = 1, c = "#94a3b8") => `<g transform="translate(${x},${y}) scale(${s})">
  <ellipse cx="0" cy="0" rx="44" ry="24" fill="${c}"/><ellipse cx="-28" cy="8" rx="26" ry="17" fill="${c}"/>
  <ellipse cx="30" cy="8" rx="24" ry="15" fill="${c}"/><ellipse cx="-2" cy="-14" rx="26" ry="17" fill="${c}"/>
</g>`;
const lightning = (x, y, s = 1) => `<path transform="translate(${x},${y}) scale(${s})" d="M 0,0 L -12,30 L -2,30 L -10,58 L 14,24 L 2,24 L 12,0 Z" fill="#facc15" stroke="#b45309" stroke-width="2"/>`;
const sun = (x, y, r = 22) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fbbf24"/>` +
  [0, 45, 90, 135, 180, 225, 270, 315].map((a) => `<line x1="${x + Math.cos(a * Math.PI / 180) * (r + 7)}" y1="${y + Math.sin(a * Math.PI / 180) * (r + 7)}" x2="${x + Math.cos(a * Math.PI / 180) * (r + 16)}" y2="${y + Math.sin(a * Math.PI / 180) * (r + 16)}" stroke="#fbbf24" stroke-width="5" stroke-linecap="round"/>`).join("");

/* Lumină de navigație cu halo */
const navDot = (x, y, c, r = 12) => `<circle cx="${x}" cy="${y}" r="${r * 2.2}" fill="${c}" opacity="0.25"/><circle cx="${x}" cy="${y}" r="${r}" fill="${c}" stroke="#ffffff" stroke-width="2"/>`;

/* Listă de verificare pe clipboard */
const clipboard = (x, y, w, h, items) => card(x, y, w, h, 12) +
  `<rect x="${x + w / 2 - 34}" y="${y - 12}" width="68" height="24" rx="8" fill="#475569"/>` +
  items.map((it, i) => check(x + 30, y + 44 + i * 40, 11) + T(x + 52, y + 50 + i * 40, it, { s: 19, a: "start" })).join("");

/* Casetă mini-titlu deasupra unei ilustrații din grile */
const capT = (x, y, text, s = 19) => T(x, y, text, { s, b: true, c: "#334155" });

/* ============================ Scenele ============================ */

export const SCENES = {
  /* ---------------- ZIUA 1 ---------------- */
  "day01-s1": () => svgWrap(
    sky(300) + waterRect(300) +
    // traseu în 4 etape (module)
    [["1", "#2563eb", 130, "Ambarcațiune"], ["2", "#0891b2", 350, "Manevre"], ["3", "#dc2626", 570, "Siguranță"], ["4", "#16a34a", 790, "Navigație"]]
      .map(([n, c, x, lbl]) => `<circle cx="${x}" cy="130" r="40" fill="${c}"/>` + T(x, 143, n, { s: 38, c: "#fff", b: true }) + T(x, 200, lbl, { s: 21, b: true })).join("") +
    line(170, 130, 310, 130, "#94a3b8", 5, "2 10") + line(390, 130, 530, 130, "#94a3b8", 5, "2 10") + line(610, 130, 750, 130, "#94a3b8", 5, "2 10") +
    boatSide(300, 385, 240) + arrow(440, 385, 700, 385, "#0f172a", 5, "") +
    badge(470, 490, "14 zile → examen", "#0f172a") +
    `<g transform="translate(800,420)">${anchorIcon(0, 0, 1.3, "#0f172a")}</g>`
  ),
  "day01-s2": () => svgWrap(
    T(470, 46, "Tipuri de ambarcațiuni de agrement", { s: 27, b: true }) +
    // 5 mini-carduri
    card(30, 80, 270, 200) + capT(165, 110, "Cabinată") + boatSide(165, 200, 190) +
    card(335, 80, 270, 200) + capT(470, 110, "Open (deschisă)") + boatSide(470, 200, 190, "#e2e8f0", false) +
    card(640, 80, 270, 200) + capT(775, 110, "RIB (semi-rigidă)") +
    `<g transform="translate(775,200)"><ellipse cx="0" cy="10" rx="95" ry="26" fill="#334155"/><path d="M -80,4 L 80,4 L 60,-26 L -66,-26 Z" fill="#e2e8f0" stroke="#334155" stroke-width="3"/><rect x="72" y="-16" width="12" height="26" rx="4" fill="#475569"/></g>` +
    card(180, 310, 270, 200) + capT(315, 340, "Velier") +
    `<g transform="translate(315,440)"><path d="M -85,10 L 85,10 L 60,34 L -66,34 Z" fill="#e2e8f0" stroke="#334155" stroke-width="3"/><line x1="0" y1="10" x2="0" y2="-90" stroke="#334155" stroke-width="5"/><path d="M 0,-88 L 70,6 L 4,6 Z" fill="#bae6fd" stroke="#334155" stroke-width="2"/><path d="M -4,-70 L -56,6 L -4,6 Z" fill="#e0f2fe" stroke="#334155" stroke-width="2"/></g>` +
    card(490, 310, 270, 200) + capT(625, 340, "Jet-ski / pneumatică") +
    `<g transform="translate(625,445)"><path d="M -70,0 Q -40,-34 20,-30 L 55,-6 Q 70,4 50,12 L -60,12 Q -80,8 -70,0 Z" fill="#f472b6" stroke="#9d174d" stroke-width="3"/><path d="M -10,-28 L -2,-52 L 16,-50 L 14,-28" fill="#334155"/></g>`
  ),
  "day01-s3": () => svgWrap(
    waterRect(0, 560) +
    boatTop(470, 285, 330) +
    // jumătăți colorate tribord / babord
    `<path d="M 470,120 L 470,450" stroke="#ffffff" stroke-width="3" stroke-dasharray="8 8"/>` +
    badge(470, 70, "PROVA (față)", "#0f172a") + arrow(470, 92, 470, 128, "#0f172a", 5) +
    badge(470, 520, "PUPA (spate)", "#0f172a") + arrow(470, 498, 470, 462, "#0f172a", 5) +
    badge(760, 285, "TRIBORD = dreapta", "#16a34a") + arrow(660, 285, 545, 285, "#16a34a", 6) +
    badge(180, 285, "BABORD = stânga", "#dc2626") + arrow(285, 285, 400, 285, "#dc2626", 6) +
    navDot(535, 200, "#22c55e") + navDot(405, 200, "#ef4444") +
    T(470, 320, "privind spre provă", { s: 18, c: "#0b3050" })
  ),
  "day01-s4": () => svgWrap(
    sky(330) + waterRect(330, 230) +
    boatSide(430, 330, 420) +
    line(120, 330, 850, 330, "#0369a1", 3) + T(850, 318, "linia de plutire", { s: 18, c: "#0369a1", a: "end" }) +
    // bord liber
    line(680, 330, 680, 292, "#dc2626", 4) + `<path d="M 674,330 l 12,0 M 674,292 l 12,0" stroke="#dc2626" stroke-width="4"/>` +
    badge(790, 260, "bord liber", "#dc2626") +
    arrow(240, 150, 330, 258, "#2563eb", 4) + badge(210, 130, "cabină / punte", "#2563eb") +
    arrow(620, 120, 520, 268, "#2563eb", 4) + badge(650, 100, "cocpit", "#2563eb") +
    arrow(180, 470, 300, 372, "#7c3aed", 4) + badge(160, 496, "carena (corpul)", "#7c3aed") +
    arrow(560, 480, 450, 380, "#0891b2", 4) + badge(590, 505, "santina (fundul interior)", "#0891b2")
  ),
  "day01-s5": () => svgWrap(
    T(470, 44, "Greutatea jos și distribuită = stabilitate", { s: 25, b: true }) +
    // corect
    card(60, 80, 380, 330) + check(105, 115) + capT(255, 122, "CORECT") +
    `<g transform="translate(250,270)"><path d="M -130,-30 Q -130,66 0,70 Q 130,66 130,-30 L 96,-30 L 96,20 Q 60,52 0,52 Q -60,52 -96,20 L -96,-30 Z" fill="#e2e8f0" stroke="#334155" stroke-width="3"/><circle cx="0" cy="30" r="14" fill="#16a34a"/><line x1="-90" y1="-16" x2="90" y2="-16" stroke="#0369a1" stroke-width="3"/></g>` +
    T(250, 380, "centru de greutate JOS", { s: 19, c: "#166534", b: true }) +
    // greșit
    card(500, 80, 380, 330) + cross(545, 118) + capT(695, 122, "PERICOL") +
    `<g transform="translate(690,270) rotate(14)"><path d="M -130,-30 Q -130,66 0,70 Q 130,66 130,-30 L 96,-30 L 96,20 Q 60,52 0,52 Q -60,52 -96,20 L -96,-30 Z" fill="#e2e8f0" stroke="#334155" stroke-width="3"/><circle cx="0" cy="-56" r="14" fill="#dc2626"/></g>` +
    T(695, 380, "greutate sus / într-un bord", { s: 19, c: "#991b1b", b: true }) +
    card(230, 440, 480, 92) + T(470, 478, "Plăcuța constructorului:", { s: 21, b: true }) +
    T(470, 512, "max. persoane și max. kg — nu se depășesc!", { s: 20, c: "#b45309" })
  ),

  /* ---------------- ZIUA 2 ---------------- */
  "day02-s1": () => svgWrap(
    T(470, 44, "Unde stă motorul?", { s: 26, b: true }) +
    card(30, 80, 280, 300) + capT(170, 112, "Outboard (exterior)") +
    `<g transform="translate(170,240)">${boatSide(0, 0, 200, "#e2e8f0", false)}<rect x="-118" y="-30" width="26" height="66" rx="7" fill="#dc2626" stroke="#7f1d1d" stroke-width="2.5"/>${propIcon(-105, 48, 0.65)}</g>` +
    T(170, 350, "pe oglinda pupei, orientabil", { s: 17, c: "#475569" }) +
    card(330, 80, 280, 300) + capT(470, 112, "Inboard (interior)") +
    `<g transform="translate(470,240)">${boatSide(0, 0, 200)}<rect x="-30" y="-6" width="56" height="34" rx="6" fill="#dc2626" stroke="#7f1d1d" stroke-width="2.5"/><line x1="-30" y1="22" x2="-86" y2="38" stroke="#334155" stroke-width="5"/>${propIcon(-92, 40, 0.6)}</g>` +
    T(470, 350, "motor în corp + arbore + elice", { s: 17, c: "#475569" }) +
    card(630, 80, 280, 300) + capT(770, 112, "Sterndrive (Z-drive)") +
    `<g transform="translate(770,240)">${boatSide(0, 0, 200, "#e2e8f0", false)}<rect x="-56" y="-6" width="50" height="32" rx="6" fill="#dc2626" stroke="#7f1d1d" stroke-width="2.5"/><path d="M -60,10 L -96,10 L -96,44" fill="none" stroke="#334155" stroke-width="8"/>${propIcon(-96, 50, 0.6)}</g>` +
    T(770, 350, "interior + coloană orientabilă", { s: 17, c: "#475569" }) +
    badge(470, 460, "Toate transformă rotația în împingere prin elice", "#0f172a", "#fff", 20)
  ),
  "day02-s2": () => svgWrap(
    card(40, 60, 270, 420) + capT(175, 96, "2 timpi") +
    `<g transform="translate(175,190)"><rect x="-60" y="-50" width="120" height="100" rx="12" fill="#94a3b8" stroke="#334155" stroke-width="3"/><circle cx="0" cy="0" r="26" fill="#e2e8f0" stroke="#334155" stroke-width="3"/></g>` +
    T(175, 300, "ulei + benzină amestecate", { s: 18 }) +
    `<g transform="translate(120,350)"><rect x="-24" y="-20" width="48" height="52" rx="6" fill="#f59e0b"/><rect x="-8" y="-30" width="16" height="12" fill="#b45309"/></g>` +
    T(240, 358, "+", { s: 36, b: true }) + `<g transform="translate(228,406)"></g>` +
    T(175, 445, "ușor, simplu, mai poluant", { s: 18, c: "#b45309" }) +
    card(335, 60, 270, 420) + capT(470, 96, "4 timpi") +
    `<g transform="translate(470,190)"><rect x="-64" y="-54" width="128" height="108" rx="12" fill="#64748b" stroke="#334155" stroke-width="3"/><circle cx="0" cy="0" r="28" fill="#e2e8f0" stroke="#334155" stroke-width="3"/></g>` +
    T(470, 300, "ungere separată", { s: 18 }) +
    check(430, 348) + T(470, 355, "silențios", { s: 18, a: "start" }) +
    check(430, 388) + T(470, 395, "economic", { s: 18, a: "start" }) +
    T(470, 445, "alegerea modernă uzuală", { s: 18, c: "#166534" }) +
    card(630, 60, 270, 420) + capT(765, 96, "Electric") +
    `<g transform="translate(765,190)"><rect x="-54" y="-46" width="108" height="92" rx="14" fill="#16a34a" stroke="#14532d" stroke-width="3"/>${lightning(0, -28, 0.9)}</g>` +
    `<g transform="translate(765,330)"><rect x="-54" y="-24" width="108" height="48" rx="8" fill="#334155"/><rect x="54" y="-10" width="10" height="20" fill="#334155"/><rect x="-46" y="-16" width="30" height="32" rx="4" fill="#4ade80"/><rect x="-12" y="-16" width="30" height="32" rx="4" fill="#4ade80"/><rect x="22" y="-16" width="24" height="32" rx="4" fill="#a7f3d0"/></g>` +
    T(765, 445, "silențios, fără emisii", { s: 18, c: "#166534" })
  ),
  "day02-s3": () => svgWrap(
    waterRect(0, 560) +
    `<g transform="translate(320,270)">${propIcon(0, 0, 3.4)}
      <path d="M 60,-90 A 108,108 0 1 1 -100,-40" fill="none" stroke="#facc15" stroke-width="8" marker-end="url(#md97706)"/></g>` +
    T(320, 455, "rotație", { s: 21, c: "#fff", b: true }) +
    arrow(470, 270, 700, 270, "#ffffff", 12) + badge(770, 270, "împingere", "#0f172a") +
    // pericol: parâmă
    `<path d="M 180,470 q 60,-30 120,-6 t 130,-20" fill="none" stroke="#7c2d12" stroke-width="7" stroke-dasharray="1 0"/>` +
    warn(150, 460, 26) + badge(300, 520, "parâme / plase / sfori → blochează elicea!", "#7f1d1d", "#fff", 19) +
    T(470, 60, "Elicea: pas × diametru = viteză vs. tracțiune", { s: 24, c: "#fff", b: true })
  ),
  "day02-s4": () => svgWrap(
    sky(300) + waterRect(300, 260) +
    `<g transform="translate(360,300)">${boatSide(0, 0, 300, "#e2e8f0", false)}
      <rect x="-178" y="-40" width="34" height="86" rx="8" fill="#dc2626" stroke="#7f1d1d" stroke-width="3"/></g>` +
    // priza de apă + jet de control
    arrow(140, 430, 205, 370, "#0891b2", 5) + badge(120, 462, "apă de răcire intră", "#0891b2") +
    `<path d="M 196,238 q 26,-30 58,-10" fill="none" stroke="#38bdf8" stroke-width="7" stroke-linecap="round"/>
     <path d="M 200,250 q 22,-22 48,-8" fill="none" stroke="#7dd3fc" stroke-width="5" stroke-linecap="round"/>` +
    badge(370, 200, "jetul de control (telltale) = răcirea funcționează", "#0369a1", "#fff", 19) +
    card(600, 320, 310, 190) + `<g transform="translate(660,405)"><rect x="-14" y="-52" width="28" height="86" rx="10" fill="#fee2e2" stroke="#b91c1c" stroke-width="3"/><rect x="-7" y="-20" width="14" height="50" fill="#dc2626"/><circle cx="0" cy="42" r="16" fill="#dc2626"/></g>` +
    T(790, 380, "Supraîncălzire?", { s: 21, b: true, c: "#991b1b" }) +
    T(790, 415, "1. Oprești imediat", { s: 19 }) + T(790, 447, "2. Verifici prizele", { s: 19 }) +
    T(790, 479, "de apă (înfundate?)", { s: 19 })
  ),
  "day02-s5": () => svgWrap(
    T(470, 46, "Întreținerea de bază", { s: 26, b: true }) +
    clipboard(70, 90, 380, 300, ["Bujii — verificate", "Filtru combustibil — curat", "Anod de zinc — schimbat", "Ulei — la nivel", "Service la intervalele", "recomandate de producător"]) +
    card(510, 90, 380, 190) +
    `<g transform="translate(600,185)"><rect x="-24" y="-48" width="48" height="88" rx="10" fill="#94a3b8" stroke="#334155" stroke-width="3"/></g>` +
    `<path d="M 660,120 q 40,26 30,66 q 30,-16 44,16" fill="none" stroke="#38bdf8" stroke-width="8" stroke-linecap="round"/>` +
    T(760, 200, "apă dulce", { s: 20, c: "#0369a1", b: true }) +
    T(700, 250, "clătit după apă sărată", { s: 19 }) +
    card(510, 300, 380, 90) +
    `<g transform="translate(575,345)"><rect x="-30" y="-14" width="60" height="28" rx="6" fill="#cbd5e1" stroke="#475569" stroke-width="3"/><circle cx="42" cy="0" r="10" fill="#94a3b8" stroke="#475569" stroke-width="3"/></g>` +
    T(700, 352, "anodul „de sacrificiu”", { s: 19, a: "start" }) +
    T(700, 378, "protejează de coroziune", { s: 17, a: "start", c: "#475569" })
  ),

  /* ---------------- ZIUA 3 ---------------- */
  "day03-s1": () => svgWrap(
    T(470, 44, "Sistemul de combustibil", { s: 26, b: true }) +
    // flux: rezervor → robinet → filtru → pompă → motor
    `<g transform="translate(120,180)"><rect x="-60" y="-46" width="120" height="92" rx="12" fill="#f59e0b" stroke="#92400e" stroke-width="3"/><rect x="-14" y="-62" width="28" height="16" fill="#92400e"/></g>` + T(120, 270, "rezervor", { s: 19 }) +
    line(180, 180, 280, 180, "#92400e", 6) + `<circle cx="310" cy="180" r="26" fill="#e2e8f0" stroke="#334155" stroke-width="4"/><line x1="298" y1="180" x2="322" y2="180" stroke="#334155" stroke-width="6"/>` + T(310, 240, "robinet", { s: 19 }) +
    line(336, 180, 420, 180, "#92400e", 6) + `<rect x="420" y="152" width="60" height="56" rx="10" fill="#bae6fd" stroke="#0369a1" stroke-width="3"/>` + T(450, 240, "filtru", { s: 19 }) +
    line(480, 180, 560, 180, "#92400e", 6) + `<circle cx="592" cy="180" r="30" fill="#cbd5e1" stroke="#334155" stroke-width="4"/>` + T(592, 240, "pompă", { s: 19 }) +
    line(622, 180, 700, 180, "#92400e", 6) + `<rect x="700" y="140" width="110" height="84" rx="12" fill="#64748b" stroke="#334155" stroke-width="4"/>` + T(755, 240, "motor", { s: 19 }) +
    // pericol vapori
    card(80, 320, 780, 200) + badge(470, 355, "La alimentare: motor OPRIT, fără flacără, ventilație!", "#7f1d1d", "#fff", 20) +
    `<g transform="translate(240,450)">${flames(0, 20, 0.8)}${cross(0, -6, 30)}</g>` +
    // vapori care coboară
    `<path d="M 480,395 q -12,26 6,44 q -14,22 4,42" fill="none" stroke="#a78bfa" stroke-width="6" stroke-linecap="round" stroke-dasharray="2 10"/>
     <path d="M 540,395 q -12,26 6,44 q -14,22 4,42" fill="none" stroke="#a78bfa" stroke-width="6" stroke-linecap="round" stroke-dasharray="2 10"/>` +
    T(700, 445, "vaporii sunt mai GREI ca aerul →", { s: 19, c: "#5b21b6" }) +
    T(700, 475, "se adună jos, în santină", { s: 19, c: "#5b21b6" })
  ),
  "day03-s2": () => svgWrap(
    T(470, 44, "Sistemul electric", { s: 26, b: true }) +
    `<g transform="translate(180,200)"><rect x="-70" y="-40" width="140" height="80" rx="10" fill="#334155"/><rect x="-50" y="-54" width="20" height="14" fill="#dc2626"/><rect x="30" y="-54" width="20" height="14" fill="#334155"/><text x="-40" y="-62" ${F} font-size="20" fill="#dc2626" text-anchor="middle">+</text><text x="40" y="-62" ${F} font-size="20" fill="#0f172a" text-anchor="middle">−</text></g>` +
    T(180, 290, "baterie: pornire, lumini, pompe", { s: 19 }) +
    line(260, 190, 380, 190, "#b45309", 5) +
    `<rect x="380" y="160" width="70" height="60" rx="10" fill="#e2e8f0" stroke="#334155" stroke-width="3"/><line x1="395" y1="205" x2="420" y2="172" stroke="#334155" stroke-width="5"/>` +
    T(415, 250, "întrerupător", { s: 18 }) +
    line(450, 190, 560, 190, "#b45309", 5) +
    `<rect x="560" y="170" width="46" height="40" rx="8" fill="#fef3c7" stroke="#b45309" stroke-width="3"/><path d="M 570,190 q 13,-16 26,0" fill="none" stroke="#b45309" stroke-width="4"/>` +
    T(583, 245, "siguranțe", { s: 18 }) +
    // kill switch
    card(120, 330, 700, 190) + capT(470, 366, "Kill switch — întrerupătorul de siguranță") +
    person(300, 450, 1.15, "stand", "#0f172a") +
    `<path d="M 322,432 q 60,18 120,6" fill="none" stroke="#dc2626" stroke-width="6" stroke-dasharray="10 6"/>` +
    `<g transform="translate(470,432)"><rect x="-16" y="-16" width="32" height="32" rx="8" fill="#dc2626" stroke="#7f1d1d" stroke-width="3"/><circle cx="0" cy="0" r="7" fill="#fff"/></g>` +
    T(660, 415, "brățara e prinsă de mână;", { s: 19, a: "start" }) +
    T(660, 445, "cazi în apă → motorul se", { s: 19, a: "start" }) +
    T(660, 475, "OPREȘTE instantaneu", { s: 19, a: "start", b: true, c: "#991b1b" })
  ),
  "day03-s3": () => svgWrap(
    T(470, 44, "Sistemul de guvernare", { s: 26, b: true }) +
    `<g transform="translate(230,240)"><circle r="70" fill="none" stroke="#334155" stroke-width="12"/><circle r="12" fill="#334155"/>${[0, 72, 144, 216, 288].map((a) => `<line x1="0" y1="0" x2="${Math.cos(a * Math.PI / 180) * 64}" y2="${Math.sin(a * Math.PI / 180) * 64}" stroke="#334155" stroke-width="8"/>`).join("")}</g>` +
    arc(230, 140, 300, 165, 275, 130, "#2563eb", 5) + arc(230, 340, 160, 315, 185, 350, "#2563eb", 5) +
    T(230, 420, "volan (timonă)", { s: 20 }) +
    line(310, 240, 520, 240, "#64748b", 8, "16 10") + T(415, 218, "transmisie mecanică / hidraulică", { s: 17, c: "#475569" }) +
    `<g transform="translate(650,240)">${boatTop(0, 0, 220, 90)}<g transform="translate(-124,0) rotate(-30)"><rect x="-8" y="-4" width="52" height="8" rx="4" fill="#dc2626"/></g></g>` +
    arc(500, 330, 560, 380, 510, 380, "#dc2626", 5) +
    badge(560, 430, "cârma / motorul se rotește → barca virează", "#0f172a", "#fff", 19) +
    card(120, 470, 700, 70) + check(165, 505) + T(200, 511, "Înainte de plecare: rotește volanul cap-la-cap și verifică jocul", { s: 20, a: "start" })
  ),
  "day03-s4": () => svgWrap(
    T(470, 44, "Santina și pompa de santină", { s: 26, b: true }) +
    // secțiune transversală cu apă
    `<g transform="translate(400,300)">
      <path d="M -240,-140 L -240,40 Q -240,120 0,130 Q 240,120 240,40 L 240,-140" fill="#e2e8f0" stroke="#334155" stroke-width="5"/>
      <path d="M -180,60 Q 0,116 180,60 L 180,96 Q 0,132 -180,96 Z" fill="#38bdf8" opacity="0.85"/>
    </g>` +
    badge(400, 470, "santina = fundul unde se adună apa", "#0369a1", "#fff", 19) +
    // pompa + evacuare
    `<g transform="translate(400,382)"><rect x="-30" y="-26" width="60" height="44" rx="8" fill="#334155"/><circle cx="0" cy="-4" r="12" fill="#94a3b8"/></g>` +
    `<path d="M 430,370 L 430,220 L 660,220" fill="none" stroke="#0891b2" stroke-width="9"/>` +
    arrow(660, 220, 730, 220, "#0891b2", 9) + badge(790, 220, "peste bord", "#0891b2") +
    T(400, 356, "pompă", { s: 17, c: "#e2e8f0", b: true }) +
    card(680, 300, 230, 150) + warn(730, 350, 24) +
    T(795, 345, "apă multă =", { s: 19, a: "middle", b: true }) +
    T(795, 375, "instabilitate,", { s: 18 }) + T(795, 402, "risc de scufundare", { s: 18, c: "#991b1b" }) +
    check(140, 520) + T(170, 526, "Testeaz-o manual și automat înainte de plecare", { s: 20, a: "start" })
  ),

  /* ---------------- ZIUA 4 ---------------- */
  "day04-s1": () => svgWrap(
    T(470, 44, "Documente obligatorii la bord", { s: 26, b: true }) +
    card(80, 90, 240, 330) + `<rect x="110" y="130" width="180" height="120" rx="12" fill="#dbeafe" stroke="#2563eb" stroke-width="3"/><circle cx="150" cy="175" r="24" fill="#93c5fd"/><rect x="190" y="150" width="80" height="9" rx="4" fill="#60a5fa"/><rect x="190" y="170" width="66" height="9" rx="4" fill="#60a5fa"/><rect x="190" y="190" width="74" height="9" rx="4" fill="#60a5fa"/>` +
    T(200, 300, "Brevetul / permisul", { s: 20, b: true }) + T(200, 330, "valabil pentru categoria", { s: 17, c: "#475569" }) + T(200, 356, "ambarcațiunii", { s: 17, c: "#475569" }) +
    card(350, 90, 240, 330) + `<rect x="392" y="126" width="156" height="130" rx="8" fill="#fff" stroke="#475569" stroke-width="3"/><rect x="408" y="146" width="124" height="8" rx="4" fill="#94a3b8"/><rect x="408" y="166" width="124" height="8" rx="4" fill="#94a3b8"/><rect x="408" y="186" width="90" height="8" rx="4" fill="#94a3b8"/><circle cx="512" cy="222" r="17" fill="none" stroke="#dc2626" stroke-width="3"/>` +
    T(470, 300, "Certificat /", { s: 20, b: true }) + T(470, 328, "înmatricularea", { s: 20, b: true }) + T(470, 356, "ambarcațiunii", { s: 17, c: "#475569" }) +
    card(620, 90, 240, 330) + `<g transform="translate(740,190)"><path d="M 0,-56 L 46,-38 L 46,8 Q 46,44 0,60 Q -46,44 -46,8 L -46,-38 Z" fill="#dcfce7" stroke="#16a34a" stroke-width="4"/>${check(0, 6, 16)}</g>` +
    T(740, 300, "Asigurarea", { s: 20, b: true }) + T(740, 330, "(unde este cerută)", { s: 17, c: "#475569" }) +
    badge(470, 480, "Autoritățile le pot cere la orice control", "#0f172a", "#fff", 20)
  ),
  "day04-s2": () => svgWrap(
    T(470, 42, "Dotările de siguranță obligatorii", { s: 26, b: true }) +
    card(50, 70, 200, 210) + vest(150, 160, 1.15) + T(150, 250, "veste — câte una", { s: 17, b: true }) + T(150, 272, "de persoană", { s: 17, b: true }) +
    card(270, 70, 200, 210) + ring(370, 160, 34) + T(370, 258, "colac cu saulă", { s: 17, b: true }) +
    card(490, 70, 200, 210) + exting(590, 165, 1.1) + T(590, 258, "stingător valabil", { s: 17, b: true }) +
    card(710, 70, 200, 210) + `<g transform="translate(810,150)"><path d="M -10,30 L -10,-24 L 12,-16 L 12,30 Z" fill="#dc2626"/><path d="M 1,-24 L 1,-52" stroke="#7f1d1d" stroke-width="5"/><path d="M 1,-52 l -8,14 l 16,0 Z" fill="#f59e0b"/></g>` + T(810, 258, "semnalizare", { s: 17, b: true }) +
    card(50, 300, 200, 210) + anchorIcon(150, 390, 1.05) + T(150, 488, "ancoră + parâmă", { s: 17, b: true }) +
    card(270, 300, 200, 210) + `<g transform="translate(370,390)"><path d="M -34,30 L -34,-10 Q -34,-30 -6,-30 L 30,-30 L 30,-14 L 0,-14 Q -14,-14 -14,0 L -14,30 Z" fill="#0891b2" stroke="#155e75" stroke-width="3"/></g>` + T(370, 488, "ispol / pompă", { s: 17, b: true }) +
    card(490, 300, 200, 210) + `<g transform="translate(590,390)"><rect x="-44" y="-32" width="88" height="64" rx="10" fill="#fff" stroke="#dc2626" stroke-width="4"/><rect x="-8" y="-22" width="16" height="44" fill="#dc2626"/><rect x="-22" y="-8" width="44" height="16" fill="#dc2626"/></g>` + T(590, 488, "trusă prim ajutor", { s: 17, b: true }) +
    card(710, 300, 200, 210) + radioIcon(810, 385, 1.0) + T(810, 488, "mijloc de comunicare", { s: 16, b: true })
  ),
  "day04-s3": () => svgWrap(
    T(470, 44, "Planifică înainte să pleci", { s: 26, b: true }) +
    card(60, 80, 260, 200) + sun(130, 150, 20) + cloud(220, 150, 0.75) + lightning(255, 165, 0.55) +
    T(190, 250, "verifică prognoza meteo", { s: 18, b: true }) +
    card(340, 80, 260, 200) + person(420, 190, 1.0, "stand", "#0f172a") +
    `<g transform="translate(500,150)"><rect x="-18" y="-30" width="36" height="60" rx="8" fill="#334155"/><rect x="-12" y="-22" width="24" height="38" rx="3" fill="#7dd3fc"/></g>` +
    T(470, 250, "anunță ruta și ora întoarcerii", { s: 17, b: true }) +
    card(620, 80, 260, 200) +
    `<g transform="translate(750,160)"><path d="M -80,40 A 84,84 0 0 1 80,40" fill="none" stroke="#e2e8f0" stroke-width="26"/><path d="M -80,40 A 84,84 0 0 1 -18,-42" fill="none" stroke="#16a34a" stroke-width="26"/><path d="M -18,-42 A 84,84 0 0 1 46,-32" fill="none" stroke="#f59e0b" stroke-width="26"/><path d="M 46,-32 A 84,84 0 0 1 80,40" fill="none" stroke="#dc2626" stroke-width="26"/><line x1="0" y1="36" x2="-30" y2="-20" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/></g>` +
    T(750, 250, "combustibil: regula treimilor", { s: 17, b: true }) +
    card(170, 320, 600, 190) + capT(470, 356, "Regula treimilor") +
    ["dus", "întors", "REZERVĂ"].map((lbl, i) =>
      `<rect x="${215 + i * 180}" y="380" width="150" height="60" rx="10" fill="${["#16a34a", "#f59e0b", "#dc2626"][i]}"/>` +
      T(290 + i * 180, 418, `1/3 ${lbl}`, { s: 21, c: "#fff", b: true })).join("") +
    T(470, 480, "o treime rămâne mereu pentru situații neprevăzute", { s: 18, c: "#475569" })
  ),
  "day04-s4": () => svgWrap(
    sky(320) + waterRect(320, 240) +
    boatSide(660, 320, 300) +
    dockTop(560, 396, 330, 40) +
    clipboard(60, 80, 420, 380, [
      "Motor: pornește, se răcește",
      "Combustibil + ulei: suficient",
      "Veste și dotări: la bord",
      "Lumini + instrumente: OK",
      "Pompa de santină: testată",
      "Meteo: verificată",
      "Persoană anunțată la mal",
    ]) +
    badge(660, 130, "Lista de control pre-plecare", "#0f172a", "#fff", 21) +
    T(660, 180, "o verificare disciplinată", { s: 19, c: "#0f172a" }) +
    T(660, 208, "previne majoritatea incidentelor", { s: 19, c: "#0f172a" })
  ),

  /* ---------------- ZIUA 5 ---------------- */
  "day05-s1": () => svgWrap(
    waterRect(0, 560) + dockTop(0, 60, 260, 46) +
    boatTop(330, 200, 170, 115) +
    arc(400, 230, 560, 330, 520, 240, "#ffffff", 6, "14 10") +
    badge(360, 110, "molează parâmele treptat", "#0f172a") +
    // zona înotători
    `<circle cx="770" cy="150" r="86" fill="#fbbf24" opacity="0.2" stroke="#f59e0b" stroke-width="4" stroke-dasharray="10 8"/>` +
    person(760, 150, 0.9, "water", "#dc2626") + T(770, 250, "distanță de înotători!", { s: 18, c: "#fff", b: true }) +
    // limitare viteza
    `<g transform="translate(150,420)"><circle r="52" fill="#fff" stroke="#dc2626" stroke-width="10"/><text x="0" y="14" ${F} font-size="40" font-weight="bold" text-anchor="middle" fill="#0f172a">5</text></g>` +
    T(150, 510, "viteză de siguranță în port", { s: 18, c: "#fff", b: true }) +
    badge(600, 480, "valul tău de etravă poate deranja / răsturna", "#7f1d1d", "#fff", 18)
  ),
  "day05-s2": () => svgWrap(
    waterRect(0, 560) +
    boatTop(430, 290, 300, 35) +
    // punct de pivot
    `<circle cx="395" cy="215" r="14" fill="#facc15" stroke="#92400e" stroke-width="3"/>` +
    badge(255, 160, "punct de pivot", "#d97706") +
    // prova spre dreapta, pupa alunecă spre stânga
    arc(520, 180, 640, 130, 600, 140, "#16a34a", 7) + badge(710, 120, "prova virează", "#16a34a") +
    arc(360, 420, 240, 470, 290, 470, "#dc2626", 7) + badge(200, 520, "pupa alunecă lateral!", "#dc2626") +
    T(470, 60, "Barca NU virează ca o mașină", { s: 25, c: "#fff", b: true }) +
    badge(700, 420, "atenție la spațiul din spate", "#0f172a", "#fff", 18)
  ),
  "day05-s3": () => svgWrap(
    waterRect(0, 560) +
    boatTop(470, 260, 300, 0) +
    `<g transform="translate(470,420)">${propIcon(0, 0, 1.5)}
      <path d="M 30,-40 A 50,50 0 1 1 -48,-16" fill="none" stroke="#facc15" stroke-width="6" marker-end="url(#md97706)"/></g>` +
    badge(470, 100, "MARȘARIER (dai înapoi)", "#0f172a") +
    arrow(470, 130, 470, 180, "#ffffff", 6) +
    // pupa împinsă spre babord (cu prova în sus, babordul e în STÂNGA imaginii)
    arrow(380, 420, 220, 420, "#dc2626", 9) + badge(150, 420, "pupa fuge", "#dc2626") +
    T(150, 460, "spre BABORD", { s: 20, c: "#fff", b: true }) +
    badge(520, 500, "efectul de evantai — folosește-l la acostare!", "#166534", "#fff", 19) +
    T(720, 300, "elice cu rotație", { s: 18, c: "#fff" }) + T(720, 326, "pe dreapta", { s: 18, c: "#fff" })
  ),
  "day05-s4": () => svgWrap(
    waterRect(0, 560) +
    boatTop(180, 280, 200, 90) +
    // săgeți descrescătoare
    arrow(300, 280, 420, 280, "#ffffff", 12) + arrow(460, 280, 540, 280, "#ffffff", 8) + arrow(580, 280, 630, 280, "#ffffff", 5) +
    dockTop(760, 180, 60, 220) +
    T(470, 240, "reduci gazul DIN TIMP", { s: 22, c: "#fff", b: true }) +
    `<g transform="translate(200,120)"><circle r="44" fill="#fff" stroke="#dc2626" stroke-width="9"/><path d="M -22,-8 A 24,24 0 0 1 22,-8" fill="none" stroke="#0f172a" stroke-width="7"/><line x1="-30" y1="30" x2="30" y2="-30" stroke="#dc2626" stroke-width="9"/></g>` +
    T(200, 200, "fără frâne!", { s: 21, c: "#fff", b: true }) +
    badge(430, 400, "la nevoie: marșarier, cu prudență", "#0f172a", "#fff", 19) +
    badge(430, 480, "distanța de oprire crește cu valuri, curent, încărcătură", "#b45309", "#fff", 18)
  ),

  /* ---------------- ZIUA 6 ---------------- */
  "day06-s1": () => svgWrap(
    waterRect(0, 560) + dockTop(0, 90, 940, 56) +
    boatTop(560, 380, 260, -35) +
    line(560, 380, 300, 168, "#ffffff", 3, "10 8") + line(560, 380, 560, 150, "#ffffff", 3, "10 8") +
    `<path d="M 560,290 A 90,90 0 0 0 490,320" fill="none" stroke="#facc15" stroke-width="5"/>` +
    T(480, 268, "20–30°", { s: 22, c: "#facc15", b: true }) +
    // baloane
    [[-70, -18], [-30, -52], [10, -84]].map(([dx, dy]) => `<ellipse cx="${560 + dx - 55}" cy="${380 + dy - 40}" rx="13" ry="20" fill="#fff" stroke="#94a3b8" stroke-width="3" transform="rotate(-35 ${560 + dx - 55} ${380 + dy - 40})"/>`).join("") +
    badge(320, 480, "baloane (tampoane) pregătite pe bord", "#0f172a", "#fff", 18) +
    badge(720, 240, "apropiere ÎNCEATĂ", "#166534", "#fff", 19) +
    T(470, 60, "parâmele pregătite, vântul evaluat", { s: 21, c: "#7c2d12", b: true })
  ),
  "day06-s2": () => svgWrap(
    waterRect(0, 560) + dockTop(0, 60, 940, 56) +
    windArrows(750, 420, 180, "VÂNT SPRE PONTON", "#ffffff") +
    boatTop(400, 330, 250, -90) +
    arrow(400, 250, 400, 170, "#facc15", 7, "2 8") +
    T(400, 480, "apropiere PARALELĂ, foarte lentă", { s: 21, c: "#fff", b: true }) +
    badge(400, 520, "vântul te „așază” singur — corectezi fin", "#166534", "#fff", 18) +
    badge(190, 150, "fixezi întâi prova / spring", "#0f172a", "#fff", 17)
  ),
  "day06-s3": () => svgWrap(
    waterRect(0, 560) + dockTop(0, 60, 940, 56) +
    windArrows(750, 250, 0, "VÂNT DINSPRE MAL", "#ffffff") +
    boatTop(430, 330, 250, -50) +
    line(430, 330, 240, 148, "#ffffff", 3, "10 8") +
    `<path d="M 430,255 A 80,80 0 0 0 372,278" fill="none" stroke="#facc15" stroke-width="5"/>` +
    T(340, 240, "unghi mare", { s: 20, c: "#facc15", b: true }) +
    badge(240, 440, "1. fixezi RAPID parâma din prova", "#0f172a", "#fff", 18) +
    badge(280, 500, "2. spring + puțin motor → aduci pupa la ponton", "#166534", "#fff", 18) +
    arc(540, 420, 620, 190, 660, 330, "#facc15", 6, "12 8")
  ),
  "day06-s4": () => svgWrap(
    waterRect(0, 560) + dockTop(0, 60, 940, 60) +
    boatTop(470, 300, 300, -90) +
    // parâme: prova, pupa, springuri
    line(330, 260, 250, 126, "#facc15", 6) + badge(180, 210, "parâma prova", "#d97706") +
    line(610, 260, 690, 126, "#facc15", 6) + badge(770, 210, "parâma pupa", "#d97706") +
    line(360, 290, 620, 128, "#4ade80", 5, "2 0") + badge(700, 300, "spring pupa", "#166534") +
    line(580, 290, 320, 128, "#4ade80", 5, "2 0") + badge(200, 300, "spring prova", "#166534") +
    badge(470, 420, "springurile blochează mișcarea înainte / înapoi", "#166534", "#fff", 19) +
    // nod la tachet
    `<g transform="translate(470,500)"><rect x="-60" y="-10" width="120" height="20" rx="10" fill="#475569"/><path d="M -40,-6 q 40,-26 80,0 q -40,22 -80,0" fill="none" stroke="#facc15" stroke-width="6"/></g>` +
    T(650, 508, "nod de tachet = fixare rapidă", { s: 18, c: "#fff" })
  ),

  /* ---------------- ZIUA 7 ---------------- */
  "day07-s1": () => svgWrap(
    T(470, 44, "Tipuri de ancore și fundul potrivit", { s: 25, b: true }) +
    card(50, 80, 200, 260) + anchorIcon(150, 190, 1.0) + T(150, 290, "plug (CQR)", { s: 19, b: true }) + T(150, 318, "nisip, mâl", { s: 17, c: "#475569" }) +
    card(270, 80, 200, 260) + `<g transform="translate(370,190)" stroke="#334155" fill="none" stroke-width="7" stroke-linecap="round"><line x1="0" y1="-44" x2="0" y2="10"/><path d="M -34,44 L 0,10 L 34,44"/><path d="M -34,44 L -44,20 M 34,44 L 44,20"/><line x1="-16" y1="-32" x2="16" y2="-32"/></g>` + T(370, 290, "Danforth", { s: 19, b: true }) + T(370, 318, "palete late: nisip", { s: 17, c: "#475569" }) +
    card(490, 80, 200, 260) + `<g transform="translate(590,190)" stroke="#334155" fill="none" stroke-width="7" stroke-linecap="round"><line x1="0" y1="-44" x2="0" y2="6"/><path d="M -36,20 Q 0,58 36,20"/><path d="M -36,20 q -8,-12 2,-20"/></g>` + T(590, 290, "gheară (Bruce)", { s: 19, b: true }) + T(590, 318, "pietre, mixte", { s: 17, c: "#475569" }) +
    card(710, 80, 200, 260) + `<g transform="translate(810,190)" stroke="#334155" fill="none" stroke-width="6" stroke-linecap="round"><line x1="0" y1="-44" x2="0" y2="20"/>${[-40, -15, 15, 40].map((a) => `<path d="M 0,20 q ${a},18 ${a * 1.2},34"/>`).join("")}</g>` + T(810, 290, "grapnel", { s: 19, b: true }) + T(810, 318, "brațe multiple", { s: 17, c: "#475569" }) +
    card(170, 380, 600, 140) +
    `<g transform="translate(280,455)"><rect x="-60" y="-8" width="120" height="30" rx="6" fill="#fbbf24"/><text x="0" y="14" ${F} font-size="16" text-anchor="middle">nisip</text></g>` +
    `<g transform="translate(470,455)"><rect x="-60" y="-8" width="120" height="30" rx="6" fill="#a16207"/><text x="0" y="14" ${F} font-size="16" text-anchor="middle" fill="#fff">mâl</text></g>` +
    `<g transform="translate(660,455)"><rect x="-60" y="-8" width="120" height="30" rx="6" fill="#94a3b8"/><text x="0" y="14" ${F} font-size="16" text-anchor="middle">pietre</text></g>` +
    T(470, 415, "alege ancora după natura fundului", { s: 20, b: true }) +
    badge(470, 540, "+ o porțiune de lanț lângă ancoră ajută prinderea", "#0f172a", "#fff", 17)
  ),
  "day07-s2": () => svgWrap(
    waterRect(0, 560) +
    // golf adăpostit
    `<path d="M 0,0 L 940,0 L 940,120 Q 700,60 520,140 Q 300,230 180,140 Q 80,80 0,120 Z" fill="#a3b18a" stroke="#588157" stroke-width="4"/>` +
    // șenal
    line(700, 180, 850, 470, "#facc15", 4, "14 10") + line(780, 160, 930, 450, "#facc15", 4, "14 10") +
    T(850, 520, "șenal navigabil", { s: 18, c: "#fff", b: true }) + cross(800, 320, 20) +
    // cercul de balans
    `<circle cx="330" cy="330" r="120" fill="#ffffff" opacity="0.14" stroke="#ffffff" stroke-width="3" stroke-dasharray="10 8"/>` +
    boatTop(330, 330, 120, 20) + anchorIcon(330, 220, 0.55, "#0f172a") +
    badge(330, 490, "spațiu de balans (barca se rotește cu vântul)", "#0f172a", "#fff", 17) +
    badge(200, 90, "adăpost de vânt și valuri", "#166534", "#fff", 18) +
    warn(620, 420, 24) + T(620, 480, "nu peste cabluri /", { s: 17, c: "#fff" }) + T(620, 505, "conducte submarine", { s: 17, c: "#fff" })
  ),
  "day07-s3": () => svgWrap(
    sky(220) + waterRect(220, 340) +
    windArrows(130, 130, -90, "VÂNT", "#0891b2") +
    // barca cu prova spre stânga (în vânt) — oglindită
    `<g transform="translate(1240,0) scale(-1,1)">${boatSide(620, 220, 260)}</g>` +
    // fundul apei
    `<path d="M 0,520 q 120,-16 240,0 t 240,0 t 240,0 t 240,0" fill="#d6bd94" stroke="#a16207" stroke-width="3"/><rect x="0" y="520" width="940" height="40" fill="#d6bd94"/>` +
    // calabrot 3-5x adâncime, filat de la provă
    `<path d="M 505,240 Q 380,330 250,505" fill="none" stroke="#334155" stroke-width="5" stroke-dasharray="12 7"/>` +
    anchorIcon(245, 505, 0.8) +
    line(880, 232, 880, 512, "#dc2626", 4) + `<path d="M 872,232 l 16,0 M 872,512 l 16,0" stroke="#dc2626" stroke-width="4"/>` +
    badge(830, 370, "adâncime", "#dc2626") +
    badge(390, 300, "calabrot = 3–5 × adâncimea", "#0f172a", "#fff", 20) +
    badge(390, 350, "(până la 7× pe vreme rea)", "#b45309", "#fff", 17) +
    badge(640, 120, "prova în vânt, filezi controlat", "#166534", "#fff", 19)
  ),
  "day07-s4": () => svgWrap(
    sky(240) + waterRect(240, 320) +
    // repere pe mal
    `<g transform="translate(140,120)"><rect x="-12" y="-60" width="24" height="60" fill="#dc2626"/><path d="M -12,-60 l 12,-20 l 12,20 Z" fill="#7f1d1d"/></g>` +
    `<g transform="translate(300,90)"><path d="M 0,-70 L 16,0 L -16,0 Z" fill="#166534"/><rect x="-4" y="0" width="8" height="26" fill="#713f12"/></g>` +
    line(140, 130, 620, 330, "#facc15", 3, "8 8") + line(300, 100, 620, 330, "#facc15", 3, "8 8") +
    boatTop(640, 340, 130, 30) +
    badge(660, 240, "aliniază 2 repere fixe pe mal", "#0f172a", "#fff", 19) +
    badge(660, 285, "rămân aliniate → ancora ține", "#166534", "#fff", 18) +
    // ancora care ara
    `<g transform="translate(240,470)">${anchorIcon(0, 0, 0.7)}<path d="M 30,10 q 40,8 80,4" fill="none" stroke="#a16207" stroke-width="6" stroke-dasharray="6 6"/></g>` +
    badge(430, 480, "„ară” (derapă)? → ridici și repoziționezi", "#b45309", "#fff", 18) +
    badge(760, 430, "ridicare: tragi VERTICAL, de deasupra", "#0f172a", "#fff", 16) + arrow(760, 460, 760, 500, "#ffffff", 6)
  ),

  /* ---------------- ZIUA 8 ---------------- */
  "day08-s1": () => svgWrap(
    T(470, 44, "Vestă de salvare vs. vestă de sprijin", { s: 25, b: true }) +
    card(70, 80, 380, 320) + capT(260, 114, "VESTĂ DE SALVARE") + vest(190, 210, 1.2) +
    `<g transform="translate(340,220)">${person(0, 0, 1.0, "lie", "#f97316")}<path d="M -60,-40 A 70,70 0 0 1 44,-52" fill="none" stroke="#16a34a" stroke-width="5" marker-end="url(#m16a34a)"/></g>` +
    T(260, 320, "întoarce automat persoana", { s: 19, b: true, c: "#166534" }) +
    T(260, 348, "inconștientă CU FAȚA ÎN SUS", { s: 19, b: true, c: "#166534" }) +
    card(490, 80, 380, 320) + capT(680, 114, "VESTĂ DE SPRIJIN") + vest(680, 210, 1.2, "#60a5fa") +
    T(680, 320, "doar ajutor la plutire —", { s: 19, c: "#b45309" }) +
    T(680, 348, "pentru înotători", { s: 19, c: "#b45309" }) +
    badge(470, 470, "mărimea corectă + încheiată corect", "#0f172a", "#fff", 20) +
    badge(470, 520, "copiii și înotătorii slabi o poartă PERMANENT", "#7f1d1d", "#fff", 19)
  ),
  "day08-s2": () => svgWrap(
    waterRect(200, 360) + sky(200) +
    boatSide(250, 220, 260) +
    person(660, 320, 1.1, "water", "#dc2626") +
    // colac aruncat cu saula
    ring(600, 250, 24) +
    `<path d="M 330,180 Q 480,120 596,242" fill="none" stroke="#f97316" stroke-width="4" stroke-dasharray="8 6"/>` +
    badge(430, 90, "colacul se aruncă CU SAULĂ (frânghie)", "#0f172a", "#fff", 19) +
    // scara
    `<g transform="translate(160,260)"><line x1="0" y1="0" x2="0" y2="90" stroke="#475569" stroke-width="6"/><line x1="34" y1="0" x2="34" y2="90" stroke="#475569" stroke-width="6"/>${[18, 44, 70].map((y) => `<line x1="0" y1="${y}" x2="34" y2="${y}" stroke="#475569" stroke-width="5"/>`).join("")}</g>` +
    T(160, 390, "scară de urcare", { s: 17, c: "#fff", b: true }) +
    badge(700, 460, "fluier + lumină = localizare, mai ales noaptea", "#0f172a", "#fff", 17) +
    `<circle cx="855" cy="390" r="14" fill="#fde047"/><circle cx="855" cy="390" r="26" fill="#fde047" opacity="0.3"/>`
  ),
  "day08-s3": () => svgWrap(
    T(470, 42, "Stingătorul: tehnica P-A-S-S", { s: 26, b: true }) +
    [["1", "Scoți siguranța", 145], ["2", "Țintești BAZA focului", 375], ["3", "Apeși mânerul", 605], ["4", "Baleiezi lateral", 835]]
      .map(([n, lbl], i) => {
        const x = 145 + i * 230;
        return card(x - 105, 80, 210, 250) + `<circle cx="${x}" cy="120" r="22" fill="#2563eb"/>` + T(x, 129, n, { s: 24, c: "#fff", b: true }) +
          exting(x - 30, 220, 0.85) + T(x, 300, lbl, { s: 16.5, b: true });
      }).join("") +
    // focul cu sageata la baza
    flames(300, 490, 1.15) +
    arrow(430, 420, 330, 478, "#2563eb", 6) + badge(520, 400, "jetul la BAZĂ, nu la flacără", "#1d4ed8", "#fff", 18) +
    `<path d="M 250,500 q 60,14 120,0" fill="none" stroke="#2563eb" stroke-width="6" marker-end="url(#m2563eb)"/>` +
    badge(720, 490, "amplasat accesibil, NU lângă motor", "#0f172a", "#fff", 17)
  ),
  "day08-s4": () => svgWrap(
    `<rect width="940" height="560" fill="url(#nightG)"/>` +
    T(470, 44, "Semnale de primejdie", { s: 26, b: true, c: "#fff" }) +
    card(60, 80, 260, 190, 14, "#1e293b", "#475569") + `<g transform="translate(190,165)"><path d="M -6,40 L -6,-20 L 10,-14 L 10,40 Z" fill="#dc2626"/><path d="M 2,-20 L 2,-44" stroke="#94a3b8" stroke-width="4"/><circle cx="2" cy="-52" r="10" fill="#f87171"/><circle cx="2" cy="-52" r="20" fill="#f87171" opacity="0.3"/></g>` + T(190, 250, "rachetă ROȘIE", { s: 18, c: "#fca5a5", b: true }) +
    card(340, 80, 260, 190, 14, "#1e293b", "#475569") + `<g transform="translate(470,180)"><rect x="-20" y="-16" width="40" height="40" rx="6" fill="#ea580c"/><path d="M -8,-18 q -10,-28 8,-44 q -2,26 14,20 q -4,16 6,24" fill="#fb923c" opacity="0.85"/></g>` + T(470, 250, "fumigenă portocalie", { s: 18, c: "#fdba74", b: true }) +
    card(620, 80, 260, 190, 14, "#1e293b", "#475569") + person(750, 190, 1.0, "water", "#f8fafc") + T(750, 250, "brațe ridicate-coborâte", { s: 17, c: "#e2e8f0", b: true }) +
    card(180, 300, 580, 220, 16, "#0f172a", "#facc15") +
    radioIcon(320, 400, 1.25) +
    badge(560, 370, "VHF — canalul 16", "#facc15", "#0f172a", 24) +
    T(560, 430, "„MAYDAY, MAYDAY, MAYDAY”", { s: 24, c: "#fff", b: true }) +
    T(560, 470, "cel mai eficient apel de urgență", { s: 18, c: "#94a3b8" })
  ),

  /* ---------------- ZIUA 9 ---------------- */
  "day09-s1": () => svgWrap(
    waterRect(0, 560) +
    boatTop(320, 240, 220, 70) +
    person(295, 235, 0.9, "point", "#facc15") +
    badge(280, 110, "1. Strigă „OM LA APĂ!” + arată permanent", "#0f172a", "#fff", 17) +
    person(700, 350, 1.15, "water", "#dc2626") +
    ring(610, 320, 22) + badge(560, 250, "2. aruncă ceva plutitor", "#0f172a", "#fff", 17) +
    arc(420, 300, 640, 430, 520, 480, "#ffffff", 6, "14 10") +
    badge(420, 500, "3. întoarce și apropie-te DIN VÂNT", "#166534", "#fff", 18) +
    windArrows(850, 140, 135, "VÂNT", "#ffffff")
  ),
  "day09-s2": () => svgWrap(
    waterRect(0, 560) +
    boatSide(420, 330, 340) + flames(310, 300, 1.3) +
    windArrows(130, 180, 90, "VÂNT", "#ffffff") +
    person(520, 285, 1.0, "stand", "#0f172a") + exting(575, 300, 0.8) +
    arrow(560, 320, 360, 302, "#2563eb", 6) +
    badge(660, 120, "oprește motorul + combustibilul", "#7f1d1d", "#fff", 19) +
    badge(660, 170, "flăcările duse de vânt DEPARTE de oameni", "#0f172a", "#fff", 17) +
    badge(470, 470, "nu poți controla focul? veste + MAYDAY + abandon", "#b45309", "#fff", 18)
  ),
  "day09-s3": () => svgWrap(
    T(470, 42, "Avarie, infiltrații și eșuare", { s: 25, b: true }) +
    card(60, 80, 400, 400) + capT(260, 114, "Infiltrație de apă") +
    `<g transform="translate(260,240)"><path d="M -150,-60 L -150,20 Q -150,80 0,88 Q 150,80 150,20 L 150,-60" fill="#e2e8f0" stroke="#334155" stroke-width="4"/><path d="M -110,30 Q 0,72 110,30 L 110,54 Q 0,88 -110,54 Z" fill="#38bdf8"/><circle cx="-88" cy="-4" r="10" fill="#0284c7"/><path d="M -118,-10 q 16,4 20,6" stroke="#0284c7" stroke-width="5" fill="none"/></g>` +
    badge(260, 360, "1. găsești și reduci intrarea apei", "#0f172a", "#fff", 16) +
    badge(260, 405, "2. pompă de santină + evacuare manuală", "#0369a1", "#fff", 16) +
    card(490, 80, 400, 400) + capT(690, 114, "Eșuare (pe fund)") +
    `<g transform="translate(690,250)">${waterRect ? "" : ""}<rect x="-180" y="30" width="360" height="60" fill="#d6bd94" stroke="#a16207" stroke-width="3" rx="8"/>${boatSide(0, 16, 240)}</g>` +
    badge(690, 360, "1. oprește IMEDIAT elicea", "#7f1d1d", "#fff", 16) +
    badge(690, 405, "2. evaluează, nu forța motorul", "#b45309", "#fff", 16) +
    T(690, 455, "uneori e mai sigur să aștepți ajutor", { s: 17, c: "#475569" })
  ),
  "day09-s4": () => svgWrap(
    waterRect(0, 560) +
    boatTop(220, 230, 180, 55) + boatTop(650, 380, 180, 55) +
    `<path d="M 285,290 Q 420,320 585,345" fill="none" stroke="#facc15" stroke-width="7"/>` +
    // zona periculoasa în jurul parâmei
    `<ellipse cx="435" cy="318" rx="180" ry="70" fill="#dc2626" opacity="0.15" stroke="#dc2626" stroke-width="3" stroke-dasharray="10 8"/>` +
    warn(435, 250, 26) +
    badge(435, 170, "parâma sub tensiune poate „biciui” dacă se rupe!", "#7f1d1d", "#fff", 18) +
    badge(230, 470, "prinsă de puncte SOLIDE", "#0f172a", "#fff", 17) +
    badge(680, 500, "pornire lentă, fără smucituri, viteză mică", "#166534", "#fff", 17)
  ),

  /* ---------------- ZIUA 10 ---------------- */
  "day10-s1": () => svgWrap(
    T(470, 42, "Hipotermia", { s: 26, b: true }) +
    card(60, 80, 280, 300) + capT(200, 114, "Semne") +
    person(160, 220, 1.1, "stand", "#60a5fa") +
    `<path d="M 210,170 q 8,-10 16,0 q 8,10 16,0 M 210,200 q 8,-10 16,0 q 8,10 16,0" stroke="#60a5fa" stroke-width="4" fill="none"/>` +
    T(200, 300, "frisoane, confuzie,", { s: 18 }) + T(200, 328, "amorțeală, apatie", { s: 18 }) +
    card(380, 80, 500, 300) + capT(630, 114, "Ce faci") +
    check(430, 160) + T(460, 167, "scoți persoana din apă", { s: 19, a: "start" }) +
    check(430, 205) + T(460, 212, "haine ude JOS → învelitoare uscată", { s: 19, a: "start" }) +
    check(430, 250) + T(460, 257, "încălzire TREPTATĂ (folie termică)", { s: 19, a: "start" }) +
    cross(430, 300) + T(460, 307, "fără frecție agresivă / mișcări bruște", { s: 19, a: "start", c: "#991b1b" }) +
    cross(430, 345) + T(460, 352, "fără alcool", { s: 19, a: "start", c: "#991b1b" }) +
    // termometru care scade
    `<g transform="translate(200,470)"><rect x="-10" y="-56" width="20" height="86" rx="10" fill="#e2e8f0" stroke="#475569" stroke-width="3"/><circle cy="44" r="18" fill="#3b82f6"/><rect x="-5" y="-10" width="10" height="52" fill="#3b82f6"/></g>` +
    arrow(255, 430, 255, 500, "#3b82f6", 6) +
    badge(560, 470, "apa rece fură căldura corpului foarte repede", "#1d4ed8", "#fff", 18)
  ),
  "day10-s2": () => svgWrap(
    waterRect(260, 300) + sky(260) +
    boatSide(300, 290, 260) +
    person(650, 380, 1.1, "water", "#dc2626") +
    arc(600, 360, 420, 300, 520, 290, "#facc15", 6) +
    badge(600, 120, "1. Scoate victima în siguranță (nu te expune!)", "#0f172a", "#fff", 18) +
    badge(600, 170, "2. Verifică starea de conștiență și respirația", "#0f172a", "#fff", 18) +
    badge(600, 220, "3. NU respiră? → RCP imediat + cere ajutor", "#7f1d1d", "#fff", 18) +
    // verificarea respiratiei
    `<g transform="translate(200,470)">${person(0, 10, 1.0, "lie", "#64748b")}<g transform="translate(50,-20)"><circle cx="0" cy="0" r="10" fill="#fcd9b6" stroke="#92400e" stroke-width="2"/><path d="M -6,14 q 6,10 12,0" stroke="#2563eb" stroke-width="4" fill="none"/></g></g>` +
    T(380, 470, "privești, asculți, simți", { s: 18, c: "#fff", b: true }) + T(380, 498, "respirația (max 10 sec.)", { s: 18, c: "#fff" })
  ),
  "day10-s3": () => svgWrap(
    T(470, 42, "Resuscitarea (RCP) — adult", { s: 26, b: true }) +
    // scena compresii
    `<g transform="translate(330,250)">${person(0, 30, 1.5, "lie", "#64748b")}
      <g transform="translate(-8,-58)"><circle cx="0" cy="-24" r="12" fill="#fcd9b6" stroke="#92400e" stroke-width="2"/><rect x="-9" y="-12" width="18" height="30" rx="7" fill="#2563eb"/><line x1="-6" y1="16" x2="-14" y2="52" stroke="#2563eb" stroke-width="7" stroke-linecap="round"/><line x1="6" y1="16" x2="0" y2="52" stroke="#2563eb" stroke-width="7" stroke-linecap="round"/></g>
      <circle cx="-16" cy="16" r="9" fill="#fcd9b6" stroke="#92400e" stroke-width="2"/></g>` +
    arrow(310, 150, 310, 210, "#dc2626", 7) +
    badge(180, 380, "în CENTRUL pieptului", "#0f172a", "#fff", 17) +
    // parametri
    card(560, 120, 330, 320) +
    badge(725, 165, "30 compresii : 2 ventilații", "#dc2626", "#fff", 21) +
    T(725, 230, "adâncime: 5–6 cm", { s: 22, b: true }) +
    T(725, 280, "ritm: 100–120 / minut", { s: 22, b: true }) +
    T(725, 340, "nu te opri până vine", { s: 19, c: "#475569" }) +
    T(725, 368, "ajutorul sau victima respiră", { s: 19, c: "#475569" }) +
    badge(470, 500, "și un RCP imperfect e mai bun decât nimic", "#166534", "#fff", 19)
  ),
  "day10-s4": () => svgWrap(
    T(470, 42, "Răni frecvente & trusa de prim ajutor", { s: 25, b: true }) +
    card(60, 80, 400, 300) + capT(260, 114, "Oprirea sângerării") +
    `<g transform="translate(220,220)"><line x1="-70" y1="30" x2="70" y2="-10" stroke="#fcd9b6" stroke-width="26" stroke-linecap="round"/><rect x="-30" y="-24" width="60" height="40" rx="8" fill="#fff" stroke="#dc2626" stroke-width="4"/><path d="M -12,-34 q 12,-14 24,0" stroke="#2563eb" stroke-width="8" fill="none" stroke-linecap="round"/></g>` +
    arrow(260, 130, 235, 180, "#2563eb", 6) +
    badge(260, 330, "PRESIUNE DIRECTĂ pe rană + pansament curat", "#0f172a", "#fff", 16) +
    card(490, 80, 400, 300) + capT(690, 114, "Trusa — conținut") +
    ["pansamente & fașe", "dezinfectant", "foarfecă & mănuși", "folie termică de supraviețuire"].map((it, i) =>
      check(540, 160 + i * 44) + T(568, 167 + i * 44, it, { s: 19, a: "start" })).join("") +
    badge(690, 350, "verifică periodic valabilitatea!", "#b45309", "#fff", 17) +
    badge(470, 470, "alte riscuri: arsuri, insolație, rău de mare", "#475569", "#fff", 18) +
    sun(120, 470, 20) + `<path d="M 780,470 q 14,-22 28,0 t 28,0" fill="none" stroke="#0891b2" stroke-width="5"/>`
  ),

  /* ---------------- ZIUA 11 ---------------- */
  "day11-s1": () => svgWrap(
    waterRect(0, 560) +
    // șenal marcat de geamanduri spre port
    `<path d="M 300,560 Q 380,300 470,120 L 570,120 Q 560,300 640,560 Z" fill="#ffffff" opacity="0.10"/>` +
    buoyCan(300, 500, 0.9) + buoyCan(360, 340, 0.75) + buoyCan(420, 200, 0.6) +
    buoyCone(640, 500, 0.9) + buoyCone(590, 340, 0.75) + buoyCone(545, 200, 0.6) +
    // portul
    `<rect x="400" y="40" width="180" height="60" rx="8" fill="#a3b18a" stroke="#588157" stroke-width="3"/>` + T(490, 78, "PORT", { s: 24, b: true, c: "#1a2e05" }) +
    arrow(470, 480, 470, 300, "#facc15", 7, "2 10") +
    badge(470, 540, "sens de intrare: dinspre mare spre port", "#0f172a", "#fff", 17) +
    badge(160, 150, "sistemul IALA", "#0f172a", "#fff", 19) + badge(160, 195, "Regiunea A (Europa)", "#2563eb", "#fff", 17) +
    badge(790, 150, "formă + culoare", "#0f172a", "#fff", 17) + badge(790, 195, "+ lumină (noaptea)", "#0f172a", "#fff", 17)
  ),
  "day11-s2": () => svgWrap(
    waterRect(0, 560) +
    buoyCan(240, 330, 1.7) + buoyCone(700, 330, 1.7) +
    badge(240, 420, "BABORD: roșie, CILINDRICĂ", "#dc2626", "#fff", 19) +
    badge(240, 465, "o lași la STÂNGA", "#0f172a", "#fff", 18) +
    badge(700, 420, "TRIBORD: verde, CONICĂ", "#166534", "#fff", 19) +
    badge(700, 465, "o lași la DREAPTA", "#0f172a", "#fff", 18) +
    boatTop(470, 460, 130, 0) +
    arrow(470, 380, 470, 240, "#facc15", 8, "2 10") +
    badge(470, 110, "INTRARE dinspre mare", "#0f172a", "#fff", 20) +
    T(470, 160, "(sau în sensul curentului de flux)", { s: 17, c: "#fff" })
  ),
  "day11-s3": () => svgWrap(
    waterRect(0, 560) +
    // pericol central
    `<circle cx="470" cy="300" r="56" fill="#78350f" opacity="0.85"/><path d="M 442,276 L 498,324 M 498,276 L 442,324" stroke="#fff" stroke-width="8"/>` +
    badge(330, 300, "PERICOL", "#7f1d1d", "#fff", 17) +
    buoyPillar(470, 165, 0.95, ["#1f2937", "#facc15"], "NN") + badge(660, 110, "N: treci pe la NORD", "#0f172a", "#fff", 16) +
    buoyPillar(470, 530, 0.95, ["#facc15", "#1f2937"], "SS") + badge(665, 500, "S: treci pe la SUD", "#0f172a", "#fff", 16) +
    buoyPillar(810, 320, 0.95, ["#1f2937", "#facc15", "#1f2937"], "EE") + badge(810, 400, "E: treci pe la EST", "#0f172a", "#fff", 16) +
    buoyPillar(130, 320, 0.95, ["#facc15", "#1f2937", "#facc15"], "WW") + badge(140, 400, "V: treci pe la VEST", "#0f172a", "#fff", 16) +
    badge(230, 60, "apa sigură = pe partea indicată de marcă", "#166534", "#fff", 16)
  ),
  "day11-s4": () => svgWrap(
    waterRect(0, 560) +
    buoyPillar(190, 400, 1.6, ["#1f2937", "#dc2626", "#1f2937"], "sphere2") +
    badge(190, 460, "PERICOL IZOLAT", "#0f172a", "#fff", 18) + badge(190, 505, "stă PE pericol → ocolește!", "#7f1d1d", "#fff", 16) +
    `<g transform="translate(470,400) scale(1.6)"><rect x="-14" y="-104" width="7" height="84" fill="#dc2626"/><rect x="-7" y="-104" width="7" height="84" fill="#fff"/><rect x="0" y="-104" width="7" height="84" fill="#dc2626"/><rect x="7" y="-104" width="7" height="84" fill="#fff"/><circle cx="0" cy="-116" r="10" fill="#dc2626"/><path d="M -26,-20 L 26,-20 L 18,0 L -18,0 Z" fill="#94a3b8" stroke="#1f2937" stroke-width="2"/></g>` +
    badge(470, 460, "APE SIGURE", "#166534", "#fff", 18) + badge(470, 505, "poți trece pe oricare parte", "#0f172a", "#fff", 16) +
    buoyPillar(750, 400, 1.6, ["#facc15"], "x") +
    badge(750, 460, "MARCĂ SPECIALĂ", "#b45309", "#fff", 18) + badge(750, 505, "zone agrement, cabluri etc.", "#0f172a", "#fff", 16) +
    T(470, 50, "Alte mărci importante", { s: 24, c: "#fff", b: true })
  ),

  /* ---------------- ZIUA 12 ---------------- */
  "day12-s1": () => svgWrap(
    waterRect(0, 560) +
    boatTop(240, 300, 220, 25) +
    // veghe: binoclu
    `<g transform="translate(240,150)"><circle cx="-14" cy="0" r="17" fill="#334155"/><circle cx="14" cy="0" r="17" fill="#334155"/><rect x="-8" y="-8" width="16" height="10" fill="#334155"/></g>` +
    badge(240, 90, "VEGHE permanentă (ochi + urechi)", "#0f172a", "#fff", 18) +
    // vitezometru
    `<g transform="translate(640,180)"><path d="M -70,30 A 76,76 0 0 1 70,30" fill="none" stroke="#e2e8f0" stroke-width="20"/><path d="M -70,30 A 76,76 0 0 1 8,-44" fill="none" stroke="#16a34a" stroke-width="20"/><line x1="0" y1="26" x2="-26" y2="-24" stroke="#0f172a" stroke-width="7" stroke-linecap="round"/></g>` +
    badge(640, 260, "viteză ADAPTATĂ condițiilor", "#166534", "#fff", 18) +
    arc(320, 380, 620, 470, 480, 490, "#facc15", 8) +
    badge(480, 400, "manevre FĂCUTE DEVREME, ample și clare", "#0f172a", "#fff", 19) +
    T(470, 545, "ține cont și de navele mari, greu manevrabile", { s: 18, c: "#fff" })
  ),
  "day12-s2": () => svgWrap(
    waterRect(0, 560) +
    boatTop(300, 440, 210, 0) + boatTop(640, 130, 210, 180) +
    // fiecare vireaza la tribord
    arc(300, 330, 390, 220, 300, 240, "#4ade80", 8) +
    arc(640, 240, 550, 350, 640, 330, "#4ade80", 8) +
    badge(470, 60, "FAȚĂ ÎN FAȚĂ: fiecare virează la TRIBORD (dreapta)", "#0f172a", "#fff", 19) +
    badge(470, 290, "se trec babord la babord", "#166534", "#fff", 19) +
    navDot(255, 400, "#ef4444", 9) + navDot(345, 400, "#22c55e", 9) +
    navDot(685, 170, "#ef4444", 9) + navDot(595, 170, "#22c55e", 9) +
    T(470, 530, "ca pe un drum cu circulație pe dreapta", { s: 19, c: "#fff" })
  ),
  "day12-s3": () => svgWrap(
    waterRect(0, 560) +
    // barca privilegiată vine din tribordul tău (din dreapta, traversând spre stânga)
    boatTop(700, 210, 200, -90) +
    badge(700, 90, "vine din TRIBORDUL tău", "#166534", "#fff", 18) +
    badge(700, 135, "PRIORITATE: menține drum + viteză", "#166534", "#fff", 16) +
    arrow(590, 210, 430, 210, "#4ade80", 8) +
    boatTop(240, 390, 200, 0) +
    badge(240, 520, "TU cedezi trecerea", "#b45309", "#fff", 19) +
    // manevra: virezi la dreapta și treci prin pupa celeilalte
    `<path d="M 240,290 Q 300,180 520,300 T 850,330" fill="none" stroke="#facc15" stroke-width="7" stroke-dasharray="14 9" marker-end="url(#md97706)"/>` +
    badge(520, 470, "redu viteza sau treci prin PUPA celeilalte", "#0f172a", "#fff", 18) +
    arrow(790, 300, 790, 250, "#facc15", 5) + T(790, 330, "prin pupa ei", { s: 17, c: "#facc15", b: true })
  ),
  "day12-s4": () => svgWrap(
    waterRect(0, 300) +
    boatTop(360, 160, 170, 90) + boatTop(600, 210, 150, 90) +
    arc(530, 220, 700, 150, 610, 120, "#facc15", 7, "10 8") +
    badge(310, 70, "cel care DEPĂȘEȘTE cedează întotdeauna", "#0f172a", "#fff", 18) +
    // ierarhie
    `<rect x="0" y="300" width="940" height="260" fill="#f8fafc"/>` +
    T(470, 340, "Ierarhia priorităților (regulă generală)", { s: 22, b: true }) +
    `<rect x="180" y="360" width="580" height="52" rx="10" fill="#16a34a"/>` + T(470, 393, "vele · pescuit · nave greu manevrabile", { s: 20, c: "#fff", b: true }) +
    arrow(470, 418, 470, 448, "#475569", 5) + T(560, 440, "au prioritate față de", { s: 16, c: "#475569", a: "start" }) +
    `<rect x="280" y="452" width="380" height="52" rx="10" fill="#2563eb"/>` + T(470, 485, "ambarcațiuni cu motor", { s: 20, c: "#fff", b: true }) +
    badge(470, 540, "excepție: în șenal îngust, navele mari au prioritate practică", "#b45309", "#fff", 16)
  ),

  /* ---------------- ZIUA 13 ---------------- */
  "day13-s1": () => svgWrap(
    `<rect width="940" height="560" fill="url(#nightG)"/>` +
    boatTop(470, 300, 300, 0, "#334155", "#64748b") +
    // sectoare
    `<path d="M 470,300 L 470,80 A 220,220 0 0 1 678,225 Z" fill="#22c55e" opacity="0.30"/>` +
    `<path d="M 470,300 L 470,80 A 220,220 0 0 0 262,225 Z" fill="#ef4444" opacity="0.30"/>` +
    `<path d="M 470,300 L 320,470 A 220,220 0 0 0 620,470 Z" fill="#f8fafc" opacity="0.30"/>` +
    navDot(538, 240, "#22c55e") + navDot(402, 240, "#ef4444") + navDot(470, 440, "#f8fafc") + navDot(470, 200, "#f8fafc", 9) +
    badge(760, 160, "TRIBORD: verde 112,5°", "#166534", "#fff", 17) +
    badge(180, 160, "BABORD: roșu 112,5°", "#991b1b", "#fff", 17) +
    badge(470, 520, "PUPA: alb 135°", "#334155", "#fff", 17) +
    badge(700, 90, "+ lumină albă de catarg (motor)", "#0f172a", "#fff", 16) +
    T(470, 44, "Se aprind de la apus la răsărit + vizibilitate redusă", { s: 20, c: "#e2e8f0", b: true })
  ),
  "day13-s2": () => svgWrap(
    `<rect width="940" height="560" fill="url(#nightG)"/>` +
    T(470, 46, "Ce vezi noaptea? Ce înseamnă?", { s: 25, c: "#fff", b: true }) +
    card(55, 80, 260, 300, 16, "#0b1220", "#334155") +
    navDot(150, 190, "#ef4444") + navDot(220, 190, "#22c55e") + navDot(185, 140, "#f8fafc", 9) +
    badge(185, 290, "roșu + verde + alb", "#334155", "#fff", 16) +
    badge(185, 335, "VINE SPRE TINE!", "#991b1b", "#fff", 18) +
    card(340, 80, 260, 300, 16, "#0b1220", "#334155") +
    navDot(470, 180, "#22c55e") +
    badge(470, 290, "doar VERDE", "#334155", "#fff", 16) +
    badge(470, 335, "îi vezi tribordul", "#166534", "#fff", 17) +
    card(625, 80, 260, 300, 16, "#0b1220", "#334155") +
    navDot(755, 180, "#f8fafc") +
    badge(755, 290, "doar ALB (pupa)", "#334155", "#fff", 16) +
    badge(755, 335, "o ajungi din urmă", "#b45309", "#fff", 17) +
    badge(470, 440, "o ajungi din urmă = TU ești cel care depășește → te ferești", "#0f172a", "#fff", 18) +
    T(470, 510, "doar roșu = îi vezi babordul", { s: 19, c: "#cbd5e1" })
  ),
  "day13-s3": () => svgWrap(
    T(470, 44, "Semnale sonore de manevră", { s: 26, b: true }) +
    // corn
    `<g transform="translate(150,150)"><path d="M -40,-20 L 10,-34 L 10,34 L -40,20 Z" fill="#475569"/><path d="M 10,-34 Q 60,0 10,34" fill="#64748b"/></g>` +
    [["●", "vireze la TRIBORD (dreapta)", "#166534", 170],
     ["● ●", "vireze la BABORD (stânga)", "#dc2626", 280],
     ["● ● ●", "dau ÎNAPOI (marșarier)", "#7c3aed", 390]]
      .map(([dots, lbl, c, y]) =>
        `<rect x="280" y="${y - 40}" width="180" height="70" rx="12" fill="#0f172a"/>` +
        T(370, y + 5, dots, { s: 30, c: "#fff", b: true }) +
        arrow(470, y - 5, 520, y - 5, c, 6) +
        badge(680, y - 5, lbl, c, "#fff", 19)).join("") +
    T(470, 500, "un sunet scurt ≈ 1 secundă — folosite când navele se văd", { s: 20, c: "#475569" })
  ),
  "day13-s4": () => svgWrap(
    // jumatate ceata
    `<rect width="940" height="560" fill="#cbd5e1"/>` +
    [80, 170, 260].map((y) => `<ellipse cx="470" cy="${y}" rx="420" ry="34" fill="#e2e8f0" opacity="0.8"/>`).join("") +
    `<rect x="240" y="60" width="460" height="86" rx="16" fill="#0f172a"/>` +
    T(470, 100, "● ● ● ● ●", { s: 30, c: "#fff", b: true }) + T(470, 132, "≥ 5 scurte = ATENȚIE / nu-ți înțeleg intențiile", { s: 17, c: "#fbbf24", b: true }) +
    `<rect x="240" y="180" width="460" height="86" rx="16" fill="#0f172a"/>` +
    T(470, 222, "▬▬▬", { s: 30, c: "#fff", b: true }) + T(470, 252, "1 lung = ies din port / dintr-un cot fără vizibilitate", { s: 17, c: "#7dd3fc", b: true }) +
    waterRect(300, 260) +
    boatSide(300, 400, 240) +
    `<g transform="translate(420,330)">${[0, 1, 2].map((i) => `<path d="M ${20 + i * 26},-12 a 26,26 0 0 1 0,${24 + i * 10}" fill="none" stroke="#0f172a" stroke-width="5" opacity="${0.9 - i * 0.25}"/>`).join("")}</g>` +
    badge(660, 480, "pe CEAȚĂ: semnale sonore periodice, ca să fii auzit", "#0f172a", "#fff", 18)
  ),

  /* ---------------- ZIUA 14 ---------------- */
  "day14-s1": () => svgWrap(
    sky(560) +
    // barometru care scade
    `<g transform="translate(190,200)"><circle r="90" fill="#fff" stroke="#334155" stroke-width="6"/><line x1="0" y1="0" x2="-52" y2="48" stroke="#dc2626" stroke-width="7" stroke-linecap="round"/><text x="0" y="-46" ${F} font-size="18" text-anchor="middle">1020</text><text x="-58" y="-6" ${F} font-size="18" text-anchor="middle">990</text><circle r="9" fill="#334155"/></g>` +
    arrow(190, 320, 190, 390, "#dc2626", 8) +
    badge(190, 440, "barometrul SCADE rapid = vreme rea", "#991b1b", "#fff", 18) +
    // cumulonimbus
    cloud(600, 130, 1.7, "#64748b") + cloud(680, 100, 1.2, "#475569") + lightning(620, 175, 1.1) +
    windArrows(840, 200, 65, "rafale", "#0891b2") +
    badge(650, 290, "nori înalți + rafale + vânt schimbător = furtună", "#0f172a", "#fff", 17) +
    radioIcon(600, 430, 1.0) +
    badge(740, 430, "buletine meteo marine:", "#0f172a", "#fff", 16) +
    T(740, 480, "înainte ȘI în timpul ieșirii", { s: 18, b: true })
  ),
  "day14-s2": () => svgWrap(
    // harta
    `<rect width="940" height="560" fill="#e7f5f8"/>` +
    `<path d="M 0,0 L 940,0 L 940,110 Q 640,60 470,150 Q 260,250 120,170 Q 40,120 0,150 Z" fill="#a3b18a" stroke="#588157" stroke-width="3"/>` +
    `<path d="M 780,560 Q 820,420 940,390 L 940,560 Z" fill="#a3b18a" stroke="#588157" stroke-width="3"/>` +
    // traseu principal cu waypointuri
    `<path d="M 130,240 Q 300,380 470,360 Q 660,340 780,480" fill="none" stroke="#2563eb" stroke-width="6"/>` +
    [[130, 240], [310, 372], [470, 360], [650, 350], [780, 480]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="11" fill="#fff" stroke="#2563eb" stroke-width="4"/><text x="${x}" y="${y - 18}" ${F} font-size="16" font-weight="bold" text-anchor="middle" fill="#1e40af">WP${i + 1}</text>`).join("") +
    // plan B spre adapost
    `<path d="M 470,360 Q 420,250 380,205" fill="none" stroke="#d97706" stroke-width="5" stroke-dasharray="12 8"/>` +
    anchorIcon(380, 190, 0.5, "#b45309") + badge(330, 150, "adăpost (plan B)", "#b45309", "#fff", 16) +
    badge(250, 480, "distanțe · repere · adăposturi pe rută", "#0f172a", "#fff", 17) +
    badge(680, 90, "curenți · ore de lumină · autonomie", "#0f172a", "#fff", 17) +
    badge(640, 540, "ai mereu un PLAN ALTERNATIV", "#b45309", "#fff", 18)
  ),
  "day14-s3": () => svgWrap(
    T(470, 44, "Conduită responsabilă pe apă", { s: 26, b: true }) +
    card(60, 80, 260, 200) +
    `<g transform="translate(190,170)"><path d="M -20,-34 q 20,-14 40,0 l -4,48 q -16,10 -32,0 Z" fill="#b45309"/><circle r="52" fill="none" stroke="#dc2626" stroke-width="9"/><line x1="-38" y1="38" x2="38" y2="-38" stroke="#dc2626" stroke-width="9"/></g>` +
    T(190, 258, "ZERO alcool la comandă", { s: 17, b: true, c: "#991b1b" }) +
    card(340, 80, 260, 200) +
    `<g transform="translate(470,160)"><circle r="42" fill="#fff" stroke="#dc2626" stroke-width="8"/><text y="13" ${F} font-size="34" font-weight="bold" text-anchor="middle">5</text></g>` +
    T(470, 258, "respectă vitezele și zonele", { s: 16.5, b: true }) +
    card(620, 80, 260, 200) +
    `<g transform="translate(750,165)"><path d="M -60,20 q 30,-40 60,0 t 60,0" fill="none" stroke="#0891b2" stroke-width="7"/>${person(-40, -20, 0.62, "water", "#dc2626")}${cross(40, -24, 16)}</g>` +
    T(750, 258, "fără val lângă înotători", { s: 16.5, b: true }) +
    card(190, 320, 560, 190) + capT(470, 355, "Protejează apa") +
    `<g transform="translate(320,430)"><path d="M 0,-34 C -26,0 -26,22 0,34 C 26,22 26,0 0,-34 Z" fill="#38bdf8" stroke="#0369a1" stroke-width="3"/>${check(0, 2, 12)}</g>` +
    T(560, 410, "fără deversări de combustibil / deșeuri", { s: 19 }) +
    T(560, 445, "gunoiul se aduce la mal,", { s: 19 }) +
    T(560, 478, "la instalațiile portuare", { s: 19 })
  ),
  "day14-s4": () => svgWrap(
    sky(300) + waterRect(300, 260) +
    [["1", "#2563eb", 190], ["2", "#0891b2", 380], ["3", "#dc2626", 570], ["4", "#16a34a", 760]]
      .map(([n, c, x]) => `<circle cx="${x}" cy="120" r="44" fill="${c}"/>` + T(x, 134, n, { s: 40, c: "#fff", b: true }) + check(x + 34, 84, 13)).join("") +
    T(470, 210, "Toate cele 4 module — parcurse!", { s: 24, b: true, c: "#0f172a" }) +
    // trofeu
    `<g transform="translate(470,390)"><path d="M -44,-52 L 44,-52 L 38,8 Q 20,36 0,36 Q -20,36 -38,8 Z" fill="#facc15" stroke="#b45309" stroke-width="4"/><path d="M -44,-46 Q -78,-40 -60,-6 Q -50,8 -38,6 M 44,-46 Q 78,-40 60,-6 Q 50,8 38,6" fill="none" stroke="#b45309" stroke-width="5"/><rect x="-12" y="36" width="24" height="22" fill="#b45309"/><rect x="-34" y="58" width="68" height="16" rx="4" fill="#92400e"/></g>` +
    boatSide(160, 300, 200) + boatSide(800, 305, 170) +
    badge(470, 500, "Urmează simularea de examen — mult succes!", "#0f172a", "#fff", 22)
  ),
};

/* Ilustrație generică de rezervă (nu ar trebui să fie folosită). */
export function sceneSVG(key) {
  const fn = SCENES[key];
  if (fn) return fn();
  return svgWrap(sky(300) + waterRect(300) + boatSide(470, 300, 320) + anchorIcon(150, 150, 1.2));
}
