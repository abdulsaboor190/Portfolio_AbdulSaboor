# Design Tokens — Abdul Saboor Portfolio

Single source of truth for colors, type, spacing, and bento rules.
All values are WCAG-checked where marked. Ratios below were computed with the
WCAG 2.1 relative-luminance formula; "AA body" = 4.5:1, "AA large/UI" = 3:1.

---

## 1. Accent Color

| Candidate | Hex | Reason |
|---|---|---|
| Burnt orange (recommended) | `#C2410C` | Warm, editorial, and uncommon in dev portfolios — reads as confident without being loud. |
| Deep teal | `#0F766E` | Cooler alternative; pairs well with a grotesque heading instead of a serif. |
| Crimson | `#BE123C` | High-contrast on light backgrounds, dramatic; feels more "brand" than "engineer". |

**Recommendation: burnt orange.** It sits between the warmth of the off-white
paper background and the warmth of a serif heading (Fraunces), and its hue
family scales cleanly into a lighter dark-mode variant.

Note: a single hex cannot pass 4.5:1 as text on *both* near-black and
off-white (they need opposite luminance ends). The accent is therefore
theme-dependent — same hue family, two values:

- Light theme: `#C2410C` — 5.18:1 on white, 4.85:1 on `#FAF7F2` (AA body ✓)
- Dark theme: `#F97316` — 7.02:1 on `#0C0B09`, 6.67:1 on `#14120F` (AA body ✓)

Both also pass 3:1 for borders/focus rings and large text on their surfaces.

---

## 2. Palettes

### Light theme

| Token | Hex | Usage |
|---|---|---|
| `--color-bg` | `#FAF7F2` | Page background (warm paper) |
| `--color-surface` | `#FFFFFF` | Cards, tiles, panels |
| `--color-surface-raised` | `#F1EDE4` | Nested/inset areas, hover fills |
| `--color-border` | `#E3DED4` | Decorative hairlines (see §3 note) |
| `--color-border-strong` | `#B8B1A4` | Interactive borders, inputs |
| `--color-text-primary` | `#191814` | Headings, body |
| `--color-text-secondary` | `#57534A` | Supporting text, descriptions |
| `--color-text-muted` | `#6B665A` | Captions, metadata |
| `--color-accent` | `#C2410C` | Links, highlights, active states |
| `--color-accent-hover` | `#9A3412` | Hover state |
| `--color-accent-foreground` | `#FFFFFF` | Text on accent fills |
| `--color-live` | `#15803D` | Status: live / shipped |
| `--color-in-progress` | `#B45309` | Status: in progress |
| `--color-archived` | `#6B665A` | Status: archived / paused |
| `--color-error` | `#B91C1C` | Errors, destructive |

### Dark theme

| Token | Hex | Usage |
|---|---|---|
| `--color-bg` | `#0C0B09` | Page background (near-black, warm) |
| `--color-surface` | `#14120F` | Cards, tiles, panels |
| `--color-surface-raised` | `#1C1915` | Nested/inset areas, hover fills |
| `--color-border` | `#2A2620` | Decorative hairlines |
| `--color-border-strong` | `#4A443B` | Interactive borders, inputs |
| `--color-text-primary` | `#F5F1E8` | Headings, body |
| `--color-text-secondary` | `#B5AEA1` | Supporting text, descriptions |
| `--color-text-muted` | `#8B8474` | Captions, metadata |
| `--color-accent` | `#F97316` | Links, highlights, active states |
| `--color-accent-hover` | `#FB923C` | Hover state |
| `--color-accent-foreground` | `#1A1206` | Text on accent fills |
| `--color-live` | `#4ADE80` | Status: live / shipped |
| `--color-in-progress` | `#FBBF24` | Status: in progress |
| `--color-archived` | `#8B8474` | Status: archived / paused |
| `--color-error` | `#F87171` | Errors, destructive |

---

## 3. Contrast Check

### Text on backgrounds (AA body = 4.5:1)

| Pair | Ratio | Result |
|---|---|---|
| Light `text-primary` / `bg` | 16.62 | PASS |
| Light `text-primary` / `surface` | 17.77 | PASS |
| Light `text-secondary` / `bg` | 7.17 | PASS |
| Light `text-secondary` / `surface` | 7.66 | PASS |
| Light `text-muted` / `bg` | 5.35 | PASS |
| Light `text-muted` / `surface` | 5.72 | PASS |
| Dark `text-primary` / `bg` | 17.45 | PASS |
| Dark `text-primary` / `surface` | 16.59 | PASS |
| Dark `text-secondary` / `bg` | 8.93 | PASS |
| Dark `text-secondary` / `surface` | 8.49 | PASS |
| Dark `text-muted` / `bg` | 5.29 | PASS |
| Dark `text-muted` / `surface` | 5.03 | PASS |
| Light `accent-foreground` / `accent` | 5.18 | PASS |
| Dark `accent-foreground` / `accent` | 6.61 | PASS |
| Dark `accent-foreground` / `accent-hover` | ~8.9 | PASS |

