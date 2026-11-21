# Portfolio — Abdou Nimaga

Portfolio personnel : **Développeur Full-Stack & DevOps**, Dakar.
En ligne : https://nims221.github.io/

## Ce qu'il y a dedans

- **Hero** avec réseau animé (canvas) et **terminal interactif** (`help`, `projects`, `open jaguar`, `sudo hire-me`…)
- **Palette de commandes** : `Ctrl + K` (ou `/`) pour naviguer, ouvrir un projet, copier l'email
- **9 projets** avec filtres et études de cas en fenêtre (deep link : `#projet-jaguar`)
- **Pipeline CI/CD animé** et labs DevOps open source
- Parcours, contenus LinkedIn, contact

## Stack

Site statique sans dépendance ni build : HTML, CSS, JavaScript vanilla.
Polices via Google Fonts (Space Grotesk, Inter, JetBrains Mono). Images en WebP.

Accessibilité : navigation clavier, `prefers-reduced-motion` respecté (animations coupées), contenus lisibles sans JS hors projets.

## Ajouter ou modifier un projet

Tout se passe dans [`projects.js`](projects.js) : copier un bloc, le compléter, déposer les captures dans `assets/img/` (WebP, ~1400 px de large ; capture mobile en 430 × 931 pour le mockup téléphone).

## Lancer en local

```bash
python3 -m http.server 8000
```

Puis ouvrir http://localhost:8000.

## Déploiement

GitHub Pages, depuis la branche `main` (racine du dépôt).
