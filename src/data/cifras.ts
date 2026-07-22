export interface Stat {
  value: string;
  label: string;
  description?: string;
}

export const CIFRAS: Stat[] = [
  { value: "40+", label: "Startups conectadas", description: "Activas en el ecosistema boliviano." },
  { value: "15", label: "Fondos y aceleradoras", description: "Participando en la red." },
  { value: "$8M+", label: "Capital movilizado", description: "En rondas facilitadas desde 2021." },
  { value: "9", label: "Departamentos", description: "Con presencia de miembros BOCAP." },
];
