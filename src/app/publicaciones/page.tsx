import { PageHeader } from "@/components/ui/PageHeader";
import { PublicacionesList } from "@/components/sections/publicaciones/PublicacionesList";
import { getPublicaciones } from "@/lib/getPublicaciones";
import { pageMetadata } from "@/lib/metadata";
import { HEROES } from "@/data/heroes";

export const metadata = pageMetadata({
  title: "Publicaciones",
  description:
    "Artículos y guías de BOCAP sobre el ecosistema de capital emprendedor en Bolivia.",
  path: "/publicaciones",
});

export default function PublicacionesPage() {
  return (
    <>
      <PageHeader
        hero={HEROES.publicaciones}
        eyebrow="Publicaciones"
        title="Artículos y guías"
        description="Análisis y miradas de BOCAP y su red para entender el capital emprendedor en Bolivia."
      />
      <PublicacionesList publicaciones={getPublicaciones()} />
    </>
  );
}
