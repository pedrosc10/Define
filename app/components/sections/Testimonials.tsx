import { locations } from "../../data/locations";
import { testimonials } from "../../data/testimonials";
import { CtaLink } from "../CtaLink";
import { SectionHeading } from "../ui";

function cityOf(locationId: string) {
  return locations.find((location) => location.id === locationId)?.city ?? "";
}

function QuoteMark() {
  return (
    <svg viewBox="0 0 40 32" className="h-7 w-7 text-accent" fill="currentColor" aria-hidden="true">
      <path d="M0 32V19.2C0 8.533 6.4 2.133 19.2 0l2.4 3.2C15.467 4.8 11.733 7.467 10.133 12H16V32H0Zm24 0V19.2C24 8.533 30.4 2.133 43.2 0l2.4 3.2C39.467 4.8 35.733 7.467 34.133 12H40V32H24Z" />
    </svg>
  );
}

export function Testimonials() {
  return (
    <section id="testimonios" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <SectionHeading
        eyebrow="Lo que dicen las familias"
        title="Reseñas de quienes ya han pasado por DEFINE"
        description="Opiniones publicadas por las familias en nuestras fichas de Google de Arahal y Alcalá de Guadaíra."
      />

      <ul className="mt-10 grid gap-5 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <li
            key={testimonial.author + testimonial.quote}
            className="flex h-full flex-col rounded-[28px] border border-white/70 bg-white/90 p-7 shadow-[0_18px_50px_-28px_rgba(44,74,67,0.35)] backdrop-blur"
          >
            <QuoteMark />

            <blockquote className="mt-5 flex-1 font-serif text-lg leading-relaxed text-ink">
              {testimonial.quote}
            </blockquote>

            <footer className="mt-6 border-t border-divider pt-4 text-sm">
              <p className="font-semibold text-ink-soft">{testimonial.author}</p>
              <p className="mt-0.5 text-muted">Centro de {cityOf(testimonial.locationId)}</p>
            </footer>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        {locations.map((location) => (
          <CtaLink
            key={location.id}
            href={location.mapHref}
            origin="testimonios"
            ariaLabel={`Ver todas las reseñas en Google del centro DEFINE de ${location.city}`}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-line-strong bg-white px-5 py-2.5 text-sm font-semibold text-ink-soft transition hover:border-control-hover hover:text-brand sm:w-auto"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-brand" fill="currentColor" aria-hidden="true">
              <path d="M10 1.5l2.47 5.32 5.53.62-4.1 3.9 1.1 5.66L10 14.2l-5 2.8 1.1-5.66-4.1-3.9 5.53-.62L10 1.5Z" />
            </svg>
            Ver todas las reseñas en Google · {location.city}
          </CtaLink>
        ))}
      </div>
    </section>
  );
}
