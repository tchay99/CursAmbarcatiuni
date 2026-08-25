/*
 * signs.js — Colecția de semne și semnalizare + datele testului de semne.
 *
 * Patru familii, fiecare cu ilustrații SVG desenate programatic:
 *  1. Panourile RND (Regulamentul de Navigație pe Dunăre): interzicere,
 *     obligație, restricție, recomandare, indicație/permisiune.
 *  2. Balizajul IALA (mărci laterale, cardinale, pericol izolat, ape sigure).
 *  3. Luminile și semnele de zi ale navelor pe categorii (COLREG).
 *  4. Pavilioanele Codului Internațional de Semnale (A–Z).
 *
 * Fiecare element: { code, name (semnificația — răspunsul corect la test), svg }.
 */

(function () {
  /* ---------- helperi SVG ---------- */
  const P = 150; // panou pătrat
  const wrap = (inner, w = P, h = P) =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" class="sign-svg">${inner}</svg>`;

  // Panou cu chenar roșu (interzicere/obligație/restricție RND)
  const redPanel = (picto, bar = true) => wrap(
    `<rect x="4" y="4" width="142" height="142" rx="10" fill="#ffffff" stroke="#d21f26" stroke-width="9"/>` +
    picto +
    (bar ? `<line x1="22" y1="128" x2="128" y2="22" stroke="#d21f26" stroke-width="9" stroke-linecap="round"/>` : "")
  );
  // Panou albastru (indicație/permisiune RND)
  const bluePanel = (picto) => wrap(
    `<rect x="4" y="4" width="142" height="142" rx="10" fill="#1d6fd1"/>` + picto
  );

  const txt = (t, { x = 75, y = 92, s = 46, c = "#111827", b = true } = {}) =>
    `<text x="${x}" y="${y}" font-family="DejaVu Sans,sans-serif" font-size="${s}" fill="${c}" text-anchor="middle" ${b ? 'font-weight="bold"' : ""}>${t}</text>`;
  const W = "#ffffff", K = "#111827";

  /* pictograme (culoare parametrizată: negru pe alb / alb pe albastru) */
  const pgArrowUp = (c = K) => `<path d="M 75,30 L 100,72 L 84,72 L 84,118 L 66,118 L 66,72 L 50,72 Z" fill="${c}"/>`;
  const pgTwoArrows = (c = K) => `<path d="M 55,34 L 72,66 L 61,66 L 61,116 L 49,116 L 49,66 L 38,66 Z" fill="${c}"/><path d="M 95,34 L 112,66 L 101,66 L 101,116 L 89,116 L 89,66 L 78,66 Z" fill="${c}"/>`;
  const pgMeetArrows = (c = K) => `<path d="M 55,30 L 72,62 L 61,62 L 61,120 L 49,120 L 49,62 L 38,62 Z" fill="${c}"/><path d="M 95,120 L 112,88 L 101,88 L 101,30 L 89,30 L 89,88 L 78,88 Z" fill="${c}"/>`;
  const pgAnchor = (c = K) => `<g transform="translate(75,75)" stroke="${c}" fill="none" stroke-width="9" stroke-linecap="round"><circle cx="0" cy="-34" r="9"/><line x1="0" y1="-25" x2="0" y2="28"/><line x1="-20" y1="-8" x2="20" y2="-8"/><path d="M -28,8 Q -24,32 0,36 Q 24,32 28,8 M -28,8 l -7,13 M -28,8 l 13,5 M 28,8 l 7,13 M 28,8 l -13,5"/></g>`;
  const pgBollard = (c = K) => `<g transform="translate(75,80)"><rect x="-13" y="-28" width="26" height="46" fill="${c}"/><ellipse cx="0" cy="-32" rx="27" ry="13" fill="${c}"/><path d="M -60,30 q 40,-38 120,-6" fill="none" stroke="${c}" stroke-width="8"/></g>`;
  const pgUturn = (c = K) => `<path d="M 52,118 L 52,64 A 23,23 0 0 1 98,64 L 98,84 L 112,84 L 90,116 L 68,84 L 82,84 L 82,64 A 7,7 0 0 0 68,64 L 68,118 Z" fill="${c}"/>`;
  const pgWaves = (c = K) => [0, 1, 2].map((i) => `<path d="M 30,${58 + i * 22} q 11,-14 22,0 t 22,0 t 22,0" fill="none" stroke="${c}" stroke-width="8" stroke-linecap="round"/>`).join("");
  const pgSkier = (c = K) => `<g stroke="${c}" fill="none" stroke-width="8" stroke-linecap="round"><circle cx="88" cy="38" r="10" fill="${c}" stroke="none"/><path d="M 86,50 L 74,74 L 82,96 M 74,74 L 56,66 M 86,54 L 104,62 L 118,50"/><path d="M 36,108 L 116,108 M 30,120 L 110,120" stroke-width="6"/></g>`;
  const pgSail = (c = K) => `<path d="M 78,26 L 78,100 L 34,100 Z" fill="${c}"/><path d="M 84,42 L 84,100 L 116,100 Z" fill="${c}" opacity="0.8"/><path d="M 28,112 L 122,112 L 112,126 L 38,126 Z" fill="${c}"/>`;
  const pgProp = (c = K) => `<g transform="translate(75,75)">${[0, 120, 240].map((a) => `<ellipse cx="0" cy="-24" rx="14" ry="26" fill="${c}" transform="rotate(${a})"/>`).join("")}<circle r="10" fill="${c}"/></g>`;
  const pgRow = (c = K) => `<path d="M 30,86 L 120,86 L 106,106 L 44,106 Z" fill="${c}"/><line x1="58" y1="86" x2="34" y2="56" stroke="${c}" stroke-width="7"/><line x1="92" y1="86" x2="116" y2="56" stroke="${c}" stroke-width="7"/>`;
  const pgSurf = (c = K) => `<g stroke="${c}" stroke-width="8" fill="none" stroke-linecap="round"><circle cx="75" cy="34" r="10" fill="${c}" stroke="none"/><path d="M 75,46 L 70,72 L 56,92 M 70,72 L 90,88 M 75,50 L 96,60"/><path d="M 30,108 Q 75,94 120,108 L 112,120 Q 75,108 38,120 Z" fill="${c}" stroke="none"/></g>`;
  const pgSpeedboat = (c = K) => `<path d="M 24,86 L 96,86 L 126,66 L 122,92 Q 90,108 40,102 Z" fill="${c}"/><path d="M 60,66 L 92,66 L 96,84 L 56,84 Z" fill="${c}" opacity="0.8"/>${[0, 1].map((i) => `<path d="M 20,${112 + i * 12} q 12,-10 26,0 t 26,0 t 26,0 t 26,0" fill="none" stroke="${c}" stroke-width="6"/>`).join("")}`;
  const pgSlip = (c = K) => `<path d="M 26,120 L 124,58 L 124,72 L 40,124 Z" fill="${c}"/><path d="M 66,60 L 116,36 L 120,52 L 72,76 Z" fill="${c}" opacity="0.8"/>`;
  const pgSwim = (c = K) => `<g fill="none" stroke="${c}" stroke-width="8" stroke-linecap="round"><circle cx="96" cy="52" r="10" fill="${c}" stroke="none"/><path d="M 34,64 L 66,74 L 84,60 M 66,74 L 88,86 L 116,80"/><path d="M 26,106 q 12,-12 26,0 t 26,0 t 26,0 t 26,0" stroke-width="6"/></g>`;
  const pgDiamond = (c = K) => `<path d="M 75,30 L 108,75 L 75,120 L 42,75 Z" fill="${c}"/>`;
  const pgLightsRG = () => `<circle cx="55" cy="55" r="13" fill="#d21f26"/><circle cx="95" cy="55" r="13" fill="#d21f26"/><circle cx="55" cy="95" r="13" fill="#16a34a"/><circle cx="95" cy="95" r="13" fill="#16a34a"/>`;
  const pgSound = (c = K) => `<path d="M 44,62 L 66,62 L 92,40 L 92,110 L 66,88 L 44,88 Z" fill="${c}"/><path d="M 102,56 q 14,19 0,38 M 114,46 q 22,29 0,58" fill="none" stroke="${c}" stroke-width="7" stroke-linecap="round"/>`;
  const pgEye = (c = K) => `<path d="M 30,75 Q 75,38 120,75 Q 75,112 30,75 Z" fill="none" stroke="${c}" stroke-width="8"/><circle cx="75" cy="75" r="16" fill="${c}"/>`;
  const pgCrossPort = (c = K) => `<path d="M 42,118 Q 60,64 108,36 L 118,50 Q 74,76 58,122 Z" fill="${c}"/><path d="M 100,118 Q 84,86 52,60 L 62,46 Q 96,76 116,112 Z" fill="${c}" opacity="0.75"/>`;
  const pgHarbourOut = (c = K) => `<circle cx="52" cy="75" r="15" fill="${c}"/><circle cx="98" cy="75" r="15" fill="#facc15" stroke="${c}" stroke-width="4"/>`;
  const pgTriDown = (c = K) => `<path d="M 40,45 L 110,45 L 75,105 Z" fill="${c}"/>`;
  const pgHourGlass = (c = K) => `<path d="M 40,40 L 110,40 L 75,78 Z" fill="${c}"/><path d="M 40,112 L 110,112 L 75,74 Z" fill="${c}"/>`;
  const pgRondou = () => `<path d="M 75,35 A 40,40 0 1 1 40,60" fill="none" stroke="${W}" stroke-width="10"/><path d="M 30,72 L 46,44 L 60,72 Z" fill="${W}"/>`;
  const pgTap = () => `<path d="M 50,58 L 96,58 L 96,72 L 82,72 L 82,86 Q 82,96 72,96 L 60,96 L 60,84 L 70,84 L 70,72 L 50,72 Z" fill="${W}"/><path d="M 62,104 q 4,10 -0,14 q -6,-2 0,-14" fill="${W}"/><rect x="98" y="48" width="10" height="18" fill="${W}"/>`;
  const pgPhone = () => `<path d="M 48,50 Q 75,30 102,50 L 94,66 Q 75,54 56,66 Z" fill="${W}"/><rect x="66" y="70" width="18" height="34" rx="6" fill="${W}"/>`;
  const pgVHF = (t = "VHF 11") => txt("VHF", { x: 75, y: 70, s: 34, c: W }) + txt(t.split(" ")[1] || "", { x: 75, y: 112, s: 34, c: W });
  const pgArrowDirRight = (c = W) => `<path d="M 30,84 L 92,84 L 92,102 L 124,75 L 92,48 L 92,66 L 30,66 Z" fill="${c}"/>`;
  const pgKeepSide = (c = K, side = "st") => `<path d="M ${side === "st" ? "108,30 L 42,75 L 108,120" : "42,30 L 108,75 L 42,120"} L ${side === "st" ? "108,96 L 74,75 L 108,54" : "42,96 L 76,75 L 42,54"} Z" fill="${c}"/>`;

  /* ---------- 1. Panourile RND ---------- */
  const RND_INT = [
    ["A1", "Interzicere de trecere", wrap(`<rect x="4" y="4" width="142" height="142" rx="10" fill="#d21f26"/><rect x="4" y="56" width="142" height="38" fill="#ffffff"/>`)],
    ["A2", "Interzice orice depășire", redPanel(pgTwoArrows())],
    ["A4", "Interzice întâlnirea și depășirea", redPanel(pgMeetArrows())],
    ["A5", "Interzice staționarea", redPanel(txt("P", { s: 84, y: 104 }))],
    ["A5.1", "Interzice staționarea pe lățimea de 40 m", redPanel(txt("40", { s: 66, y: 98 }))],
    ["A6", "Ancorajul interzis", redPanel(pgAnchor())],
    ["A7", "Legarea la mal interzisă", redPanel(pgBollard())],
    ["A8", "Întoarcerea interzisă", redPanel(pgUturn())],
    ["A9", "Interzis a face valuri", redPanel(pgWaves())],
    ["A10", "Nu treceți în afara spațiului indicat", redPanel(`<path d="M 4,4 L 60,4 L 4,60 Z" fill="#d21f26"/><path d="M 146,146 L 90,146 L 146,90 Z" fill="#d21f26"/>` + pgDiamond(), false)],
    ["A11", "Interzisă trecerea — pregătiți-vă de marș", redPanel(pgLightsRG(), false)],
    ["A12", "Interzisă navigația ambarcațiunilor cu motor", redPanel(pgProp())],
    ["A13", "Interzis ambarcațiunilor sportive/de agrement", redPanel(txt("SPORT", { s: 34, y: 88 }))],
    ["A14", "Interzis schiul nautic", redPanel(pgSkier())],
    ["A15", "Interzisă navigația cu vele", redPanel(pgSail())],
    ["A16", "Interzise navele nepropulsate (rame)", redPanel(pgRow())],
    ["A17", "Interzis surfingul (planșele cu vele)", redPanel(pgSurf())],
    ["A18", "Interzisă navigația cu viteză mare", redPanel(pgSpeedboat())],
    ["A19", "Lansarea la apă / scoaterea ambarcațiunilor interzisă", redPanel(pgSlip())],
  ];
  const RND_OBL = [
    ["B1", "Obligația de a urma direcția indicată", redPanel(pgArrowUp(), false)],
    ["B2a", "Îndreptați-vă spre partea bazinului din babord", redPanel(`<path d="M 96,124 L 96,64 Q 96,44 76,44 L 58,44 L 58,58 L 76,58 Q 82,58 82,66 L 82,124 Z" fill="${K}"/><path d="M 58,32 L 34,51 L 58,70 Z" fill="${K}"/>`, false)],
    ["B3a", "Țineți partea șenalului din babord", redPanel(pgKeepSide(K, "st"), false)],
    ["B4a", "Încrucișați șenalul spre babord", redPanel(pgCrossPort(), false)],
    ["B5", "Opriți în condițiile prevăzute de Regulament", redPanel(`<rect x="30" y="66" width="90" height="18" fill="${K}"/>`, false)],
    ["B6", "Respectați viteza de 12 km/h", redPanel(txt("12", { s: 62, y: 96 }), false)],
    ["B7", "Emiteți un semnal sonor", redPanel(pgSound(), false)],
    ["B8", "Păstrați o vigilență deosebită", redPanel(pgEye(), false)],
    ["B10", "Cedează drumul navelor care ies din port sau de pe calea afluentă", redPanel(pgHarbourOut(), false)],
    ["B13", "Intrați în legătură radio pe canalul VHF 11", redPanel(txt("VHF", { s: 34, y: 68 }) + txt("11", { s: 38, y: 112 }), false)],
  ];
  const RND_RES = [
    ["C1", "Adâncimea apei limitată (… metri)", redPanel(pgTriDown(), false)],
    ["C2", "Înălțimea liberă deasupra apei limitată (… metri)", redPanel(`<path d="M 40,105 L 110,105 L 75,45 Z" fill="${K}"/>`, false)],
    ["C3", "Lățimea pasei de trecere / a șenalului limitată", redPanel(pgHourGlass(), false)],
    ["C4", "Restricții de navigație — informați-vă", redPanel("", false)],
    ["C5", "Mențineți-vă la distanța indicată de mal", redPanel(`<path d="M 75,30 L 112,75 L 75,120 L 38,75 Z" fill="${K}"/>` + txt("40", { s: 30, y: 86, c: "#ffffff" }), false)],
  ];
  const RND_REC = [
    ["D1a", "Trecere recomandată în ambele sensuri", wrap(`<rect x="4" y="4" width="142" height="142" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="2"/><path d="M 75,34 L 112,75 L 75,116 L 38,75 Z" fill="#eab308"/>`)],
    ["D1b", "Trecere recomandată doar în sensul indicat", wrap(`<rect x="4" y="4" width="142" height="142" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="2"/><path d="M 55,34 L 88,55 L 55,76 L 22,55 Z" fill="#eab308"/><path d="M 95,74 L 128,95 L 95,116 L 62,95 Z" fill="#eab308"/>`)],
    ["D3", "Îndreptați-vă în sensul săgeții", bluePanel(pgArrowDirRight())],
  ];
  const RND_IND = [
    ["E1", "Permitere de trecere", wrap(`<rect x="4" y="4" width="142" height="142" rx="10" fill="#16a34a"/><rect x="56" y="4" width="38" height="142" fill="#ffffff"/>`)],
    ["E5", "Permisiune de staționare", bluePanel(txt("P", { s: 84, y: 104, c: W }))],
    ["E5.1", "Staționare permisă pe lățimea de 60 m", bluePanel(txt("60", { s: 62, y: 96, c: W }))],
    ["E6", "Ancorajul permis", bluePanel(pgAnchor(W))],
    ["E7", "Legarea la mal permisă", bluePanel(pgBollard(W))],
    ["E8", "Loc de rondou (întoarcere permisă)", bluePanel(pgRondou())],
    ["E13", "Loc de alimentare cu apă potabilă", bluePanel(pgTap())],
    ["E14", "Post telefonic", bluePanel(pgPhone())],
    ["E16", "Navigația de agrement și sport permisă", bluePanel(txt("SPORT", { s: 34, y: 88, c: W }))],
    ["E17", "Schiul nautic permis", bluePanel(pgSkier(W))],
    ["E18", "Navigația cu vele permisă", bluePanel(pgSail(W))],
    ["E19", "Navigația cu rame permisă", bluePanel(pgRow(W))],
    ["E20", "Surfingul permis", bluePanel(pgSurf(W))],
    ["E21", "Navigația cu viteză mare permisă", bluePanel(pgSpeedboat(W))],
    ["E23", "Posibilitate de informare radio pe canalul indicat", bluePanel(pgVHF("VHF 11"))],
  ];

  /* ---------- 2. Balizajul IALA ---------- */
  const buoy = (bands, topmark, form = "pillar") => {
    const bh = 70 / bands.length;
    const body = form === "can"
      ? `<rect x="48" y="48" width="54" height="60" fill="${bands[0]}" stroke="#1f2937" stroke-width="3"/>`
      : form === "cone"
        ? `<path d="M 75,40 L 106,108 L 44,108 Z" fill="${bands[0]}" stroke="#1f2937" stroke-width="3"/>`
        : bands.map((c, i) => `<rect x="58" y="${38 + i * bh}" width="34" height="${bh}" fill="${c}" stroke="#1f2937" stroke-width="2"/>`).join("");
    const cone = (cy, up) => `<path d="M 75,${cy + (up ? -16 : 0)} L 88,${cy + (up ? 0 : -16)} L 62,${cy + (up ? 0 : -16)} Z" fill="#1f2937"/>`;
    let tm = "";
    if (topmark === "NN") tm = cone(34, true) + cone(14, true);
    if (topmark === "SS") tm = cone(34, false) + cone(14, false);
    if (topmark === "EE") tm = cone(14, true) + cone(34, false);
    if (topmark === "WW") tm = cone(14, false) + cone(34, true);
    if (topmark === "s2") tm = `<circle cx="75" cy="28" r="9" fill="#1f2937"/><circle cx="75" cy="8" r="9" fill="#1f2937"/>`;
    if (topmark === "s1") tm = `<circle cx="75" cy="26" r="10" fill="#d21f26"/>`;
    if (topmark === "x") tm = `<path d="M 64,10 L 86,32 M 86,10 L 64,32" stroke="#eab308" stroke-width="7" stroke-linecap="round"/>`;
    return wrap(`<rect x="0" y="106" width="150" height="44" fill="#bae6fd"/>` + body + tm +
      `<path d="M 44,108 L 106,108 L 96,128 L 54,128 Z" fill="#94a3b8" stroke="#1f2937" stroke-width="2"/>`);
  };
  const IALA = [
    ["Babord (A)", "Marcă laterală babord — la intrare o lași la STÂNGA (roșie, cilindrică)", buoy(["#d21f26"], "", "can")],
    ["Tribord (A)", "Marcă laterală tribord — la intrare o lași la DREAPTA (verde, conică)", buoy(["#16a34a"], "", "cone")],
    ["Cardinală N", "Apa sigură la NORD de marcă (conuri: ambele în sus)", buoy(["#1f2937", "#eab308"], "NN")],
    ["Cardinală S", "Apa sigură la SUD de marcă (conuri: ambele în jos)", buoy(["#eab308", "#1f2937"], "SS")],
    ["Cardinală E", "Apa sigură la EST de marcă (conuri: bazele apropiate — «ou»)", buoy(["#1f2937", "#eab308", "#1f2937"], "EE")],
    ["Cardinală V", "Apa sigură la VEST de marcă (conuri: vârf la vârf — «pahar de Wine»)", buoy(["#eab308", "#1f2937", "#eab308"], "WW")],
    ["Pericol izolat", "Pericol punctual chiar sub marcă — ocolește-o pe oricare parte", buoy(["#1f2937", "#d21f26", "#1f2937"], "s2")],
    ["Ape sigure", "Apă navigabilă de jur împrejur (dungi VERTICALE roșu-alb)", wrap(`<rect x="0" y="106" width="150" height="44" fill="#bae6fd"/>` + [0, 1, 2, 3].map((i) => `<rect x="${58 + i * 8.5}" y="38" width="8.5" height="70" fill="${i % 2 ? "#ffffff" : "#d21f26"}" stroke="#1f2937" stroke-width="1"/>`).join("") + `<circle cx="75" cy="26" r="10" fill="#d21f26"/><path d="M 44,108 L 106,108 L 96,128 L 54,128 Z" fill="#94a3b8" stroke="#1f2937" stroke-width="2"/>`)],
    ["Marcă specială", "Zonă cu destinație specială (înot, cabluri, agrement) — vezi harta", buoy(["#eab308"], "x")],
  ];

  /* ---------- 3. Luminile și semnele navelor (COLREG) ---------- */
  const night = (lights, extra = "") => wrap(
    `<rect x="4" y="4" width="142" height="142" rx="10" fill="#0b1220"/>` +
    `<path d="M 30,116 L 120,116 L 106,132 L 44,132 Z" fill="#334155"/><line x1="75" y1="116" x2="75" y2="30" stroke="#334155" stroke-width="5"/>` +
    lights.map(([c, y]) => `<circle cx="75" cy="${y}" r="9" fill="${c}"/><circle cx="75" cy="${y}" r="15" fill="${c}" opacity="0.25"/>`).join("") + extra
  );
  const sideLights = `<circle cx="48" cy="108" r="7" fill="#dc2626"/><circle cx="102" cy="108" r="7" fill="#16a34a"/>`;
  const day = (shape) => wrap(
    `<rect x="4" y="4" width="142" height="142" rx="10" fill="#e0f2fe"/>` +
    `<path d="M 30,116 L 120,116 L 106,132 L 44,132 Z" fill="#64748b"/><line x1="75" y1="116" x2="75" y2="30" stroke="#64748b" stroke-width="5"/>` + shape
  );
  const ball = (cy) => `<circle cx="75" cy="${cy}" r="12" fill="#111827"/>`;
  const coneDown = (cy) => `<path d="M 60,${cy - 10} L 90,${cy - 10} L 75,${cy + 14} Z" fill="#111827"/>`;
  const bicone = (cy) => `<path d="M 60,${cy} L 90,${cy} L 75,${cy - 18} Z" fill="#111827"/><path d="M 60,${cy} L 90,${cy} L 75,${cy + 18} Z" fill="#111827"/>`;
  const cyl = (cy) => `<rect x="63" y="${cy - 16}" width="24" height="32" fill="#111827"/>`;
  const COLREG_NAVE = [
    ["Motor în marș", "Navă cu propulsie mecanică în marș (alb catarg + borduri + pupă)", night([["#f8fafc", 44]], sideLights)],
    ["Motor > 50 m", "Navă cu propulsie mecanică peste 50 m (DOUĂ lumini albe de catarg)", night([["#f8fafc", 34], ["#f8fafc", 58]], sideLights)],
    ["Velier în marș", "Velier în marș (DOAR borduri + pupă, fără alb de catarg)", night([], sideLights)],
    ["Velier (opțional)", "Velier — opțional roșu peste verde la catarg", night([["#dc2626", 34], ["#16a34a", 58]], sideLights)],
    ["Velier pe motor (zi)", "Velier care merge cu motorul ziua: CON negru cu vârful în jos", day(coneDown(52))],
    ["Pescuit (non-trauler)", "Navă în pescuit: ROȘU peste ALB", night([["#dc2626", 34], ["#f8fafc", 58]])],
    ["Trauler", "Trauler (pescuit cu unelte remorcate): VERDE peste ALB", night([["#16a34a", 34], ["#f8fafc", 58]])],
    ["Manevră restrânsă", "Capacitate de manevră restrânsă: ROȘU-ALB-ROȘU (zi: bulă-bicon-bulă)", night([["#dc2626", 28], ["#f8fafc", 52], ["#dc2626", 76]])],
    ["Manevră restrânsă (zi)", "Capacitate de manevră restrânsă ziua: bulă – bicon (romb) – bulă", day(ball(34) + bicone(62) + ball(90))],
    ["Stânjenită de pescaj", "Navă stânjenită de pescaj: TREI ROȘII vertical (zi: cilindru negru)", night([["#dc2626", 28], ["#dc2626", 52], ["#dc2626", 76]])],
    ["Stânjenită de pescaj (zi)", "Navă stânjenită de pescaj ziua: CILINDRU negru", day(cyl(56))],
    ["Nestăpânită pe manevră", "Navă nestăpânită pe manevră: DOUĂ ROȘII vertical (zi: două bule)", night([["#dc2626", 34], ["#dc2626", 58]])],
    ["Eșuată", "Navă eșuată: două roșii + luminile de ancoră («Red over red, Captain is dead»)", night([["#dc2626", 34], ["#dc2626", 58], ["#f8fafc", 82]])],
    ["Eșuată (zi)", "Navă eșuată ziua: DOUĂ bule negre (sau trei, la nave mari)", day(ball(38) + ball(66))],
    ["La ancoră", "Navă la ancoră: o lumină ALBĂ vizibilă 360° (zi: o bulă neagră)", night([["#f8fafc", 40]])],
    ["Pilotina", "Pilotina în serviciu: ALB peste ROȘU («cascheta albă și nasul roșu»)", night([["#f8fafc", 34], ["#dc2626", 58]])],
    ["Dragor de mine", "Dragor de mine în activitate: TREI VERZI în triunghi — păstrați distanță mare", night([["#16a34a", 30]], `<circle cx="53" cy="56" r="9" fill="#16a34a"/><circle cx="97" cy="56" r="9" fill="#16a34a"/>` + sideLights)],
  ];

  /* ---------- 4. Pavilioanele Codului Internațional ---------- */
  const FW = 168, FH = 112;
  const flag = (inner, swallow = false) => wrap(
    `<defs><clipPath id="fc${Math.random().toString(36).slice(2, 8)}"></clipPath></defs>` +
    `<g>${inner}</g>` +
    (swallow ? `<path d="M 168,0 L 118,56 L 168,112 Z" fill="#f1f5f9"/>` : "") +
    `<rect x="1" y="1" width="${FW - 2}" height="${FH - 2}" fill="none" stroke="#94a3b8" stroke-width="2"/>`,
    FW, FH);
  const R = "#d21f26", B = "#1d4ed8", Y = "#facc15", KK = "#111827", WH = "#ffffff";
  const rect = (x, y, w, h, c) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/>`;
  const FLAGS = [
    ["A — Alfa", "Am scafandru sub apă — țineți-vă departe, cu viteză mică", flag(rect(0, 0, 84, 112, WH) + rect(84, 0, 84, 112, B), true)],
    ["B — Bravo", "Încarc / descarc / transport mărfuri periculoase", flag(rect(0, 0, 168, 112, R), true)],
    ["C — Charlie", "DA (afirmativ)", flag(rect(0, 0, 168, 112, B) + rect(0, 22, 168, 22, WH) + rect(0, 44, 168, 24, R) + rect(0, 68, 168, 22, WH))],
    ["D — Delta", "Manevrez cu dificultate — țineți-vă departe", flag(rect(0, 0, 168, 112, B) + rect(0, 28, 168, 56, Y))],
    ["E — Echo", "Schimb de drum la TRIBORD", flag(rect(0, 0, 168, 56, B) + rect(0, 56, 168, 56, R))],
    ["F — Foxtrot", "Sunt în avarie — comunicați cu mine", flag(rect(0, 0, 168, 112, WH) + `<path d="M 84,14 L 138,56 L 84,98 L 30,56 Z" fill="${R}"/>`)],
    ["G — Golf", "Cer pilot (pescador: îmi ridic plasele)", flag([0, 1, 2, 3, 4, 5].map((i) => rect(i * 28, 0, 28, 112, i % 2 ? B : Y)).join(""))],
    ["H — Hotel", "Am PILOT la bord", flag(rect(0, 0, 84, 112, WH) + rect(84, 0, 84, 112, R))],
    ["I — India", "Schimb de drum la BABORD", flag(rect(0, 0, 168, 112, Y) + `<circle cx="84" cy="56" r="26" fill="${KK}"/>`)],
    ["J — Juliett", "Incendiu la bord și mărfuri periculoase — țineți-vă departe", flag(rect(0, 0, 168, 37, B) + rect(0, 37, 168, 38, WH) + rect(0, 75, 168, 37, B))],
    ["K — Kilo", "Doresc să comunic cu dumneavoastră", flag(rect(0, 0, 84, 112, Y) + rect(84, 0, 84, 112, B))],
    ["L — Lima", "Opriți imediat nava", flag(rect(0, 0, 84, 56, Y) + rect(84, 0, 84, 56, KK) + rect(0, 56, 84, 56, KK) + rect(84, 56, 84, 56, Y))],
    ["M — Mike", "Nava mea este oprită, fără mișcare prin apă", flag(rect(0, 0, 168, 112, B) + `<path d="M 0,0 L 168,112 M 168,0 L 0,112" stroke="${WH}" stroke-width="18"/>`)],
    ["N — November", "NU (negativ)", flag([0, 1, 2, 3].map((r) => [0, 1, 2, 3].map((c) => rect(c * 42, r * 28, 42, 28, (r + c) % 2 ? WH : B)).join("")).join(""))],
    ["O — Oscar", "OM LA APĂ", flag(`<path d="M 0,0 L 168,0 L 0,112 Z" fill="${R}"/><path d="M 168,0 L 168,112 L 0,112 Z" fill="${Y}"/>`)],
    ["P — Papa", "În port: toată lumea la bord, nava pleacă", flag(rect(0, 0, 168, 112, B) + rect(42, 28, 84, 56, WH))],
    ["Q — Quebec", "Nava sănătoasă — cer libera practică", flag(rect(0, 0, 168, 112, Y))],
    ["R — Romeo", "(fără semnificație de un singur pavilion — literă de procedură)", flag(rect(0, 0, 168, 112, R) + `<path d="M 84,0 L 84,112 M 0,56 L 168,56" stroke="${Y}" stroke-width="20"/>`)],
    ["S — Sierra", "Mașinile merg ÎNAPOI", flag(rect(0, 0, 168, 112, WH) + rect(42, 28, 84, 56, B))],
    ["T — Tango", "Țineți-vă departe — pescuiesc în perechi (traul)", flag(rect(0, 0, 56, 112, R) + rect(56, 0, 56, 112, WH) + rect(112, 0, 56, 112, B))],
    ["U — Uniform", "VĂ ÎNDREPTAȚI SPRE PERICOL", flag(rect(0, 0, 84, 56, R) + rect(84, 0, 84, 56, WH) + rect(0, 56, 84, 56, WH) + rect(84, 56, 84, 56, R))],
    ["V — Victor", "Cer asistență", flag(rect(0, 0, 168, 112, WH) + `<path d="M 0,0 L 168,112 M 168,0 L 0,112" stroke="${R}" stroke-width="18"/>`)],
    ["W — Whiskey", "Cer asistență MEDICALĂ", flag(rect(0, 0, 168, 112, B) + rect(28, 19, 112, 74, WH) + rect(56, 38, 56, 37, R))],
    ["X — X-ray", "Opriți-vă intențiile — urmăriți semnalele mele", flag(rect(0, 0, 168, 112, WH) + `<path d="M 84,0 L 84,112 M 0,56 L 168,56" stroke="${B}" stroke-width="20"/>`)],
    ["Y — Yankee", "Îmi grapează ancora (ancora derapează)", flag([0, 1, 2, 3, 4].map((i) => `<path d="M ${-40 + i * 48},112 L ${8 + i * 48},0 L ${32 + i * 48},0 L ${-16 + i * 48},112 Z" fill="${i % 2 ? R : Y}"/>`).join("") + rect(0, 0, 0, 0, Y))],
    ["Z — Zulu", "Cer remorcher (pescador: lansez plasele)", flag(`<path d="M 0,0 L 84,56 L 0,112 Z" fill="${KK}"/><path d="M 0,0 L 168,0 L 84,56 Z" fill="${Y}"/><path d="M 168,0 L 168,112 L 84,56 Z" fill="${B}"/><path d="M 0,112 L 168,112 L 84,56 Z" fill="${R}"/>`)],
  ];

  /* ---------- expune seturile ---------- */
  const mk = (arr) => arr.map(([code, name, svg]) => ({ code, name, svg }));
  window.SIGNS = {
    SETS: [
      { id: "rnd-int", title: "RND — Interzicere", note: "Panouri cu chenar roșu: ce NU ai voie.", items: mk(RND_INT) },
      { id: "rnd-obl", title: "RND — Obligație", note: "Ce TREBUIE să faci.", items: mk(RND_OBL) },
      { id: "rnd-res", title: "RND — Restricție", note: "Limitări: adâncime, înălțime, lățime, distanță de mal.", items: mk(RND_RES) },
      { id: "rnd-rec", title: "RND — Recomandare", note: "Trecerea recomandată (romburi galbene).", items: mk(RND_REC) },
      { id: "rnd-ind", title: "RND — Indicație / Permisiune", note: "Panouri albastre: ce AI voie / informații.", items: mk(RND_IND) },
      { id: "iala", title: "Balizaj IALA (Regiunea A)", note: "În Regiunea B (Americile, Japonia), culorile laterale sunt inversate.", items: IALA },
      { id: "nave", title: "Luminile și semnele navelor", note: "Identificarea categoriilor de nave noaptea și ziua (COLREG).", items: mk(COLREG_NAVE) },
      { id: "pavilioane", title: "Pavilioanele Codului Internațional", note: "Semnificația fiecărui pavilion arborat singur.", items: mk(FLAGS) },
    ],
  };
})();

/* ================= Galeria de semne ================= */
function renderSignsCollection(root, activeId) {
  const sets = window.SIGNS.SETS;
  const active = sets.find((s) => s.id === activeId) || sets[0];
  root.innerHTML = `
    <div class="signs">
      <div class="signs__tabs">
        ${sets.map((s) => `<button class="signs__tab${s.id === active.id ? " signs__tab--on" : ""}" data-set="${s.id}">${s.title}</button>`).join("")}
      </div>
      <p class="signs__note">${active.note} <em>(${active.items.length} elemente)</em></p>
      <div class="signs__grid">
        ${active.items.map((it) => `
          <figure class="sign-card">
            <div class="sign-card__img">${it.svg}</div>
            <figcaption><strong>${it.code}</strong><span>${it.name}</span></figcaption>
          </figure>`).join("")}
      </div>
    </div>`;
  root.querySelectorAll("[data-set]").forEach((b) =>
    b.addEventListener("click", () => renderSignsCollection(root, b.dataset.set)));
}
window.renderSignsCollection = renderSignsCollection;

/* ================= Testul de semne (stil chestionar auto) ================= */
function renderSignTest(root, { count, pass, onFinish }) {
  const pool = [];
  window.SIGNS.SETS.forEach((s) => s.items.forEach((it) => pool.push({ ...it, set: s.id, family: s.id.split("-")[0] })));
  const shuffled = pool.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  const picked = shuffled.slice(0, count).map((item) => {
    // Distractori din același set (sau din aceeași familie, dacă setul e mic).
    let cands = pool.filter((p) => p.set === item.set && p.name !== item.name);
    if (cands.length < 3) cands = pool.filter((p) => p.family === item.family && p.name !== item.name);
    if (cands.length < 3) cands = pool.filter((p) => p.name !== item.name);
    const wrong = [];
    const used = new Set();
    while (wrong.length < 3 && used.size < cands.length) {
      const i = Math.floor(Math.random() * cands.length);
      if (used.has(i)) continue;
      used.add(i);
      if (!wrong.includes(cands[i].name)) wrong.push(cands[i].name);
    }
    const options = wrong.concat(item.name);
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return { svg: item.svg, code: item.code, options, answer: options.indexOf(item.name) };
  });
  const answers = new Array(picked.length).fill(null);
  const need = Math.ceil(picked.length * pass);

  root.innerHTML = `
    <div class="quiz">
      <h3 class="quiz__title">Test de semne — ${picked.length} întrebări</h3>
      <p class="quiz__intro">Ce semnifică fiecare semn, marcă sau pavilion? Prag: <strong>${need}/${picked.length}</strong>.</p>
      <form id="signForm" class="quiz__form">
        ${picked.map((q, qi) => `
          <fieldset class="quiz__q quiz__q--sign" data-qi="${qi}">
            <legend>${qi + 1}. Ce semnifică?</legend>
            <div class="sign-q__img">${q.svg}</div>
            ${q.options.map((opt, oi) => `
              <label class="quiz__opt">
                <input type="radio" name="s${qi}" value="${oi}">
                <span>${opt}</span>
              </label>`).join("")}
          </fieldset>`).join("")}
        <button type="submit" class="btn btn--primary btn--lg">Corectează testul</button>
      </form>
      <div id="signResult" class="quiz__result" hidden></div>
    </div>`;

  const form = root.querySelector("#signForm");
  form.addEventListener("change", (e) => {
    if (e.target.name && e.target.name.startsWith("s")) {
      answers[Number(e.target.name.slice(1))] = Number(e.target.value);
    }
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const unanswered = answers.findIndex((a) => a === null);
    if (unanswered !== -1) {
      const fs = root.querySelector(`fieldset[data-qi="${unanswered}"]`);
      if (fs) { fs.classList.add("quiz__q--missing"); fs.scrollIntoView({ behavior: "smooth", block: "center" }); }
      return;
    }
    let correct = 0;
    picked.forEach((q, qi) => {
      const fs = root.querySelector(`fieldset[data-qi="${qi}"]`);
      fs.classList.remove("quiz__q--missing");
      const chosen = answers[qi];
      const isRight = chosen === q.answer;
      if (isRight) correct++;
      fs.classList.add(isRight ? "quiz__q--right" : "quiz__q--wrong");
      fs.querySelectorAll(".quiz__opt").forEach((lab, oi) => {
        lab.querySelector("input").disabled = true;
        if (oi === q.answer) lab.classList.add("opt--correct");
        if (oi === chosen && !isRight) lab.classList.add("opt--chosen-wrong");
      });
    });
    const ratio = correct / picked.length;
    const passed = ratio >= pass;
    const pct = Math.round(ratio * 100);
    const box = root.querySelector("#signResult");
    box.hidden = false;
    box.className = "quiz__result " + (passed ? "quiz__result--pass" : "quiz__result--fail");
    box.innerHTML = `
      <div class="result-badge result-badge--${passed ? "pass" : "fail"}">${passed ? "Promovat" : "Nepromovat"}</div>
      <p>Ai răspuns corect la <strong>${correct}/${picked.length}</strong> — <strong>${pct}%</strong>.</p>
      <button type="button" class="btn btn--primary" id="signAgainBtn">🔄 Alt test de semne</button>`;
    form.querySelector("button[type=submit]").disabled = true;
    box.scrollIntoView({ behavior: "smooth", block: "start" });
    box.querySelector("#signAgainBtn").addEventListener("click", () => {
      if (typeof onFinish === "function") onFinish({ correct, total: picked.length, pct, passed, again: true });
    });
    if (typeof onFinish === "function") onFinish({ correct, total: picked.length, pct, passed, again: false });
  });
}
window.renderSignTest = renderSignTest;
