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

## Bonus: Cântecelul tablei înmulțirii (`videos/tabla/`)

Un set separat de 10 videoclipuri pentru memorarea tablei înmulțirii, câte un
capitol pentru înmulțirea cu 1 … cu 10 (pagina de vizionare:
`tabla/index.html`), în stil pentru pre-adolescenți: temă întunecată cu
accente neon, tipografie mare, fără mascotă:

- vocea narează simplu fiecare operație și rezultatul ei („Doi ori patru fac
  opt!”) — conținutul în `tools/tabla-content.mjs`;
- pe ecran, lista înmulțirilor capitolului se completează rând cu rând, iar
  operațiile deja narate rămân la vedere (`tools/tabla-visuals.mjs`);
- alături, o rețea de forme neon (fulger, hexagon, romb… — câte o formă și o
  culoare per capitol) crește cu un rând la fiecare operație;
- rezultatul apare EXACT când vocea începe „fac X!” — fraza e sintetizată în
  două bucăți, iar granița dintre ele e cunoscută la eșantion (fără estimări);
- la final, lista completă rămâne pe ecran ~10s, de repetat cu voce tare;
- beat lo-fi discret de fundal, sintetizat programatic (`tools/tabla_music.py`).

Notă TTS: cuvintele scurte rostite izolat („opt!”) sunt trunchiate de vocea
Piper — de aceea rezultatul e mereu însoțit („fac opt!”).

Regenerare (aceleași cerințe ca mai sus):

```bash
# toate capitolele
node tools/generate-tabla.mjs --model-dir ./vits-piper-ro_RO-mihai-medium

# doar anumite capitole
node tools/generate-tabla.mjs --only 2,7 --model-dir ./vits-piper-ro_RO-mihai-medium
```
