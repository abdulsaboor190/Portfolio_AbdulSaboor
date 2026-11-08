# Wireframes — Home + Case Study

Low-fidelity ASCII wireframes. No colors or fonts specified — tokens live
in `docs/design-tokens.md`. Annotations use:

- **[E]** = editorial section (reading)
- **[B]** = bento section (scanning)
- **[D]** = dashboard detail (chips, badges, status)

---

## 1. HOME — MOBILE (360px)

```
┌─────────────────────────────┐
│ ≡  Abdul Saboor      [theme]│  [E] nav — logo left, menu + theme toggle
├─────────────────────────────┤
│                             │
│  Abdul Saboor               │  [E] HERO
│  I build full-stack         │
│  products that think        │
│  with AI.                   │
│                             │
│  [Get in touch]  [Projects] │
│                             │
├─────────────────────────────┤
│ ┌───────────┐ ┌───────────┐ │  [B] HERO BENTO STRIP
│ │ ● Live    │ │ Interests │ │  collapses to 1 column, 2 tiles stacked
│ │ Building… │ │ React · AI│ │  [D] status chip inside tile 1
│ └───────────┘ └───────────┘ │
│ ┌─────────────────────────┐ │
│ │ GH Activity  [D sparkline]│ │  GitHub tile, 3rd in stack
│ └─────────────────────────┘ │
├─────────────────────────────┤
│ FEATURED PROJECTS      [B]  │
│ ┌─────────────────────────┐ │
│ │ Traffic Control    [Live]│ │  largest tile first
│ │ outcome line            │ │  [D] status chip top-right
│ │ stack badges            │ │  [D] tech badges bottom
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │ TicketFlow        [Live]│ │
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │ Scholr          [Live]  │ │
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │ ShieldHer   [In progress]│ │  [D] in-progress chip
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │ More: FSCM · Past Papers │ │  [E] editorial link list —
│ └─────────────────────────┘ │  NOT bento tiles
├─────────────────────────────┤
│ SKILLS                 [E]  │  grouped lists:
│ Languages   TS · Py · SQL   │  Languages / Frontend /
│ Frontend    React · Next.js │  Backend / Data / AI-ML / Tools
│ Backend     Node · REST · PG│
│ AI/ML       YOLO · PPO·SUMO │
├─────────────────────────────┤
│ EXPERIENCE            [E]   │
│ ● Full-Stack Intern         │
│   A-Nets Cyber Solution     │
│   Jun–Aug 2026              │
│ ● Lab Demonstrator          │
│   FAST-NUCES · 50+ students │
├─────────────────────────────┤
│ ABOUT                 [E]   │  ~80 words, first person
│ …                           │
├─────────────────────────────┤
│ CONTACT               [E]   │
│ Let's build something.      │
│ [Name] [Email] [Message]    │  form
│ [Send message]              │
├─────────────────────────────┤
│ © 2026 Abdul Saboor         │  [E] footer
│ GitHub · LinkedIn · Email   │
└─────────────────────────────┘
```

Mobile notes:

- All bento grids collapse to a single column; tile order = reading order
  (strongest project first, per positioning).
- Hero bento strip becomes a vertical stack of 2–3 small tiles.
- Dashboard details ([D]) survive mobile: status chips and tech badges are
  the scannable anchors.

---

## 2. HOME — DESKTOP (1280px)

