import React from "react";
import { Display } from "./ui";
import { PlanCards } from "@/components/pricing/plan-cards";

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-24 bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="flex flex-col items-center text-center">
          <Display className="max-w-[820px]">Flat plans, never per booking</Display>
          <p className="mt-5 max-w-[580px] text-[18px] leading-[1.6] text-balance text-mute">
            Pick the plan that fits your team. No cut of your bookings or deposits. Card payments carry the payment
            provider&apos;s standard fee.
          </p>
        </div>

        <div className="mt-12">
          <PlanCards compareHref="/pricing#compare" />
        </div>
      </div>
    </section>
  );
}
