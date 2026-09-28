import type { Dictionary } from "../types";

export const en: Dictionary = {
  locale: "en",
  htmlLang: "en",
  meta: {
    title: "NDS – Personal Tennis Coaching with Andy Dumitrescu",
    description:
      "Individual tennis coaching in Cologne and Bonn with Andy Dumitrescu. Experience from competitive tennis, combined with a personal, modern coaching approach.",
  },
  nav: {
    about: "About",
    experience: "Experience",
    training: "Training",
    reviews: "Reviews",
    contact: "Contact",
    cta: "Request training",
    languageLabel: "Language",
    skipToContent: "Skip to content",
  },
  hero: {
    eyebrow: "Personal Tennis Coaching",
    name: "Andy Dumitrescu",
    subline:
      "Individual tennis coaching with Andy Dumitrescu. Experience from competitive tennis, combined with a personal and modern coaching approach.",
    ctaPrimary: "Request training",
    ctaSecondary: "Learn more",
    photoPlaceholderLabel: "Professional portrait photo coming soon",
    metrics: [
      { value: "5,000+", label: "players coached over 10 years" },
      { value: "10+", label: "years of coaching experience" },
      { value: "5", label: "current club locations" },
      { value: "20+", label: "coaches in the professional network" },
    ],
  },
  about: {
    eyebrow: "About",
    heading: "From competitive tennis to individual coaching",
    intro: [
      "Andy Dumitrescu started playing tennis at around age five. As a player, he reached the national Top 10 in Romania and, at around 18, qualified for international tournaments at Futures and Challenger level. In Germany, he most recently held a German LK 1 ranking.",
      "He has been passing on this experience as a coach for over ten years. Before founding NDS, he was responsible for running tennis-school operations for several years — experience that now shapes his personal coaching work.",
    ],
    playerHeading: "Playing career & coaching experience",
    playerParagraphs: [
      "His players range from four-year-old beginners to 90-year-old recreational players — Andy has worked with beginners, recreational and competitive players, as well as high-level juniors and advanced players.",
      "During his own career, he trained and worked with professional players, including players ranked around ATP Top 350 and, in some cases, inside the Top 100, as well as German junior players ranked around Top 50–100 nationally in their age category.",
      "As coach of a U18 junior team, he led the team to the TVM championship two years in a row.",
    ],
    philosophyHeading: "Coaching philosophy",
    philosophyQuote:
      "Every player should leave every session better than when they arrived.",
    philosophyParagraphs: [
      "Andy works highly individually. His goal is to quickly identify the underlying causes of technical and movement issues — not just treat the symptoms.",
      "His approach considers body mechanics and kinematic movement chains, rather than relying only on generic technical cues. He still uses conventional technical instruction where it's the right tool.",
      "Training is informed by modern principles found in today's high-performance tennis.",
    ],
    clubsHeading: "Career stations",
    clubsNote:
      "Andy has coached at various clubs and performance centres in the Cologne/Bonn area, including:",
    photoPlaceholderLabel: "Training photo coming soon",
  },
  training: {
    eyebrow: "Training",
    heading: "Training formats",
    intro:
      "From a player's very first racquet to competitive tournament play: every session is tailored individually to age, level and goal — there are no fixed packages, only an offer built around you.",
    services: [
      {
        key: "einzeltraining",
        label: "Private coaching",
        description:
          "1:1 coaching with full attention on your technique, tactics and goals.",
      },
      {
        key: "kleingruppen",
        label: "Small groups",
        description:
          "Sessions for two or three — intensive, with training partners.",
      },
      {
        key: "gruppentraining",
        label: "Group training",
        description:
          "Training together as a group, great for motivation and match situations.",
      },
      {
        key: "kinderJugend",
        label: "Kids & junior training",
        description:
          "Age-appropriate introduction and focused development for young players.",
      },
      {
        key: "leistungstraining",
        label: "Performance training",
        description:
          "Structure and intensity for ambitious, competition-focused players.",
      },
      {
        key: "matchcoaching",
        label: "Tournament & match coaching",
        description:
          "Support during competitions and focused analysis of your matches.",
      },
      {
        key: "camps",
        label: "Holiday camps & intensives",
        description:
          "Focused training blocks during school holidays, summer and winter.",
      },
      {
        key: "onlineCoaching",
        label: "Online coaching",
        description: "Video analysis and training planning, from anywhere.",
      },
    ],
    onlineNote:
      "Online coaching is planned to become directly bookable online — for now, requests are handled personally, as with everything else.",
    ctaIndividual: "Request an individual offer",
    ctaClubs: "Club enquiries",
    noPricingNote:
      "There is intentionally no fixed price list — every enquiry gets an individual offer.",
  },
  reviews: {
    eyebrow: "Reviews",
    heading: "What players say",
    intro: "Real experiences from players training with Andy.",
    emptyStateHeading: "The first reviews are on their way",
    emptyStateBody:
      "Real reviews will appear here soon. Already trained with Andy? Share your experience.",
    averageLabel: "Average rating",
    countOne: "1 review",
    countOther: "{count} reviews",
    formHeading: "Leave a review",
    formName: "Name",
    formNamePlaceholder: "Your name",
    formRating: "Rating",
    formMessage: "Your experience",
    formMessagePlaceholder: "Briefly share your experience training with Andy…",
    formSubmit: "Submit review",
    formPendingNotice: "New reviews are checked before they're published.",
    formSuccessHeading: "Thanks for your review!",
    formSuccessBody: "It will be published after a quick check.",
    formErrorBody: "Something went wrong. Please try again later.",
    formUnavailable: "Reviews are currently unavailable.",
  },
  contact: {
    eyebrow: "Contact",
    heading: "Request training",
    intro:
      "Send a short message about what you're looking for — you'll get a personal reply with an individual offer.",
    formName: "Name",
    formEmail: "Email",
    formPhone: "Phone",
    formPhoneOptional: "optional",
    formIntent: "What are you looking for?",
    formIntents: [
      { value: "privattraining", label: "Private coaching" },
      { value: "gruppentraining", label: "Group training" },
      { value: "leistungstraining", label: "Performance training" },
      { value: "matchcoaching", label: "Match coaching" },
      { value: "online-coaching", label: "Online coaching" },
      { value: "vereinsanfrage", label: "Club enquiry" },
      { value: "sonstiges", label: "Other" },
    ],
    formMessage: "Message",
    formMessagePlaceholder:
      "Briefly share your request, your level and your availability.",
    formConsentPrefix: "I have read the ",
    formConsentLinkLabel: "privacy policy",
    formConsentSuffix: " and agree to the processing of my information.",
    formSubmit: "Send request",
    formSuccessHeading: "Thanks for your request!",
    formSuccessBody: "Andy will get back to you personally, shortly.",
    formErrorBody:
      "Something went wrong. Please try again or email directly.",
    formUnavailable:
      "The form is currently unavailable — feel free to email or WhatsApp directly.",
    directHeading: "Or reach out directly",
    emailLabel: "Email",
    whatsappLabel: "WhatsApp",
  },
  footer: {
    tagline: "Personal Tennis Coaching with Andy Dumitrescu.",
    navHeading: "Navigation",
    legalHeading: "Legal",
    impressum: "Legal notice",
    datenschutz: "Privacy policy",
    rights: "All rights reserved.",
  },
  legal: {
    impressum: {
      title: "Legal notice",
      intro: "Details per §5 TMG are coming soon.",
      pendingNotice:
        "This page will be updated once all legally required details (address, contact, VAT ID if applicable) are available.",
    },
    datenschutz: {
      title: "Privacy policy",
      intro: "The full privacy policy is coming soon.",
      pendingNotice:
        "This page will be completed once all data-processing details are finalized.",
    },
  },
  stickyCta: {
    label: "Request training",
    whatsapp: "WhatsApp",
  },
};
