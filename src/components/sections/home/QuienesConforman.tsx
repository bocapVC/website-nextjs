import Image from "next/image";
import { ArrowUpRight } from "@/components/icons/ArrowUpRight";
import { Badge } from "@/components/ui/Badge";
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
 * Board cards fall back to an initials avatar when a member has no `photo`
 * yet (board composition can change before headshots catch up).
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
        <p className="font-serif text-xl font-bold text-ink">Miembros fundadores</p>
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
      </div>

      <div className="mt-16">
        <p className="font-serif text-xl font-bold text-ink">Junta directiva</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {JUNTA_DIRECTIVA.map((member) => (
            <div
              key={member.name}
              className="flex h-full flex-col overflow-hidden rounded-brand-sm border border-line bg-surface-solid shadow-brand"
            >
              <div className="relative aspect-[4/5] w-full shrink-0 bg-paper-strong">
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-top"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center bg-ink text-2xl font-bold text-white">
                    {initials(member.name)}
                  </span>
                )}
              </div>
              <div className="flex grow flex-col p-6 text-left">
                <p className="font-serif text-lg font-bold text-ink">{member.name}</p>
                <Badge tone="gold" className="mt-2 self-start">
                  {member.role}
                </Badge>
                {member.organization ? (
                  <p className="mt-2 text-xs text-ink-soft/80">{member.organization}</p>
                ) : null}
                {member.bio ? <p className="mt-3 text-sm text-ink-soft">{member.bio}</p> : null}
                {member.linkedin ? (
                  <ExternalLink
                    href={member.linkedin}
                    className="mt-auto inline-flex w-fit items-center gap-1 pt-4 text-xs font-semibold text-teal hover:underline hover:text-red"
                  >
                    LinkedIn
                    <ArrowUpRight className="h-3 w-3" />
                  </ExternalLink>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
