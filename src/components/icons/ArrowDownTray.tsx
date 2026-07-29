import type { SVGProps } from "react";

/** Down arrow dropping into an open tray — marks a file download, e.g. "Descargar ⤓". */
export function ArrowDownTray(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <line x1="12" y1="3" x2="12" y2="14" />
      <polyline points="8 10 12 14 16 10" />
      <path d="M5 16v4h14v-4" />
    </svg>
  );
}
