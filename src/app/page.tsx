import { Hero } from "@/components/sections/home/Hero";
import { QueEs } from "@/components/sections/home/QueEs";
import { Ecosistema } from "@/components/sections/shared/Ecosistema";
import {
  OportunidadesEventosRecursos,
  visibleActivityColumns,
} from "@/components/sections/home/OportunidadesEventosRecursos";
import { QuienesConforman } from "@/components/sections/home/QuienesConforman";
import { Cierre } from "@/components/sections/home/Cierre";
import { SectionNavigation } from "@/components/ui/SectionNavigation";

// The Actualidad teaser only counts oportunidades still open today, so regenerate
// hourly rather than freezing that at build time (same as /oportunidades).
export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <SectionNavigation
        omit={visibleActivityColumns().length === 0 ? ["oportunidades"] : []}
      />
      <Hero />
      <QueEs />
      <Ecosistema />
      <OportunidadesEventosRecursos />
      <QuienesConforman />
      <Cierre />
    </>
  );
}