```
┌──────────────────────────────────────────────────────────────────┐
│ Abdul Saboor                              [nav]  [theme toggle]  │ [E]
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Abdul Saboor                            ┌───────────────────┐ │
│   I build full-stack                      │ ● Live            │ │
│   products that think                     │ Currently: Shield │ │ [B]
│   with AI.                                │ Her (in progress) │ │ hero strip
│                                           ├───────────────────┤ │
│   [Get in touch]   [View projects]        │ Interests         │ │
│                                           │ React · Next · AI │ │
│   Final-year CS, FAST-NUCES '27           ├───────────────────┤ │
│   Karachi                                 │ GitHub activity   │ │ [D]
│                                           │ [mini bar chart]  │ │
│                                           └───────────────────┘ │
├──────────────────────────────────────────────────────────────────┤
│ FEATURED PROJECTS                                            [B] │
│ ┌───────────────────────────────┐ ┌───────────────────────────┐ │
│ │                               │ │ TicketFlow           [Live]│ │
│ │   Traffic Control        [Live]│ ├───────────────────────────┤ │
│ │   (2×1 large tile)            │ │ Scholr              [Live] │ │
│ │   outcome · stack · link      │ ├───────────────────────────┤ │
│ │                               │ │ ShieldHer     [In progress]│ │
│ │                               │ └───────────────────────────┘ │
│ └───────────────────────────────┘                               │
│ ┌───────────────────────────────────────────────────────────────┐│
│ │ More projects: FSCM · FAST Past Papers →                        ││ [E]
│ └───────────────────────────────────────────────────────────────┘│
├──────────────────────────────────────────────────────────────────┤
│ SKILLS                                                        [E] │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│ │Languages │ │ Frontend │ │ Backend  │ │ Data     │ │ AI/ML    │ │
│ │ TS·Py·SQL│ │React·Next│ │Node·REST │ │PostgreSQL│ │YOLO·PPO  │ │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘ │SUMO·FastAPI│
│                                                    └──────────┘ │
├──────────────────────────────────────────────────────────────────┤
│ EXPERIENCE                                                   [E]  │
│ ┌─────────────────────────────┐ ┌─────────────────────────────┐  │
│ │ Full-Stack Intern           │ │ Lab Demonstrator            │  │
│ │ A-Nets Cyber Solution       │ │ FAST-NUCES                  │  │
│ │ Jun–Aug 2026                │ │ Aug–Dec 2025 · 50+ students │  │
│ └─────────────────────────────┘ └─────────────────────────────┘  │
├──────────────────────────────────────────────────────────────────┤
│ ABOUT                                                        [E]  │
│ Two-column text: paragraph left, portrait/secondary panel right   │
├──────────────────────────────────────────────────────────────────┤
│ CONTACT                                                      [E]  │
│ Centered: headline · 3-field form · submit                       │
├──────────────────────────────────────────────────────────────────┤
│ © 2026 Abdul Saboor   GitHub · LinkedIn · Email                  │ [E]
└──────────────────────────────────────────────────────────────────┘
```

### Featured-projects grid spec (12-col, desktop)

| Tile | Col span | Row span | Content |
|---|---|---|---|
| Traffic Control | 7 | 2 | Large feature tile: title, outcome line, stack badges, status chip, link |
| TicketFlow | 5 | 1 | Medium: title, one-line outcome, badges |
| Scholr | 5 | 1 | Medium |
| ShieldHer | 5 | 1 | Medium + `In progress` chip |

Row 1: `[7×2]` `[5×1]` · Row 2: `[7×2 cont.]` `[5×1]` · Row 3: `[5×1]`
— one large tile, three medium tiles, per bento rules (one accent tile
max per row, varied spans, no nested cards).

Editorial exceptions:

- Skills uses a **5-column grouped list layout**, not bento tiles — it's
  a reading section with scannable group labels.
- Experience uses **two equal editorial cards** (bordered, not bento) —
  reading order matters here.
- "More projects" is a single editorial link row — FSCM and Past Papers
  deliberately stay out of the bento per positioning.

---

## 3. CASE STUDY — MOBILE & DESKTOP

Single-column editorial layout on **both** breakpoints. Max content width
~720px, centered. No bento anywhere — case studies are for reading.

### Mobile (360px)

