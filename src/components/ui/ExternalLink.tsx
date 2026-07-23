import { Fragment, type ReactNode } from "react";

interface ExternalLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
}

/** Anchor that opens in a new tab, `rel="noreferrer"`. */
export function ExternalLink({ href, className, children }: ExternalLinkProps) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  );
}

interface MaybeExternalLinkProps {
  href?: string;
  className?: string;
  children: ReactNode;
}

/** Wraps children in an `ExternalLink` when `href` is present, otherwise renders them as-is. */
export function MaybeExternalLink({ href, className, children }: MaybeExternalLinkProps) {
  if (!href) return <Fragment>{children}</Fragment>;
  return (
    <ExternalLink href={href} className={className}>
      {children}
    </ExternalLink>
  );
}
