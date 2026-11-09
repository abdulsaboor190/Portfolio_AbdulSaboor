import type { Project } from "@/lib/schema";

// Quiet end-credits block, rendered automatically by CaseStudyLayout from
// frontmatter. Description list only — no animation, no cards.
export function Credits({ project }: { project: Project }) {
  const links = project.links ?? {};
  const hasLinks = links.demo || links.repo || links.video;

  return (
    <section aria-label="Credits" className="mt-16 border-t border-rule pt-8">
      <h2 className="text-caption font-mono uppercase tracking-wider text-muted">
        Credits
      </h2>
      <dl className="mt-4 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
        {project.role ? (
          <div>
            <dt className="text-caption text-muted">Role</dt>
            <dd className="text-body text-primary">{project.role}</dd>
          </div>
        ) : null}
        {project.stack.length > 0 ? (
          <div>
            <dt className="text-caption text-muted">Cast</dt>
            <dd className="text-body text-secondary">{project.stack.join(", ")}</dd>
          </div>
        ) : null}
        {project.tools && project.tools.length > 0 ? (
          <div>
            <dt className="text-caption text-muted">Tools</dt>
            <dd className="text-body text-secondary">{project.tools.join(", ")}</dd>
          </div>
        ) : null}
        {project.period ? (
          <div>
            <dt className="text-caption text-muted">Period</dt>
            <dd className="text-body text-secondary">{project.period}</dd>
          </div>
        ) : null}
        {hasLinks ? (
          <div>
            <dt className="text-caption text-muted">Links</dt>
            <dd className="flex flex-wrap gap-x-4 gap-y-1 text-body">
              {links.demo ? (
                <a
                  href={links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline-offset-4 hover:underline"
                >
                  Demo
                </a>
              ) : null}
              {links.repo ? (
                <a
                  href={links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline-offset-4 hover:underline"
                >
                  Repo
                </a>
              ) : null}
              {links.video ? (
                <a
                  href={links.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline-offset-4 hover:underline"
                >
                  Video
                </a>
              ) : null}
            </dd>
          </div>
        ) : null}
      </dl>
    </section>
  );
}
