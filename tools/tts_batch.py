#!/usr/bin/env python3
"""tts_batch.py — Sinteză vocală pe fraze (Piper ro_RO prin sherpa-onnx).

Utilizare: python3 tts_batch.py MANIFEST.json MODEL_DIR

MANIFEST.json (per scenă):
  [{"phrases": ["fraza 1", "fraza 2", ...], "out": "scena.wav",
    "timings": "scena.json",
    "lead": 0.8,   # opțional: liniște înaintea primei fraze (implicit 0)
    "gap": 0.55,   # opțional: pauza dintre fraze (implicit GAP_SEC)
    "tail": 1.0},  # opțional: liniște după ultima frază (implicit 0)
   ...]

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

GAP_SEC = 0.22  # pauză între fraze


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
        gap = float(scene.get("gap", GAP_SEC))
        lead = float(scene.get("lead", 0.0))
        chunks, timings, t = [], [], lead
        if lead > 0:
            chunks.append(np.zeros(int(lead * 22050), dtype=np.float32))
        for phrase in scene["phrases"]:
            audio = tts.generate(phrase)
            sr = audio.sample_rate
            samples = np.asarray(audio.samples, dtype=np.float32)
            dur = len(samples) / sr
            # sfârșitul real al vorbirii (fără liniștea de final a sintezei),
            # pentru sincronizarea exactă a graficii cu vocea
            loud = np.flatnonzero(np.abs(samples) > 0.02 * (np.max(np.abs(samples)) or 1.0))
            speech_end = (loud[-1] / sr) if len(loud) else dur
            timings.append({"text": phrase, "start": round(t, 3), "end": round(t + dur, 3),
                            "speechEnd": round(t + speech_end, 3)})
            chunks.append(samples)
            chunks.append(np.zeros(int(gap * sr), dtype=np.float32))
            t += dur + gap
        tail = float(scene.get("tail", 0.0))
        if tail > 0:
            chunks.append(np.zeros(int(tail * (sr or 22050)), dtype=np.float32))
        full = np.concatenate(chunks) if chunks else np.zeros(1, dtype=np.float32)
        sf.write(scene["out"], full, sr or 22050)
        with open(scene["timings"], "w", encoding="utf-8") as f:
            json.dump({"duration": round(len(full) / (sr or 22050), 3), "phrases": timings}, f, ensure_ascii=False)
        print(f"   [{i}/{len(scenes)}] {os.path.basename(scene['out'])} "
              f"({len(full) / (sr or 22050):.1f}s, {len(timings)} fraze)")


if __name__ == "__main__":
    main()
