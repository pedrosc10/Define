export function Quote() {
  return (
    <section aria-label="Nuestra filosofía" className="bg-brand">
      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <svg
            viewBox="0 0 40 32"
            className="mb-8 h-10 w-10 text-white/30"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M0 32V19.2C0 8.533 6.4 2.133 19.2 0l2.4 3.2C15.467 4.8 11.733 7.467 10.133 12H16V32H0Zm24 0V19.2C24 8.533 30.4 2.133 43.2 0l2.4 3.2C39.467 4.8 35.733 7.467 34.133 12H40V32H24Z" />
          </svg>

          <blockquote className="font-serif text-2xl leading-relaxed text-white sm:text-3xl lg:text-[2rem]">
            Cada familia que llega a nosotros trae una historia que merece ser escuchada, entendida y acompañada. Eso es lo que hacemos todos los días.
          </blockquote>

          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
            Equipo DEFINE
          </p>
        </div>
      </div>
    </section>
  );
}
