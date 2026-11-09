# Personal Facts — Single Source of Truth

Everything personal on the site (chess, reading, watching, shelf,
per-project decisions, credits) lives here. `content/personal-facts.schema.json`
defines the machine-readable shape; `portfolio/lib/personal-facts.ts` is the
typed loader the site and resume read from.

**Status: all values are TODO — nothing has been provided yet.**

---

## Chess

- Platform: `chess.com`
- Username: `rapid_19`
- Rating: `979` Rapid — provided 2026-11-09
- Favorite opening or player: `TODO` (optional)
- Last verified: `2026-11-09`
- Checkable at: https://www.chess.com/member/rapid_19

## Currently reading

- Title: `TODO`
- Author: `TODO`
- One-line take: `TODO`
- Last verified: `TODO`
- Checkable at: `TODO` (e.g. reading log, post, or just "say it in person")

## Recently watched

- Title: `TODO`
- Year: `TODO`
- One-line take: `TODO`
- Last verified: `TODO`
- Checkable at: `TODO`

## Shelf (optional, max 6)

`TODO` — up to 6 books or films, each with a one-line takeaway.
Format per item: `{ type: "book" | "film", title, take }`.

## The move I played — decisions (one per featured project)

For each featured project: the decision I made, the alternative I rejected,
the outcome, and a mark (`!` / `!!` / `?!` / `?` — legend in
`docs/theme-spec.md` §6).

- Traffic Control: `TODO` — decision / rejected alternative / outcome / mark
- TicketFlow: `TODO`
- Scholr: `TODO`
- ShieldHer: `TODO` (only if it qualifies for featuring)
- FSCM: `TODO`
- FAST Past Papers: `TODO`

## Project credits (roles)

- Traffic Control: `TODO` — e.g. "Solo developer"
- TicketFlow: `TODO`
- Scholr: `TODO`
- ShieldHer: `TODO`
- FSCM: `TODO`
- FAST Past Papers: `TODO`

---

## Truth rules

1. **Nothing rounded up.** A 1234 rating is 1234, not "~1250". A 6-book
   shelf is 6, not "a few".
2. **Nothing I could not discuss in an interview.** If you can't talk
   about it for two minutes, it doesn't go on the site.
3. **Every rating or title must be real and current.** Chess ratings drift
   — re-verify before launch and update `lastVerified`. "Currently
   reading" expires; if you finished it, it moves to the shelf or comes
   off.
4. **Every fact carries `lastVerified` + `source`.** A fact without a way
   to check it is a rumor.
5. **TODO means absent, not hidden.** Sections render nothing until real
   values exist — empty states are better than filler.
