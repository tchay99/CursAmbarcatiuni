#!/usr/bin/env node
/*
 * generate-videos.mjs — Generează videourile MP4 ale lecțiilor (stil YouTube).
 *
 * Formatul cadrului (1280×720):
 *   - ¾ din ecran: ILUSTRAȚIE EXPLICATIVĂ (diagramă SVG per scenă, tools/visuals.mjs)
 *   - ¼ (coloana din dreapta): NARATOR animat (căpitan care „vorbește”)
 *   - jos: SUBTITRĂRI sincronizate cu narațiunea (arse în video, stil YouTube)
 *
 * Pipeline:
 *   1. Lecții din assets/js/content.js; narațiunea se împarte în fraze.
 *   2. TTS pe fraze (Piper ro_RO-mihai-medium via sherpa-onnx) → audio + timpi
 *      exacți per frază (tools/tts_batch.py).
 *   3. Cadre PNG cu Playwright: 3 stări de narator (gură închisă/deschisă,
 *      clipit) → animație de vorbire la 4 fps.
 *   4. ffmpeg: secvență de cadre + audio per scenă → concatenare → subtitrări
 *      arse (libass) → videos/dayNN.mp4.
 *
 * Utilizare:
 *   node tools/generate-videos.mjs [--only day01,day02] --model-dir DIR
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync, linkSync, copyFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { sceneSVG } from "./visuals.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const BUILD = join(ROOT, "tools", "build");
const OUT = join(ROOT, "videos");
const FPS = 4;           // suficient pentru animația de vorbire; fișiere mici
const TAIL_SEC = 0.7;    // liniște la finalul fiecărei scene

/* ---------- CLI ---------- */
const args = process.argv.slice(2);
const getArg = (n, d) => { const i = args.indexOf(n); return i !== -1 && args[i + 1] ? args[i + 1] : d; };
const ONLY = (getArg("--only", "") || "").split(",").filter(Boolean);
const MODEL_DIR = getArg("--model-dir", process.env.PIPER_RO_MODEL_DIR || "");
if (!MODEL_DIR || !existsSync(join(MODEL_DIR, "tokens.txt"))) {
  console.error("EROARE: dă directorul modelului Piper cu --model-dir sau PIPER_RO_MODEL_DIR");
  process.exit(1);
}

/* ---------- 1. Lecțiile + împărțirea în fraze ---------- */
const contentSrc = readFileSync(join(ROOT, "assets/js/content.js"), "utf8");
const sandbox = { window: {} };
vm.runInNewContext(contentSrc, sandbox);
const { LESSONS, MODULES } = sandbox.window.COURSE;
const lessons = ONLY.length ? LESSONS.filter((l) => ONLY.includes(l.id)) : LESSONS;

/* Împarte narațiunea în fraze de subtitrare (≤ ~90 caractere). */
function splitPhrases(text) {
  const sentences = text.split(/(?<=[.!?])\s+/).filter(Boolean);
  const out = [];
  for (const s of sentences) {
    if (s.length <= 95) { out.push(s); continue; }
    // împarte propozițiile lungi la virgule
    let cur = "";
    for (const part of s.split(/,\s*/)) {
      const cand = cur ? cur + ", " + part : part;
      if (cand.length > 90 && cur) { out.push(cur + ","); cur = part; }
      else cur = cand;
    }
    if (cur) out.push(cur);
  }
  return out;
}

for (const d of ["slides", "audio", "segments", "frames"]) mkdirSync(join(BUILD, d), { recursive: true });
mkdirSync(OUT, { recursive: true });

/* ---------- Narator: Cpt. Paul Dicu — marinar ~50 de ani, chel, barbă scurtă
 * căruntă, pielea arsă de soare. SVG cu stări (gură/clipit). ---------- */
