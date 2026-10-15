import { Container } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo-placeholder";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Dictionary } from "@/content/types";

export function GallerySection({ dict }: { dict: Dictionary }) {
  return (
    <section className="bg-cream py-20 sm:py-28" aria-label={dict.gallery.heading}>
      <Container>
        <Reveal>
          <SectionHeading eyebrow={dict.gallery.eyebrow} heading={dict.gallery.heading} />
        </Reveal>
        <Reveal delayMs={60}>
          <p className="mt-6 max-w-2xl leading-relaxed text-ink/75">{dict.gallery.intro}</p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {dict.gallery.items.map((item, index) => (
            <Reveal
              key={item.src}
              delayMs={Math.min(index * 35, 180)}
              className={index === 0 || index === 4 ? "col-span-2" : "col-span-1"}
            >
              <Photo
                src={item.src}
                alt={item.alt}
                label={item.alt}
                aspect={index === 0 || index === 4 ? "landscape" : "square"}
                className="h-full min-h-44"
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
