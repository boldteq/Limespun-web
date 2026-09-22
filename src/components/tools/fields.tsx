"use client";

import React from "react";

export function NumberField({
  id,
  label,
  value,
  onChange,
  prefix,
  suffix,
  min = 0,
  max,
  step = 1,
  hint,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (n: number) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-[14px] font-semibold text-graphite">
        {label}
      </label>
      <div className="mt-2 flex items-center rounded-[14px] border border-hair bg-white px-4 focus-within:border-graphite/50 focus-within:ring-2 focus-within:ring-graphite/10">
        {prefix && <span className="pr-1 text-[16px] text-mute">{prefix}</span>}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={Number.isFinite(value) ? value : 0}
          onChange={(e) => {
            const n = Number(e.target.value);
            const clamped = Math.min(max ?? Number.POSITIVE_INFINITY, Math.max(min, Number.isFinite(n) ? n : 0));
            onChange(clamped);
          }}
          aria-describedby={hint ? `${id}-hint` : undefined}
          className="min-h-12 w-full bg-transparent text-[16px] text-graphite tabular-nums focus:outline-none"
        />
        {suffix && <span className="pl-1 text-[15px] whitespace-nowrap text-mute">{suffix}</span>}
      </div>
      {hint && (
        <p id={`${id}-hint`} className="mt-1.5 text-[13px] text-mute">
          {hint}
        </p>
      )}
    </div>
  );
}

export function money(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
    Math.round(n),
  );
}

export function ResultRow({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-hair py-3 last:border-b-0">
      <dt className={strong ? "text-[16px] font-semibold text-graphite" : "text-[15px] text-graphite-soft"}>{label}</dt>
      <dd
        className={
          strong
            ? "text-[28px] font-medium tracking-[-0.02em] text-graphite tabular-nums"
            : "text-[17px] font-semibold text-graphite tabular-nums"
        }
      >
        {value}
      </dd>
    </div>
  );
}
