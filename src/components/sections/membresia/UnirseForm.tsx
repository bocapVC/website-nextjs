import { ContactForm } from "@/components/sections/contacto/ContactForm";
import { Section } from "@/components/ui/Section";
import { UnirseInfo } from "./UnirseInfo";

const MESSAGE_HINT =
  "Cuéntanos qué hace tu organización y a qué categoría pertenece: Fondos, Ángeles, Aceleradoras o Startups.";

export function UnirseForm() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <UnirseInfo />
        <div className="rounded-brand border border-line bg-surface-solid p-6 shadow-brand sm:p-8">
          <ContactForm fixedTopic="Membresia" messageHint={MESSAGE_HINT} />
        </div>
      </div>
    </Section>
  );
}
