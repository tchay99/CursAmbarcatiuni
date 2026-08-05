#!/usr/bin/env node
/*
 * generate-videos.mjs — Generează fișierele video MP4 ale lecțiilor.
 *
 * Pipeline:
 *   1. Încarcă lecțiile din assets/js/content.js.
 *   2. Randează fiecare diapozitiv ca PNG 1280x720 (Playwright + Chromium).
 *   3. Sintetizează narațiunea în română (Piper ro_RO-mihai-medium via
 *      sherpa-onnx, apelat prin tools/tts_batch.py).
 *   4. Asamblează cu ffmpeg: imagine + audio per diapozitiv, apoi concatenare
 *      în videos/dayNN.mp4.
 *
 * Cerințe: node + playwright + chromium, python3 + sherpa-onnx + soundfile,
 *          ffmpeg, modelul vits-piper-ro_RO-mihai-medium (vezi tools/README.md).
 *
 * Utilizare:
 *   node tools/generate-videos.mjs [--only day01,day02] [--model-dir DIR]
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const BUILD = join(ROOT, "tools", "build");
const OUT = join(ROOT, "videos");

// ---------- CLI ----------
const args = process.argv.slice(2);
const getArg = (name, def) => {
  const i = args.indexOf(name);
  return i !== -1 && args[i + 1] ? args[i + 1] : def;
};
const ONLY = (getArg("--only", "") || "").split(",").filter(Boolean);
const MODEL_DIR = getArg("--model-dir", process.env.PIPER_RO_MODEL_DIR || "");
if (!MODEL_DIR || !existsSync(join(MODEL_DIR, "tokens.txt"))) {
  console.error("EROARE: specifică directorul modelului Piper românesc cu --model-dir sau PIPER_RO_MODEL_DIR");
  console.error("(directorul trebuie să conțină ro_RO-mihai-medium.onnx, tokens.txt, espeak-ng-data/)");
  process.exit(1);
}

// ---------- 1. Încarcă lecțiile ----------
const contentSrc = readFileSync(join(ROOT, "assets/js/content.js"), "utf8");
const sandbox = { window: {} };
vm.runInNewContext(contentSrc, sandbox);
const { LESSONS, MODULES } = sandbox.window.COURSE;
const lessons = ONLY.length ? LESSONS.filter((l) => ONLY.includes(l.id)) : LESSONS;

mkdirSync(join(BUILD, "slides"), { recursive: true });
mkdirSync(join(BUILD, "audio"), { recursive: true });
mkdirSync(join(BUILD, "segments"), { recursive: true });
mkdirSync(OUT, { recursive: true });

// ---------- 2. Randează diapozitivele ca PNG ----------
const slideHTML = (lesson, slide, idx, total, modTitle, modColor) => `<!DOCTYPE html>
<html lang="ro"><head><meta charset="utf-8"><style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:1280px; height:720px; overflow:hidden;
    font-family:"DejaVu Sans","Segoe UI",system-ui,sans-serif;
    background:linear-gradient(135deg,#0b1220,#14213d 60%,#1a2b52);
    color:#eaf1ff; display:flex; flex-direction:column; padding:56px 72px; }
  .top { display:flex; justify-content:space-between; align-items:center;
    font-size:19px; color:#9fb3d1; margin-bottom:30px; }
  .top .mod { color:${JSON.stringify(modColor)}; font-weight:700; text-transform:uppercase; letter-spacing:1px; }
  h1 { font-size:46px; line-height:1.15; margin-bottom:38px; color:#fff; }
  ul { list-style:none; }
  li { font-size:30px; line-height:1.5; margin-bottom:24px; padding-left:40px; position:relative; }
  li::before { content:"⚓"; position:absolute; left:0; font-size:24px; opacity:.8; }
  .foot { margin-top:auto; display:flex; justify-content:space-between; align-items:center;
    border-top:1px solid #ffffff22; padding-top:20px; font-size:18px; color:#9fb3d1; }
  .day { background:#ffffff14; border-radius:10px; padding:6px 16px; }
</style></head><body>
  <div class="top"><span class="mod">${modTitle}</span><span>Diapozitiv ${idx + 1} / ${total}</span></div>
  <h1>${slide.title}</h1>
  <ul>${slide.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>
  <div class="foot">
    <span>Curs: Conducător de ambarcațiune cu motor</span>
    <span class="day">Ziua ${lesson.day}: ${lesson.title}</span>
  </div>
</body></html>`;

console.log("→ Randez diapozitivele (Playwright)...");
const pw = await import("playwright").catch(() => import("/opt/node22/lib/node_modules/playwright/index.js"));
const chromium = (pw.default || pw).chromium;
const browser = await chromium.launch({
  executablePath: existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined,
});
const page = await (await browser.newContext({ viewport: { width: 1280, height: 720 } })).newPage();

const jobs = []; // {png, wav, seg, text}
for (const lesson of lessons) {
  const mod = MODULES.find((m) => m.id === lesson.module);
  for (let i = 0; i < lesson.slides.length; i++) {
    const s = lesson.slides[i];
    const base = `${lesson.id}-s${String(i + 1).padStart(2, "0")}`;
    const png = join(BUILD, "slides", base + ".png");
    await page.setContent(slideHTML(lesson, s, i, lesson.slides.length, mod.title, mod.color), { waitUntil: "load" });
    await page.screenshot({ path: png });
    jobs.push({ lesson: lesson.id, png, wav: join(BUILD, "audio", base + ".wav"), seg: join(BUILD, "segments", base + ".mp4"), text: s.narration });
  }
  console.log(`   ${lesson.id}: ${lesson.slides.length} diapozitive`);
}
await browser.close();

// ---------- 3. Sinteză vocală (un singur proces python, modelul se încarcă o dată) ----------
console.log("→ Generez narațiunea (Piper ro_RO-mihai-medium)...");
const ttsManifest = jobs.map((j) => ({ text: j.text, out: j.wav }));
const manifestPath = join(BUILD, "tts_manifest.json");
writeFileSync(manifestPath, JSON.stringify(ttsManifest));
execFileSync("python3", [join(__dirname, "tts_batch.py"), manifestPath, MODEL_DIR], { stdio: "inherit" });

// ---------- 4. Asamblare ffmpeg ----------
console.log("→ Asamblez videourile (ffmpeg)...");
for (const j of jobs) {
  // Segment: imagine statică + audio; +0.6s liniște la final pentru respirație.
  execFileSync("ffmpeg", [
    "-y", "-loglevel", "error",
    "-loop", "1", "-i", j.png,
    "-i", j.wav,
    "-af", "apad=pad_dur=0.6",
    "-c:v", "libx264", "-tune", "stillimage", "-pix_fmt", "yuv420p", "-r", "6",
    "-c:a", "aac", "-b:a", "80k", "-ar", "22050", "-ac", "1",
    "-shortest", j.seg,
  ]);
}

for (const lesson of lessons) {
  const segs = jobs.filter((j) => j.lesson === lesson.id);
  const listFile = join(BUILD, `${lesson.id}.txt`);
  writeFileSync(listFile, segs.map((j) => `file '${j.seg.replace(/'/g, "'\\''")}'`).join("\n"));
  const out = join(OUT, `${lesson.id}.mp4`);
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", listFile, "-c", "copy", "-movflags", "+faststart", out]);
  const dur = execFileSync("ffprobe", ["-v", "quiet", "-show_entries", "format=duration", "-of", "csv=p=0", out]).toString().trim();
  console.log(`   ${lesson.id}.mp4 — ${Math.round(parseFloat(dur))}s`);
}

console.log("✔ Gata. Videourile sunt în videos/.");
