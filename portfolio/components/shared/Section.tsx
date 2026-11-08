import type { ReactNode } from "react";
import { Container } from "./Container";
import { cn } from "@/lib/utils";

export function Section({
  id,
  title,
  children,
  className,
}: {
  id?: string;
  title?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)}>
      <Container>
        {title ? (
          <h2 className="text-h2 mb-8 text-primary md:mb-12">{title}</h2>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
