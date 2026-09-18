import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, Section } from "@/components/site/Section";
import kitchenetteAsset from "@/assets/mihla-kitchenette-lit.jpeg.asset.json";
const kitchenette = kitchenetteAsset.url;
import { site } from "@/lib/site";

const faqs = [
  {
    q: "Where is House Of Nyibiba located?",
    a: `We're at ${site.address}, in Vosloorus Ext 6, Boksburg.`,
  },
  {
    q: "How far is the guest house from O.R. Tambo International Airport?",
    a: `${site.airportDistance}. A paid shuttle service can be arranged on request.`,
  },
  { q: "Is parking available?", a: "Yes — free private parking is available on site." },
  {
    q: "Is there WiFi?",
    a: "Yes, free WiFi with speeds of up to 97 Mbps is available for guests.",
  },
  {
    q: "What is included in the rooms?",
    a: "Air conditioning, a private bathroom, a kitchenette, a private balcony or terrace, bathrobes and daily housekeeping.",
  },
  {
    q: "Are there outdoor facilities?",
    a: "Yes — a terrace with outdoor seating, a hot tub, an outdoor fireplace and BBQ (braai) facilities.",
  },
  { q: "Is the property secure?", a: "Yes, full-day security is on site." },
  {
    q: "What are the check-in and check-out times?",
    a: `${site.checkIn}. ${site.checkOut}. Private check-in and check-out is offered. Please confirm times with us when booking.`,
  },
  {
    q: "How do I book and what are the rates?",
    a: `Rates and room availability are confirmed directly by the guest house. Send an enquiry through the booking form or call ${site.phoneDisplay}.`,
  },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ | House Of Nyibiba Guest House, Vosloorus Boksburg" },
      {
        name: "description",
        content:
          "Answers about parking, WiFi, check-in, amenities, airport distance and booking at House Of Nyibiba guest house in Vosloorus, Boksburg.",
      },
      { property: "og:title", content: "Frequently Asked Questions | House Of Nyibiba" },
      {
        property: "og:description",
        content: "Parking, WiFi, check-in, amenities and booking questions answered.",
      },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Faq,
});

function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Questions guests ask us"
        lead="Everything from parking and WiFi to airport transfers and check-in."
        image={kitchenette}
      />

      <Section>
        <div className="mx-auto max-w-3xl divide-y divide-border border-y border-border">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="font-display text-lg text-foreground sm:text-xl">{f.q}</span>
                  <span className="shrink-0 text-2xl text-brass">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && (
                  <p className="animate-rise pb-6 text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">Still have a question?</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="btn-base btn-primary">
              Contact Us
            </Link>
            <a href={site.phoneHref} className="btn-base btn-outline text-foreground">
              Call {site.phoneDisplay}
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
