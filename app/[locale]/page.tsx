import { notFound } from "next/navigation";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { TrainingSection } from "@/components/sections/training-section";
import { getDictionary, hasLocale } from "@/lib/i18n/get-dictionary";

// Reviews are fetched live from Supabase on every request so newly
// approved reviews appear without a redeploy.
export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <>
      <HeroSection dict={dict} />
      <AboutSection dict={dict} />
      <TrainingSection dict={dict} />
      <ReviewsSection dict={dict} />
      <ContactSection dict={dict} />
    </>
  );
}
