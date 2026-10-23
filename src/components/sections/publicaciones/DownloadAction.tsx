import { ArrowDownTray } from "@/components/icons/ArrowDownTray";
import { ExternalLink } from "@/components/ui/ExternalLink";
import type { Publicacion } from "@/lib/publicaciones";
import { ProtectedDownload } from "./ProtectedDownload";

/**
 * "Descargar" for a publication's file: a plain link when open, or `ProtectedDownload`,
 * which asks for an email first, when protected. Renders nothing without a file.
 */
export function DownloadAction({ publicacion }: { publicacion: Publicacion }) {
  if (!publicacion.file) return null;
  if (publicacion.access === "protected") {
    return <ProtectedDownload title={publicacion.title} url={publicacion.file} />;
  }
  return (
    <ExternalLink
      href={publicacion.file}
      className="group inline-flex shrink-0 cursor-pointer items-center gap-1.5 text-sm font-semibold text-teal hover:text-teal-strong"
    >
      <span className="group-hover:underline">Descargar</span>
      <ArrowDownTray className="h-4 w-4" />
    </ExternalLink>
  );
}
