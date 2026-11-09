# Phase 3 TODOs — content & placeholders

Everything below is a `TODO` or placeholder in the case studies, facts
files, or site config. Grouped by project. For each: what to supply and
where it goes.

---

## Traffic Control (`content/projects/traffic-control.mdx`)

- [ ] **Extra details** — paste into the MDX TODO: how density is computed
      from detections, PPO state/action/reward design, training setup,
      SUMO scenarios, dashboard features, challenges faced.
- [ ] **MoveCallout decision** — record in `content/personal-facts.md`
      (decision / rejected alternative / outcome / mark), then fill the
      commented block in the MDX.
- [ ] **Benchmark numbers** — all rows in `content/metrics.md` are TODO.
      Need: waiting time baseline vs PPO, queue length, throughput,
      runs per condition, scenario names, seeds, training episodes.
      Until then the Result section stays qualitative.
- [ ] **Demo video** — drop a SUMO clip at
      `public/media/traffic-control/demo.mp4` (+ poster), then uncomment
      the `VideoEmbed` block.
- [ ] **Demo/repo links** — add real URLs to frontmatter `links` once they
      exist.
- [ ] **Verify** — role "Solo developer", stack list, period "2025" are
      assumptions.

## TicketFlow (`content/projects/ticketflow.mdx`)

- [ ] **Extra details** — why built, real status workflow states and
      allowed transitions, DB tables, how role permissions work,
      deployment setup, challenges.
- [ ] **MoveCallout decision** — record in personal-facts.md, fill MDX.
- [ ] **Verify status workflow SVG** —
      `public/media/ticketflow/status-workflow.svg` uses the *example*
      states from metrics.md (Open→Assigned→In Progress→Resolved→Closed);
      confirm against actual code and fix the SVG if wrong.
- [ ] **Metrics** — endpoints, tables, roles, transitions counts are TODO
      in metrics.md.
- [ ] **Demo + credentials** — once deployed, add the "Try it yourself"
      `Callout` (template is commented in the MDX) with demo-only accounts.
- [ ] **Verify** — role "Solo developer", period "2025" are assumptions.

## Scholr (`content/projects/scholr.mdx`)

- [ ] **Extra details** — how real-time messaging works (Socket.io vs
      WebSockets?), number of services, repo link, challenges, why built.
- [ ] **MoveCallout decision** — record in personal-facts.md, fill MDX.
- [ ] **Screenshots** — none in `public/media/scholr/`; page is text-only.
      When you have them, add `Figure` blocks (commented template in MDX);
      a CSS-only phone-frame component is not yet built.
- [ ] **Confirm architecture details** — messaging tech, service split,
      and which database Scholr uses are placeholders in
      `public/media/scholr/architecture.svg`.
- [ ] **Metrics** — services count, platform targets are TODO.
- [ ] **Verify** — role and period are TODO in frontmatter.

## FSCM (`content/projects/fscm.mdx`)

- [ ] **Everything** — no description/details were ever provided beyond
      copy.md's feature list. Need: motivation, entities modeled, role
      dashboards detail, API surface, deployment, challenges.
- [ ] **MoveCallout decision** — record in personal-facts.md, fill MDX.
- [ ] **Metrics** — entities, endpoints, dashboards counts are TODO.
- [ ] **role + period** — literally `TODO` in frontmatter; supply real
      values.
- [ ] **ShieldHer** — still unfeatured (no demo/repo per shortlist rule);
      needs description/status/stack before it can be written up.

## Site-wide

- [ ] **Profile photo** — `public/media/profile-headshot.jpg` referenced by
      `About.tsx` placeholder; supply the image.
- [ ] **Resume** — `public/resume.pdf` missing; footer links to it.
- [ ] **Env values** — `NEXT_PUBLIC_CONTACT_EMAIL`,
      `NEXT_PUBLIC_LINKEDIN_URL`, `NEXT_PUBLIC_SITE_URL`,
      `NEXT_PUBLIC_GITHUB_URL` (has a working default).
- [ ] **Target role** — `site-config.ts` `targetRole: null`; supply the
      role you're looking for.
- [ ] **Skills list** — `lib/skills.ts` is provisional (project-derived);
      confirm what's interview-defensible.
- [ ] **Education GPA** — decide whether to show 3.06/4.00.
- [ ] **Tagline** — theme-spec offers three options; pick one or none.
- [ ] **personal-facts.md** — chess, reading, watching, shelf, all
      per-project decisions and roles are TODO.
- [ ] **`app/tokens-preview/`** — delete before launch.
- [ ] **Lighthouse** — never successfully run on this machine; do a real
      run before launch.
