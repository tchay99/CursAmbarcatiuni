#!/usr/bin/env python3
"""tabla_music.py — Beat lo-fi discret pentru videoclipurile „Tabla înmulțirii”.

Utilizare: python3 tabla_music.py OUT.wav SECONDS KEY_INDEX

Sintetizează (numpy, fără sample-uri) un beat lo-fi calm, potrivit pentru
concentrare la 9–10 ani (nu clopoței de grădiniță): tobe moi (kick, snare din
zgomot, hi-hat cu swing), bas rotund și acorduri susținute de „pian electric”
ușor dezacordate, cu tremolo. Progresie i–VI–III–VII (minor); tonalitatea se
rotește după KEY_INDEX (capitol). Nivel gândit pentru mixare sub voce.
"""
import sys

import numpy as np
import soundfile as sf

SR = 22050
BPM = 82
BEAT = 60.0 / BPM


def freq(semitone_from_a2: float) -> float:
    return 110.0 * 2 ** (semitone_from_a2 / 12.0)


def kick(vol: float) -> np.ndarray:
    t = np.arange(int(0.28 * SR)) / SR
    f = 95 * np.exp(-t * 22) + 44
    return (vol * np.exp(-t * 15) * np.sin(2 * np.pi * np.cumsum(f) / SR)).astype(np.float32)


def snare(vol: float, rng: np.random.Generator) -> np.ndarray:
    n = int(0.22 * SR)
    t = np.arange(n) / SR
    noise = rng.standard_normal(n).astype(np.float32)
    noise[1:] -= 0.55 * noise[:-1]
    body = 0.5 * np.sin(2 * np.pi * 176 * t)
    return (vol * np.exp(-t * 26) * (noise * 0.7 + body)).astype(np.float32)


def hat(vol: float, rng: np.random.Generator, open_: bool = False) -> np.ndarray:
    n = int((0.16 if open_ else 0.05) * SR)
    t = np.arange(n) / SR
    noise = rng.standard_normal(n).astype(np.float32)
    noise[1:] -= 0.92 * noise[:-1]
    return (vol * np.exp(-t * (26 if open_ else 90)) * noise).astype(np.float32)


def bass(f: float, dur: float, vol: float) -> np.ndarray:
    t = np.arange(int(dur * SR)) / SR
    env = np.minimum(1.0, t * 60) * np.exp(-t * 2.2)
    w = np.sin(2 * np.pi * f * t) + 0.25 * np.sin(2 * np.pi * 2 * f * t)
    return (vol * env * np.tanh(1.6 * w)).astype(np.float32)


def epiano(freqs, dur: float, vol: float) -> np.ndarray:
    """Acord susținut, voci ușor dezacordate + tremolo lent — sound lo-fi."""
    t = np.arange(int(dur * SR)) / SR
    env = np.minimum(1.0, t * 30) * np.exp(-t * 1.1)
    trem = 1.0 + 0.18 * np.sin(2 * np.pi * 4.3 * t)
    out = np.zeros_like(t, dtype=np.float32)
    for f in freqs:
        for det in (-1.5, 1.5):
            fd = f * 2 ** (det / 1200)
            out += (np.sin(2 * np.pi * fd * t) + 0.18 * np.sin(2 * np.pi * 2 * fd * t)).astype(np.float32)
    return (vol / (2 * len(freqs)) * env * trem * out).astype(np.float32)


def add(buf: np.ndarray, start_sec: float, chunk: np.ndarray) -> None:
    i = int(start_sec * SR)
    j = min(len(buf), i + len(chunk))
    if j > i:
        buf[i:j] += chunk[: j - i]


def main() -> None:
    out, seconds, key_idx = sys.argv[1], float(sys.argv[2]), int(sys.argv[3])
    rng = np.random.default_rng(1000 + key_idx)
    root = (key_idx * 5) % 12 - 3  # rotește tonalitatea pe capitole
    # progresie i–VI–III–VII (în semitonuri față de fundamentală; i = minor)
    chords = [
        (0, 3, 7), (-4, 0, 3), (3, 7, 10), (-2, 2, 5),
    ]
    swing = 0.06 * BEAT

    buf = np.zeros(int((seconds + 2) * SR), dtype=np.float32)
    bar = 4 * BEAT
    n_bars = int(np.ceil(seconds / bar)) + 1
    for b in range(n_bars):
        t0 = b * bar
        ch = chords[b % 4]
        # tobe: kick 1 și 3 (+ sincopă rar), snare 2 și 4, hat pe optimi cu swing
        add(buf, t0, kick(0.5))
        add(buf, t0 + 2 * BEAT, kick(0.42))
        if b % 4 == 3:
            add(buf, t0 + 2.75 * BEAT, kick(0.3))
        add(buf, t0 + 1 * BEAT, snare(0.32, rng))
        add(buf, t0 + 3 * BEAT, snare(0.32, rng))
        for k in range(8):
            tt = t0 + k * BEAT / 2 + (swing if k % 2 == 1 else 0)
            add(buf, tt, hat(0.10 if k % 2 == 0 else 0.06, rng, open_=(k == 7 and b % 2 == 1)))
        # bas: fundamentala pe 1, cvinta scurt pe „și” de 3
        add(buf, t0, bass(freq(root + ch[0] - 12), 1.7 * BEAT, 0.5))
        add(buf, t0 + 2.5 * BEAT, bass(freq(root + ch[2] - 12), 0.9 * BEAT, 0.34))
        # acord de e-piano susținut pe măsură
        add(buf, t0 + 0.02, epiano([freq(root + s) for s in ch], 3.6 * BEAT, 0.5))

    buf = buf[: int(seconds * SR)]
    fi = int(0.8 * SR)
    buf[:fi] *= np.linspace(0, 1, fi, dtype=np.float32)
    fo = int(min(3.0, seconds / 3) * SR)
    buf[-fo:] *= np.linspace(1, 0, fo, dtype=np.float32)
    peak = float(np.max(np.abs(buf))) or 1.0
    sf.write(out, (buf / peak * 0.55).astype(np.float32), SR)
    print(f"   muzică lo-fi: {out} ({seconds:.1f}s, cheia {key_idx})")


if __name__ == "__main__":
    main()
