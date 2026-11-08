# Theme Specification — Abdul Saboor Portfolio

Builds on `docs/design-tokens.md` and `styles/tokens.css`. Nothing here
replaces the token sheet; it extends it with a *theme accent* layer for the
chess framing ("A [role] story with a [subplot]").

---

## 1. Accent Color

### Candidates (all WCAG-verified against `styles/tokens.css`)

**Deep green**

| Theme | Hex | On `bg` | On `surface` | With `accent-foreground` |
|---|---|---|---|---|
| Light | `#166534` | 6.67 | 7.13 | white `#FFFFFF` → 7.13 |
| Dark | `#34D399` | 10.23 | 9.73 | `#1A1206` → 9.64 |

**Burgundy**

| Theme | Hex | On `bg` | On `surface` | With `accent-foreground` |
|---|---|---|---|---|
| Light | `#7F1D3A` | 9.19 | 9.82 | white `#FFFFFF` → 9.82 |
| Dark | `#FB7185` | 7.31 | 6.95 | `#1A1206` → 6.89 |

Both pass AA body text (4.5:1) in every pairing above. Status-color
collision check: dark `#34D399` sits near `live` `#4ADE80` — distinguishable
but adjacent; `#FB7185` has no status collision.

### My choice: **[UNDECIDED — pick one]**

If undecided, I recommend **deep green**: the site framing is chess, and
green + cream is the literal chessboard palette — it makes "board strips"
and annotation marks feel authored rather than decorated. Burgundy is the
safer alternative if you want something less literal.

### Relationship to the existing accent

**Recommendation: keep burnt orange (`#C2410C` / `#F97316`) as the UI
accent and add the chosen color as a secondary "theme accent" used ONLY
for annotation marks, drop caps, board strips and credits.**

Trade-off in two sentences: two accents only stay cohesive if their roles
never overlap — the moment green or burgundy appears on a button or link,
the site reads as two designs fighting. The strict role separation is what
keeps it looking like one system; the cost is a rule you have to enforce
in review.

New tokens (pending your choice):

```css
--color-theme-accent: #166534;   /* light — deep green */
--color-theme-accent: #7F1D3A;   /* light — burgundy (alternate) */
.dark { --color-theme-accent: #34D399; }  /* or #FB7185 */
```

---

## 2. Typography

**Keep existing:** Fraunces (headings), Inter (body), JetBrains Mono —
they already carry the editorial voice; a change isn't clearly better.

Add two faces, each with exactly one job:

| Role | Typeface | Why | Fallback |
|---|---|---|---|
| Bookish serif — drop caps, resume, pull quotes | **EB Garamond** | A real book face (Google Fonts, OFL): high-contrast didone serifs read as "printed page," which suits drop caps and the CV without competing with Fraunces. | `Georgia, 'Times New Roman', serif` |
| Display face — title-card name ONLY | **Cinzel** | Trajan-style Roman capitals — the lettering on chess pieces and museum plaques. Used once, at display size, it turns the hero name into a title card without touching any other heading. | `Georgia, 'Times New Roman', serif` |

Load via `next/font/google`, `display: "swap"`, expose as
`--font-book` and `--font-display`.

---

## 3. Tagline

Form: **"A [role] story with a [subplot]"** — max 12 words, facts only.

| # | Option | Words |
|---|---|---|
| A | "A full-stack story with an AI subplot." | 8 |
| B | "A developer story with a machine-learning subplot." | 8 |
| C | "A CS student story with a traffic-control subplot." | 8 |

Facts used: full-stack + applied AI lead (positioning), developer role,
traffic control project (copy.md). No invented claims.

**My preferred tagline: [none given]** — pick A, B, or C, or supply your
own and I'll slot it in.

---

## 4. Section Framing

Standard headings always render visibly (h2, token styles). The themed
label is a small mono annotation *alongside* the heading — never a
replacement.

| Section | Themed label | Visible heading |
|---|---|---|
| Hero | `Title card` | name + headline (unchanged) |
| Hero bento strip | `Position report` | — (no heading) |
| Featured projects | `The games` | Featured projects |
| Skills | `Opening` | Skills |
| Experience | `Middlegame` | Experience |
| About | `Player profile` | About |
| Contact | `Final position` | Let's build something. |
| Case studies index | `Annotated games` | Projects |
| Case study pages | `Game notes` | project title (h1) |
| Footer | `Colophon` | — |

Format: `Skills — Opening` rendered as `Opening` in `--color-theme-accent`
mono-chip before the h2, or `Skills, Opening` as a subtitle line. Pick one
format at build time; both keep the standard heading.

---

## 5. Decoration Budget

Rule: **the budget is fixed per section — adding one element requires
removing another.** Dashboard details (chips, badges, status) don't count;
they're information, not decoration.

| Section | Allowed decoration (max) |
|---|---|
| Hero | Title-card name (Cinzel), tagline, two hairline rules, annotation marks |
| Bento strip | None — dashboard tiles only |
| Featured projects | None beyond tile chrome |
| Skills | Group separators only |
| Experience | The timeline line + markers (counts as ONE element) |
| About | One drop cap on the first paragraph (EB Garamond) |
| Contact | None |
| Case studies | Callouts, diagrams, figures — content components, not ornament |
| Footer | One colophon line |

Anything not on this list is decoration and needs a budget swap first.

---

## 6. Annotation Mark Legend

Marks are inline mono characters paired with visually hidden text. The
hidden text is what screen readers announce; sighted readers get the mark.

| Mark | Meaning | Visually hidden text |
|---|---|---|
| `!` | Verified fact — measured, shipped, or confirmed | `"verified:"` |
| `!!` | Signature result — the thing you're proudest of | `"key result:"` |
| `?!` | Open question — needs your input before publishing | `"open question:"` |
| `?` | Unverified — plausible but not confirmed | `"unverified:"` |

Example: `50+ students ?` renders the `?` mark plus `<span class="sr-only">unverified:</span>`.
Usage rule: marks annotate *claims*, never decorate words at random —
max one mark per sentence, none in headings.

---

## 7. Do-Not List

- No skill bars, progress bars, or percentage ratings anywhere
- No text baked into images (alt text and captions carry the words)
- No puns or wordplay in headings
- No poster images or media hotlinked from other sites — self-host only
- No decoration that overlaps, covers, or blocks content (including on
  small screens)
- No theme-accent color on interactive elements (buttons, links, inputs)
- No animated decoration — the site stays calm; Motion is for section
  reveals only, in a later phase
- No metrics without a measured value and source
