"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/schema";
import { site } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const inputClass =
  "min-h-11 rounded-button border border-border-strong bg-surface px-4 text-body text-primary placeholder:text-muted focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2";

// Microcopy from content/copy.md §6. Real validation (React Hook Form +
// Zod, shared with app/api/contact) and sending via Resend.
export function ContactForm() {
  const [sendError, setSendError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "", website: "" },
  });

  async function onSubmit(data: ContactInput) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => null);

      if (res.ok && json?.ok) {
        reset();
        document.getElementById("contact-status")?.focus();
        return;
      }
      if (json?.fieldErrors) {
        for (const [field, message] of Object.entries(json.fieldErrors)) {
          if (["name", "email", "message"].includes(field)) {
            setError(field as "name" | "email" | "message", { message: message as string });
          }
        }
      }
      setSendError(
        json?.error === "rate_limited"
          ? "Too many messages — please try again in a few minutes."
          : sendFailedCopy,
      );
    } catch {
      setSendError(sendFailedCopy);
    }
  }

  const sendFailedCopy = site.links.email
    ? `Something went wrong sending that. Try again, or email me directly at ${site.links.email}.`
    : "Something went wrong sending that. Try again.";

  const statusMessage = isSubmitting
    ? "Sending…"
    : isSubmitSuccessful
      ? "Message sent — I'll get back to you soon."
      : sendError;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-name" className="text-small font-medium text-primary">
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={cn("contact-name-hint", errors.name && "contact-name-error")}
          className={inputClass}
          {...register("name")}
        />
        <p id="contact-name-hint" className="sr-only">
          Your name
        </p>
        {errors.name ? (
          <p id="contact-name-error" className="text-small text-error">
            {errors.name.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-email" className="text-small font-medium text-primary">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={cn("contact-email-hint", errors.email && "contact-email-error")}
          className={inputClass}
          {...register("email")}
        />
        <p id="contact-email-hint" className="sr-only">
          Your email address
        </p>
        {errors.email ? (
          <p id="contact-email-error" className="text-small text-error">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className="text-small font-medium text-primary">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={5}
          placeholder="What are you working on?"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={cn("contact-message-hint", errors.message && "contact-message-error")}
          className={cn(inputClass, "py-3")}
          {...register("message")}
        />
        <p id="contact-message-hint" className="sr-only">
          Your message
        </p>
        {errors.message ? (
          <p id="contact-message-error" className="text-small text-error">
            {errors.message.message}
          </p>
        ) : null}
      </div>

      {/* Honeypot — hidden from humans, bots fill it and get a silent 200. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="min-h-11 rounded-button bg-accent px-5 text-body font-medium text-accent-foreground transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Sending…" : "Send message"}
        </button>
        <p
          id="contact-status"
          role="status"
          aria-live="polite"
          tabIndex={-1}
          className="text-small text-muted focus-visible:outline-none"
        >
          {statusMessage}
        </p>
      </div>
    </form>
  );
}
