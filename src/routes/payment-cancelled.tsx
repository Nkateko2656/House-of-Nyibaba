import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { site } from "@/lib/site";

export const Route = createFileRoute("/payment-cancelled")({
  head: () => ({
    meta: [
      { title: "Payment Not Completed | House Of Nyibiba, Boksburg" },
      {
        name: "description",
        content:
          "Your payment for House Of Nyibiba guest house was not completed. You can try again or call us to book directly.",
      },
      { property: "og:title", content: "Payment Not Completed | House Of Nyibiba" },
      {
        property: "og:description",
        content: "Your payment was not completed — you can try again any time.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PaymentCancelled,
});

function PaymentCancelled() {
  return (
    <Section>
      <div className="mx-auto max-w-xl rounded-lg border border-border bg-card p-8 text-center shadow-soft">
        <p className="eyebrow">Payment not completed</p>
        <h1 className="mt-3 font-display text-4xl text-foreground">No payment was taken</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Your card has not been charged. You can start the booking again, or call us on{" "}
          {site.phoneDisplay} and we'll help you book.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link to="/booking" className="btn-base btn-primary">
            Try again
          </Link>
          <a href={site.phoneHref} className="btn-base btn-outline text-foreground">
            Call {site.phoneDisplay}
          </a>
        </div>
      </div>
    </Section>
  );
}