function narratorSVG({ mouthOpen, blink }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 300" width="240" height="300">
  <defs><linearGradient id="jk" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#1e3a8a"/><stop offset="1" stop-color="#172554"/></linearGradient></defs>
  <!-- umeri / sacou bleumarin -->
  <path d="M 26,300 Q 30,214 78,196 L 162,196 Q 210,214 214,300 Z" fill="url(#jk)"/>
  <!-- cămașă albă descheiată la gât -->
  <path d="M 100,196 L 120,240 L 140,196 L 128,196 L 120,216 L 112,196 Z" fill="#f8fafc"/>
  <!-- epoleți -->
  <rect x="34" y="212" width="42" height="13" rx="6" fill="#facc15"/>
  <rect x="164" y="212" width="42" height="13" rx="6" fill="#facc15"/>
  <!-- gât + cap (piele arsă de soare) -->
  <rect x="103" y="164" width="34" height="38" rx="12" fill="#b87646"/>
  <ellipse cx="120" cy="120" rx="52" ry="58" fill="#c98a5e"/>
  <!-- chelie: creștet neted cu reflex -->
  <ellipse cx="104" cy="76" rx="20" ry="10" fill="#ffffff" opacity="0.18"/>
  <!-- riduri de frunte -->
  <path d="M 96,82 q 24,-7 48,0 M 100,93 q 20,-6 40,0" fill="none" stroke="#a06a42" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
  <!-- urechi -->
  <ellipse cx="66" cy="126" rx="9" ry="13" fill="#b87646"/><ellipse cx="174" cy="126" rx="9" ry="13" fill="#b87646"/>
  <!-- tâmple cu păr cărunt tuns scurt -->
  <path d="M 69,102 Q 65,118 70,132 L 80,128 Q 75,116 80,104 Z" fill="#98a2ad"/>
  <path d="M 171,102 Q 175,118 170,132 L 160,128 Q 165,116 160,104 Z" fill="#98a2ad"/>
  <!-- barbă scurtă căruntă, plină, pe maxilar și bărbie -->
  <path d="M 69,116 Q 72,186 120,193 Q 168,186 171,116 Q 167,162 120,170 Q 73,162 69,116 Z" fill="#98a2ad"/>
  <path d="M 80,140 Q 86,180 120,186 Q 154,180 160,140 Q 152,168 120,173 Q 88,168 80,140 Z" fill="#b8c0c9" opacity="0.75"/>
  <!-- mustață căruntă -->
  <path d="M 98,146 Q 120,156 142,146 Q 140,158 120,161 Q 100,158 98,146 Z" fill="#98a2ad"/>
  <!-- gura -->
  ${mouthOpen
    ? `<ellipse cx="120" cy="168" rx="11" ry="7.5" fill="#5f2413"/><path d="M 111,165 Q 120,160 129,165" fill="none" stroke="#3f1508" stroke-width="2"/>`
    : `<path d="M 109,167 Q 120,172 131,167" fill="none" stroke="#4a2410" stroke-width="4" stroke-linecap="round"/>`}
  <!-- nas -->
  <path d="M 120,126 q -7,14 0,20 q 5,4 9,0" fill="none" stroke="#a06a42" stroke-width="4" stroke-linecap="round"/>
  <!-- ochi + riduri de soare la colțuri -->
  ${blink
    ? `<path d="M 88,112 q 10,6 22,0 M 130,112 q 10,6 22,0" fill="none" stroke="#334155" stroke-width="4" stroke-linecap="round"/>`
    : `<circle cx="99" cy="112" r="7" fill="#1e293b"/><circle cx="141" cy="112" r="7" fill="#1e293b"/>
       <circle cx="101" cy="110" r="2.4" fill="#fff"/><circle cx="143" cy="110" r="2.4" fill="#fff"/>`}
  <path d="M 82,110 l -8,-3 M 82,116 l -8,2 M 158,110 l 8,-3 M 158,116 l 8,2" stroke="#a06a42" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
  <!-- sprâncene cărunte, stufoase -->
  <path d="M 86,99 q 13,-8 27,-3 M 127,96 q 14,-5 27,3" fill="none" stroke="#8b949e" stroke-width="6" stroke-linecap="round"/>
</svg>`;
}

/* ---------- Ilustrația scenei: override din tools/art/ sau SVG programatic ----------
 * Un designer poate pune dayNN-sM.svg sau dayNN-sM.png în tools/art/ — acele
 * fișiere au prioritate în fața ilustrațiilor generate din visuals.mjs. */
function sceneArt(key) {
  const svgPath = join(__dirname, "art", `${key}.svg`);
  if (existsSync(svgPath)) return readFileSync(svgPath, "utf8");
  const pngPath = join(__dirname, "art", `${key}.png`);
  if (existsSync(pngPath)) {
    const b64 = readFileSync(pngPath).toString("base64");
    return `<img src="data:image/png;base64,${b64}" style="width:100%;height:100%;object-fit:contain" alt="">`;
  }
  return sceneSVG(key);
}

/* ---------- Pronunție: text pentru TTS ≠ text pentru subtitrare ----------
 * Vocea citește varianta fonetică; subtitrarea păstrează scrierea corectă. */
const PRONUNCIATIONS = [
  [/\bVHF\b/g, "ve-haș-ef"],
  [/\bMAYDAY\b/gi, "meidei"],
  [/\boutboard\b/gi, "autbord"],
  [/\binboard\b/gi, "inbord"],
  [/\bsterndrive\b/gi, "sterndraiv"],
  [/\bRIB\b/g, "rib"],
  [/\bDanforth\b/gi, "Danfort"],
  [/\bCOLREG\b/g, "colreg"],
  [/\bRIPAM\b/g, "ripam"],
  [/\bkill switch\b/gi, "chil suici"],
  [/\bBruce\b/g, "Brus"],
  [/\btelltale\b/gi, "telteil"],
  [/\bwaypointuri\b/gi, "ueipointuri"],
  [/\bwaypoint\b/gi, "ueipoint"],
  [/\bGPS\b/g, "ge-pe-es"],
  [/\bStaying Alive\b/g, "steing alaiv"],
  [/\bjet-ski\b/gi, "get schi"],
  [/\bover\b/g, "ouver"],
  [/\bout\b/g, "aut"],
  [/\bdistress\b/gi, "distres"],
  [/\bchartplotter\b/gi, "ceartploter"],
  [/\bchartploter(ul)?\b/gi, "ceartploter$1"],
  [/\bthis is\b/gi, "dis iz"],
  [/\bradio check\b/gi, "redio cec"],
  [/\bWine\b/g, "uain"],
  [/\bMarine Traffic\b/g, "marin trafic"],
  [/\bAIS(-ul)?\b/g, "a-i-es$1"],
  [/\bDSC\b/g, "de-se-ce"],
  [/\bbowline\b/gi, "baulain"],
  [/\bskipper(ul|ului)?\b/gi, "schiper$1"],
];
const ttsText = (s) => PRONUNCIATIONS.reduce((t, [re, rep]) => t.replace(re, rep), s);

/* ---------- Șablonul cadrului video ---------- */
function frameHTML(lesson, mod, slide, idx, total, state) {
  const svg = sceneArt(slide.art || `${lesson.id}-s${idx + 1}`);
  return `<!DOCTYPE html><html lang="ro"><head><meta charset="utf-8"><style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:1280px; height:720px; overflow:hidden; font-family:"DejaVu Sans",sans-serif;
    background:linear-gradient(135deg,#0b1220,#14213d); display:flex; flex-direction:column; }
  .top { height:64px; display:flex; align-items:center; justify-content:space-between;
    padding:0 26px; color:#cbd5e1; }
  .top .mod { color:${JSON.stringify(mod.color)}; font-weight:bold; font-size:19px;
    text-transform:uppercase; letter-spacing:.6px; }
  .top .ttl { font-size:19px; color:#e2e8f0; font-weight:bold; }
  .top .cnt { font-size:16px; opacity:.7; }
  .main { flex:1; display:flex; gap:14px; padding:0 20px 18px; }
  .visual { width:952px; background:linear-gradient(180deg,#e9f4fc,#cfe6f7); border-radius:16px;
    overflow:hidden; display:flex; align-items:center; justify-content:center;
    box-shadow:0 8px 30px rgba(0,0,0,.4); }
  .visual svg { width:100%; height:100%; }
  .narr { flex:1; display:flex; flex-direction:column; gap:10px; }
  .avatar { flex:1; background:linear-gradient(180deg,#1e3a5f,#0f2440); border-radius:16px;
    border:2px solid #2c4a73; display:flex; align-items:flex-end; justify-content:center; overflow:hidden; }
  .avatar svg { width:86%; }
  .plate { background:#0f172a; border:2px solid #2c4a73; border-radius:12px; color:#e2e8f0;
    text-align:center; padding:9px 6px; }
  .plate .nm { font-weight:bold; font-size:19px; }
  .plate .rl { font-size:13.5px; color:#93b1d4; margin-top:2px; }
  .day { background:${JSON.stringify(mod.color)}; color:#fff; border-radius:12px;
    text-align:center; padding:8px 6px; font-weight:bold; font-size:17px; }
</style></head><body>
  <div class="top">
    <span class="mod">${mod.title}</span>
    <span class="ttl">${slide.title}</span>
    <span class="cnt">${idx + 1} / ${total}</span>
  </div>
  <div class="main">
    <div class="visual">${svg}</div>
    <div class="narr">
      <div class="avatar">${narratorSVG(state)}</div>
      <div class="plate"><div class="nm">Cpt. Paul Dicu</div><div class="rl">instructorul tău</div></div>
      <div class="day">Ziua ${lesson.day} din ${LESSONS.length}</div>
    </div>
  </div>
</body></html>`;
}

/* ---------- 2. Randare cadre (3 stări per scenă) ---------- */
console.log("→ Randez cadrele scenelor (Playwright)...");
const pw = await import("playwright").catch(() => import("/opt/node22/lib/node_modules/playwright/index.js"));
const chromium = (pw.default || pw).chromium;
const browser = await chromium.launch({
  executablePath: existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined,
});
const page = await (await browser.newContext({ viewport: { width: 1280, height: 720 } })).newPage();

const STATES = [
  { key: "a", mouthOpen: false, blink: false },
  { key: "b", mouthOpen: true, blink: false },
  { key: "c", mouthOpen: false, blink: true },
];

const scenes = []; // {lesson, base, pngs:{a,b,c}, wav, timings, seg, phrases}
for (const lesson of lessons) {
  const mod = MODULES.find((m) => m.id === lesson.module);
  for (let i = 0; i < lesson.slides.length; i++) {
    const base = `${lesson.id}-s${String(i + 1).padStart(2, "0")}`;
    const pngs = {};
    for (const st of STATES) {
      pngs[st.key] = join(BUILD, "slides", `${base}-${st.key}.png`);
      await page.setContent(frameHTML(lesson, mod, lesson.slides[i], i, lesson.slides.length, st), { waitUntil: "load" });
      await page.screenshot({ path: pngs[st.key] });
    }
    scenes.push({
      lesson: lesson.id, base, pngs,
      wav: join(BUILD, "audio", base + ".wav"),
      timings: join(BUILD, "audio", base + ".json"),
      seg: join(BUILD, "segments", base + ".mp4"),
      phrases: splitPhrases(lesson.slides[i].narration),
    });
  }
  console.log(`   ${lesson.id}: ${lesson.slides.length} scene`);
}
await browser.close();

/* ---------- 3. TTS pe fraze ---------- */
console.log("→ Generez narațiunea pe fraze (Piper ro_RO-mihai-medium)...");
const manifest = scenes.map((s) => ({
  phrases: s.phrases,             // textul subtitrărilor (scriere corectă)
  speech: s.phrases.map(ttsText), // textul citit de voce (fonetic)
  out: s.wav, timings: s.timings,
}));
const manifestPath = join(BUILD, "tts_manifest.json");
writeFileSync(manifestPath, JSON.stringify(manifest));
execFileSync("python3", [join(__dirname, "tts_batch.py"), manifestPath, MODEL_DIR], { stdio: "inherit" });

/* ---------- 4. Segmente video cu animație de vorbire ---------- */
console.log("→ Asamblez segmentele (ffmpeg)...");
for (const s of scenes) {
  const t = JSON.parse(readFileSync(s.timings, "utf8"));
  s.audioDur = t.duration;
  s.phraseTimings = t.phrases;
  const segDur = t.duration + TAIL_SEC;
  const nFrames = Math.ceil(segDur * FPS) + 1;

  // Secvență de cadre: vorbire = alternanță a/b; liniștea de final = a; clipit la ~3s.
  const dir = join(BUILD, "frames", s.base);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  for (let f = 0; f < nFrames; f++) {
    const time = f / FPS;
    let st;
    if (time >= t.duration) st = "a";                    // tăcere la final
    else if (f % 12 === 11) st = "c";                    // clipit
    else st = f % 2 === 0 ? "a" : "b";                   // vorbire
    const dst = join(dir, `f${String(f).padStart(4, "0")}.png`);
    try { linkSync(s.pngs[st], dst); } catch (_) { copyFileSync(s.pngs[st], dst); }
  }

  execFileSync("ffmpeg", [
    "-y", "-loglevel", "error",
    "-framerate", String(FPS), "-i", join(dir, "f%04d.png"),
    "-i", s.wav,
    "-t", String(segDur),
    "-c:v", "libx264", "-preset", "medium", "-crf", "24", "-pix_fmt", "yuv420p",
    "-c:a", "aac", "-b:a", "80k", "-ar", "22050", "-ac", "1",
    s.seg,
  ]);
  rmSync(dir, { recursive: true, force: true });
}

/* ---------- 5. Concatenare + subtitrări arse ---------- */
console.log("→ Concatenez lecțiile și ard subtitrările...");
const fmtSrt = (sec) => {
  const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s2 = Math.floor(sec % 60),
    ms = Math.round((sec - Math.floor(sec)) * 1000);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s2).padStart(2, "0")},${String(ms).padStart(3, "0")}`;
};

for (const lesson of lessons) {
  const ls = scenes.filter((s) => s.lesson === lesson.id);
  // durate reale ale segmentelor (audio + tail; concat le însumează)
  let offset = 0, srtIdx = 1;
  const srtLines = [];
  for (const s of ls) {
    const probed = parseFloat(execFileSync("ffprobe", ["-v", "quiet", "-show_entries", "format=duration", "-of", "csv=p=0", s.seg]).toString());
    for (const ph of s.phraseTimings) {
      srtLines.push(`${srtIdx++}\n${fmtSrt(offset + ph.start)} --> ${fmtSrt(offset + Math.min(ph.end + 0.15, s.audioDur))}\n${ph.text}\n`);
    }
    s.realDur = probed;
    offset += probed;
  }
  const srtPath = join(BUILD, `${lesson.id}.srt`);
  writeFileSync(srtPath, srtLines.join("\n"));

  const listPath = join(BUILD, `${lesson.id}.txt`);
  writeFileSync(listPath, ls.map((s) => `file '${s.seg}'`).join("\n"));

  const out = join(OUT, `${lesson.id}.mp4`);
  const style = "FontName=DejaVu Sans,FontSize=13,PrimaryColour=&H00ffffff,BackColour=&H58000000,BorderStyle=4,Outline=0,Shadow=0,MarginV=18,MarginL=28,MarginR=28,Alignment=2,WrapStyle=0";
  execFileSync("ffmpeg", [
    "-y", "-loglevel", "error",
    "-f", "concat", "-safe", "0", "-i", listPath,
    "-vf", `subtitles=filename=${srtPath}:force_style='${style}'`,
    "-c:v", "libx264", "-preset", "medium", "-crf", "24", "-pix_fmt", "yuv420p",
    "-c:a", "copy", "-movflags", "+faststart",
    out,
  ]);
  const dur = execFileSync("ffprobe", ["-v", "quiet", "-show_entries", "format=duration", "-of", "csv=p=0", out]).toString().trim();
  console.log(`   ${lesson.id}.mp4 — ${Math.round(parseFloat(dur))}s, ${ls.length} scene`);
}

console.log("✔ Gata. Videourile sunt în videos/.");
