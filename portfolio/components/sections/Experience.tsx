import { education, experience } from "@/lib/experience";
import { Section } from "@/components/shared/Section";

const isDev = process.env.NODE_ENV === "development";

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="relative space-y-12 border-l border-border pl-8 md:space-y-14 md:pl-10">
        {experience.map((entry) => (
          <li key={entry.role} className="relative">
            {/* Timeline marker sits on the vertical line */}
            <span
              aria-hidden="true"
              className="absolute top-1.5 -left-[38px] size-2.5 rounded-full border-2 border-accent bg-background md:-left-[46px]"
            />

            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-h3 font-heading text-primary">{entry.role}</h3>
              <span className="text-body text-secondary">{entry.organization}</span>
            </div>

            <p className="mt-1 text-mono-chip font-mono text-muted">
              <time dateTime={entry.start}>{entry.startLabel}</time>
              {" – "}
              <time dateTime={entry.end}>{entry.endLabel}</time>
              {entry.location ? ` · ${entry.location}` : null}
            </p>

            <ul className="mt-4 space-y-2">
              {entry.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-body text-secondary">
                  <span aria-hidden="true" className="mt-[0.65em] size-1 shrink-0 rounded-full bg-muted" />
                  <span>{bullet}</span>
                </li>
              ))}
              {isDev
                ? entry.todos.map((todo) => (
                    <li
                      key={todo}
                      className="flex gap-3 text-body text-muted italic"
                    >
                      <span aria-hidden="true" className="mt-[0.65em] size-1 shrink-0 rounded-full bg-muted" />
                      <span>{todo}</span>
                    </li>
                  ))
                : null}
            </ul>
          </li>
        ))}
      </ol>

      {/* Education */}
      <div className="mt-16 rounded-tile border border-border bg-surface p-6 md:mt-20 md:p-8">
        <h3 className="text-caption font-mono uppercase tracking-wider text-muted">
          Education
        </h3>
        <p className="mt-3 text-h3 font-heading text-primary">{education.degree}</p>
        <p className="mt-1 text-body text-secondary">
          {education.school}
          {" · "}
          <time dateTime={education.start}>{education.start}</time>
          {"–"}
          <time dateTime={education.end}>{education.end}</time>
          {education.gpa ? ` · GPA ${education.gpa}` : null}
        </p>
        {isDev && !education.gpa ? (
          <p className="mt-2 text-caption text-muted italic">
            TODO: GPA 3.06/4.00 — confirm before publishing
          </p>
        ) : null}
      </div>
    </Section>
  );
}
