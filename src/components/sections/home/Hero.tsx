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
      <Eyebrow className="text-red">BOCAP</Eyebrow>
      <h1 className="max-w-6xl font-serif text-5xl font-bold text-white sm:text-6xl">
        La red de inversión en <span className="text-red">startups</span> de
        Bolivia
      </h1>
      <p className="max-w-3xl text-md text-white/70">
        Reunimos a fondos, ángeles, family offices y corporativos que invierten,
        o quieren empezar a invertir, en startups bolivianas.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button href="/membresia" variant="primary">
          Quiero ser miembro
        </Button>
        <Button
          href="/ecosistema"
          variant="ghost"
          className="border-white/30 text-white hover:border-white hover:bg-white/10"
        >
          Explora el ecosistema
        </Button>
      </div>
    </Section>
  );
}
