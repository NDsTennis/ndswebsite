export type Locale = "de" | "en";

export const locales: Locale[] = ["de", "en"];
export const defaultLocale: Locale = "de";

export interface NavDictionary {
  about: string;
  experience: string;
  training: string;
  reviews: string;
  contact: string;
  cta: string;
  languageLabel: string;
  skipToContent: string;
}

export interface HeroDictionary {
  eyebrow: string;
  name: string;
  subline: string;
  ctaPrimary: string;
  ctaSecondary: string;
  photoPlaceholderLabel: string;
  metrics: Array<{ value: string; label: string }>;
}

export interface AboutDictionary {
  eyebrow: string;
  heading: string;
  intro: string[];
  playerHeading: string;
  playerParagraphs: string[];
  philosophyHeading: string;
  philosophyQuote: string;
  philosophyParagraphs: string[];
  clubsHeading: string;
  clubsNote: string;
  photoPlaceholderLabel: string;
}

export interface ServiceCopy {
  key: string;
  label: string;
  description: string;
}

export interface TrainingDictionary {
  eyebrow: string;
  heading: string;
  intro: string;
  services: ServiceCopy[];
  onlineNote: string;
  ctaIndividual: string;
  ctaClubs: string;
  noPricingNote: string;
}

export interface GalleryDictionary {
  eyebrow: string;
  heading: string;
  intro: string;
  items: Array<{ src: string; alt: string }>;
}

export interface ReviewsDictionary {
  eyebrow: string;
  heading: string;
  intro: string;
  emptyStateHeading: string;
  emptyStateBody: string;
  averageLabel: string;
  /** Use countOne for count === 1, countOther otherwise (with "{count}" replaced). */
  countOne: string;
  countOther: string;
  formHeading: string;
  formName: string;
  formNamePlaceholder: string;
  formRating: string;
  formMessage: string;
  formMessagePlaceholder: string;
  formSubmit: string;
  formPendingNotice: string;
  formSuccessHeading: string;
  formSuccessBody: string;
  formErrorBody: string;
  formUnavailable: string;
}

export interface ContactIntent {
  value: string;
  label: string;
}

export interface ContactDictionary {
  eyebrow: string;
  heading: string;
  intro: string;
  formName: string;
  formEmail: string;
  formPhone: string;
  formPhoneOptional: string;
  formIntent: string;
  formIntents: ContactIntent[];
  formMessage: string;
  formMessagePlaceholder: string;
  formConsentPrefix: string;
  formConsentLinkLabel: string;
  formConsentSuffix: string;
  formSubmit: string;
  formSuccessHeading: string;
  formSuccessBody: string;
  formErrorBody: string;
  formUnavailable: string;
  directHeading: string;
  emailLabel: string;
  whatsappLabel: string;
}

export interface FooterDictionary {
  tagline: string;
  navHeading: string;
  legalHeading: string;
  impressum: string;
  datenschutz: string;
  rights: string;
}

export interface LegalDictionary {
  title: string;
  intro: string;
  pendingNotice: string;
}

export interface StickyCtaDictionary {
  label: string;
  whatsapp: string;
}

export interface Dictionary {
  locale: Locale;
  htmlLang: string;
  meta: {
    title: string;
    description: string;
  };
  nav: NavDictionary;
  hero: HeroDictionary;
  about: AboutDictionary;
  training: TrainingDictionary;
  gallery: GalleryDictionary;
  reviews: ReviewsDictionary;
  contact: ContactDictionary;
  footer: FooterDictionary;
  legal: {
    impressum: LegalDictionary;
    datenschutz: LegalDictionary;
  };
  stickyCta: StickyCtaDictionary;
}
