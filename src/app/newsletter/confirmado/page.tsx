import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/metadata";

// Landing page for Brevo's double opt-in confirmation link. Not in NAV_LINKS,
// so it's also left out of the sitemap.
export const metadata = {
  ...pageMetadata({
    title: "Suscripción confirmada",
    description: "Tu suscripción al newsletter de BOCAP está confirmada.",
    path: "/newsletter/confirmado",
  }),
  robots: { index: false, follow: true },
};

export default function NewsletterConfirmadoPage() {
  return (
    <Section firstOnPage>
      <div className="mx-auto flex max-w-xl flex-col items-center gap-5 text-center">
        <Eyebrow>Newsletter</Eyebrow>
        <h1 className="font-serif text-3xl font-bold leading-tight text-ink sm:text-4xl">
          ¡Ya estás suscrito!
        </h1>
        <p className="text-base leading-relaxed text-ink-soft">
          Gracias por confirmar tu correo. Recibirás la próxima edición del newsletter de
          BOCAP con lo más importante del trimestre en el ecosistema.
        </p>
        <Button href="/">Volver al inicio</Button>
      </div>
    </Section>
  );
}
