import type { ReactNode } from "react";
import type { Project } from "@/lib/schema";
import type { Status } from "@/components/shared/StatusChip";
import { StatusChip } from "@/components/shared/StatusChip";
import { MetricsStrip } from "./MetricsStrip";
import { Credits } from "./Credits";
import { cinzel } from "@/lib/fonts";

const STATUS_MAP: Record<Project["status"], Status> = {
  Live: "live",
  "In progress": "in-progress",
  Archived: "archived",
  Shipped: "shipped",
};

// Single-column editorial shell for case studies. Readable measure (~65ch),
// title card (display face), status chip, period, stack tags, metrics
// strip, MDX body, end credits. NO bento tiles — case studies are for
// reading (docs/design-tokens.md).
export function CaseStudyLayout({
  project,
  children,
}: {
  project: Project;
  children: ReactNode;
}) {
  return (
    <article className={`mx-auto w-full max-w-prose px-4 py-16 sm:px-6 md:py-24 ${cinzel.variable}`}>
      <p className="text-mono-chip font-mono uppercase tracking-wider text-muted">
        Game notes
        {project.category.length ? ` · ${project.category.join(" / ")}` : ""}
        {project.period ? ` · ${project.period}` : ""}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h1 className="font-title text-h1 font-semibold uppercase text-primary">
          {project.title}
        </h1>
        <StatusChip status={STATUS_MAP[project.status]} />
      </div>

      <p className="text-body mt-4 text-secondary">{project.summary}</p>

      {project.stack.length > 0 ? (
        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Cast">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-chip border border-border px-2.5 py-1 text-mono-chip font-mono text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
      ) : null}

      <MetricsStrip metrics={project.metrics} />

      {/* .dropcap-first applies the single decorative drop cap (EB Garamond)
          to the first paragraph — theme-spec decoration budget §5. */}
      <div className="mdx-body dropcap-first mt-12">{children}</div>

      <Credits project={project} />
    </article>
  );
}
