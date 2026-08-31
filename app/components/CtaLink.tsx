"use client";

import { track } from "@vercel/analytics";

/** Dónde está el enlace dentro de la página, para poder comparar en analítica. */
export type CtaOrigin =
  | "cabecera"
  | "hero"
  | "centros"
  | "contacto"
  | "barra-movil"
  | "pie"
  | "error-404";

function actionFor(href: string) {
  if (href.startsWith("https://wa.me")) return "whatsapp";
  if (href.startsWith("tel:")) return "telefono";
  if (href.startsWith("mailto:")) return "email";
  if (href.includes("maps.google")) return "mapa";
  return "enlace";
}

type CtaLinkProps = {
  href: string;
  origin: CtaOrigin;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
};

/**
 * Enlace de llamada a la acción. Abre los destinos externos en otra pestaña
 * (si no, WhatsApp Web se lleva la pestaña de la web) y registra el clic, que
 * es la única conversión medible de esta landing.
 */
export function CtaLink({ href, origin, children, className = "", ariaLabel }: CtaLinkProps) {
  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className={className}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      onClick={() => track("cta", { accion: actionFor(href), origen: origin })}
    >
      {children}
    </a>
  );
}
