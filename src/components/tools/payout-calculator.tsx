"use client";

import React, { useState } from "react";
import { NumberField, ResultRow, money } from "./fields";

type Model = "commission" | "booth" | "guest";

const MODELS: { id: Model; label: string; hint: string }[] = [
  { id: "commission", label: "Commission", hint: "Artist keeps a share of every session." },
  { id: "booth", label: "Booth rent", hint: "Artist pays the studio a fixed weekly rent and keeps the rest." },
  { id: "guest", label: "Guest split", hint: "A visiting artist keeps a share while they're with you." },
];

export function PayoutCalculator() {
  const [model, setModel] = useState<Model>("commission");
  const [ticket, setTicket] = useState(350);
  const [sessions, setSessions] = useState(10);
  const [artistPct, setArtistPct] = useState(60);
  const [rent, setRent] = useState(250);

  const gross = ticket * sessions;
  const artistWeek = model === "booth" ? Math.max(0, gross - rent) : gross * (artistPct / 100);
  const studioWeek = gross - artistWeek;
  const perSessionArtist = sessions > 0 ? artistWeek / sessions : 0;
  const perSessionStudio = sessions > 0 ? studioWeek / sessions : 0;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
      <div className="grid gap-6 rounded-[24px] bg-canvas p-7 sm:p-9">
        <fieldset>
          <legend className="text-[14px] font-semibold text-graphite">How the artist is paid</legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            {MODELS.map((m) => (
              <label
                key={m.id}
                className={`flex min-h-12 cursor-pointer items-center justify-center rounded-[14px] px-3 text-center text-[15px] font-semibold ring-1 transition-colors ${
                  model === m.id ? "bg-graphite text-white ring-graphite" : "bg-white text-graphite ring-hair hover:ring-graphite/40"
                }`}
              >
                <input
                  type="radio"
                  name="model"
                  value={m.id}
                  checked={model === m.id}
                  onChange={() => setModel(m.id)}
                  className="sr-only"
                />
                {m.label}
              </label>
            ))}
          </div>
          <p className="mt-2 text-[13px] text-mute">{MODELS.find((m) => m.id === model)?.hint}</p>
        </fieldset>
        <NumberField id="ticket" label="Average session price" prefix="$" value={ticket} onChange={setTicket} step={10} />
        <NumberField id="sessions" label="Sessions this week" value={sessions} onChange={setSessions} />
        {model === "booth" ? (
          <NumberField id="rent" label="Weekly booth rent" prefix="$" value={rent} onChange={setRent} step={10} />
        ) : (
          <NumberField
            id="split"
            label={model === "guest" ? "Guest artist keeps" : "Artist keeps"}
            suffix="%"
            value={artistPct}
            onChange={setArtistPct}
            max={100}
            step={5}
          />
        )}
      </div>

      <div className="flex flex-col justify-between gap-6 rounded-[24px] bg-white p-7 ring-1 ring-hair sm:p-9" aria-live="polite">
        <div>
          <p className="text-[14px] font-semibold tracking-[0.06em] text-mute uppercase">This week</p>
          <dl className="mt-3">
            <ResultRow label="Takings" value={money(gross)} />
            <ResultRow label="Studio keeps" value={money(studioWeek)} />
            <ResultRow label={model === "guest" ? "Guest artist is paid" : "Artist is paid"} value={money(artistWeek)} strong />
          </dl>
          <p className="mt-4 text-[14px] text-mute">
            Per session: artist {money(perSessionArtist)} · studio {money(perSessionStudio)}
          </p>
          {model === "booth" && gross < rent && (
            <p role="note" className="mt-3 rounded-[12px] bg-flag-soft px-3 py-2 text-[13px] text-flag">
              This week&apos;s takings don&apos;t cover the rent.
            </p>
          )}
        </div>
        <p className="rounded-[14px] bg-canvas px-4 py-3 text-[14px] leading-[1.55] text-graphite-soft">
          Before tips, card fees and tax. Limespun works this out from every closed session, so payday is one check
          and one approval.
        </p>
      </div>
    </div>
  );
}
