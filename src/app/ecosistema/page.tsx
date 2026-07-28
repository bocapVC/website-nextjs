import { PageHeader } from "@/components/ui/PageHeader";
import { EcosistemaTabs } from "@/components/sections/ecosistema/EcosistemaTabs";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Ecosistema",
  description:
    "Fondos, ángeles, aceleradoras y startups que forman parte del ecosistema de capital emprendedor en Bolivia.",
  path: "/ecosistema",
});

export default function EcosistemaPage() {
  return (
    <>
      <PageHeader
        photo="/ecosistema.avif"
        eyebrow="Ecosistema"
        title="Fondos, ángeles, aceleradoras y startups"
        description="Directorio de organizaciones y emprendimientos que forman parte de la red BOCAP."
      />
      <EcosistemaTabs />
    </>
  );
}
