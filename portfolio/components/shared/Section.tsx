import type { ReactNode } from "react";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
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
    <section
      id={id}
      className={cn("scroll-mt-20 py-16 md:scroll-mt-24 md:py-24", className)}
    >
      <Container>
        {title ? (
          <Reveal>
            <h2 className="text-h2 mb-8 text-primary md:mb-12">{title}</h2>
          </Reveal>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
