import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Picture } from "@/components/site/Picture";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { PHOTOS, type Photo } from "@/data/media";
import { FLEET, formatPrice } from "@/data/fleet";

const DESCRIPTION =
  "Mountain roads, tea country and forest highways around Siliguri. Ideas for motorcycle trips in North Bengal and how to choose the right bike.";

export const Route = createFileRoute("/experiences")({
  head: () => ({
    meta: [
      { title: "Riding Experiences in North Bengal — Bike Rent Siliguri" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Riding Experiences around Siliguri & North Bengal" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExperiencesPage,
});

type Chapter = {
  eyebrow: string;
  title: string;
  body: string[];
  photo: Photo;
  inset: Photo;
};

const CHAPTERS: Chapter[] = [
  {
    eyebrow: "Mountain road adventures",
    title: "Up into the clouds.",
    body: [
      "Within a short ride of Siliguri the land begins to rise sharply into the Darjeeling hills. Roads such as the one through Kurseong climb in tight bends through forest and tea estates, with the plains falling away below.",
      "Hill riding rewards patience: steady throttle, early braking and respect for oncoming traffic on narrow corners.",
    ],
    photo: PHOTOS.switchbackRoad,
    inset: PHOTOS.cliffRoad,
  },
  {
    eyebrow: "Exploring North Bengal",
    title: "Tea, rivers and forest.",
    body: [
      "East of Siliguri lie the Dooars — tea gardens, rivers and forests that include Gorumara and Jaldapara national parks. North, the Teesta valley carves its way towards Kalimpong, crossed at Sevoke by the historic Coronation Bridge.",
      "Many of the region's roads are as rewarding as the places they lead to.",
    ],
    photo: PHOTOS.teaGardenRoad,
    inset: PHOTOS.hillRailway,
  },
  {
    eyebrow: "The freedom of independent travel",
    title: "Your pace. Your stops.",
    body: [
      "On a motorcycle there is no tour schedule. Pull over for a cup of tea at a roadside stall, take the turning that looks interesting, and stay for the sunset.",
      "Independent travel on two wheels means the day is shaped by curiosity, not by a timetable.",
    ],
    photo: PHOTOS.aboveClouds,
    inset: PHOTOS.mountainOverlookBike,
  },
];

const DESTINATIONS = [
  { name: "Sevoke & the Teesta", note: "The Coronation Bridge spans the Teesta river where it leaves the hills." },
  { name: "Kurseong", note: "A hill town among tea estates on the climb towards Darjeeling." },
  { name: "Darjeeling", note: "Famous for its tea and the Darjeeling Himalayan Railway, a UNESCO World Heritage Site." },
  { name: "Mirik", note: "A quieter hill town set around a lake, surrounded by tea gardens." },
  { name: "Kalimpong", note: "Reached along the Teesta valley, with views over the river far below." },
  { name: "The Dooars", note: "Forests, rivers and tea gardens stretching east along the foothills." },
];

const GUIDE = [
  { journey: "Steep hill roads & long climbs", slugs: ["himalayan-bs4-411", "xpulse-200"] },
  { journey: "Relaxed touring & scenic day rides", slugs: ["classic-reborn-350", "meteor-350"] },
  { journey: "City riding & short escapes", slugs: ["hunter-350", "pulsar-n160"] },
  { journey: "Easy, gearless travel around town", slugs: ["tvs-ntorq-125", "tvs-ntorq-150", "jupiter-125", "honda-activa-6g-110"] },
];

function ExperiencesPage() {
  return (
    <>
      <PageHero
        eyebrow="Riding experiences"
        title={
          <>
            Roads worth <em className="italic text-primary">remembering.</em>
          </>
        }
        intro={<p>Siliguri is where the plains meet the Himalaya. Here is a little of what lies beyond the city.</p>}
        photo={PHOTOS.mistyForestRoad}
      />

      {CHAPTERS.map((c, i) => (
        <section key={c.title} className={`section-y ${i % 2 === 1 ? "bg-charcoal" : ""}`}>
          <div className="shell grid items-center gap-14 md:grid-cols-12">
            <div className={`relative md:col-span-7 ${i % 2 === 1 ? "md:order-2" : ""}`}>
              <Reveal className="img-zoom aspect-[4/3] shadow-luxe">
                <Picture photo={c.photo} />
              </Reveal>
              <Reveal
                delay={180}
                className={`img-zoom absolute -bottom-12 hidden aspect-[3/4] w-[34%] border-8 shadow-luxe md:block ${
                  i % 2 === 1 ? "-left-10 border-charcoal" : "-right-10 border-background"
                }`}
              >
                <Picture photo={c.inset} />
              </Reveal>
            </div>
            <div className={`md:col-span-5 ${i % 2 === 1 ? "md:order-1" : ""}`}>
              <SectionHeading index={`0${i + 1}`} eyebrow={c.eyebrow} title={c.title}>
                {c.body.map((p) => (
                  <p key={p} className="mt-4 first:mt-0">
                    {p}
                  </p>
                ))}
              </SectionHeading>
            </div>
          </div>
        </section>
      ))}

      {/* Destinations */}
      <section className="surface-ivory section-y">
        <div className="shell">
          <SectionHeading index="04" eyebrow="Scenic destinations around Siliguri" title="Six places to point your front wheel." tone="light" />
          <div className="mt-14 grid border-t border-border sm:grid-cols-2 lg:grid-cols-3">
            {DESTINATIONS.map((d, i) => (
              <Reveal key={d.name} delay={i * 70} className="border-b border-border py-9 sm:px-6 sm:[&:nth-child(odd)]:border-r lg:[&:nth-child(odd)]:border-r-0 lg:[&:not(:nth-child(3n))]:border-r sm:first:pl-0">
                <span className="numeral text-xl text-bronze">0{i + 1}</span>
                <h3 className="mt-3 font-display text-3xl">{d.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ivory-muted">{d.note}</p>
              </Reveal>
            ))}
          </div>
          <p className="mt-10 max-w-2xl text-xs leading-relaxed text-ivory-muted">
            Hill roads can be affected by weather, especially during the monsoon. Check local road and weather conditions
            before setting out, and always ride within your experience.
          </p>
        </div>
      </section>

      {/* Choosing guide */}
      <section className="section-y">
        <div className="shell grid gap-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <SectionHeading index="05" eyebrow="Choosing the right motorcycle" title="Match the machine to the journey." />
            <Reveal delay={120} className="img-zoom mt-12 hidden aspect-[3/4] md:block">
              <Picture photo={PHOTOS.riderSnowPeaks} className="object-[60%_center]" />
            </Reveal>
          </div>
          <div className="md:col-span-8">
            {GUIDE.map((g, i) => (
              <Reveal key={g.journey} delay={i * 80} className="border-t border-border py-10 last:border-b">
                <h3 className="font-display text-3xl">{g.journey}</h3>
                <ul className="mt-6 flex flex-wrap gap-3">
                  {g.slugs.map((s) => {
                    const b = FLEET.find((x) => x.slug === s);
                    if (!b) return null;
                    return (
                      <li key={s}>
                        <Link
                          to="/booking"
                          search={{ bike: s }}
                          className="group flex items-center gap-3 border border-border px-4 py-3 text-sm transition-colors hover:border-primary"
                        >
                          {b.name}
                          <span className="text-primary">{formatPrice(b.pricePerDay)}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            ))}
            <Reveal className="mt-12">
              <Button asChild variant="bronze" size="xl">
                <Link to="/motorcycles">Compare the full collection</Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
