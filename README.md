# Curs Conducător de Ambarcațiune cu Motor — Mini-LMS

Un mini-LMS (Learning Management System) în limba română pentru pregătirea
examenului de **conducător de ambarcațiune cu motor pentru agrement**, construit
pe baza planului de studiu de 14 zile organizat în 4 module.

## Ce include

- **14 lecții video MP4** (în `videos/`), câte una pe zi, narate de
  „Cpt. Paul Dicu" (voce neuronală Piper `ro_RO-mihai-medium`), organizate în
  4 module:
  1. Ambarcațiunea și motorul (zilele 1–4)
  2. Manevre și ancorare (zilele 5–7)
  3. Siguranță și prim ajutor (zilele 8–10)
  4. Navigație și reguli de drum (zilele 11–14)
- **Secțiunea 🎧 Lecții — mod audiobook**: toate lecțiile sunt libere și pot
  fi ascultate în orice ordine; cu „Redare continuă" activată, lecțiile curg
  automat una după alta, ca un audiobook.
- **Secțiunea 📝 Teste — progresie separată**: testul zilei se deblochează
  doar după ascultarea integrală a lecției respective, iar testul N doar
  după promovarea testului N-1 (prag **75%**): întrebări din lecție +
  2 întrebări reale din setul de antrenament ANR al categoriei corespunzătoare.
- **Reluare la eșec** — dacă pici testul, trebuie să reasculți lecția
  înainte de a reîncerca.
- **Simulare de examen final** — 24 de întrebări grilă din banca reală de
  antrenament ANR (7 categorii), cronometru 30 min, prag 75%; se deblochează
  după promovarea tuturor celor 14 teste.
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
assets/js/content.js       – cele 14 lecții + configurația examenului
assets/js/questions-anr.js – banca de întrebări reale de antrenament ANR (568)
assets/js/player.js        – player video (MP4/WebM; fallback diapozitive narate)
assets/js/quiz.js          – verificarea de cunoștințe + regula de reluare
assets/js/exam.js          – simularea examenului final
assets/js/app.js           – navigare (Lecții/Teste), audiobook, progres, deblocări
videos/day01..14.mp4       – videourile lecțiilor (generate, comise în repo)
server/server.js           – server cu autentificare (Node pur, zero dependențe)
deploy/                    – systemd unit + Caddyfile
tools/                     – generatorul de videouri (Playwright + Piper TTS + ffmpeg)
DEPLOY.md                  – ghid de publicare pe Oracle Cloud Free Tier
```

## Personalizare

- Conținutul lecțiilor și întrebările: `assets/js/content.js`
  (după modificare, regenerează videourile — vezi `tools/README.md`).
- Pragul verificărilor: `QUIZ_PASS` în `assets/js/quiz.js`.
- Configurația examenului: `EXAM_CONFIG` în `assets/js/content.js`.

## Disclaimer

Acesta este un **instrument de studiu neoficial**. Conținutul este orientativ și
simplificat pentru învățare. Consultă întotdeauna manualul oficial
(„Manualul conducătorului de ambarcațiune cu motor pentru agrement") și
legislația în vigoare pentru pregătirea examenului.
