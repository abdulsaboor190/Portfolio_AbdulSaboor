import type { ComponentProps } from "react";
import type { Status } from "@/components/shared/StatusChip";

// Temporary typed data until the MDX pipeline exists (Phase 3).
// Content sourced ONLY from content/copy.md project summaries and
// docs/project-shortlist.md featured order. No metrics — none have real
// values in content/metrics.md yet.

export type ProjectSize = "large" | "medium";

export interface ProjectPreview {
  slug: string;
  title: string;
  outcome: string;
  stack: string[];
  status: Status;
  size: ProjectSize;
  /** Path under public/, e.g. "/media/projects/ticketflow-cover.png".
      Undefined until assets are captured (assets-source/ checklist). */
  cover?: string;
  coverAlt?: string;
}

export const featuredProjects: ProjectPreview[] = [
  {
    slug: "traffic-control",
    title: "AI-Powered Adaptive Traffic Control",
    outcome:
      "A working simulation where computer vision and reinforcement learning adjust traffic signals in real time.",
    stack: ["Python", "YOLOv8", "PyTorch", "PPO", "SUMO", "FastAPI", "React", "WebSockets"],
    status: "shipped",
    size: "large",
  },
  {
    slug: "ticketflow",
    title: "TicketFlow",
    outcome:
      "A role-based ticketing system that moves campus maintenance requests through a defined workflow.",
    stack: ["Next.js", "TypeScript", "Node.js", "Express", "PostgreSQL", "JWT"],
    status: "shipped",
    size: "medium",
  },
  {
    slug: "scholr",
    title: "Scholr",
    outcome: "A campus-only mobile app for giving books a second life.",
    stack: ["React Native", "Node.js", "Docker"],
    status: "shipped",
    size: "medium",
  },
  // ShieldHer intentionally excluded: docs/project-shortlist.md gates it on
  // a working demo or public repo, and content/copy.md has no description
  // yet. It belongs in "More projects" until both exist.
];
