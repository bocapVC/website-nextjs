import { PageHeader } from "@/components/ui/PageHeader";
import { Eventos } from "@/components/sections/oportunidades/Eventos";
import { AceleradorasAplicaciones } from "@/components/sections/oportunidades/AceleradorasAplicaciones";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Oportunidades",
  description:
    "Eventos y oportunidades de aceleradoras del ecosistema de capital emprendedor en Bolivia.",
  path: "/oportunidades",
});

export default function OportunidadesPage() {
  return (
    <>
      <PageHeader
        photo="/oportunidades.avif"
        eyebrow="Oportunidades"
        title="Eventos y convocatorias"
        description="Encuentros, demo days y oportunidades de aceleradoras del ecosistema."
      />
      <Eventos />
      <AceleradorasAplicaciones />
    </>
  );
}
