import type { ServiceKey } from "@/content/services";

const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ServiceIcon({ serviceKey, className = "" }: { serviceKey: ServiceKey; className?: string }) {
  const props = { ...common, className, viewBox: "0 0 24 24", "aria-hidden": true as const };

  switch (serviceKey) {
    case "einzeltraining":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="2.4" fill="currentColor" stroke="none" />
        </svg>
      );
    case "kleingruppen":
      return (
        <svg {...props}>
          <circle cx="9" cy="12" r="6" />
          <circle cx="15" cy="12" r="6" />
        </svg>
      );
    case "gruppentraining":
      return (
        <svg {...props}>
          <circle cx="12" cy="6.5" r="2.6" />
          <circle cx="6" cy="17" r="2.6" />
          <circle cx="18" cy="17" r="2.6" />
        </svg>
      );
    case "kinderJugend":
      return (
        <svg {...props}>
          <path d="M12 21c4.5-3 7-6.2 7-10a7 7 0 1 0-14 0c0 3.8 2.5 7 7 10Z" />
          <circle cx="12" cy="11" r="2.4" />
        </svg>
      );
    case "leistungstraining":
      return (
        <svg {...props}>
          <path d="M4 20V13" />
          <path d="M12 20V6" />
          <path d="M20 20v-9" />
          <path d="M3 20h18" />
        </svg>
      );
    case "matchcoaching":
      return (
        <svg {...props}>
          <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
          <path d="M7 6H4v1a4 4 0 0 0 3.6 4" />
          <path d="M17 6h3v1a4 4 0 0 1-3.6 4" />
          <path d="M12 14v4" />
          <path d="M8 21h8" />
        </svg>
      );
    case "camps":
      return (
        <svg {...props}>
          <path d="M4 20 12 5l8 15Z" />
          <path d="M9 20l3-5.5 3 5.5" />
        </svg>
      );
    case "onlineCoaching":
      return (
        <svg {...props}>
          <rect x="3.5" y="5" width="17" height="12" rx="1.5" />
          <path d="M8 21h8" />
          <path d="M12 17v4" />
          <path d="M10.3 8.5v5l4.2-2.5-4.2-2.5Z" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return null;
  }
}
