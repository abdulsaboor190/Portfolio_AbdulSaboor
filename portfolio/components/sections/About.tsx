import { site } from "@/lib/site-config";
import { Section } from "@/components/shared/Section";

// Paragraph verbatim from content/copy.md §1 (About).
const ABOUT_PARAGRAPH =
  "I'm Abdul Saboor, a final-year Computer Science student at FAST-NUCES, Karachi (class of 2027). I build full-stack web applications and applied AI systems — most recently a traffic control system that estimates vehicle density with YOLOv8 and adjusts signal timing with a PPO agent trained in SUMO. Before that, I worked as a Full-Stack Developer Intern at A-Nets Cyber Solution and taught programming lab sessions to 50+ students at FAST-NUCES, which is where I learned that explaining an idea clearly is part of building it well.";

const isDev = process.env.NODE_ENV === "development";

// TODO: when the headshot lands at public/media/profile-headshot.jpg,
// swap PortraitPlaceholder for:
//   <div className="relative aspect-square w-full overflow-hidden rounded-tile border border-border">
//     <Image src="/media/profile-headshot.jpg" alt="Portrait of Abdul Saboor"
//            fill sizes="(min-width: 768px) 33vw, 60vw" className="object-cover" />
//   </div>
function PortraitPlaceholder() {
  return (
    <div
      aria-hidden={process.env.NODE_ENV === "production"}
      className="flex aspect-square w-full items-center justify-center rounded-tile border border-border bg-surface-raised"
    >
      {isDev ? (
        <span className="text-caption font-mono text-muted">Photo coming</span>
      ) : null}
    </div>
  );
}

export function About() {
  return (
    <Section id="about" title="About">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
        <div className="mx-auto w-full max-w-56 md:col-span-1 md:max-w-none md:mx-0">
          <PortraitPlaceholder />
        </div>
        <div className="md:col-span-2">
          <p className="text-body text-secondary">{ABOUT_PARAGRAPH}</p>
          <p className="mt-6 text-small text-muted">
            {site.targetRole ? `${site.targetRole} · ` : null}
            {site.location}
          </p>
          {isDev && !site.targetRole ? (
            <p className="mt-2 text-caption text-muted italic">
              TODO: set site.targetRole in lib/site-config.ts (copy.md §1
              [TARGET ROLE])
            </p>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
