# Mariia Monakhova — Portfolio

A modern, animated single-page portfolio built with **Bun + TypeScript** (zero
runtime dependencies — just Bun's native bundler & dev server).

[🌍 View live](https://dreamy-alpaca-e3e371.netlify.app/)

## Tech

- **Bun** — package manager, dev server (HMR) and bundler
- **TypeScript** — typed UI logic, carousel and scroll animations
- **Vanilla CSS** — milk-white / black theme with dusty-pink + lavender
  accents, glassmorphism, animated sparkles and scroll-reveal
- **Font Awesome** + Google Fonts (Sora / Space Grotesk)

## Develop

```bash
bun install      # install dev deps (typescript, @types/bun)
bun run dev      # start dev server with hot reload  → http://localhost:3000
bun run build    # bundle + minify to ./dist (and copy images)
bun run preview  # build then serve ./dist
bun run typecheck
```

## Editing content

All copy lives in **`src/data.ts`** — skills, projects, carousel slides and
social links. Edit those arrays and the page re-renders.

### Sports photos

The carousel uses `images/sports/tennis-1..3.jpg` and `yoga-1..6.jpg`. To add or
swap a photo, drop it in `images/sports/` and update the matching entry in
`src/data.ts`. If a file is missing, that slide gracefully shows a gradient +
icon placeholder.

### Theme colors

The whole palette lives in CSS variables at the top of `src/styles.css`
(`--bg`, `--ink`, `--pink`, `--lavender`, `--grad`, …) — tweak those to restyle.

## Structure

```
index.html        # single-page markup (sections rendered from data.ts)
src/main.ts       # rendering, carousel, scroll-reveal, nav
src/data.ts       # editable content (skills, projects, sports, socials)
src/styles.css    # theme + animations
images/           # project & personal photos
```

Coded by Mariia Monakhova · open-sourced.
