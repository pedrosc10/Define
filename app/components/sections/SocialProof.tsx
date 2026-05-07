const stats = [
  { value: "+500", label: "familias acompañadas" },
  { value: "5.0 ★", label: "valoración en Google" },
  { value: "10+", label: "especialistas" },
  { value: "+8 años", label: "de experiencia" },
];

export function SocialProof() {
  return (
    <section aria-label="Datos de confianza" className="border-y border-line bg-white">
      <div className="mx-auto max-w-6xl px-4 py-7 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 gap-y-6 md:grid-cols-4 md:gap-0 md:divide-x md:divide-line">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1 text-center md:px-8">
              <dt className="text-2xl font-bold text-brand sm:text-3xl">{stat.value}</dt>
              <dd className="text-sm text-muted">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
