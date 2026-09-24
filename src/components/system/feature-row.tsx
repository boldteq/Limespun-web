import React from "react";
import { Check } from "lucide-react";
import { Button } from "./button";
import { cn } from "./cn";
import { Eyebrow, Title } from "./type";

/**
 * Copy beside a product visual. Stacks copy-then-visual below lg; `flip` puts the visual
 * first only at lg, so phones always read the outcome before the screen.
 */
export function FeatureRow({
  eyebrow,
  title,
  titleAs = "h3",
  body,
  bullets,
  visual,
  flip = false,
  action,
  className,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  titleAs?: "h2" | "h3";
  body: React.ReactNode;
  bullets?: string[];
  visual: React.ReactNode;
  flip?: boolean;
  action?: { label: string; href: string };
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid items-center gap-10 lg:gap-16",
        flip ? "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]" : "lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]",
        className,
      )}
    >
      <div className={cn("min-w-0", flip && "lg:order-last")}>
        {eyebrow && (typeof eyebrow === "string" ? <Eyebrow className="mb-4">{eyebrow}</Eyebrow> : <div className="mb-4">{eyebrow}</div>)}
        <Title as={titleAs} size="lg">
          {title}
        </Title>
        <div className="mt-4 max-w-[520px] text-[17px] leading-[1.6] text-pretty text-graphite-soft">{body}</div>
        {bullets && bullets.length > 0 && (
          <ul className="mt-6 flex max-w-[520px] flex-col gap-2.5">
            {bullets.map((b) => (
              <li key={b} className="flex gap-2.5 text-[16px] leading-snug text-graphite">
                <Check size={18} strokeWidth={2.6} className="mt-px shrink-0 text-ember" aria-hidden="true" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
        {action && (
          <Button href={action.href} variant="ghost" arrow className="mt-7">
            {action.label}
          </Button>
        )}
      </div>
      <div className="min-w-0">{visual}</div>
    </div>
  );
}
