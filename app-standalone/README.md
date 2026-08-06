# Tabla înmulțirii — aplicație web (PWA)

Aplicație pentru memorarea tablei înmulțirii (clasa a 3-a), în română:

- **10 capitole video** (înmulțirea cu 1 … cu 10, ~60–75s fiecare): vocea
  narează fiecare operație, lista înmulțirilor se completează rând cu rând pe
  ecran, iar la final rămâne afișată integral, de repetat cu voce tare;
- **quiz drag-and-drop** după fiecare capitol (tragi rezultatele pe operațiile
  lor) — funcționează cu degetul pe telefon/tabletă (Pointer Events);
- **instalabilă ca aplicație** (PWA) și **funcțională offline** după prima
  vizită — service worker-ul descarcă tot conținutul (~13 MB).

## Publicare (GitHub Pages)

**Settings → Pages → Build and deployment → Deploy from a branch →
Branch: `main`, folder `/ (root)` → Save.** După ~1 minut aplicația e la
`https://<utilizator>.github.io/<repo>/`.

## Instalare pe telefon

- **iPhone/iPad**: deschide adresa în **Safari** → butonul **Partajare** (□↑)
  → **Adaugă pe ecranul principal**. Aplicația apare cu iconița ei și rulează
  pe tot ecranul, inclusiv offline.
- **Android**: deschide în Chrome → meniul ⋮ → **Adaugă pe ecranul de start**
  (sau accepți bannerul „Instalează aplicația”).

## Conținutul se regenerează

Videoclipurile sunt produse programatic (voce Piper `ro_RO-mihai-medium`,
grafică SVG, beat lo-fi sintetizat) de generatorul din repo-ul
[CursAmbarcatiuni](https://github.com/tchay99/CursAmbarcatiuni)
(`tools/generate-tabla.mjs`). Modifici conținutul acolo, regenerezi MP4-urile
și le copiezi în `videos/`.
