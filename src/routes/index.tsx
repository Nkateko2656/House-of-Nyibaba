import { createFileRoute, Link } from "@tanstack/react-router";
import heroCoverAsset from "@/assets/hero-cover.jpeg.asset.json";
import patioUnitAsset from "@/assets/patio-unit.jpg.asset.json";

const heroCover = heroCoverAsset.url;
const heroCoverAlt = patioUnitAsset.url;
import ctaBackgroundAsset from "@/assets/cta-door-number-1.jpeg.asset.json";
import { Section } from "@/components/site/Section";
import { rooms } from "@/lib/rooms";
import { amenities, site } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Guest House in Vosloorus | House Of Nyibiba, Boksburg" },
      {
        name: "description",
        content:
          "House Of Nyibiba is a boutique guest house in Vosloorus, Boksburg. Air-conditioned rooms, kitchenettes, hot tub, braai, free WiFi and free secure parking near O.R. Tambo.",
      },
      { property: "og:title", content: "Guest House in Vosloorus | House Of Nyibiba, Boksburg" },
      {
        property: "og:description",
        content:
          "Warm, secure boutique accommodation in Boksburg — rated 4.6/5 by guests. Check availability today.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const highlights = [
  { label: "Guest rating", value: `${site.rating}/5`, note: `${site.reviewCount} Google reviews` },
  { label: "Airport", value: "±27 km", note: "O.R. Tambo International" },
  { label: "WiFi", value: "97 Mbps", note: "Free for all guests" },
  { label: "Security", value: "Full day", note: "On-site, every day" },
];

function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img
          src={heroCover}
          alt="Guest room at House Of Nyibiba opening onto a private patio with outdoor seating"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full animate-cover-a object-cover"
        />
        <img
          src={heroCoverAlt}
          alt="Courtyard seating outside the self-catering units at House Of Nyibiba"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full animate-cover-b object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/55 to-ink/85" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-center px-5 py-24 lg:px-8">
          <div className="max-w-3xl animate-rise">
            <p className="eyebrow text-accent">Vosloorus · Boksburg · South Africa</p>
            <div className="rule mt-5" />
            <h1 className="mt-6 text-4xl leading-[1.08] text-primary-foreground sm:text-6xl lg:text-7xl">
              A quiet, warm retreat in the heart of Vosloorus
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/85 sm:text-lg">
              House Of Nyibiba is a boutique guest house offering air-conditioned rooms with private
              bathrooms and kitchenettes, a hot tub, an outdoor fireplace and full-day security —
              minutes from Boksburg and a short drive from O.R. Tambo International Airport.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/booking" className="btn-base btn-brass">
                Check Availability
              </Link>
              <a href={site.phoneHref} className="btn-base btn-outline text-primary-foreground">
                Call {site.phoneDisplay}
              </a>
            </div>
          </div>

          <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-primary-foreground/20 pt-8 lg:grid-cols-4">
            {highlights.map((h) => (
              <div key={h.label}>
                <dt className="eyebrow text-primary-foreground/60">{h.label}</dt>
                <dd className="mt-2 font-display text-3xl text-primary-foreground">{h.value}</dd>
                <dd className="mt-1 text-xs text-primary-foreground/60">{h.note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Section
        eyebrow="Welcome"
        title="Boutique comfort, genuine Vosloorus hospitality"
        lead="Every room is your own private space — climate controlled, en-suite, with a kitchenette and your own balcony or terrace. Outside, a hot tub, fireplace and braai area make the evenings easy."
      >
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {rooms.map((room) => (
            <Link
              key={room.slug}
              to="/rooms/$roomId"
              params={{ roomId: room.slug }}
              className="group overflow-hidden rounded-lg border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="aspect-4/3 overflow-hidden">
                <img
                  src={room.photos[0]!.src}
                  alt={room.photos[0]!.alt}
                  loading="lazy"
                  width={1600}
                  height={1200}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl text-foreground">{room.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{room.tagline}</p>
                <div className="mt-3 flex items-baseline justify-between">
                  <span className="text-sm font-semibold text-foreground">
                    R{room.priceRoomOnly} <span className="font-normal text-muted-foreground">/ night</span>
                  </span>
                  <span className="eyebrow inline-block text-primary">View room →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <div className="bg-sand">
        <Section eyebrow="Amenities" title="Everything included in your stay" center>
          <ul className="mx-auto mt-12 grid max-w-5xl gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {amenities.map((a) => (
              <li key={a.title} className="flex items-start gap-3 border-b border-border/70 pb-4">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
                <span className="text-sm text-foreground">{a.title}</span>
              </li>
            ))}
          </ul>
          <div className="mt-12 text-center">
            <Link to="/amenities" className="btn-base btn-primary">
              See all amenities
            </Link>
          </div>
        </Section>
      </div>

      <Section className="!py-20">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={ctaBackgroundAsset.url}
            alt="Room number one mounted beside the door of a guest suite at House Of Nyibiba"
            loading="lazy"
            width={1600}
            height={1200}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-ink/70" />
          <div className="relative px-6 py-16 text-center sm:px-12 sm:py-24">
            <p className="eyebrow text-accent">Ready when you are</p>
            <h2 className="mx-auto mt-5 max-w-2xl text-3xl text-primary-foreground sm:text-4xl">
              Book your stay at House Of Nyibiba
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-primary-foreground/80">
              Send us your dates and we'll confirm availability and rates directly with you.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link to="/booking" className="btn-base btn-brass">
                Book Your Stay
              </Link>
              <a href={site.phoneHref} className="btn-base btn-outline text-primary-foreground">
                {site.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
