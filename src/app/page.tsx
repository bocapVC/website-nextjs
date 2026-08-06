import { Hero } from "@/components/sections/home/Hero";
import { QueEs } from "@/components/sections/home/QueEs";
import { Ecosistema } from "@/components/sections/shared/Ecosistema";
import { OportunidadesEventosRecursos } from "@/components/sections/home/OportunidadesEventosRecursos";
import { QuienesConforman } from "@/components/sections/home/QuienesConforman";
import { Cierre } from "@/components/sections/home/Cierre";

// The "Actividad" section appears/disappears based on whether any event is still
// vigente today, so this page can't be prerendered once and left alone.
export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <Hero />
      <QueEs />
      <Ecosistema />
      <OportunidadesEventosRecursos />
      <QuienesConforman />
      <Cierre />
    </>
  );
}
