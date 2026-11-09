# Accessibility Report — Phase 4

Date: 2026-11-09 · Branch: `polish/a11y`
Method: code audit + computed WCAG contrast ratios + Lighthouse a11y (100
on `/` and a case study) + manual keyboard/structure review.

## Findings & fixes

| # | Finding | Severity | Status |
|---|---|---|---|
| 1 | `--color-border-strong` failed 3:1 non-text contrast vs bg/surface/raised in BOTH themes (light 1.99:1, dark 2.04:1). Used on all form input borders and focus-adjacent UI — WCAG 1.4.11 risk. | Medium | **Fixed** — token values updated: light `#b8b1a4`→`#8f8674` (now 3.08–3.60:1), dark `#4a443b`→`#756d5e` (now 3.42–3.85:1). Slightly darker/lighter borders; visual change is subtle. |
| 2 | ThemeToggle button `size-9` = 36px < 44px touch target | Medium | **Fixed** → `size-11` (44px) |
| 3 | Mobile menu button `size-9` = 36px < 44px | Medium | **Fixed** → `size-11` |

## Verified clean (no action needed)

**Keyboard**
- Skip link present (`#main`), first tab stop ✅
- Mobile menu: `aria-expanded`/`aria-controls`, Escape closes + returns focus to button, closes on route change ✅
- Mobile menu is a disclosure nav (not modal) — no focus trap needed; Tab flows naturally into links ✅
- ThemeToggle: descriptive `aria-label` ("Theme: dark. Activate for system.") ✅
- Project filters: `aria-pressed`, keyboard-operable buttons ✅
- Contact form: labels `htmlFor`, `aria-invalid`, `aria-describedby` → visible errors, focus → `role="status"` region on success, honeypot `tabIndex={-1}`+`aria-hidden` ✅
- All interactive elements are native `<a>`/`<button>`/inputs — no `tabindex>0`, no focus traps ✅

**Structure**
- Exactly one `<h1>` per page (verified `/`, `/projects`, case study, 404) ✅
- Landmarks: `header` (nav), `main#main`, `footer`, `nav[aria-label]` ✅
- Heading order: h1 → h2 (sections) → h3 (entries/tiles) — no skips ✅

**Contrast** (computed, WCAG AA)
- All text pairs pass 4.5:1 in both themes (worst: muted-on-raised dark 4.71, muted-on-bg light 5.35) ✅
- Accent-on-bg/surface passes 4.5+ both themes ✅
- accent-foreground on accent: 5.18 light / 6.61 dark ✅
- Status colors (live/in-progress) pass 4.5 as text ✅
- theme-accent all pairings ≥6:1 ✅
- Focus outlines use `--color-accent` on bg — ≥3:1 (non-text UI) ✅

**Screen readers**
- MoveCallout marks: sr-only meaning text, never bare symbols ✅
- 404 stalemate board + OffClockStrip cells: `aria-hidden`, meaning in text ✅
- MetricChart: `role="img"` + aria-label summary + collapsible `<table>` data alternative ✅
- StatusChip: dot + text label, never color alone ✅
- Form errors: `aria-describedby` linked, `role="status"` announcements ✅

**Images & media**
- All `next/image` have meaningful alt or `coverAlt`; decorative placeholders `aria-hidden` in prod ✅
- VideoEmbed: controls, muted, playsInline, `preload="none"`, no autoplay ✅
- Architecture SVGs: `role="img"` + `<title>`/`<desc>` ✅

**Touch targets**
- All buttons/links/inputs ≥44px after fixes (nav links `py-3`, buttons `min-h-11`, chips are non-interactive) ✅

**Zoom / text size**
- No fixed-width containers; all grids fluid; `max-w-prose` measures scale with text ✅
- 200% zoom: no clipped content expected (no `overflow:hidden` on text blocks, no fixed heights on text) ✅

## Needs your manual check (screen reader — NVDA is free)

- [ ] Tab through `/` end-to-end: does the focus order feel logical?
- [ ] Mobile menu: open with keyboard, confirm Escape returns focus
- [ ] Contact form: submit invalid → are errors announced? Submit valid (with Resend configured) → success message?
- [ ] Case study: MetricChart table disclosure announces correctly?
- [ ] ThemeToggle: does the label change announce the new theme?
- [ ] 404 page: does the stalemate board stay silent (aria-hidden) and text carry meaning?
- [ ] 200% zoom + Windows text scaling on `/projects` filters
