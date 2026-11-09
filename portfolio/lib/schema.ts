import { z } from "zod";

// Frontmatter schema for content/projects/*.mdx — validated at build time
// by lib/projects.ts. Field names mirror content/metrics.schema.json where
// they overlap (metrics entries).

export const projectSchema = z.object({
  title: z.string().min(1, "title is required"),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be lowercase kebab-case"),
  summary: z.string().min(1, "summary is required"),
  status: z.enum(["Live", "In progress", "Archived", "Shipped"]),
  category: z
    .array(z.enum(["Full-Stack", "AI/ML", "Mobile"]))
    .min(1, "at least one category is required"),
  featured: z.boolean(),
  order: z.number().int(),
  stack: z.array(z.string()).min(1, "stack must list at least one technology"),
  links: z
    .object({
      demo: z.string().url().optional(),
      repo: z.string().url().optional(),
      video: z.string().url().optional(),
    })
    .optional(),
  metrics: z
    .array(
      z.object({
        label: z.string().min(1),
        value: z.union([z.number(), z.string(), z.null()]),
        unit: z.string().optional(),
        note: z.string().optional(),
        source: z.string().optional(),
      }),
    )
    .optional(),
  cover: z.string().optional(),
  period: z.string().optional(),
  /** Credit role shown in the end-credits block, e.g. "Solo developer". */
  role: z.string().optional(),
  /** Chess-stage label for in-progress work: Opening | Middlegame | Endgame. */
  stage: z.enum(["Opening", "Middlegame", "Endgame"]).optional(),
  /** Tools/libraries used — "Tools" row in end credits. */
  tools: z.array(z.string()).optional(),
});

export type ProjectFrontmatter = z.infer<typeof projectSchema>;

export type Project = ProjectFrontmatter & {
  /** MDX body (everything after the frontmatter). */
  body: string;
  /** True for _-prefixed draft files — dev only, never in prod builds. */
  draft: boolean;
};

// Contact form — shared by the API route (server validation) and the
// React Hook Form resolver (client validation). Limits are deliberately
// generous but bounded.
export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(254),
  message: z.string().trim().min(10, "Message is too short").max(5000),
  /** Honeypot — must stay empty. Bots fill it; humans never see it.
      Any value is accepted by validation and dropped silently by the API. */
  website: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
