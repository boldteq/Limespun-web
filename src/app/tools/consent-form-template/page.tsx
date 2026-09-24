import React from "react";
import { ConsentSignPhone } from "@/components/mockups";
import { ConsentTemplate } from "@/components/tools/consent-template";
import { ToolPage } from "@/components/tools/tool-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Free tattoo consent form template",
  description:
    "A free, printable tattoo consent and release form template covering client details, health questions, aftercare, deposits and signatures.",
  path: "/tools/consent-form-template",
});

export default function ConsentTemplatePage() {
  return (
    <ToolPage
      slug="consent-form-template"
      eyebrow="Free template"
      title="Tattoo consent form template"
      italicWord="consent"
      lead="A printable starting point for your consent and release form. Add your studio name, then copy it or print it."
      feature="forms"
      printable
      inApp={{
        title: "Consent signed on their phone",
        body: (
          <>
            Send the form with the booking or from Messages, or hand over the studio tablet at the desk. The signed
            copy locks to the session and the client’s record as a PDF that can’t be edited.
          </>
        ),
        bullets: [
          "Six starter templates, minor / guardian consent included",
          "Unsigned forms wait in Needs attention",
          "On every plan, Solo included",
        ],
        action: "How consent forms work",
        visual: (
          /* The client's phone: the form, then signed. One phone until the stage fits two; on
             phones its top half (the form and the allergy answer), fading out, since the form above is long. */
          <div className="flex items-center justify-center gap-6 py-2 @xl/stage:gap-8 max-sm:max-h-[300px] max-sm:items-start max-sm:overflow-hidden max-sm:[mask-image:linear-gradient(to_bottom,#000_calc(100%-72px),transparent)]">
            <ConsentSignPhone className="shrink-0" />
            <ConsentSignPhone state="done" className="hidden shrink-0 @xl/stage:flex" />
          </div>
        ),
      }}
      inkBand={{
        headline: "Put the form on their phone.",
        italicWord: "phone",
        secondary: { label: "How consent forms work", href: "/product/forms" },
      }}
    >
      <ConsentTemplate />
    </ToolPage>
  );
}
