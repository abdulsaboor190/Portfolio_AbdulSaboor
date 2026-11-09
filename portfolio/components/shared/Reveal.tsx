"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";

// Scroll reveal: fade + ≤12px upward slide, once, <400ms.
// No-JS safe: the hidden start state is applied in useLayoutEffect (client
// only) — SSR/no-JS HTML is fully visible. Reduced motion → no animation.
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  /** Stagger delay in ms (keep ≤60ms steps per design rules). */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion) return;

    // Hide before first animated frame (layout effect timing avoids flash).
    el.style.opacity = "0";
    el.style.transform = "translateY(12px)";

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.disconnect();
          el.animate(
            [
              { opacity: 0, transform: "translateY(12px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            {
              duration: 350,
              delay,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              fill: "both",
            },
          );
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay, reduceMotion]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
