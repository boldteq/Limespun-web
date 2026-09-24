import React from "react";
import { cn } from "./cn";

/**
 * The phone the homepage uses for client-side screens (booking page, portal, consent).
 * Stays phone-sized at every width; pass a width class to change it. Decorative: the
 * device is hidden from assistive tech, the optional label is a visible caption.
 */
export function AppShellPhone({
  label,
  className,
  children,
}: {
  label?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <figure className={cn("flex w-[230px] shrink-0 flex-col items-center", className)}>
      <div aria-hidden="true" className="w-full rounded-[34px] bg-graphite p-2 shadow-[var(--shadow-lift)]">
        <div className="overflow-hidden rounded-[27px] bg-white">
          <div className="flex justify-center pt-2.5">
            <span className="h-5 w-20 rounded-full bg-graphite" />
          </div>
          {children}
        </div>
      </div>
      {label && <figcaption className="mt-3 text-center text-ui-sm text-mute">{label}</figcaption>}
    </figure>
  );
}
