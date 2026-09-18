import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHero, Section } from "@/components/site/Section";
import { rooms } from "@/lib/rooms";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | House Of Nyibiba Guest House, Boksburg" },
      {
        name: "description",
        content:
          "Photo gallery of House Of Nyibiba guest house in Vosloorus, Boksburg — rooms, bathrooms, kitchenettes, terrace, hot tub and braai area.",
      },
      { property: "og:title", content: "Gallery | House Of Nyibiba" },
      {
        property: "og:description",
        content: "See the rooms, terrace, hot tub and braai area at House Of Nyibiba.",
      },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: Gallery,
});

const images = rooms.flatMap((room) => room.photos);
const galleryHero = images[0]?.src ?? "";

function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => ((i ?? 0) + 1) % images.length);
      if (e.key === "ArrowLeft") setActive((i) => ((i ?? 0) - 1 + images.length) % images.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="A look inside House Of Nyibiba"
        lead="Rooms, bathrooms, kitchenettes and the outdoor spaces you'll share with fellow guests."
        image={galleryHero}
      />

      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img, i) => (
            <button
              key={img.alt}
              type="button"
              onClick={() => setActive(i)}
              className="group relative aspect-4/3 overflow-hidden rounded-lg border border-border shadow-soft"
              aria-label={`View larger: ${img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-ink/0 transition-colors group-hover:bg-ink/25" />
            </button>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          Every photograph shows the actual rooms, bathrooms, kitchenettes and grounds at House Of
          Nyibiba.
        </p>
      </Section>

      {active !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-100 flex items-center justify-center bg-ink/92 p-4"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setActive(null)}
            className="absolute right-5 top-5 text-3xl text-primary-foreground"
          >
            ×
          </button>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              setActive((i) => ((i ?? 0) - 1 + images.length) % images.length);
            }}
            className="absolute left-3 text-4xl text-primary-foreground/80 hover:text-primary-foreground sm:left-8"
          >
            ‹
          </button>
          <figure onClick={(e) => e.stopPropagation()} className="max-h-full max-w-5xl">
            {(() => {
              const img = images[active];
              if (!img) return null;
              return (
                <>
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="max-h-[78vh] w-full rounded-lg object-contain"
                  />
                  <figcaption className="mt-4 text-center text-sm text-primary-foreground/75">
                    {img.alt}
                  </figcaption>
                </>
              );
            })()}
          </figure>
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              setActive((i) => ((i ?? 0) + 1) % images.length);
            }}
            className="absolute right-3 text-4xl text-primary-foreground/80 hover:text-primary-foreground sm:right-8"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
