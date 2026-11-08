# Case Study Template

Every project page follows this order. Sections map to `h2` headings inside
the MDX body; the title block (h1, status chip, period, stack, metrics,
links) is rendered by `CaseStudyLayout` from frontmatter — do not repeat it
in the MDX.

## Required frontmatter

See `portfolio/lib/schema.ts`. Minimum viable:

```yaml
---
title: "Project Name"
slug: "project-name"
summary: "One sentence — used as the meta description and tile outcome."
status: "Live"              # Live | In progress | Archived
category: ["Full-Stack"]    # Full-Stack | AI/ML | Mobile (pick all that apply)
featured: true              # true = shows in home bento
order: 1                    # lower = earlier; first featured gets large tile
stack: ["React", "Node.js"]
period: "2026"
links:
  demo: "https://…"
  repo: "https://github.com/…"
metrics: []                 # only MEASURED values — see content/metrics.md
cover: "/media/projects/…"
---
```

## Required section order (MDX body)

1. **Problem** — what was broken or missing, and for whom. No solution yet.
2. **What I built** — the system in plain terms: components, data flow,
   key decisions. First mention of stack specifics goes here.
3. **Architecture** — `<ArchitectureDiagram />` (inline SVG preferred;
   template in `components/case-study/ArchitectureDiagram.tsx`).
4. **A hard problem and my decision** — `<Callout variant="decision">`.
   One real technical trade-off, what you chose, and why. This is the
   section interviewers probe — be specific.
5. **Result** — what shipped, who uses it, honest outcomes. Only numbers
   with a `source` in `content/metrics.md`.
6. **Links** — already rendered from frontmatter `links`; no MDX section
   needed unless you want extra links inline.

## Available MDX components

| Component | Use |
|---|---|
| `<Callout variant="decision">` | Hard problem + decision (accent border) |
| `<Callout variant="note">` | General aside |
| `<ArchitectureDiagram svg={…} />` | Inline SVG diagram (token colors) |
| `<ArchitectureDiagram src="…" alt="…" caption="…" />` | Image diagram |
| `<VideoEmbed src="/media/clip.mp4" />` | Local clip — lazy, muted, no autoplay |
| `<VideoEmbed src="https://youtube.com/watch?v=…" provider="youtube" />` | Click-to-load embed |
| `<Figure src="…" alt="…" caption="…" />` | Captioned image (alt required) |
| `<MetricChart data={[{label, value}]} kind="bar" source="…" />` | Recharts chart + data-table fallback |

## Rules

- No bento tiles, cards, or grids inside case studies — editorial only.
- No metrics without a measured value + source (`content/metrics.md`).
- Every image needs real alt text; every diagram needs a caption.
- Draft files are `_`-prefixed (e.g. `_example.mdx`) — dev only.
