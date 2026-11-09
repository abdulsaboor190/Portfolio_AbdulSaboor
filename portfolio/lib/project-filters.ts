import type { Project } from "./schema";

// Shared filter definitions for the /projects index. The param slugs are
// URL-safe versions of the frontmatter category enum.
export const PROJECT_FILTERS = [
  { label: "All", param: null },
  { label: "Full-Stack", param: "full-stack" },
  { label: "AI/ML", param: "ai-ml" },
  { label: "Mobile", param: "mobile" },
] as const;

export type CategoryParam = (typeof PROJECT_FILTERS)[number]["param"];

export function paramToCategory(param: string | null | undefined) {
  switch (param) {
    case "full-stack":
      return "Full-Stack" as const;
    case "ai-ml":
      return "AI/ML" as const;
    case "mobile":
      return "Mobile" as const;
    default:
      return null;
  }
}

export function matchesCategory(
  project: Pick<Project, "category">,
  param: string | null | undefined,
) {
  const category = paramToCategory(param);
  return category ? project.category.includes(category) : true;
}
