import type { ReactNode } from "react";
import type { Project } from "@/lib/schema";
import type { Status } from "@/components/shared/StatusChip";
import { StatusChip } from "@/components/shared/StatusChip";
import { Button } from "@/components/ui/Button";
import { MetricsStrip } from "./MetricsStrip";

const STATUS_MAP: Record<Project["status"], Status> = {
  Live: "live",
  "In progress": "in-progress",
  Archived: "archived",
};

// Single-column editorial shell for case studies. Readable measure (~65ch),
// title block with status chip, period, stack tags, links, metrics strip.
// NO bento tiles — case studies are for reading (docs/design-tokens.md).
export function CaseStudyLayout({
  project,
  children,
}: {
  project: Project;
  children: ReactNode;
}) {
  const links = project.links ?? {};

  return (
    <article className="mx-auto w-full max-w-prose px-4 py-16 sm:px-6 md:py-24">
      <p className="text-mono-chip font-mono uppercase tracking-wider text-muted">
        Project{project.category.length ? ` · ${project.category.join(" / ")}` : ""}
        {project.period ? ` · ${project.period}` : ""}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h1 className="text-h1 font-heading text-primary">{project.title}</h1>
        <StatusChip status={STATUS_MAP[project.status]} />
      </div>

      <p className="text-body mt-4 text-secondary">{project.summary}</p>

      {project.stack.length > 0 ? (
        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Stack">
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

      <div className="mdx-body mt-12">{children}</div>

      {links.demo || links.repo || links.video ? (
        <div className="mt-12 flex flex-wrap gap-4 border-t border-border pt-8">
          {links.demo ? (
            <Button href={links.demo} target="_blank" rel="noopener noreferrer">
              Live demo
            </Button>
          ) : null}
          {links.repo ? (
            <Button
              href={links.repo}
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source code
            </Button>
          ) : null}
          {links.video ? (
            <Button
              href={links.video}
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Video
            </Button>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
