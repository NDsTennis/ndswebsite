import { z } from "zod";

export const contactIntents = [
  "privattraining",
  "gruppentraining",
  "leistungstraining",
  "matchcoaching",
  "online-coaching",
  "vereinsanfrage",
  "sonstiges",
] as const;

export const inquirySchema = z.object({
  name: z.string().trim().min(2, "too short").max(100, "too long"),
  email: z.string().trim().email("invalid email").max(200),
  phone: z
    .string()
    .trim()
    .max(30)
    .optional()
    .or(z.literal("")),
  intent: z.enum(contactIntents),
  message: z.string().trim().min(10, "too short").max(2000, "too long"),
  consent: z.coerce.boolean().refine((v) => v === true, "consent required"),
  language: z.enum(["de", "en"]),
  // Honeypot field, see lib/validation/review.ts for rationale.
  companyWebsite: z.string().max(0).optional().or(z.literal("")),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
