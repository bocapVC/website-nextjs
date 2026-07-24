export interface ContactTopic {
  label: string;
  value: string;
}

/**
 * Options for the Contacto form's "tema" select.
 *
 * `value` is what gets submitted to the Google Form and must match one of the
 * form's configured multiple-choice options exactly (case-sensitive, verified
 * against the live form's option list) — the dropdown has no "other" free-text
 * fallback, so any mismatch is rejected server-side with a 400.
 */
export const CONTACT_TOPICS: ContactTopic[] = [
  { label: "Membresías", value: "Membresia" },
  { label: "Alianzas institucionales", value: "Alianzas Institucionales" },
  { label: "Reportes e investigación", value: "Reportes e Investigación" },
  { label: "Eventos y participación", value: "Eventos y Participación" },
  { label: "Prensa y visibilidad", value: "Prensa y Visibilidad" },
  { label: "Otro", value: "Otro" },
];
