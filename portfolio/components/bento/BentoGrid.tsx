import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// 12-column grid; children control their own spans via className
// (e.g. "md:col-span-7 md:row-span-2" for the featured-project large tile).
export function BentoGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-1 gap-[var(--gap-bento)] md:grid-cols-12", className)}>
      {children}
    </div>
  );
}
