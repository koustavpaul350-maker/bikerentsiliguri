import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Picture } from "@/components/site/Picture";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { PHOTOS } from "@/data/media";

const DESCRIPTION =
  "Bike Rent Siliguri rents motorcycles and scooters from Sevoke Road, Siliguri — for riders who want to explore North Bengal at their own pace.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Bike Rent Siliguri" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "More Than a Ride — About Bike Rent Siliguri" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  {
    title: "Freedom",
    body: "No fixed itinerary, no timetable. A motorcycle lets you stop where the view demands it and stay as long as you like.",
  },
  {
    title: "Exploration",
    body: "The best places around Siliguri are found down side roads and up hill tracks — the kind of places you reach on two wheels.",
  },
  {
    title: "Convenience",
    body: "One clear daily price for each machine, an online enquiry, and a pickup point on Sevoke Road in the heart of the city.",
  },
  {
    title: "The right machine",
    body: "From a gearless scooter for town to a Himalayan for the hills, we help you match the bike to the journey.",
  },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={
          <>
            More than a ride.
            <br />
            <em className="italic text-primary">It's a way of life.</em>
          </>
        }
        photo={PHOTOS.riderStormMountains}
      />

      <section className="section-y">
        <div className="shell grid gap-14 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <p className="eyebrow text-primary">Our story, briefly</p>
          </Reveal>
          <div className="md:col-span-8">
            <Reveal>
              <p className="font-display text-3xl leading-snug md:text-[2.6rem] md:leading-[1.2]">
                There is a particular feeling when the city thins out behind you and the road starts to climb. The air
                cools, the bends tighten, and the only plan is the next horizon.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p className="lede mt-10 max-w-2xl text-muted-foreground">
                Bike Rent Siliguri exists for that feeling. We rent motorcycles and scooters from Darsaratpally Bazar on
                Sevoke Road, so that travellers and locals alike can explore North Bengal on their own terms — whether
                that means an afternoon in town or days in the hills.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Split screen */}
      <section className="grid md:grid-cols-2">
        <Reveal className="img-zoom aspect-[4/5] md:aspect-auto md:min-h-[90svh]">
          <Picture photo={PHOTOS.fogRider} />
        </Reveal>
        <div className="flex items-center bg-charcoal">
          <div className="px-[clamp(1.25rem,6vw,6rem)] py-20">
            <SectionHeading eyebrow="Philosophy" title="Travel slower. See more.">
              <p>
                A car window frames the landscape; a motorcycle puts you inside it. You smell the tea gardens, feel the
                temperature drop as you climb and hear the river before you see it.
              </p>
              <p className="mt-5">
                We believe the journey is the destination — and that the right machine, honestly priced, is all you need
                to begin.
              </p>
            </SectionHeading>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="shell">
          <SectionHeading eyebrow="What we stand for" title="Four simple principles." />
          <div className="mt-16 grid border-t border-border md:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal
                key={v.title}
                delay={i * 90}
                className="border-b border-border py-10 md:px-8 md:[&:nth-child(odd)]:border-r lg:border-r lg:last:border-r-0 lg:first:pl-0"
              >
                <span className="numeral text-3xl text-primary">0{i + 1}</span>
                <h3 className="mt-6 font-display text-3xl">{v.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Cinematic triptych */}
      <section className="pb-[clamp(5rem,11vw,10rem)]">
        <div className="shell grid gap-4 md:grid-cols-12 md:gap-6">
          <Reveal className="img-zoom aspect-[16/10] md:col-span-8">
            <Picture photo={PHOTOS.valleyRoadRiders} className="object-[center_60%]" />
          </Reveal>
          <Reveal delay={120} className="img-zoom aspect-[4/5] md:col-span-4 md:aspect-auto">
            <Picture photo={PHOTOS.riderCloseup} />
          </Reveal>
        </div>
      </section>

      <section className="surface-ivory">
        <div className="shell grid gap-10 py-24 md:grid-cols-12 md:items-end md:py-32">
          <h2 className="display-lg md:col-span-8">Find your machine. Then find your road.</h2>
          <div className="flex flex-col gap-4 md:col-span-4 md:items-end">
            <Button asChild variant="outline-dark" size="xl">
              <Link to="/motorcycles">See the collection</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
