import { ImageResponse } from "next/og";
import { site } from "@/lib/site-config";

// Title-card style OG image: name in display serif, headline, accent rule.
// Token colors mirrored as literals (OG images can't read CSS vars) —
// keep in sync with styles/tokens.css light-theme values.
export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#C2410C",
            marginBottom: 24,
          }}
        >
          {site.role}
        </div>
        <div style={{ display: "flex", fontSize: 96, fontWeight: 600, lineHeight: 1.05 }}>
          {site.name}
        </div>
        <div style={{ display: "flex", fontSize: 34, marginTop: 28, color: "#57534E" }}>
          {site.headline}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 48,
            width: 120,
            height: 4,
            background: "#166534",
          }}
        />
      </div>
    ),
    size,
  );
}
