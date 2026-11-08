import Link from "next/link";
import { featuredProjects } from "@/lib/projects-preview";
import { BentoGrid } from "./BentoGrid";
import { ProjectTile } from "./ProjectTile";

// Featured projects bento — spans per docs/wireframes.md §2:
// one large tile (7 cols × 2 rows) + medium tiles (5 cols × 1 row).
// DOM order = mobile reading order: strongest project first.
export function FeaturedProjects() {
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
        <BentoGrid>
          {featuredProjects.map((project) => (
            <ProjectTile key={project.slug} project={project} />
          ))}
        </BentoGrid>
        {/* TODO: /projects index route does not exist yet (Phase 3 MDX).
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
