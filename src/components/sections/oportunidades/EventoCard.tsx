import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { Evento } from "@/data/eventos";
import { eventoStatus, formatEventoDate } from "@/lib/eventos";

interface EventoCardProps {
  evento: Evento;
}

/** Single event feature card: optional flyer, date + status badge, title, description, location, and a "Más información" button when `evento.url` is present. */
export function EventoCard({ evento }: EventoCardProps) {
  const status = eventoStatus(evento);

  return (
    <Card className={evento.image && "overflow-hidden"}>
      {evento.image && (
        // Negative margins cancel the Card's padding so the flyer sits flush
        // against the rounded top edge.
        <div className="relative -mx-6 -mt-6 mb-5 aspect-square">
          <Image
            src={evento.image.src}
            alt={evento.image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="flex items-center justify-between gap-2">
        <p className="font-serif text-lg font-bold text-red">{formatEventoDate(evento)}</p>
        <Badge tone={status === "vigente" ? "gold" : "neutral"}>
          {status === "vigente" ? "Vigente" : "Pasado"}
        </Badge>
      </div>
      <p className="mt-3 font-semibold text-ink">{evento.title}</p>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{evento.description}</p>
      <p className="mt-4 text-xs uppercase tracking-wide text-ink-soft">{evento.location}</p>
      {evento.url && (
        <Button href={evento.url} external size="sm" className="mt-5">
          Más información
        </Button>
      )}
    </Card>
  );
}
