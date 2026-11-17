# miguelcock.github.io

Personal site of **Miguel Cock** — cybersecurity engineer and full-stack developer in Medellín.

Live at **https://miguelcock.github.io/**.

The site is bilingual: English at `/`, Spanish at `/es/`. Both versions are maintained; there is no
client-side translation or fallback.

## Stack

- [Astro 7](https://astro.build/) with static output
- TypeScript, `.astro` components, plain CSS and small vanilla scripts
- Self-hosted fonts via Fontsource (Inter + JetBrains Mono)
- `@astrojs/sitemap` for `sitemap-index.xml`
- GitHub Actions → GitHub Pages

No UI framework, CSS framework, analytics, cookies, or server runtime.

## Local development

```bash
npm install
npm run dev        # http://localhost:4321
```

Checks and a production build:

```bash
npm run check      # astro check
npm run build      # astro check && astro build → dist/
npm run preview    # serves dist/ at http://localhost:4321
npm run format     # Prettier + prettier-plugin-astro
```

Requires Node **>= 22.23.4** (Astro 7). The GitHub Action uses Node 24.

## Structure

```
src/
  components/        shared UI (Header, Footer, Terminal, ProjectCard, ...)
  components/pages/  full page bodies shared by the EN and ES routes
  content/blog/      Markdown posts: en/ and es/, paired via `translation`
  data/              profile.ts + projects.ts — the factual sources of truth
  i18n/              UI strings and terminal copy
  layouts/           BaseLayout (head, SEO, header/footer, view transitions)
  lib/blog.ts        blog queries, paths, date formatting
  pages/             file-based routes; Spanish pages under pages/es/
  scripts/site.ts    nav, reveals, copy buttons, Konami code
  styles/global.css  design tokens and all component styles
public/              favicon, robots.txt, og.png, og.svg (served as-is)
```

## Editing content

- **Projects:** `src/data/projects.ts`. Add one object with `{ en, es }` copy, stack, tags, repo and
  accent color. The project grid, filters and cards update automatically.
- **Profile, experience, education, skills:** `src/data/profile.ts`. Facts come from the private
  `MiguelCock/CV` repo; do not invent dates, metrics or roles.
- **UI labels / terminal:** `src/i18n/ui.ts`, `src/i18n/terminal.ts`.
- **Blog:** create the English post in `src/content/blog/en/<slug>.md` and the Spanish post in
  `src/content/blog/es/<slug-es>.md`. Set `translation` in each file to the other file's slug, e.g.
  `translation: corregir-gps-con-vision` ↔ `translation: correcting-gps-with-vision`. Use the same
  facts and structure in both. The schema is in `src/content.config.ts`.
- **Social image:** edit `public/og.svg` and regenerate the PNG:

  ```bash
  rsvg-convert -w 1200 -h 630 public/og.svg -o public/og.png
  ```

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml` (`withastro/action@v6` +
`actions/deploy-pages@v5`) and publishes `dist/` to GitHub Pages.

The repository must have **Settings → Pages → Source = GitHub Actions**. Without that, GitHub tries
to build the Astro project with Jekyll and the deploy fails.

Verify a deploy with:

```bash
gh run list --workflow=deploy.yml
gh api repos/MiguelCock/miguelcock.github.io/pages --jq '.build_type'
curl -I https://miguelcock.github.io/
```

## Design

Dark terminal aesthetic with game-dev accents: CRT scanlines, typed boot output, glitch hover,
scroll reveals, filterable project cards and an interactive shell. Motion is CSS-only where possible
and fully disabled under `prefers-reduced-motion`. Content remains visible without JavaScript.

The Konami code enables arcade mode. No sound, no tracking.

---

Content © Miguel Cock. The code is free to learn from; the personal copy and images are not
intended for reuse.
