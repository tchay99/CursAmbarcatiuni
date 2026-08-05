#!/usr/bin/env python3
"""tts_batch.py — Sinteză vocală în lot (Piper ro_RO prin sherpa-onnx).

Utilizare: python3 tts_batch.py MANIFEST.json MODEL_DIR
MANIFEST.json: [{"text": "...", "out": "cale/fisier.wav"}, ...]
MODEL_DIR conține: ro_RO-mihai-medium.onnx, tokens.txt, espeak-ng-data/
"""
import json
import os
import sys

import sherpa_onnx
import soundfile as sf


def main() -> None:
    manifest_path, model_dir = sys.argv[1], sys.argv[2]
    with open(manifest_path, encoding="utf-8") as f:
        jobs = json.load(f)

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

    for i, job in enumerate(jobs, 1):
        audio = tts.generate(job["text"])
        sf.write(job["out"], audio.samples, audio.sample_rate)
        print(f"   [{i}/{len(jobs)}] {os.path.basename(job['out'])} "
              f"({len(audio.samples) / audio.sample_rate:.1f}s)")


if __name__ == "__main__":
    main()
