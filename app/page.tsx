"use client";

import { useState } from "react";


const whyDefineItems = [
  { title: "Cercanía y escucha", description: "Nos implicamos en cada caso desde una atención humana, respetuosa y cercana." },
  { title: "Trabajo coordinado", description: "Colaboramos con familias, centros educativos y profesionales para dar una respuesta coherente." },
  { title: "Atención adaptada", description: "Cada intervención se ajusta a las necesidades, fortalezas y ritmo de cada persona." },
];

const processSteps = [
  { title: "Hablamos", description: "Escuchamos vuestra situación, resolvemos dudas y concertamos una primera cita de valoración para conocernos personalmente." },
  { title: "Valoramos", description: "Realizamos una entrevista familiar, analizamos el caso de forma individualizada y definimos un plan de acción." },
  { title: "Comenzamos", description: "Coordinamos la intervención con los profesionales asignados, establecemos objetivos y realizamos seguimiento del progreso." },
];

const services = [
  { title: "Psicopedagogía", points: ["Dificultades de aprendizaje: TDAH, dislexia, comprensión lectora, discapacidad intelectual, discalculia...", "Adaptación escolar y dificultades sociales"] },
  { title: "Neuropsicología", points: ["Estimulación de las funciones cognitivas: memoria, lenguaje, atención, función ejecutiva, cognición social, percepción y praxias"] },
  { title: "Logopedia", points: ["Trastornos del lenguaje, habla y comunicación", "Deglución y terapia miofuncional" ,"Sistemas aumentativos y alternativos de comunicación (SAAC)"] },
  { title: "Psicología", points: ["Trastornos del neurodesarrollo y dificultades de aprendizaje", "Problemas de conducta y regulación emocional", "Problemas de autoestima y motivación"] },
  { title: "Atención temprana", points: ["Estimulación del desarrollo cognitivo, motor, social y del lenguaje", "Intervención global en la primera infancia"] },
  { title: "Evaluación y diagnóstico", points: ["Valoraciones completas con informe", "Orientación personalizada y recomendaciones"] },
  { title: "Terapia ocupacional", points: ["Fomento de la autonomía, participación y desarrollo en las actividades de la vida diaria","Intervención en el procesamiento sensorial y motricidad"] },
  { title: "Musicoterapia", points: ["Estimulación cognitiva, motora y emocional mediante el uso terapéutico de la música"] },
];

const psychotherapyApproaches = [
  { title: "Cognitivo-conductual", description: "Identificación y cambio de pensamientos y conductas que generan malestar." },
  { title: "Terapia sistémica", description: "Comprensión de la persona dentro de su entorno familiar y relacional." },
  { title: "Terapia narrativa", description: "Reinterpretación de la historia personal para construir nuevos significados." },
  { title: "Aceptación y compromiso (ACT)", description: "Trabajo en valores personales y flexibilidad psicológica." },
  { title: "EMDR", description: "Procesamiento de experiencias traumáticas y recuerdos bloqueados." },
  { title: "Constelaciones familiares", description: "Exploración de dinámicas familiares y patrones relacionales." },
];

