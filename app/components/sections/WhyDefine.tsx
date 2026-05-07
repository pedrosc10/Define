import { Card, SectionHeading } from "../ui";

const items = [
  { title: "Cercanía y escucha", description: "Nos implicamos en cada caso desde una atención humana, respetuosa y cercana." },
  { title: "Trabajo coordinado", description: "Colaboramos con familias, centros educativos y profesionales para dar una respuesta coherente." },
  { title: "Atención adaptada", description: "Cada intervención se ajusta a las necesidades, fortalezas y ritmo de cada persona." },
];

export function WhyDefine() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Por qué DEFINE" title="Una atención cercana, rigurosa y bien coordinada" />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {items.map((item) => (
          <Card key={item.title}>
            <h3 className="text-xl font-semibold text-ink">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted">{item.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
