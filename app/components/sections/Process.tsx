import { Card, SectionHeading } from "../ui";

const steps = [
  {
    title: "Hablamos",
    description: "Escuchamos vuestra situación, resolvemos dudas y concertamos una primera cita de valoración para conocernos personalmente.",
  },
  {
    title: "Valoramos",
    description: "Realizamos una entrevista familiar, analizamos el caso de forma individualizada y definimos un plan de acción.",
  },
  {
    title: "Comenzamos",
    description: "Coordinamos la intervención con los profesionales asignados, establecemos objetivos y realizamos seguimiento del progreso.",
  },
];

export function Process() {
  return (
    <section id="como-trabajamos" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <SectionHeading
        eyebrow="Cómo trabajamos"
        title="Un proceso claro desde la primera consulta"
        description="Queremos que sepáis qué esperar en cada fase y que os sintáis acompañados desde el inicio."
      />

      <div className="relative mt-12">
        {/* Connector line — desktop only, sits at badge center height */}
        <div
          aria-hidden="true"
          className="absolute left-[calc(16.666%+1.375rem)] right-[calc(16.666%+1.375rem)] top-[calc(1.5rem+1.375rem)] hidden h-px bg-line-strong md:block"
        />

        <div className="relative grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={step.title}>
              <span className="relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand text-base font-semibold text-white shadow-[0_6px_16px_-6px_rgba(47,109,99,0.6)]">
                0{index + 1}
              </span>
              <h3 className="mt-5 text-2xl font-semibold text-ink">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{step.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
