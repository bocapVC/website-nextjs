import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { ELEGIBLES } from "@/data/elegibles";
import { ELEGIBLE_ICONS } from "./ElegibleIcons";

/** Ink-toned hero: who is eligible to join BOCAP, as a 2-col icon list. */
export function QuienPuedeParticipar() {
  return (
    <Section tone="ink" firstOnPage className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <Eyebrow className="text-red">Membresía</Eyebrow>
        <h1 className="max-w-2xl font-serif text-3xl font-bold text-white sm:text-4xl">
          ¿Quién puede participar en BOCAP?
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-white/70">
          BOCAP reúne a los actores que están construyendo el mercado de capital emprendedor
          en Bolivia.
        </p>
      </div>

      <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
        {ELEGIBLES.map((item) => {
          const Icon = ELEGIBLE_ICONS[item.icon];
          return (
            <li key={item.label} className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-gold ring-1 ring-white/15">
                <Icon className="h-5 w-5" />
              </span>
              <div className="flex flex-col gap-1 pt-1">
                <p className="font-semibold text-white">{item.label}</p>
                <p className="text-sm text-white/70">{item.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
