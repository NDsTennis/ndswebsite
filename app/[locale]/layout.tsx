import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import { Nav } from "@/components/layout/nav";
import { StickyMobileCta } from "@/components/layout/sticky-mobile-cta";
import { siteConfig } from "@/content/site";
import { locales } from "@/content/types";
import { getDictionary, hasLocale } from "@/lib/i18n/get-dictionary";
import { fraunces, inter } from "@/lib/fonts";
import "../globals.css";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  const languages = Object.fromEntries(locales.map((l) => [l, `${siteConfig.siteUrl}/${l}`]));

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    metadataBase: new URL(siteConfig.siteUrl),
    alternates: {
      canonical: `${siteConfig.siteUrl}/${locale}`,
      languages,
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `${siteConfig.siteUrl}/${locale}`,
      siteName: siteConfig.brand,
      locale: dict.htmlLang,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.publicName,
    jobTitle: "Tennis Coach",
    url: `${siteConfig.siteUrl}/${locale}`,
    worksFor: {
      "@type": "Organization",
      name: siteConfig.brand,
    },
  };

  return (
    <html lang={dict.htmlLang} className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-cream text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Nav dict={dict} locale={dict.locale} />
        <main id="main" className="pb-24 sm:pb-0">
          {children}
        </main>
        <Footer dict={dict} locale={dict.locale} />
        <StickyMobileCta dict={dict} />
      </body>
    </html>
  );
}
