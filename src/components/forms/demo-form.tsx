"use client";

import React, { useActionState, useEffect, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { BRAND, FONT, SHADOW } from "@/lib/brand";
import { submitDemoRequest, type DemoFormState } from "@/app/book-a-demo/actions";

const initialState: DemoFormState = { status: "idle" };

// ─── Field label style ────────────────────────────────────────────────────────
const labelStyle: React.CSSProperties = {
  fontFamily: FONT.sans,
  fontSize: 12,
  fontWeight: 600,
  color: BRAND.stoneDark,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  marginBottom: 6,
  display: "block",
};

// ─── Base input style ─────────────────────────────────────────────────────────
function inputBase(focused: boolean): React.CSSProperties {
  return {
    width: "100%",
    padding: "11px 14px",
    fontFamily: FONT.sans,
    fontSize: 14,
    color: BRAND.ink,
    background: BRAND.white,
    border: `1px solid ${focused ? BRAND.rust : BRAND.border}`,
    borderRadius: 10,
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.15s ease, box-shadow 0.15s ease",
    boxShadow: focused ? "0 0 0 3px rgba(200,53,31,0.10)" : "none",
  };
}

const errorStyle: React.CSSProperties = {
  fontFamily: FONT.sans,
  fontSize: 11,
  color: BRAND.crimson,
  marginTop: 4,
};

const wrapperStyle: React.CSSProperties = { marginBottom: 16 };

// ─── FormField ────────────────────────────────────────────────────────────────
interface FormFieldProps {
  label: string;
  name: string;
  type: "text" | "email";
  placeholder?: string;
  error?: string;
  required?: boolean;
}

function FormField({ label, name, type, placeholder, error, required }: FormFieldProps) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={wrapperStyle}>
      <label htmlFor={name} style={labelStyle}>
        {label}
        {required && (
          <span style={{ color: BRAND.rust, marginLeft: 2 }} aria-hidden="true">
            *
          </span>
        )}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        style={inputBase(focused)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {error && (
        <p id={`${name}-error`} style={errorStyle} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

// ─── FormSelect ───────────────────────────────────────────────────────────────
interface FormSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface FormSelectProps {
  label: string;
  name: string;
  options: FormSelectOption[];
  error?: string;
  required?: boolean;
}

function FormSelect({ label, name, options, error, required }: FormSelectProps) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={wrapperStyle}>
      <label htmlFor={name} style={labelStyle}>
        {label}
        {required && (
          <span style={{ color: BRAND.rust, marginLeft: 2 }} aria-hidden="true">
            *
          </span>
        )}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        style={{
          ...inputBase(focused),
          appearance: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%234B4842' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 14px center",
          paddingRight: 36,
          cursor: "pointer",
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${name}-error`} style={errorStyle} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

// ─── FormTextarea ─────────────────────────────────────────────────────────────
interface FormTextareaProps {
  label: string;
  name: string;
  placeholder?: string;
  error?: string;
  rows?: number;
}

function FormTextarea({ label, name, placeholder, error, rows = 3 }: FormTextareaProps) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={wrapperStyle}>
      <label htmlFor={name} style={labelStyle}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        rows={rows}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        style={{
          ...inputBase(focused),
          resize: "vertical",
          minHeight: 80,
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {error && (
        <p id={`${name}-error`} style={errorStyle} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Chair options ────────────────────────────────────────────────────────────
const CHAIR_OPTIONS: FormSelectOption[] = [
  { value: "", label: "Select…", disabled: true },
  { value: "1", label: "1 (solo)" },
  { value: "2-5", label: "2 – 5" },
  { value: "6-10", label: "6 – 10" },
  { value: "11+", label: "11+" },
];

const TIME_OPTIONS: FormSelectOption[] = [
  { value: "", label: "Select…", disabled: true },
  { value: "weekday-am", label: "Weekday morning" },
  { value: "weekday-pm", label: "Weekday afternoon" },
  { value: "weekend", label: "Weekend" },
  { value: "flexible", label: "I'm flexible" },
];

// ─── DemoForm ─────────────────────────────────────────────────────────────────
export function DemoForm() {
  const [state, formAction, isPending] = useActionState(submitDemoRequest, initialState);

  // Carry the email typed into the homepage hero (/book-a-demo?email=…) into the form.
  useEffect(() => {
    const email = new URLSearchParams(window.location.search).get("email");
    const input = document.getElementById("email");
    if (email && input instanceof HTMLInputElement && !input.value) input.value = email.slice(0, 254);
  }, []);

  const cardStyle: React.CSSProperties = {
    background: BRAND.white,
    borderRadius: 18,
    padding: "32px 28px",
    boxShadow: SHADOW.card,
    border: `1px solid ${BRAND.borderSoft}`,
  };

  // ─── Success state ────────────────────────────────────────────────────────
  if (state.status === "success") {
    return (
      <div style={{ ...cardStyle, textAlign: "center" }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: BRAND.sageWash,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
          }}
          aria-hidden="true"
        >
          <Check size={24} color={BRAND.sage} strokeWidth={2.5} />
        </div>
        <h3
          style={{
            fontFamily: FONT.serif,
            fontSize: 28,
            color: BRAND.onyx,
            fontWeight: 400,
            marginBottom: 12,
          }}
        >
          You&rsquo;re booked.
        </h3>
        <p
          style={{
            fontFamily: FONT.sans,
            fontSize: 15,
            color: BRAND.stoneDark,
            lineHeight: 1.6,
            maxWidth: 380,
            margin: "0 auto",
          }}
        >
          {state.message}
        </p>
      </div>
    );
  }

  // ─── Form state ───────────────────────────────────────────────────────────
  const errors = state.errors ?? {};

  return (
    <div style={cardStyle}>
      {state.status === "error" && state.message && (
        <div
          role="alert"
          style={{
            padding: "10px 14px",
            background: BRAND.crimsonSoft,
            color: BRAND.crimson,
            borderRadius: 8,
            fontFamily: FONT.sans,
            fontSize: 13,
            marginBottom: 16,
          }}
        >
          {state.message}
        </div>
      )}

      <form action={formAction} noValidate>
        <FormField
          label="Your name"
          name="name"
          type="text"
          placeholder="Jane Doe"
          error={errors.name}
          required
        />
        <FormField
          label="Email"
          name="email"
          type="email"
          placeholder="jane@yourstudio.com"
          error={errors.email}
          required
        />
        <FormField
          label="Studio name"
          name="studioName"
          type="text"
          placeholder="Midnight Ink Studio"
          error={errors.studioName}
          required
        />

        {/* 2-col grid for chairs + time */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
          }}
        >
          <FormSelect
            label="Chairs"
            name="chairs"
            options={CHAIR_OPTIONS}
            error={errors.chairs}
            required
          />
          <FormSelect
            label="Preferred time"
            name="preferredTime"
            options={TIME_OPTIONS}
            error={errors.preferredTime}
            required
          />
        </div>

        <FormField
          label="What are you using now?"
          name="currentTool"
          type="text"
          placeholder="Fresha, spreadsheets, pen & paper…"
          error={errors.currentTool}
          required
        />
        <FormTextarea
          label="Anything else we should know?"
          name="notes"
          placeholder="Specific pain points, questions, or special circumstances…"
          error={errors.notes}
          rows={3}
        />

        <button
          type="submit"
          disabled={isPending}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            width: "100%",
            padding: "14px 20px",
            borderRadius: 100,
            background: isPending ? BRAND.coal : BRAND.onyx,
            color: BRAND.bone,
            fontFamily: FONT.sans,
            fontSize: 15,
            fontWeight: 600,
            border: "none",
            cursor: isPending ? "wait" : "pointer",
            opacity: isPending ? 0.7 : 1,
            transition: "opacity 0.15s ease, background 0.15s ease",
            marginTop: 8,
          }}
          aria-busy={isPending}
        >
          {isPending ? "Sending…" : "Book my walkthrough"}
          {!isPending && <ArrowRight size={15} strokeWidth={2} />}
        </button>

        <p
          style={{
            fontFamily: FONT.sans,
            fontSize: 12,
            color: BRAND.stoneFaint,
            textAlign: "center",
            marginTop: 12,
            marginBottom: 0,
          }}
        >
          We respond within one business day. No calendar tetris.
        </p>
      </form>
    </div>
  );
}
