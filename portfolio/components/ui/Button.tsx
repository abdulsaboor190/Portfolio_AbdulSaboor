import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-button px-5 text-body font-medium " +
  "transition-colors focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-foreground hover:bg-accent-hover",
  secondary:
    "border border-border-strong bg-surface text-primary hover:border-accent hover:text-accent",
  ghost: "text-secondary hover:text-primary hover:underline underline-offset-4",
};

type CommonProps = {
  variant?: Variant;
  className?: string;
  children?: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: never;
  };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", className, children, ...domProps } = props;
  const cls = cn(base, variants[variant], className);

  if ("href" in domProps && domProps.href) {
    return (
      <a {...(domProps as AnchorHTMLAttributes<HTMLAnchorElement>)} className={cls}>
        {children}
      </a>
    );
  }

  return (
    <button {...(domProps as ButtonHTMLAttributes<HTMLButtonElement>)} className={cls}>
      {children}
    </button>
  );
}
