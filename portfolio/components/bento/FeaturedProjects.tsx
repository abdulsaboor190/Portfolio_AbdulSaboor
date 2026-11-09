import Link from "next/link";
import { getFeaturedProjects } from "@/lib/projects";
import type { Project } from "@/lib/schema";
import type { Status } from "@/components/shared/StatusChip";
import type { ProjectTileData } from "./ProjectTile";
import { BentoGrid } from "./BentoGrid";
import { ProjectTile } from "./ProjectTile";
import { Reveal } from "@/components/shared/Reveal";

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
        <Reveal>
          <h2 id="projects-heading" className="text-h2 mb-8 text-primary md:mb-12">
            Featured projects
          </h2>
        </Reveal>
        {tiles.length > 0 ? (
          <BentoGrid>
            {tiles.map((tile, i) => (
              // Reveal wrapper carries the grid span (it is the grid item);
              // stagger ≤60ms per tile. ProjectTile keeps `size` for styling.
              <Reveal
                key={tile.slug}
                delay={i * 60}
                className={i === 0 ? "md:col-span-7 md:row-span-2" : "md:col-span-5"}
              >
                <ProjectTile project={tile} />
              </Reveal>
            ))}
          </BentoGrid>
        ) : null}
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
