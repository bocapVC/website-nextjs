import { Section } from "@/components/ui/Section";
import { ContactoInfo } from "@/components/sections/contacto/ContactoInfo";
import { ContactForm } from "@/components/sections/contacto/ContactForm";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contacto",
  description:
    "Escríbenos para formar parte del ecosistema, proponer alianzas o conocer más sobre BOCAP.",
  path: "/contacto",
});

export default function ContactoPage() {
  return (
    <Section firstOnPage>
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <ContactoInfo />
        <div className="rounded-brand border border-line bg-surface-solid p-6 shadow-brand sm:p-8">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
