import { Container } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo-placeholder";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { clubs } from "@/content/clubs";
import { sectionIds, siteConfig } from "@/content/site";
import type { Dictionary } from "@/content/types";

export function AboutSection({ dict }: { dict: Dictionary }) {
  return (
    <section id={sectionIds.about} className="scroll-mt-20 bg-cream py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
          <Reveal className="lg:sticky lg:top-28">
            <Photo
              src="/images/nds/trophy-event.jpg"
              alt={siteConfig.publicName}
              label={dict.about.photoPlaceholderLabel}
              aspect="portrait"
            />
          </Reveal>

          <div className="flex flex-col gap-16">
            <div>
              <SectionHeading eyebrow={dict.about.eyebrow} heading={dict.about.heading} />
              <div className="mt-6 flex flex-col gap-4">
                {dict.about.intro.map((paragraph) => (
                  <p key={paragraph} className="max-w-2xl leading-relaxed text-ink/75">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div id={sectionIds.experience} className="flex scroll-mt-20 flex-col gap-8">
              <h3 className="font-display text-2xl text-ink sm:text-3xl">
                {dict.about.playerHeading}
              </h3>
              <div className="flex flex-col gap-4">
                {dict.about.playerParagraphs.map((paragraph) => (
                  <p key={paragraph} className="max-w-2xl leading-relaxed text-ink/75">
                    {paragraph}
                  </p>
                ))}
              </div>

              <blockquote className="border-l-2 border-clay py-1 pl-6">
                <p className="font-display text-xl italic leading-snug text-ink sm:text-2xl">
                  “{dict.about.philosophyQuote}”
                </p>
              </blockquote>

              <div className="flex flex-col gap-4">
                {dict.about.philosophyParagraphs.map((paragraph) => (
                  <p key={paragraph} className="max-w-2xl leading-relaxed text-ink/75">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-4 border-t border-ink/10 pt-8">
                <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">
                  {dict.about.clubsHeading}
                </h4>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/60">
                  {dict.about.clubsNote}
                </p>
                <p className="mt-4 max-w-2xl text-sm leading-loose text-ink/70">
                  {clubs.join(" · ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
