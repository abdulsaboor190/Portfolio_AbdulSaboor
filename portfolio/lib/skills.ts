// Skills groups — PROPOSAL ONLY. Every item in content/copy.md §3 is marked
// TODO: confirm; nothing here is interview-confirmed yet. Delete or trim
// lines freely — this file is the single place to edit before launch.

export interface SkillGroup {
  label: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "SQL"],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "React Native", "HTML/CSS"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express", "REST API design", "JWT auth", "PostgreSQL", "Docker"],
  },
  {
    label: "Data",
    items: ["PostgreSQL", "schema design"],
  },
  {
    label: "AI/ML",
    items: ["YOLOv8", "PyTorch", "PPO", "Stable-Baselines3", "SUMO", "FastAPI"],
  },
  {
    label: "Tools",
    items: ["Git", "Docker"],
  },
];
