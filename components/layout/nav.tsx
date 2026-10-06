import Link from "next/link";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { BrandMark } from "@/components/ui/brand-mark";
import { sectionIds } from "@/content/site";
import type { Dictionary, Locale } from "@/content/types";

export function Nav({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const links = [
    { href: `#${sectionIds.about}`, label: dict.nav.about },
    { href: `#${sectionIds.experience}`, label: dict.nav.experience },
    { href: `#${sectionIds.training}`, label: dict.nav.training },
    { href: `#${sectionIds.reviews}`, label: dict.nav.reviews },
    { href: `#${sectionIds.contact}`, label: dict.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/90 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-lime focus:px-4 focus:py-2 focus:text-ink"
      >
        {dict.nav.skipToContent}
      </a>
      <div className="mx-auto flex h-18 w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <Link href={`/${locale}`} className="font-display text-2xl tracking-tight text-ink">
          <BrandMark />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label={dict.nav.skipToContent}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink/70 transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <LanguageSwitcher locale={locale} label={dict.nav.languageLabel} />
          <a
            href={`#${sectionIds.contact}`}
            className="inline-flex items-center justify-center rounded-full bg-lime px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-lime/90"
          >
            {dict.nav.cta}
          </a>
        </div>

        <MobileMenu
          links={links}
          ctaLabel={dict.nav.cta}
          ctaHref={`#${sectionIds.contact}`}
          locale={locale}
          languageLabel={dict.nav.languageLabel}
        />
      </div>
    </header>
  );
}
