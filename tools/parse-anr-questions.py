#!/usr/bin/env python3
"""Parsează PDF-urile de antrenament (recapitulare simulator ANR) în JSON.

Folosește pdftotext -layout:
  - întrebarea: paragraf care începe cu "N. " (poate continua pe rândurile
    următoare, fără linie goală);
  - fiecare opțiune: paragraf propriu (rândurile înfășurate rămân în paragraf);
  - marcajul corect: fie "   corect" inline la finalul rândului opțiunii
    (≥2 spații înainte), fie paragraf de sine stătător "corect" imediat după
    opțiune;
  - "Fără răspuns." închide întrebarea.
"""
import json
import re
import subprocess
from collections import Counter
from pathlib import Path

SRC = Path(__file__).parent / "intrebari"
CATS = ["legislatie", "prim-ajutor", "marinarie", "manevra", "navigatie", "rnd", "colreg"]

HDR_PAT = re.compile(
    r"(Simulator Examen ANR|Salut, |^\s*Ieșire\s*$|Înapoi la antrenamente|^\s*Recapitulare\s*$|"
    r"^\s*\d+\s*/\s*\d+ corecte\s*$|Greșite: |Simulator orientativ|^\s*\d+\s*$)"
)
IMG_PAT = re.compile(r"(figur[aă]|imagine|desen(ul|at)|schiț[aă]|din schem[aă])", re.I)
INLINE_CORRECT = re.compile(r"\s{2,}corect\s*$")


def parse_category(cat: str):
    text = subprocess.run(
        ["pdftotext", "-layout", str(SRC / f"{cat}.pdf"), "-"],
        capture_output=True, text=True,
    ).stdout.replace("\f", "\n")

    # curăță anteturile și normalizează
    lines = []
    for raw in text.splitlines():
        if HDR_PAT.search(raw):
            continue
        lines.append(raw.rstrip())

    questions, q, para = [], None, []
    state = None  # None | "question" | "options"

    def close_para(mark_correct=False):
        nonlocal para
        if not para:
            return
        joined = re.sub(r"\s+", " ", " ".join(para)).strip()
        para = []
        if not joined or q is None:
            return
        if joined == "corect":
            if q["options"]:
                q["answer"] = len(q["options"]) - 1
            return
        if joined in ("greșit", "Fără răspuns.", "Fără răspuns"):
            return
        # marcajul "corect" lipit cu un singur spațiu de finalul opțiunii
        if joined.endswith(" corect"):
            joined = joined[: -len(" corect")].rstrip()
            mark_correct = True
        if joined.endswith(" greșit"):
            joined = joined[: -len(" greșit")].rstrip()
        q["options"].append(joined)
        if mark_correct:
            q["answer"] = len(q["options"]) - 1

    for raw in lines:
        line = raw.strip()
        m = re.match(r"^(\d{1,3})\.\s+(.+)$", line)
        # început de întrebare: numerotarea continuă (n+1) sau o sesiune nouă (1)
        if m and (q is None or int(m.group(1)) in (q["n"] + 1, 1)) and (q is None or int(m.group(1)) != q["n"]):
            close_para()
            if q:
                questions.append(q)
            q = {"n": int(m.group(1)), "q": m.group(2).strip(), "options": [], "answer": None}
            state = "question"
            continue
        if not line:
            if state == "question":
                state = "options"
            else:
                close_para()
            continue
        if INLINE_CORRECT.search(raw) and line != "corect":
            cleaned = INLINE_CORRECT.sub("", raw).strip()
            if state == "question":
                # întrebare cu marcaj pe același rând? improbabil; tratează ca opțiune
                state = "options"
            para.append(cleaned)
            close_para(mark_correct=True)
            continue
        if state == "question":
            q["q"] += " " + line
        else:
            para.append(line)

    close_para()
    if q:
        questions.append(q)

    good, dropped = [], Counter()
    for qq in questions:
        if IMG_PAT.search(qq["q"]) or any(IMG_PAT.search(o) for o in qq["options"]):
            dropped["img"] += 1
            continue
        if len(qq["options"]) < 2:
            dropped["few_options"] += 1
            continue
        if qq["answer"] is None or qq["answer"] >= len(qq["options"]):
            dropped["no_answer"] += 1
            continue
        tr = str.maketrans("şţŞŢ", "șțȘȚ")
        good.append({"cat": cat, "q": qq["q"].translate(tr),
                     "options": [o.translate(tr) for o in qq["options"]], "answer": qq["answer"]})
    return good, dropped, len(questions)


all_q, seen = [], set()
for cat in CATS:
    good, dropped, total = parse_category(cat)
    dedup = 0
    for g in good:
        key = re.sub(r"\W+", "", (g["q"] + "".join(sorted(g["options"]))).lower())
        if key in seen:
            dedup += 1
            continue
        seen.add(key)
        all_q.append(g)
    print(f"{cat:12s}: {total:3d} brute → {len(good):3d} valide, {dedup} duplicate "
          f"(drop: {dict(dropped)})")

out = Path(__file__).parent / "questions.json"
out.write_text(json.dumps(all_q, ensure_ascii=False, indent=1))
print(f"\nTOTAL unic: {len(all_q)} → {out}")
print("Opțiuni/întrebare:", dict(Counter(len(q['options']) for q in all_q)))
print("Poziția răspunsului corect:", dict(Counter(q['answer'] for q in all_q)))
for q in (all_q[0], all_q[len(all_q)//2], all_q[-1]):
    print("\n---", q["cat"])
    print(q["q"][:130])
    for i, o in enumerate(q["options"]):
        print(f"  {i}. {o[:110]}{' ✓' if i == q['answer'] else ''}")
