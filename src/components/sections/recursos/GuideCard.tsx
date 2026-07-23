import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { MaybeExternalLink } from "@/components/ui/ExternalLink";
import type { Guide } from "@/data/guiasArticulos";

interface GuideCardProps {
  guide: Guide;
}

/** Single guide/article card; wraps itself in a link when `guide.url` is present. */
export function GuideCard({ guide }: GuideCardProps) {
  return (
    <MaybeExternalLink href={guide.url} className="block">
      <Card interactive={Boolean(guide.url)}>
        <Badge>{guide.category}</Badge>
        <p className="mt-3 font-serif text-xl font-bold text-ink">{guide.title}</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{guide.excerpt}</p>
        <p className="mt-4 text-xs uppercase tracking-wide text-ink-soft">{guide.meta}</p>
      </Card>
    </MaybeExternalLink>
  );
}
