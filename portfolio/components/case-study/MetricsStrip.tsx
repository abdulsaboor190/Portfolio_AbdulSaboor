import type { Project } from "@/lib/schema";

type Metric = NonNullable<Project["metrics"]>[number];

// A metric counts as "real" only if it has a non-null value that isn't a
// TODO placeholder. Everything else is hidden — truth rules from
// content/metrics.md apply inside case studies too.
function isReal(m: Metric): boolean {
  if (m.value === null || m.value === undefined) return false;
  if (typeof m.value === "string" && /todo/i.test(m.value)) return false;
  return true;
}

export function MetricsStrip({ metrics }: { metrics?: Metric[] }) {
  const real = (metrics ?? []).filter(isReal);
  if (real.length === 0) return null;

  return (
    <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-tile border border-border bg-border sm:grid-cols-4">
      {real.map((m) => (
        <div key={m.label} className="bg-surface p-4">
          <dt className="text-caption text-muted">{m.label}</dt>
          <dd className="text-h3 mt-1 font-mono text-primary">
            {String(m.value)}
            {m.unit ? <span className="text-caption ml-1 text-muted">{m.unit}</span> : null}
          </dd>
          {m.note ? <p className="text-caption mt-1 text-muted">{m.note}</p> : null}
          {m.source ? (
            <p className="text-caption mt-1 font-mono text-muted/70">src: {m.source}</p>
          ) : null}
        </div>
      ))}
    </dl>
  );
}
