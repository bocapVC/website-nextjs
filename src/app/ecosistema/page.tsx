import type { Metadata } from "next";
import { EcosistemaHeader } from "@/components/sections/ecosistema/EcosistemaHeader";
import { EcosistemaTabs } from "@/components/sections/ecosistema/EcosistemaTabs";

export const metadata: Metadata = {
  title: "Ecosistema",
  description:
    "Fondos, ángeles, aceleradoras y startups que forman parte del ecosistema de capital emprendedor en Bolivia.",
};

export default function EcosistemaPage() {
  return (
    <>
      <EcosistemaHeader />
      <EcosistemaTabs />
    </>
  );
}
