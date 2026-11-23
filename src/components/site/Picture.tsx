import type { ImgHTMLAttributes } from "react";
import type { Photo } from "@/data/media";
import { cn } from "@/lib/utils";

type PictureProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt" | "width" | "height"> & {
  photo: Photo;
  priority?: boolean;
};

/** Real photograph with lazy loading, intrinsic size and cover cropping. */
export function Picture({ photo, priority = false, className, ...rest }: PictureProps) {
  return (
    <img
      src={photo.src}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "auto"}
      className={cn("h-full w-full object-cover", className)}
      {...rest}
    />
  );
}
