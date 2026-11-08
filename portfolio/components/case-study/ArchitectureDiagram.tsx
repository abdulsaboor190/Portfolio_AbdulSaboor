import Image from "next/image";
import type { ReactNode } from "react";

// Renders inside a <figure>. Three modes:
//  - svg: inline hand-editable SVG (preferred — see TemplateDiagram below)
//  - src: raster image (requires alt + caption)
//  - neither: the built-in template diagram (replace per project)
//
// Token colors only: SVG uses var(--color-*) so it adapts to both themes.

type Props = {
  title?: string;
  caption?: string;
  svg?: ReactNode;
  src?: string;
  alt?: string;
};

export function ArchitectureDiagram({ title, caption, svg, src, alt }: Props) {
  return (
    <figure className="my-8 overflow-hidden rounded-tile border border-border bg-surface">
      <div className="flex items-center justify-center bg-surface-raised p-6 md:p-10">
        {svg ? (
          svg
        ) : src ? (
          <Image
            src={src}
            alt={alt ?? ""}
            width={960}
            height={540}
            className="h-auto w-full"
          />
        ) : (
          <TemplateDiagram />
        )}
      </div>
      {title || caption ? (
        <figcaption className="border-t border-border px-4 py-3 text-caption text-muted">
          {title ? <span className="font-mono uppercase tracking-wider">{title}</span> : null}
          {title && caption ? " — " : null}
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

// Hand-editable template: three boxes + arrows. Colors come from CSS vars,
// so it works in light and dark themes without edits. Replace box labels
// and arrows per project — keep strokes as var(--color-border-strong) and
// text as var(--color-text-primary).
export function TemplateDiagram() {
  return (
    <svg
      viewBox="0 0 720 200"
      role="img"
      aria-label="Architecture diagram template: input flows through process boxes to output"
      className="h-auto w-full max-w-2xl"
    >
      <defs>
        <marker
          id="arch-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="7"
          refY="4"
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-border-strong)" />
        </marker>
      </defs>

      {[
        { x: 20, label: "Input" },
        { x: 270, label: "Process A" },
        { x: 520, label: "Output" },
      ].map((b) => (
        <g key={b.label}>
          <rect
            x={b.x}
            y="60"
            width="180"
            height="80"
            rx="12"
            fill="var(--color-surface)"
            stroke="var(--color-border-strong)"
            strokeWidth="1.5"
          />
          <text
            x={b.x + 90}
            y="106"
            textAnchor="middle"
            fill="var(--color-text-primary)"
            fontFamily="var(--font-mono)"
            fontSize="14"
          >
            {b.label}
          </text>
        </g>
      ))}

      <line
        x1="205"
        y1="100"
        x2="265"
        y2="100"
        stroke="var(--color-border-strong)"
        strokeWidth="1.5"
        markerEnd="url(#arch-arrow)"
      />
      <line
        x1="455"
        y1="100"
        x2="515"
        y2="100"
        stroke="var(--color-border-strong)"
        strokeWidth="1.5"
        markerEnd="url(#arch-arrow)"
      />
    </svg>
  );
}
