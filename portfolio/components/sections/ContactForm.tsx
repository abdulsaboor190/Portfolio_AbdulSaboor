"use client";

import { useState, type FormEvent } from "react";

const isDev = process.env.NODE_ENV === "development";

// Microcopy from content/copy.md §6. Phase 4 wires real validation
// (React Hook Form + Zod) and sending (Resend) — until then submit is
// inert by design.
export function ContactForm() {
  const [notice, setNotice] = useState<string | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isDev) setNotice("Form not connected yet");
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-name" className="text-small font-medium text-primary">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          aria-describedby="contact-name-hint"
          className="min-h-11 rounded-button border border-border-strong bg-surface px-4 text-body text-primary placeholder:text-muted focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        />
        <p id="contact-name-hint" className="sr-only">
          Your name
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-email" className="text-small font-medium text-primary">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          aria-describedby="contact-email-hint contact-email-error"
          className="min-h-11 rounded-button border border-border-strong bg-surface px-4 text-body text-primary placeholder:text-muted focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        />
        <p id="contact-email-hint" className="sr-only">
          Your email address
        </p>
        {/* Phase 4: validation error text mounts here */}
        <p id="contact-email-error" className="text-small text-error" />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className="text-small font-medium text-primary">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder="What are you working on?"
          aria-describedby="contact-message-hint"
          className="rounded-button border border-border-strong bg-surface px-4 py-3 text-body text-primary placeholder:text-muted focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        />
        <p id="contact-message-hint" className="sr-only">
          Your message
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          className="min-h-11 rounded-button bg-accent px-5 text-body font-medium text-accent-foreground transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          Send message
        </button>
        {/* Phase 4: success/error messages mount here (role="status") */}
        <p role="status" aria-live="polite" className="text-small text-muted">
          {notice}
        </p>
      </div>
    </form>
  );
}
