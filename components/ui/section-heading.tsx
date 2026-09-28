interface SectionHeadingProps {
  eyebrow: string;
  heading: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  heading,
  align = "left",
  tone = "dark",
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";
  const eyebrowTone = tone === "dark" ? "text-clay" : "text-lime";
  const headingTone = tone === "dark" ? "text-ink" : "text-cream";

  return (
    <div className={`flex flex-col gap-3 ${alignClass} ${className}`}>
      <span
        className={`text-xs font-semibold uppercase tracking-[0.2em] ${eyebrowTone}`}
      >
        {eyebrow}
      </span>
      <h2
        className={`font-display text-3xl leading-tight sm:text-4xl lg:text-5xl ${headingTone}`}
      >
        {heading}
      </h2>
    </div>
  );
}
