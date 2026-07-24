import { Card } from "@/components/ui/Card";
import { ExternalLink } from "@/components/ui/ExternalLink";
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

/** Mist-toned band: one bio card per JUNTA_DIRECTIVA member, with an initials avatar and LinkedIn link. */
export function JuntaDirectiva() {
  return (
    <Section tone="mist">
      <SectionHeading eyebrow="Gobernanza" title="Junta directiva" />
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {JUNTA_DIRECTIVA.map((member) => (
          <Card key={member.name} className="flex items-start gap-4 text-left">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-bold text-white">
              {initials(member.name)}
            </span>
            <div>
              <p className="font-semibold text-ink">{member.name}</p>
              <p className="text-sm text-ink-soft">{member.role}</p>
              {member.organization ? (
                <p className="mt-1 text-xs text-ink-soft/80">{member.organization}</p>
              ) : null}
              {member.bio ? <p className="mt-2 text-sm text-ink-soft">{member.bio}</p> : null}
              {member.linkedin ? (
                <ExternalLink
                  href={member.linkedin}
                  className="mt-2 inline-block text-xs font-semibold text-teal hover:underline"
                >
                  LinkedIn ↗
                </ExternalLink>
              ) : null}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
