"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/Button";

interface ShareLinksProps {
  /** Absolute URL of the page being shared. */
  url: string;
  title: string;
}

/**
 * Plain share-intent links (no third-party scripts or tracking) plus "Copiar enlace".
 * Text labels rather than brand logos: the icon set is stroke-only and has none.
 */
export function ShareLinks({ url, title }: ShareLinksProps) {
  const [copied, setCopied] = useState(false);
  const labelId = useId();
  const u = encodeURIComponent(url);
  const text = encodeURIComponent(title);
  const targets = [
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}` },
    { label: "X", href: `https://x.com/intent/post?url=${u}&text=${text}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
  ];

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — leave feedback unchanged.
    }
  }

  return (
    <div role="group" aria-labelledby={labelId} className="flex flex-wrap items-center gap-3">
      <span id={labelId} className="text-sm font-medium text-ink">
        Compartir
      </span>
      {targets.map((target) => (
        <Button
          key={target.label}
          href={target.href}
          external
          variant="ghost"
          size="sm"
        >
          {target.label}
        </Button>
      ))}
      <Button type="button" variant="ghost" size="sm" onClick={handleCopy}>
        {/* Polite live region so screen readers hear the confirmation. */}
        <span aria-live="polite">{copied ? "Enlace copiado" : "Copiar enlace"}</span>
      </Button>
    </div>
  );
}
