#!/usr/bin/env node
/*
 * generate-tabla.mjs — „Tabla înmulțirii” (10 videoclipuri MP4, stil pre-teen).
 *
 * Pentru fiecare capitol N (înmulțirea cu 1 … cu 10) produce
 * videos/tabla/tabla-NN.mp4 cu structura:
 *   intro   — titlul + trucul de memorare al capitolului;
 *   10 înmulțiri — vocea narează operația și rezultatul („Doi ori patru fac
 *             opt!”), iar pe ecran lista înmulțirilor capitolului se
 *             completează rând cu rând (cele precedente rămân la vedere);
 *             alături, rețeaua de obiecte a×b crește cu un rând per operație;
 *   outro   — lista completă rămâne pe ecran, de repetat cu voce tare.
 *
 * Pipeline (aceleași unelte ca generate-videos.mjs): stări de cadru randate cu
 * Playwright → TTS pe fraze cu timpi exacți (tools/tts_batch.py, Piper
 * ro_RO-mihai-medium) → secvențe de cadre + audio per scenă (ffmpeg) →
 * concatenare per capitol → mixare cu muzica de fundal (tools/tabla_music.py).
 *
 * Utilizare:
 *   node tools/generate-tabla.mjs [--only 2,7] [--model-dir DIR]
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync, linkSync, copyFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { CHAPTERS } from "./tabla-content.mjs";
import { introHTML, verseHTML, outroHTML, numWord } from "./tabla-visuals.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const BUILD = join(ROOT, "tools", "build", "tabla");
const OUT = join(ROOT, "videos", "tabla");
const FPS = 12; // suficient de fin ca dezvăluirea să cadă pe cuvânt (±42ms)
const TAIL_SEC = 0.7;

const args = process.argv.slice(2);
const getArg = (n, d) => { const i = args.indexOf(n); return i !== -1 && args[i + 1] ? args[i + 1] : d; };
const ONLY = (getArg("--only", "") || "").split(",").filter(Boolean).map(Number);
const MODEL_DIR = getArg("--model-dir",
  process.env.PIPER_RO_MODEL_DIR || join(ROOT, "tools", "build", "vits-piper-ro_RO-mihai-medium"));
if (!existsSync(join(MODEL_DIR, "tokens.txt"))) {
  console.error("EROARE: dă directorul modelului Piper cu --model-dir sau PIPER_RO_MODEL_DIR");
  process.exit(1);
}

const chapters = ONLY.length ? CHAPTERS.filter((c) => ONLY.includes(c.n)) : CHAPTERS;
for (const d of ["slides", "audio", "segments", "frames", "music"]) mkdirSync(join(BUILD, d), { recursive: true });
mkdirSync(OUT, { recursive: true });

/*
 * Scenele fiecărui capitol. Pentru fiecare scenă definim:
 *   states  — { cheie: html } (cheia include varianta de gură _a/_b);
 *   phrases — frazele TTS (timpii lor comandă alegerea stării);
 *   pick(t, timings, dur) — cheia stării (fără sufixul de gură) la momentul t.
 */
function chapterScenes(ch) {
  const scenes = [];
  const mouth = (html) => html; // lizibilitate

  // — intro —
  scenes.push({
    id: "intro",
    states: { intro: introHTML(ch) },
    phrases: ch.intro,
    pick: () => "intro",
  });

  // — cele 10 înmulțiri: vocea narează operația și rezultatul în două fraze
  // TTS („Doi ori patru” + „fac opt!”), iar rezultatul de pe ecran apare
  // EXACT la granița dintre ele — graniță cunoscută la eșantion din
  // tts_batch, deci fără estimări de sincronizare. Rezultatul nu se rostește
  // niciodată singur (Piper înghite cuvintele scurte izolate) — „fac” îl
  // însoțește mereu.
  ch.verses.forEach((v, i) => {
    const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
    scenes.push({
      id: `v${String(i + 1).padStart(2, "0")}`,
      states: { q: verseHTML(ch, i, false), res: verseHTML(ch, i, true) },
      phrases: [`${cap(numWord(v.a))} ori ${numWord(v.b)}`, `fac ${v.rWord}!`],
      pick: (t, ph) => (ph[1] && t >= ph[1].start ? "res" : "q"),
    });
  });

  // — finalul: lista completă rămâne pe ecran, cu o pauză lungă,
  // ca să poată fi citită și repetată cu voce tare —
  scenes.push({
    id: "outro",
    states: { outro: outroHTML(ch) },
    phrases: ch.outro,
    pick: () => "outro",
    tail: 10,
  });

  return scenes;
}

/* ---------- 1. Randarea stărilor de cadru (Playwright) ---------- */
console.log("→ Randez cadrele (Playwright)...");
const pw = await import("playwright").catch(() => import("/opt/node22/lib/node_modules/playwright/index.js"));
const chromium = (pw.default || pw).chromium;
const browser = await chromium.launch({
  executablePath: existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined,
});
const page = await (await browser.newContext({ viewport: { width: 1280, height: 720 } })).newPage();

