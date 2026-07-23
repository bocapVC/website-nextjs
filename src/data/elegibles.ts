export interface Elegible {
  label: string;
  description: string;
}

export const ELEGIBLES: Elegible[] = [
  {
    label: "Fondos de venture capital",
    description: "Vehículos de inversión enfocados en startups en etapa temprana.",
  },
  {
    label: "Inversionistas ángeles",
    description: "Personas que invierten capital propio en startups emergentes.",
  },
  {
    label: "Aceleradoras",
    description: "Programas que forman y aceleran equipos fundadores.",
  },
  {
    label: "Corporativos",
    description: "Empresas interesadas en innovación abierta y colaboración con startups.",
  },
  {
    label: "Founders y startups",
    description: "Equipos fundadores en etapa de crecimiento y escalamiento.",
  },
  {
    label: "Aliados institucionales",
    description: "Organizaciones que impulsan el ecosistema emprendedor boliviano.",
  },
];
