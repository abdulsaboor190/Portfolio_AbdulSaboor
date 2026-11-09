"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { PROJECT_FILTERS } from "@/lib/project-filters";

// Client-side filter buttons. Without JS the buttons don't work, but the
// page still renders server-filtered results for any ?category= in the URL
// and all projects otherwise — so nothing is hidden.
export function ProjectFilters({
  resultCount,
  totalCount,
}: {
  resultCount: number;
  totalCount: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get("category");

  function select(param: string | null) {
    const qs = param ? `?category=${param}` : "";
    router.replace(`/projects${qs}`, { scroll: false });
  }

  return (
    <div>
      <div
        role="group"
        aria-label="Filter projects by category"
        className="flex flex-wrap gap-2"
      >
        {PROJECT_FILTERS.map((f) => {
          const isActive = f.param === null ? !active : active === f.param;
          return (
            <button
              key={f.label}
              type="button"
              aria-pressed={isActive}
              onClick={() => select(f.param)}
              className={cn(
                "min-h-11 rounded-chip border px-4 text-small font-medium transition-colors duration-200",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                isActive
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border bg-surface text-primary hover:border-border-strong hover:bg-surface-raised",
              )}
            >
              {f.label}
            </button>
          );
        })}
      </div>
      <p aria-live="polite" className="mt-3 text-caption font-mono text-muted">
        {resultCount === totalCount
          ? `${totalCount} project${totalCount === 1 ? "" : "s"}`
          : `${resultCount} of ${totalCount} projects`}
      </p>
    </div>
  );
}
