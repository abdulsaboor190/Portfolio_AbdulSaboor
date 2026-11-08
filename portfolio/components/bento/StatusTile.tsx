import { site } from "@/lib/site-config";
import { BentoTile } from "./BentoTile";
import { StatusChip } from "@/components/shared/StatusChip";

export function StatusTile() {
  return (
    <BentoTile>
      <div className="flex items-start justify-between gap-3">
        <p className="text-caption text-muted">Currently building</p>
        <StatusChip status="in-progress" />
      </div>
      <p className="text-h3 mt-3 font-heading text-primary">{site.currentlyBuilding}</p>
      <p className="mt-2 flex items-center gap-2 text-caption text-muted">
        <span
          className="inline-block size-1.5 animate-pulse rounded-full bg-in-progress"
          aria-hidden="true"
        />
        Active project
      </p>
    </BentoTile>
  );
}
