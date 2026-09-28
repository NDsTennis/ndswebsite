import { Container } from "@/components/ui/container";
import type { LegalDictionary } from "@/content/types";

export function LegalPage({ legal }: { legal: LegalDictionary }) {
  return (
    <section className="py-20 sm:py-28">
      <Container className="max-w-3xl">
        <h1 className="font-display text-4xl text-ink">{legal.title}</h1>
        <p className="mt-6 leading-relaxed text-ink/75">{legal.intro}</p>
        <div className="mt-8 rounded-2xl border border-dashed border-ink/20 bg-clay/5 p-6 text-sm leading-relaxed text-ink/70">
          {legal.pendingNotice}
        </div>
      </Container>
    </section>
  );
}
