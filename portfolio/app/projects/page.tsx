import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllProjects } from "@/lib/projects";
import type { Project } from "@/lib/schema";
import type { Status } from "@/components/shared/StatusChip";
import type { ProjectTileData } from "@/components/bento/ProjectTile";
import { ProjectTile } from "@/components/bento/ProjectTile";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { matchesCategory } from "@/lib/project-filters";
import { site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Things Abdul Saboor has built — full-stack systems and applied AI/ML projects.",
  openGraph: {
    title: "Projects — Abdul Saboor",
    description:
      "Things Abdul Saboor has built — full-stack systems and applied AI/ML projects.",
    type: "website",
  },
};

const STATUS_MAP: Record<Project["status"], Status> = {
  Live: "live",
  "In progress": "in-progress",
  Archived: "archived",
  Shipped: "shipped",
};

function toTileData(project: Project): ProjectTileData {
  return {
    slug: project.slug,
    title: project.title,
    outcome: project.summary,
    stack: project.stack,
    status: STATUS_MAP[project.status],
    size: "card",
    cover: project.cover,
  };
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: param } = await searchParams;

  const all = getAllProjects()
    .filter((p) => !p.draft)
    .sort((a, b) => a.order - b.order);
  const visible = all.filter((p) => matchesCategory(p, param));

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8 md:py-24">
      <header className="max-w-prose">
        <h1 className="font-heading text-display text-primary">Projects</h1>
        {/* TODO: replace with the real intro line once one is added to copy.md */}
        <p className="mt-4 text-body text-secondary">
          Things I&apos;ve built — full-stack systems and applied AI/ML.
        </p>
        <p className="mt-3 text-small text-muted">
          More on{" "}
          <a
            href={site.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline-offset-4 hover:underline"
          >
            GitHub
          </a>
          .
        </p>
      </header>

      <div className="mt-10">
        <Suspense>
          <ProjectFilters resultCount={visible.length} totalCount={all.length} />
        </Suspense>
      </div>

      {visible.length === 0 ? (
        <p className="mt-12 rounded-tile border border-border bg-surface p-8 text-center text-body text-secondary">
          Nothing filed under this category yet. Try another filter, or check
          back soon.
        </p>
      ) : (
        <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) => (
            <li key={project.slug}>
              <ProjectTile project={toTileData(project)} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
