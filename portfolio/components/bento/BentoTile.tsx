import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

// Tile rules from docs/design-tokens.md §7:
// padding space-4 mobile / space-6 desktop, 1px border, radius-tile,
// surface bg; interactive tiles shift to surface-raised + border-strong on
// hover (150–200ms ease-out). Non-interactive tiles get NO hover affordance.
const tileBase =
  "rounded-tile border border-border bg-surface p-4 md:p-6";

const interactive =
  "transition-[color,background-color,border-color,transform,opacity] duration-150 ease-out " +
  "hover:border-border-strong hover:bg-surface-raised motion-safe:hover:-translate-y-0.5 " +
  "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2";

type CommonProps = {
  children: ReactNode;
  className?: string;
};

type TileAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

type TileAsDiv = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, "className" | "children"> & {
    href?: never;
  };

export function BentoTile(props: TileAsLink | TileAsDiv) {
  const { children, className } = props;

  // className/children inside the spread are overridden by the explicit
  // values below; casts narrow the union per element type.
  if ("href" in props && props.href) {
    return (
      <a
        {...(props as TileAsLink)}
        className={cn(tileBase, interactive, className)}
      >
        {children}
      </a>
    );
  }

  return (
    <div {...(props as TileAsDiv)} className={cn(tileBase, className)}>
      {children}
    </div>
  );
}
