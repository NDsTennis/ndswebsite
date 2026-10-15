"use server";

import { getSupabaseServerClient } from "@/lib/supabase/server";
import { reviewSchema } from "@/lib/validation/review";

export type ReviewFormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string }
  | { status: "unavailable" };

export async function submitReview(
  _prevState: ReviewFormState,
  formData: FormData
): Promise<ReviewFormState> {
  const parsed = reviewSchema.safeParse({
    displayName: formData.get("displayName"),
    rating: formData.get("rating"),
    message: formData.get("message"),
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

  const { error } = await supabase.rpc("submit_review", {
    p_display_name: parsed.data.displayName,
    p_rating: parsed.data.rating,
    p_message: parsed.data.message,
    p_language: parsed.data.language,
  });

  if (error) {
    return { status: "error", message: error.message };
  }

  return { status: "success" };
}
