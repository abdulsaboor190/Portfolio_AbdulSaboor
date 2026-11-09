import Link from "next/link";

// Stalemate position: White Kf7 + Qg6 vs Black Kh8 — Black to move has no
// legal moves and is not in check. Decorative only (aria-hidden); the
// meaning is carried by the text.
function StalemateBoard() {
  const light = "var(--color-surface-raised)";
  const dark = "var(--color-surface)";
  const border = "var(--color-border)";
  const ink = "var(--color-text-primary)";
  const accent = "var(--color-accent)";

  // 8x8 grid; rank 8 at top. Pieces: Kf7 (white king), Qg6 (white queen),
  // Kh8 (black king).
  const pieces: Record<string, { fill: string; stroke?: string; label: string }> = {
    f7: { fill: "var(--color-surface)", stroke: border, label: "White king" },
    g6: { fill: accent, label: "White queen" },
    h8: { fill: ink, label: "Black king" },
  };

  const squares = [];
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const key = `${String.fromCharCode(97 + c)}${8 - r}`;
      const p = pieces[key];
      squares.push(
        <rect
          key={key}
          x={c * 40}
          y={r * 40}
          width={40}
          height={40}
          fill={(r + c) % 2 === 0 ? light : dark}
          stroke={border}
          strokeWidth={0.5}
        />,
      );
      if (p) {
        squares.push(
          <g key={`${key}-p`}>
            <circle
              cx={c * 40 + 20}
              cy={r * 40 + 20}
              r={13}
              fill={p.fill}
              stroke={p.stroke ?? "none"}
              strokeWidth={2}
            />
            {key === "g6" ? (
              // queen: small crown ticks
              <path
                d={`M ${c * 40 + 14} ${r * 40 + 20} l 3 -6 l 3 6 l 3 -6 l 3 6 l 3 -6`}
                fill="none"
                stroke="var(--color-accent-foreground)"
                strokeWidth={1.5}
              />
            ) : null}
            {key === "h8" ? (
              // black king: cross mark
              <path
                d={`M ${c * 40 + 20} ${r * 40 + 12} v 16 M ${c * 40 + 12} ${r * 40 + 20} h 16`}
                stroke="var(--color-background)"
                strokeWidth={2}
              />
            ) : null}
          </g>,
        );
      }
    }
  }

  return (
    <svg
      viewBox="0 0 320 320"
      className="h-40 w-40 md:h-48 md:w-48"
      aria-hidden="true"
      focusable="false"
    >
      {squares}
    </svg>
  );
}

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 px-4 py-16 text-center">
      <StalemateBoard />
      <div>
        <p className="text-mono-chip font-mono uppercase tracking-wider text-muted">404</p>
        <h1 className="text-h1 mt-2 font-heading text-primary">Stalemate.</h1>
        <p className="text-body mx-auto mt-3 max-w-prose text-secondary">
          No legal moves left on this board — but a stalemate is a draw, not a
          loss. The page you wanted isn&apos;t here; let&apos;s get you back to
          the game.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-button bg-accent px-5 text-body font-medium text-accent-foreground no-underline transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          Back to home
        </Link>
        <Link
          href="/projects"
          className="inline-flex min-h-11 items-center rounded-button border border-border-strong px-5 text-body text-primary no-underline transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          View projects
        </Link>
      </div>
    </div>
  );
}