const psychotherapyFocusAreas = [
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

const adultSupportItems = [
  { title: "Autogestión y autodeterminación", description: "Fomentamos la toma de decisiones, la defensa de derechos y una mayor autonomía personal en la vida cotidiana." },
  { title: "Bienestar emocional", description: "Trabajamos el equilibrio emocional, la autoestima y el bienestar como base de una mejor calidad de vida." },
  { title: "Taller ocupacional", description: "Desarrollamos actividades y productos con sentido práctico, participación activa y valor personal y social." },
  { title: "Accesibilidad cognitiva", description: "Facilitamos la comprensión del entorno, los espacios, la información y las tareas del día a día." },
  { title: "Inclusión social", description: "Impulsamos la participación plena en la comunidad y en los distintos contextos de la vida adulta." },
  { title: "Estimulación cognitiva", description: "Realizamos actividades para mantener y reforzar atención, memoria, lenguaje y otras funciones cognitivas." },
  { title: "Sensibilización", description: "Favorecemos la visibilidad, la participación y el protagonismo de las personas con diversidad funcional." },
  { title: "Habilidades de la vida diaria", description: "Entrenamos rutinas y capacidades funcionales para favorecer una vida más autónoma y normalizada." },
];

const expectationItems = [
  { title: "Valoración individualizada", description: "Cada caso se estudia de forma personalizada para comprender necesidades, fortalezas y objetivos." },
  { title: "Coordinación con familia y entorno", description: "Trabajamos junto a familias, centros educativos y otros profesionales para dar una respuesta coherente." },
  { title: "Seguimiento y evolución", description: "Definimos objetivos, revisamos avances y adaptamos la intervención según el progreso de cada persona." },
];

const targetGroups = ["Niños", "Adolescentes", "Adultos", "Familias", "Diversidad funcional"];

const locations = [
  { city: "Arahal", address: "C/ Alondra, 38 - local B", phone: "622 67 12 19", phoneHref: "tel:+34622671219", hours: "Lunes a viernes de 9h-13h y 15h-20h", mapHref: "https://maps.google.com/?q=Calle+Alondra+38+Arahal" },
  { city: "Alcalá de Guadaíra", address: "C/ Bailén, 46", phone: "722 41 33 78", phoneHref: "tel:+34722413378", hours: "Lunes a viernes de 9h-13h y 15h-20h", mapHref: "https://maps.google.com/?q=Calle+Bailen+46+Alcala+de+Guadaira" },
];

const faqs = [
  { question: "¿Cómo es la primera toma de contacto?", answer: "Escuchamos vuestro caso, resolvemos dudas y os orientamos sobre la valoración inicial y el servicio más adecuado." },
  { question: "¿Trabajáis solo con niños?", answer: "No. En DEFINE acompañamos a niños, adolescentes, adultos y familias, adaptando la intervención a cada etapa vital." },
  { question: "¿Realizáis evaluación e intervención?", answer: "Sí. Realizamos valoración, orientación, diagnóstico e intervención personalizada según las necesidades de cada caso." },
  { question: "¿Tenéis centros en Arahal y Alcalá de Guadaíra?", answer: "Sí. Contamos con centros en Arahal y Alcalá de Guadaíra para ofrecer una atención cercana y accesible." },
  { question: "¿Gestionáis becas NEAE?", answer: "Sí, en nuestro centro nos encargamos de todo el proceso de solicitud y gestión de la beca NEAE, ayudando a las familias a acceder a estas ayudas para alumnos con necesidades específicas de apoyo educativo." },
];

const mobileNavItems = [
  { href: "#especialidades", label: "Especialidades" },
  { href: "#psicoterapia", label: "Psicoterapia" },
  { href: "#diversidad-funcional", label: "Diversidad funcional" },
  { href: "#como-trabajamos", label: "Cómo trabajamos" },
  { href: "#centros", label: "Centros" },
  { href: "#contacto", label: "Contacto" },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [{
    "@type": "MedicalBusiness",
    "@id": "https://www.centrodefine.com/#define",
    name: "Centro Psicopedagógico y de Desarrollo Integral DEFINE",
    url: "https://www.centrodefine.com",
    email: "define@centrodefine.com",
    telephone: "+34 622 67 12 19",
    areaServed: ["Arahal", "Alcalá de Guadaíra"],
    department: [
      { "@type": "MedicalBusiness", name: "DEFINE Arahal", telephone: "+34 622 67 12 19", address: { "@type": "PostalAddress", streetAddress: "C/ Alondra, 38 - local B", addressLocality: "Arahal", addressCountry: "ES" } },
      { "@type": "MedicalBusiness", name: "DEFINE Alcalá de Guadaíra", telephone: "+34 722 41 33 78", address: { "@type": "PostalAddress", streetAddress: "C/ Bailén, 46", addressLocality: "Alcalá de Guadaíra", addressCountry: "ES" } },
    ],
  }],
};

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-3 text-center">
      <span className="text-sm font-semibold uppercase tracking-[0.24em] text-[#5f7d76]">{eyebrow}</span>
      <h2 className="font-serif text-3xl tracking-tight text-[#18322d] sm:text-4xl">{title}</h2>
      {description ? <p className="text-base leading-7 text-[#52625e] sm:text-lg">{description}</p> : null}
    </div>
  );
}

function PrimaryButton({ href, children, className = "", ariaLabel }: { href: string; children: React.ReactNode; className?: string; ariaLabel?: string }) {
  return <a href={href} aria-label={ariaLabel} className={`inline-flex min-h-12 items-center justify-center rounded-full bg-[#2f6d63] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-12px_rgba(47,109,99,0.8)] transition hover:bg-[#285d55] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f6d63] ${className}`}>{children}</a>;
}

