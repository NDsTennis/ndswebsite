/**
 * Ordered list of training-format keys. Labels/descriptions are translated
 * and live in content/dictionaries/{de,en}.ts under training.services,
 * keyed by these same strings. Icons are mapped from these keys in
 * components/sections/training-section.tsx.
 */
export const serviceKeys = [
  "einzeltraining",
  "kleingruppen",
  "gruppentraining",
  "kinderJugend",
  "leistungstraining",
  "matchcoaching",
  "camps",
  "onlineCoaching",
] as const;

export type ServiceKey = (typeof serviceKeys)[number];
