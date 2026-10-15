"use server";

import { getSupabaseServerClient } from "@/lib/supabase/server";
import { inquirySchema } from "@/lib/validation/inquiry";

const inquiryTypeMap = {
  privattraining: "private",
  gruppentraining: "group",
  leistungstraining: "performance",
  matchcoaching: "match",
  "online-coaching": "online",
  vereinsanfrage: "club",
  sonstiges: "other",
} as const;

export type InquiryFormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string }
  | { status: "unavailable" };

export async function submitInquiry(
  _prevState: InquiryFormState,
  formData: FormData
): Promise<InquiryFormState> {
  const parsed = inquirySchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    intent: formData.get("intent"),
    message: formData.get("message"),
    consent: formData.get("consent"),
    language: formData.get("language"),
    companyWebsite: formData.get("companyWebsite"),
  });

  if (!parsed.success) {
    return { status: "error", message: "invalid" };
  }

  // Honeypot tripped: pretend success, drop silently.
  if (parsed.data.companyWebsite) {
    return { status: "success" };
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return { status: "unavailable" };
  }

  const { error } = await supabase.from("inquiries").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone || null,
    inquiry_type: inquiryTypeMap[parsed.data.intent as keyof typeof inquiryTypeMap],
    message: parsed.data.message,
    privacy_consent: parsed.data.consent,
    language: parsed.data.language,
  });

  if (error) {
    return { status: "error", message: error.message };
  }

  return { status: "success" };
}
