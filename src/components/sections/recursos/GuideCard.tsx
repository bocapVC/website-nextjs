import { ArrowDownTray } from "@/components/icons/ArrowDownTray";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ExternalLink } from "@/components/ui/ExternalLink";
import type { Guide } from "@/data/guiasArticulos";

interface GuideCardProps {
  guide: Guide;
}

/**
 * Single guide/article card. Only the "Descargar" anchor is clickable — the card itself
 * is inert, so the pointer and the click target stay on the link alone.
 */
export function GuideCard({ guide }: GuideCardProps) {
  return (
    <Card className="flex h-full flex-col">
      {/* `self-end` both keeps the pill at its content width (a flex column would
          otherwise stretch it) and pins it to the card's top-right corner. */}
      <Badge className="self-end">{guide.category}</Badge>
      <p className="mt-3 font-serif text-xl font-bold text-ink">{guide.title}</p>
      {guide.author ? (
        <p className="mt-1 text-xs uppercase tracking-wide text-ink-soft">{guide.author}</p>
      ) : null}
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{guide.excerpt}</p>
      <div className="mt-auto flex items-center justify-between gap-3 pt-4">
        <p className="text-xs uppercase tracking-wide text-ink-soft">{guide.meta}</p>
        {guide.url ? (
          <ExternalLink
            href={guide.url}
            className="group inline-flex shrink-0 cursor-pointer items-center gap-1.5 text-sm font-semibold text-teal hover:text-teal-strong"
          >
            <span className="group-hover:underline">Descargar</span>
            <ArrowDownTray className="h-4 w-4" />
          </ExternalLink>
        ) : null}
      </div>
    </Card>
  );
}
