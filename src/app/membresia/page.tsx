import { QuienPuedeParticipar } from "@/components/sections/membresia/QuienPuedeParticipar";
import { Beneficios } from "@/components/sections/membresia/Beneficios";
import { Ecosistema } from "@/components/sections/shared/Ecosistema";
import { UnirseForm } from "@/components/sections/membresia/UnirseForm";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Membresía",
  description: "Quién puede participar en BOCAP, tipos de membresía y cómo unirte.",
  path: "/membresia",
});

export default function MembresiaPage() {
  return (
    <>
      <QuienPuedeParticipar />
      <Beneficios />
      <Ecosistema showOrgCta={false} />
      <UnirseForm />
    </>
  );
}
