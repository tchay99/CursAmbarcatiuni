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
const TAIL_SEC = 1.0; // pauză de respiro după fiecare operație

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
for (const d of ["slides", "audio", "frames", "music"]) mkdirSync(join(BUILD, d), { recursive: true });
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
    states: { intro_a: introHTML(ch, false), intro_b: introHTML(ch, true) },
    phrases: ch.intro,
    pick: () => "intro",
  });

  // — cele 10 înmulțiri. Regula de ritm: GRAFICA ÎNTÂI, VOCEA DUPĂ —
  // ecranul nou („7 × 6 = ?”) apare cu ~0,8s înaintea vocii (lead),
  // rezultatul apare în pauza dintre cele două fraze, iar vocea îl
  // rostește la ~0,5s DUPĂ apariție (gap mărit între fraze).
  // Numerele scurte nu se rostesc izolat (Piper le „înghite”), deci rămân
  // lipite de „fac”; cele lungi formează singure fraza a doua.
  ch.verses.forEach((v, i) => {
    const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
    const syllables = (v.rWord.match(/[aeiouăâî]/gi) || []).length;
    const standalone = v.rWord.includes(" ") || syllables >= 3;
    scenes.push({
      id: `v${String(i + 1).padStart(2, "0")}`,
      states: {
        q_a: verseHTML(ch, i, false, false),
        q_b: verseHTML(ch, i, false, true),
        res_a: verseHTML(ch, i, true, false),
        res_b: verseHTML(ch, i, true, true),
      },
      phrases: standalone
        ? [`${cap(numWord(v.a))} ori ${numWord(v.b)} fac`, `${v.rWord}!`]
        : [`${cap(numWord(v.a))} ori ${numWord(v.b)}`, `fac ${v.rWord}!`],
      lead: 0.8,
      gap: 0.55,
      pick: (t, ph) => {
        if (!ph[1]) return "q";
        // rezultatul apare imediat ce s-a terminat de rostit fraza 1,
        // cu ~0,5s înainte ca vocea să înceapă fraza cu numărul
        const at = Math.max((ph[0].speechEnd ?? ph[0].end) + 0.08, ph[1].start - 0.5);
        return t >= at ? "res" : "q";
      },
    });
  });

  // — finalul: lista completă rămâne pe ecran, cu o pauză lungă,
  // ca să poată fi citită și repetată cu voce tare —
  scenes.push({
    id: "outro",
    states: { outro_a: outroHTML(ch, false), outro_b: outroHTML(ch, true) },
    phrases: ch.outro,
    lead: 0.6,
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
    });
  }
  console.log(`   capitolul ${ch.n}: ${chScenes.length} scene, ${count} cadre`);
}
await browser.close();

/* ---------- 2. Vocea (TTS pe fraze, cu timpi exacți) ---------- */
console.log("→ Generez vocea (Piper ro_RO-mihai-medium)...");
// pauza de după fiecare scenă (tail) intră direct în WAV — astfel WAV-urile
// concatenate dau exact timeline-ul video, la eșantion
const manifest = scenes.map((s) => ({
  phrases: s.scene.phrases, out: s.wav, timings: s.timings,
  tail: s.scene.tail ?? TAIL_SEC,
  ...(s.scene.lead ? { lead: s.scene.lead } : {}),
  ...(s.scene.gap ? { gap: s.scene.gap } : {}),
}));
const manifestPath = join(BUILD, "tts_manifest.json");
writeFileSync(manifestPath, JSON.stringify(manifest));
execFileSync("python3", [join(__dirname, "tts_batch.py"), manifestPath, MODEL_DIR], { stdio: "inherit" });

/* ---------- 3. Un singur timeline per capitol (fără concatenare de segmente)
 * Concatenarea de segmente MP4 acumula derivă audio/video: fiecare segment
 * avea video cuantizat la cadre (până la +83ms față de audio), iar filtrul
 * de mixare compacta golurile — decalaj tot mai mare spre finalul
 * capitolului. Acum: WAV-urile scenelor (cu tail inclus) se lipesc PCM la
 * eșantion, cadrele se așază pe un singur timeline global și totul se
 * encodează o singură dată — nu există granițe interne care să devieze. */
console.log("→ Asamblez capitolele (un singur timeline, ffmpeg)...");
for (const ch of chapters) {
  const cs = scenes.filter((s) => s.ch.n === ch.n);
  let total = 0;
  for (const s of cs) {
    s.t = JSON.parse(readFileSync(s.timings, "utf8"));
    s.off = total;
    total += s.t.duration;
  }

  // audio-ul capitolului: concatenare PCM fără pierderi a WAV-urilor scenelor
  const listPath = join(BUILD, `t${ch.n}-wavs.txt`);
  writeFileSync(listPath, cs.map((s) => `file '${s.wav}'`).join("\n"));
  const chWav = join(BUILD, `t${ch.n}.wav`);
  execFileSync("ffmpeg", ["-y", "-loglevel", "error",
    "-f", "concat", "-safe", "0", "-i", listPath, "-c", "copy", chWav]);

  // cadrele întregului capitol, pe timeline-ul global
  const dir = join(BUILD, "frames", `t${ch.n}`);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  const nFrames = Math.round(total * FPS);
  let si = 0;
  for (let f = 0; f < nFrames; f++) {
    const T = f / FPS;
    while (si < cs.length - 1 && T >= cs[si].off + cs[si].t.duration) si++;
    const s = cs[si];
    const t = T - s.off;
    const stateKey = s.scene.pick(t, s.t.phrases, s.t.duration);
    // vizorul robotului pulsează doar cât se vorbește efectiv (~3Hz)
    const speaking = s.t.phrases.some((p) => t >= p.start && t < (p.speechEnd ?? p.end));
    const talk = speaking && f % 4 < 2 ? "b" : "a";
    const png = s.pngs[`${stateKey}_${talk}`] || s.pngs[`${stateKey}_a`];
    const dst = join(dir, `f${String(f).padStart(5, "0")}.png`);
    try { linkSync(png, dst); } catch (_) { copyFileSync(png, dst); }
  }

  const musicPath = join(BUILD, "music", `t${ch.n}.wav`);
  execFileSync("python3", [join(__dirname, "tabla_music.py"), musicPath, String(total), String(ch.n)], { stdio: "inherit" });

  const out = join(OUT, `tabla-${String(ch.n).padStart(2, "0")}.mp4`);
  execFileSync("ffmpeg", [
    "-y", "-loglevel", "error",
    "-framerate", String(FPS), "-i", join(dir, "f%05d.png"),
    "-i", chWav, "-i", musicPath,
    "-filter_complex", "[2:a]volume=0.11[m];[1:a][m]amix=inputs=2:duration=first:normalize=0[aout]",
    "-map", "0:v", "-map", "[aout]",
    "-t", String(total),
    "-c:v", "libx264", "-preset", "medium", "-crf", "23", "-pix_fmt", "yuv420p",
    "-c:a", "aac", "-b:a", "96k", "-ar", "22050", "-ac", "1",
    "-movflags", "+faststart",
    out,
  ]);
  rmSync(dir, { recursive: true, force: true });
  console.log(`   tabla-${String(ch.n).padStart(2, "0")}.mp4 — ${Math.round(total)}s, ${cs.length} scene`);
}

console.log("✔ Gata. Cântecelele sunt în videos/tabla/.");
