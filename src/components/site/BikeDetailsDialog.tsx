import { Link } from "@tanstack/react-router";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatPrice, type Bike } from "@/data/fleet";

type Props = { bike: Bike | null; onOpenChange: (open: boolean) => void };

export function BikeDetailsDialog({ bike, onOpenChange }: Props) {
  return (
    <Dialog open={bike !== null} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92svh] w-[calc(100%-1.5rem)] max-w-4xl gap-0 overflow-y-auto rounded-none border-border bg-card p-0 sm:rounded-none">
        {bike ? (
          <div className="grid md:grid-cols-2">
            <div className="relative aspect-[4/3] bg-midnight md:aspect-auto">
              <img
                src={bike.image.src}
                alt={bike.image.alt}
                width={bike.image.width}
                height={bike.image.height}
                className="h-full w-full object-cover"
              />
              {bike.representativePhoto ? (
                <p className="absolute inset-x-0 bottom-0 bg-background/80 px-4 py-2 text-xs text-muted-foreground backdrop-blur">
                  Representative photograph — the bike you ride may differ in colour and styling.
                </p>
              ) : null}
            </div>
            <div className="flex flex-col p-7 md:p-10">
              <p className="eyebrow text-primary">
                {bike.make} · {bike.style}
              </p>
              <DialogTitle className="display-md mt-4 font-display text-4xl font-medium">{bike.name}</DialogTitle>
              <DialogDescription className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {bike.description}
              </DialogDescription>

              <dl className="mt-8 grid grid-cols-2 border-y border-border">
                <div className="py-4">
                  <dt className="eyebrow text-[0.6rem] text-muted-foreground">Engine</dt>
                  <dd className="mt-1 font-display text-2xl">{bike.engine ?? "—"}</dd>
                </div>
                <div className="border-l border-border py-4 pl-5">
                  <dt className="eyebrow text-[0.6rem] text-muted-foreground">Daily rental</dt>
                  <dd className="mt-1 font-display text-2xl text-primary">{formatPrice(bike.pricePerDay)}</dd>
                </div>
              </dl>

              <p className="eyebrow mt-8 text-[0.6rem] text-muted-foreground">Well suited to</p>
              <ul className="mt-3 space-y-2 text-sm">
                {bike.idealFor.map((i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="h-px w-4 bg-primary" aria-hidden="true" />
                    {i}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-10">
                <Button asChild variant="bronze" size="xl" className="w-full">
                  <Link to="/booking" search={{ bike: bike.slug }} onClick={() => onOpenChange(false)}>
                    Book this bike — {formatPrice(bike.pricePerDay)}/day
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