function SecondaryButton({ href, children, className = "", ariaLabel }: { href: string; children: React.ReactNode; className?: string; ariaLabel?: string }) {
  return <a href={href} aria-label={ariaLabel} className={`inline-flex min-h-12 items-center justify-center rounded-full border border-[#b5c8c1] bg-white/80 px-6 py-3 text-sm font-semibold text-[#244740] transition hover:border-[#90aca4] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f6d63] ${className}`}>{children}</a>;
}

function Card({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-[0_18px_50px_-28px_rgba(44,74,67,0.35)] backdrop-blur ${className}`}>{children}</div>;
}

function ImageFrame({
  src,
  alt,
  className = "",
  overlayClassName = "",
}: {
  src: string;
  alt: string;
  className?: string;
  overlayClassName?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-[24px] ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-full w-full object-cover" />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${overlayClassName}`}
      />
    </div>
  );
}

function TrustIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path d="M12 21s-6-3.7-6-9a3.5 3.5 0 0 1 6-2.5A3.5 3.5 0 0 1 18 12c0 5.3-6 9-6 9Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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
    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#ecf4f1] text-[#2f6d63]">
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

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <main className="bg-[linear-gradient(180deg,#f8f5ef_0%,#f4f8f6_36%,#fcfbf8_100%)] pb-24 text-[#244740] md:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <header className="sticky top-0 z-30 border-b border-[#d9e5e0]/80 bg-[#fbfaf6]/88 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href="#" className="flex items-center" aria-label="Inicio DEFINE">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="DEFINE"
              className="h-12 w-auto object-contain sm:h-14"
            />
          </a>
          <div className="flex items-center gap-3">
            <nav className="hidden items-center gap-7 text-sm font-medium text-[#506762] md:flex">
              <a className="transition hover:text-[#18322d]" href="#especialidades">Especialidades</a>
              <a className="transition hover:text-[#18322d]" href="#psicoterapia">Psicoterapia</a>
              <a className="transition hover:text-[#18322d]" href="#diversidad-funcional">Diversidad funcional</a>
              <a className="transition hover:text-[#18322d]" href="#como-trabajamos">Cómo trabajamos</a>
              <a className="transition hover:text-[#18322d]" href="#centros">Centros</a>
              <a className="transition hover:text-[#18322d]" href="#contacto">Contacto</a>
            </nav>
            <div className="hidden md:flex">
              <PrimaryButton 
                href="https://wa.me/34622671219"
                className="min-h-10 px-4 py-2 text-xs sm:text-sm"
              >
                WhatsApp
              </PrimaryButton>
            </div>
            <button
              type="button"
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#c7d9d3] bg-white text-[#244740] md:hidden"
            >
              <span className="sr-only">Menú</span>
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path
                  d={isMobileMenuOpen ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
        {isMobileMenuOpen ? (
          <div className="border-t border-[#d9e5e0] bg-[#fbfaf6] md:hidden">
            <nav className="mx-auto flex max-w-6xl flex-col px-4 py-3 sm:px-6">
              {mobileNavItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-2xl px-3 py-3 text-sm font-medium text-[#244740] transition hover:bg-white/80"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        ) : null}
      </header>

      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_top_left,_rgba(164,196,188,0.45),_transparent_42%),radial-gradient(circle_at_top_right,_rgba(205,225,220,0.65),_transparent_38%),linear-gradient(180deg,_rgba(255,255,255,0.7),_rgba(255,255,255,0))]" />
        <div className="mx-auto flex min-h-[calc(100vh-72px)] max-w-6xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
          <div>
            <div className="[&_h1]:max-w-none [&_h1]:lg:max-w-5xl">
              <span className="inline-flex rounded-full border border-[#c8d8d2] bg-white/80 px-4 py-2 text-sm font-medium text-[#5a746e] shadow-sm">Arahal y Alcalá de Guadaíra</span>
              <h1 className="mt-6 max-w-4xl font-serif text-4xl leading-tight tracking-tight text-[#18322d] sm:text-5xl lg:text-6xl">Centro Psicopedagógico, Psicología y Logopedia en Arahal y Alcalá de Guadaíra</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-[#4f6560] sm:text-xl">Evaluación, diagnóstico e intervención personalizada para potenciar el aprendizaje, el desarrollo y el bienestar en todas las etapas de la vida.</p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#5b6f6a] sm:text-lg">Equipo multidisciplinar en Arahal y Alcalá de Guadaíra, con atención cercana, profesional y basada en la evidencia científica para niños, adolescentes, adultos y familias.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <PrimaryButton href="https://wa.me/34622671219" ariaLabel="Contactar por WhatsApp con DEFINE">Contactar por WhatsApp</PrimaryButton>
                <SecondaryButton href="tel:+34622671219" ariaLabel="Llamar por teléfono a DEFINE Arahal">Llamar ahora</SecondaryButton>
              </div>
            </div>

            <div className="mt-10 flex w-full">
              <Card className="relative w-full overflow-hidden p-7 sm:p-8">
              <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-[#dcebe6]/70 blur-2xl" />
              <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-[#eef4ef]/80 blur-2xl" />
              <div className="relative space-y-5">
                <div className="inline-flex rounded-full bg-[#eef5f2] px-3 py-1 text-sm font-semibold text-[#4d6a63]">Acompañamiento humano y profesional</div>
                <h2 className="font-serif text-2xl text-[#18322d] sm:text-3xl">Acoger, escuchar y ayudar es nuestra misión más importante.</h2>
                <p className="text-base leading-7 text-[#546763]">En DEFINE creemos que cada persona tiene un potencial único que merece ser descubierto, fortalecido y acompañado con sensibilidad, criterio profesional y trabajo coordinado.</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl bg-[#f7fbf9] p-4"><p className="text-sm text-[#60756f]">Valoración inicial</p><p className="mt-1 text-lg font-semibold text-[#244740]">Individualizada</p></div>
                  <div className="rounded-3xl bg-[#f7fbf9] p-4"><p className="text-sm text-[#60756f]">Plan de acción</p><p className="mt-1 text-lg font-semibold text-[#244740]">Multidisciplinar</p></div>
                </div>
              </div>
              </Card>
            </div>
          </div>
        </div>
      </section>


      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Por qué DEFINE" title="Una atención cercana, rigurosa y bien coordinada" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {whyDefineItems.map((item) => <Card key={item.title}><h3 className="text-xl font-semibold text-[#18322d]">{item.title}</h3><p className="mt-3 text-sm leading-7 text-[#576a66]">{item.description}</p></Card>)}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading eyebrow="Sobre DEFINE" title="En DEFINE unimos experiencia, innovación y compromiso humano para acompañar a niños, adolescentes, adultos y familias." />
          <Card className="bg-[#fdfcf9]"><p className="text-lg leading-8 text-[#4f635e]">Trabajamos de forma coordinada con las familias, los centros educativos y otros profesionales para ofrecer una atención integral, coherente y adaptada a cada necesidad.</p></Card>
        </div>
      </section>

      <section id="como-trabajamos" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Cómo trabajamos" title="Un proceso claro desde el primer contacto" description="Queremos que sepáis qué esperar en cada fase y que os sintáis acompañados desde el inicio." />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {processSteps.map((step, index) => <Card key={step.title}><span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#edf4f1] text-base font-semibold text-[#2f6d63]">0{index + 1}</span><h3 className="mt-5 text-2xl font-semibold text-[#18322d]">{step.title}</h3><p className="mt-3 text-sm leading-7 text-[#576a66]">{step.description}</p></Card>)}
        </div>
      </section>

      <section id="especialidades" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Especialidades" title="Áreas de apoyo psicológico y educativo" description="Intervenimos desde distintas especialidades para ofrecer una respuesta completa, clara y coordinada." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="flex h-full flex-col bg-[#fdfcf9]">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-semibold text-[#18322d]">{service.title}</h3>
                <ServiceIcon title={service.title} />
              </div>
              <div className="mt-5 h-px bg-[#e3ece8]" />
              <ul className="mt-5 space-y-4 text-sm leading-7 text-[#576a66]">
                {service.points.map((point) => <li key={point} className="flex items-start gap-3"><span className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#7ea79c]" aria-hidden="true" /><span>{point}</span></li>)}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      <section id="psicoterapia" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Psicoterapia"
          title="Acompañamiento psicológico"
          description="Intervención terapéutica adaptada a cada persona, orientada a mejorar el bienestar emocional, afrontar dificultades y promover cambios duraderos."
        />
        <Card className="mx-auto mt-10 max-w-4xl bg-[#fdfcf9] text-center">
          <p className="text-lg leading-8 text-[#4f635e]">
            En DEFINE trabajamos la psicoterapia desde un enfoque integrador, combinando diferentes modelos terapéuticos para adaptarnos a cada caso. Nuestro objetivo es comprender la situación de cada persona en profundidad y acompañarla en su proceso de cambio de forma cercana, profesional y respetuosa.
          </p>
        </Card>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {psychotherapyApproaches.map((approach) => (
            <Card key={approach.title}>
              <h3 className="text-xl font-semibold text-[#18322d]">{approach.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#576a66]">{approach.description}</p>
            </Card>
          ))}
        </div>
        <Card className="mt-10 bg-[#fdfcf9]">
          <h3 className="text-2xl font-semibold text-[#18322d]">Ámbitos de intervención</h3>
          <p className="mt-4 text-base leading-7 text-[#52625e]">
            Trabajamos con adolescentes y adultos en diferentes situaciones personales y emocionales, adaptando la intervención a cada caso.
          </p>
          <ul className="mt-6 grid gap-3 text-sm leading-7 text-[#576a66] sm:grid-cols-2">
            {psychotherapyFocusAreas.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#7ea79c]" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-7 text-[#5b6f6a]">
            Ofrecemos sesiones de psicoterapia en nuestros centros de Arahal y Alcalá de Guadaíra.
          </p>
        </Card>
      </section>

      <section id="diversidad-funcional" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Programa de mañana" title="Apoyo a adultos con diversidad funcional" description="Un espacio de acompañamiento, desarrollo personal y participación activa orientado a la autonomía, el bienestar emocional y la inclusión social." />
        <Card className="mx-auto mt-10 max-w-4xl bg-[#fdfcf9]"><p className="text-lg leading-8 text-[#4f635e]">En DEFINE desarrollamos un programa específico para personas adultas con diversidad funcional, con actividades orientadas a reforzar la autonomía personal, el bienestar, las capacidades cognitivas y la participación en la vida diaria.</p></Card>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {adultSupportItems.map((item) => <Card key={item.title}><h3 className="text-xl font-semibold text-[#18322d]">{item.title}</h3><p className="mt-3 text-sm leading-7 text-[#576a66]">{item.description}</p></Card>)}
        </div>
        <p className="mx-auto mt-10 max-w-4xl text-center text-base leading-8 text-[#52625e] sm:text-lg">Seguimos impulsando nuevos retos e iniciativas para favorecer el desarrollo pleno, la autonomía personal y la participación social de las personas adultas con diversidad funcional.</p>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="A quién ayudamos" title="Acompañamiento en distintas etapas de la vida" description="Acompañamos a niños, adolescentes, adultos, familias y personas con diversidad funcional desde un enfoque cercano, profesional e individualizado." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {targetGroups.map((group) => <Card key={group} className="text-center"><p className="text-xl font-semibold text-[#18322d]">{group}</p></Card>)}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Nuestro enfoque" title="Qué puedes esperar de DEFINE" description="Una atención profesional, cercana y coordinada para acompañarte con claridad desde el primer momento." />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {expectationItems.map((item) => <Card key={item.title}><h3 className="text-xl font-semibold text-[#18322d]">{item.title}</h3><p className="mt-3 text-sm leading-7 text-[#576a66]">{item.description}</p></Card>)}
        </div>
      </section>

      <section id="centros" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Centros" title="Dos centros para acompañarte más cerca" description="Atendemos en Arahal y Alcalá de Guadaíra en dos espacios adaptados, accesibles y diseñados para favorecer el aprendizaje, la terapia y el bienestar." />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {locations.map((location) => (
            <Card key={location.city} className="bg-[#fdfcf9]">
              <ImageFrame
                src={
                  location.city === "Arahal"
                    ? "https://picsum.photos/seed/arahal/600/400"
                    : "https://picsum.photos/seed/alcala/600/400"
                }
                alt={`Imagen del centro DEFINE de ${location.city}`}
                className="mb-6 aspect-[3/2] rounded-xl"
                overlayClassName="bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.34))]"
              />
              <h3 className="text-2xl font-semibold text-[#18322d]">{location.city}</h3>
              <div className="mt-5 space-y-3 text-sm leading-7 text-[#576a66]">
                <p><strong className="font-semibold text-[#244740]">Dirección:</strong> {location.address}</p>
                <p><strong className="font-semibold text-[#244740]">Teléfono:</strong> <a className="hover:text-[#2f6d63]" href={location.phoneHref} aria-label={`Llamar al centro DEFINE de ${location.city}`}>{location.phone}</a></p>
                <p><strong className="font-semibold text-[#244740]">Horario:</strong> {location.hours}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={location.phoneHref} aria-label={`Llamar al centro DEFINE de ${location.city}`} className="inline-flex items-center rounded-full border border-[#c7d9d3] bg-white px-4 py-2 text-sm font-semibold text-[#244740] transition hover:border-[#90aca4] hover:bg-[#f8fbfa]">Llamar</a>
                <a href={location.mapHref} target="_blank" rel="noopener noreferrer" aria-label={`Ver en Google Maps el centro DEFINE de ${location.city}`} className="inline-flex items-center rounded-full border border-[#c7d9d3] bg-white px-4 py-2 text-sm font-semibold text-[#244740] transition hover:border-[#90aca4] hover:bg-[#f8fbfa]">Ver en Google Maps</a>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Preguntas frecuentes" title="Información útil antes de empezar" description="Respondemos algunas dudas habituales para que el primer contacto resulte más claro y sencillo." />
        <div className="mt-10 space-y-4">
          {faqs.map((item) => <Card key={item.question} className="bg-[#fdfcf9]"><h3 className="text-lg font-semibold text-[#18322d]">{item.question}</h3><p className="mt-3 text-sm leading-7 text-[#576a66]">{item.answer}</p></Card>)}
        </div>
      </section>

      <section id="contacto" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-16 sm:px-6 lg:px-8">
        <Card className="overflow-hidden bg-[linear-gradient(135deg,#f6fbf8_0%,#edf4ef_100%)] p-8 sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#5f7d76]">Primer contacto</p>
              <h2 className="mt-3 font-serif text-3xl tracking-tight text-[#18322d] sm:text-4xl">Reserva tu primera consulta o cuéntanos tu caso</h2>
              <p className="mt-4 text-base leading-7 text-[#52625e]">Cuéntanos tu caso y te orientaremos para encontrar la mejor forma de acompañarte desde Arahal o Alcalá de Guadaíra, según la atención que mejor se adapte a ti.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <PrimaryButton href="https://wa.me/34622671219" ariaLabel="Escribir por WhatsApp a DEFINE">WhatsApp</PrimaryButton>
              <SecondaryButton href="tel:+34622671219" ariaLabel="Llamar por teléfono a DEFINE">Llamar ahora</SecondaryButton>
            </div>
          </div>
        </Card>
      </section>

      <footer className="border-t border-[#d9e5e0] bg-white/70">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 xl:grid-cols-3 lg:px-8">
          <div><p className="font-serif text-2xl text-[#18322d]">DEFINE</p><p className="mt-3 text-sm leading-7 text-[#576a66]">Evaluación, diagnóstico e intervención personalizada en Arahal y Alcalá de Guadaíra.</p></div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#5f7d76]">Contacto</p>
            <p className="mt-3 text-sm leading-7 text-[#576a66]">Teléfono Arahal: <a className="hover:text-[#2f6d63]" href="tel:+34622671219" aria-label="Llamar al centro DEFINE de Arahal">622 67 12 19</a></p>
            <p className="text-sm leading-7 text-[#576a66]">Teléfono Alcalá: <a className="hover:text-[#2f6d63]" href="tel:+34722413378" aria-label="Llamar al centro DEFINE de Alcalá de Guadaíra">722 41 33 78</a></p>
            <p className="text-sm leading-7 text-[#576a66]">Email: <a className="hover:text-[#2f6d63]" href="mailto:define@centrodefine.com" aria-label="Enviar un correo a DEFINE">define@centrodefine.com</a></p>
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#5f7d76]">Centros inscritos</p>
            <div className="mt-3 grid grid-cols-[auto_1fr] items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo_junta_sin_blanco_big.jpg"
                alt="Logotipo de la Junta de Andalucía"
                className="h-auto w-auto max-w-[120px] object-contain"
              />
              <div className="space-y-1 text-sm leading-7 text-[#576a66]">
                <p>Arahal Nº NICA: 52308</p>
                <p>Alcalá de Gdra. Nº NICA: 59133</p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#d9e5e0] bg-white/95 px-4 py-3 shadow-[0_-10px_30px_-20px_rgba(44,74,67,0.45)] backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-6xl gap-3">
          <SecondaryButton href="tel:+34622671219" ariaLabel="Llamar por teléfono a DEFINE" className="flex-1">Llamar</SecondaryButton>
          <PrimaryButton href="https://wa.me/34622671219" ariaLabel="Escribir por WhatsApp a DEFINE" className="flex-1">WhatsApp</PrimaryButton>
        </div>
      </div>
    </main>
  );
}
