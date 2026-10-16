import { PageHeader } from "@/components/ui/PageHeader";
import { GuiasArticulos } from "@/components/sections/publicaciones/GuiasArticulos";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Publicaciones",
  description:
    "Artículos y guías de BOCAP sobre el ecosistema de capital emprendedor en Bolivia.",
  path: "/publicaciones",
});

export default function PublicacionesPage() {
  return (
    <>
      {/* illimani.avif is a placeholder until a dedicated publicaciones photo is ready */}
      <PageHeader
        photo="/illimani.avif"
        photoPosition="top"
        eyebrow="Publicaciones"
        title="Artículos y guías"
        description="Análisis y miradas de BOCAP y su red para entender el capital emprendedor en Bolivia."
      />
      <GuiasArticulos />
    </>
  );
}
