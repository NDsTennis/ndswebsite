import { ContactForm } from "@/components/sections/contact-form";
import { BallFlight } from "@/components/ui/ball-flight";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { contactConfig, sectionIds } from "@/content/site";
import type { Dictionary } from "@/content/types";

export function ContactSection({ dict }: { dict: Dictionary }) {
  const hasWhatsapp = contactConfig.whatsappNumber.length > 0;

  return (
    <section id={sectionIds.contact} className="scroll-mt-20 bg-cream py-20 sm:py-28">
      <Container>
        <BallFlight />
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="flex flex-col gap-8">
            <Reveal>
              <SectionHeading eyebrow={dict.contact.eyebrow} heading={dict.contact.heading} />
            </Reveal>
            <Reveal delayMs={60}>
              <p className="max-w-md leading-relaxed text-ink/75">{dict.contact.intro}</p>
            </Reveal>

            <Reveal delayMs={100}>
              <div className="rounded-2xl border border-clay/25 bg-clay/[0.06] p-6">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">
                  {dict.contact.directHeading}
                </h3>
                <div className="mt-4 flex flex-col gap-2 text-sm">
                  <a href={`mailto:${contactConfig.email}`} className="text-ink hover:text-clay">
                    {dict.contact.emailLabel}: {contactConfig.email}
                  </a>
                  {hasWhatsapp && (
                    <a
                      href={`https://wa.me/${contactConfig.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink hover:text-clay"
                    >
                      {dict.contact.whatsappLabel}
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delayMs={80}>
            <div className="rounded-2xl border border-ink/10 bg-white/40 p-6 sm:p-8">
              <ContactForm dict={dict} locale={dict.locale} />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
