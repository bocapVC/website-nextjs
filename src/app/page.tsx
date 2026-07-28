import { Hero } from "@/components/sections/home/Hero";
import { QueEs } from "@/components/sections/home/QueEs";
import { AQuienRepresenta } from "@/components/sections/home/AQuienRepresenta";
import { QueHace } from "@/components/sections/home/QueHace";
import { Cifras } from "@/components/sections/home/Cifras";
import { QueObtienes } from "@/components/sections/home/QueObtienes";
import { JuntaDirectiva } from "@/components/sections/home/JuntaDirectiva";
import { MiembrosAliados } from "@/components/sections/home/MiembrosAliados";
import { QuickAccess } from "@/components/sections/home/QuickAccess";

export default function Home() {
  return (
    <>
      <Hero />
      <QueEs />
      <AQuienRepresenta />
      <QueHace />
      <Cifras />
      <QueObtienes />
      <JuntaDirectiva />
      <MiembrosAliados />
      <QuickAccess />
    </>
  );
}
