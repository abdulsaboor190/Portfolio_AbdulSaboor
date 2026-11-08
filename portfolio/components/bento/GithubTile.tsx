import { site } from "@/lib/site-config";
import { GithubIcon } from "@/components/ui/brand-icons";
import { BentoTile } from "./BentoTile";

// Static placeholder — no fake contribution graph. Live GitHub activity
// (GraphQL API) lands in Phase 4 per content/metrics.md.
export function GithubTile() {
  const username = site.links.github.replace("https://github.com/", "");

  return (
    <BentoTile>
      <div className="flex items-center gap-2">
        <GithubIcon className="size-4 text-secondary" />
        <p className="text-caption text-muted">GitHub</p>
      </div>
      <a
        href={site.links.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${site.name} on GitHub (@${username})`}
        className="text-h3 mt-3 block font-heading text-primary no-underline transition-colors hover:text-accent"
      >
        @{username}
      </a>
      <p className="mt-2 text-caption text-muted">
        TODO: live activity in Phase 4
      </p>
    </BentoTile>
  );
}
