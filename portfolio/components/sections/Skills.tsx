import { skillGroups } from "@/lib/skills";
import { Section } from "@/components/shared/Section";

// Editorial skills section — grouped description list, NOT bento tiles.
// Items render as an inline list with subtle separators; no bars, ratings,
// or logo grids (per docs/design-tokens.md rules).
export function Skills() {
  return (
    <Section id="skills" title="Skills">
      <dl className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-[13rem_1fr] md:gap-y-8">
        {skillGroups.map((group) => (
          <div key={group.label} className="contents">
            <dt className="text-mono-chip font-mono uppercase tracking-wider text-muted">
              {group.label}
            </dt>
            <dd>
              <ul className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
                {group.items.map((item, i) => (
                  <li key={item} className="flex items-baseline gap-x-3">
                    {i > 0 ? (
                      <span aria-hidden="true" className="text-muted">
                        ·
                      </span>
                    ) : null}
                    <span className="text-body text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
