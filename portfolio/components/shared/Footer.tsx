import Link from "next/link";
import { BackToTop } from "./BackToTop";
import { Container } from "./Container";

const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/abdulsaboor190";
const LINKEDIN_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL;
const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8">
      <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-caption text-muted">© {year} Abdul Saboor</p>
        <nav aria-label="Footer" className="flex items-center gap-6">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center text-small text-secondary no-underline hover:text-primary"
          >
            GitHub
          </a>
          {LINKEDIN_URL ? (
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center text-small text-secondary no-underline hover:text-primary"
            >
              LinkedIn
            </a>
          ) : null}
          {EMAIL ? (
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex min-h-11 items-center text-small text-secondary no-underline hover:text-primary"
            >
              Email
            </a>
          ) : (
            <Link
              href="/#contact"
              className="inline-flex min-h-11 items-center text-small text-secondary no-underline hover:text-primary"
            >
              Email
            </Link>
          )}
          <BackToTop />
        </nav>
      </Container>
    </footer>
  );
}
