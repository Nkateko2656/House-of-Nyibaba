import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero, Section } from "@/components/site/Section";
import { rooms } from "@/lib/rooms";
import { site } from "@/lib/site";
import brightRoomBedPatio2 from "@/assets/bright-room-bed-patio-2.jpeg.asset.json";

export const Route = createFileRoute("/rooms/")({
  head: () => ({
    meta: [
      { title: "Rooms | Accommodation in Boksburg — House Of Nyibiba" },
      {
        name: "description",
        content:
          "Choose your room at House Of Nyibiba guest house in Vosloorus, Boksburg — The Bright Room, The Dark Room and The Mihla Room. From R750 per night, air-conditioned with private bathroom and kitchenette.",
      },
      { property: "og:title", content: "Rooms at House Of Nyibiba, Boksburg" },
      {
        property: "og:description",
        content:
          "The Bright Room, The Dark Room and The Mihla Room — from R750 per night, each air-conditioned with en-suite bathroom and kitchenette.",
      },
      { property: "og:url", content: "/rooms" },
    ],
    links: [{ rel: "canonical", href: "/rooms" }],
  }),
  component: Rooms,
});

function Rooms() {
  return (
    <>
      <PageHero
        eyebrow="Rooms"
        title="Three rooms, each with its own mood"
        lead="Every room is air-conditioned with a private bathroom, kitchenette and daily housekeeping. Choose a room to see more photos and everything it includes."
        image={brightRoomBedPatio2.url}
      />

      <Section eyebrow="Our rooms" title="Find the room that fits your stay">
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <Link
              key={room.slug}
              to="/rooms/$roomId"
              params={{ roomId: room.slug }}
              className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lifted"
            >
              <div className="relative overflow-hidden">
                <img
                  src={room.photos[0]!.src}
                  alt={room.photos[0]!.alt}
                  loading="lazy"
                  className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute bottom-3 left-3 rounded-full bg-background/85 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
                  from R{room.priceRoomOnly} / night
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="eyebrow">{room.tagline}</p>
                <h2 className="mt-2 font-display text-2xl text-foreground">{room.name}</h2>
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {room.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {room.highlights.map((h) => (
                    <span
                      key={h}
                      className="rounded-full border border-border bg-sand px-3 py-1 text-xs text-foreground"
                    >
                      {h}
                    </span>
                  ))}
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brass transition-colors group-hover:text-foreground">
                  View room & photos
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <div className="bg-sand">
        <Section center title="Not sure which room?">
          <p className="mx-auto max-w-xl text-center text-sm leading-relaxed text-muted-foreground">
            Send us your dates and number of guests and we'll match you to the right room —
            rates start at R750 per night room only, with each room's rates shown on its page.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link to="/booking" className="btn-base btn-primary">
              Check Availability
            </Link>
            <a href={site.phoneHref} className="btn-base btn-outline text-foreground">
              Call {site.phoneDisplay}
            </a>
          </div>
        </Section>
      </div>
    </>
  );
}
