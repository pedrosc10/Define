import { PrimaryButton, SecondaryButton } from "../ui";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[44rem] bg-[radial-gradient(ellipse_at_20%_0%,rgba(164,196,188,0.55),transparent_42%),radial-gradient(ellipse_at_80%_5%,rgba(205,225,220,0.7),transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.5),rgba(255,255,255,0))]"
      />

      <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex rounded-full border border-[#c8d8d2] bg-white/80 px-4 py-1.5 text-sm font-medium text-[#5a746e] shadow-sm">
            Arahal · Alcalá de Guadaíra
          </span>

          <h1 className="mt-6 font-serif text-[clamp(2.4rem,6vw,4rem)] leading-[1.1] tracking-tight text-ink">
            Tu hijo merece ser entendido.{" "}
            <span className="text-brand">Nosotros lo hacemos posible.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#4f6560] sm:text-xl">
            Centro Psicopedagógico de Psicología y Logopedia en Arahal y Alcalá de Guadaíra. Evaluación, diagnóstico e intervención personalizada para niños, adolescentes, adultos y familias.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <PrimaryButton
              href="https://wa.me/34622671219"
              origin="hero"
              ariaLabel="Reservar primera consulta por WhatsApp"
              className="w-full sm:w-auto"
            >
              Reserva tu primera consulta
            </PrimaryButton>
            <SecondaryButton
              href="tel:+34622671219"
              origin="hero"
              ariaLabel="Llamar por teléfono a DEFINE"
              className="w-full sm:w-auto"
            >
              Llamar ahora
            </SecondaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}
