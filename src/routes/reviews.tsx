import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import roomSuiteAsset from "@/assets/mihla-bed-front.jpeg.asset.json";
const roomSuite = roomSuiteAsset.url;
import { site } from "@/lib/site";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Guest Reviews | House Of Nyibiba, Vosloorus Boksburg" },
      {
        name: "description",
        content:
          "House Of Nyibiba guest house in Vosloorus, Boksburg is rated 4.6 out of 5 from 17 Google reviews.",
      },
      { property: "og:title", content: "Guest Reviews | House Of Nyibiba" },
      {
        property: "og:description",
        content: "Rated 4.6/5 from 17 Google reviews by guests staying in Vosloorus, Boksburg.",
      },
      { property: "og:url", content: "/reviews" },
    ],
    links: [{ rel: "canonical", href: "/reviews" }],
  }),
  component: Reviews,
});

function Reviews() {
  return (
    <>
      <PageHero
        eyebrow="Reviews"
        title={`Rated ${site.rating} out of 5 by our guests`}
        lead={`Based on ${site.reviewCount} Google reviews.`}
        image={roomSuite}
      />

      <Section center eyebrow="What guests say" title="Guest feedback">
        <div className="mx-auto mt-12 max-w-3xl rounded-lg border border-border bg-card p-8 text-center shadow-soft sm:p-12">
          <p className="font-display text-6xl text-foreground">{site.rating}</p>
          <p className="mt-2 text-lg text-accent" aria-label={`${site.rating} out of 5 stars`}>
            ★★★★★
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            {site.reviewCount} Google reviews
          </p>
          <div className="rule mx-auto mt-8" />
          <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
            Individual review quotes aren't published here yet. Once you share the review text you'd
            like to feature — or a link to your Google Business Profile — we'll display it in this
            space.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link to="/booking" className="btn-base btn-primary">
              Book Your Stay
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
