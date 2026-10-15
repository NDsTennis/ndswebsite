"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function ParallaxFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = frame.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const desktop = window.matchMedia("(min-width: 1024px)");
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!desktop.matches) {
          element.style.transform = "";
          return;
        }
        const rect = element.getBoundingClientRect();
        const offset = Math.max(-16, Math.min(16, (rect.top + rect.height / 2 - window.innerHeight / 2) * -0.025));
        element.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={frame} className={`will-change-transform ${className}`}>{children}</div>;
}
