import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Mist-toned band inviting visitors to join the BOCAP network, CTA to membership. */
export function UneteRed() {
  return (
    <Section tone="mist" className="flex flex-col items-center gap-6 text-center">
      <SectionHeading
        eyebrow="Únete"
        title="Forma parte de la red BOCAP"
        description="Súmate a la red de fondos, ángeles, aceleradoras y startups que impulsan el capital emprendedor en Bolivia."
        align="center"
      />
      <Button href="/membresia" variant="primary">
        Quiero ser miembro
      </Button>
    </Section>
  );
}
