import { locations } from "../../data/locations";
import { CtaLink } from "../CtaLink";
import { SectionHeading } from "../ui";

function LocationIcon({ path }: { path: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4 shrink-0 text-brand"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}

export function Locations() {
  return (
    <section id="centros" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <SectionHeading
        eyebrow="Nuestros centros"
        title="Dos centros en Arahal y Alcalá de Guadaíra"
        description="Atendemos en Arahal y Alcalá de Guadaíra en espacios adaptados, accesibles y diseñados para favorecer el bienestar."
      />

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {locations.map((loc) => (
          <div
            key={loc.city}
            className="rounded-[28px] border border-white/70 bg-white/90 p-7 shadow-[0_18px_50px_-28px_rgba(44,74,67,0.35)] backdrop-blur sm:p-8"
          >
            <div className="mb-1 inline-flex rounded-full bg-tint px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              DEFINE {loc.city}
            </div>

            <h3 className="mt-4 text-2xl font-semibold text-ink">{loc.city}</h3>

            <ul className="mt-5 space-y-3.5">
              <li className="flex items-start gap-2.5 text-sm leading-6 text-muted">
                <LocationIcon path="M10 2C7.24 2 5 4.24 5 7c0 4.25 5 11 5 11s5-6.75 5-11c0-2.76-2.24-5-5-5Zm0 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
                <span>
                  <strong className="font-semibold text-ink-soft">Dirección:</strong> {loc.address}
                </span>
              </li>
              <li className="flex items-start gap-2.5 text-sm leading-6 text-muted">
                <LocationIcon path="M2 3.5A1.5 1.5 0 0 1 3.5 2h2.12a1.5 1.5 0 0 1 1.5 1.29l.46 2.88a1.5 1.5 0 0 1-.34 1.22l-.88.88a12 12 0 0 0 4.37 4.37l.88-.88a1.5 1.5 0 0 1 1.22-.34l2.88.46A1.5 1.5 0 0 1 18 13.38v2.12A1.5 1.5 0 0 1 16.5 17C8.5 17 3 11.5 3 3.5" />
                <span>
                  <strong className="font-semibold text-ink-soft">Teléfono:</strong>{" "}
                  <CtaLink href={loc.phoneHref} origin="centros" className="transition hover:text-brand" ariaLabel={`Llamar al centro DEFINE de ${loc.city}`}>
                    {loc.phone}
                  </CtaLink>
                </span>
              </li>
              <li className="flex items-start gap-2.5 text-sm leading-6 text-muted">
                <LocationIcon path="M10 2a8 8 0 1 0 0 16A8 8 0 0 0 10 2Zm.75 4.5v4l3 1.5-.75 1.3-3.5-1.8V6.5h1.25Z" />
                <span>
                  <strong className="font-semibold text-ink-soft">Horario:</strong> {loc.hours}
                </span>
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <CtaLink
                href={loc.phoneHref}
                origin="centros"
                ariaLabel={`Llamar al centro DEFINE de ${loc.city}`}
                className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white px-4 py-2 text-sm font-semibold text-ink-soft transition hover:border-control-hover hover:bg-tint/60"
              >
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M1.33 2.33A1 1 0 0 1 2.25 1.33h1.42a1 1 0 0 1 1 .86l.3 1.92a1 1 0 0 1-.22.82l-.59.59a8 8 0 0 0 2.91 2.91l.59-.59a1 1 0 0 1 .82-.22l1.92.3a1 1 0 0 1 .86 1v1.42a1 1 0 0 1-1 1C4.33 11.33 1.33 8.33 1.33 4.33" />
                </svg>
                Llamar
              </CtaLink>
              <CtaLink
                href={loc.whatsappHref}
                origin="centros"
                ariaLabel={`WhatsApp del centro DEFINE de ${loc.city}`}
                className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white px-4 py-2 text-sm font-semibold text-ink-soft transition hover:border-control-hover hover:bg-tint/60"
              >
                WhatsApp
              </CtaLink>
              <CtaLink
                href={loc.mapHref}
                origin="centros"
                ariaLabel={`Ver en Google Maps el centro DEFINE de ${loc.city}`}
                className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white px-4 py-2 text-sm font-semibold text-ink-soft transition hover:border-control-hover hover:bg-tint/60"
              >
                Ver en Google Maps
              </CtaLink>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
