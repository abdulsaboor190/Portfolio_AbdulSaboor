import { ImageResponse } from "next/og";
import { getProjectBySlug, getAllProjects } from "@/lib/projects";

// Dynamic OG card per case study: title, summary, stack tags.
// Token colors mirrored as literals — keep in sync with tokens.css.
export const alt = "Project case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllProjects()
    .filter((p) => !p.draft)
    .map((p) => ({ slug: p.slug }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return new ImageResponse(
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#FAF7F2" }} />,
      size,
    );
  }

  const tags = project.stack.slice(0, 4);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          padding: "80px",
          background: "#FAF7F2",
          color: "#1C1917",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 20,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#C2410C",
            marginBottom: 24,
          }}
        >
          {project.category.join(" · ")}
          {project.period ? ` — ${project.period}` : ""}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 84,
            fontWeight: 600,
            lineHeight: 1.05,
          }}
        >
          {project.title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            marginTop: 28,
            color: "#57534E",
            maxWidth: 1000,
            lineHeight: 1.3,
          }}
        >
          {project.summary}
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 48 }}>
          {tags.map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: 22,
                padding: "8px 20px",
                border: "1px solid #D6D3D1",
                borderRadius: 999,
                color: "#57534E",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
