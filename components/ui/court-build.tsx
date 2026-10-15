export function CourtBuild() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 960 560"
      fill="none"
      className="court-build pointer-events-none absolute -right-44 top-1/2 hidden w-[min(76vw,900px)] -translate-y-1/2 text-cream/[0.14] lg:block"
    >
      <path className="court-line court-line-1" d="M60 60H900V500H60z" />
      <path className="court-line court-line-2" d="M220 60V500M740 60V500" />
      <path className="court-line court-line-3" d="M220 170H740V390H220z" />
      <path className="court-line court-line-4" d="M480 170V390M60 280H900" />
    </svg>
  );
}
