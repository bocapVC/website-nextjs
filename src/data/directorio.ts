export interface DirectoryEntry {
  name: string;
  /** Free-form category as classified in the source data (e.g. "Fondo", "VC", "Tecnología"). */
  category: string;
  type: string;
  description: string;
  location: string;
  focus: string[];
  website?: string;
}

export const DIRECTORIO: DirectoryEntry[] = [
  {
    name: "Babasú Ventures",
    category: "Fondo",
    type: "Venture capital de impacto",
    description:
      "Invierte en startups con potencial de crecimiento e impacto, combinando capital, acompañamiento y visión estratégica para escalar innovación desde Bolivia hacia la región.",
    location: "Bolivia · LatAm",
    focus: ["Impacto", "Early-stage", "Capital inteligente"],
    website: "https://www.babasuventures.com/",
  },
  {
    name: "Cibersons",
    category: "Tecnología",
    type: "Desarrollo digital e innovación",
    description:
      "Promueve talento, innovación y transformación digital en Bolivia, conectando capacidades tecnológicas con nuevas oportunidades para empresas, startups y ecosistema.",
    location: "Bolivia",
    focus: ["Tecnología", "Talento", "Innovación"],
    website: "https://www.cibersons.com/",
  },
  {
    name: "Escalatec",
    category: "Fondo",
    type: "Fondo de capital emprendedor",
    description:
      "Invierte en startups con alto potencial y acompaña a founders con capital, disciplina de crecimiento y conexiones relevantes para expandirse en Bolivia y LATAM.",
    location: "Bolivia · LatAm",
    focus: ["Scale-up", "Tecnología", "Expansión regional"],
    website: "https://escalatec.vc/",
  },
  {
    name: "iThink VC",
    category: "VC",
    type: "Firma de venture capital",
    description:
      "Conecta startups con capital inteligente y oportunidades de inversión estratégica, fortaleciendo la visibilidad de Bolivia dentro de la conversación regional de venture capital.",
    location: "Bolivia · LATAM",
    focus: ["VC", "Dealflow", "Coinversión"],
    website: "https://www.ithink.vc/",
  },
];

/** "Todos" plus every distinct category present in DIRECTORIO, in first-seen order. */
export const DIRECTORY_CATEGORIES: string[] = [
  "Todos",
  ...Array.from(new Set(DIRECTORIO.map((entry) => entry.category))),
];
