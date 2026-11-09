# Phase 4 Review — pre-merge audit

Date: 2026-11-09 · Branch reviewed: `theme/extras` (tip of the Phase 4 stack)

## 1. Responsive & contrast

**Method:** code-level audit + production-server checks. True viewport
testing at 360/390/768/1280px in both themes still needs a real browser
pass — flagged below as a remaining manual check.

- All grids are fluid (`grid-cols-1` → `sm:`/`md:`/`lg:`); no fixed widths.
- Tap targets: `min-h-11` on buttons, nav links, filter buttons, form
  inputs, footer links, 404 links.
- Readable measure: `max-w-prose` on case studies and prose blocks.
- Long unbreakable strings: stack chips wrap (`flex-wrap`); emails/URLs
  are normal text, no `overflow-x` risks found.
- Contrast: every color pair uses token combinations already verified
  ≥4.5:1 in both themes (theme-spec pass). New components (MoveCallout,
  Credits, OffClockStrip, filters, 404) reuse only existing token pairs —
  no one-off colors introduced anywhere in Phase 4.
- **Manual check still needed:** eyeball `/`, `/projects`,
  `/projects/traffic-control`, `/nonexistent` at 360px in dark mode.

## 2. Lighthouse (mobile, production build `next start`)

| Page | Performance | Accessibility | LCP | CLS | TBT |
|---|---|---|---|---|---|
| `/` | **98** ✅ (≥90) | **100** ✅ (≥95) | **0.8s** ✅ (<2.5s) | **0** ✅ (<0.1) | 160ms |
| `/projects/traffic-control` | **100** ✅ | **100** ✅ | **0.9s** ✅ | **0** ✅ | 40ms |
| `/nonexistent` | n/a — Lighthouse refuses to audit 4xx pages | — | — | — | — |

Notes:
- Dev-server scores were meaningless (perf 50); all numbers above are
  from `npm run start` production build.
- The 404 page is a tiny static document — verified manually: 404 status,
  semantic landmarks, keyboard-focusable links, token colors.
- Recharts is `next/dynamic` `ssr:false` — confirmed it does not bloat
  other pages.

## 3. Reduced motion & keyboard

- Global `@media (prefers-reduced-motion: reduce)` collapses all
  animation/transition durations — covers the StatusTile pulse dot and
  MetricChart skeleton.
- No scroll animations, no motion-dependent content anywhere.
- Keyboard: all interactive elements are native `<a>`/`<button>`/form
  controls in logical DOM order; `aria-pressed` on filters; focus rings
  use `outline-accent`; skip-link pattern not present but landmarks
  (`header`/`main`/`footer`/`nav`) are correct.
- Contact form: focus moves to the `role="status"` region on success;
  honeypot is `tabIndex={-1}` + `aria-hidden`.

## 4. Personal details vs `content/personal-facts.md`

| Detail on site | Source | Match? |
|---|---|---|
| chess.com `rapid_19`, 979 Rapid | personal-facts.md | ✅ |
| Email `shahabdulsaboor208@gmail.com` | env `NEXT_PUBLIC_CONTACT_EMAIL` (user-provided) | ✅ public by design |
| LinkedIn URL | env `NEXT_PUBLIC_LINKEDIN_URL` (user-provided) | ✅ |
| GitHub `abdulsaboor190` + repo URL | env `NEXT_PUBLIC_GITHUB_URL` + site-config default | ✅ |
| Name, location, education, experience | copy.md / site-config / experience.ts | ✅ consistent |
| Reading/watching/shelf | personal-facts | ✅ renders nothing (all TODO) |

**Mismatches found:** none.

## 5. Decoration budget (max 3 per section)

| Section | Decorative elements | Over? |
|---|---|---|
| Hero | 0–1 (headline styling only) | ✅ |
| Bento strip | 1 (pulse dot) | ✅ |
| Featured projects | 0 (covers are content) | ✅ |
| Skills / Experience | 0 | ✅ |
| About | ≤1 (portrait placeholder; OffClockStrip hidden — only 1 fact tile) | ✅ |
| Contact | 0 | ✅ |
| Case studies | 1 (drop cap) + annotation badges (functional, not decoration) | ✅ |
| 404 | 1 (stalemate board, aria-hidden) | ✅ |

No section exceeds the budget.

## 6. Secrets audit

- `git grep` for token/key patterns across tracked files: **clean**.
- Git history `-S` search for `RESEND_API_KEY=`/`GITHUB_TOKEN=`: only
  `.env.example` placeholder lines — **no real secrets ever committed**.
- Page source (`/`, `/projects`, case study, 404): no `GITHUB_TOKEN`,
  `RESEND_API_KEY`, or key-shaped strings. Email/LinkedIn/GitHub URLs
  appear — **intentional**, they're `NEXT_PUBLIC_` contact info.
- `CONTACT_EMAIL`/`RESEND_API_KEY` are server-only env vars, read only in
  `app/api/contact/route.ts`.
- `.env.local` is gitignored (`git check-ignore` verified).

## 7. Automated checks

| Check | Result |
|---|---|
| `npm run check-links` | ✅ 0 errors, 0 warnings (fixed a template-literal false positive) |
| `npm run lint` | ✅ clean |
| `npm run typecheck` | ✅ clean |
| `npm run build` | ✅ all routes static/SSG except `/projects` (ƒ, searchParams) and `/api/contact` (ƒ) |

## Remaining TODOs (see also `docs/phase3-todos.md`)

- [ ] Real project details: extra context, MoveCallout decisions, metrics,
      demo/repo links for all 4 case studies
- [ ] `content/personal-facts.md`: reading, watching, shelf, opening/player —
      OffClockStrip stays hidden until ≥2 tiles have data
- [ ] Profile photo `public/media/profile-headshot.jpg`, `public/resume.pdf`
- [ ] `app/tokens-preview/` — delete before launch
- [ ] `site.targetRole`, LinkedIn/email now set via env ✅
- [ ] Resend domain verification for real email delivery
      (`onboarding@resend.dev` only delivers to your Resend account email)
- [ ] `GITHUB_TOKEN` for live GitHub tile (works without — shows
      "unavailable" message)
- [ ] Manual viewport pass at 360px dark mode (see §1)
- [ ] ShieldHer write-up once it has demo/repo
- [ ] Education GPA decision (3.06/4.00 — show or not)
