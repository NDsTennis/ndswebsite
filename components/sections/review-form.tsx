"use client";

import { useActionState, useState } from "react";
import { submitReview, type ReviewFormState } from "@/actions/reviews";
import { StarRatingInput } from "@/components/ui/star-rating";
import type { Dictionary, Locale } from "@/content/types";

const initialState: ReviewFormState = { status: "idle" };

export function ReviewForm({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [state, formAction, isPending] = useActionState(submitReview, initialState);
  const [rating, setRating] = useState(5);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-clay/30 bg-clay/5 p-6">
        <h3 className="font-display text-xl text-ink">{dict.reviews.formSuccessHeading}</h3>
        <p className="mt-2 text-sm text-ink/70">{dict.reviews.formSuccessBody}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5 rounded-2xl border border-ink/10 bg-white/40 p-6">
      <h3 className="font-display text-xl text-ink">{dict.reviews.formHeading}</h3>

      <input type="hidden" name="language" value={locale} />
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="companyWebsite">Website</label>
        <input id="companyWebsite" name="companyWebsite" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <StarRatingInput name="rating" value={rating} onChange={setRating} label={dict.reviews.formRating} />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="displayName" className="text-sm font-medium text-ink">
          {dict.reviews.formName}
        </label>
        <input
          id="displayName"
          name="displayName"
          required
          minLength={2}
          maxLength={80}
          placeholder={dict.reviews.formNamePlaceholder}
          className="rounded-lg border border-ink/15 bg-cream px-4 py-2.5 text-sm text-ink outline-none focus:border-green"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-ink">
          {dict.reviews.formMessage}
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={1000}
          rows={4}
          placeholder={dict.reviews.formMessagePlaceholder}
          className="resize-none rounded-lg border border-ink/15 bg-cream px-4 py-2.5 text-sm text-ink outline-none focus:border-green"
        />
      </div>

      <p className="text-xs text-ink/50">{dict.reviews.formPendingNotice}</p>

      {state.status === "error" && (
        <p className="text-sm text-red-700" role="alert">
          {dict.reviews.formErrorBody}
        </p>
      )}
      {state.status === "unavailable" && (
        <p className="text-sm text-ink/60" role="status">
          {dict.reviews.formUnavailable}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center justify-center rounded-full bg-lime px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-lime/90 disabled:opacity-60"
      >
        {dict.reviews.formSubmit}
      </button>
    </form>
  );
}
