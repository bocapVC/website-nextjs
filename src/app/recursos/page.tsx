import type { Metadata } from "next";
import { RecursosHeader } from "@/components/sections/recursos/RecursosHeader";
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
      <RecursosHeader />
      <GuiasArticulos />
      <Reportes />
    </>
  );
}
