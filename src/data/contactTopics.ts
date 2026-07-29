export interface ContactTopic {
  label: string;
  value: string;
}

/**
 * Options for the Contacto form's "tema" select.
 *
 * `value` is what gets submitted to the Google Form and must match one of the
 * form's configured multiple-choice options exactly — case- and accent-sensitive.
 * Re-verified against the live form 2026-07-28. Note `Membresia` is deliberately
 * singular and unaccented: that is the form's option, even though the label users
 * see is "Membresías". The choice list has no "other" free-text fallback, so a
 * value the form doesn't recognize is lost rather than recorded.
 */
export const CONTACT_TOPICS: ContactTopic[] = [
  { label: "Membresías", value: "Membresia" },
  { label: "Alianzas institucionales", value: "Alianzas Institucionales" },
  { label: "Reportes e investigación", value: "Reportes e Investigación" },
  { label: "Eventos y participación", value: "Eventos y Participación" },
  { label: "Prensa y visibilidad", value: "Prensa y Visibilidad" },
  { label: "Otro", value: "Otro" },
];
