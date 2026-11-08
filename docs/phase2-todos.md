# Phase 2 TODOs — everything outstanding after the home-page build

Collected from code comments and content docs. Grouped by what unblocks it.

## Content gaps (you provide, I wire)

- [ ] **Target role** — set `site.targetRole` in `portfolio/lib/site-config.ts`
      (source TODO: `content/copy.md` §1 `[TARGET ROLE]`)
- [ ] **Confirmed skills list** — trim `portfolio/lib/skills.ts`; every item
      is currently the unconfirmed proposal from `content/copy.md` §3
- [ ] **ShieldHer facts** — description, status, stack (`content/copy.md` §2);
      gates its featured-tile eligibility per `docs/project-shortlist.md`
- [ ] **Internship specifics** — stack used, one result, team context
      (`content/copy.md` §4 TODOs; renders dev-only in Experience)
- [ ] **GPA decision** — include `3.06/4.00`? Set `education.gpa` in
      `portfolio/lib/experience.ts` or leave `null`
- [ ] **Languages taught / course code** — optional Experience TODOs

## Assets (capture per `assets-source/ASSET_CHECKLIST.md`)

- [ ] Profile headshot → `public/media/profile-headshot.jpg`
      (swap placeholder in `components/sections/About.tsx`)
- [ ] `public/resume.pdf` → fixes Download Resume 404
      (source: `assets-source/resume/resume-cv-2026.pdf`)
- [ ] Project cover images → set `cover`/`coverAlt` in
      `portfolio/lib/projects-preview.ts` (dev placeholder active until then)
- [ ] Architecture sketches for case studies (Phase 3)

## Env vars / accounts

- [ ] `NEXT_PUBLIC_CONTACT_EMAIL` — footer + contact section email link
- [ ] `NEXT_PUBLIC_LINKEDIN_URL` — footer + contact + hero LinkedIn link
- [ ] `NEXT_PUBLIC_GITHUB_URL` — optional override (defaults to repo URL)
- [ ] `NEXT_PUBLIC_SITE_URL` — SEO/sitemap (Phase 3+)
- [ ] Set all of the above in `.env.local` AND Vercel project settings

## Phase 3 — case studies (MDX)

- [ ] `/projects` index route ("View all projects" link currently 404s)
- [ ] `/projects/[slug]` case-study routes for the 6 projects
- [ ] Replace `lib/projects-preview.ts` with MDX-driven data
- [ ] FSCM + FAST Past Papers move to the editorial "More projects" list
- [ ] Metrics strip on case studies — only values measured per
      `content/metrics.md` truth rules (traffic benchmark still unrun)

## Phase 4 — interactivity

- [ ] Contact form: React Hook Form + Zod + Resend
      (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`)
- [ ] GitHub GraphQL activity tile (`GITHUB_TOKEN`) — replace static
      `GithubTile` TODO
- [ ] Motion animations (none added yet, per plan)
- [ ] Recharts/SVG charts if metrics warrant

## Pre-launch

- [ ] Delete `app/tokens-preview/` (temporary verification page)
- [ ] Run `docs/deployment.md` checklist (real-phone test, both themes,
      preview deploy on a test branch)
- [ ] Confirm no secrets in git history
- [ ] Decide CV download button visibility
