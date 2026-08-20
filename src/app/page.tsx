import { Hero } from "@/components/sections/home/Hero";
import { QueEs } from "@/components/sections/home/QueEs";
import { Ecosistema } from "@/components/sections/shared/Ecosistema";
import { OportunidadesEventosRecursos } from "@/components/sections/home/OportunidadesEventosRecursos";
import { QuienesConforman } from "@/components/sections/home/QuienesConforman";
import { Cierre } from "@/components/sections/home/Cierre";
import { SectionNavigation } from "@/components/ui/SectionNavigation";

export default function Home() {
  return (
    <>
      <SectionNavigation />
      <Hero />
      <QueEs />
      <Ecosistema />
      <OportunidadesEventosRecursos />
      <QuienesConforman />
      <Cierre />
    </>
  );
}
