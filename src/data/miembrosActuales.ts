export interface CurrentMember {
  name: string;
  type: string;
}

/** Same real membership roster as src/data/miembrosAliados.ts and src/data/directorio.ts. */
export const MIEMBROS_ACTUALES: CurrentMember[] = [
  { name: "Babasú Ventures", type: "Fondo" },
  { name: "Cibersons", type: "Tecnología" },
  { name: "Escalatec", type: "Fondo" },
  { name: "iThink VC", type: "VC" },
];
