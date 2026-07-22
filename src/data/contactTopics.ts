export interface ContactTopic {
  label: string;
  value: string;
}

/**
 * Options for the Contacto form's "tema" select.
 *
 * `value` is what gets submitted to the Google Form and must match one of the
 * form's configured multiple-choice options exactly. The first entry's Google
 * choice has no accent ("Membresias") — flagged to verify once live.
 */
export const CONTACT_TOPICS: ContactTopic[] = [
  { label: "Membresías", value: "Membresias" },
  { label: "Alianzas institucionales", value: "Alianzas institucionales" },
  { label: "Reportes e investigación", value: "Reportes e investigación" },
  { label: "Eventos y participación", value: "Eventos y participación" },
  { label: "Prensa y visibilidad", value: "Prensa y visibilidad" },
  { label: "Otro", value: "Otro" },
];
