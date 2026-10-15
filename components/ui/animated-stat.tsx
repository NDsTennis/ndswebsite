"use client";

import { useEffect, useRef, useState } from "react";
import { Stat } from "@/components/ui/stat";
import type { Locale } from "@/content/types";

export function AnimatedStat({
  value,
  label,
  locale,
}: {
  value: string;
  label: string;
  locale: Locale;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(value);

  useEffect(() => {
    const match = value.match(/^(\d[\d.,]*)(.*)$/);
    if (!match) return;
    const target = Number(match[1].replace(/[.,]/g, ""));
    const suffix = match[2];
    const element = ref.current;
    if (!element) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finish = () => setCurrent(value);
    if (reduced || !("IntersectionObserver" in window)) {
      finish();
      return;
    }

    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const duration = 950;
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        const number = Math.round(target * eased).toLocaleString(
          locale === "de" ? "de-DE" : "en-US"
        );
        setCurrent(`${number}${suffix}`);
        if (progress < 1) frame = requestAnimationFrame(tick);
        else setCurrent(value);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.35 });
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [locale, value]);

  return (
    <div ref={ref} aria-label={`${value} ${label}`}>
      <Stat value={current} label={label} tone="light" />
    </div>
  );
}
