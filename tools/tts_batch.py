#!/usr/bin/env python3
"""tts_batch.py — Sinteză vocală pe fraze (Piper ro_RO prin sherpa-onnx).

Utilizare: python3 tts_batch.py MANIFEST.json MODEL_DIR

MANIFEST.json (per scenă):
  [{"phrases": ["fraza 1", "fraza 2", ...], "out": "scena.wav",
    "timings": "scena.json"}, ...]

Pentru fiecare scenă: sintetizează frazele, le concatenează (cu o pauză scurtă
între ele) într-un singur WAV și scrie momentele de început/sfârșit ale
fiecărei fraze în fișierul de timings — folosite la generarea subtitrărilor.
"""
import json
import os
import subprocess
import sys
import tempfile

import numpy as np
import sherpa_onnx
import soundfile as sf

GAP_SEC = 0.34   # pauză între fraze — cadență vie, de instructor
SPEED = 1.00     # viteza naturală a modelului (cadența finală vine din TEMPO)

# Timbru „V1": voce coborâtă cu 1,5 semitonuri (mai plină, dar cu vocalele
# naturale ale modelului), cadență +7%. asetrate coboară tonul, atempo
# compensează durata și adaugă accelerarea; puțină căldură la 170 Hz.
PITCH = 0.9170   # -1,5 semitonuri
TEMPO = 1.07     # accelerare peste durata originală
VOICE_FILTER = (
    f"asetrate=22050*{PITCH},aresample=22050,atempo={1/PITCH:.4f}*{TEMPO},"
    "equalizer=f=170:t=q:w=1:g=2,"
    "loudnorm=I=-18:TP=-1.5"
)


def apply_voice_filter(path: str) -> float:
    """Aplică filtrul de timbru peste WAV; întoarce raportul durată_nouă/durată_veche."""
    info = sf.info(path)
    old_dur = info.frames / info.samplerate
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
        tmp_path = tmp.name
    subprocess.run(
        ["ffmpeg", "-v", "error", "-i", path, "-af", VOICE_FILTER,
         "-ar", "22050", tmp_path, "-y"],
        check=True,
    )
    os.replace(tmp_path, path)
    info = sf.info(path)
    return (info.frames / info.samplerate) / old_dur


def main() -> None:
    manifest_path, model_dir = sys.argv[1], sys.argv[2]
    with open(manifest_path, encoding="utf-8") as f:
        scenes = json.load(f)

    onnx = [f for f in os.listdir(model_dir) if f.endswith(".onnx")]
    if not onnx:
        sys.exit(f"Niciun model .onnx în {model_dir}")

    cfg = sherpa_onnx.OfflineTtsConfig(
        model=sherpa_onnx.OfflineTtsModelConfig(
            vits=sherpa_onnx.OfflineTtsVitsModelConfig(
                model=os.path.join(model_dir, onnx[0]),
                tokens=os.path.join(model_dir, "tokens.txt"),
                data_dir=os.path.join(model_dir, "espeak-ng-data"),
            ),
            num_threads=max(2, os.cpu_count() or 2),
        )
    )
    tts = sherpa_onnx.OfflineTts(cfg)

    sr = None
    for i, scene in enumerate(scenes, 1):
        chunks, timings, t = [], [], 0.0
        speech = scene.get("speech") or scene["phrases"]
        for phrase, spoken in zip(scene["phrases"], speech):
            audio = tts.generate(spoken, sid=0, speed=SPEED)
            sr = audio.sample_rate
            samples = np.asarray(audio.samples, dtype=np.float32)
            dur = len(samples) / sr
            timings.append({"text": phrase, "start": round(t, 3), "end": round(t + dur, 3)})
            chunks.append(samples)
            chunks.append(np.zeros(int(GAP_SEC * sr), dtype=np.float32))
            t += dur + GAP_SEC
        full = np.concatenate(chunks) if chunks else np.zeros(1, dtype=np.float32)
        sf.write(scene["out"], full, sr or 22050)
        # Filtrul de timbru scurtează audio (TEMPO); timpii frazelor se scalează la fel.
        ratio = apply_voice_filter(scene["out"])
        for tm in timings:
            tm["start"] = round(tm["start"] * ratio, 3)
            tm["end"] = round(tm["end"] * ratio, 3)
        duration = round(len(full) / (sr or 22050) * ratio, 3)
        with open(scene["timings"], "w", encoding="utf-8") as f:
            json.dump({"duration": duration, "phrases": timings}, f, ensure_ascii=False)
        print(f"   [{i}/{len(scenes)}] {os.path.basename(scene['out'])} "
              f"({duration:.1f}s, {len(timings)} fraze)")


if __name__ == "__main__":
    main()
