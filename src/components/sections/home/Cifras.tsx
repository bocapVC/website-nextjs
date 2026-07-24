import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CIFRAS } from "@/data/cifras";

/** Ink-toned stats band: one number + label per entry in CIFRAS. */
export function Cifras() {
  return (
    <Section tone="ink">
      <SectionHeading
        eyebrow="En números"
        title="El ecosistema en cifras"
        invert
        align="center"
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {CIFRAS.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-1 rounded-brand-sm border border-white/15 bg-white/5 px-6 py-8 text-center shadow-brand"
          >
            <p className="font-serif text-4xl font-bold text-white sm:text-5xl">{stat.value}</p>
            <p className="text-sm font-semibold text-white">{stat.label}</p>
            {stat.description ? (
              <p className="text-xs text-white/60">{stat.description}</p>
            ) : null}
          </div>
        ))}
      </div>
    </Section>
  );
}
