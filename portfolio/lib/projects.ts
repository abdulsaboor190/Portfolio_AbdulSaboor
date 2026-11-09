import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { projectSchema, type Project } from "./schema";

const CONTENT_DIR = path.join(process.cwd(), "content", "projects");

function isDraftFile(name: string) {
  return name.startsWith("_");
}

// Reads and validates every content/projects/*.mdx file. Drafts (files
// starting with "_") are included only outside production builds.
// Throws with the filename and failing field — fails `next build` loudly.
export function getAllProjects(): Project[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const includeDrafts = process.env.NODE_ENV !== "production";
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .sort();

  const projects: Project[] = [];

  for (const file of files) {
    const draft = isDraftFile(file);
    if (draft && !includeDrafts) continue;

    const fullPath = path.join(CONTENT_DIR, file);
    const { data, content } = matter(fs.readFileSync(fullPath, "utf8"));

    const parsed = projectSchema.safeParse(data);
    if (!parsed.success) {
      const issues = parsed.error.issues
        .map((i) => `${i.path.join(".") || "(root)"}: ${i.message}`)
        .join("; ");
      throw new Error(`Invalid frontmatter in content/projects/${file} — ${issues}`);
    }

    projects.push({ ...parsed.data, body: content, draft });
  }

  return projects.sort((a, b) => a.order - b.order);
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}
