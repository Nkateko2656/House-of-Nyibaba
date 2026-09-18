import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { BookingForm } from "@/components/site/BookingForm";
import bathroomAsset from "@/assets/mihla-room-double-vanity.jpeg.asset.json";
const bathroom = bathroomAsset.url;
import { mapsDirectionsUrl, mapsEmbedUrl, site } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | House Of Nyibiba Guest House, Boksburg" },
      {
        name: "description",
        content:
          "Call House Of Nyibiba on 068 671 4955 or send an enquiry. Guest house accommodation at 21764/160 Kenyo St, Vosloorus Ext 6, Boksburg.",
      },
      { property: "og:title", content: "Contact House Of Nyibiba" },
      {
        property: "og:description",
        content: "Call 068 671 4955 or send an enquiry for accommodation in Boksburg.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to us directly"
        lead="Call, WhatsApp or send an enquiry — we'll come back to you with availability."
        image={bathroom}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-8">
            <div>
              <p className="eyebrow">Phone</p>
              <a href={site.phoneHref} className="mt-2 block font-display text-3xl text-foreground">
                {site.phoneDisplay}
              </a>
              <a href={site.phoneHref} className="btn-base btn-brass mt-5">
                Tap to Call
              </a>
            </div>
            <div>
              <p className="eyebrow">Address</p>
              <p className="mt-2 text-sm text-foreground">{site.address}</p>
              <a
                href={mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow mt-3 inline-block text-primary"
              >
                Get directions →
              </a>
            </div>
            <div>
              <p className="eyebrow">Email</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {site.email || "Email address to be added — share it and we'll list it here."}
              </p>
            </div>
            <div className="overflow-hidden rounded-lg border border-border shadow-soft">
              <iframe
                title="Map showing House Of Nyibiba in Vosloorus, Boksburg"
                src={mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-72 w-full border-0"
              />
            </div>
          </div>

          <BookingForm />
        </div>
      </Section>
    </>
  );
}
