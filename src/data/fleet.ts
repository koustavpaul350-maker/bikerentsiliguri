import himalayan from "@/assets/bikes/himalayan-411.jpg.asset.json";
import classic from "@/assets/bikes/classic-350.jpg.asset.json";
import meteor from "@/assets/bikes/meteor-350.jpg.asset.json";
import hunter from "@/assets/bikes/hunter-350.jpg.asset.json";
import xpulse from "@/assets/bikes/xpulse-200.jpg.asset.json";
import ntorq125 from "@/assets/bikes/ntorq-125.jpg.asset.json";
import jupiter from "@/assets/bikes/jupiter-125.jpg.asset.json";
import pulsar from "@/assets/bikes/pulsar-n160.jpg.asset.json";
import ntorq150 from "@/assets/bikes/ntorq-150.jpg.asset.json";
import activa from "@/assets/bikes/activa-6g.jpg.asset.json";

export type BikeType = "adventure" | "classic" | "street" | "scooter";

export const BIKE_TYPES: { id: BikeType | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "adventure", label: "Adventure" },
  { id: "classic", label: "Classic & Cruiser" },
  { id: "street", label: "Street" },
  { id: "scooter", label: "Scooter" },
];

export type Bike = {
  slug: string;
  /** Name exactly as supplied by the business. */
  name: string;
  make: string;
  engine: string | null;
  pricePerDay: number;
  type: BikeType;
  style: string;
  tagline: string;
  description: string;
  idealFor: string[];
  image: { src: string; alt: string; width: number; height: number };
  /** True when the photo shows a closely related model rather than the exact one. */
  representativePhoto: boolean;
  credit: { author: string; license: string; source: string };
};

