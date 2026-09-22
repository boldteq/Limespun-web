import React from "react";
import { CalendarCheck2, HandCoins } from "lucide-react";
import { CTA } from "@/lib/brand";
import { MONEY_BACK_DAYS } from "@/lib/data/plans";
import { CheckRow, Display, PrimaryButton, SecondaryButton, StripedFrame, Toast } from "./ui";

/** Client-side booking view on a phone, built in code. */
function PhoneBooking() {
  return (
    <div className="w-[230px] rounded-[34px] bg-graphite p-2 shadow-[var(--shadow-lift)]">
      <div className="overflow-hidden rounded-[27px] bg-white">
        <div className="flex justify-center pt-2.5">
          <span className="h-5 w-20 rounded-full bg-graphite" />
        </div>
        <div className="px-4 pt-4 pb-5 text-left">
          <p className="text-[11px] text-mute">Book with Dev</p>
          <p className="mt-0.5 text-[15px] font-semibold text-graphite">Koi sleeve · session 5</p>
          <div className="mt-4 grid grid-cols-4 gap-1.5 text-center">
            {["Tue 7", "Thu 9", "Sat 11", "Tue 14"].map((d) => (
              <span
                key={d}
                className={`rounded-[10px] py-2 text-[11px] font-semibold ${
                  d === "Thu 9" ? "bg-ember text-white" : "bg-canvas text-graphite"
                }`}
              >
                {d}
              </span>
            ))}
          </div>
          <div className="mt-4 rounded-[12px] bg-canvas px-3 py-2.5">
            <p className="text-[11px] text-mute">Deposit</p>
            <p className="text-[13px] font-semibold text-graphite">$240 already on your project</p>
          </div>
          <span className="mt-4 flex items-center justify-center gap-1.5 rounded-full bg-graphite py-2.5 text-[12px] font-semibold text-white">
            <CalendarCheck2 size={13} strokeWidth={2.4} /> Confirm Oct 9, 11:00
          </span>
        </div>
      </div>
    </div>
  );
}

export function FinalCta() {
  return (
    <section className="bg-canvas px-4 pt-8 pb-24 sm:px-8">
      <div className="mx-auto grid max-w-[1280px] overflow-hidden rounded-[28px] bg-white shadow-[var(--shadow-lift)] ring-1 ring-graphite/5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        {/* Orange side: what the client sees */}
        <StripedFrame className="relative order-last flex min-h-[420px] items-end justify-center rounded-none px-6 pt-14 lg:order-first lg:min-h-[520px]">
          <div aria-hidden="true" className="relative translate-y-10">
            <PhoneBooking />
          </div>
          <Toast
            tone="paid"
            icon={<HandCoins size={15} strokeWidth={2.2} />}
            title="Deposit already paid"
            body="$240 carried from session 1"
            className="absolute top-10 left-6 sm:left-10"
          />
        </StripedFrame>

        {/* White side: the ask */}
        <div className="flex flex-col justify-center px-7 py-14 sm:px-14 lg:py-20">
          <Display>Ready to open your books?</Display>
          <p className="mt-5 max-w-[480px] text-[18px] leading-[1.6] text-pretty text-graphite-soft sm:text-[19px]">
            Create your account in a few minutes. We move your clients, bookings, deposits and signed forms over for
            you.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PrimaryButton />
            <SecondaryButton href={CTA.demoHref}>{CTA.demoLabel}</SecondaryButton>
          </div>
          <CheckRow className="mt-6" items={[`${MONEY_BACK_DAYS}-day money-back guarantee`, "No per-booking fees"]} />
        </div>
      </div>
    </section>
  );
}
