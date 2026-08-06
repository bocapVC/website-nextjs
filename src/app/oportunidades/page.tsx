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

// Event vigente/pasado badges are derived from today's date, so this page can't be
// prerendered once and left alone — regenerate it hourly to stay in sync.
export const revalidate = 3600;

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
