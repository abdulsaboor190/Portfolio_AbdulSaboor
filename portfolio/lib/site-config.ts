// Single source of truth for site-wide identity and links.
// TODO items are filled in as real values become available — never hardcode
// personal URLs or emails in components.

export const site = {
  name: "Abdul Saboor",
  role: "Full-stack developer & applied AI builder",
  location: "Karachi, Pakistan",
  education: "Final-year CS student, FAST-NUCES (class of 2027)",

  // Headline + pitch — docs/positioning.md, options A (recommended)
  headline: "I build full-stack products that think with AI.",
  pitch:
    "Full-stack developer (React, Next.js, Node.js, PostgreSQL) and applied AI builder — from campus tools to adaptive traffic control.",

  // Hero bento strip — "currently building" tile value
  currentlyBuilding: "ShieldHer",

  links: {
    github: process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/abdulsaboor190",
    // TODO: add LinkedIn URL to .env.local as NEXT_PUBLIC_LINKEDIN_URL
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? null,
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? null,
  },

  resume: {
    // TODO: add public/resume.pdf (see assets-source/resume/ checklist)
    href: "/resume.pdf",
    label: "Download Resume",
  },
} as const;
