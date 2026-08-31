"use client";

import { track } from "@vercel/analytics";
import { useEffect, useId, useRef, useState } from "react";

import { locations } from "../data/locations";
import type { CtaOrigin } from "./CtaLink";
import { primaryButtonClass } from "./ui";

type WhatsAppCtaProps = {
  origin: CtaOrigin;
  children: React.ReactNode;
  className?: string;
};

/**
 * CTA de WhatsApp con paso previo de elección de sede.
 *
 * El centro tiene dos números y hasta ahora todos los CTAs escribían al de
 * Arahal, de modo que quien contactaba desde Alcalá de Guadaíra acababa en el
 * centro equivocado. Un único componente para los cinco sitios donde aparece
 * el botón.
 *
 * La elección no se recuerda entre visitas: son solo dos opciones y una
 * preferencia guardada envejece mal (una familia puede cambiar de sede, o
 * compartir el dispositivo).
 */
export function WhatsAppCta({ origin, children, className = "" }: WhatsAppCtaProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const firstOptionRef = useRef<HTMLAnchorElement>(null);
  const titleId = `selector-sede-${useId()}`;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
      firstOptionRef.current?.focus();
    }
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  function handleChoice(city: string) {
    track("cta", { accion: "whatsapp", origen: origin, sede: city });
    setIsOpen(false);
  }

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)} className={`${primaryButtonClass} ${className}`}>
        {children}
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClose={() => setIsOpen(false)}
        onClick={(event) => {
          // Clic en el fondo (el propio <dialog>, no el panel) → cerrar.
          if (event.target === dialogRef.current) setIsOpen(false);
        }}
        className="selector-sede"
      >
        {/*
          text-left explícito: el diálogo se monta dentro de secciones que
          centran el texto (el hero, por ejemplo) y heredaría su alineación,
          quedando distinto en cada uno de los cinco sitios donde aparece.
          El padding inferior respeta la barra de gestos del iPhone.
        */}
        <div className="selector-sede-panel w-full rounded-t-[28px] bg-white p-6 text-left shadow-[0_-10px_40px_-20px_rgba(24,50,45,0.5)] sm:max-w-md sm:rounded-[28px] sm:p-7">
          <h2 id={titleId} className="font-serif text-2xl tracking-tight text-ink">
            ¿A qué centro prefieres escribir?
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Te abrimos el WhatsApp del centro que elijas.
          </p>

          <ul className="mt-5 space-y-3">
            {locations.map((location, index) => (
              <li key={location.id}>
                <a
                  ref={index === 0 ? firstOptionRef : undefined}
                  href={location.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleChoice(location.city)}
                  className="flex items-center gap-4 rounded-2xl border border-line-strong bg-white p-4 text-left transition hover:border-brand hover:bg-tint/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-base font-semibold text-ink">{location.city}</span>
                    <span className="mt-0.5 block text-sm text-muted">{location.address}</span>
                    <span className="mt-0.5 block text-sm text-muted">{location.phone}</span>
                  </span>
                  <svg
                    viewBox="0 0 20 20"
                    className="h-5 w-5 shrink-0 text-brand"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M7.5 4 13 10l-5.5 6" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="mt-4 w-full rounded-full px-4 py-3 text-sm font-semibold text-muted transition hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Cancelar
          </button>
        </div>
      </dialog>
    </>
  );
}
