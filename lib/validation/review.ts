import { z } from "zod";

export const reviewSchema = z.object({
  displayName: z.string().trim().min(2, "too short").max(80, "too long"),
  rating: z.coerce.number().int().min(1).max(5),
  message: z.string().trim().min(10, "too short").max(1000, "too long"),
  language: z.enum(["de", "en"]),
  // Honeypot: real users never fill this hidden field. Bots that fill every
  // field will trip it; the action accepts the request but silently drops it.
  companyWebsite: z.string().max(0).optional().or(z.literal("")),
});

export type ReviewInput = z.infer<typeof reviewSchema>;
