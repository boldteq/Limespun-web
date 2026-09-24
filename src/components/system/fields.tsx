import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "./cn";

const control =
  "block w-full rounded-field border border-hair bg-white px-4 text-[16px] text-graphite transition-[border-color,box-shadow] duration-200 placeholder:text-mute focus:border-graphite/60 focus:ring-[3px] focus:ring-ember/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 aria-[invalid=true]:border-flag aria-[invalid=true]:focus:ring-flag/15";

interface DescribedProps {
  "aria-describedby"?: string;
  "aria-invalid"?: boolean | "true" | "false";
}

/**
 * Label, hint and error around one control. Wires aria-describedby and aria-invalid onto
 * the child so Input/Select/Textarea don't have to repeat the ids.
 */
export function Field({
  label,
  htmlFor,
  hint,
  error,
  className,
  children,
}: {
  label: React.ReactNode;
  htmlFor: string;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  className?: string;
  children: React.ReactElement<DescribedProps>;
}) {
  const hintId = hint ? `${htmlFor}-hint` : undefined;
  const errorId = error ? `${htmlFor}-error` : undefined;
  const describedBy = [children.props["aria-describedby"], hintId, errorId].filter(Boolean).join(" ") || undefined;
  const wired = React.cloneElement(children, {
    "aria-describedby": describedBy,
    ...(error ? { "aria-invalid": true } : {}),
  });
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="text-[14px] font-semibold text-graphite">
        {label}
      </label>
      <div className="mt-2">{wired}</div>
      {hint && (
        <p id={hintId} className="mt-1.5 text-[13px] text-mute">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-1.5 text-[13px] font-medium text-flag">
          {error}
        </p>
      )}
    </div>
  );
}

export function Input({ className, ...props }: React.ComponentPropsWithRef<"input">) {
  return <input className={cn(control, "h-12", className)} {...props} />;
}

export function Textarea({ className, rows = 5, ...props }: React.ComponentPropsWithRef<"textarea">) {
  return <textarea rows={rows} className={cn(control, "min-h-32 resize-y py-3 leading-[1.5]", className)} {...props} />;
}

export function Select({ className, children, ...props }: React.ComponentPropsWithRef<"select">) {
  return (
    <div className="relative">
      <select className={cn(control, "h-12 cursor-pointer appearance-none pr-11", className)} {...props}>
        {children}
      </select>
      <ChevronDown
        size={18}
        strokeWidth={2}
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-mute"
      />
    </div>
  );
}
