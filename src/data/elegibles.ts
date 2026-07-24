export type ElegibleIcon = "fund" | "angel" | "rocket" | "building" | "bulb" | "shield";

export interface Elegible {
  label: string;
  description: string;
  icon: ElegibleIcon;
}

export const ELEGIBLES: Elegible[] = [
  {
    label: "Fondos de venture capital",
    description: "Vehículos de inversión enfocados en startups en etapa temprana.",
    icon: "fund",
  },
  {
    label: "Inversionistas ángeles",
    description: "Personas que invierten capital propio en startups emergentes.",
    icon: "angel",
  },
  {
    label: "Aceleradoras",
    description: "Programas que forman y aceleran equipos fundadores.",
    icon: "rocket",
  },
  {
    label: "Corporativos",
    description: "Empresas interesadas en innovación abierta y colaboración con startups.",
    icon: "building",
  },
  {
    label: "Founders y startups",
    description: "Equipos fundadores en etapa de crecimiento y escalamiento.",
    icon: "bulb",
  },
  {
    label: "Aliados institucionales",
    description: "Organizaciones que impulsan el ecosistema emprendedor boliviano.",
    icon: "shield",
  },
];
