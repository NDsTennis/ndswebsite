import Link from "next/link";
import { sectionIds, siteConfig, socialLinks } from "@/content/site";
import { BrandMark } from "@/components/ui/brand-mark";
import type { Dictionary, Locale } from "@/content/types";

export function Footer({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const year = new Date().getFullYear();

  const links = [
    { href: `#${sectionIds.about}`, label: dict.nav.about },
    { href: `#${sectionIds.training}`, label: dict.nav.training },
    { href: `#${sectionIds.reviews}`, label: dict.nav.reviews },
    { href: `#${sectionIds.contact}`, label: dict.nav.contact },
  ];

  return (
    <footer className="border-t border-cream/10 bg-green text-cream">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <BrandMark className="font-display text-2xl" label={siteConfig.brand} />
            <p className="mt-3 text-sm text-cream/70">{dict.footer.tagline}</p>
            {socialLinks.instagram && (
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm text-cream/70 underline underline-offset-4 hover:text-cream"
              >
                Instagram
              </a>
            )}
          </div>

          <div className="grid grid-cols-2 gap-10 sm:flex sm:gap-16">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/50">
                {dict.footer.navHeading}
              </span>
              {links.map((link) => (
                <a key={link.href} href={link.href} className="text-sm text-cream/80 hover:text-cream">
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/50">
                {dict.footer.legalHeading}
              </span>
              <Link href={`/${locale}/impressum`} className="text-sm text-cream/80 hover:text-cream">
                {dict.footer.impressum}
              </Link>
              <Link href={`/${locale}/datenschutz`} className="text-sm text-cream/80 hover:text-cream">
                {dict.footer.datenschutz}
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-12 text-xs text-cream/50">
          © {year} {siteConfig.brand} — {dict.footer.rights}
        </p>
      </div>
    </footer>
  );
}
