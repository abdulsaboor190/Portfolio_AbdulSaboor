import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/projects`, changeFrequency: "weekly", priority: 0.9 },
  ];

  for (const p of getAllProjects()) {
    if (p.draft) continue;
    routes.push({
      url: `${BASE}/projects/${p.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  return routes;
}
