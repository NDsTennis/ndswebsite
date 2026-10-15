"use client";

import { useEffect, useRef, useState } from "react";

export function BallFlight() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setStarted(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className={`ball-flight ${started ? "is-started" : ""}`}>
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-20 w-full sm:h-24">
        <path className="flight-path" d="M8 94 C 270 94, 340 20, 610 34 S 920 100, 1192 20" />
      </svg>
      <span className="flight-ball" />
    </div>
  );
}
