import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { LockClosed } from "@/components/icons/LockClosed";
import { publicacionMeta, publicacionPath, type Publicacion } from "@/lib/publicaciones";
import { DownloadAction } from "./DownloadAction";

interface PublicacionCardProps {
  publicacion: Publicacion;
}

const linkClasses =
  "shrink-0 text-sm font-semibold text-teal hover:text-teal-strong hover:underline";

/**
 * Single publication card. The card itself is inert: the title links to the
 * publication's page, and the footer holds one action — "Leer" for a written post,
 * or "Descargar" for a file-only publication (email-gated when protected).
 */
export function PublicacionCard({ publicacion }: PublicacionCardProps) {
  const href = publicacionPath(publicacion);
  const downloadsHere = !publicacion.body && Boolean(publicacion.file);
  return (
    <Card className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-3">
        {downloadsHere && publicacion.access === "protected" ? (
          <Badge tone="gold">
            <LockClosed className="h-3.5 w-3.5" />
            Requiere correo
          </Badge>
        ) : null}
        {/* `ml-auto` pins the category pill to the card's top-right corner either way. */}
        <Badge className="ml-auto">{publicacion.category}</Badge>
      </div>
      <h3 className="mt-3 font-serif text-xl font-bold text-ink">
        <Link href={href} className="hover:text-teal-strong hover:underline">
          {publicacion.title}
        </Link>
      </h3>
      {publicacion.author ? (
        <p className="mt-1 text-xs uppercase tracking-wide text-ink-soft">{publicacion.author}</p>
      ) : null}
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{publicacion.excerpt}</p>
      <div className="mt-auto flex items-center justify-between gap-3 pt-4">
        <p className="text-xs uppercase tracking-wide text-ink-soft">{publicacionMeta(publicacion)}</p>
        {downloadsHere ? (
          <DownloadAction publicacion={publicacion} />
        ) : (
          <Link href={href} className={linkClasses} aria-label={`Leer «${publicacion.title}»`}>
            Leer
          </Link>
        )}
      </div>
    </Card>
  );
}
