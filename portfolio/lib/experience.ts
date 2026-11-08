// Experience entries — bullets verbatim from content/copy.md §4.
// TODO bullets render only in development (NODE_ENV check in the component).

export interface ExperienceEntry {
  role: string;
  organization: string;
  location?: string;
  start: string; // ISO month for <time dateTime>
  end: string;
  startLabel: string;
  endLabel: string;
  bullets: string[];
  todos: string[];
}

export const experience: ExperienceEntry[] = [
  {
    role: "Full-Stack Developer Intern",
    organization: "A-Nets Cyber Solution",
    start: "2026-06",
    end: "2026-08",
    startLabel: "Jun 2026",
    endLabel: "Aug 2026",
    bullets: [
      "Built responsive front-end interfaces and back-end functionality, integrated through RESTful APIs and a database.",
      "Debugged and tested assigned features and wrote technical documentation to keep delivered code maintainable.",
      "Collaborated with the team to deliver assigned features.",
    ],
    todos: [
      "TODO: stack used — React? Node? Which database?",
      "TODO: one result — a feature shipped, a bug fixed, a metric if one exists",
      "TODO: team size or project context",
    ],
  },
  {
    role: "Lab Demonstrator, Programming Fundamentals",
    organization: "FAST-NUCES, Karachi",
    start: "2025-08",
    end: "2025-12",
    startLabel: "Aug 2025",
    endLabel: "Dec 2025",
    bullets: [
      "Taught lab sessions to 50+ students, explaining core programming concepts and guiding hands-on problem solving.",
      "Mentored students through debugging sessions and assisted with grading and written feedback.",
    ],
    todos: [
      "TODO: language(s) taught — C? Python?",
      "TODO: course code or section size",
    ],
  },
];

export const education = {
  degree: "BS Computer Science",
  school: "FAST-NUCES, Karachi",
  start: "2023",
  end: "2027",
  // TODO: GPA 3.06/4.00 — include only if confirmed (task flag unanswered)
  gpa: null as string | null,
};
