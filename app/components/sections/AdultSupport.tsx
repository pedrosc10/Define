import { Card, SectionHeading } from "../ui";

const items = [
  { title: "Autogestión y autodeterminación", description: "Fomentamos la toma de decisiones, la defensa de derechos y una mayor autonomía personal en la vida cotidiana." },
  { title: "Bienestar emocional", description: "Trabajamos el equilibrio emocional, la autoestima y el bienestar como base de una mejor calidad de vida." },
  { title: "Taller ocupacional", description: "Desarrollamos actividades y productos con sentido práctico, participación activa y valor personal y social." },
  { title: "Accesibilidad cognitiva", description: "Facilitamos la comprensión del entorno, los espacios, la información y las tareas del día a día." },
  { title: "Inclusión social", description: "Impulsamos la participación plena en la comunidad y en los distintos contextos de la vida adulta." },
  { title: "Estimulación cognitiva", description: "Realizamos actividades para mantener y reforzar atención, memoria, lenguaje y otras funciones cognitivas." },
  { title: "Sensibilización", description: "Favorecemos la visibilidad, la participación y el protagonismo de las personas con diversidad funcional." },
  { title: "Habilidades de la vida diaria", description: "Entrenamos rutinas y capacidades funcionales para favorecer una vida más autónoma y normalizada." },
];

export function AdultSupport() {
  return (
    <section id="diversidad-funcional" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Programa de mañana"
        title="Apoyo a adultos con diversidad funcional"
        description="Un espacio de acompañamiento, desarrollo personal y participación activa orientado a la autonomía, el bienestar emocional y la inclusión social."
      />
      <Card className="mx-auto mt-10 max-w-4xl bg-surface">
        <p className="text-lg leading-8 text-[#4f635e]">
          En DEFINE desarrollamos un programa específico para personas adultas con diversidad funcional, con actividades orientadas a reforzar la autonomía personal, el bienestar, las capacidades cognitivas y la participación en la vida diaria.
        </p>
      </Card>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <Card key={item.title}>
            <h3 className="text-xl font-semibold text-ink">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted">{item.description}</p>
          </Card>
        ))}
      </div>
      <p className="mx-auto mt-10 max-w-4xl text-center text-base leading-8 text-muted-strong sm:text-lg">
        Seguimos impulsando nuevos retos e iniciativas para favorecer el desarrollo pleno, la autonomía personal y la participación social de las personas adultas con diversidad funcional.
      </p>
    </section>
  );
}
