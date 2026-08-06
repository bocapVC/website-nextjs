import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EVENTOS } from "@/data/eventos";
import { sortEventos } from "@/lib/eventos";
import { EventoCard } from "./EventoCard";

/** Feature-card grid of events; shows an honest "Próximamente" state while EVENTOS is empty. */
export function Eventos() {
  const eventos = sortEventos(EVENTOS);

  return (
    <Section>
      <SectionHeading
        eyebrow="Oportunidades"
        title="Eventos"
        description="Encuentros, demo days y actividades del ecosistema."
      />

      {eventos.length > 0 ? (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {eventos.map((evento) => (
            <EventoCard key={evento.title} evento={evento} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-brand border border-dashed border-line-strong bg-surface-solid p-10 text-center">
          <p className="text-ink-soft">Próximamente: eventos del ecosistema boliviano.</p>
        </div>
      )}
    </Section>
  );
}
