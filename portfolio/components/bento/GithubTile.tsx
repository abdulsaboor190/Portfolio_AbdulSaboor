import { site } from "@/lib/site-config";
import { getGitHubActivity } from "@/lib/github";
import { GithubIcon } from "@/components/ui/brand-icons";
import { BentoTile } from "./BentoTile";

// Live GitHub tile — server component, token never reaches the client.
// Data: contribution calendar (≥40/yr) or pinned repos fallback; static
// username card if the API is unreachable. No fake graphs.
export async function GithubTile() {
  const username =
    process.env.GITHUB_USERNAME ??
    site.links.github.replace("https://github.com/", "");
  const activity = await getGitHubActivity();

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

      {activity.kind === "contributions" ? (
        <ContributionView total={activity.total} weeks={activity.weeks} />
      ) : activity.kind === "repos" ? (
        <RepoList repos={activity.repos} />
      ) : (
        <p className="mt-2 text-caption text-muted">
          Live activity unavailable right now.
        </p>
      )}
    </BentoTile>
  );
}

function ContributionView({
  total,
  weeks,
}: {
  total: number;
  weeks: { count: number }[];
}) {
  const max = Math.max(1, ...weeks.map((w) => w.count));
  return (
    <div className="mt-3">
      {/* Decorative weekly cells — the text summary carries the meaning. */}
      <div aria-hidden="true" className="flex h-12 items-end gap-[3px]">
        {weeks.map((w, i) => {
          const intensity = w.count === 0 ? 0 : Math.min(1, w.count / max);
          return (
            <div
              key={i}
              className="flex-1 rounded-sm bg-accent/20"
              style={{
                height: `${Math.max(8, intensity * 100)}%`,
                opacity: w.count === 0 ? 0.35 : 0.4 + intensity * 0.6,
              }}
            />
          );
        })}
      </div>
      <p className="mt-2 text-caption text-muted">
        {total.toLocaleString()} contributions in the last year
      </p>
    </div>
  );
}

function RepoList({
  repos,
}: {
  repos: { name: string; description: string | null; language: string | null }[];
}) {
  return (
    <ul className="mt-3 space-y-1.5">
      {repos.slice(0, 4).map((r) => (
        <li key={r.name} className="text-small">
          <span className="font-medium text-primary">{r.name}</span>
          {r.language ? (
            <span className="text-caption text-muted"> · {r.language}</span>
          ) : null}
          {r.description ? (
            <span className="block text-caption text-muted">{r.description}</span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
