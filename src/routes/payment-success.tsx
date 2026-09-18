import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { site } from "@/lib/site";

export const Route = createFileRoute("/payment-success")({
  head: () => ({
    meta: [
      { title: "Payment Received | House Of Nyibiba, Boksburg" },
      {
        name: "description",
        content:
          "Your payment for House Of Nyibiba guest house has gone through. We'll confirm your arrival details shortly.",
      },
      { property: "og:title", content: "Payment Received | House Of Nyibiba" },
      {
        property: "og:description",
        content: "Thank you — your booking payment was successful.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PaymentSuccess,
});

function PaymentSuccess() {
  return (
    <Section>
      <div className="mx-auto max-w-xl rounded-lg border border-border bg-card p-8 text-center shadow-soft">
        <p className="eyebrow">Payment received</p>
        <h1 className="mt-3 font-display text-4xl text-foreground">Thank you — you're booked</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Your payment went through successfully. We'll be in touch to confirm your arrival time
          and check-in details. If you need anything sooner, call us on {site.phoneDisplay}.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-base btn-primary">
            Back to home
          </Link>
          <a href={site.phoneHref} className="btn-base btn-outline text-foreground">
            Call {site.phoneDisplay}
          </a>
        </div>
      </div>
    </Section>
  );
}
