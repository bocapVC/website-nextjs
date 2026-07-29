import { PageHeader } from "@/components/ui/PageHeader";
import { Eventos } from "@/components/sections/convocatorias/Eventos";
import { AceleradorasAplicaciones } from "@/components/sections/convocatorias/AceleradorasAplicaciones";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Convocatorias",
  description:
    "Eventos y convocatorias de aceleradoras del ecosistema de capital emprendedor en Bolivia.",
  path: "/convocatorias",
});

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
