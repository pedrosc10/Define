import { Card, SectionHeading } from "../ui";

const approaches = [
  { title: "Cognitivo-conductual", description: "Identificación y cambio de pensamientos y conductas que generan malestar." },
  { title: "Terapia sistémica", description: "Comprensión de la persona dentro de su entorno familiar y relacional." },
  { title: "Terapia narrativa", description: "Reinterpretación de la historia personal para construir nuevos significados." },
  { title: "Aceptación y compromiso (ACT)", description: "Trabajo en valores personales y flexibilidad psicológica." },
  { title: "EMDR", description: "Procesamiento de experiencias traumáticas y recuerdos bloqueados." },
  { title: "Constelaciones familiares", description: "Exploración de dinámicas familiares y patrones relacionales." },
];

const focusAreas = [
  "Ansiedad y estrés",
  "Depresión",
  "Trastornos de la conducta alimentaria (TCA)",
  "Adicciones",
  "Problemas emocionales y de autoestima",
  "Dificultades en relaciones personales",
  "Procesos de duelo",
  "Trauma",
  "Bloqueos personales",
  "Trastornos psicopatológicos",
];

export function Psychotherapy() {
  return (
    <section id="psicoterapia" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Psicoterapia"
        title="Acompañamiento psicológico"
        description="Intervención terapéutica adaptada a cada persona, orientada a mejorar el bienestar emocional, afrontar dificultades y promover cambios duraderos."
      />
      <Card className="mx-auto mt-10 max-w-4xl bg-surface text-center">
        <p className="text-lg leading-8 text-[#4f635e]">
          En DEFINE trabajamos la psicoterapia desde un enfoque integrador, combinando diferentes modelos terapéuticos para adaptarnos a cada caso. Nuestro objetivo es comprender la situación de cada persona en profundidad y acompañarla en su proceso de cambio de forma cercana, profesional y respetuosa.
        </p>
      </Card>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {approaches.map((approach) => (
          <Card key={approach.title}>
            <h3 className="text-xl font-semibold text-ink">{approach.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted">{approach.description}</p>
          </Card>
        ))}
      </div>
      <Card className="mt-10 bg-surface">
        <h3 className="text-2xl font-semibold text-ink">Ámbitos de intervención</h3>
        <p className="mt-4 text-base leading-7 text-muted-strong">
          Trabajamos con adolescentes y adultos en diferentes situaciones personales y emocionales, adaptando la intervención a cada caso.
        </p>
        <ul className="mt-6 grid gap-3 text-sm leading-7 text-muted sm:grid-cols-2">
          {focusAreas.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-2 h-2.5 w-2.5 rounded-full bg-accent" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm leading-7 text-muted-soft">
          Ofrecemos sesiones de psicoterapia en nuestros centros de Arahal y Alcalá de Guadaíra.
        </p>
      </Card>
    </section>
  );
}
