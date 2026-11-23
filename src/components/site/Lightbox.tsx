import { useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { Photo } from "@/data/media";

type Props = {
  photos: Photo[];
  index: number | null;
  onIndexChange: (i: number | null) => void;
};

export function Lightbox({ photos, index, onIndexChange }: Props) {
  const open = index !== null;
  const photo = index !== null ? photos[index] : undefined;

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      onIndexChange((index + delta + photos.length) % photos.length);
    },
    [index, onIndexChange, photos.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onIndexChange(null)}>
      <DialogContent className="flex h-[100svh] w-screen max-w-none flex-col items-center justify-center gap-0 border-0 bg-transparent p-0 shadow-none sm:rounded-none">
        {photo ? (
          <>
            <DialogTitle className="sr-only">Photograph {index !== null ? index + 1 : ""} of {photos.length}</DialogTitle>
            <figure className="flex max-h-full w-full flex-col items-center px-4 md:px-24">
              <img
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                className="animate-page-in max-h-[80svh] w-auto max-w-full object-contain shadow-luxe"
              />
              <figcaption className="mt-5 flex w-full max-w-3xl items-center justify-between gap-6 text-sm text-foreground/80">
                <DialogDescription className="text-foreground/80">{photo.alt}</DialogDescription>
                <span className="numeral shrink-0 text-lg text-primary">
                  {String((index ?? 0) + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
                </span>
              </figcaption>
            </figure>
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-foreground/25 bg-background/50 text-foreground backdrop-blur transition-colors hover:border-primary hover:text-primary md:left-8"
              aria-label="Previous photograph"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-foreground/25 bg-background/50 text-foreground backdrop-blur transition-colors hover:border-primary hover:text-primary md:right-8"
              aria-label="Next photograph"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
