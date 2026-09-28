"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/content/types";
import { swapLocale } from "@/lib/i18n/swap-locale";

export function LanguageSwitcher({
  locale,
  label,
  tone = "dark",
}: {
  locale: Locale;
  label: string;
  tone?: "dark" | "light";
}) {
  const pathname = usePathname();
  const inactiveClass = tone === "dark" ? "text-ink/50 hover:text-ink" : "text-cream/60 hover:text-cream";
  const activeClass = tone === "dark" ? "text-ink" : "text-cream";

  return (
    <div className="flex items-center gap-1.5 text-sm font-medium" aria-label={label}>
      {locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-1.5">
          <Link
            href={swapLocale(pathname, loc)}
            aria-current={loc === locale ? "true" : undefined}
            className={loc === locale ? activeClass : inactiveClass}
          >
            {loc.toUpperCase()}
          </Link>
          {i < locales.length - 1 && (
            <span aria-hidden="true" className={tone === "dark" ? "text-ink/30" : "text-cream/30"}>
              /
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
