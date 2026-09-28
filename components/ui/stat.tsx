export function Stat({
  value,
  label,
  tone = "light",
}: {
  value: string;
  label: string;
  tone?: "light" | "dark";
}) {
  const valueTone = tone === "light" ? "text-cream" : "text-ink";
  const labelTone = tone === "light" ? "text-cream/70" : "text-ink/60";

  return (
    <div className="flex flex-col gap-1">
      <span className={`font-display text-3xl sm:text-4xl ${valueTone}`}>{value}</span>
      <span className={`text-xs leading-snug sm:text-sm ${labelTone}`}>{label}</span>
    </div>
  );
}
