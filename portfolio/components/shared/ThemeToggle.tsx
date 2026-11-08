"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

// Returns false on the server and true on the client — the React-recommended
// way to gate client-only rendering without a setState-in-effect.
const subscribe = () => () => {};
const mountedOnClient = () => true;
const mountedOnServer = () => false;

const ORDER = ["light", "dark", "system"] as const;
type ThemeChoice = (typeof ORDER)[number];

const LABELS: Record<ThemeChoice, string> = {
  light: "light",
  dark: "dark",
  system: "system",
};

function SunIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
      aria-hidden="true"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function MonitorIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
      aria-hidden="true"
    >
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <path d="M8 21h8m-4-4v4" />
    </svg>
  );
}

const ICONS: Record<ThemeChoice, () => React.ReactElement> = {
  light: SunIcon,
  dark: MoonIcon,
  system: MonitorIcon,
};

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, mountedOnClient, mountedOnServer);

  const current: ThemeChoice =
    mounted && (ORDER as readonly string[]).includes(theme ?? "")
      ? (theme as ThemeChoice)
      : "system";
  const next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];
  const Icon = ICONS[current];

  return (
    <button
      type="button"
      aria-label={`Theme: ${LABELS[current]}. Activate for ${LABELS[next]}.`}
      title={`Theme: ${LABELS[current]} → ${LABELS[next]}`}
      onClick={() => setTheme(next)}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-button",
        "border border-border bg-surface text-secondary",
        "transition-colors hover:border-border-strong hover:text-primary",
        "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
        className,
      )}
    >
      {/* Fixed-size box prevents layout shift; icon renders only after mount
          to avoid hydration mismatch (theme is unknown during SSR). */}
      <span className="inline-flex size-5 items-center justify-center">
        {mounted ? <Icon /> : null}
      </span>
    </button>
  );
}
