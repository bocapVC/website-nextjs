import { Hero } from "@/components/sections/home/Hero";
import { QueEs } from "@/components/sections/home/QueEs";
import { QueObtienes } from "@/components/sections/home/QueObtienes";
import { Ecosistema } from "@/components/sections/home/Ecosistema";
import { OportunidadesEventosRecursos } from "@/components/sections/home/OportunidadesEventosRecursos";
import { QuienesConforman } from "@/components/sections/home/QuienesConforman";
import { Cierre } from "@/components/sections/home/Cierre";

export default function Home() {
  return (
    <>
      <Hero />
      <QueEs />
      <QueObtienes />
      <Ecosistema />
      <OportunidadesEventosRecursos />
      <QuienesConforman />
      <Cierre />
    </>
  );
}
