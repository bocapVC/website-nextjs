import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { ExternalLink } from "./ExternalLink";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-red text-white hover:bg-red/90",
  secondary: "bg-ink text-white hover:bg-teal-strong",
  ghost: "border border-line-strong text-ink hover:border-ink hover:bg-ink/5",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-sm",
  sm: "px-4 py-2 text-xs",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonAsLink = CommonProps & {
  href: string;
  /** Open in a new tab as a plain anchor (for off-site links). */
  external?: boolean;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonProps = ButtonAsLink | ButtonAsButton;

/** Pill button that renders as a Next `<Link>` when `href` is provided, else a `<button>`. */
export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { variant = "primary", size = "md", className, children, href, external } = props;
    const classes = cn(base, variants[variant], sizes[size], className);
    if (external) {
      return (
        <ExternalLink href={href} className={classes}>
          {children}
        </ExternalLink>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { variant = "primary", size = "md", className, children, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], className);
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
