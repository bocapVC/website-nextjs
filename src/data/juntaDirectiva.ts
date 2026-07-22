export interface BoardMember {
  name: string;
  role: string;
  organization?: string;
}

export const JUNTA_DIRECTIVA: BoardMember[] = [
  { name: "Viviana Coloma", role: "Presidenta", organization: "Escalatec · Aceleradora SOLYDES" },
  { name: "Corina Marion", role: "Vicepresidenta", organization: "Babasú Ventures" },
  { name: "Juan Cruz Valdez Rojas", role: "Secretario", organization: "iThink VC" },
  { name: "Álvaro Villarroel", role: "Tesorero", organization: "Escalatec" },
];
