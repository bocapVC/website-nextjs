"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

interface CopyEmailButtonProps {
  email: string;
  className?: string;
}

/** Copies the institutional email to the clipboard with brief "copiado" feedback. */
export function CopyEmailButton({ email, className }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — leave feedback unchanged.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white",
        className,
      )}
      aria-label={`Copiar correo ${email}`}
    >
      <span>{email}</span>
      <span className="text-xs text-white/50">{copied ? "copiado" : "copiar"}</span>
    </button>
  );
}
