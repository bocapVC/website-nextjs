import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";

interface Elegible {
  label: string;
  description: string;
}

const ELEGIBLES: Elegible[] = [
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

/** Ink-toned hero: who is eligible to join BOCAP, as a 2-col bullet list. */
export function QuienPuedeParticipar() {
  return (
    <Section tone="ink" className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <Eyebrow className="text-red">Membresía</Eyebrow>
        <h1 className="max-w-2xl font-serif text-3xl font-bold text-white sm:text-4xl">
          ¿Quién puede participar en BOCAP?
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-white/70">
          BOCAP reúne a los actores que están construyendo el mercado de capital emprendedor
          en Bolivia.
        </p>
      </div>

      <ul className="grid gap-6 sm:grid-cols-2">
        {ELEGIBLES.map((item) => (
          <li key={item.label} className="flex flex-col gap-1">
            <p className="font-semibold text-white">{item.label}</p>
            <p className="text-sm text-white/70">{item.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
