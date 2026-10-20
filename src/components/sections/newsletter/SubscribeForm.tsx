"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/Button";
import { InputField } from "@/components/ui/FormField";
import { StatusPanel } from "@/components/ui/StatusPanel";
import { cn } from "@/lib/cn";
import { isValidEmail } from "@/lib/email";
import {
  useNewsletterSubscription,
  type SubscriptionStatus,
} from "@/hooks/useNewsletterSubscription";

export const CONSENT_NOTE =
  "Solo usaremos tu correo para enviarte el newsletter. Puedes darte de baja cuando quieras.";

const OUTCOMES: Partial<
  Record<SubscriptionStatus, { variant: "success" | "error"; title: string; body: string }>
> = {
  pending: {
    variant: "success",
    title: "Revisa tu correo para confirmar",
    body: "Te enviamos un enlace de confirmación. Tu suscripción se activa cuando hagas clic en él.",
  },
  already_subscribed: {
    variant: "success",
    title: "Ya estás suscrito",
    body: "Este correo ya recibe el newsletter. No necesitas hacer nada más.",
  },
  error: {
    variant: "error",
    title: "No pudimos completar tu suscripción",
    body: "Ocurrió un problema de nuestro lado. Intenta de nuevo en unos minutos.",
  },
};

interface SubscribeFormProps {
  /**
   * `full`: email + optional name, for /newsletter. `compact`: a single-line email
   * field + button on the ink footer.
   */
  variant?: "full" | "compact";
}

export function SubscribeForm({ variant = "full" }: SubscribeFormProps) {
  const compact = variant === "compact";
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { status, submit } = useNewsletterSubscription();
  const submitting = status === "submitting";
  const id = useId();
  const emailId = `${id}-email`;
  const errorId = `${id}-error`;
  const noteId = `${id}-note`;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    const trimmed = email.trim();
    if (!trimmed) {
      setError("Ingresa tu correo electrónico.");
      return;
    }
    if (!isValidEmail(trimmed)) {
      setError("Ingresa un correo válido, por ejemplo nombre@dominio.com.");
      return;
    }
    const result = await submit({ email: trimmed, name: name.trim(), website: honeypot });
    if (result === "pending" || result === "already_subscribed") {
      setEmail("");
      setName("");
    }
  }

  const outcome = OUTCOMES[status];
  const describedBy = [error ? errorId : null, noteId].filter(Boolean).join(" ");
  const emailProps = {
    id: emailId,
    name: "email",
    type: "email",
    autoComplete: "email",
    required: true,
    value: email,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      setError(null);
    },
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
  } as const;

  return (
    <form onSubmit={handleSubmit} noValidate className="relative flex flex-col gap-4">
      {compact ? (
        <div className="flex flex-col gap-2 sm:flex-row">
          <label htmlFor={emailId} className="sr-only">
            Correo electrónico
          </label>
          <input
            {...emailProps}
            placeholder="tu@correo.com"
            className="min-w-0 flex-1 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/50 focus:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
          <Button type="submit" size="sm" disabled={submitting} className="py-2.5">
            {submitting ? "Enviando…" : "Suscribirme"}
          </Button>
        </div>
      ) : (
        <>
          <InputField label="Correo electrónico" {...emailProps} />
          <InputField
            label="Nombre (opcional)"
            name="name"
            autoComplete="given-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </>
      )}

      {error ? (
        <p id={errorId} role="alert" className={cn("text-sm", compact ? "text-white" : "text-red")}>
          {error}
        </p>
      ) : null}

      <p id={noteId} className={cn("text-xs", compact ? "text-white/60" : "text-ink-soft")}>
        {CONSENT_NOTE}
      </p>

      {/* Honeypot: off-screen rather than display:none, which some bots skip. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-website`}>No completar</label>
        <input
          id={`${id}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {outcome ? (
        compact ? (
          <div role="status" aria-live="polite" className="text-sm text-white">
            <p className="font-semibold">{outcome.title}</p>
            <p className="mt-0.5 text-white/75">{outcome.body}</p>
          </div>
        ) : (
          <StatusPanel variant={outcome.variant} title={outcome.title}>
            {outcome.body}
          </StatusPanel>
        )
      ) : null}

      {compact ? null : (
        <div>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Enviando…" : "Suscribirme"}
          </Button>
        </div>
      )}
    </form>
  );
}
