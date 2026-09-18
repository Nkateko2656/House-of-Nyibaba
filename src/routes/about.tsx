import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import heroExteriorAsset from "@/assets/bright-room-courtyard-wide.jpeg.asset.json";
const heroExterior = heroExteriorAsset.url;
import roomSuiteAsset from "@/assets/mihla-bedroom-wide-2.jpeg.asset.json";
const roomSuite = roomSuiteAsset.url;
import { site } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | House Of Nyibiba Guest House, Boksburg" },
      {
        name: "description",
        content:
          "Learn about House Of Nyibiba, a boutique guest house in Vosloorus Ext 6, Boksburg — private, secure accommodation rated 4.6/5 by guests.",
      },
      { property: "og:title", content: "About House Of Nyibiba Guest House" },
      {
        property: "og:description",
        content:
          "Private, secure boutique accommodation in Vosloorus, Boksburg, rated 4.6/5 by guests.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Our house, your home in Vosloorus"
        lead="Quiet, private and secure accommodation in Vosloorus Ext 6, Boksburg."
        image={heroExterior}
      />

      <Section
        eyebrow="Who we are"
        title="A boutique guest house built around privacy and comfort"
        lead={`House Of Nyibiba welcomes travellers to Vosloorus Ext 6 in Boksburg. Guests have rated us ${site.rating} out of 5 across ${site.reviewCount} Google reviews.`}
      >
        <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <p>
              Each room is self-contained: air conditioning, a private bathroom, a kitchenette and
              your own balcony or terrace, with bathrobes and daily housekeeping. Private check-in
              and check-out means you arrive and leave on your own terms.
            </p>
            <p>
              Outside, the terrace, hot tub, outdoor fireplace and braai facilities give you space
              to relax. Free private parking and full-day security are on site, and free WiFi of up
              to 97 Mbps runs throughout the house.
            </p>
            <p>
              We're {site.airportDistance.toLowerCase()}, and a paid shuttle service can be arranged
              on request.
            </p>
            <p className="rounded border border-border bg-muted p-4 text-sm">
              <strong className="text-foreground">Note for the owner:</strong> this section is a
              placeholder for your own story — the year you opened, who hosts guests, and what makes
              the house special. Send us the wording and we'll drop it in.
            </p>
          </div>
          <img
            src={roomSuite}
            alt="Guest room interior with warm wood and crisp linen"
            loading="lazy"
            width={1600}
            height={1200}
            className="rounded-lg shadow-lift"
          />
        </div>
      </Section>

      <div className="bg-sand">
        <Section eyebrow="Good to know" title="Practical details" center>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
            {[
              { k: "Address", v: site.address },
              { k: "Phone", v: site.phoneDisplay },
              { k: "Check-in", v: site.checkIn },
              { k: "Check-out", v: site.checkOut },
              { k: "Parking", v: "Free private parking on site" },
              { k: "Security", v: "Full-day security" },
            ].map((row) => (
              <div key={row.k} className="rounded-lg border border-border bg-card p-6">
                <p className="eyebrow">{row.k}</p>
                <p className="mt-2 text-sm text-foreground">{row.v}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/booking" className="btn-base btn-primary">
              Check Availability
            </Link>
          </div>
        </Section>
      </div>
    </>
  );
}
