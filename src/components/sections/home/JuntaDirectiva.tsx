import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JUNTA_DIRECTIVA } from "@/data/juntaDirectiva";

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

/** Mist-toned band: mini cards for each JUNTA_DIRECTIVA member, with an initials avatar. */
export function JuntaDirectiva() {
  return (
    <Section tone="mist">
      <SectionHeading eyebrow="Gobernanza" title="Junta directiva" />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {JUNTA_DIRECTIVA.map((member) => (
          <Card key={member.name} variant="mini" className="flex flex-col items-center gap-3 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-sm font-bold text-white">
              {initials(member.name)}
            </span>
            <div>
              <p className="font-semibold text-ink">{member.name}</p>
              <p className="text-sm text-ink-soft">{member.role}</p>
              {member.organization ? (
                <p className="mt-1 text-xs text-ink-soft/80">{member.organization}</p>
              ) : null}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
