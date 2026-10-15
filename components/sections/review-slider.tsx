"use client";

import { useState } from "react";
import { StarRatingDisplay } from "@/components/ui/star-rating";
import type { Locale } from "@/content/types";
import type { ReviewRow } from "@/lib/supabase/types";

type Review = Pick<ReviewRow, "id" | "display_name" | "rating" | "message" | "created_at">;

export function ReviewSlider({
  reviews,
  locale,
  previousLabel,
  nextLabel,
}: {
  reviews: Review[];
  locale: Locale;
  previousLabel: string;
  nextLabel: string;
}) {
  const [index, setIndex] = useState(0);
  const review = reviews[index];
  if (!review) return null;
  const positionLabel = (current: number) =>
    locale === "de" ? `${current} von ${reviews.length}` : `${current} of ${reviews.length}`;

  const move = (delta: number) => setIndex((current) => (current + delta + reviews.length) % reviews.length);

  return (
    <div className="mt-10" role="region" aria-roledescription={locale === "de" ? "Karussell" : "carousel"} aria-label={locale === "de" ? "Spielerbewertungen" : "Player reviews"}>
      <figure key={review.id} className="review-slide flex min-h-64 flex-col rounded-2xl border border-ink/10 bg-white/55 p-6 sm:min-h-60 sm:p-8">
        <StarRatingDisplay rating={review.rating} size="sm" />
        <blockquote className="mt-5 font-display text-xl leading-relaxed text-ink sm:text-2xl">
          “{review.message}”
        </blockquote>
        <figcaption className="mt-auto pt-6 text-xs font-medium uppercase tracking-wide text-ink/50">
          {review.display_name}
        </figcaption>
      </figure>

      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="flex gap-2">
          <button type="button" onClick={() => move(-1)} aria-label={previousLabel} className="review-control">←</button>
          <button type="button" onClick={() => move(1)} aria-label={nextLabel} className="review-control">→</button>
        </div>
        <span className="text-xs tabular-nums text-ink/55" aria-live="polite">
          {positionLabel(index + 1)}
        </span>
        <div className="flex gap-2" aria-label={locale === "de" ? "Bewertung auswählen" : "Choose a review"}>
          {reviews.map((item, dotIndex) => (
            <button
              type="button"
              key={item.id}
              aria-label={positionLabel(dotIndex + 1)}
              aria-current={dotIndex === index ? "true" : undefined}
              onClick={() => setIndex(dotIndex)}
              className={`h-2 rounded-full transition-[width,background-color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green ${dotIndex === index ? "w-7 bg-green" : "w-2 bg-ink/20 hover:bg-ink/40"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
