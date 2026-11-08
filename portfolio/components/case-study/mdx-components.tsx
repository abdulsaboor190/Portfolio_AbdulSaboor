// MDX component map for case-study bodies (next-mdx-remote/rsc `components`
// prop). Import this in app/projects/[slug]/page.tsx.
//
// Usage inside MDX:
//   <Callout variant="decision">…</Callout>
//   <ArchitectureDiagram title="System overview" caption="…" />
//   <VideoEmbed src="/media/projects/x-clip.mp4" caption="…" />
//   <Figure src="/media/projects/x.png" alt="…" caption="…" />
//   <MetricChart data={[{label:"Baseline",value:42},{label:"PPO",value:31}]} source="…" />

import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { Callout } from "./Callout";
import { Figure } from "./Figure";
import { MetricChart } from "./MetricChart";
import { VideoEmbed } from "./VideoEmbed";

export const mdxComponents = {
  ArchitectureDiagram,
  Callout,
  Figure,
  MetricChart,
  VideoEmbed,
};
