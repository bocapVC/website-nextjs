import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Mist-toned closing band: final membership CTA. */
export function Cierre() {
  return (
    <Section tone="mist" className="flex flex-col items-center gap-6 text-center">
      <SectionHeading
        eyebrow="Únete"
        title="Súmate a BOCAP"
        description="Suma tu experiencia, tu organización o tu capital a la red de inversión en startups de Bolivia."
        align="center"
      />
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button href="/membresia#unirse" variant="primary">
          Unirse
        </Button>
      </div>
    </Section>
  );
}
