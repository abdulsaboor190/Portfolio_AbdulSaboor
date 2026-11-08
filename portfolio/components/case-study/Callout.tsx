import type { ReactNode } from "react";

// Two variants:
//  - decision: "A hard problem and my decision" — the editorial highlight
//  - note: general aside
// Rendered as a <aside> so screen readers announce it as complementary.
export function Callout({
  variant = "note",
  children,
}: {
  variant?: "decision" | "note";
  children: ReactNode;
}) {
  const isDecision = variant === "decision";

  return (
    <aside
      className={
        isDecision
          ? "my-8 rounded-r-tile border-l-4 border-accent bg-surface-raised p-5 md:p-6"
          : "my-8 rounded-r-tile border-l-4 border-border-strong bg-surface p-5 md:p-6"
      }
    >
      <p
        className={
          isDecision
            ? "text-mono-chip font-mono uppercase tracking-wider text-accent"
            : "text-mono-chip font-mono uppercase tracking-wider text-muted"
        }
      >
        {isDecision ? "Hard problem & my decision" : "Note"}
      </p>
      <div className="mt-3 text-body text-primary [&_p]:my-0">{children}</div>
    </aside>
  );
}