### Accent as text (AA body)

| Pair | Ratio | Result |
|---|---|---|
| Light `accent` / `bg` | 4.85 | PASS |
| Light `accent` / `surface` | 5.18 | PASS |
| Dark `accent` / `bg` | 7.02 | PASS |
| Dark `accent` / `surface` | 6.67 | PASS |
| Light `accent-hover` / `bg` | 7.35 | PASS |
| Dark `accent-hover` / `bg` | ~9.5 | PASS |

### Status colors as text/dots

| Pair | Ratio | Result |
|---|---|---|
| Light `live` / `bg` · `surface` | 4.69 · 5.02 | PASS |
| Light `in-progress` / `bg` · `surface` | 4.70 · 5.02 | PASS |
| Light `archived` / `bg` · `surface` | 5.38 · 5.74 | PASS |
| Light `error` / `bg` · `surface` | 6.05 · 6.47 | PASS |
| Dark `live` / `bg` · `surface` | 11.29 · 10.73 | PASS |
| Dark `in-progress` / `bg` · `surface` | 11.78 · 11.20 | PASS |
| Dark `archived` / `bg` · `surface` | 5.29 · 5.03 | PASS |
| Dark `error` / `bg` · `surface` | 7.11 · 6.76 | PASS |

### Border note (WCAG 1.4.11)

Decorative hairlines (`--color-border`, ~1.2:1) are exempt — WCAG only
requires 3:1 for boundaries needed to *identify* a control. Rules:

- Inputs, buttons, and focusable elements use `--color-border-strong` or an
  accent ring (accent passes 3:1 on both themes).
- Focus rings: 2px solid `--color-accent`, offset 2px.

### Fixes applied during this pass

- Light `text-muted` was `#8A8478` (3.48:1 — FAIL) → changed to `#6B665A`.
- `archived` light was a separate gray; aligned to `#6B665A` for consistency.

---

## 4. Typography

All three are free on Google Fonts, variable where noted.

| Role | Typeface | Why | Fallback stack |
|---|---|---|---|
| Heading | **Fraunces** | Editorial serif with real personality (optical sizing, soft/wonky axes). Gives the "magazine, not template" feel the editorial sections need. | `Georgia, 'Times New Roman', serif` |
| Body | **Inter** | Neutral grotesque with excellent small-size legibility and tight metrics; stays out of the way of the serif. | `system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif` |
| Mono | **JetBrains Mono** | Highly legible at chip/caption sizes; clear distinction from body text for tech badges and labels. | `ui-monospace, 'Cascadia Code', 'SF Mono', Consolas, monospace` |

Load via `next/font/google` (Fraunces `opsz` axis, Inter, JetBrains Mono).
Weights actually used: Fraunces 500/600, Inter 400/500, JetBrains Mono 500.

---

## 5. Type Scale

Base: 16px. Line heights are unitless. `clamp()` gives fluid scaling without
breakpoints.

| Token | Size | Line height | Weight | Face |
|---|---|---|---|---|
| `--text-display` | `clamp(3rem, 1.75rem + 5vw, 5.5rem)` | 1.02 | 600 | Fraunces |
| `--text-h1` | `clamp(2.25rem, 1.5rem + 2.5vw, 3.5rem)` | 1.12 | 600 | Fraunces |
| `--text-h2` | `2rem` | 1.2 | 600 | Fraunces |
| `--text-h3` | `1.375rem` | 1.3 | 600 | Fraunces |
| `--text-body` | `1rem` | 1.65 | 400 | Inter |
| `--text-small` | `0.875rem` | 1.5 | 400 | Inter |
| `--text-caption` | `0.75rem` | 1.4 | 500 | Inter (muted) |
| `--text-mono-chip` | `0.75rem` | 1 | 500 | JetBrains Mono, `letter-spacing: 0.04em`, uppercase optional |

Usage notes:

- Display is for the hero name/headline only — one per page.
- h2 is the section-heading size for editorial sections (Skills, Experience).
- `mono-chip` is for tech badges, status labels, and GitHub stats.

---

## 6. Spacing and Shape

4px base unit. Scale:

```
--space-1:  0.25rem   (4px)
--space-2:  0.5rem    (8px)
--space-3:  0.75rem   (12px)
--space-4:  1rem      (16px)
--space-6:  1.5rem    (24px)
--space-8:  2rem      (32px)
--space-12: 3rem      (48px)
--space-16: 4rem      (64px)
--space-24: 6rem      (96px)
--space-32: 8rem      (128px)
```

Border radius:

| Token | Value | Usage |
|---|---|---|
| `--radius-tile` | `1rem` (16px) | Bento tiles, cards, panels |
| `--radius-button` | `0.625rem` (10px) | Buttons, inputs |
| `--radius-chip` | `999px` | Status chips, tech badges, pills |

