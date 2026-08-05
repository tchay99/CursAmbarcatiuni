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

Pipeline: diapozitive HTML → PNG 1280×720 (Playwright) → narațiune WAV
(Piper TTS, voce neuronală românească) → segmente MP4 (H.264 + AAC, ffmpeg) →
concatenare per lecție. Artefactele intermediare rămân în `tools/build/`
(ignorat de git).
