export interface BoardMember {
  name: string;
  role: string;
  organization?: string;
  bio?: string;
  linkedin?: string;
  photo?: string;
}

export const JUNTA_DIRECTIVA: BoardMember[] = [
  {
    name: "Corina Marion",
    role: "Presidenta",
    organization: "Babasú Ventures",
    bio: "Managing Partner de Babasú Ventures. Reconocida por LAVCA (2024) entre las principales mujeres inversionistas de América Latina.",
    linkedin: "https://bo.linkedin.com/in/corina-marion",
    photo: "/photos/corina.webp",
  },
  {
    name: "Viviana Coloma",
    role: "Vicepresidenta",
    organization: "Escalatec · Aceleradora SOLYDES",
    bio: "Lidera la Aceleradora SOLYDES y es Fund Manager de Escalatec, fondo pionero de capital emprendedor en Bolivia.",
    linkedin: "https://bo.linkedin.com/in/viviana-coloma-6521b796",
    photo: "/photos/viviana.jpg",
  },
  {
    name: "Juan Cruz Valdez Rojas",
    role: "Secretario",
    organization: "iThink VC",
    bio: "Cofundador y socio general de iThink VC, firma que invierte en startups tempranas de América Latina.",
    linkedin: "https://ar.linkedin.com/in/juan-cruz-valdez-rojas",
    photo: "/photos/juan-cruz.jpeg",
  },
  {
    name: "Álvaro Villarroel",
    role: "Tesorero",
    organization: "Escalatec",
    bio: "Managing Partner de Escalatec, con trayectoria en finanzas corporativas y gestión de fondos.",
    linkedin: "https://bo.linkedin.com/in/alvaro-villarroel-val",
    photo: "/photos/alvaro.jpg",
  },
];
