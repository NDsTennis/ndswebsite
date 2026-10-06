type BrandMarkProps = {
  className?: string;
  label?: string;
};

export function BrandMark({ className = "", label = "NDS" }: BrandMarkProps) {
  return (
    <span aria-label={label} className={`inline-flex items-baseline tracking-tight ${className}`}>
      <span aria-hidden="true">ND</span>
      <span aria-hidden="true" className="text-[0.68em] leading-none">S</span>
    </span>
  );
}
