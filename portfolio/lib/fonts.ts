import { Cinzel, EB_Garamond } from "next/font/google";

// Theme-layer fonts (docs/theme-spec.md §2). These are NOT loaded globally —
// apply `.variable` on the specific page/component that uses the font so it
// only ships where needed:
//   - ebGaramond.variable → drop caps, pull quotes, resume
//   - cinzel.variable    → title-card name only (hero, later phase)
// tokens.css falls back to Georgia/serif when the variable is absent.

export const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  display: "swap",
});

export const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});
