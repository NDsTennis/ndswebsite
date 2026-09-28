"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import type { Locale } from "@/content/types";

interface NavLink {
  href: string;
  label: string;
}

export function MobileMenu({
  links,
  ctaLabel,
  ctaHref,
  locale,
  languageLabel,
}: {
  links: NavLink[];
  ctaLabel: string;
  ctaHref: string;
  locale: Locale;
  languageLabel: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        aria-label="Menü öffnen"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink"
      >
        <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true">
          <path d="M0 1h20M0 7h20M0 13h20" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </button>

      {open &&
        createPortal(
          <div
            id="mobile-menu-panel"
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex flex-col bg-cream"
          >
            <div className="flex items-center justify-between px-5 py-4">
              <span className="font-display text-xl text-ink">NDS</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Menü schließen"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M1 1l14 14M15 1L1 15" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-6 px-8">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-3xl text-ink"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex flex-col gap-6 px-8 pb-10">
              <LanguageSwitcher locale={locale} label={languageLabel} />
              <a
                href={ctaHref}
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-full bg-lime px-6 py-3.5 text-sm font-medium text-ink"
              >
                {ctaLabel}
              </a>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
