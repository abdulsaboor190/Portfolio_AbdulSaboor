// "The move I played" — the signature case-study callout.
// Shows the annotation mark in the theme accent inside a badge, the
// decision, the rejected alternative, and the outcome. Screen readers get
// the mark's meaning via sr-only text — never a bare "!".

const MARK_MEANING: Record<string, string> = {
  "!": "verified decision",
  "!!": "key decision",
  "?!": "open question",
  "?": "unverified",
};

export function MoveCallout({
  mark,
  decision,
  alternative,
  outcome,
}: {
  mark: "!" | "!!" | "?!" | "?";
  decision: string;
  alternative: string;
  outcome: string;
}) {
  return (
    <aside className="my-8 rounded-r-tile border-l-4 border-theme-accent bg-surface-raised p-5 md:p-6">
      <div className="flex items-center gap-3">
        <span className="inline-flex size-7 items-center justify-center rounded-chip border border-theme-accent font-mono text-small font-medium text-theme-accent">
          <span aria-hidden="true">{mark}</span>
          <span className="sr-only">{MARK_MEANING[mark]}</span>
        </span>
        <p className="text-mono-chip font-mono uppercase tracking-wider text-theme-accent">
          The move I played
        </p>
      </div>

      <dl className="mt-4 space-y-3 text-body">
        <div>
          <dt className="text-caption font-mono uppercase tracking-wider text-muted">Decision</dt>
          <dd className="mt-0.5 text-primary">{decision}</dd>
        </div>
        <div>
          <dt className="text-caption font-mono uppercase tracking-wider text-muted">
            Alternative rejected
          </dt>
          <dd className="mt-0.5 text-secondary">{alternative}</dd>
        </div>
        <div>
          <dt className="text-caption font-mono uppercase tracking-wider text-muted">Outcome</dt>
          <dd className="mt-0.5 text-secondary">{outcome}</dd>
        </div>
      </dl>
    </aside>
  );
}
