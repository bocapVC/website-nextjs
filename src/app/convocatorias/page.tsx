import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Eventos } from "@/components/sections/convocatorias/Eventos";
import { AceleradorasAplicaciones } from "@/components/sections/convocatorias/AceleradorasAplicaciones";

export const metadata: Metadata = {
  title: "Convocatorias",
  description:
    "Eventos y convocatorias de aceleradoras del ecosistema de capital emprendedor en Bolivia.",
};

export default function ConvocatoriasPage() {
  return (
    <>
      <PageHeader
        photo="/convocatoria.avif"
        eyebrow="Convocatorias"
        title="Eventos y convocatorias"
        description="Encuentros, demo days y convocatorias de aceleradoras del ecosistema."
      />
      <Eventos />
      <AceleradorasAplicaciones />
    </>
  );
}