Bento gap:

```css
--gap-bento: 1rem;          /* mobile */
/* @media (min-width: 768px) { --gap-bento: 1.5rem; } */
```

---

## 7. Bento Rules

Bento is for **scanning** only — hero strip, featured projects, stack/stats.
Never use it for case studies or long-form reading.

### Tile specs

- Padding: `--space-6` (24px) on desktop, `--space-4` (16px) on mobile.
- Border: `1px solid var(--color-border)` — hairline, not a card shadow.
- Radius: `--radius-tile`.
- Background: `--color-surface`; hover → `--color-surface-raised` fill only
  (no shadow lift, no scale — keeps it quiet).

### Hover behavior

- Border color transitions to `--color-border-strong`.
- Optional: accent-colored 2px underline or arrow on project tiles.
- Duration: 150–200ms, `ease-out`. Respect `prefers-reduced-motion` —
  disable transform transitions entirely.

### Rules that keep it from looking generic

1. **Varied spans, consistent grid.** Mix 1×1, 2×1, and 1×2 tiles on a
   12-column grid — but every tile snaps to the grid; no freeform masonry.
2. **One accent tile per row max.** If more than one tile needs emphasis,
   the row is doing too much.
3. **Content leads, chrome follows.** Tiles contain real content (project
   name, metric, status chip) — never empty decorative tiles or stock icons.
4. **Status chips top-right, tech badges bottom.** Same corner, same order,
   every tile. Predictability reads as designed.
5. **No nested cards.** A tile inside a tile breaks the "single sheet" feel.
6. **Cap the visible set.** 6–9 tiles max on the featured-projects grid;
   everything else lives in the editorial case-study list.
7. **Numbers get the mono face.** Metrics and stats in JetBrains Mono make
   the grid feel instrumented, not templated.

---

## CSS Variables (copy-ready)

```css
:root {
  /* Light theme (default) */
  --color-bg: #FAF7F2;
  --color-surface: #FFFFFF;
  --color-surface-raised: #F1EDE4;
  --color-border: #E3DED4;
  --color-border-strong: #B8B1A4;
  --color-text-primary: #191814;
  --color-text-secondary: #57534A;
  --color-text-muted: #6B665A;
  --color-accent: #C2410C;
  --color-accent-hover: #9A3412;
  --color-accent-foreground: #FFFFFF;
  --color-live: #15803D;
  --color-in-progress: #B45309;
  --color-archived: #6B665A;
  --color-error: #B91C1C;

  /* Typography */
  --font-heading: 'Fraunces', Georgia, 'Times New Roman', serif;
  --font-body: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, 'Cascadia Code', Consolas, monospace;

  /* Type scale */
  --text-display: clamp(3rem, 1.75rem + 5vw, 5.5rem);
  --text-h1: clamp(2.25rem, 1.5rem + 2.5vw, 3.5rem);
  --text-h2: 2rem;
  --text-h3: 1.375rem;
  --text-body: 1rem;
  --text-small: 0.875rem;
  --text-caption: 0.75rem;
  --text-mono-chip: 0.75rem;

  /* Spacing (4px base) */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-24: 6rem;
  --space-32: 8rem;

  /* Shape */
  --radius-tile: 1rem;
  --radius-button: 0.625rem;
  --radius-chip: 999px;
  --gap-bento: 1rem;
}

@media (min-width: 768px) {
  :root { --gap-bento: 1.5rem; }
}

.dark {
  --color-bg: #0C0B09;
  --color-surface: #14120F;
  --color-surface-raised: #1C1915;
  --color-border: #2A2620;
  --color-border-strong: #4A443B;
  --color-text-primary: #F5F1E8;
  --color-text-secondary: #B5AEA1;
  --color-text-muted: #8B8474;
  --color-accent: #F97316;
  --color-accent-hover: #FB923C;
  --color-accent-foreground: #1A1206;
  --color-live: #4ADE80;
  --color-in-progress: #FBBF24;
  --color-archived: #8B8474;
  --color-error: #F87171;
}
```

---

## Produced / TODO / Assumed

**Produced:** `docs/design-tokens.md` — full token sheet with verified
contrast ratios and copy-ready CSS variables.

**TODO:**
- Confirm accent choice (burnt orange recommended; teal/crimson are the
  alternates if you want a different feel).
- Confirm Fraunces + Inter + JetBrains Mono, or swap any role.
- Decide whether status chips should be tinted-background pills (needs 2
  extra bg tokens per status) or dot + text only (current assumption).

**Assumed:**
- Accent is theme-dependent (same hue, two values) since no single hex can
  pass AA body text on both near-black and off-white.
- `archived` status shares the muted gray — intentional, archived reads as
  intentionally quiet.
- Light theme is the default `:root`; `.dark` class matches next-themes.
- Decorative borders are exempt from 3:1; `border-strong` covers controls.
