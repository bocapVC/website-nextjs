import { ArrowDownTray } from "@/components/icons/ArrowDownTray";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { LockClosed } from "@/components/icons/LockClosed";
import type { Guide } from "@/data/guiasArticulos";
import { ProtectedDownload } from "./ProtectedDownload";

interface GuideCardProps {
  guide: Guide;
}

/**
 * Single guide/article card. Only the "Descargar" anchor is clickable — the card itself
 * is inert, so the pointer and the click target stay on the link alone. A protected
 * guide swaps the link for `ProtectedDownload`, which asks for an email first.
 */
export function GuideCard({ guide }: GuideCardProps) {
  const isProtected = guide.access === "protected";
  return (
    <Card className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-3">
        {isProtected ? (
          <Badge tone="gold">
            <LockClosed className="h-3.5 w-3.5" />
            Requiere correo
          </Badge>
        ) : null}
        {/* `ml-auto` pins the category pill to the card's top-right corner either way. */}
        <Badge className="ml-auto">{guide.category}</Badge>
      </div>
      <p className="mt-3 font-serif text-xl font-bold text-ink">{guide.title}</p>
      {guide.author ? (
        <p className="mt-1 text-xs uppercase tracking-wide text-ink-soft">{guide.author}</p>
      ) : null}
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{guide.excerpt}</p>
      <div className="mt-auto flex items-center justify-between gap-3 pt-4">
        <p className="text-xs uppercase tracking-wide text-ink-soft">{guide.meta}</p>
        {guide.url && isProtected ? (
          <ProtectedDownload title={guide.title} url={guide.url} />
        ) : guide.url ? (
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
