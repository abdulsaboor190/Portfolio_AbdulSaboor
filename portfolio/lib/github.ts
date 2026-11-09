import { site } from "@/lib/site-config";

// Server-only GitHub data for the hero bento tile. Token stays server-side;
// responses are cached for 6 hours via Next.js fetch revalidation.

const REVALIDATE_SECONDS = 6 * 60 * 60; // 6h
const SPARSE_THRESHOLD = 40; // contributions/year below this → show pinned repos

export interface ContributionWeek {
  /** Total contributions in that week. */
  count: number;
}

export type GitHubActivity =
  | { kind: "contributions"; total: number; weeks: ContributionWeek[] }
  | {
      kind: "repos";
      repos: { name: string; description: string | null; language: string | null }[];
    }
  | { kind: "unavailable" };

const username =
  process.env.GITHUB_USERNAME ??
  site.links.github.replace("https://github.com/", "");

const QUERY = `
query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays { contributionCount }
        }
      }
    }
    pinnedItems(first: 6, types: REPOSITORY) {
      nodes {
        ... on Repository {
          name
          description
          primaryLanguage { name }
        }
      }
    }
  }
}`;

function weeksFromCalendar(weeks: { contributionDays: { contributionCount: number }[] }[]) {
  return weeks.map((w) => ({
    count: w.contributionDays.reduce((sum, d) => sum + d.contributionCount, 0),
  }));
}

export async function getGitHubActivity(): Promise<GitHubActivity> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return { kind: "unavailable" };

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: QUERY, variables: { login: username } }),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return { kind: "unavailable" };

    const json = await res.json();
    const user = json?.data?.user;
    if (!user) return { kind: "unavailable" };

    const calendar = user.contributionsCollection?.contributionCalendar;
    const total = calendar?.totalContributions ?? 0;
    const weeks = calendar ? weeksFromCalendar(calendar.weeks ?? []) : [];

    // Sparse graph → prefer pinned repos over an unimpressive heatmap.
    if (total >= SPARSE_THRESHOLD) {
      return { kind: "contributions", total, weeks };
    }

    const repos = (user.pinnedItems?.nodes ?? [])
      .filter((n: { name?: string } | null): n is NonNullable<typeof n> => Boolean(n?.name))
      .map((n: { name: string; description?: string | null; primaryLanguage?: { name: string } | null }) => ({
        name: n.name,
        description: n.description ?? null,
        language: n.primaryLanguage?.name ?? null,
      }));

    if (repos.length > 0) return { kind: "repos", repos };
    // Sparse graph AND no pins — still better to show the honest low number
    // than nothing? No: requirement says fall back to pinned repos; with
    // neither, show the real (low) count rather than fake data.
    return { kind: "contributions", total, weeks };
  } catch {
    return { kind: "unavailable" };
  }
}
