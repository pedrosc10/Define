"use client";

import { useId, useState } from "react";

import { faqs } from "../../data/faqs";
import { SectionHeading } from "../ui";

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const buttonId = `faq-pregunta-${id}`;
  const panelId = `faq-respuesta-${id}`;

  return (
    <div className="rounded-[20px] border border-white/70 bg-white/90 shadow-[0_8px_30px_-20px_rgba(44,74,67,0.3)] backdrop-blur">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-4 rounded-[20px] px-6 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
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
      </h3>

      {/*
       * Se anima grid-template-rows de 0fr a 1fr en lugar de max-height: la
       * respuesta ocupa el alto que necesite, sin recortes en pantallas
       * estrechas. `invisible` saca el texto del árbol de accesibilidad
       * mientras está plegado, y su transición retrasa la ocultación hasta
       * que termina el plegado.
       */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-[grid-template-rows,visibility] duration-300 ease-in-out ${
          open ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-sm leading-7 text-muted">{answer}</p>
        </div>
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
          title="Información útil antes de vuestra primera cita"
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
