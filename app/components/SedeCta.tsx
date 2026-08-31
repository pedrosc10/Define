"use client";

import { track } from "@vercel/analytics";
import { useEffect, useId, useRef, useState } from "react";

import { locations } from "../data/locations";
import type { CtaOrigin } from "./CtaLink";
import { primaryButtonClass, secondaryButtonClass } from "./ui";

type Channel = "whatsapp" | "telefono";

const CHANNEL_COPY: Record<Channel, { title: string; hint: string }> = {
  whatsapp: {
    title: "¿A qué centro prefieres escribir?",
    hint: "Te abrimos el WhatsApp del centro que elijas.",
  },
  telefono: {
    title: "¿A qué centro prefieres llamar?",
    hint: "Marcamos el número del centro que elijas.",
  },
};

type SedeCtaProps = {
  channel: Channel;
  origin: CtaOrigin;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
};

/**
 * CTA de contacto con paso previo de elección de sede.
 *
 * El centro tiene dos números y hasta ahora todos los CTAs llevaban al de
 * Arahal, de modo que quien contactaba desde Alcalá de Guadaíra acababa en el
 * centro equivocado. Un único componente para los dos canales (WhatsApp y
 * teléfono) y para todos los sitios donde aparecen los botones.
 *
 * La elección no se recuerda entre visitas: son solo dos opciones y una
 * preferencia guardada envejece mal (una familia puede cambiar de sede, o
 * compartir el dispositivo).
 */
export function SedeCta({ channel, origin, children, className = "", variant = "primary" }: SedeCtaProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const firstOptionRef = useRef<HTMLAnchorElement>(null);
  const titleId = `selector-sede-${useId()}`;
  const copy = CHANNEL_COPY[channel];
  const isWhatsApp = channel === "whatsapp";

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
    track("cta", { accion: channel, origen: origin, sede: city });
    setIsOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`${variant === "primary" ? primaryButtonClass : secondaryButtonClass} ${className}`}
      >
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
          quedando distinto en cada uno de los sitios donde aparece.
        */}
        <div className="selector-sede-panel w-full rounded-t-[28px] bg-white p-6 text-left shadow-[0_-10px_40px_-20px_rgba(24,50,45,0.5)] sm:max-w-md sm:rounded-[28px] sm:p-7">
          <h2 id={titleId} className="font-serif text-2xl tracking-tight text-ink">
            {copy.title}
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted">{copy.hint}</p>

          <ul className="mt-5 space-y-3">
            {locations.map((location, index) => (
              <li key={location.id}>
                <a
                  ref={index === 0 ? firstOptionRef : undefined}
                  href={isWhatsApp ? location.whatsappHref : location.phoneHref}
                  // Un tel: debe abrirse en la misma pestaña; WhatsApp Web, no.
                  target={isWhatsApp ? "_blank" : undefined}
                  rel={isWhatsApp ? "noopener noreferrer" : undefined}
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
