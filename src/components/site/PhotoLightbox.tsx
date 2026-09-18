import { useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type LightboxPhoto = { src: string; alt: string };

export function PhotoLightbox({
  photos,
  index,
  onClose,
  onIndexChange,
}: {
  photos: LightboxPhoto[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}) {
  const open = index !== null;
  const touchX = useRef<number | null>(null);

  const next = useCallback(() => {
    if (index === null) return;
    onIndexChange((index + 1) % photos.length);
  }, [index, onIndexChange, photos.length]);

  const prev = useCallback(() => {
    if (index === null) return;
    onIndexChange((index - 1 + photos.length) % photos.length);
  }, [index, onIndexChange, photos.length]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, next, prev, onClose]);

  if (!open) return null;
  const photo = photos[index]!;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Room photos"
      className="fixed inset-0 z-100 flex flex-col bg-foreground/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-4 py-4 text-background sm:px-6">
        <span className="text-sm">
          {index + 1} / {photos.length}
        </span>
        <button
          type="button"
          aria-label="Close photos"
          onClick={onClose}
          className="rounded-full p-2 transition-colors hover:bg-background/15"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div
        className="relative flex flex-1 items-center justify-center px-4 pb-4 sm:px-16"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => {
          touchX.current = e.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(e) => {
          const start = touchX.current;
          const end = e.changedTouches[0]?.clientX ?? null;
          if (start === null || end === null) return;
          if (Math.abs(end - start) > 45) (end < start ? next : prev)();
          touchX.current = null;
        }}
      >
        <button
          type="button"
          aria-label="Previous photo"
          onClick={prev}
          className="absolute left-2 z-10 rounded-full bg-background/15 p-3 text-background transition-colors hover:bg-background/30 sm:left-4"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <img
          src={photo.src}
          alt={photo.alt}
          className="max-h-full max-w-full rounded-md object-contain"
        />
        <button
          type="button"
          aria-label="Next photo"
          onClick={next}
          className="absolute right-2 z-10 rounded-full bg-background/15 p-3 text-background transition-colors hover:bg-background/30 sm:right-4"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div
        className="flex gap-2 overflow-x-auto px-4 pb-5 sm:px-6"
        onClick={(e) => e.stopPropagation()}
      >
        {photos.map((p, i) => (
          <button
            key={p.src}
            type="button"
            onClick={() => onIndexChange(i)}
            aria-label={`View photo ${i + 1}`}
            className={cn(
              "h-16 w-24 shrink-0 overflow-hidden rounded border transition-all",
              i === index ? "border-brass ring-2 ring-brass/50" : "border-transparent opacity-60 hover:opacity-100",
            )}
          >
            <img src={p.src} alt={p.alt} loading="lazy" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
