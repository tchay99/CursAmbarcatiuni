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
import sys

import numpy as np
import sherpa_onnx
import soundfile as sf

GAP_SEC = 0.42   # pauză între fraze — respirație naturală între idei
SPEED = 0.88     # <1 = vorbire mai lentă (length_scale invers în VITS)


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
        with open(scene["timings"], "w", encoding="utf-8") as f:
            json.dump({"duration": round(len(full) / (sr or 22050), 3), "phrases": timings}, f, ensure_ascii=False)
        print(f"   [{i}/{len(scenes)}] {os.path.basename(scene['out'])} "
              f"({len(full) / (sr or 22050):.1f}s, {len(timings)} fraze)")


if __name__ == "__main__":
    main()
