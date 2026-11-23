import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroVideo } from "@/components/site/HeroVideo";
import { Reveal } from "@/components/site/Reveal";
import { Picture } from "@/components/site/Picture";
import { SectionHeading } from "@/components/site/SectionHeading";
import { FLEET, formatPrice } from "@/data/fleet";
import { PHOTOS } from "@/data/media";
import { localBusinessJsonLd } from "@/data/business";

const TITLE = "Bike Rental in Siliguri — Royal Enfield & Scooter Hire | Bike Rent Siliguri";
const DESCRIPTION =
  "Motorcycle and scooter rental in Siliguri from ₹700/day. Royal Enfield Himalayan, Classic, Meteor, Hunter, Xpulse, Pulsar, Ntorq, Jupiter and Activa. Book online.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Bike Rent Siliguri — The Road Is Yours" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(localBusinessJsonLd) }],
  }),
  component: HomePage,
});

const FEATURED = ["himalayan-bs4-411", "classic-reborn-350", "meteor-350", "xpulse-200"]
  .map((slug) => FLEET.find((b) => b.slug === slug))
  .filter((b): b is (typeof FLEET)[number] => Boolean(b));

const lowestPrice = Math.min(...FLEET.map((b) => b.pricePerDay));

function HomePage() {
  return (
    <>
      {/* ---------------- Cinematic hero ---------------- */}
      <section className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden">
        <HeroVideo />
        <div className="shell flex flex-1 flex-col justify-end pb-28 pt-40 md:pb-32">
          <p className="eyebrow animate-hero-rise flex items-center gap-4 text-primary">
            <span className="rule-bronze" aria-hidden="true" />
            Motorcycle rental · Siliguri, North Bengal
          </p>
          <h1 className="display-xl animate-hero-rise mt-6 max-w-6xl uppercase [animation-delay:150ms]">
            The road
            <br />
            is <em className="font-normal italic text-primary">yours.</em>
          </h1>
          <p className="lede animate-hero-rise mt-8 max-w-xl text-foreground/85 [animation-delay:300ms]">
            Discover the freedom of two wheels. Choose your ride, explore new destinations, and make every journey
            unforgettable.
          </p>
          <div className="animate-hero-rise mt-10 flex flex-col gap-4 sm:flex-row [animation-delay:450ms]">
            <Button asChild variant="bronze" size="xl">
              <Link to="/motorcycles">Explore our motorcycles</Link>
            </Button>
            <Button asChild variant="outline-light" size="xl">
              <Link to="/booking">Book your ride</Link>
            </Button>
          </div>
        </div>

        <div className="relative border-t border-foreground/15 bg-background/30 backdrop-blur-md">
          <div className="shell grid grid-cols-3 divide-x divide-foreground/15 text-center md:text-left">
            {[
              ["Fleet", `${FLEET.length} machines`],
              ["From", `${formatPrice(lowestPrice)}/day`],
              ["Base", "Sevoke Road"],
            ].map(([k, v]) => (
              <div key={k} className="px-2 py-5 md:px-8">
                <p className="eyebrow text-[0.58rem] text-foreground/60">{k}</p>
                <p className="mt-1 font-display text-lg md:text-2xl">{v}</p>
              </div>
            ))}
          </div>
        </div>
        <a
          href="#intro"
          className="absolute bottom-28 right-6 hidden flex-col items-center gap-3 text-foreground/70 md:right-10 md:flex"
          aria-label="Scroll to introduction"
        >
          <span className="eyebrow [writing-mode:vertical-rl] text-[0.58rem]">Scroll</span>
          <span className="relative h-16 w-px overflow-hidden bg-foreground/20">
            <span className="animate-scroll-cue absolute inset-0 bg-primary" />
          </span>
        </a>
      </section>

      {/* ---------------- Manifesto ---------------- */}
      <section id="intro" className="section-y">
        <div className="shell grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-6 lg:col-span-5">
            <SectionHeading index="01" eyebrow="Bike Rent Siliguri" title={<>Where the plains end, the climb begins.</>}>
              <p>
                Siliguri sits at the foot of the Eastern Himalaya — a crossroads of hill roads, river valleys and forest
                highways. We put a well-chosen motorcycle or scooter beneath you, so the next turn in the road is
                entirely your decision.
              </p>
            </SectionHeading>
            <Reveal delay={200} className="mt-10">
              <Button asChild variant="line">
                <Link to="/about">
                  Our philosophy <ArrowRight />
                </Link>
              </Button>
            </Reveal>
          </div>
          <div className="relative md:col-span-6 lg:col-span-6 lg:col-start-7">
            <Reveal className="img-zoom aspect-[4/5] w-[78%] shadow-luxe">
              <Picture photo={PHOTOS.duskRoad} />
            </Reveal>
            <Reveal delay={200} className="img-zoom absolute -bottom-10 right-0 aspect-[3/4] w-[46%] border-8 border-background shadow-luxe">
              <Picture photo={PHOTOS.helmetProfile} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- Collection ---------------- */}
      <section className="section-y border-t border-border bg-charcoal">
        <div className="shell">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading index="02" eyebrow="The collection" title="Machines with character.">
              <p>From mountain-ready adventure bikes to easy gearless scooters — every ride, priced by the day.</p>
            </SectionHeading>
            <Reveal delay={150}>
              <Button asChild variant="outline-light" size="xl">
                <Link to="/motorcycles">
                  View all {FLEET.length} <ArrowRight />
                </Link>
              </Button>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-12 md:gap-8">
            {FEATURED.map((bike, i) => {
              const layout = [
                "md:col-span-7 aspect-[4/3]",
                "md:col-span-5 aspect-[4/5] md:mt-24",
                "md:col-span-5 aspect-[4/5]",
                "md:col-span-7 aspect-[4/3] md:-mt-24 md:self-end",
              ][i];
              return (
                <Reveal key={bike.slug} delay={i * 80} className={layout}>
                  <Link
                    to="/motorcycles"
                    hash={bike.slug}
                    className="img-zoom group relative block h-full w-full bg-midnight"
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
                    <div className="bg-fade-up absolute inset-0" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-8">
                      <div>
                        <p className="eyebrow text-[0.6rem] text-foreground/70">{bike.make}</p>
                        <h3 className="mt-2 font-display text-3xl md:text-4xl">{bike.name}</h3>
                      </div>
                      <p className="shrink-0 text-right">
                        <span className="font-display text-2xl text-primary">{formatPrice(bike.pricePerDay)}</span>
                        <span className="block text-xs text-foreground/60">per day</span>
                      </p>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- Full-bleed statement ---------------- */}
      <section className="grain relative isolate flex min-h-[80svh] items-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Picture photo={PHOTOS.switchbackRoad} />
          <div className="absolute inset-0 bg-overlay/60" />
        </div>
        <div className="shell py-28 text-center">
          <Reveal>
            <p className="eyebrow text-primary">Riding experiences</p>
            <p className="display-lg mx-auto mt-6 max-w-5xl text-balance">
              Every hairpin is an invitation. <em className="italic text-foreground/70">Accept it.</em>
            </p>
            <div className="mt-10 flex justify-center">
              <Button asChild variant="outline-light" size="xl">
                <Link to="/experiences">Discover the routes</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Experiences trio ---------------- */}
      <section className="section-y">
        <div className="shell">
          <SectionHeading index="03" eyebrow="Beyond the city" title="Three ways to ride North Bengal." />
          <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-6">
            {[
              {
                photo: PHOTOS.mistyForestRoad,
                title: "Mountain roads",
                body: "Climb out of the plains into cool air, mist and switchbacks that reward a patient throttle.",
              },
              {
                photo: PHOTOS.teaGardenRoad,
                title: "Tea-country lanes",
                body: "Quiet roads ribboning through tea estates, with views that change at every bend.",
              },
              {
                photo: PHOTOS.forestHighwayRiders,
                title: "Forest highways",
                body: "Tree-lined stretches and river crossings — the easy-paced rides North Bengal is loved for.",
              },
            ].map((x, i) => (
              <Reveal key={x.title} delay={i * 120} className={i === 1 ? "md:mt-20" : ""}>
                <Link to="/experiences" className="group block">
                  <div className="img-zoom aspect-[3/4] bg-charcoal">
                    <Picture photo={x.photo} />
                  </div>
                  <div className="mt-6 flex items-baseline gap-4">
                    <span className="numeral text-lg text-primary">0{i + 1}</span>
                    <h3 className="font-display text-3xl transition-colors group-hover:text-primary">{x.title}</h3>
                  </div>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">{x.body}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- How it works (ivory) ---------------- */}
      <section className="surface-ivory section-y">
        <div className="shell grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionHeading index="04" eyebrow="How it works" title="From enquiry to open road." tone="light">
              <p>A simple, personal process — no account, no fuss.</p>
            </SectionHeading>
            <Reveal delay={150} className="mt-10">
              <Button asChild variant="outline-dark" size="xl">
                <Link to="/booking">Start an enquiry</Link>
              </Button>
            </Reveal>
          </div>
          <ol className="md:col-span-7">
            {[
              ["Choose your machine", "Browse the collection and pick the motorcycle or scooter that suits your journey."],
              ["Send your dates", "Tell us your pickup and return dates through the booking enquiry form."],
              ["We confirm by email", "We get back to you to confirm availability and the details of your rental."],
              ["Ride", "Collect your bike from Darsaratpally Bazar on Sevoke Road — and go."],
            ].map(([t, d], i) => (
              <Reveal as="li" key={t} delay={i * 90} className="grid grid-cols-[4rem_1fr] gap-4 border-t border-border py-8 last:border-b">
                <span className="numeral text-4xl text-bronze">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-2xl md:text-3xl">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ivory-muted">{d}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- Gallery teaser ---------------- */}
      <section className="section-y overflow-hidden">
        <div className="shell flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading index="05" eyebrow="Gallery" title="Moments from the road." />
          <Reveal delay={150}>
            <Button asChild variant="line">
              <Link to="/gallery">
                Open the gallery <ArrowRight />
              </Link>
            </Button>
          </Reveal>
        </div>
        <div className="shell mt-14">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-5">
            {[
              [PHOTOS.aboveClouds, "col-span-2 md:col-span-5 aspect-[4/3]"],
              [PHOTOS.riderCloseup, "md:col-span-3 aspect-[3/4] md:mt-16"],
              [PHOTOS.goldenPeaks, "md:col-span-4 aspect-[3/4] md:aspect-auto"],
            ].map(([photo, cls], i) => (
              <Reveal key={i} delay={i * 100} className={`img-zoom bg-charcoal ${cls as string}`}>
                <Link to="/gallery" className="block h-full">
                  <Picture photo={photo as typeof PHOTOS.aboveClouds} />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Final CTA ---------------- */}
      <section className="grain relative isolate overflow-hidden border-t border-border">
        <div className="absolute inset-0 -z-10">
          <Picture photo={PHOTOS.riderSnowPeaks} />
          <div className="absolute inset-0 bg-overlay/70" />
        </div>
        <div className="shell flex flex-col items-start gap-10 py-28 md:flex-row md:items-end md:justify-between md:py-36">
          <Reveal>
            <p className="eyebrow text-primary">Ready when you are</p>
            <h2 className="display-lg mt-5 max-w-3xl">Your next journey starts on Sevoke Road.</h2>
          </Reveal>
          <Reveal delay={150} className="flex flex-col gap-4 sm:flex-row">
            <Button asChild variant="bronze" size="xl">
              <Link to="/booking">Book your ride</Link>
            </Button>
            <Button asChild variant="outline-light" size="xl">
              <Link to="/contact">
                Find us <ArrowRight />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
