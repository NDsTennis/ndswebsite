import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo-placeholder";
import { Stat } from "@/components/ui/stat";
import { heroSlogan, sectionIds } from "@/content/site";
import type { Dictionary } from "@/content/types";

// Above-the-fold content renders immediately — no scroll-reveal here, since
// it's visible on load and must never depend on an IntersectionObserver
// firing in time.
export function HeroSection({ dict }: { dict: Dictionary }) {
  const slogan = heroSlogan[dict.locale];

  return (
    <section className="relative overflow-hidden bg-green text-cream">
      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:py-28">
        <div className="flex flex-col gap-7">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-lime">
            {dict.hero.eyebrow}
          </span>

          <h1 className="font-display text-[2.75rem] leading-[1.05] sm:text-6xl lg:text-7xl">
            {slogan}
          </h1>

          <p className="text-sm font-medium uppercase tracking-[0.15em] text-cream/60">
            {dict.hero.name}
          </p>

          <p className="max-w-md text-base leading-relaxed text-cream/80 sm:text-lg">
            {dict.hero.subline}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button href={`#${sectionIds.contact}`} variant="primary">
              {dict.hero.ctaPrimary}
            </Button>
            <Button href={`#${sectionIds.about}`} variant="ghost-on-dark">
              {dict.hero.ctaSecondary}
            </Button>
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-cream/15 pt-8 sm:grid-cols-4">
            {dict.hero.metrics.map((metric) => (
              <div key={metric.label}>
                <dt className="sr-only">{metric.label}</dt>
                <dd>
                  <Stat value={metric.value} label={metric.label} tone="light" />
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <Photo
          src="/images/nds/andy-portrait.jpg"
          alt={dict.hero.name}
          label={dict.hero.photoPlaceholderLabel}
          aspect="portrait"
          tone="dark"
          preload
          className="w-full max-w-sm lg:max-w-md lg:justify-self-end"
        />
      </Container>
    </section>
  );
}
