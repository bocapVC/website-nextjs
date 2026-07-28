import type { SVGProps } from "react";
import type { ElegibleIcon } from "@/data/elegibles";

type IconComponent = (props: SVGProps<SVGSVGElement>) => React.JSX.Element;

const shared: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const Fund: IconComponent = (props) => (
  <svg {...shared} {...props}>
    <line x1="4" y1="20" x2="20" y2="20" />
    <rect x="6" y="12" width="3" height="8" />
    <rect x="11" y="8" width="3" height="12" />
    <rect x="16" y="4" width="3" height="16" />
  </svg>
);

const Angel: IconComponent = (props) => (
  <svg {...shared} {...props}>
    <circle cx="11" cy="9" r="3" />
    <path d="M6 20c0-3 2.2-5.5 5-5.5s5 2.5 5 5.5" />
    <path
      d="M18 3l.7 1.8L20.5 5.5l-1.8.7L18 8l-.7-1.8L15.5 5.5l1.8-.7z"
      fill="currentColor"
      stroke="none"
    />
  </svg>
);

const Rocket: IconComponent = (props) => (
  <svg {...shared} {...props}>
    <path d="M12 2.5c2 1.9 3.2 4.6 3.2 8 0 2-.4 3.7-1.1 5l-2.1 2.3-2.1-2.3c-.7-1.3-1.1-3-1.1-5 0-3.4 1.2-6.1 3.2-8z" />
    <circle cx="12" cy="9.5" r="1.3" />
    <path d="M8.9 14.8l-2.1 1 .5-2.4" />
    <path d="M15.1 14.8l2.1 1-.5-2.4" />
    <path d="M10.4 18.5l1.6 2 1.6-2" />
  </svg>
);

const Building: IconComponent = (props) => (
  <svg {...shared} {...props}>
    <rect x="4" y="9" width="6" height="11" />
    <rect x="13" y="4" width="7" height="16" />
    <line x1="6" y1="12" x2="8" y2="12" />
    <line x1="6" y1="15" x2="8" y2="15" />
    <line x1="6" y1="18" x2="8" y2="18" />
    <line x1="15.5" y1="7" x2="17.5" y2="7" />
    <line x1="15.5" y1="10" x2="17.5" y2="10" />
    <line x1="15.5" y1="13" x2="17.5" y2="13" />
  </svg>
);

const Bulb: IconComponent = (props) => (
  <svg {...shared} {...props}>
    <path d="M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0012 3z" />
    <path d="M9.5 18h5" />
    <path d="M10.3 21h3.4" />
  </svg>
);

const Shield: IconComponent = (props) => (
  <svg {...shared} {...props}>
    <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

export const ELEGIBLE_ICONS: Record<ElegibleIcon, IconComponent> = {
  fund: Fund,
  angel: Angel,
  rocket: Rocket,
  building: Building,
  bulb: Bulb,
  shield: Shield,
};
