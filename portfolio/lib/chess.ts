import { personalFacts } from "@/lib/personal-facts";

// Live chess rating — server-side only, 6h cache. Falls back silently to
// the verified value in personal-facts.ts if the API is unreachable.
// chess.com public stats endpoint needs no auth.
// (Lichess equivalent: GET https://lichess.org/api/user/{username} →
//  perfs.{rapid,blitz,bullet}.rating — add if platform ever switches.)

const REVALIDATE_SECONDS = 6 * 60 * 60;

// facts timeControl label → chess.com stats key
const TC_KEYS: Record<string, string> = {
  Rapid: "chess_rapid",
  Blitz: "chess_blitz",
  Bullet: "chess_bullet",
  Daily: "chess_daily",
};

export interface ChessRating {
  value: number;
  timeControl: string;
  live: boolean; // true = from API, false = facts fallback
}

export async function getChessRating(): Promise<ChessRating | null> {
  const { platform, username, rating } = personalFacts.chess;
  if (!platform || !username) return null;

  const fallback =
    rating.value !== null
      ? { value: rating.value, timeControl: rating.timeControl ?? "", live: false }
      : null;

  if (platform !== "chess.com") return fallback;

  try {
    const res = await fetch(
      `https://api.chess.com/pub/player/${encodeURIComponent(username)}/stats`,
      { next: { revalidate: REVALIDATE_SECONDS } },
    );
    if (!res.ok) return fallback;
    const stats = await res.json();
    const key = TC_KEYS[rating.timeControl ?? ""] ?? "chess_rapid";
    const live = stats?.[key]?.last?.rating;
    if (typeof live === "number") {
      return {
        value: live,
        timeControl: rating.timeControl ?? "Rapid",
        live: true,
      };
    }
    return fallback;
  } catch {
    return fallback;
  }
}