const scenes = []; // {ch, scene, base, pngs, wav, timings, seg}
for (const ch of chapters) {
  const chScenes = chapterScenes(ch);
  let count = 0;
  for (const scene of chScenes) {
    const base = `t${String(ch.n).padStart(2, "0")}-${scene.id}`;
    const pngs = {};
    for (const [key, html] of Object.entries(scene.states)) {
      pngs[key] = join(BUILD, "slides", `${base}-${key}.png`);
      await page.setContent(html, { waitUntil: "load" });
      await page.screenshot({ path: pngs[key] });
      count++;
    }
    scenes.push({
      ch, scene, base, pngs,
      wav: join(BUILD, "audio", base + ".wav"),
      timings: join(BUILD, "audio", base + ".json"),
      seg: join(BUILD, "segments", base + ".mp4"),
    });
  }
  console.log(`   capitolul ${ch.n}: ${chScenes.length} scene, ${count} cadre`);
}
await browser.close();

/* ---------- 2. Vocea (TTS pe fraze, cu timpi exacți) ---------- */
console.log("→ Generez vocea (Piper ro_RO-mihai-medium)...");
const manifest = scenes.map((s) => ({ phrases: s.scene.phrases, out: s.wav, timings: s.timings }));
const manifestPath = join(BUILD, "tts_manifest.json");
writeFileSync(manifestPath, JSON.stringify(manifest));
execFileSync("python3", [join(__dirname, "tts_batch.py"), manifestPath, MODEL_DIR], { stdio: "inherit" });

/* ---------- 3. Segmente video sincronizate cu vocea ---------- */
console.log("→ Asamblez segmentele (ffmpeg)...");
for (const s of scenes) {
  const t = JSON.parse(readFileSync(s.timings, "utf8"));
  const tail = s.scene.tail ?? TAIL_SEC;
  const segDur = t.duration + tail;
  const nFrames = Math.ceil(segDur * FPS) + 1;

  const dir = join(BUILD, "frames", s.base);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  for (let f = 0; f < nFrames; f++) {
    const time = f / FPS;
    const png = s.pngs[s.scene.pick(time, t.phrases, t.duration)];
    const dst = join(dir, `f${String(f).padStart(4, "0")}.png`);
    try { linkSync(png, dst); } catch (_) { copyFileSync(png, dst); }
  }

  execFileSync("ffmpeg", [
    "-y", "-loglevel", "error",
    "-framerate", String(FPS), "-i", join(dir, "f%04d.png"),
    "-i", s.wav,
    "-t", String(segDur),
    "-c:v", "libx264", "-preset", "medium", "-crf", "23", "-pix_fmt", "yuv420p",
    "-c:a", "aac", "-b:a", "96k", "-ar", "22050", "-ac", "1",
    s.seg,
  ]);
  rmSync(dir, { recursive: true, force: true });
}

/* ---------- 4. Concatenare per capitol + muzică de fundal ---------- */
console.log("→ Concatenez capitolele și adaug muzica...");
for (const ch of chapters) {
  const cs = scenes.filter((s) => s.ch.n === ch.n);
  const listPath = join(BUILD, `t${ch.n}.txt`);
  writeFileSync(listPath, cs.map((s) => `file '${s.seg}'`).join("\n"));

  const concatPath = join(BUILD, `t${ch.n}-concat.mp4`);
  execFileSync("ffmpeg", [
    "-y", "-loglevel", "error",
    "-f", "concat", "-safe", "0", "-i", listPath,
    "-c", "copy", concatPath,
  ]);

  const dur = parseFloat(execFileSync("ffprobe",
    ["-v", "quiet", "-show_entries", "format=duration", "-of", "csv=p=0", concatPath]).toString());

  const musicPath = join(BUILD, "music", `t${ch.n}.wav`);
  execFileSync("python3", [join(__dirname, "tabla_music.py"), musicPath, String(dur), String(ch.n)], { stdio: "inherit" });

  const out = join(OUT, `tabla-${String(ch.n).padStart(2, "0")}.mp4`);
  execFileSync("ffmpeg", [
    "-y", "-loglevel", "error",
    "-i", concatPath, "-i", musicPath,
    "-filter_complex", "[1:a]volume=0.11[m];[0:a][m]amix=inputs=2:duration=first:normalize=0[aout]",
    "-map", "0:v", "-map", "[aout]",
    "-c:v", "copy", "-c:a", "aac", "-b:a", "96k",
    "-movflags", "+faststart",
    out,
  ]);
  console.log(`   tabla-${String(ch.n).padStart(2, "0")}.mp4 — ${Math.round(dur)}s, ${cs.length} scene`);
}

console.log("✔ Gata. Cântecelele sunt în videos/tabla/.");
