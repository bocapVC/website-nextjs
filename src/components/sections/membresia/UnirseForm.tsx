import { ContactForm } from "@/components/sections/contacto/ContactForm";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function UnirseForm() {
  return (
    <Section tone="mist">
      <div className="mx-auto flex max-w-2xl flex-col gap-8">
        <SectionHeading eyebrow="Membresía" title="Únete a BOCAP" align="center" />

        <div className="rounded-brand border border-line bg-surface-solid p-6 shadow-brand sm:p-8">
          <ContactForm fixedTopic="Membresia" />
        </div>
      </div>
    </Section>
  );
}
