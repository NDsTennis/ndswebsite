import "server-only";
import type { Dictionary, Locale } from "@/content/types";
import { defaultLocale, locales } from "@/content/types";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  de: () => import("@/content/dictionaries/de").then((m) => m.de),
  en: () => import("@/content/dictionaries/en").then((m) => m.en),
};

export const hasLocale = (value: string): value is Locale =>
  (locales as string[]).includes(value);

export async function getDictionary(locale: string): Promise<Dictionary> {
  const resolved = hasLocale(locale) ? locale : defaultLocale;
  return dictionaries[resolved]();
}
