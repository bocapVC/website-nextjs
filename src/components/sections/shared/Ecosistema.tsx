import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface EcosistemaProps {
  /**
   * Show the "Agregar mi organización" → /contacto CTA. Defaults to true (home).
   * Set false where the page is already /membresia — that ask is redundant there.
   */
  showOrgCta?: boolean;
}

/** Ink-toned content band teasing the ecosystem map, with CTAs to explore it or join it. */
export function Ecosistema({ showOrgCta = true }: EcosistemaProps) {
  return (
    <Section tone="ink">
      <SectionHeading
        eyebrow="Ecosistema"
        title="El mapa de startups e inversionistas de Bolivia"
        description="Explora quién está construyendo, financiando y apoyando nuevas empresas en el país: startups, fondos, ángeles, family offices, aceleradoras, y organizaciones de apoyo."
        invert
      />
      <div className="mt-10 flex flex-wrap items-center gap-4">
        <Button href="/ecosistema" variant="primary">
          Explorar el mapa
        </Button>
        {showOrgCta ? (
          <Button
            href="/contacto"
            variant="ghost"
            className="border-white/30 text-white hover:border-white hover:bg-white/10"
          >
            Agregar mi organización
          </Button>
        ) : null}
      </div>
    </Section>
  );
}
