import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { STARTUPS } from "@/data/startups";

/** Feature-card grid of startups; shows an honest "Próximamente" state while STARTUPS is empty. */
export function StartupGrid() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Ecosistema"
        title="Startups destacadas"
        description="Emprendimientos bolivianos que forman parte de la red BOCAP."
      />

      {STARTUPS.length > 0 ? (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {STARTUPS.map((startup) => (
            <Card key={startup.name}>
              <Badge tone="red">{startup.sector}</Badge>
              <p className="mt-3 font-semibold text-ink">{startup.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {startup.description}
              </p>
              <p className="mt-4 text-xs uppercase tracking-wide text-ink-soft">
                {startup.location} · {startup.stage}
              </p>
            </Card>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-brand border border-dashed border-line-strong bg-surface-solid p-10 text-center">
          <p className="text-ink-soft">Próximamente: startups del ecosistema boliviano.</p>
        </div>
      )}
    </Section>
  );
}
