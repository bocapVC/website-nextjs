import { Button } from "@/components/ui/Button";
import { InputField, SelectField, TextareaField } from "@/components/ui/FormField";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const TIPO_OPTIONS = [
  { label: "Fondo", value: "fondo" },
  { label: "Ángel inversionista", value: "angel" },
  { label: "Aceleradora", value: "aceleradora" },
  { label: "Corporativo", value: "corporativo" },
  { label: "Startup", value: "startup" },
  { label: "Otro", value: "otro" },
];

/**
 * UI-only, intentionally unwired: no client state, no onSubmit, submit is disabled.
 * Demonstrates the intended membership-application form shape ahead of it being connected.
 */
export function UnirseForm() {
  return (
    <Section tone="mist">
      <div className="mx-auto flex max-w-2xl flex-col gap-8">
        <SectionHeading eyebrow="Membresía" title="Únete a BOCAP" align="center" />

        <form className="flex flex-col gap-5 rounded-brand border border-line bg-surface-solid p-6 shadow-brand sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <InputField label="Nombre" name="name" autoComplete="name" required />
            <InputField label="Organización" name="organization" autoComplete="organization" />
          </div>

          <InputField
            label="Correo electrónico"
            name="email"
            type="email"
            autoComplete="email"
            required
          />

          <SelectField
            label="Tipo de miembro"
            name="type"
            required
            placeholder="Selecciona una opción"
            options={TIPO_OPTIONS}
          />

          <TextareaField label="Cuéntanos sobre tu organización" name="message" required />

          <p className="text-xs text-ink-soft">
            Este formulario es demostrativo y aún no está conectado.
          </p>

          <div>
            <Button type="submit" disabled>
              Enviar solicitud
            </Button>
          </div>
        </form>
      </div>
    </Section>
  );
}
