"use client";

import React, { useState } from "react";
import { NumberField, ResultRow, money } from "./fields";

/**
 * Deposit & no-show maths, all local:
 *   missed sessions / month = sessions × no-show rate
 *   revenue lost without deposits = missed sessions × session price
 *   kept with deposits = missed sessions × session price × deposit %
 */
export function DepositCalculator() {
  const [price, setPrice] = useState(400);
  const [sessions, setSessions] = useState(40);
  const [noShowRate, setNoShowRate] = useState(8);
  const [depositPct, setDepositPct] = useState(25);

  const missed = (sessions * noShowRate) / 100;
  const lost = missed * price;
  const kept = lost * (depositPct / 100);
  const stillLost = lost - kept;
  const depositPerBooking = price * (depositPct / 100);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
      <div className="grid gap-6 rounded-[24px] bg-canvas p-7 sm:p-9">
        <NumberField id="price" label="Average session price" prefix="$" value={price} onChange={setPrice} step={10} />
        <NumberField id="sessions" label="Sessions a month" value={sessions} onChange={setSessions} hint="Across every artist in the studio." />
        <NumberField
          id="noshow"
          label="No-shows and late cancels"
          suffix="% of sessions"
          value={noShowRate}
          onChange={setNoShowRate}
          max={100}
          step={0.5}
          hint="Use your own number. Check last month's calendar if you're unsure."
        />
        <NumberField id="deposit" label="Deposit you take" suffix="% of price" value={depositPct} onChange={setDepositPct} max={100} step={5} />
      </div>

      <div className="flex flex-col justify-between gap-6 rounded-[24px] bg-white p-7 ring-1 ring-hair sm:p-9" aria-live="polite">
        <div>
          <p className="text-[14px] font-semibold tracking-[0.06em] text-mute uppercase">Each month</p>
          <dl className="mt-3">
            <ResultRow label="Sessions missed" value={missed.toFixed(1)} />
            <ResultRow label="Revenue lost with no deposit" value={money(lost)} />
            <ResultRow label="Still lost with your deposit" value={money(stillLost)} />
            <ResultRow label="Kept by your deposit policy" value={money(kept)} strong />
          </dl>
        </div>
        <p className="rounded-[14px] bg-canvas px-4 py-3 text-[14px] leading-[1.55] text-graphite-soft">
          That&apos;s a {money(depositPerBooking)} deposit on each booking, or {money(kept * 12)}{" "}
          a year kept when clients don&apos;t show. Limespun takes the deposit when the client books, so a no-show doesn&apos;t cost you the whole session.
        </p>
      </div>
    </div>
  );
}
