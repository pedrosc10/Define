import { Card, SectionHeading } from "../ui";

const services = [
  { title: "Psicopedagogía", points: ["Dificultades de aprendizaje: TDAH, dislexia, comprensión lectora, discapacidad intelectual, discalculia...", "Adaptación escolar y dificultades sociales"] },
  { title: "Neuropsicología", points: ["Estimulación de las funciones cognitivas: memoria, lenguaje, atención, función ejecutiva, cognición social, percepción y praxias"] },
  { title: "Logopedia", points: ["Trastornos del lenguaje, habla y comunicación", "Deglución y terapia miofuncional", "Sistemas aumentativos y alternativos de comunicación (SAAC)"] },
  { title: "Psicología", points: ["Trastornos del neurodesarrollo y dificultades de aprendizaje", "Problemas de conducta y regulación emocional", "Problemas de autoestima y motivación"] },
  { title: "Atención temprana", points: ["Estimulación del desarrollo cognitivo, motor, social y del lenguaje", "Intervención global en la primera infancia"] },
  { title: "Evaluación y diagnóstico", points: ["Valoraciones completas con informe", "Orientación personalizada y recomendaciones"] },
  { title: "Terapia ocupacional", points: ["Fomento de la autonomía, participación y desarrollo en las actividades de la vida diaria", "Intervención en el procesamiento sensorial y motricidad"] },
  { title: "Musicoterapia", points: ["Estimulación cognitiva, motora y emocional mediante el uso terapéutico de la música"] },
];

function ServiceIcon({ title }: { title: string }) {
  const strokeProps = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const iconKey = title.toLowerCase();

  return (
    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-tint text-brand">
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        {iconKey.includes("psicopedagog") ? (
          <>
            <path {...strokeProps} d="M5.5 6.5A2.5 2.5 0 0 1 8 4h10.5v15H8a2.5 2.5 0 0 0-2.5 2.5V6.5Z" />
            <path {...strokeProps} d="M8 4v15" />
          </>
        ) : null}
        {iconKey.includes("neuropsicolog") ? (
          <>
            <path {...strokeProps} d="M9 5.5a2.5 2.5 0 0 1 5 0 3 3 0 0 1 3 3 3 3 0 0 1-1 5.82V15a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3v-.18A3 3 0 0 1 7 8.5a3 3 0 0 1 2-3Z" />
            <path {...strokeProps} d="M12 8v8M9.5 10.5H12M12 13.5h2.5" />
          </>
        ) : null}
        {iconKey.includes("logopedia") ? (
          <>
            <path {...strokeProps} d="M5 7.5A2.5 2.5 0 0 1 7.5 5h9A2.5 2.5 0 0 1 19 7.5v5A2.5 2.5 0 0 1 16.5 15H11l-4 4v-4H7.5A2.5 2.5 0 0 1 5 12.5Z" />
            <path {...strokeProps} d="M8.5 9.5h7M8.5 12h4.5" />
          </>
        ) : null}
        {iconKey.includes("psicolog") && !iconKey.includes("neuropsicolog") ? (
          <path {...strokeProps} d="M12 20s-6-3.74-6-9a3.5 3.5 0 0 1 6-2.45A3.5 3.5 0 0 1 18 11c0 5.26-6 9-6 9Z" />
        ) : null}
        {iconKey.includes("atenci") && iconKey.includes("temprana") ? (
          <>
            <path {...strokeProps} d="M12 20v-8" />
            <path {...strokeProps} d="M12 12c0-3.5 2.5-6 6-6 0 3.5-2.5 6-6 6Z" />
            <path {...strokeProps} d="M12 14c0-2.76-1.79-5-4-5-1.1 0-2 .9-2 2 0 2.76 1.79 5 4 5" />
          </>
        ) : null}
        {iconKey.includes("evaluaci") && iconKey.includes("diagn") ? (
          <>
            <path {...strokeProps} d="M9 5.5h6" />
            <path {...strokeProps} d="M9.5 4h5a1.5 1.5 0 0 1 1.5 1.5V7H8V5.5A1.5 1.5 0 0 1 9.5 4Z" />
            <path {...strokeProps} d="M8 6.5H6.5A1.5 1.5 0 0 0 5 8v10.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V8A1.5 1.5 0 0 0 17.5 6.5H16" />
            <path {...strokeProps} d="M8.5 11h7M8.5 14h7" />
          </>
        ) : null}
        {iconKey.includes("terapia ocupacional") ? (
          <>
            <path {...strokeProps} d="M8 12V7.5a1.5 1.5 0 0 1 3 0V11" />
            <path {...strokeProps} d="M11 11V6.5a1.5 1.5 0 0 1 3 0V11" />
            <path {...strokeProps} d="M14 11V8a1.5 1.5 0 0 1 3 0v5.5c0 3.04-2.46 5.5-5.5 5.5H11A6 6 0 0 1 5 13v-1.5A1.5 1.5 0 0 1 8 11v1" />
          </>
        ) : null}
        {iconKey.includes("musicoterapia") ? (
          <path {...strokeProps} d="M14 5v9.5a2.5 2.5 0 1 1-1.5-2.3V7.5l6-1.5v7.5a2.5 2.5 0 1 1-1.5-2.3V4.5Z" />
        ) : null}
      </svg>
    </span>
  );
}

export function Services() {
  return (
    <section id="especialidades" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Especialidades"
        title="Áreas de apoyo psicológico y educativo"
        description="Intervenimos desde distintas especialidades para ofrecer una respuesta completa, clara y coordinada."
      />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <Card key={service.title} className="flex h-full flex-col bg-surface">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl font-semibold text-ink">{service.title}</h3>
              <ServiceIcon title={service.title} />
            </div>
            <div className="mt-5 h-px bg-[#e3ece8]" />
            <ul className="mt-5 space-y-4 text-sm leading-7 text-muted">
              {service.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </section>
  );
}
