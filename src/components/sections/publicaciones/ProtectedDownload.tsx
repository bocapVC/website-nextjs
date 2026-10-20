"use client";

import { useId, useRef, useState } from "react";
import { ArrowDownTray } from "@/components/icons/ArrowDownTray";
import { Button } from "@/components/ui/Button";
import { InputField } from "@/components/ui/FormField";
import { isUnlocked, markUnlocked, triggerDownload } from "@/lib/articleUnlock";
import { isValidEmail } from "@/lib/email";

/** Must match `HONEYPOT_FIELD` in the article-access route. */
const HONEYPOT_FIELD = "website";

interface ProtectedDownloadProps {
  title: string;
  url: string;
}

/**
 * "Descargar" for a protected publication: downloads straight away once this
 * browser is unlocked, otherwise opens a blocking email dialog first. The email
 * is recorded best-effort — a failing route still unlocks and downloads.
 */
export function ProtectedDownload({ title, url }: ProtectedDownloadProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const titleId = useId();
  const errorId = useId();

  function handleDownloadClick() {
    if (isUnlocked()) {
      triggerDownload(url);
      return;
    }
    dialogRef.current?.showModal();
  }

  function close() {
    dialogRef.current?.close();
  }

  function handleClose() {
    setEmail("");
    setHoneypot("");
    setError(null);
    triggerRef.current?.focus();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      setError("Ingresa tu correo electrónico.");
      return;
    }
    if (!isValidEmail(trimmed)) {
      setError("Ingresa un correo válido, por ejemplo nombre@dominio.com.");
      return;
    }

    // A filled honeypot is a bot: unlock locally as if it worked, but send nothing.
    if (!honeypot) {
      setSubmitting(true);
      try {
        await fetch("/api/article-access", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: trimmed, article: title }),
        });
      } catch {
        // Recording the lead is best-effort; the visitor still gets the article.
      } finally {
        setSubmitting(false);
      }
    }

    markUnlocked();
    close();
    triggerDownload(url);
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={handleDownloadClick}
        className="group inline-flex shrink-0 cursor-pointer items-center gap-1.5 text-sm font-semibold text-teal hover:text-teal-strong"
      >
        <span className="group-hover:underline">Descargar</span>
        <ArrowDownTray className="h-4 w-4" />
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClose={handleClose}
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        // The dialog box itself is only reachable through its padding-free edge,
        // i.e. the backdrop; clicks on the content land on the inner div.
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        className="m-auto w-[calc(100%-2*var(--gutter))] max-w-md rounded-brand-sm border border-line bg-surface-solid p-0 text-ink shadow-brand backdrop:bg-ink/60"
      >
        <div className="relative p-6 sm:p-8">
          <button
            type="button"
            onClick={close}
            aria-label="Cerrar"
            className="absolute right-4 top-4 cursor-pointer rounded-full p-1 text-xl leading-none text-ink-soft hover:text-ink"
          >
            ×
          </button>
          <h2 id={titleId} className="pr-8 font-serif text-2xl font-bold text-ink">
            Descarga este artículo
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Déjanos tu correo para descargar «{title}». Con un solo registro desbloqueas todas
            nuestras publicaciones protegidas durante 3 meses.
          </p>

          <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-4">
            <InputField
              label="Correo electrónico"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
              }}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? errorId : undefined}
              hint="Usaremos tu correo solo para saber quién lee nuestras publicaciones."
            />
            {error ? (
              <p id={errorId} role="alert" className="-mt-2 text-sm text-red">
                {error}
              </p>
            ) : null}

            {/* Honeypot: off-screen rather than display:none, which some bots skip. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor={`${titleId}-${HONEYPOT_FIELD}`}>No completar</label>
              <input
                id={`${titleId}-${HONEYPOT_FIELD}`}
                name={HONEYPOT_FIELD}
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <div>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Enviando…" : "Enviar y descargar"}
              </Button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
