import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { SITE } from "@/config/nav";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionNavigation } from "@/components/ui/SectionNavigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} · Capital emprendedor en Bolivia`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.tagline,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    title: `${SITE.name} · Capital emprendedor en Bolivia`,
    description: SITE.tagline,
    url: "/",
    siteName: SITE.name,
    locale: "es_BO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} · Capital emprendedor en Bolivia`,
    description: SITE.tagline,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/logo.png`,
  description: SITE.tagline,
  email: SITE.email,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <SectionNavigation />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
