# Curs Conducător de Ambarcațiune cu Motor — Mini-LMS

Un mini-LMS (Learning Management System) în limba română pentru pregătirea
examenului de **conducător de ambarcațiune cu motor pentru agrement**:
un curs video de 10 zile narat „cu tâlc" de Cpt. Paul Dicu + un modul de
antrenament cu întrebările oficiale de examen.

## Ce include

- **🎬 Curs video de 10 zile** (în `videos/`), narat de „Cpt. Paul Dicu"
  (voce neuronală Piper `ro_RO-mihai-medium`), în stil de povestitor — cu
  anecdote, mnemotehnici și vorbe de marinar — organizat în 4 module:
  1. Ambarcațiunea și motorul (zilele 1–2)
  2. Marinărie și manevre (zilele 3–5)
  3. Siguranță și comunicații (zilele 6–8)
  4. Navigație și reguli de drum (zilele 9–10)

  Lecțiile sunt **de sine stătătoare**: se ascultă liber, în orice ordine,
  iar cu „Redare continuă" curg automat una după alta, ca un audiobook
  (~10 minute pe zi, ~100 de minute în total).
- **🎯 Antrenament examen** — modul separat: teste de câte **20 de întrebări**
  extrase aleator din banca oficială de antrenament ANR (568 de întrebări,
  7 categorii), cu opțiuni amestecate, prag 75% și **istoric de scoruri**
  (număr de teste, medie, cel mai bun scor).
- **⏱️ Simulare de examen** — 24 de întrebări echilibrate pe categorii,
  cronometru 30 min, prag 75%.
- **🚩 Semne și semnalizare** — colecție vizuală completă (panourile RND de pe
  Dunăre, balizajul IALA, luminile și semnele navelor pe categorii, cele 26 de
  pavilioane ale Codului Internațional) + **teste de semne** cu imagini, în
  stilul chestionarelor auto.
- **Autentificare și provizionare utilizatori** (opțional, pentru publicare):
  server Node **fără dependențe npm** cu link privat de înregistrare, aprobare
  din panou de admin și acces protejat la tot conținutul.

Progresul lecțiilor se salvează în browser (localStorage).

## Rulare locală (fără autentificare)

```bash
python3 -m http.server 8000
# deschide http://localhost:8000
```

## Rulare cu autentificare (modul „publicat")

```bash
# 1. Creează administratorul
node server/server.js --create-admin adresa-ta@email.com ParolaSigura123

# 2. Pornește serverul
node server/server.js          # implicit port 3000
```

Apoi:
- `/login` — autentificare;
- `/register?token=...` — înregistrare DOAR prin linkul privat (afișat la
  pornire sau în panoul de admin);
- `/admin` — panoul de administrare: aprobi/respingi/ștergi utilizatori și
  poți regenera linkul de înregistrare.

Conturile noi intră „în așteptare" și nu au acces la curs până le aprobi.
Un cont respins pierde accesul imediat, chiar dacă avea sesiune activă.

## Publicare pe VPS (Oracle Cloud Free Tier)

Vezi ghidul pas-cu-pas din **[DEPLOY.md](DEPLOY.md)** — creare VM, firewall,
systemd, Caddy (HTTPS automat cu domeniu), provizionarea cursanților.

## Structura proiectului

```
index.html                 – aplicația (shell)
assets/js/content.js       – cele 10 lecții video + configurații antrenament/examen
assets/js/questions-anr.js – banca de întrebări reale de antrenament ANR (568)
assets/js/player.js        – player video (MP4/WebM; fallback diapozitive narate)
assets/js/practice.js      – testele de antrenament (20 întrebări aleatoare)
assets/js/signs.js         – colecția de semne (SVG) + testul de semne
assets/js/exam.js          – simularea examenului final
assets/js/app.js           – navigare (Curs video / Antrenament), audiobook, progres
videos/day01..10.mp4       – videourile lecțiilor (generate, comise în repo)
server/server.js           – server cu autentificare (Node pur, zero dependențe)
deploy/                    – systemd unit + Caddyfile
tools/                     – generatorul de videouri (Playwright + Piper TTS + ffmpeg)
DEPLOY.md                  – ghid de publicare pe Oracle Cloud Free Tier
```

## Personalizare

- Conținutul lecțiilor și întrebările: `assets/js/content.js`
  (după modificare, regenerează videourile — vezi `tools/README.md`).
- Testele de antrenament: `PRACTICE_CONFIG` în `assets/js/content.js`.
- Configurația examenului: `EXAM_CONFIG` în `assets/js/content.js`.

## Disclaimer

Acesta este un **instrument de studiu neoficial**. Conținutul este orientativ și
simplificat pentru învățare. Consultă întotdeauna manualul oficial
(„Manualul conducătorului de ambarcațiune cu motor pentru agrement") și
legislația în vigoare pentru pregătirea examenului.
