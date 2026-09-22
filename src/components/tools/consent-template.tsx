"use client";

import React, { useMemo, useState } from "react";
import { Check, Copy, Printer } from "lucide-react";

interface Section {
  title: string;
  lines: string[];
}

function buildSections(studio: string): Section[] {
  const s = studio.trim() || "[Studio name]";
  return [
    {
      title: "Client details",
      lines: [
        "Full name: ______________________________",
        "Date of birth: ____________   Phone: ____________________",
        "Email: ______________________________",
        "Photo ID checked (type and last 4 digits): ______________",
        "Emergency contact (name and phone): ______________________",
      ],
    },
    {
      title: "Health questions",
      lines: [
        "Please answer yes or no. Tell your artist about anything that could affect your tattoo or healing.",
        "Allergies (inks, pigments, latex, adhesives, soaps, medication): Yes / No — details: ____________",
        "Skin conditions at or near the tattoo area (eczema, psoriasis, keloids): Yes / No",
        "Diabetes, heart condition, epilepsy, haemophilia or a blood-borne condition: Yes / No",
        "Taking blood thinners or medication that affects healing: Yes / No",
        "Pregnant or breastfeeding: Yes / No",
        "Had alcohol or recreational drugs in the last 24 hours: Yes / No",
        "Eaten in the last four hours: Yes / No",
      ],
    },
    {
      title: "The tattoo",
      lines: [
        "Design and placement: ______________________________",
        "Artist: ____________________   Session: ___ of ___",
        "I have checked the spelling, size and placement of the design and approve it.",
      ],
    },
    {
      title: "I understand that",
      lines: [
        "A tattoo is a permanent change to my skin, and removal is difficult, costly and may not be complete.",
        "Colours can look different on my skin and will change over time and as it heals.",
        "There is a risk of infection, allergic reaction and scarring, even when aftercare is followed.",
        "I have received aftercare instructions and will follow them. Healing is my responsibility.",
        `${s} uses single-use needles and follows hygiene practices required by local regulations.`,
      ],
    },
    {
      title: "Deposits and cancellations",
      lines: [
        "My deposit of $______ is applied to this project.",
        "If I cancel or move my appointment with less than ___ hours' notice, the deposit may be kept by the studio.",
      ],
    },
    {
      title: "Photos",
      lines: ["I agree that photos of my tattoo may be used in the artist's and studio's portfolio: Yes / No"],
    },
    {
      title: "Signatures",
      lines: [
        "I confirm I am 18 or older, the information above is true, and I agree to be tattooed.",
        "Client signature: ______________________   Date: ____________",
        "Artist signature: ______________________   Date: ____________",
      ],
    },
  ];
}

export function ConsentTemplate() {
  const [studio, setStudio] = useState("");
  const [copied, setCopied] = useState(false);
  const sections = useMemo(() => buildSections(studio), [studio]);
  const title = `${studio.trim() || "[Studio name]"} · Tattoo consent and release form`;

  const asText = () =>
    [title, "", ...sections.flatMap((sec) => [sec.title.toUpperCase(), ...sec.lines, ""])].join("\n");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(asText());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-12">
      <div className="flex flex-col gap-5 print:hidden lg:sticky lg:top-28 lg:self-start">
        <div>
          <label htmlFor="studio-name" className="text-[14px] font-semibold text-graphite">
            Your studio name
          </label>
          <input
            id="studio-name"
            value={studio}
            onChange={(e) => setStudio(e.target.value.slice(0, 80))}
            placeholder="e.g. North Star Tattoo"
            className="mt-2 min-h-12 w-full rounded-[14px] border border-hair bg-white px-4 text-[16px] text-graphite focus:border-graphite/50 focus:outline-none focus:ring-2 focus:ring-graphite/10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={copy}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-graphite px-5 text-[15px] font-semibold text-white hover:bg-graphite-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite"
          >
            {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
            {copied ? "Copied" : "Copy text"}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-[15px] font-semibold text-graphite ring-1 ring-graphite/70 hover:bg-white"
          >
            <Printer size={16} aria-hidden="true" /> Print
          </button>
        </div>
        <p className="rounded-[14px] bg-flag-soft/70 px-4 py-3 text-[13px] leading-[1.55] text-graphite-soft">
          A starting point, not legal advice. Consent and age rules differ by country, state and city, so check this
          form against your local regulations before you use it.
        </p>
      </div>

      <article className="rounded-[20px] bg-white p-7 ring-1 ring-hair sm:p-10 print:rounded-none print:p-0 print:ring-0">
        <h2 className="font-serif text-[30px] leading-[1.15] text-graphite">{title}</h2>
        <div className="mt-6 flex flex-col gap-7">
          {sections.map((sec) => (
            <section key={sec.title}>
              <h3 className="text-[13px] font-semibold tracking-[0.08em] text-mute uppercase">{sec.title}</h3>
              <ul className="mt-3 flex flex-col gap-2">
                {sec.lines.map((line) => (
                  <li key={line} className="text-[15px] leading-[1.6] text-graphite">
                    {line}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}
