import { Eyebrow } from "@/components/ui/Eyebrow";

/** Left column of the Únete section: intro copy + what-to-expect callout, mirroring ContactoInfo. */
export function UnirseInfo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <Eyebrow>Membresía</Eyebrow>
        <h2 className="font-serif text-3xl font-bold leading-tight text-ink sm:text-4xl">
          Únete a BOCAP
        </h2>
      </div>

      <p className="max-w-md text-base leading-relaxed text-ink-soft">
        Cuéntanos brevemente sobre tu organización: qué hace y a qué categoría del ecosistema
        pertenece — Fondos · Ángeles · Aceleradoras · Startups.
      </p>

      <div className="rounded-brand-sm border border-line bg-surface-solid p-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-red">Qué esperar</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Revisamos cada solicitud manualmente y te contactaremos por correo electrónico con
          los siguientes pasos, normalmente en pocos días hábiles.
        </p>
      </div>
    </div>
  );
}
