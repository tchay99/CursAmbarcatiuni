# tools/ — Generatorul de videouri MP4

Regenerarea videourilor lecțiilor (`videos/day01.mp4` … `day14.mp4`) din
conținutul definit în `assets/js/content.js`.

Videourile generate sunt deja comise în repo — rulezi asta doar dacă modifici
conținutul lecțiilor și vrei videouri noi.

## Cerințe

- Node.js + Playwright cu Chromium (pentru randarea diapozitivelor)
- `ffmpeg`
- Python 3 cu `sherpa-onnx` și `soundfile` (`pip install sherpa-onnx soundfile`)
- Modelul de voce Piper românesc **ro_RO-mihai-medium** (format sherpa-onnx):

```bash
curl -LO https://github.com/k2-fsa/sherpa-onnx/releases/download/tts-models/vits-piper-ro_RO-mihai-medium.tar.bz2
tar xjf vits-piper-ro_RO-mihai-medium.tar.bz2
```

## Utilizare

```bash
# toate lecțiile
node tools/generate-videos.mjs --model-dir ./vits-piper-ro_RO-mihai-medium

# doar anumite zile
node tools/generate-videos.mjs --only day03,day07 --model-dir ./vits-piper-ro_RO-mihai-medium
```

## Formatul videoclipului (stil YouTube)

- **¾ din cadru**: ilustrație explicativă per scenă — diagrame SVG desenate
  programatic în `tools/visuals.mjs` (ambarcațiuni etichetate, geamanduri
  IALA, reguli de drum, lumini de navigație etc.);
- **¼ (coloana din dreapta)**: naratorul „Cpt. Mihai”, animat (gura se mișcă
  în timpul vorbirii, clipește periodic);
- **jos**: subtitrări sincronizate frază-cu-frază cu narațiunea, arse în video
  (libass), ca la YouTube.

Pipeline: narațiunea se împarte în fraze → TTS per frază (timpi exacți) →
cadre PNG cu 3 stări de narator (Playwright) → animație 4 fps + audio per
scenă (ffmpeg) → concatenare + subtitrări arse → `videos/dayNN.mp4`.
Artefactele intermediare rămân în `tools/build/` (ignorat de git).

Dacă modifici o ilustrație în `tools/visuals.mjs`, regenerezi doar lecțiile
afectate cu `--only`.

## Banca de întrebări ANR

`assets/js/questions-anr.js` conține întrebările reale din seturile de
antrenament ale simulatorului ANR (7 categorii, extrase automat din PDF-urile
de recapitulare cu `pdftotext -layout` + parser pe stări). Verificările de
lecție adaugă 2 întrebări reale din categoriile modulului; examenul final
extrage 24 de întrebări echilibrate pe categorii.

## Grafica scenelor — flux cu designer

- `node tools/export-art.mjs` → `tools/art-export/` (SVG editabile + PNG
  de referință + README cu reguli).
- Fișierele reluate de designer se pun în `tools/art/` cu același nume
  (`dayNN-sM.svg` sau `.png`) — generatorul le folosește automat în locul
  ilustrațiilor programatice la următoarea regenerare.
