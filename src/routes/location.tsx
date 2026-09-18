import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import heroExteriorAsset from "@/assets/bright-room-courtyard-entry.jpeg.asset.json";
const heroExterior = heroExteriorAsset.url;
import { mapsDirectionsUrl, mapsEmbedUrl, site } from "@/lib/site";

export const Route = createFileRoute("/location")({
  head: () => ({
    meta: [
      { title: "Location | Accommodation in Boksburg near O.R. Tambo" },
      {
        name: "description",
        content:
          "House Of Nyibiba is at 21764/160 Kenyo St, Vosloorus Ext 6, Boksburg, 1475 — approximately 17 miles from O.R. Tambo International Airport.",
      },
      { property: "og:title", content: "Location | House Of Nyibiba, Vosloorus Boksburg" },
      {
        property: "og:description",
        content:
          "Find us in Vosloorus Ext 6, Boksburg — a short drive from O.R. Tambo International Airport.",
      },
      { property: "og:url", content: "/location" },
    ],
    links: [{ rel: "canonical", href: "/location" }],
  }),
  component: Location,
});

function Location() {
  return (
    <>
      <PageHero
        eyebrow="Location"
        title="Vosloorus Ext 6, Boksburg"
        lead={site.airportDistance}
        image={heroExterior}
      />

      <Section eyebrow="Find us" title="Getting here">
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-6">
            <div>
              <p className="eyebrow">Address</p>
              <p className="mt-2 text-sm text-foreground">{site.address}</p>
            </div>
            <div>
              <p className="eyebrow">Phone</p>
              <a href={site.phoneHref} className="mt-2 block text-sm text-foreground underline-offset-4 hover:underline">
                {site.phoneDisplay}
              </a>
            </div>
            <div>
              <p className="eyebrow">Airport</p>
              <p className="mt-2 text-sm text-muted-foreground">{site.airportDistance}</p>
            </div>
            <div>
              <p className="eyebrow">Transport</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Free private parking on site. A paid shuttle service can be arranged on request.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-base btn-primary"
              >
                Get Directions
              </a>
              <a href={site.phoneHref} className="btn-base btn-outline text-foreground">
                Call Us
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-border shadow-soft">
            <iframe
              title="Map showing House Of Nyibiba in Vosloorus, Boksburg"
              src={mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-96 w-full border-0 lg:h-full"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
