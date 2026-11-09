import Link from "next/link";
import { getFeaturedProjects } from "@/lib/projects";
import type { Project } from "@/lib/schema";
import type { Status } from "@/components/shared/StatusChip";
import type { ProjectTileData } from "./ProjectTile";
import { BentoGrid } from "./BentoGrid";
import { ProjectTile } from "./ProjectTile";

const STATUS_MAP: Record<Project["status"], Status> = {
  Live: "live",
  "In progress": "in-progress",
  Archived: "archived",
  Shipped: "shipped",
};

function toTileData(project: Project, index: number): ProjectTileData {
  return {
    slug: project.slug,
    title: project.title,
    outcome: project.summary,
    stack: project.stack,
    status: STATUS_MAP[project.status],
    // First featured project (lowest `order`) gets the large tile.
    size: index === 0 ? "large" : "medium",
    cover: project.cover,
    coverAlt: `${project.title} cover`,
  };
}

// Featured projects bento — spans per docs/wireframes.md §2:
// one large tile (7 cols × 2 rows) + medium tiles (5 cols × 1 row).
// DOM order = mobile reading order: strongest project first.
export function FeaturedProjects() {
  const tiles = getFeaturedProjects().map(toTileData);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-20 pb-16 md:scroll-mt-24 md:pb-24"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 id="projects-heading" className="text-h2 mb-8 text-primary md:mb-12">
          Featured projects
        </h2>
        {tiles.length > 0 ? (
          <BentoGrid>
            {tiles.map((tile) => (
              <ProjectTile key={tile.slug} project={tile} />
            ))}
          </BentoGrid>
        ) : null}
        {/* TODO: /projects index route does not exist yet (Phase 3).
            Link will 404 until then — intentional placeholder. */}
        <p className="mt-8">
          <Link
            href="/projects"
            className="inline-flex min-h-11 items-center text-small text-accent underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            View all projects →
          </Link>
        </p>
      </div>
    </section>
  );
}
