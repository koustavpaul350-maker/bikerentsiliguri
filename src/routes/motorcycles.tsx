import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { BikeShowcase } from "@/components/site/BikeShowcase";
import { BikeDetailsDialog } from "@/components/site/BikeDetailsDialog";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { BIKE_TYPES, FLEET, formatPrice, type Bike, type BikeType } from "@/data/fleet";
import { PHOTOS } from "@/data/media";
import { cn } from "@/lib/utils";

const DESCRIPTION =
  "Rent a Royal Enfield Himalayan, Classic 350, Meteor 350, Hunter 350, Xpulse 200, Pulsar N160 or scooter in Siliguri. Daily prices from ₹700.";

export const Route = createFileRoute("/motorcycles")({
  head: () => ({
    meta: [
      { title: "Our Motorcycles — Royal Enfield, Xpulse & Scooter Rental Siliguri" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Our Motorcycles — Bike Rent Siliguri" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MotorcyclesPage,
});

function MotorcyclesPage() {
  const [filter, setFilter] = useState<BikeType | "all">("all");
  const [selected, setSelected] = useState<Bike | null>(null);

  const bikes = useMemo(() => (filter === "all" ? FLEET : FLEET.filter((b) => b.type === filter)), [filter]);

  return (
    <>
      <PageHero
        eyebrow="The collection"
        title={
          <>
            Our <em className="italic text-primary">motorcycles.</em>
          </>
        }
        intro={<p>Ten machines, each chosen for a different kind of journey. Every price is per day.</p>}
        photo={PHOTOS.mountainOverlookBike}
      />

      {/* Price index */}
      <section className="border-b border-border bg-charcoal">
        <div className="shell overflow-x-auto">
          <ul className="flex min-w-max divide-x divide-border">
            {FLEET.map((b) => (
              <li key={b.slug}>
                <a
                  href={`#${b.slug}`}
                  onClick={() => setFilter("all")}
                  className="block px-5 py-5 transition-colors hover:bg-accent"
                >
                  <span className="block text-xs text-muted-foreground">{b.name}</span>
                  <span className="mt-1 block font-display text-xl text-primary">{formatPrice(b.pricePerDay)}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y">
        <div className="shell">
          <div className="sticky top-[4.5rem] z-30 -mx-[clamp(1.25rem,4vw,3.5rem)] border-b border-border bg-background/85 px-[clamp(1.25rem,4vw,3.5rem)] py-4 backdrop-blur-xl">
            <div role="tablist" aria-label="Filter by motorcycle type" className="flex gap-2 overflow-x-auto">
              {BIKE_TYPES.map((t) => {
                const count = t.id === "all" ? FLEET.length : FLEET.filter((b) => b.type === t.id).length;
                const active = filter === t.id;
                return (
                  <button
                    key={t.id}
                    role="tab"
                    type="button"
                    aria-selected={active}
                    onClick={() => setFilter(t.id)}
                    className={cn(
                      "eyebrow shrink-0 border px-5 py-3 text-[0.62rem] transition-all duration-500",
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-foreground/75 hover:border-foreground/50 hover:text-foreground",
                    )}
                  >
                    {t.label} <span className="ml-1 opacity-60">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-16 space-y-24 md:mt-24 md:space-y-36">
            {bikes.map((bike, i) => (
              <BikeShowcase key={bike.slug} bike={bike} index={FLEET.indexOf(bike)} reverse={i % 2 === 1} onDetails={setSelected} />
            ))}
          </div>

          <Reveal className="mt-28 border border-border p-8 text-sm leading-relaxed text-muted-foreground md:p-12">
            <p>
              Photographs marked <span className="text-foreground">“Representative photograph”</span> show a closely related
              model from the same manufacturer; the motorcycle you ride may differ in colour and styling. Availability is
              confirmed by email after you send an enquiry.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="surface-ivory">
        <div className="shell flex flex-col items-start justify-between gap-8 py-20 md:flex-row md:items-center">
          <h2 className="display-md max-w-2xl">Not sure which to choose? Tell us about your trip.</h2>
          <Button asChild variant="outline-dark" size="xl">
            <Link to="/booking">Send an enquiry</Link>
          </Button>
        </div>
      </section>

      <BikeDetailsDialog bike={selected} onOpenChange={(o) => !o && setSelected(null)} />
    </>
  );
}
