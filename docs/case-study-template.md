# Case Study Template

Every project page follows this order. The title block (display-face h1,
status chip, period, stack tags, metrics strip) and the end credits block
are rendered by `CaseStudyLayout` from frontmatter — do not repeat them in
the MDX body.

## Required frontmatter

See `portfolio/lib/schema.ts`. Minimum viable:

```yaml
---
title: "Project Name"
slug: "project-name"
summary: "One sentence — meta description and tile outcome."
status: "Live"              # Live | In progress | Archived
category: ["Full-Stack"]    # Full-Stack | AI/ML | Mobile
featured: true              # true = shows in home bento
order: 1                    # lower = earlier; first featured = large tile
stack: ["React", "Node.js"] # shown as "Cast" in credits
role: "Solo developer"      # optional — credits "Role" row
tools: ["Next.js", "MDX"]   # optional — credits "Tools" row
period: "2026"
links:
  demo: "https://…"
  repo: "https://github.com/…"
metrics: []                 # only MEASURED values — content/metrics.md
cover: "/media/projects/…"
---
```

## Required section order (MDX body)

1. **Problem** — what was broken or missing, and for whom. No solution yet.
2. **What I built** — the system in plain terms: components, data flow,
   key decisions. First stack specifics go here.
3. **Architecture** — `<ArchitectureDiagram />` (inline SVG preferred;
   template in `components/case-study/ArchitectureDiagram.tsx`).
4. **A hard problem and my decision** — `<MoveCallout mark="…" … />`.
   The decision, the rejected alternative, the outcome, and the
   annotation mark (`!` / `!!` / `?!` / `?` — legend in
   `docs/theme-spec.md` §6). This is the section interviewers probe.
5. **Result** — what shipped, who uses it, honest outcomes. Only numbers
   with a `source` in `content/metrics.md`.
6. **Links** — rendered automatically in the Credits block from
   frontmatter `links`; no MDX section needed.

## Available MDX components

| Component | Use |
|---|---|
| `<MoveCallout mark="!" decision="…" alternative="…" outcome="…" />` | The signature decision callout (theme-accent badge) |
| `<Callout>` | General note aside |
| `<ArchitectureDiagram svg={…} />` | Inline SVG diagram (token colors) |
| `<ArchitectureDiagram src="…" alt="…" caption="…" />` | Image diagram (alt required) |
| `<VideoEmbed src="/media/clip.mp4" />` | Local clip — lazy, muted, no autoplay |
| `<VideoEmbed src="https://youtube.com/watch?v=…" provider="youtube" />` | Click-to-load embed |
| `<Figure src="…" alt="…" caption="…" />` | Captioned image (alt required) |
| `<MetricChart data={[{label, value}]} kind="bar" source="…" />` | Recharts chart + data-table fallback |

## Rules

- No bento tiles, cards, or grids inside case studies — editorial only.
- No metrics without a measured value + source (`content/metrics.md`).
- Every image needs real alt text; every diagram needs a caption.
- The drop cap on the first paragraph is automatic (`.dropcap-first`) —
  it's the case study's single decorative element; don't add more.
- Draft files are `_`-prefixed (e.g. `_example.mdx`) — dev only.
