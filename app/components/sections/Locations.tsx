import { SectionHeading } from "../ui";

const locations = [
  {
    city: "Arahal",
    address: "C/ Alondra, 38 - local B",
    phone: "622 67 12 19",
    phoneHref: "tel:+34622671219",
    whatsappHref: "https://wa.me/34622671219",
    hours: "Lunes a viernes · 9:00–13:00 h y 15:00–20:00 h",
    mapHref: "https://maps.google.com/?q=Calle+Alondra+38+Arahal",
  },
  {
    city: "Alcalá de Guadaíra",
    address: "C/ Bailén, 46",
    phone: "722 41 33 78",
    phoneHref: "tel:+34722413378",
    whatsappHref: "https://wa.me/34722413378",
    hours: "Lunes a viernes · 9:00–13:00 h y 15:00–20:00 h",
    mapHref: "https://maps.google.com/?q=Calle+Bailen+46+Alcala+de+Guadaira",
  },
];

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
        title="Dos centros para acompañarte más cerca"
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
                  <a href={loc.phoneHref} className="transition hover:text-brand" aria-label={`Llamar al centro DEFINE de ${loc.city}`}>
                    {loc.phone}
                  </a>
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
              <a
                href={loc.phoneHref}
                aria-label={`Llamar al centro DEFINE de ${loc.city}`}
                className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white px-4 py-2 text-sm font-semibold text-ink-soft transition hover:border-[#90aca4] hover:bg-[#f8fbfa]"
              >
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M1.33 2.33A1 1 0 0 1 2.25 1.33h1.42a1 1 0 0 1 1 .86l.3 1.92a1 1 0 0 1-.22.82l-.59.59a8 8 0 0 0 2.91 2.91l.59-.59a1 1 0 0 1 .82-.22l1.92.3a1 1 0 0 1 .86 1v1.42a1 1 0 0 1-1 1C4.33 11.33 1.33 8.33 1.33 4.33" />
                </svg>
                Llamar
              </a>
              <a
                href={loc.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`WhatsApp del centro DEFINE de ${loc.city}`}
                className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white px-4 py-2 text-sm font-semibold text-ink-soft transition hover:border-[#90aca4] hover:bg-[#f8fbfa]"
              >
                WhatsApp
              </a>
              <a
                href={loc.mapHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ver en Google Maps el centro DEFINE de ${loc.city}`}
                className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white px-4 py-2 text-sm font-semibold text-ink-soft transition hover:border-[#90aca4] hover:bg-[#f8fbfa]"
              >
                Ver en Google Maps
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
