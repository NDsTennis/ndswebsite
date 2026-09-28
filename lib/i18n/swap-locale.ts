import { locales, type Locale } from "@/content/types";

/** Rewrites `/de/foo` -> `/en/foo` (and vice versa), preserving the rest of the path. */
export function swapLocale(pathname: string, targetLocale: Locale): string {
  const segments = pathname.split("/");
  const hasLocaleSegment = segments.length > 1 && (locales as string[]).includes(segments[1]);

  if (hasLocaleSegment) {
    segments[1] = targetLocale;
    return segments.join("/") || `/${targetLocale}`;
  }

  return `/${targetLocale}${pathname}`;
}
