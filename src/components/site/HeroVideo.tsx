import { useEffect, useRef, useState } from "react";
import { HERO_MEDIA, PHOTOS } from "@/data/media";
import { Picture } from "./Picture";

/** Muted looping riding film with a real-photo fallback if video can't play. */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      v.pause();
      return;
    }
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => undefined);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-midnight">
      <Picture photo={PHOTOS.mistyForestRoad} priority className="absolute inset-0" />
      {!failed ? (
        <video
          ref={ref}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={HERO_MEDIA.poster}
          aria-hidden="true"
          onError={() => setFailed(true)}
        >
          <source src={HERO_MEDIA.video540} type="video/mp4" media="(max-width: 767px)" />
          <source src={HERO_MEDIA.video1080} type="video/mp4" />
        </video>
      ) : null}
      <div className="bg-hero-overlay absolute inset-0" />
    </div>
  );
}
