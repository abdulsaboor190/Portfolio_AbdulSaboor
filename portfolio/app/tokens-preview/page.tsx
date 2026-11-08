// ⚠️ TEMPORARY — design-token verification page. DELETE BEFORE LAUNCH.
// Route: /tokens-preview (temporary verification page — delete before launch).

import { ThemeToggle } from "@/components/shared/ThemeToggle";
// but it still builds — remove the folder entirely before deploying).

const COLORS = [
  { name: "bg", cls: "bg-background", hex: "#FAF7F2 / #0C0B09" },
  { name: "surface", cls: "bg-surface", hex: "#FFFFFF / #14120F" },
  { name: "surface-raised", cls: "bg-surface-raised", hex: "#F1EDE4 / #1C1915" },
  { name: "border", cls: "border-border", hex: "#E3DED4 / #2A2620" },
  { name: "border-strong", cls: "border-border-strong", hex: "#B8B1A4 / #4A443B" },
  { name: "text-primary", cls: "text-primary", hex: "#191814 / #F5F1E8" },
  { name: "text-secondary", cls: "text-secondary", hex: "#57534A / #B5AEA1" },
  { name: "text-muted", cls: "text-muted", hex: "#6B665A / #8B8474" },
  { name: "accent", cls: "bg-accent", hex: "#C2410C / #F97316" },
  { name: "accent-hover", cls: "bg-accent-hover", hex: "#9A3412 / #FB923C" },
  { name: "accent-foreground", cls: "bg-accent-foreground", hex: "#FFF / #1A1206" },
  { name: "live", cls: "bg-live", hex: "#15803D / #4ADE80" },
  { name: "in-progress", cls: "bg-in-progress", hex: "#B45309 / #FBBF24" },
  { name: "archived", cls: "bg-archived", hex: "#6B665A / #8B8474" },
  { name: "error", cls: "bg-error", hex: "#B91C1C / #F87171" },
] as const;

const TYPE = [
  { name: "display", cls: "text-display font-heading", sample: "Display" },
  { name: "h1", cls: "text-h1 font-heading", sample: "Heading one" },
  { name: "h2", cls: "text-h2 font-heading", sample: "Heading two" },
  { name: "h3", cls: "text-h3 font-heading", sample: "Heading three" },
  { name: "body", cls: "text-body font-body", sample: "Body text — the quick brown fox" },
  { name: "small", cls: "text-small font-body", sample: "Small text — supporting copy" },
  { name: "caption", cls: "text-caption font-body text-muted", sample: "Caption / metadata" },
  {
    name: "mono-chip",
    cls: "text-mono-chip font-mono tracking-wider uppercase",
    sample: "react · next.js",
  },
] as const;

const SPACING = [1, 2, 3, 4, 6, 8, 12, 16, 24, 32] as const;
const SPACE_REM: Record<number, string> = {
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  6: "1.5rem",
  8: "2rem",
  12: "3rem",
  16: "4rem",
  24: "6rem",
  32: "8rem",
};

function ThemeBlock({ theme }: { theme: "light" | "dark" }) {
  return (
    <section className={theme === "dark" ? "dark bg-background text-primary p-8" : "bg-background text-primary p-8"}>
      <h2 className="text-h2 mb-6">{theme === "dark" ? "Dark" : "Light"} theme</h2>

      <h3 className="text-h3 mb-3">Colors</h3>
      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {COLORS.map((c) => (
          <div key={c.name} className="overflow-hidden rounded-tile border border-border">
            <div className={`h-16 ${c.cls} border-b border-border`} />
            <div className="bg-surface p-2">
              <p className="text-caption font-mono">{c.name}</p>
              <p className="text-caption text-muted">{c.hex}</p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-h3 mb-3">Type scale</h3>
      <div className="mb-8 space-y-4">
        {TYPE.map((t) => (
          <div key={t.name} className="flex items-baseline gap-4 border-b border-border pb-3">
            <code className="text-caption w-28 shrink-0 font-mono text-muted">{t.cls}</code>
            <span className={t.cls}>{t.sample}</span>
          </div>
        ))}
      </div>

      <h3 className="text-h3 mb-3">Spacing</h3>
      <div className="space-y-2">
        {SPACING.map((n) => (
          <div key={n} className="flex items-center gap-4">
            <code className="text-caption w-28 shrink-0 font-mono text-muted">
              space-{n} · {SPACE_REM[n]}
            </code>
            <div className="h-3 rounded bg-accent" style={{ width: SPACE_REM[n] }} />
          </div>
        ))}
      </div>

      <h3 className="text-h3 mb-3 mt-8">Radius & borders</h3>
      <div className="flex flex-wrap items-center gap-4">
        <div className="size-16 rounded-tile border border-border bg-surface" />
        <div className="size-16 rounded-button border border-border bg-surface" />
        <span className="rounded-chip border border-border bg-surface px-3 py-1 text-mono-chip font-mono">
          chip
        </span>
        <button className="rounded-button bg-accent px-4 py-2 text-body font-medium text-accent-foreground">
          accent button
        </button>
        <button className="rounded-button border border-border-strong bg-surface px-4 py-2 text-body text-primary">
          secondary button
        </button>
      </div>
    </section>
  );
}

export default function TokensPreview() {
  return (
    <main>
      <p className="flex items-center justify-center gap-3 bg-error px-4 py-2 text-center text-small font-medium text-white">
        TEMPORARY TOKEN PREVIEW — DELETE app/tokens-preview/ BEFORE LAUNCH
        <ThemeToggle className="border-white/40 bg-transparent text-white hover:border-white hover:text-white" />
      </p>
      <ThemeBlock theme="light" />
      <ThemeBlock theme="dark" />
    </main>
  );
}
