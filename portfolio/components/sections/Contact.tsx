import { site } from "@/lib/site-config";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { Section } from "@/components/shared/Section";
import { ContactForm } from "./ContactForm";

const isDev = process.env.NODE_ENV === "development";

// Two-line copy from content/copy.md §5.
export function Contact() {
  return (
    <Section id="contact" title="Let's build something.">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <p className="text-body text-secondary">
            I&apos;m open to new-grad and internship roles in full-stack and
            applied AI engineering.
          </p>

          {site.links.email ? (
            <a
              href={`mailto:${site.links.email}`}
              className="text-h2 mt-6 block font-heading text-primary underline decoration-accent decoration-2 underline-offset-8 transition-colors hover:text-accent"
            >
              {site.links.email}
            </a>
          ) : isDev ? (
            <p className="mt-6 text-body text-muted italic">
              TODO: set NEXT_PUBLIC_CONTACT_EMAIL — large email link renders
              here once configured
            </p>
          ) : null}

          <p className="mt-6 text-small text-muted">Or find me on</p>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-3">
            <li>
              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abdul Saboor on GitHub"
                className="inline-flex items-center gap-2 text-body text-secondary no-underline transition-colors hover:text-primary"
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
                  className="inline-flex items-center gap-2 text-body text-secondary no-underline transition-colors hover:text-primary"
                >
                  <LinkedinIcon className="size-4" />
                  LinkedIn
                </a>
              </li>
            ) : null}
          </ul>
        </div>

        <ContactForm />
      </div>
    </Section>
  );
}
