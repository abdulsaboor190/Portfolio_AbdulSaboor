// Typed loader for personal facts — mirrors content/personal-facts.md and
// validates against content/personal-facts.schema.json.
//
// ALL VALUES ARE TODO: nothing personal has been provided yet. Sections
// must render nothing (not placeholders) until real values exist —
// truth rules in content/personal-facts.md.

export type AnnotationMark = "!" | "!!" | "?!" | "?";

export interface VerifiedFact {
  lastVerified: string | null; // ISO date or null while TODO
  source: string; // where it can be checked, or "TODO"
}

export interface PersonalFacts {
  chess: VerifiedFact & {
    platform: "lichess" | "chess.com" | null;
    username: string | null;
    rating: { value: number | null; timeControl: string | null };
    favorite: { opening: string | null; player: string | null };
  };
  currentlyReading: VerifiedFact & {
    title: string | null;
    author: string | null;
    take: string | null;
  };
  recentlyWatched: VerifiedFact & {
    title: string | null;
    year: number | null;
    take: string | null;
  };
  shelf: { type: "book" | "film"; title: string; take: string }[];
  decisions: {
    project: string;
    decision: string | null;
    alternative: string | null;
    outcome: string | null;
    mark: AnnotationMark;
  }[];
  credits: { project: string; role: string | null }[];
}

export const personalFacts: PersonalFacts = {
  chess: {
    platform: "chess.com",
    username: "rapid_19",
    rating: { value: 979, timeControl: "Rapid" },
    favorite: { opening: null, player: null }, // TODO (optional)
    lastVerified: "2026-11-09",
    source: "https://www.chess.com/member/rapid_19",
  },
  currentlyReading: {
    title: null, // TODO
    author: null, // TODO
    take: null, // TODO: one-line take
    lastVerified: null,
    source: "TODO",
  },
  recentlyWatched: {
    title: null, // TODO
    year: null, // TODO
    take: null, // TODO
    lastVerified: null,
    source: "TODO",
  },
  shelf: [], // TODO: up to 6 { type, title, take }
  decisions: [
    // TODO: one per featured project — decision / alternative / outcome / mark
    { project: "traffic-control", decision: null, alternative: null, outcome: null, mark: "?" },
    { project: "ticketflow", decision: null, alternative: null, outcome: null, mark: "?" },
    { project: "scholr", decision: null, alternative: null, outcome: null, mark: "?" },
    { project: "shieldher", decision: null, alternative: null, outcome: null, mark: "?" },
    { project: "fscm", decision: null, alternative: null, outcome: null, mark: "?" },
    { project: "fast-past-papers", decision: null, alternative: null, outcome: null, mark: "?" },
  ],
  credits: [
    // TODO: role per project, e.g. "Solo developer"
    { project: "traffic-control", role: null },
    { project: "ticketflow", role: null },
    { project: "scholr", role: null },
    { project: "shieldher", role: null },
    { project: "fscm", role: null },
    { project: "fast-past-papers", role: null },
  ],
};

// Helpers for components: a fact "renders" only when its core value exists.
export function hasChessRating(f: PersonalFacts["chess"]): boolean {
  return f.rating.value !== null;
}

export function hasDecision(d: PersonalFacts["decisions"][number]): boolean {
  return d.decision !== null && d.outcome !== null;
}
