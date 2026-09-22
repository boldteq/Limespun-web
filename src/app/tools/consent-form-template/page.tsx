import type { Metadata } from "next";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { PageIntro } from "@/components/marketing/page-intro";
import { ClosingCta } from "@/components/marketing/closing-cta";
import { ConsentTemplate } from "@/components/tools/consent-template";
import { SITE_URL } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Free tattoo consent form template | Limespun",
  description: "A free, printable tattoo consent and release form template covering client details, health questions, aftercare, deposits and signatures.",
  alternates: { canonical: `${SITE_URL}/tools/consent-form-template` },
  openGraph: { title: "Free tattoo consent form template", description: "Printable consent and release form for tattoo studios.", type: "website" },
};

export default function ConsentTemplatePage() {
  return (
    <div className="min-h-screen bg-canvas text-graphite">
      <div className="print:hidden">
        <Nav />
      </div>
      <main id="main">
        <div className="print:hidden">
          <PageIntro
            crumbs={[{ label: "Home", href: "/" }, { label: "Free tools", href: "/tools" }, { label: "Consent form template" }]}
            title="Tattoo consent form template"
            lead="A printable starting point for your consent and release form. Add your studio name, then copy it or print it."
          />
        </div>
        <section className="bg-white py-14 sm:py-16 print:py-0">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-8 print:px-0">
            <ConsentTemplate />
          </div>
        </section>
        <div className="print:hidden">
          <ClosingCta title="Consent signed before they sit down" body="In Limespun clients sign on their phone or the front-desk iPad, and allergies carry to every booking after." />
        </div>
      </main>
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