export const FLEET: Bike[] = [
  {
    slug: "himalayan-bs4-411",
    name: "Himalayan BS4 411cc",
    make: "Royal Enfield",
    engine: "411cc",
    pricePerDay: 1400,
    type: "adventure",
    style: "Adventure tourer",
    tagline: "Built for the high roads.",
    description:
      "A purpose-built adventure motorcycle with long-travel suspension and an upright riding position — at home on broken mountain tarmac, gravel and long climbing days.",
    idealFor: ["Mountain passes", "Long-distance touring", "Mixed road conditions"],
    image: { src: himalayan.url, alt: "Royal Enfield Himalayan adventure motorcycle parked on a country lane", width: 1600, height: 1098 },
    representativePhoto: false,
    credit: { author: "Ashley Pomeroy", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:Royal_Enfield_Himalayan_DB2K5442.jpg" },
  },
  {
    slug: "classic-reborn-350",
    name: "Classic Reborn 350cc",
    make: "Royal Enfield",
    engine: "350cc",
    pricePerDay: 1300,
    type: "classic",
    style: "Heritage classic",
    tagline: "Timeless lines. Unhurried miles.",
    description:
      "The unmistakable silhouette of a classic single — chrome, a sculpted tank and a relaxed, characterful engine that rewards an easy pace through hill country.",
    idealFor: ["Scenic day rides", "Relaxed touring", "Riding two-up"],
    image: { src: classic.url, alt: "Royal Enfield Classic 350 in red and chrome with riders nearby", width: 1600, height: 1200 },
    representativePhoto: false,
    credit: { author: "Cjp24", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Royal_Enfield_Classic_350_-_Orcal_Astor_125.jpg" },
  },
  {
    slug: "meteor-350",
    name: "Meteor 350cc",
    make: "Royal Enfield",
    engine: "350cc",
    pricePerDay: 1400,
    type: "classic",
    style: "Cruiser",
    tagline: "Low, long and effortless.",
    description:
      "A comfortable cruiser with a low seat, forward-set footpegs and a smooth engine — made for long stretches of open highway and easy conversation on the road.",
    idealFor: ["Highway cruising", "Comfort on long days", "Riders who prefer a low seat"],
    image: { src: meteor.url, alt: "Royal Enfield Meteor 350 cruiser in turquoise and cream", width: 1600, height: 1274 },
    representativePhoto: false,
    credit: { author: "UliBe43", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:Royal_Enfield_Meteor_2021-3.jpg" },
  },
  {
    slug: "hunter-350",
    name: "Hunter 350cc",
    make: "Royal Enfield",
    engine: "350cc",
    pricePerDay: 1300,
    type: "street",
    style: "Roadster",
    tagline: "Compact, nimble, all character.",
    description:
      "A compact modern roadster with a light, playful feel — quick through town traffic and engaging on winding roads out of the city.",
    idealFor: ["City riding", "Short hill escapes", "Newer riders on a 350"],
    image: { src: hunter.url, alt: "Royal Enfield Hunter 350 roadster side view", width: 1600, height: 900 },
    representativePhoto: false,
    credit: { author: "Pintu dasaundhi", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Hunter_350_side_view_India_Model.png" },
  },
  {
    slug: "xpulse-200",
    name: "Xpulse 200cc",
    make: "Hero",
    engine: "200cc",
    pricePerDay: 1200,
    type: "adventure",
    style: "Dual-sport",
    tagline: "Light enough to go anywhere.",
    description:
      "A lightweight dual-sport with generous ground clearance — easy to manage on rough tracks and narrow village roads where heavier machines feel cumbersome.",
    idealFor: ["Off-road trails", "Rough village roads", "Lighter adventure riding"],
    image: { src: xpulse.url, alt: "Hero Xpulse 200 dual-sport motorcycle with luggage on a dirt track", width: 1600, height: 1207 },
    representativePhoto: false,
    credit: { author: "Crazyranga", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Hero_Xpulse_200_2021_model.png" },
  },
  {
    slug: "tvs-ntorq-125",
    name: "TVS Ntorq 125cc",
    make: "TVS",
    engine: "125cc",
    pricePerDay: 800,
    type: "scooter",
    style: "Sport scooter",
    tagline: "Sharp, quick and easy.",
    description:
      "A sporty, gearless scooter with lively acceleration — the effortless way to move around Siliguri and nearby towns.",
    idealFor: ["City errands", "Short trips", "Gearless convenience"],
    image: { src: ntorq125.url, alt: "TVS Ntorq 125 scooter in blue and grey", width: 1600, height: 1200 },
    representativePhoto: false,
    credit: { author: "M.parvage", license: "CC BY 4.0", source: "https://commons.wikimedia.org/wiki/File:TVS_Ntorq_125_blue.jpg" },
  },
  {
    slug: "jupiter-125",
    name: "Jupiter 125cc",
    make: "TVS",
    engine: "125cc",
    pricePerDay: 700,
    type: "scooter",
    style: "Family scooter",
    tagline: "Comfortable every day.",
    description:
      "A comfortable, practical scooter with an easy, upright riding position — dependable for daily travel around the city.",
    idealFor: ["Everyday city travel", "Comfortable commuting", "Gearless convenience"],
    image: { src: jupiter.url, alt: "TVS Jupiter scooter in bronze (representative photograph)", width: 1600, height: 1200 },
    representativePhoto: true,
    credit: { author: "SnapMeUp", license: "CC BY 4.0", source: "https://commons.wikimedia.org/wiki/File:TVS_Jupiter_Scooter.jpg" },
  },
  {
    slug: "pulsar-n160",
    name: "Pulsar N160",
    make: "Bajaj",
    engine: null,
    pricePerDay: 1000,
    type: "street",
    style: "Street naked",
    tagline: "Everyday sport.",
    description:
      "A sporty street motorcycle with a confident, modern feel — a strong all-rounder for town riding and quick runs out on the highway.",
    idealFor: ["City and highway", "Sporty everyday riding", "Solo trips"],
    image: { src: pulsar.url, alt: "Bajaj Pulsar street motorcycle (representative photograph of the Pulsar range)", width: 1600, height: 1200 },
    representativePhoto: true,
    credit: { author: "Sijawd", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:BAJAJ_Pulsar_NS160.jpg" },
  },
  {
    slug: "tvs-ntorq-150",
    name: "TVS Ntorq 150cc",
    make: "TVS",
    engine: "150cc",
    pricePerDay: 1000,
    type: "scooter",
    style: "Performance scooter",
    tagline: "More reach, same ease.",
    description:
      "The larger-engined Ntorq — gearless convenience with extra performance for longer rides beyond the city.",
    idealFor: ["Longer scooter rides", "Riding two-up", "Gearless convenience"],
    image: { src: ntorq150.url, alt: "TVS Ntorq scooter in grey and black (representative photograph)", width: 1600, height: 1200 },
    representativePhoto: true,
    credit: { author: "MotorideSA", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:TVS_Ntorq_125_Race_XP.jpg" },
  },
  {
    slug: "honda-activa-6g-110",
    name: "Honda Activa 6G 110cc",
    make: "Honda",
    engine: "110cc",
    pricePerDay: 700,
    type: "scooter",
    style: "Everyday scooter",
    tagline: "Simple. Reliable. Easy.",
    description:
      "A light, familiar and easy-to-ride scooter — the simplest way to get around Siliguri at your own pace.",
    idealFor: ["First-time renters", "City travel", "Gearless convenience"],
    image: { src: activa.url, alt: "Honda Activa 6G scooter in silver", width: 1600, height: 1200 },
    representativePhoto: false,
    credit: { author: "Alka", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Honda_Activa_6G.jpg" },
  },
];

export function getBike(slug: string | undefined): Bike | undefined {
  if (!slug) return undefined;
  return FLEET.find((b) => b.slug === slug);
}

export function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}
