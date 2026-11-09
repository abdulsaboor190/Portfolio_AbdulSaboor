import { personalFacts } from "@/lib/personal-facts";
import { getChessRating } from "@/lib/chess";
import { BentoGrid } from "./BentoGrid";
import { BentoTile } from "./BentoTile";

// "Off the clock" — the About section's only bento element (decoration
// budget: 3). All data comes from lib/personal-facts.ts; a tile renders
// only when it has real values, and the whole strip needs ≥2 tiles.

const STALE_DAYS = 90;

function formatUpdated(iso: string | null): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  const ageDays = (Date.now() - date.getTime()) / 86_400_000;
  if (ageDays > STALE_DAYS) {
    // Stale: subtle month-only label rather than a precise old date.
    return `updated ${date.toLocaleDateString("en-GB", { month: "short", year: "numeric" })}`;
  }
  return `Updated ${date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`;
}

function TileLabel({ children }: { children: string }) {
  return <p className="text-caption font-mono uppercase tracking-wider text-muted">{children}</p>;
}

function Updated({ iso }: { iso: string | null }) {
  const label = formatUpdated(iso);
  if (!label) return null;
  const stale = label.startsWith("updated ");
  return (
    <p className={`mt-3 text-caption ${stale ? "text-muted/70 italic" : "text-muted"}`}>
      {label}
    </p>
  );
}

function chessProfileUrl(platform: "lichess" | "chess.com", username: string) {
  return platform === "lichess"
    ? `https://lichess.org/${username}`
    : `https://www.chess.com/member/${username}`;
}

export async function OffClockStrip() {
  const { chess, currentlyReading, recentlyWatched } = personalFacts;
  const liveRating = await getChessRating();

  const tiles: React.ReactNode[] = [];

  // Playing — chess. Needs at least a platform+username or a favorite line.
  const hasChessIdentity = chess.platform && chess.username;
  const hasChessContent =
    hasChessIdentity ||
    chess.favorite.opening !== null ||
    chess.favorite.player !== null;
  if (hasChessContent) {
    const rating =
      liveRating !== null
        ? `${liveRating.value}${liveRating.timeControl ? ` ${liveRating.timeControl}` : ""}`
        : null;
    const fallback =
      chess.favorite.opening ?? chess.favorite.player
        ? `Favorite: ${chess.favorite.opening ?? chess.favorite.player}`
        : "Player, not a spectator.";

    const body = (
      <>
        <TileLabel>Playing</TileLabel>
        <p className="mt-2 text-h3 font-heading text-primary">
          {hasChessIdentity ? `@${chess.username}` : "Chess"}
        </p>
        <p className="mt-2 text-small text-secondary">
          {rating ?? fallback}
        </p>
        <Updated iso={chess.lastVerified} />
      </>
    );

    tiles.push(
      hasChessIdentity ? (
        <BentoTile key="chess" href={chessProfileUrl(chess.platform!, chess.username!)}>
          {body}
        </BentoTile>
      ) : (
        <BentoTile key="chess">{body}</BentoTile>
      ),
    );
  }

  // Watching — text only, no posters.
  if (recentlyWatched.title && recentlyWatched.take) {
    tiles.push(
      <BentoTile key="watching">
        <TileLabel>Watching</TileLabel>
        <p className="mt-2 text-h3 font-heading text-primary">
          {recentlyWatched.title}
          {recentlyWatched.year ? (
            <span className="text-small text-muted"> ({recentlyWatched.year})</span>
          ) : null}
        </p>
        <p className="mt-2 text-small text-secondary">{recentlyWatched.take}</p>
        <Updated iso={recentlyWatched.lastVerified} />
      </BentoTile>,
    );
  }

  // Reading — text only; cover only if explicitly requested later.
  if (currentlyReading.title && currentlyReading.take) {
    tiles.push(
      <BentoTile key="reading">
        <TileLabel>Reading</TileLabel>
        <p className="mt-2 text-h3 font-heading text-primary">{currentlyReading.title}</p>
        {currentlyReading.author ? (
          <p className="text-small text-muted">{currentlyReading.author}</p>
        ) : null}
        <p className="mt-2 text-small text-secondary">{currentlyReading.take}</p>
        <Updated iso={currentlyReading.lastVerified} />
      </BentoTile>,
    );
  }

  if (tiles.length < 2) return null;

  return (
    <div className="mt-12">
      <p className="text-caption font-mono uppercase tracking-wider text-muted">Off the clock</p>
      <BentoGrid className="mt-4 md:grid-cols-3">{tiles}</BentoGrid>
    </div>
  );
}
