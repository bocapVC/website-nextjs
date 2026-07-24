/** One of the three directory tabs that share the DirectoryEntry shape (Startups has its own shape in data/startups.ts). */
export type DirectorioCategory = "Fondos" | "Ángeles" | "Aceleradoras";

export interface DirectoryEntry {
  name: string;
  category: DirectorioCategory;
  type: string;
  description: string;
  location: string;
  focus: string[];
  website?: string;
  /** Path under /public, e.g. "/logos/escalatec.svg". */
  logo?: string;
}

export const DIRECTORIO: DirectoryEntry[] = [
  {
    name: "Babasú Ventures",
    category: "Fondos",
    type: "Venture capital de impacto",
    description:
      "Invierte en startups con potencial de crecimiento e impacto, combinando capital, acompañamiento y visión estratégica para escalar innovación desde Bolivia hacia la región.",
    location: "Bolivia · LatAm",
    focus: ["Impacto", "Early-stage", "Capital inteligente"],
    website: "https://www.babasuventures.com/",
    logo: "/logos/babasu-ventures.png",
  },
  {
    name: "Cibersons",
    category: "Aceleradoras",
    type: "Desarrollo digital e innovación",
    description:
      "Promueve talento, innovación y transformación digital en Bolivia, conectando capacidades tecnológicas con nuevas oportunidades para empresas, startups y ecosistema.",
    location: "Bolivia",
    focus: ["Tecnología", "Talento", "Innovación"],
    website: "https://www.cibersons.com/",
    logo: "/logos/cibersons.svg",
  },
  {
    name: "Escalatec",
    category: "Fondos",
    type: "Fondo de capital emprendedor",
    description:
      "Invierte en startups con alto potencial y acompaña a founders con capital, disciplina de crecimiento y conexiones relevantes para expandirse en Bolivia y LATAM.",
    location: "Bolivia · LatAm",
    focus: ["Scale-up", "Tecnología", "Expansión regional"],
    website: "https://escalatec.vc/",
    logo: "/logos/escalatec.svg",
  },
  {
    name: "iThink VC",
    category: "Fondos",
    type: "Firma de venture capital",
    description:
      "Conecta startups con capital inteligente y oportunidades de inversión estratégica, fortaleciendo la visibilidad de Bolivia dentro de la conversación regional de venture capital.",
    location: "Bolivia · LATAM",
    focus: ["VC", "Dealflow", "Coinversión"],
    website: "https://www.ithink.vc/",
    logo: "/logos/ithink-vc.svg",
  },
];
