import { Eyebrow } from "@/components/ui/Eyebrow";
import { SITE } from "@/config/nav";

/** Left column of the Contacto page: intro copy + direct email. */
export function ContactoInfo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <Eyebrow>Contacto</Eyebrow>
        <h1 className="font-serif text-3xl font-bold leading-tight text-ink sm:text-4xl">
          Conversemos sobre el capital emprendedor en Bolivia
        </h1>
      </div>

      <p className="max-w-md text-base leading-relaxed text-ink-soft">
        ¿Quieres formar parte del ecosistema, proponer una alianza o conocer más sobre
        nuestros reportes y oportunidades? Escríbenos y te pondremos en contacto con el
        equipo indicado. Respondemos habitualmente en pocos días hábiles.
      </p>

      <div className="rounded-brand-sm border border-line bg-surface-solid p-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-red">
          Correo institucional
        </p>
        <a
          href={`mailto:${SITE.email}`}
          className="mt-2 inline-block text-lg font-medium text-ink hover:text-teal"
        >
          {SITE.email}
        </a>
      </div>
    </div>
  );
}
