import { ReviewForm } from "@/components/sections/review-form";
import { ReviewSlider } from "@/components/sections/review-slider";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { StarRatingDisplay } from "@/components/ui/star-rating";
import { sectionIds } from "@/content/site";
import type { Dictionary } from "@/content/types";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { ReviewRow } from "@/lib/supabase/types";

async function getApprovedReviews() {
  const supabase = getSupabaseServerClient();
  if (!supabase) return null;

  const [{ data: ratings, error: ratingsError }, { data: recent, error: recentError }] =
    await Promise.all([
      supabase.from("reviews").select("rating").eq("status", "approved"),
      supabase
        .from("reviews")
        .select("id, display_name, rating, message, created_at")
        .eq("status", "approved")
        .order("created_at", { ascending: false })
        .limit(6),
    ]);

  if (ratingsError || recentError || !ratings) return null;

  const count = ratings.length;
  const average = count > 0 ? ratings.reduce((sum, r) => sum + r.rating, 0) / count : 0;

  return {
    count,
    average,
    recent: (recent ?? []) as Pick<ReviewRow, "id" | "display_name" | "rating" | "message" | "created_at">[],
  };
}

export async function ReviewsSection({ dict }: { dict: Dictionary }) {
  const data = await getApprovedReviews();
  const hasReviews = Boolean(data && data.count > 0);
  const countText = data
    ? (data.count === 1 ? dict.reviews.countOne : dict.reviews.countOther).replace(
        "{count}",
        String(data.count)
      )
    : "";

  return (
    <section id={sectionIds.reviews} className="scroll-mt-20 bg-cream py-20 sm:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <Reveal>
              <SectionHeading eyebrow={dict.reviews.eyebrow} heading={dict.reviews.heading} />
            </Reveal>
            <Reveal delayMs={60}>
              <p className="mt-6 max-w-xl leading-relaxed text-ink/75">{dict.reviews.intro}</p>
            </Reveal>

            {hasReviews && data ? (
              <>
                <Reveal delayMs={100}>
                  <div className="mt-8 flex items-center gap-4">
                    <StarRatingDisplay rating={data.average} size="lg" />
                    <span className="text-sm text-ink/60">
                      {data.average.toFixed(1)} · {countText}
                    </span>
                  </div>
                </Reveal>

                <ReviewSlider
                  reviews={data.recent}
                  locale={dict.locale}
                  previousLabel={dict.locale === "de" ? "Vorherige Bewertung" : "Previous review"}
                  nextLabel={dict.locale === "de" ? "Nächste Bewertung" : "Next review"}
                />
              </>
            ) : (
              <Reveal delayMs={100}>
                <div className="mt-10 rounded-2xl border border-dashed border-ink/15 p-8">
                  <h3 className="font-display text-xl text-ink">{dict.reviews.emptyStateHeading}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-ink/65">
                    {dict.reviews.emptyStateBody}
                  </p>
                </div>
              </Reveal>
            )}
          </div>

          <Reveal delayMs={80}>
            <ReviewForm dict={dict} locale={dict.locale} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
