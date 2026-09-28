import { ServiceIcon } from "@/components/sections/service-icon";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { serviceKeys } from "@/content/services";
import { sectionIds } from "@/content/site";
import type { Dictionary } from "@/content/types";

export function TrainingSection({ dict }: { dict: Dictionary }) {
  const services = serviceKeys
    .map((key) => dict.training.services.find((s) => s.key === key))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <section id={sectionIds.training} className="scroll-mt-20 bg-green py-20 text-cream sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={dict.training.eyebrow}
            heading={dict.training.heading}
            tone="light"
          />
        </Reveal>

        <Reveal delayMs={60}>
          <p className="mt-6 max-w-2xl leading-relaxed text-cream/75">{dict.training.intro}</p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <Reveal key={service.key} delayMs={i * 40}>
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-cream/15 bg-cream/[0.04] p-6">
                <ServiceIcon serviceKey={service.key as typeof serviceKeys[number]} className="h-7 w-7 text-lime" />
                <h3 className="font-display text-lg text-cream">{service.label}</h3>
                <p className="text-sm leading-relaxed text-cream/70">{service.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={200}>
          <p className="mt-10 max-w-2xl text-sm text-cream/60">{dict.training.onlineNote}</p>
        </Reveal>

        <Reveal delayMs={240}>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href={`#${sectionIds.contact}`} variant="primary">
              {dict.training.ctaIndividual}
            </Button>
            <Button href={`#${sectionIds.contact}`} variant="ghost-on-dark">
              {dict.training.ctaClubs}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
