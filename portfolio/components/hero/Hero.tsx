import { ArrowDown } from "lucide-react";
import { site } from "@/lib/site-config";
import { Button } from "@/components/ui/Button";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="pb-16 pt-20 md:pb-24 md:pt-32">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-mono-chip font-mono uppercase tracking-wider text-muted">
          {site.name} — {site.role}
        </p>

        <h1
          id="hero-heading"
          className="text-display mt-6 max-w-4xl font-heading font-semibold text-primary"
        >
          {site.headline}
        </h1>

        <p className="text-body mt-6 max-w-2xl text-secondary">{site.pitch}</p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button href="#projects">
            View Projects
            <ArrowDown className="size-4" aria-hidden="true" />
          </Button>
          {/* TODO: public/resume.pdf does not exist yet — link 404s until
              assets-source/resume/resume-cv-2026.pdf is optimized into
              public/. Remove or replace when the file lands. */}
          <Button href={site.resume.href} variant="secondary" download>
            {site.resume.label}
          </Button>
        </div>

        <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <li>
            <a
              href={site.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abdul Saboor on GitHub"
              className="inline-flex min-h-11 items-center gap-2 text-small text-secondary no-underline transition-colors hover:text-primary"
            >
              <GithubIcon className="size-4" />
              GitHub
            </a>
          </li>
          {site.links.linkedin ? (
            <li>
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abdul Saboor on LinkedIn"
                className="inline-flex min-h-11 items-center gap-2 text-small text-secondary no-underline transition-colors hover:text-primary"
              >
                <LinkedinIcon className="size-4" />
                LinkedIn
              </a>
            </li>
          ) : null}
          {site.links.email ? (
            <li>
              <a
                href={`mailto:${site.links.email}`}
                aria-label={`Email Abdul Saboor at ${site.links.email}`}
                className="inline-flex min-h-11 items-center gap-2 text-small text-secondary no-underline transition-colors hover:text-primary"
              >
                Email
              </a>
            </li>
          ) : null}
        </ul>
      </div>
    </section>
  );
}
