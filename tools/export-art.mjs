#!/usr/bin/env node
/*
 * export-art.mjs — Exportă ilustrațiile scenelor pentru lucru în design.
 *
 * Produce tools/art-export/ cu:
 *   svg/dayNN-sM.svg  — vectori editabili (Figma / Illustrator / Inkscape)
 *   png/dayNN-sM.png  — randări de referință (privire rapidă)
 *   README.md         — instrucțiuni de round-trip
 *
 * Round-trip: pune fișierele reluate în tools/art/ cu ACELAȘI nume
 * (dayNN-sM.svg sau dayNN-sM.png) — generatorul video le folosește automat
 * în locul ilustrațiilor programatice.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { SCENES, sceneSVG } from "./visuals.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT = join(__dirname, "art-export");
mkdirSync(join(OUT, "svg"), { recursive: true });
mkdirSync(join(OUT, "png"), { recursive: true });

// Titlurile scenelor, pentru un index prietenos în README.
const sandbox = { window: {} };
vm.runInNewContext(readFileSync(join(ROOT, "assets/js/content.js"), "utf8"), sandbox);
const { LESSONS } = sandbox.window.COURSE;

const keys = Object.keys(SCENES);
const indexRows = [];
for (const key of keys) {
  const svg = sceneSVG(key);
  writeFileSync(join(OUT, "svg", `${key}.svg`), svg);
  const [dayId, sPart] = key.split("-s");
  const lesson = LESSONS.find((l) => l.id === dayId);
  const slide = lesson?.slides[Number(sPart) - 1];
  indexRows.push(`| ${key} | Ziua ${lesson?.day} — ${lesson?.title} | ${slide?.title ?? ""} |`);
}
console.log(`SVG: ${keys.length} fișiere scrise.`);

// PNG-uri de referință
const pw = await import("playwright").catch(() => import("/opt/node22/lib/node_modules/playwright/index.js"));
const chromium = (pw.default || pw).chromium;
const browser = await chromium.launch({
  executablePath: existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined,
});
const page = await (await browser.newContext({ viewport: { width: 940, height: 560 } })).newPage();
for (const key of keys) {
  await page.setContent(
    `<!DOCTYPE html><html><body style="margin:0">${sceneSVG(key)}</body></html>`,
    { waitUntil: "load" }
  );
  await page.screenshot({ path: join(OUT, "png", `${key}.png`) });
}
await browser.close();
console.log(`PNG: ${keys.length} randări de referință scrise.`);

writeFileSync(join(OUT, "README.md"), `# Ilustrațiile cursului — pachet pentru design

## Conținut
- \`svg/\` — ilustrațiile ca vectori editabili (Figma, Illustrator, Inkscape).
- \`png/\` — randări de referință, ca să vezi rapid fiecare scenă.

## Reguli de lucru
- **Dimensiunea cadrului: 940 × 560 px** (viewBox „0 0 940 560"). Păstreaz-o —
  ilustrația umple ¾ din cadrul video.
- Zona de jos (~70 px) este acoperită parțial de subtitrări în video — evită
  să pui acolo informație esențială.
- Fontul folosit în video este DejaVu Sans; dacă folosești alt font,
  convertește textele în curbe (outline) la export.

## Cum îmi dai înapoi lucrările (round-trip)
1. Exportă fiecare scenă reluată ca **SVG** (preferat — rămâne clar la orice
   rezoluție) sau **PNG la 1880×1120** (2×), cu **exact același nume de
   fișier**: \`day03-s2.svg\` / \`day03-s2.png\`.
2. Trimite-mi fișierele (zip). Le pun în \`tools/art/\` și regenerez doar
   lecțiile atinse — restul pipeline-ului (narator, voce, subtitrări) rămâne
   neschimbat.
3. Nu e nevoie să le refaci pe toate: orice scenă fără fișier în \`tools/art/\`
   folosește în continuare ilustrația actuală.

## Index scene
| Fișier | Lecția | Scena |
|---|---|---|
${indexRows.join("\n")}
`);
console.log("README scris.");
