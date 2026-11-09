import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Status } from "@/components/shared/StatusChip";
import { BentoTile } from "./BentoTile";
import { StatusChip } from "@/components/shared/StatusChip";

export interface ProjectTileData {
  slug: string;
  title: string;
  outcome: string;
  stack: string[];
  status: Status;
  size: "large" | "medium" | "card";
  cover?: string;
  coverAlt?: string;
}

const MAX_TAGS = 4;

const sizeClasses: Record<ProjectTileData["size"], string> = {
  large: "md:col-span-7 md:row-span-2",
  medium: "md:col-span-5",
  card: "",
};

function Cover({ project }: { project: ProjectTileData }) {
  if (project.cover) {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-tile border border-border bg-surface-raised">
        <Image
          src={project.cover}
          alt={project.coverAlt ?? `${project.title} cover`}
          fill
          sizes="(min-width: 768px) 60vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  // No cover asset yet (assets-source checklist pending). Dev shows a
  // labelled placeholder; production renders a plain token surface so no
  // broken-image or placeholder text ships.
  return (
    <div
      aria-hidden={process.env.NODE_ENV === "production"}
      className="flex aspect-[16/10] w-full items-center justify-center rounded-tile border border-border bg-surface-raised"
    >
      {process.env.NODE_ENV === "development" ? (
        <span className="text-caption font-mono text-muted">Cover coming</span>
      ) : null}
    </div>
  );
}

export function ProjectTile({ project }: { project: ProjectTileData }) {
  const visibleTags = project.stack.slice(0, MAX_TAGS);
  const hiddenCount = project.stack.length - visibleTags.length;
  const isLarge = project.size === "large";

  return (
    <BentoTile href={`/projects/${project.slug}`} className={sizeClasses[project.size]}>
      <Cover project={project} />

      <div className="mt-4 flex items-start justify-between gap-3">
        <h3
          className={cn(
            "font-heading text-primary",
            isLarge ? "text-h2" : "text-h3",
          )}
        >
          {project.title}
        </h3>
        <StatusChip status={project.status} className="shrink-0" />
      </div>

      <p className="mt-2 text-small text-secondary">{project.outcome}</p>

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {visibleTags.map((tag) => (
          <li
            key={tag}
            className="rounded-chip border border-border px-2 py-0.5 text-mono-chip font-mono text-muted"
          >
            {tag}
          </li>
        ))}
        {hiddenCount > 0 ? (
          <li className="rounded-chip border border-border px-2 py-0.5 text-mono-chip font-mono text-muted">
            +{hiddenCount}
          </li>
        ) : null}
      </ul>
    </BentoTile>
  );
}
