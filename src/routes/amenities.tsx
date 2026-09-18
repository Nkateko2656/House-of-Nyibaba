import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import terraceAsset from "@/assets/mihla-hottub-patio.jpeg.asset.json";
const terrace = terraceAsset.url;
import braaiAsset from "@/assets/dark-room-courtyard-seating.jpg.asset.json";
const braai = braaiAsset.url;
import { amenities, site } from "@/lib/site";

export const Route = createFileRoute("/amenities")({
  head: () => ({
    meta: [
      { title: "Amenities | House Of Nyibiba Guest House, Vosloorus" },
      {
        name: "description",
        content:
          "Hot tub, outdoor fireplace, braai facilities, terrace seating, free WiFi up to 97 Mbps, free private parking, daily housekeeping and full-day security in Boksburg.",
      },
      { property: "og:title", content: "Amenities at House Of Nyibiba" },
      {
        property: "og:description",
        content:
          "Hot tub, outdoor fireplace, braai facilities, free WiFi, free parking and full-day security.",
      },
      { property: "og:url", content: "/amenities" },
    ],
    links: [{ rel: "canonical", href: "/amenities" }],
  }),
  component: Amenities,
});

function Amenities() {
  return (
    <>
      <PageHero
        eyebrow="Amenities"
        title="Comfort indoors, warmth outdoors"
        lead="From the hot tub and outdoor fireplace to daily housekeeping and full-day security."
        image={terrace}
      />

      <Section eyebrow="Included" title="Everything on offer">
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {amenities.map((a) => (
            <div key={a.title} className="rounded-lg border border-border bg-card p-6 shadow-soft">
              <div className="rule" />
              <h3 className="mt-4 text-lg text-foreground">{a.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{a.note}</p>
            </div>
          ))}
        </div>
      </Section>

      <div className="bg-sand">
        <Section eyebrow="Outdoors" title="Evenings by the fire">
          <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
            <img
              src={braai}
              alt="Courtyard braai and outdoor dining area at House Of Nyibiba"
              loading="lazy"
              width={1600}
              height={1200}
              className="rounded-lg shadow-lift"
            />
            <div className="space-y-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
              <p>
                The terrace and outdoor seating area is yours to use — light the outdoor fireplace,
                fire up the braai, or soak in the hot tub after a long day of travel or meetings.
              </p>
              <p>
                Getting around is simple: free private parking on site, and a paid shuttle service
                available on request. {site.airportDistance}.
              </p>
              <Link to="/booking" className="btn-base btn-primary">
                Book Your Stay
              </Link>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}
