export interface BoardMember {
  name: string;
  role: string;
  organization?: string;
}

export const JUNTA_DIRECTIVA: BoardMember[] = [
  { name: "María Fernanda Rojas", role: "Presidenta", organization: "Andes Ventures" },
  { name: "Diego Salazar", role: "Vicepresidente", organization: "Fundación Emprender" },
  { name: "Camila Vargas", role: "Secretaria", organization: "Altiplano Capital" },
  { name: "Rodrigo Peña", role: "Tesorero", organization: "Impulso Bolivia" },
];
