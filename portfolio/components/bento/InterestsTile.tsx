import { BentoTile } from "./BentoTile";

// Primary interests — self-description, not metrics. Sourced from the
// positioning lead (full-stack + applied AI).
const INTERESTS = [
  "Full-stack engineering",
  "Applied AI/ML",
  "React & Next.js",
  "YOLOv8 & PPO",
] as const;

export function InterestsTile() {
  return (
    <BentoTile>
      <p className="text-caption text-muted">Primary interests</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {INTERESTS.map((interest) => (
          <li
            key={interest}
            className="rounded-chip border border-border px-2.5 py-1 text-mono-chip font-mono text-secondary"
          >
            {interest}
          </li>
        ))}
      </ul>
    </BentoTile>
  );
}
