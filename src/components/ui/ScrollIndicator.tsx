"use client";

export function ScrollIndicator() {
  const handleClick = () => {
    const nextSection = document.querySelector("section:nth-of-type(2)");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="group relative flex flex-col items-center justify-center gap-2 p-4 transition-opacity hover:opacity-70"
      aria-label="Scroll to next section"
    >
      <span className="text-xs font-medium uppercase tracking-widest text-white/60 group-hover:text-white">
        Desplázate
      </span>
      <svg
        className="h-5 w-5 animate-bounce text-white/60 group-hover:text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </button>
  );
}
