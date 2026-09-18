import { Link } from "@tanstack/react-router";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-sand">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="font-display text-2xl text-foreground">House Of Nyibiba</p>
          <p className="eyebrow mt-2">Guest House · Vosloorus, Boksburg</p>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            A warm, secure and private stay in Vosloorus Ext 6 — a short drive from O.R. Tambo
            International Airport and the heart of Boksburg.
          </p>
        </div>

        <div>
          <p className="eyebrow">Explore</p>
          <ul className="mt-5 grid grid-cols-2 gap-y-2">
            {[...nav, { to: "/booking", label: "Booking" }].map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow">Get in touch</p>
          <address className="mt-5 space-y-3 text-sm not-italic text-muted-foreground">
            <p>{site.address}</p>
            <p>
              <a href={site.phoneHref} className="text-foreground underline-offset-4 hover:underline">
                {site.phoneDisplay}
              </a>
            </p>
          </address>
          <a href={site.phoneHref} className="btn-base btn-brass mt-6">
            Call to Book
          </a>
        </div>
      </div>

      <div className="border-t border-border/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} House Of Nyibiba. All rights reserved.</p>
          <p>
            Rated {site.rating}/5 from {site.reviewCount} Google reviews
          </p>
        </div>
      </div>
    </footer>
  );
}
