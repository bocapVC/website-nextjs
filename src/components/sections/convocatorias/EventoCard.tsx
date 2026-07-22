import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { Evento } from "@/data/eventos";

interface EventoCardProps {
  evento: Evento;
}

/** Single event feature card: date + status badge, title, description, location; wraps itself in a link when `evento.url` is present. */
export function EventoCard({ evento }: EventoCardProps) {
  const content = (
    <Card interactive={Boolean(evento.url)}>
      <div className="flex items-center justify-between gap-2">
        <p className="font-serif text-lg font-bold text-red">{evento.date}</p>
        <Badge tone={evento.status === "vigente" ? "gold" : "neutral"}>
          {evento.status === "vigente" ? "Vigente" : "Pasado"}
        </Badge>
      </div>
      <p className="mt-3 font-semibold text-ink">{evento.title}</p>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{evento.description}</p>
      <p className="mt-4 text-xs uppercase tracking-wide text-ink-soft">{evento.location}</p>
    </Card>
  );

  if (evento.url) {
    return (
      <a href={evento.url} target="_blank" rel="noreferrer" className="block">
        {content}
      </a>
    );
  }

  return content;
}
