import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

/** Ink-toned landing band: eyebrow, serif headline, tagline, and the two primary CTAs. */
export function Hero() {
  return (
    <Section tone="ink" className="flex flex-col items-center gap-6 py-24 text-center sm:py-32">
      <Eyebrow className="text-red">Bocap.vc</Eyebrow>
      <h1 className="max-w-2xl font-serif text-4xl font-bold text-white sm:text-6xl">
        Capital emprendedor en Bolivia
      </h1>
      <p className="max-w-xl text-lg text-white/70">
        Reunimos fondos, aceleradoras y fundadores en una sola conversación
        sobre el ecosistema.
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
