import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GUIAS_ARTICULOS } from "@/data/guiasArticulos";
import { GuideCard } from "./GuideCard";

/** News-card grid of guides/articles; shows an honest "Próximamente" state while GUIAS_ARTICULOS is empty. */
export function GuiasArticulos() {
  return (
    <Section firstOnPage>
      <SectionHeading
        eyebrow="Recursos"
        title="Guías y artículos"
        description="Contenido para entender el capital emprendedor en Bolivia."
      />

      {GUIAS_ARTICULOS.length > 0 ? (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GUIAS_ARTICULOS.map((guide) => (
            <GuideCard key={guide.title} guide={guide} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-brand border border-dashed border-line-strong bg-surface-solid p-10 text-center">
          <p className="text-ink-soft">Próximamente: guías y artículos sobre el ecosistema.</p>
        </div>
      )}
    </Section>
  );
}
