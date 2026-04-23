# Moataz Samara · Portfolio

Modular, bilingual (EN/HE) React + TypeScript portfolio with a dynamic CMS engine. Built with Vite.

## Stack
- **React 18** + **TypeScript** (strict)
- **Vite 5** — dev server & build
- **react-router-dom v6** — SPA routing + project detail pages
- **Zero CSS frameworks** — all styling via inline styles + design tokens

## Project Structure
```
src/
├── types/          # Strict TS interfaces (Project, TimelineItem, Translation…)
├── data/           # CMS source of truth
│   ├── constants.ts     # Colors, contact info, font URLs
│   ├── translations.ts  # EN/HE UI strings
│   ├── projects.ts      # All projects — slug, bilingual title/desc, detail blocks
│   ├── timeline.ts      # Work + education timeline
│   ├── services.ts      # Services
│   └── skills.ts        # Skills, languages, stats
├── hooks/          # useWindowWidth, useInView, useScrollY, useTypewriter
├── utils/          # Animation helper fns (up, side, scale, wipeUp)
├── components/
│   ├── UI/         # Primitives: StarCanvas, Nebula, Glass, Tag, SplitTitle…
│   └── Portfolio/  # Sections: Navigation, Hero, About, Services, Work, Timeline…
└── pages/
    ├── Home.tsx         # Full home page assembly
    ├── ProjectDetail.tsx # Dynamic CMS template — renders from projects.ts
    └── NotFound.tsx     # 404
```

## Routes
| Path | Component |
|------|-----------|
| `/` | Home (all sections) |
| `/work/:slug` | ProjectDetail (CMS template) |
| `*` | NotFound |

## Quick Start
```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # dist/
```

## Deployment (Vercel)
```bash
vercel --prod
```
Set **Framework Preset → Vite** in the Vercel dashboard. No extra config needed.

## Adding a Project (CMS)
Edit `src/data/projects.ts`. Each project needs:
- `slug` — URL path (`/work/my-slug`)
- `title` / `shortDesc` — `{ en: "...", he: "..." }`
- `detail.overview` / `challenge` / `solution` / `outcome` — optional narrative blocks
- `detail.gallery` — array of image URLs (replace TODO placeholders)

## Language / Arabic Note
The site supports **EN** and **HE** only. Arabic has been removed as a UI language.
Moataz's personal language cards still reference Arabic (his native language) as biographical fact.
To remove that too, edit `LANGUAGES` in `src/data/skills.ts`.

## TODO
- [ ] Replace hero `TODO` placeholders in `projects.ts` with real image URLs
- [ ] Wire Contact form to Formspree or EmailJS
- [ ] Add `public/og-image.png` for social previews
- [ ] Consider `localStorage` for lang persistence across sessions (1-line change in App.tsx)
