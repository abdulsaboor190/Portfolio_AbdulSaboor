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

export function MetricChart({
  data,
  title,
  kind = "bar",
  source,
}: {
  data: ChartDatum[];
  title?: string;
  kind?: "bar" | "line";
  source?: string;
}) {
  if (!data.length) return null;
  return <MetricChartInner data={data} title={title} kind={kind} source={source} />;
}
