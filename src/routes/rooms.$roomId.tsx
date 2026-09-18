import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ArrowLeft, BedDouble, ChevronLeft, ChevronRight, Expand, Users } from "lucide-react";
import { Section } from "@/components/site/Section";
import { PhotoLightbox } from "@/components/site/PhotoLightbox";
import { BookingForm } from "@/components/site/BookingForm";
import { getRoom, rooms } from "@/lib/rooms";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/rooms/$roomId")({
  loader: ({ params }) => {
    const room = getRoom(params.roomId);
    if (!room) throw notFound();
    return room;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${loaderData?.name ?? "Room"} | House Of Nyibiba, Boksburg`,
      },
      {
        name: "description",
        content:
          loaderData?.description ??
          "Rooms at House Of Nyibiba guest house in Vosloorus, Boksburg.",
      },
      { property: "og:title", content: `${loaderData?.name ?? "Room"} — House Of Nyibiba` },
      { property: "og:description", content: loaderData?.description ?? "" },
      { property: "og:url", content: `/rooms/${loaderData?.slug ?? ""}` },
    ],
    links: [{ rel: "canonical", href: `/rooms/${loaderData?.slug ?? ""}` }],
  }),
  component: RoomDetail,
  notFoundComponent: RoomNotFound,
});

function RoomDetail() {
  const room = Route.useLoaderData();
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const photo = room.photos[active] ?? room.photos[0]!;
  const count = room.photos.length;
  const step = (dir: number) => setActive((i) => (i + dir + count) % count);
  const touchX = useRef<number | null>(null);

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
        <Link
          to="/rooms"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          All rooms
        </Link>

        <div className="mt-6">
          <p className="eyebrow">{room.tagline}</p>
          <h1 className="mt-2 font-display text-4xl text-foreground sm:text-5xl">{room.name}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <BedDouble className="h-4 w-4 text-brass" /> {room.bed}
            </span>
            <span className="inline-flex items-center gap-2">
              <Users className="h-4 w-4 text-brass" /> {room.sleeps}
            </span>
          </div>
        </div>

        {/* Gallery */}
        <div className="mt-8">
          <figure
            className="group relative overflow-hidden rounded-lg border border-border bg-card shadow-soft"
            onTouchStart={(e) => {
              touchX.current = e.touches[0]?.clientX ?? null;
            }}
            onTouchEnd={(e) => {
              const start = touchX.current;
              const end = e.changedTouches[0]?.clientX ?? null;
              if (start !== null && end !== null && Math.abs(end - start) > 45) {
                step(end < start ? 1 : -1);
              }
              touchX.current = null;
            }}
          >
            <button
              type="button"
              onClick={() => setLightbox(active)}
              aria-label={`Open ${room.name} photos full screen`}
              className="block w-full"
            >
              <img
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                className="aspect-video w-full cursor-zoom-in object-cover"
              />
            </button>
            <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-foreground/60 px-3 py-1.5 text-xs text-background">
              <Expand className="h-3.5 w-3.5" /> {active + 1} / {count}
            </span>
            <button
              type="button"
              aria-label="Previous photo"
              onClick={() => step(-1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground shadow-soft transition-colors hover:bg-background"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={() => step(1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground shadow-soft transition-colors hover:bg-background"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </figure>
          <div className="mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2">
            {room.photos.map((p, i) => (
              <button
                key={p.src}
                type="button"
                onClick={() => setActive(i)}
                onDoubleClick={() => setLightbox(i)}
                aria-label={`View photo ${i + 1} of ${room.name}`}
                className={cn(
                  "w-28 shrink-0 snap-start overflow-hidden rounded-md border transition-all sm:w-36",
                  i === active
                    ? "border-brass ring-2 ring-brass/40"
                    : "border-border opacity-70 hover:opacity-100",
                )}
              >
                <img src={p.src} alt={p.alt} loading="lazy" className="aspect-4/3 w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <PhotoLightbox
        photos={room.photos}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onIndexChange={(i) => {
          setLightbox(i);
          setActive(i);
        }}
      />

      <Section title="About this room">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">{room.description}</p>
            <p className="eyebrow mt-10">What {room.name} includes</p>
            <ul className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {room.features.map((item) => (
                <li key={item} className="flex items-start gap-3 border-b border-border/70 pb-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
                  <span className="text-sm text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="h-fit rounded-lg border border-brass/40 bg-sand p-6 sm:p-8 lg:sticky lg:top-24">
            <p className="eyebrow">Nightly rates</p>
            <dl className="mt-5 space-y-5">
              <div className="flex items-baseline justify-between gap-4 border-b border-border pb-4">
                <dt className="text-foreground">Room only</dt>
                <dd className="font-display text-3xl text-foreground">R{room.priceRoomOnly}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-foreground">With breakfast</dt>
                <dd className="font-display text-3xl text-foreground">R{room.priceWithBreakfast}</dd>
              </div>
            </dl>
            <p className="mt-6 text-xs text-muted-foreground">
              Per night for the room. Long-stay rates are confirmed on enquiry.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a href="#book" className="btn-base btn-primary justify-center">
                Check Availability
              </a>
              <a href={site.phoneHref} className="btn-base btn-outline justify-center text-foreground">
                Call {site.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </Section>

      <div id="book" className="scroll-mt-24 bg-sand">
        <Section eyebrow="Booking" title={`Book ${room.name}`}>
          <div className="mt-10">
            <BookingForm room={room} />
          </div>
        </Section>
      </div>


      <div className="bg-sand">
        <Section eyebrow="Keep looking" title="Our other rooms">
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {rooms
              .filter((r) => r.slug !== room.slug)
              .map((r) => (
                <Link
                  key={r.slug}
                  to="/rooms/$roomId"
                  params={{ roomId: r.slug }}
                  className="group flex items-center gap-5 overflow-hidden rounded-lg border border-border bg-card p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lifted"
                >
                  <img
                    src={r.photos[0]!.src}
                    alt={r.photos[0]!.alt}
                    loading="lazy"
                    className="h-24 w-32 shrink-0 rounded-md object-cover"
                  />
                  <div>
                    <p className="font-display text-xl text-foreground group-hover:text-brass">
                      {r.name}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">{r.tagline}</p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      from R{r.priceRoomOnly} / night
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </Section>
      </div>
    </>
  );
}

function RoomNotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl text-foreground">Room not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          That room doesn't exist — browse our three rooms instead.
        </p>
        <Link to="/rooms" className="btn-base btn-primary mt-6 inline-flex">
          View all rooms
        </Link>
      </div>
    </div>
  );
}
