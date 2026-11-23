import type { ReactNode } from "react";
import type { Photo } from "@/data/media";
import { Picture } from "./Picture";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  photo: Photo;
  align?: "bottom" | "center";
};

export function PageHero({ eyebrow, title, intro, photo, align = "bottom" }: PageHeroProps) {
  return (
    <section className="grain relative isolate flex min-h-[78svh] overflow-hidden md:min-h-[86svh]">
      <div className="absolute inset-0 -z-10">
        <Picture photo={photo} priority className="animate-slow-zoom" />
        <div className="bg-hero-overlay absolute inset-0" />
      </div>
      <div
        className={`shell flex w-full flex-col pb-16 pt-36 md:pb-24 ${
          align === "center" ? "justify-center text-center items-center" : "justify-end"
        }`}
      >
        <p className="eyebrow animate-hero-rise flex items-center gap-4 text-primary">
          <span className="rule-bronze" aria-hidden="true" />
          {eyebrow}
        </p>
        <h1 className="display-lg animate-hero-rise mt-6 max-w-5xl text-balance [animation-delay:120ms]">
          {title}
        </h1>
        {intro ? (
          <div className="lede animate-hero-rise mt-6 max-w-2xl text-foreground/80 [animation-delay:240ms]">
            {intro}
          </div>
        ) : null}
      </div>
    </section>
  );
}
