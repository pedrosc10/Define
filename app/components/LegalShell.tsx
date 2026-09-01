import Link from "next/link";

import { legalLastUpdated } from "../data/company";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { StickyMobileBar } from "./StickyMobileBar";

/** Marco común de las páginas legales: misma cabecera y pie que el resto. */
export function LegalShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <Header />

      <main id="contenido" className="bg-white text-ink-soft">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition hover:text-brand-hover"
          >
            <svg
              viewBox="0 0 20 20"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12.5 4 7 10l5.5 6" />
            </svg>
            Volver al inicio
          </Link>

          <h1 className="mt-6 font-serif text-3xl tracking-tight text-ink sm:text-4xl">{title}</h1>
          <p className="mt-3 text-sm text-muted">Última actualización: {legalLastUpdated}</p>

          <div className="texto-legal mt-10">{children}</div>
        </div>
      </main>

      <Footer />
      <StickyMobileBar />
    </>
  );
}

/** Aviso repetido en ambas páginas: son modelos, no asesoría jurídica. */
export function LegalDisclaimer() {
  return (
    <aside className="mt-12 rounded-[24px] border border-line-strong bg-surface-warm p-6">
      <h2 className="mt-0 font-serif text-xl text-ink">Sobre este texto</h2>
      <p>
        Este documento es un <strong>modelo estándar</strong> redactado a partir de la normativa
        española y europea vigente en materia de servicios de la sociedad de la información y de
        protección de datos. Recoge los datos reales del centro, pero{" "}
        <strong>no sustituye al asesoramiento jurídico</strong> de un profesional que conozca la
        actividad concreta, los tratamientos de datos que se realizan en consulta y los contratos con
        proveedores. Antes de darlo por definitivo conviene que lo revise un asesor legal.
      </p>
    </aside>
  );
}
