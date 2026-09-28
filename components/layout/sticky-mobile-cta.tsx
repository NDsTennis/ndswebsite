import { contactConfig, sectionIds } from "@/content/site";
import type { Dictionary } from "@/content/types";

export function StickyMobileCta({ dict }: { dict: Dictionary }) {
  const hasWhatsapp = contactConfig.whatsappNumber.length > 0;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-ink/10 bg-cream/95 p-3 backdrop-blur sm:hidden">
      <a
        href={`#${sectionIds.contact}`}
        className="flex flex-1 items-center justify-center rounded-full bg-lime px-4 py-3 text-sm font-semibold text-ink"
      >
        {dict.stickyCta.label}
      </a>
      {hasWhatsapp && (
        <a
          href={`https://wa.me/${contactConfig.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={dict.stickyCta.whatsapp}
          className="flex items-center justify-center rounded-full border border-ink/15 px-4 py-3 text-ink"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12.02 2c-5.5 0-9.97 4.46-9.97 9.96 0 1.76.46 3.47 1.33 4.98L2 22l5.2-1.36a9.95 9.95 0 0 0 4.81 1.23h.01c5.5 0 9.97-4.46 9.97-9.96 0-2.66-1.04-5.16-2.92-7.04A9.9 9.9 0 0 0 12.02 2Zm0 18.2h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.09.81.82-3-.2-.31a8.23 8.23 0 0 1-1.26-4.4c0-4.55 3.7-8.25 8.25-8.25a8.2 8.2 0 0 1 5.83 2.42 8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.7 8.24-8.25 8.24Zm4.52-6.17c-.25-.12-1.47-.72-1.7-.8-.23-.09-.39-.12-.56.12-.17.25-.64.8-.78.96-.14.17-.29.19-.53.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42-.14 0-.31-.02-.47-.02-.17 0-.43.06-.66.31-.23.25-.86.84-.86 2.04 0 1.2.88 2.37 1 2.53.12 .17 1.73 2.64 4.19 3.7.59.25 1.04.4 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.47-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.06-.1-.22-.16-.47-.28Z" />
          </svg>
        </a>
      )}
    </div>
  );
}
