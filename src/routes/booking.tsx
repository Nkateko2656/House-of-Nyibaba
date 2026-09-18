import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { BookingForm } from "@/components/site/BookingForm";
import bookingHeroAsset from "@/assets/booking-door-number.jpeg.asset.json";
import { site } from "@/lib/site";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Book Your Stay | House Of Nyibiba, Vosloorus Boksburg" },
      {
        name: "description",
        content:
          "Check availability at House Of Nyibiba guest house in Vosloorus, Boksburg. Send your dates and we'll confirm rooms and rates directly.",
      },
      { property: "og:title", content: "Book Your Stay | House Of Nyibiba" },
      {
        property: "og:description",
        content: "Send your dates and we'll confirm availability and rates for your stay.",
      },
      { property: "og:url", content: "/booking" },
    ],
    links: [{ rel: "canonical", href: "/booking" }],
  }),
  component: Booking,
});

function Booking() {
  return (
    <>
      <PageHero
        eyebrow="Booking"
        title="Check availability & book your stay"
        lead="Send us your dates and we'll confirm the right room, the rate and your arrival details."
        image={bookingHeroAsset.url}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <BookingForm />

          <aside className="space-y-6">
            <div className="rounded-lg border border-border bg-sand p-6">
              <p className="eyebrow">Prefer to talk?</p>
              <a href={site.phoneHref} className="mt-2 block font-display text-3xl text-foreground">
                {site.phoneDisplay}
              </a>
              <a href={site.phoneHref} className="btn-base btn-brass mt-5">
                Tap to Call
              </a>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="eyebrow">Good to know</p>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>{site.checkIn}</li>
                <li>{site.checkOut}</li>
                <li>Private check-in and check-out available.</li>
                <li>Free private parking on site.</li>
                <li>Paid shuttle service on request.</li>
                <li>Full-day security.</li>
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="eyebrow">Where you'll stay</p>
              <p className="mt-3 text-sm text-muted-foreground">{site.address}</p>
              <p className="mt-3 text-sm text-muted-foreground">{site.airportDistance}</p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
