import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice, type Bike } from "@/data/fleet";
import { cn } from "@/lib/utils";
import { bikeWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { Reveal } from "./Reveal";

type BikeShowcaseProps = {
  bike: Bike;
  index: number;
  reverse?: boolean;
  onDetails: (bike: Bike) => void;
};

/** Editorial, alternating product layout for one motorcycle. */
export function BikeShowcase({ bike, index, reverse = false, onDetails }: BikeShowcaseProps) {
  return (
    <article
      id={bike.slug}
      className="grid scroll-mt-28 items-center gap-8 md:grid-cols-12 md:gap-12"
      aria-labelledby={`${bike.slug}-name`}
    >
      <Reveal className={cn("md:col-span-7", reverse && "md:order-2")}>
        <button
          type="button"
          onClick={() => onDetails(bike)}
          className="img-zoom group relative block aspect-[4/3] w-full bg-charcoal text-left"
          aria-label={`View details for ${bike.name}`}
        >
          <img
            src={bike.image.src}
            alt={bike.image.alt}
            width={bike.image.width}
            height={bike.image.height}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
          <div className="bg-fade-up pointer-events-none absolute inset-0 opacity-70" />
          <span className="numeral absolute left-5 top-4 text-5xl text-foreground drop-shadow-[0_2px_12px_var(--overlay)] md:text-6xl">
            {String(index + 1).padStart(2, "0")}
          </span>
          {bike.representativePhoto ? (
            <span className="eyebrow absolute bottom-4 left-5 bg-background/70 px-3 py-1.5 text-[0.58rem] text-foreground/80 backdrop-blur">
              Representative photograph
            </span>
          ) : null}
        </button>
      </Reveal>

      <Reveal className={cn("md:col-span-5", reverse && "md:order-1")} delay={120}>
        <p className="eyebrow text-muted-foreground">
          {bike.make} · {bike.style}
        </p>
        <h3 id={`${bike.slug}-name`} className="display-md mt-4">
          {bike.name}
        </h3>
        <p className="mt-3 font-display text-xl italic text-foreground/70">{bike.tagline}</p>

        <dl className="mt-8 grid grid-cols-2 border-y border-border">
          <div className="py-5 pr-4">
            <dt className="eyebrow text-[0.6rem] text-muted-foreground">Engine</dt>
            <dd className="mt-2 font-display text-2xl">{bike.engine ?? "—"}</dd>
          </div>
          <div className="border-l border-border py-5 pl-6">
            <dt className="eyebrow text-[0.6rem] text-muted-foreground">Per day</dt>
            <dd className="mt-2 font-display text-2xl text-primary">{formatPrice(bike.pricePerDay)}</dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button asChild variant="bronze" size="xl">
            <Link to="/booking" search={{ bike: bike.slug }}>
              Book this bike
            </Link>
          </Button>
          <Button asChild variant="whatsapp" size="xl">
            <a
              href={bikeWhatsAppUrl(bike)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Book the ${bike.name} on WhatsApp`}
            >
              <WhatsAppIcon /> Book on WhatsApp
            </a>
          </Button>
          <Button type="button" variant="outline-light" size="xl" onClick={() => onDetails(bike)}>
            View details <ArrowRight />
          </Button>
        </div>
      </Reveal>
    </article>
  );
}
