"use client";

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`h-full w-full ${filled ? "fill-lime" : "fill-transparent stroke-ink/30"}`}
      strokeWidth={filled ? 0 : 1.5}
    >
      <path d="M12 2.5l2.9 6.28 6.85.72-5.13 4.68 1.5 6.82L12 17.77l-6.12 3.23 1.5-6.82L2.25 9.5l6.85-.72L12 2.5z" />
    </svg>
  );
}

export function StarRatingDisplay({
  rating,
  size = "md",
  label,
}: {
  rating: number;
  size?: "sm" | "md" | "lg";
  label?: string;
}) {
  const dims = size === "lg" ? "h-6 w-6" : size === "sm" ? "h-3.5 w-3.5" : "h-4.5 w-4.5";
  const rounded = Math.round(rating);

  return (
    <div
      className="flex items-center gap-1"
      role="img"
      aria-label={label ?? `${rating.toFixed(1)} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={dims}>
          <StarIcon filled={i < rounded} />
        </span>
      ))}
    </div>
  );
}

export function StarRatingInput({
  name,
  value,
  onChange,
  label,
}: {
  name: string;
  value: number;
  onChange: (value: number) => void;
  label: string;
}) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-sm font-medium text-ink">{label}</legend>
      <div className="flex items-center gap-1.5">
        {Array.from({ length: 5 }, (_, i) => {
          const starValue = i + 1;
          const id = `${name}-${starValue}`;
          return (
            <span key={starValue} className="relative h-8 w-8">
              <input
                type="radio"
                id={id}
                name={name}
                value={starValue}
                checked={value === starValue}
                onChange={() => onChange(starValue)}
                className="peer absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
              <label
                htmlFor={id}
                className="pointer-events-none absolute inset-0 block rounded peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-green"
              >
                <StarIcon filled={starValue <= value} />
              </label>
            </span>
          );
        })}
      </div>
    </fieldset>
  );
}
