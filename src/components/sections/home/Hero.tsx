import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

/** Ink-toned landing band: eyebrow, serif headline, tagline, and the two primary CTAs. */
export function Hero() {
  return (
    <Section
      tone="ink"
      firstOnPage
      photo="/illimani.avif"
      sectionClassName="lg:flex lg:min-h-[90vh] lg:flex-col lg:items-center lg:justify-center"
      className="relative z-10 flex flex-col items-center gap-6 text-center"
    >
      <Eyebrow className="text-red">Asociación Boliviana de Capital Semilla y Emprendedor</Eyebrow>
      <h1 className="max-w-6xl font-serif text-5xl font-bold text-white sm:text-6xl">
        Creemos en el poder de las <span className="text-red">startups</span> para transformar la economía.
      </h1>
      <p className="max-w-3xl text-md text-white/70">
         Apoyo estratégico e inversion de capital inteligente a emprendedores visionarios que están creando las soluciones del mañana.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button href="/contacto" variant="primary">
          Contáctanos
        </Button>
        <Button href="/ecosistema" variant="ghost" className="border-white/30 text-white hover:border-white hover:bg-white/10">
          Explora el ecosistema
        </Button>
      </div>
    </Section>
  );
}
