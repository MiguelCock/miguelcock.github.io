# AGENTS.md

## What this repo is

Personal site of Miguel Cock, published at **https://miguelcock.github.io/** as a GitHub user site
(the repo name must stay `miguelcock.github.io`). It is an **Astro 7** static site: English at `/`,
Spanish at `/es/`. `main` is the only deploy branch — every push builds and deploys through
`.github/workflows/deploy.yml` (GitHub Actions → Pages). No Jekyll, no Ruby, no server runtime.

## Commands

```bash
npm install            # first checkout / after dependency changes
npm run dev            # http://localhost:4321
npm run check          # astro check (TypeScript + .astro)
npm run build          # astro check && astro build → dist/
npm run preview        # serve dist/ at http://localhost:4321
npm run format         # Prettier + prettier-plugin-astro
```

Required order before pushing: `npm run format` (if edited) → `npm run check` → `npm run build`.
There is no unit-test suite — do not invent one. Verify routes and both languages with
`npm run preview`.

## Deploy

- Push to `main` → Actions → Pages. There is no manual build artifact and no PR preview.
- Pages **must** use Source = **GitHub Actions**; check with
  `gh api repos/MiguelCock/miguelcock.github.io/pages --jq .build_type` → `workflow`. If it is
  switched to "Deploy from a branch", Jekyll tries to build this Astro repo and fails.
- Deploy logs are in Actions: `gh run list --workflow=deploy.yml`, `gh run watch <id>`. The
  `pages/builds` API is not the deploy log after the Actions switch.
- `site` is `https://miguelcock.github.io`; **never set `base`** — a user site serves from the root.
  A custom domain would require updating `site` and adding `public/CNAME`.
- CI uses Node 24 (`withastro/action@v6`); local Node must be **>= 22.23.4** (Astro 7).

## Structure

- `src/pages/` — file-based routes. English at the root, Spanish under `src/pages/es/`.
  Localized slugs: `/about/` ↔ `/es/sobre-mi/`, `/projects/` ↔ `/es/proyectos/`,
  `/blog/` ↔ `/es/blog/`. Blog slugs may also be localized.
- `src/components/pages/` — full page bodies shared by thin EN/ES route files. Page components render
  `BaseLayout` themselves; route files only pass `lang`.
- `src/data/profile.ts` — experience, education, skills, certifications, contact.
- `src/data/projects.ts` — single source of project facts (stack, links, `{ en, es }` copy, images).
- `src/content/blog/{en,es}/` — Markdown posts. Pair them with the `translation` front-matter field
  pointing at the other language's slug. Both languages are mandatory; a missing pair is an i18n bug.
- `src/i18n/ui.ts` — nav/footer/common labels; `src/i18n/terminal.ts` — shell commands and output.
- `src/assets/` — images that go through Astro optimization; `public/` — served verbatim (favicon,
  robots.txt, og.png, og.svg).
- `src/styles/global.css` — design tokens and all component styles; component styles are not scoped.

## Content truth

- Author facts live in the private `MiguelCock/CV` repo (`profile/*.md`), readable with `gh` when
  authenticated. Never publish a link to that repo.
- Verified: Miguel Angel Cock Cano, Medellín; cybersecurity engineer + full-stack developer at
  Exfil Security (US, remote) since Jan 2025; EAFIT BSc Systems Engineering (2020–2025), Software
  Development specialization (2026), MSc in progress (2026–2027); 4U contract with Icesi
  (Sep–Nov 2026); Spanish native, English B2.
- Contact: **mcockc@outlook.com**, LinkedIn `miguel-angel-cock-cano-50b88b243`, GitHub `MiguelCock`.
  Do not add a phone number or a CV PDF unless the user supplies one.
- Project copy comes from each repo's README (4U, TestTracker, yun, FunctionalC3, lua54.c3l,
  flecsC3, Lua Space, wgpu_in_odin). Never invent metrics, users, stars, or dates.
- `MiguelCock/DnD-AI` is **not public** (404): do not link it. The Inventiva 2024-1 award is verified
  in the CV and may be mentioned without a repo link.
- 4U screenshots come from `4u/docs/admin-guide/images/en/` (own project). They live in
  `src/assets/projects/4u/`; don't hotlink raw GitHub URLs.
- `public/og.png` is generated from `public/og.svg`. If you edit the SVG, regenerate it with:
  `rsvg-convert -w 1200 -h 630 public/og.svg -o public/og.png`.

## Conventions & gotchas

- Design is intentionally **dark terminal + game-dev**: monospace display type, phosphor accents,
  scanlines/glitch/pixel details, an interactive shell, and project cards with terminal chrome. Keep
  it. Do not swap in Tailwind, a UI kit, or an animation library; use CSS + small vanilla scripts.
- Every animation must be disabled or reduced under `prefers-reduced-motion: reduce`. Never hide
  content behind a JS-only reveal — `.no-js` content must stay visible.
- The layout uses Astro view transitions (`ClientRouter`). Component scripts must attach on
  `astro:page-load`, not just `DOMContentLoaded`, or they stop working after navigation. Guard with a
  `data-ready` flag to avoid duplicate listeners.
- `ProjectCard` renders an image when the project has one, otherwise a generated terminal
  placeholder. Keep both at the same 16/10 aspect ratio so the grid stays even.
- No SSR, API routes, auth, or POST forms — GitHub Pages is static. Contact is `mailto:` / LinkedIn.
  Build-time endpoints (RSS/sitemap) are fine.
- `dist/`, `.astro/`, `node_modules/`, `.env*` are generated/ignored. Commit `package-lock.json`;
  don't add a second lockfile. Use npm in CI.
- The original Jekyll site (`_config.yml`, `Gemfile`, `_posts/`, Minima) was removed in the Astro
  migration. Do not reintroduce Ruby/Jekyll files.
- Adding a page: create the shared page body in `src/components/pages/`, add the EN and ES route
  files, pass the correct `alternatePath`, and add it to `Header.astro` if it belongs in the nav.
- Adding a post: create both language files, set reciprocal `translation` slugs and `pubDate`, then
  run `npm run build` to catch schema or route errors.

## Verification

A green `npm run build` plus a preview pass through `/`, `/es/`, both project pages, both blog
indexes, one post pair, and the 404 is the expected gate before pushing.
