import Image from "next/image";
import { ArrowUpRight } from "@/components/icons/ArrowUpRight";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JUNTA_DIRECTIVA } from "@/data/juntaDirectiva";
import { MIEMBROS_ALIADOS } from "@/data/miembrosAliados";

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

/**
 * Mist-toned band covering both constituencies of BOCAP: the members/allies
 * logo wall and the board. Kept as one Section (not two) since the outline
 * frames "¿Quiénes conforman BOCAP?" as a single section with two parts.
 * Board cards still show initials + bio (no photo field, no long-bio trim)
 * pending real headshots from the institution.
 */
export function QuienesConforman() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Comunidad"
        title="¿Quiénes conforman BOCAP?"
        description="BOCAP reúne a inversionistas y organizaciones que trabajan en el desarrollo del ecosistema boliviano."
      />

      <div className="mt-10">
        <p className="font-serif text-xl font-bold text-ink">Miembros</p>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {MIEMBROS_ALIADOS.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center justify-center rounded-brand-sm border border-line bg-surface-solid px-4 py-8"
            >
              {/* Local SVGs need `unoptimized` — Next's image optimizer refuses to
                  process SVG sources unless `images.dangerouslyAllowSVG` is set. */}
              <div className="relative h-16 w-full">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Button href="/membresia" variant="primary">
            Conocer cómo participar
          </Button>
        </div>
      </div>

      <div className="mt-16">
        <p className="font-serif text-xl font-bold text-ink">Junta directiva</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
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
                    className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-teal hover:underline hover:text-red"
                  >
                    LinkedIn
                    <ArrowUpRight className="h-3 w-3" />
                  </ExternalLink>
                ) : null}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
