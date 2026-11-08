import { cn } from "@/lib/utils";

export type Status = "live" | "in-progress" | "archived" | "error" | "shipped";

const statusColor: Record<Status, string> = {
  live: "text-live",
  "in-progress": "text-in-progress",
  archived: "text-archived",
  error: "text-error",
  shipped: "text-accent",
};

const dotColor: Record<Status, string> = {
  live: "bg-live",
  "in-progress": "bg-in-progress",
  archived: "bg-archived",
  error: "bg-error",
  shipped: "bg-accent",
};

const labels: Record<Status, string> = {
  live: "Live",
  "in-progress": "In progress",
  archived: "Archived",
  error: "Error",
  shipped: "Shipped",
};

// Status is never color-alone: every chip renders a dot AND a text label.
export function StatusChip({
  status,
  className,
}: {
  status: Status;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-chip border border-border px-2.5 py-0.5",
        "text-mono-chip font-mono",
        statusColor[status],
        className,
      )}
    >
      <span
        className={cn("inline-block size-1.5 rounded-full", dotColor[status])}
        aria-hidden="true"
      />
      {labels[status]}
    </span>
  );
}
