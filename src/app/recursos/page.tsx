import type { Metadata } from "next";
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
      <GuiasArticulos />
      <Reportes />
    </>
  );
}
