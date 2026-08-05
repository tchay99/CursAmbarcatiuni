#!/usr/bin/env python3
"""tabla_music.py — Muzică de fundal veselă pentru cântecelul tablei înmulțirii.

Utilizare: python3 tabla_music.py OUT.wav SECONDS KEY_INDEX

Sintetizează (numpy, fără sample-uri) o piesă ritmată, prietenoasă cu copiii:
  - arpegii „ciupite” (triunghi cu armonice, anvelopă de pluck) pe optimi;
  - bas moale pe pătrimi 1 și 3;
  - „hi-hat” discret (zgomot alb filtrat scurt) pe contratimpi.
Progresie I–vi–IV–V; tonalitatea se rotește după KEY_INDEX (capitol), ca fiecare
capitol să sune ușor diferit. Nivelul e gândit pentru mixare sub voce.
"""
import sys

import numpy as np
import soundfile as sf

SR = 22050
BPM = 96
BEAT = 60.0 / BPM


def note_freq(semitone_from_a3: float) -> float:
    return 220.0 * 2 ** (semitone_from_a3 / 12.0)


def pluck(freq: float, dur: float, vol: float) -> np.ndarray:
    t = np.arange(int(dur * SR)) / SR
    env = np.exp(-t * 5.5) * np.minimum(1.0, t * 200)
    w = (np.sin(2 * np.pi * freq * t)
         + 0.45 * np.sin(2 * np.pi * 2 * freq * t)
         + 0.18 * np.sin(2 * np.pi * 3 * freq * t))
    return (vol * env * w).astype(np.float32)


def bass(freq: float, dur: float, vol: float) -> np.ndarray:
    t = np.arange(int(dur * SR)) / SR
    env = np.exp(-t * 3.0) * np.minimum(1.0, t * 120)
    w = np.sin(2 * np.pi * freq * t) + 0.3 * np.sin(2 * np.pi * 2 * freq * t)
    return (vol * env * w).astype(np.float32)


def hat(dur: float, vol: float, rng: np.random.Generator) -> np.ndarray:
    n = int(dur * SR)
    t = np.arange(n) / SR
    noise = rng.standard_normal(n).astype(np.float32)
    noise[1:] -= 0.85 * noise[:-1]  # accentuează frecvențele înalte
    return (vol * np.exp(-t * 60) * noise).astype(np.float32)


def add(buf: np.ndarray, start_sec: float, chunk: np.ndarray) -> None:
    i = int(start_sec * SR)
    j = min(len(buf), i + len(chunk))
    if j > i:
        buf[i:j] += chunk[: j - i]


def main() -> None:
    out, seconds, key_idx = sys.argv[1], float(sys.argv[2]), int(sys.argv[3])
    rng = np.random.default_rng(1000 + key_idx)
    root = 3 + (key_idx * 2) % 7  # C, D, E, F, G... rotit pe capitole
    # progresie I–vi–IV–V (grade relative la fundamentală, în semitonuri)
    chords = [(0, 4, 7), (-3, 0, 4), (5, 9, 12), (7, 11, 14)]

    buf = np.zeros(int((seconds + 2) * SR), dtype=np.float32)
    bar = 4 * BEAT
    n_bars = int(np.ceil(seconds / bar)) + 1
    for b in range(n_bars):
        t0 = b * bar
        ch = chords[b % 4]
        # bas: pătrimile 1 și 3
        add(buf, t0, bass(note_freq(root + ch[0] - 24), BEAT * 1.6, 0.30))
        add(buf, t0 + 2 * BEAT, bass(note_freq(root + ch[2] - 24), BEAT * 1.6, 0.24))
        # arpegiu pe optimi: 1-3-5-8 sus și înapoi
        seq = [ch[0], ch[1], ch[2], ch[0] + 12, ch[2], ch[1], ch[0], ch[1]]
        for k, st in enumerate(seq):
            add(buf, t0 + k * BEAT / 2, pluck(note_freq(root + st), BEAT * 0.9, 0.16))
        # clopoțel din două în două măsuri
        if b % 2 == 1:
            add(buf, t0 + 3 * BEAT, pluck(note_freq(root + ch[1] + 12), BEAT * 1.4, 0.10))
        # hi-hat pe contratimpi
        for k in range(4):
            add(buf, t0 + k * BEAT + BEAT / 2, hat(0.09, 0.05, rng))

    buf = buf[: int(seconds * SR)]
    # fade-in scurt și fade-out la final
    fi = int(0.6 * SR)
    buf[:fi] *= np.linspace(0, 1, fi, dtype=np.float32)
    fo = int(min(2.5, seconds / 3) * SR)
    buf[-fo:] *= np.linspace(1, 0, fo, dtype=np.float32)
    peak = float(np.max(np.abs(buf))) or 1.0
    sf.write(out, (buf / peak * 0.55).astype(np.float32), SR)
    print(f"   muzică: {out} ({seconds:.1f}s, cheia {key_idx})")


if __name__ == "__main__":
    main()
