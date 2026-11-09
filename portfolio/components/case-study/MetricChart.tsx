"use client";

import dynamic from "next/dynamic";

// Recharts is heavy — loaded only when a case study actually renders a
// chart, and never during SSR (keeps it out of the shared bundle).
const MetricChartInner = dynamic(() => import("./MetricChartInner"), {
  ssr: false,
  loading: () => (
    <div className="my-8 h-64 animate-pulse rounded-tile border border-border bg-surface" />
  ),
});

export type ChartDatum = { label: string; value: number };

function parseData(data: ChartDatum[] | string | undefined): ChartDatum[] {
  if (Array.isArray(data)) return data;
  if (typeof data === "string") {
    try {
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

export function MetricChart({
  data,
  title,
  kind = "bar",
  source,
}: {
  // MDX prop expressions don't always survive next-mdx-remote — a JSON
  // string like data='[{"label":"A","value":1}]' is the reliable form.
  data: ChartDatum[] | string;
  title?: string;
  kind?: "bar" | "line";
  source?: string;
}) {
  const points = parseData(data);
  if (points.length === 0) {
    if (process.env.NODE_ENV === "development") {
      console.log("[MetricChart] missing/invalid data prop:", data);
    }
    return null;
  }
  return <MetricChartInner data={points} title={title} kind={kind} source={source} />;
}
