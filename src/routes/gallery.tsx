import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Expand } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Picture } from "@/components/site/Picture";
import { Reveal } from "@/components/site/Reveal";
import { Lightbox } from "@/components/site/Lightbox";
import { Button } from "@/components/ui/button";
import { PHOTOS, type Photo } from "@/data/media";
import { FLEET } from "@/data/fleet";
import { cn } from "@/lib/utils";

const DESCRIPTION =
  "A photography gallery of motorcycles, mountain roads, tea country and road trips — the spirit of riding from Siliguri.";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Motorcycles & Mountain Roads | Bike Rent Siliguri" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Gallery — Bike Rent Siliguri" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GalleryPage,
});

const bikePhoto = (slug: string): Photo => {
  const b = FLEET.find((x) => x.slug === slug);
  if (!b) throw new Error(`Unknown bike ${slug}`);
  return b.image;
};

/** Editorial grid: each tile spans a different footprint on large screens. */
const TILES: { photo: Photo; span: string }[] = [
  { photo: PHOTOS.aboveClouds, span: "md:col-span-8 md:row-span-2" },
  { photo: PHOTOS.helmetProfile, span: "md:col-span-4" },
  { photo: PHOTOS.goldenPeaks, span: "md:col-span-4" },
  { photo: PHOTOS.fogRider, span: "md:col-span-4 md:row-span-2" },
  { photo: PHOTOS.switchbackRoad, span: "md:col-span-8" },
  { photo: bikePhoto("himalayan-bs4-411"), span: "md:col-span-4" },
  { photo: PHOTOS.teaHills, span: "md:col-span-4" },
  { photo: PHOTOS.valleyRoadRiders, span: "md:col-span-4 md:row-span-2" },
  { photo: PHOTOS.sunsetCruiser, span: "md:col-span-8" },
  { photo: bikePhoto("meteor-350"), span: "md:col-span-4" },
  { photo: PHOTOS.riderCloseup, span: "md:col-span-3 md:row-span-2" },
  { photo: PHOTOS.hillTownClouds, span: "md:col-span-5" },
  { photo: PHOTOS.duskRoad, span: "md:col-span-4 md:row-span-2" },
  { photo: PHOTOS.cliffRoad, span: "md:col-span-5" },
  { photo: PHOTOS.mistyHillTerraces, span: "md:col-span-6" },
  { photo: bikePhoto("xpulse-200"), span: "md:col-span-6" },
  { photo: PHOTOS.riderStormMountains, span: "md:col-span-7" },
  { photo: PHOTOS.mountainOverlookBike, span: "md:col-span-5 md:row-span-2" },
  { photo: PHOTOS.teaGardenRoad, span: "md:col-span-7" },
  { photo: bikePhoto("classic-reborn-350"), span: "md:col-span-4" },
  { photo: PHOTOS.hillRailway, span: "md:col-span-4" },
  { photo: PHOTOS.forestHighwayRiders, span: "md:col-span-4" },
];

const ALL = TILES.map((t) => t.photo);

function GalleryPage() {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title={
          <>
            Seen from the <em className="italic text-primary">saddle.</em>
          </>
        }
        intro={<p>Machines, mountains and the long roads between them. Select any photograph to view it full screen.</p>}
        photo={PHOTOS.goldenPeaks}
      />

      <section className="section-y">
        <div className="shell">
          <div className="grid grid-flow-dense auto-rows-[46vw] grid-cols-2 gap-3 md:auto-rows-[19vw] md:grid-cols-12 md:gap-5 xl:auto-rows-[16rem]">
            {TILES.map((t, i) => (
              <Reveal
                key={t.photo.src}
                delay={(i % 4) * 70}
                className={cn(
                  "img-zoom group relative bg-charcoal",
                  t.span,
                  i % 5 === 0 ? "col-span-2 row-span-1" : "",
                )}
              >
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  className="block h-full w-full text-left focus-visible:outline-2 focus-visible:outline-primary"
                  aria-label={`Open photograph: ${t.photo.alt}`}
                >
                  <Picture photo={t.photo} />
                  <span className="pointer-events-none absolute inset-0 bg-overlay/0 transition-colors duration-700 group-hover:bg-overlay/35" />
                  <span className="pointer-events-none absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center border border-foreground/40 bg-background/40 opacity-0 backdrop-blur transition-all duration-500 group-hover:opacity-100">
                    <Expand className="h-4 w-4" />
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="surface-ivory">
        <div className="shell flex flex-col items-start justify-between gap-8 py-20 md:flex-row md:items-center">
          <h2 className="display-md max-w-2xl">Ready to make your own photographs?</h2>
          <Button asChild variant="outline-dark" size="xl">
            <Link to="/booking">Book your ride</Link>
          </Button>
        </div>
      </section>

      <Lightbox photos={ALL} index={index} onIndexChange={setIndex} />
    </>
  );
}
