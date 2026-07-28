import type { Metadata } from "next";
import { ConvocatoriasHeader } from "@/components/sections/convocatorias/ConvocatoriasHeader";
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
      <ConvocatoriasHeader />
      <Eventos />
      <AceleradorasAplicaciones />
    </>
  );
}
