/**
 * Central, non-translated site configuration.
 * Translated copy lives in content/dictionaries/{de,en}.ts.
 */

export const siteConfig = {
  brand: "NDS",
  legalName: "Dumitrescu Vlad Andreeas",
  publicName: "Andy Dumitrescu",
  domain: "nds-game.com",
  siteUrl: "https://nds-game.com",
} as const;

/**
 * IMPORTANT: the final slogan has not been selected yet.
 * Edit these two lines only — every part of the site reads the slogan from here.
 */
export const heroSlogan = {
  de: "Schärfe dein Spiel.",
  en: "Sharpen your Game.",
} as const;

/**
 * Section/anchor ids used for in-page nav scrolling (locale-independent).
 * "about" and "experience" are two anchors inside the same editorial
 * About/Experience section (see components/sections/about-section.tsx),
 * matching the brief's 5-item nav (Über mich / Erfahrung / Training /
 * Bewertungen / Kontakt) without splitting it into two separate sections.
 */
export const sectionIds = {
  about: "ueber-mich",
  experience: "erfahrung",
  training: "training",
  reviews: "bewertungen",
  contact: "kontakt",
} as const;

/**
 * Contact placeholders. Real values are not finalized — provide them via
 * environment variables. Defaults here are obviously fake so local dev and
 * previews never leak or imply real contact information.
 */
export const contactConfig = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "info@example.com",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "", // digits only, e.g. "491511234567"
} as const;

export const socialLinks = {
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
} as const;
