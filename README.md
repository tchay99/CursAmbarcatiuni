# Curs Conducător de Ambarcațiune cu Motor — Mini-LMS

Un mini-LMS (Learning Management System) în limba română pentru pregătirea
examenului de **conducător de ambarcațiune cu motor pentru agrement**, construit
pe baza planului de studiu de 14 zile organizat în 4 module.

Aplicația rulează integral în browser — **fără server, fără build, fără
dependențe externe**. Progresul se salvează local (`localStorage`).

## Ce include

- **14 lecții „video"**, câte una pe zi, organizate în 4 module:
  1. Ambarcațiunea și motorul (zilele 1–4)
  2. Manevre și ancorare (zilele 5–7)
  3. Siguranță și prim ajutor (zilele 8–10)
  4. Navigație și reguli de drum (zilele 11–14)
- **Narațiune în limba română** — fiecare lecție se redă ca o succesiune de
  diapozitive sincronizate cu voce (Web Speech API, `ro-RO`), funcționând ca un
  clip video. Vizionarea integrală este urmărită și necesară pentru a continua.
- **Verificare de cunoștințe** la finalul fiecărei lecții. Prag: **75%**.
- **Reluare la eșec** — dacă pici verificarea, **trebuie să revizionezi**
  lecția înainte de a reîncerca, iar lecția următoare rămâne blocată.
- **Deblocare progresivă** — ziua N se deschide doar după promovarea zilei N-1.
- **Simulare de examen final** — grilă cu 20 de întrebări (echilibrate pe
  module), cronometru de 30 de minute, prag de promovare 70%. Se deblochează
  după promovarea tuturor celor 14 lecții.

## Cum se folosește

Deschide `index.html` într-un browser modern. Pentru cea mai bună experiență
(inclusiv vocea în română), servește folderul local:

```bash
# Python 3
python3 -m http.server 8000
# apoi deschide http://localhost:8000
```

> **Notă despre voce:** narațiunea folosește vocile de sinteză instalate în
> sistem/browser. Dacă lipsește o voce `ro-RO`, aplicația continuă automat pe
> bază de temporizare (diapozitivele avansează singure), astfel încât lecția
> curge chiar și fără voce românească instalată. Pe Chrome/Edge vocile Google
> `ro-RO` sunt de obicei disponibile online.

## Folosirea unor fișiere video reale (opțional)

Player-ul detectează automat fișiere video reale. Dacă pui un fișier
`videos/dayNN.mp4` (ex. `videos/day01.mp4` … `videos/day14.mp4`), lecția
respectivă va reda acel clip în locul diapozitivelor narate — cu tot cu
urmărirea vizionării integrale (nu se poate sări înainte peste porțiuni
nevizionate) înainte de deblocarea verificării.

Identificatorii lecțiilor sunt `day01` … `day14` (vezi `assets/js/content.js`).

## Structura proiectului

```
index.html                 – shell-ul aplicației
assets/css/styles.css      – stiluri
assets/js/content.js       – cele 14 lecții + banca de întrebări pentru examen
assets/js/player.js        – player-ul lecției (video MP4 sau diapozitive narate)
assets/js/quiz.js          – verificarea de cunoștințe + regula de reluare
assets/js/exam.js          – simularea examenului final (cronometrat, grilă)
assets/js/app.js           – navigare, progres, blocare/deblocare
videos/                    – (opțional) pune aici dayNN.mp4
```

## Personalizare

- **Conținutul lecțiilor** (diapozitive + narațiune) și **întrebările** se
  editează în `assets/js/content.js`.
- **Pragul verificărilor** se modifică prin `QUIZ_PASS` în `assets/js/quiz.js`.
- **Numărul de întrebări / timpul / pragul examenului** se modifică prin
  `EXAM_CONFIG` în `assets/js/content.js`.

## Disclaimer

Acesta este un **instrument de studiu neoficial**. Conținutul este orientativ și
simplificat pentru învățare. Consultă întotdeauna manualul oficial
(„Manualul conducătorului de ambarcațiune cu motor pentru agrement") și
legislația în vigoare pentru pregătirea examenului.
