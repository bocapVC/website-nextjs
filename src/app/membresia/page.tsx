import type { Metadata } from "next";
import { QuienPuedeParticipar } from "@/components/sections/membresia/QuienPuedeParticipar";
import { TiposDeMiembro } from "@/components/sections/membresia/TiposDeMiembro";
import { Beneficios } from "@/components/sections/membresia/Beneficios";
import { MiembrosActuales } from "@/components/sections/membresia/MiembrosActuales";
import { UnirseForm } from "@/components/sections/membresia/UnirseForm";

export const metadata: Metadata = {
  title: "Membresía",
  description: "Quién puede participar en BOCAP, tipos de membresía y cómo unirte.",
};

export default function MembresiaPage() {
  return (
    <>
      <QuienPuedeParticipar />
      <TiposDeMiembro />
      <Beneficios />
      <MiembrosActuales />
      <UnirseForm />
    </>
  );
}
