import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
        <Link to="/" className="flex flex-col leading-none">
          <span className="font-display text-xl tracking-tight text-foreground sm:text-2xl">
            House Of Nyibiba
          </span>
          <span className="eyebrow mt-1">Vosloorus · Boksburg</span>
        </Link>

        <nav className="hidden items-center gap-6 xl:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-sm text-foreground font-semibold" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={site.phoneHref} className="btn-base btn-outline text-foreground">
            {site.phoneDisplay}
          </a>
          <Link to="/booking" className="btn-base btn-primary">
            Book Your Stay
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded border border-border xl:hidden"
        >
          <span className="h-px w-5 bg-foreground" />
          <span className="h-px w-5 bg-foreground" />
          <span className="h-px w-5 bg-foreground" />
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-card px-5 pb-6 pt-2 xl:hidden">
          <nav className="flex flex-col">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="border-b border-border/60 py-3 text-sm text-muted-foreground"
                activeProps={{ className: "border-b border-border/60 py-3 text-sm text-foreground font-semibold" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-5 flex flex-col gap-3">
            <a href={site.phoneHref} className="btn-base btn-outline text-foreground">
              Call {site.phoneDisplay}
            </a>
            <Link to="/booking" className="btn-base btn-primary">
              Check Availability
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
