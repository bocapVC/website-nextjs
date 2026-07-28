import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { GuiasArticulos } from "@/components/sections/recursos/GuiasArticulos";
import { Reportes } from "@/components/sections/recursos/Reportes";

export const metadata: Metadata = {
  title: "Recursos",
  description:
    "Guías, artículos y reportes sobre el ecosistema de capital emprendedor en Bolivia.",
};

export default function RecursosPage() {
  return (
    <>
      {/* illimani.avif is a placeholder until a dedicated recursos photo is ready */}
      <PageHeader
        photo="/illimani.avif"
        eyebrow="Recursos"
        title="Guías, artículos y reportes"
        description="Contenido para entender el ecosistema de capital emprendedor en Bolivia."
      />
      <GuiasArticulos />
      <Reportes />
    </>
  );
}
