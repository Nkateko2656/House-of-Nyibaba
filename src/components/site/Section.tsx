import type { ReactNode } from "react";

export function Section({
  eyebrow,
  title,
  lead,
  children,
  center = false,
  className = "",
}: {
  eyebrow?: string;
  title?: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  center?: boolean;
  className?: string;
}) {
  return (
    <section className={`mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:px-8 ${className}`}>
      {(eyebrow || title || lead) && (
        <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <div className={`rule mt-4 ${center ? "mx-auto" : ""}`} />
          {title && (
            <h2 className="mt-5 text-3xl leading-tight text-foreground sm:text-4xl">{title}</h2>
          )}
          {lead && <p className="mt-4 text-base leading-relaxed text-muted-foreground">{lead}</p>}
        </div>
      )}
      {children}
    </section>
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
  image,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  image: string;
}) {
  return (
    <div className="relative overflow-hidden">
      <img
        src={image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-ink/65" />
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:py-28 lg:px-8">
        <div className="max-w-2xl animate-rise">
          <p className="eyebrow text-accent">{eyebrow}</p>
          <div className="rule mt-4" />
          <h1 className="mt-5 text-4xl leading-tight text-primary-foreground sm:text-5xl">
            {title}
          </h1>
          {lead && (
            <p className="mt-5 text-base leading-relaxed text-primary-foreground/80">{lead}</p>
          )}
        </div>
      </div>
    </div>
  );
}
