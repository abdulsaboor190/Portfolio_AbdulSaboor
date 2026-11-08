# Abdul Saboor — Portfolio

Personal developer portfolio for Abdul Saboor — final-year CS student at
FAST-NUCES Karachi (class of 2027), full-stack developer and applied AI
builder.

Design/positioning docs live one level up in `../docs/` and `../content/`
(design tokens, positioning, copy, wireframes, metrics). This app consumes
them.

## Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript** (strict)
- **Tailwind CSS v4** (CSS-first config via `@import "tailwindcss"`)
- **next-themes** for light/dark theme switching
- **clsx + tailwind-merge** via the `cn()` helper in `lib/utils.ts`
- ESLint (`eslint-config-next`) + Prettier (`prettier-plugin-tailwindcss`)

Later phases will add: Motion, Recharts/SVG charts, MDX case studies,
React Hook Form + Zod + Resend, GitHub GraphQL API. None are installed yet.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (`eslint-config-next`) |
| `npm run format` | Prettier write across the repo |
| `npm run typecheck` | `tsc --noEmit` |

## Folder structure

```
portfolio/
├── app/                  # App Router routes (layout, page) — src-less layout
├── components/
│   ├── hero/             # Hero section components
│   ├── bento/            # Bento grid tiles (scanning sections only)
│   ├── case-study/       # Case study page components (editorial)
│   ├── ui/               # Shared primitives (buttons, chips, badges)
│   └── shared/           # Cross-cutting (theme provider, etc.)
├── content/projects/     # Project content files (MD/MDX later)
├── lib/                  # Utilities (cn, data helpers)
├── public/media/         # Optimized images/video served to the site
├── styles/globals.css    # Tailwind import + design tokens (Phase 1)
├── docs → ../docs/       # Design tokens, wireframes, positioning
└── content → ../content/ # Approved copy + metrics
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in keys as features are wired
(Resend, GitHub token). No secrets are committed.

## Deployment

Deploys to **Vercel**: import the repo, framework preset "Next.js", defaults
work. Env vars get set in the Vercel dashboard. No database — all content
is static/MDX.
