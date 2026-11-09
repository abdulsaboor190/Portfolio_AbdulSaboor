import { site } from "@/lib/site-config";
import { getAllProjects } from "@/lib/projects";
import type { Project } from "@/lib/schema";
import type { Status } from "@/components/shared/StatusChip";
import { BentoTile } from "./BentoTile";
import { StatusChip } from "@/components/shared/StatusChip";

const STATUS_MAP: Record<Project["status"], Status> = {
  Live: "live",
  "In progress": "in-progress",
  Archived: "archived",
  Shipped: "shipped",
};

// "Currently building" — project name comes from site-config; status and
// optional chess-stage label come from that project's MDX frontmatter when
// a matching project exists (matched by title, case-insensitive).
export function StatusTile() {
  const name = site.currentlyBuilding;
  const project = getAllProjects().find(
    (p) => p.title.toLowerCase() === name.toLowerCase(),
  );

  return (
    <BentoTile>
      <div className="flex items-start justify-between gap-3">
        <p className="text-caption text-muted">Currently building</p>
        <StatusChip status={project ? STATUS_MAP[project.status] : "in-progress"} />
      </div>
      <p className="text-h3 mt-3 font-heading text-primary">{name}</p>
      <p className="mt-2 flex items-center gap-2 text-caption text-muted">
        <span
          className="inline-block size-1.5 animate-pulse rounded-full bg-in-progress"
          aria-hidden="true"
        />
        {project?.stage ? `${project.stage} — ` : ""}Active project
      </p>
    </BentoTile>
  );
}
