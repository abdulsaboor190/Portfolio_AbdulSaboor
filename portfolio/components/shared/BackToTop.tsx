"use client";

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="text-small text-secondary underline-offset-4 hover:text-primary hover:underline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
    >
      Back to top
    </button>
  );
}
