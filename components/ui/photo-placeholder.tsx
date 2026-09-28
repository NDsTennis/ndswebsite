import Image from "next/image";

interface PhotoProps {
  src?: string;
  alt: string;
  label: string;
  aspect?: "portrait" | "landscape" | "square";
  tone?: "light" | "dark";
  className?: string;
  preload?: boolean;
}

const aspectClass: Record<NonNullable<PhotoProps["aspect"]>, string> = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[16/10]",
  square: "aspect-square",
};

/**
 * Renders the real photo once `src` is provided. Until then, shows a
 * clearly labeled placeholder so it's obvious to editors that a
 * professional photo still needs to be dropped in (see README).
 */
export function Photo({
  src,
  alt,
  label,
  aspect = "portrait",
  tone = "light",
  className = "",
  preload,
}: PhotoProps) {
  if (src) {
    return (
      <div className={`relative overflow-hidden rounded-2xl ${aspectClass[aspect]} ${className}`}>
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" preload={preload} />
      </div>
    );
  }

  const toneClass =
    tone === "dark"
      ? "border-cream/15 bg-[repeating-linear-gradient(135deg,rgba(245,241,232,0.06)_0px,rgba(245,241,232,0.06)_1px,transparent_1px,transparent_14px)] text-cream/50"
      : "border-ink/10 bg-[repeating-linear-gradient(135deg,rgba(23,28,25,0.05)_0px,rgba(23,28,25,0.05)_1px,transparent_1px,transparent_14px)] text-ink/40";

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl border ${toneClass} ${aspectClass[aspect]} ${className}`}
    >
      <span className="mx-6 text-center text-xs font-medium uppercase tracking-[0.15em]">
        {label}
      </span>
    </div>
  );
}
