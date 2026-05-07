"use client";

import { useState } from "react";

import { SectionHeading } from "../ui";

const faqs = [
  {
    question: "¿Cómo es la primera toma de contacto?",
    answer: "Contactáis con nosotros por teléfono o WhatsApp. Escuchamos vuestra situación, resolvemos dudas iniciales y concertamos una primera cita de valoración para conocernos en persona.",
  },
  {
    question: "¿Cuánto dura cada sesión?",
    answer: "Las sesiones tienen una duración habitual de 45 a 60 minutos, aunque puede variar según el tipo de intervención y las necesidades de cada caso.",
  },
  {
    question: "¿Cuánto tiempo hay que esperar para tener cita?",
    answer: "Procuramos ofrecer disponibilidad lo antes posible. El tiempo de espera depende de la especialidad y la demanda del momento. Podéis consultarnos directamente para conocer la disponibilidad actual.",
  },
  {
    question: "¿Aceptáis seguro médico?",
    answer: "Actualmente trabajamos en modalidad de pago privado. Si tenéis seguro médico, os recomendamos consultarlo directamente con vuestra aseguradora para valorar la cobertura.",
  },
  {
    question: "¿Trabajáis solo con niños?",
    answer: "No. En DEFINE acompañamos a niños, adolescentes, adultos y familias, adaptando siempre la intervención a cada etapa vital y a las necesidades de cada persona.",
  },
  {
    question: "¿Realizáis evaluación e intervención?",
    answer: "Sí. Llevamos a cabo tanto valoración y diagnóstico (con informe detallado) como intervención terapéutica personalizada. En muchos casos, ambas fases se realizan de forma coordinada.",
  },
  {
    question: "¿Gestionáis becas NEAE?",
    answer: "Sí. Nos encargamos de todo el proceso de solicitud y gestión de la beca NEAE, ayudando a las familias a acceder a estas ayudas para alumnos con necesidades específicas de apoyo educativo.",
  },
  {
    question: "¿Tenéis centros en Arahal y Alcalá de Guadaíra?",
    answer: "Sí. Contamos con dos centros: uno en Arahal (C/ Alondra, 38 - local B) y otro en Alcalá de Guadaíra (C/ Bailén, 46), para ofrecer una atención cercana y accesible.",
  },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-[20px] border border-white/70 bg-white/90 shadow-[0_8px_30px_-20px_rgba(44,74,67,0.3)] backdrop-blur">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        <span className="text-base font-semibold text-ink">{question}</span>
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-tint text-brand transition-transform duration-300 ${open ? "rotate-45" : ""}`}
          aria-hidden="true"
        >
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
            <path d="M8 3v10M3 8h10" />
          </svg>
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <p className="px-6 pb-5 text-sm leading-7 text-muted">{answer}</p>
      </div>
    </div>
  );
}

export function Faqs() {
  return (
    <section id="faq" className="scroll-mt-28 bg-[#F7F5F0] py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Preguntas frecuentes"
          title="Información útil antes de empezar"
          description="Respondemos las dudas más habituales para que el primer contacto sea claro y sencillo."
        />
        <div className="mt-10 space-y-3">
          {faqs.map((item) => (
            <FaqItem key={item.question} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
