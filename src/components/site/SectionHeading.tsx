import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
  tone?: "dark" | "light";
};

export function SectionHeading({ index, eyebrow, title, children, className, tone = "dark" }: SectionHeadingProps) {
  return (
    <Reveal className={cn("max-w-3xl", className)}>
      <p className="eyebrow flex items-center gap-4 text-primary">
        {index ? <span className="numeral text-base tracking-normal normal-case">{index}</span> : null}
        <span className="rule-bronze" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className="display-md mt-5 text-balance">{title}</h2>
      {children ? (
        <div className={cn("lede mt-6", tone === "dark" ? "text-muted-foreground" : "text-ivory-muted")}>
          {children}
        </div>
      ) : null}
    </Reveal>
  );
}
