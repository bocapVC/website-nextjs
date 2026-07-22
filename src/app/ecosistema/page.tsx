import type { Metadata } from "next";
import { StartupGrid } from "@/components/sections/ecosistema/StartupGrid";
import { DirectorioFiltrable } from "@/components/sections/ecosistema/DirectorioFiltrable";

export const metadata: Metadata = {
  title: "Ecosistema",
  description:
    "Startups, fondos, VCs y organizaciones que forman parte del ecosistema de capital emprendedor en Bolivia.",
};

export default function EcosistemaPage() {
  return (
    <>
      <StartupGrid />
      <DirectorioFiltrable />
    </>
  );
}
