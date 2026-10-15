import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SubscribeForm } from "@/components/sections/newsletter/SubscribeForm";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Newsletter",
  description:
    "Un resumen trimestral del ecosistema de capital emprendedor en Bolivia, abierto a todos.",
  path: "/newsletter",
});

const CONTENTS = [
  "Noticias del ecosistema de capital emprendedor en Bolivia y la región.",
  "Eventos y encuentros próximos.",
  "Oportunidades: convocatorias, fondos y programas de aceleración.",
  "Reportes y publicaciones de BOCAP y su red.",
];

export default function NewsletterPage() {
  return (
    <Section firstOnPage>
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Eyebrow>Newsletter</Eyebrow>
            <h1 className="font-serif text-3xl font-bold leading-tight text-ink sm:text-4xl">
              El capital emprendedor boliviano, cada trimestre en tu correo
            </h1>
          </div>
          <p className="max-w-md text-base leading-relaxed text-ink-soft">
            Una edición cada tres meses, escrita por el equipo de BOCAP. Gratis y abierta a
            todos: no necesitas ser miembro.
          </p>
          <div className="rounded-brand-sm border border-line bg-surface-solid p-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-red">
              Qué recibirás
            </p>
            <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-sm leading-relaxed text-ink">
              {CONTENTS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="rounded-brand border border-line bg-surface-solid p-6 shadow-brand sm:p-8">
          <SubscribeForm variant="full" />
        </div>
      </div>
    </Section>
  );
}
