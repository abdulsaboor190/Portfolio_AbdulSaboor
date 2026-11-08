"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ChartDatum } from "./MetricChart";

// Accessible by construction: the chart gets an aria-label summarising the
// data, and a <details> data table provides the same numbers to anyone who
// can't see the visual. Colours come from CSS vars so both themes work.
export default function MetricChartInner({
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
  const summary = data.map((d) => `${d.label}: ${d.value}`).join(", ");
  const Chart = kind === "line" ? LineChart : BarChart;

  return (
    <figure className="my-8">
      {title ? <figcaption className="mb-3 text-body font-medium text-primary">{title}</figcaption> : null}

      <div
        role="img"
        aria-label={title ? `${title}. ${summary}` : summary}
        className="h-64 w-full rounded-tile border border-border bg-surface p-4"
      >
        <ResponsiveContainer width="100%" height="100%">
          <Chart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
            <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: "var(--color-text-muted)", fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "var(--color-border)" }}
            />
            <YAxis
              tick={{ fill: "var(--color-text-muted)", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-button)",
                color: "var(--color-text-primary)",
                fontSize: "var(--text-small)",
              }}
            />
            {kind === "line" ? (
              <Line
                type="monotone"
                dataKey="value"
                stroke="var(--color-accent)"
                strokeWidth={2}
                dot={{ fill: "var(--color-accent)", r: 4 }}
              />
            ) : (
              <Bar dataKey="value" fill="var(--color-accent)" radius={[6, 6, 0, 0]} />
            )}
          </Chart>
        </ResponsiveContainer>
      </div>

      <details className="mt-3">
        <summary className="cursor-pointer text-caption text-muted underline-offset-4 hover:underline">
          Data table
        </summary>
        <table className="mt-2 w-full border-collapse text-small">
          <thead>
            <tr>
              <th className="border border-border px-3 py-1.5 text-left font-mono text-caption uppercase text-muted">
                {title ?? "Label"}
              </th>
              <th className="border border-border px-3 py-1.5 text-right font-mono text-caption uppercase text-muted">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.label}>
                <td className="border border-border px-3 py-1.5 text-secondary">{d.label}</td>
                <td className="border border-border px-3 py-1.5 text-right font-mono text-primary">
                  {d.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>

      {source ? <p className="mt-2 text-caption font-mono text-muted">src: {source}</p> : null}
    </figure>
  );
}