```
┌─────────────────────────────┐
│ ← Back to projects          │
├─────────────────────────────┤
│ Traffic Control             │  [E] TITLE BLOCK
│ AI-Powered Adaptive Traffic │
│ Control System              │
│ [Live] [Featured]           │  [D] status + role chips
│                             │
│ ┌─────────────────────────┐ │
│ │ METRICS STRIP  [D]      │ │  3–4 key numbers, mono
│ │ 42s │ 380 veh/h │ 30 runs│ │  values, hairline dividers
│ └─────────────────────────┘ │
├─────────────────────────────┤
│ THE PROBLEM          [E]    │
│ paragraph…                   │
│                             │
│ WHAT I BUILT         [E]    │
│ paragraph…                   │
│                             │
│ ┌─────────────────────────┐ │
│ │ ARCHITECTURE          │ │
│ │ [diagram placeholder] │ │  [D] mono labels on diagram
│ └─────────────────────────┘ │
│                             │
│ THE HARD PART        [E]    │
│ paragraph…                   │
│                             │
│ THE RESULT            [E]    │
│ paragraph…                   │
│                             │
│ Stack: [badges]             │  [D]
│ [View project] [Source]     │
├─────────────────────────────┤
│ ← All projects               │
└─────────────────────────────┘
```

### Desktop (1280px)

```
┌──────────────────────────────────────────────────────────────────┐
│ Abdul Saboor / Projects / Traffic Control                    [E]│
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│         Traffic Control                                          │
│         AI-Powered Adaptive Traffic Control System               │
│         [Live] [Featured] · React · FastAPI · SUMO                │
│                                                                  │
│   ┌──────────────────────────────────────────────────────────┐   │
│   │ METRICS STRIP                                      [D]   │   │
│   │  42 s wait   │  380 veh/h   │  30 runs   │  3 scenarios  │   │
│   └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│   THE PROBLEM                                             [E]    │
│   ~65ch column, paragraph…                                       │
│                                                                  │
│   WHAT I BUILT                                           [E]    │
│   paragraph…                                                     │
│                                                                  │
│   ┌──────────────────────────────────────────────────────────┐   │
│   │              ARCHITECTURE DIAGRAM                  [D]   │   │
│   │        YOLOv8 → PPO agent → SUMO → dashboard               │   │
│   └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│   THE HARD PART                                           [E]    │
│   paragraph…                                                     │
│                                                                  │
│   THE RESULT                                              [E]    │
│   paragraph…                                                     │
│                                                                  │
│   Stack: [React] [FastAPI] [YOLOv8] [PPO] [SUMO]            [D]  │
│   [View project]  [Source code]                                   │
│                                                                  │
│   ← All projects                                                  │
└──────────────────────────────────────────────────────────────────┘
```

Case study rules:

- **[E] everything is editorial** — single column, generous leading,
  section headings (h2) for Problem / What I Built / Hard Part / Result.
- **[D] dashboard details only**: status chips in the title block,
  metrics strip, tech badges, mono labels inside the architecture
  diagram. Nothing else.
- Metrics strip reads from `content/metrics.md` values only — no numbers
  that aren't measured (truth rules apply).
- Architecture diagram is a placeholder here; rendered as an SVG/PNG
  from `assets-source/` sketches in Phase 2.

---

## 4. Interaction States to Design Later

Design pass needed for each of these before build:

| State | Where it applies | Notes |
|---|---|---|
| Hover | Bento tiles, buttons, links, nav | Border-color shift per bento rules; no scale/shadow lift |
| Focus | All interactive elements | 2px accent ring, 2px offset (per token sheet); must be visible on both themes |
| Loading | Case study page (MDX), contact form submit, GitHub activity tile | Skeleton or spinner? Decide — skeleton preferred for tiles |
| Empty | GitHub activity (new account/no data), projects filter if added, contact form errors | Empty-state copy needed |
| Error | Contact form send failure, 404 page, failed metric/chart load | Error copy already drafted in `content/copy.md` §6 |
| Active/pressed | Buttons, nav links | Subtle darken of accent |
| Disabled | Form submit while sending | `Sending…` label already drafted |
| Reduced motion | All hover/transition states | Disable transforms; instant or fade-only transitions |

Also decide later:

- Theme toggle transition (instant vs 200ms fade)
- Mobile nav: hamburger drawer vs full-screen overlay
- Scroll-reveal animations on editorial sections (Motion) — which
  sections get them, and the reduced-motion fallback
