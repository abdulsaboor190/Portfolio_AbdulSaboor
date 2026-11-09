import type { ReactNode } from "react";

// General note variant — quiet aside for asides that aren't the
// "move I played" decision (that's MoveCallout).
export function Callout({ children }: { children: ReactNode }) {
  return (
    <aside className="my-8 rounded-r-tile border-l-4 border-border-strong bg-surface p-5 md:p-6">
      <p className="text-mono-chip font-mono uppercase tracking-wider text-muted">Note</p>
      <div className="mt-3 text-body text-primary [&_p]:my-0">{children}</div>
    </aside>
  );
}
