import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <div>
        <p className="text-mono-chip font-mono uppercase tracking-wider text-muted">404</p>
        <h1 className="text-h1 mt-2 font-heading text-primary">Page not found</h1>
        <p className="text-body mt-3 text-secondary">
          This page took a wrong turn. Let&apos;s get you back.
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          href="/"
          className="rounded-button bg-accent px-4 py-2 text-body font-medium text-accent-foreground no-underline hover:bg-accent-hover"
        >
          Back to home
        </Link>
        <Link
          href="/#projects"
          className="rounded-button border border-border-strong px-4 py-2 text-body text-primary no-underline hover:border-accent"
        >
          View projects
        </Link>
      </div>
    </div>
  );
}
