# Folder pentru fișiere video (opțional)

Pune aici fișiere video reale pentru a înlocui lecțiile narate cu diapozitive.

- Nume fișier așteptat: `day01.mp4`, `day02.mp4`, … `day14.mp4`
- Player-ul le detectează automat (prin `HEAD` request) și le redă în locul
  diapozitivelor, păstrând urmărirea vizionării integrale înainte de deblocarea
  verificării de cunoștințe.

Dacă nu există niciun fișier aici, aplicația funcționează complet, folosind
lecțiile narate în limba română (Web Speech API).
