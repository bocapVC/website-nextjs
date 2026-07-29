"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { InputField, TextareaField, SelectField } from "@/components/ui/FormField";
import { StatusPanel } from "@/components/ui/StatusPanel";
import { Button } from "@/components/ui/Button";
import { CONTACT_TOPICS } from "@/data/contactTopics";
import { SITE } from "@/config/nav";
import { useContactSubmission, type ContactValues } from "@/hooks/useContactSubmission";

const EMPTY: ContactValues = {
  name: "",
  organization: "",
  email: "",
  topic: "",
  message: "",
};

interface ContactFormProps {
  /** Locks the "Tema" field to this value and hides the select, e.g. for pages that only ever submit one topic. */
  fixedTopic?: string;
  /** Extra hint text under the "Mensaje" field, e.g. prompting what the message should cover. */
  messageHint?: ReactNode;
}

export function ContactForm({ fixedTopic, messageHint }: ContactFormProps = {}) {
  const [values, setValues] = useState<ContactValues>(() => ({
    ...EMPTY,
    topic: fixedTopic ?? EMPTY.topic,
  }));
  const { status, submit } = useContactSubmission();
  const submitting = status === "submitting";

  function update<K extends keyof ContactValues>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const ok = await submit(values);
    if (ok) setValues({ ...EMPTY, topic: fixedTopic ?? EMPTY.topic });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <InputField
          label="Nombre"
          name="name"
          autoComplete="name"
          required
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
        />
        <InputField
          label="Organización"
          name="organization"
          autoComplete="organization"
          value={values.organization}
          onChange={(e) => update("organization", e.target.value)}
        />
      </div>

      <InputField
        label="Correo electrónico"
        name="email"
        type="email"
        autoComplete="email"
        required
        value={values.email}
        onChange={(e) => update("email", e.target.value)}
      />

      {fixedTopic ? null : (
        <SelectField
          label="Tema"
          name="topic"
          required
          placeholder="Selecciona un tema"
          options={CONTACT_TOPICS}
          value={values.topic}
          onChange={(e) => update("topic", e.target.value)}
        />
      )}

      <TextareaField
        label="Mensaje"
        name="message"
        required
        hint={messageHint}
        value={values.message}
        onChange={(e) => update("message", e.target.value)}
      />

      {status === "success" ? (
        <StatusPanel variant="success" title="¡Mensaje enviado!">
          Gracias por escribirnos. Te responderemos a la brevedad.
        </StatusPanel>
      ) : null}

      {status === "error" ? (
        <StatusPanel variant="error" title="No pudimos enviar tu mensaje">
          Ocurrió un problema al enviar el formulario. Intenta de nuevo o escríbenos
          directamente a {SITE.email}.
        </StatusPanel>
      ) : null}

      <div>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Enviando…" : "Enviar mensaje"}
        </Button>
      </div>
    </form>
  );
}
