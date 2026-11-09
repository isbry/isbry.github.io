# isbry.com

My personal site. Not a portfolio, not a CV, just an honest look at who I am.

It's built around a Rubik's cube made of Lego plates, because I love both. Each face is a different side of me: platform engineer, AI explorer, learner, builder, personal life and writing. Scroll the page and the cube turns to the face of the section you're reading. Click a face and the page takes you there.

## Stack

Vite, React, Tailwind CSS and Framer Motion. The cube is plain CSS 3D.

The build prerenders the page to static HTML (`scripts/prerender.mjs`), so it loads fast, previews properly on LinkedIn and reads fine without JavaScript.

## Run locally

```bash
npm install
npm run dev
```

`npm run build` writes the static site to `dist/`.

## Content

- `src/data/facets.js`: the six sides of the cube, and where each one sits on it.
- `src/data/work.js`: the "Things I've built" section.
- `public/Brayan_Caicedo_CV.pdf`: the CV behind the download buttons.

## Deploy

Automatic on every push to `main` via GitHub Pages.
