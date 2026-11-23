import { createFileRoute } from "@tanstack/react-router";
import { FLEET } from "@/data/fleet";
import { PHOTO_CREDITS } from "@/data/media";

export const Route = createFileRoute("/credits")({
  head: () => ({
    meta: [
      { title: "Photography Credits — Bike Rent Siliguri" },
      { name: "description", content: "Credits and licences for the photographs and video used on the Bike Rent Siliguri website." },
      { property: "og:title", content: "Photography Credits — Bike Rent Siliguri" },
      { property: "og:description", content: "Credits and licences for photographs and video used on this website." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CreditsPage,
});

function CreditsPage() {
  return (
    <section className="shell max-w-4xl pb-28 pt-40">
      <p className="eyebrow text-primary">Credits</p>
      <h1 className="display-md mt-5">Photography credits</h1>
      <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
        Landscape and lifestyle photographs are from{" "}
        <a className="link-underline text-foreground" href={PHOTO_CREDITS.url} target="_blank" rel="noreferrer">
          {PHOTO_CREDITS.source}
        </a>{" "}
        ({PHOTO_CREDITS.license}). The homepage film is from{" "}
        <a className="link-underline text-foreground" href={PHOTO_CREDITS.video.url} target="_blank" rel="noreferrer">
          {PHOTO_CREDITS.video.source}
        </a>{" "}
        ({PHOTO_CREDITS.video.license}). Motorcycle photographs are from Wikimedia Commons, credited below.
      </p>
      <ul className="mt-12 divide-y divide-border border-y border-border">
        {FLEET.map((b) => (
          <li key={b.slug} className="flex flex-col gap-1 py-5 text-sm sm:flex-row sm:items-center sm:justify-between">
            <span className="font-display text-xl">{b.name}</span>
            <span className="text-muted-foreground">
              Photo: {b.credit.author} ·{" "}
              <a href={b.credit.source} target="_blank" rel="noreferrer" className="link-underline text-foreground">
                {b.credit.license}
              </a>
              {b.representativePhoto ? " · representative model" : ""}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
