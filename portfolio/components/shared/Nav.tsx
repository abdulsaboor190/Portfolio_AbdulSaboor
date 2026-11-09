"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { ThemeToggle } from "./ThemeToggle";

const LINKS = [
  { label: "Projects", hash: "#projects" },
  { label: "About", hash: "#about" },
  { label: "Experience", hash: "#experience" },
  { label: "Contact", hash: "#contact" },
] as const;

function hrefFor(hash: string, pathname: string) {
  return pathname === "/" ? hash : `/${hash}`;
}

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [lastPath, setLastPath] = useState(pathname);

  // Close the disclosure menu on route change (adjust-state-during-render
  // pattern — the menu must not survive navigation).
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm transition-colors",
        scrolled ? "border-border" : "border-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-h3 font-heading text-primary no-underline hover:text-accent"
        >
          Abdul Saboor
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.hash}
              href={hrefFor(l.hash, pathname)}
              className="text-small text-secondary no-underline transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            ref={buttonRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-11 items-center justify-center rounded-button border border-border bg-surface text-secondary focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="size-5"
              aria-hidden="true"
            >
              {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </Container>

      {open ? (
        <div
          id="mobile-nav"
          ref={menuRef}
          className="border-t border-border bg-background md:hidden"
        >
          <Container className="flex flex-col py-2">
            {LINKS.map((l) => (
              <a
                key={l.hash}
                href={hrefFor(l.hash, pathname)}
                onClick={() => setOpen(false)}
                className="py-3 text-body text-secondary no-underline transition-colors hover:text-primary"
              >
                {l.label}
              </a>
            ))}
          </Container>
        </div>
      ) : null}
    </header>
  );
}
