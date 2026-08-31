import Image from "next/image";

import { CtaLink } from "./CtaLink";

export function Footer() {
  return (
    // pb-24 deja hueco para la StickyMobileBar fija; desaparece cuando la barra
    // deja de mostrarse.
    <footer className="border-t border-line bg-white/70 pb-24 lg:pb-0">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 xl:grid-cols-3 lg:px-8">
        <div>
          <p className="font-serif text-2xl text-ink">DEFINE</p>
          <p className="mt-3 text-sm leading-7 text-muted">
            Evaluación, diagnóstico e intervención personalizada en Arahal y Alcalá de Guadaíra.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-eyebrow">Contacto</p>
          <p className="mt-3 text-sm leading-7 text-muted">
            Teléfono Arahal:{" "}
            <CtaLink href="tel:+34622671219" origin="pie" className="hover:text-brand" ariaLabel="Llamar al centro DEFINE de Arahal">
              622 67 12 19
            </CtaLink>
          </p>
          <p className="text-sm leading-7 text-muted">
            Teléfono Alcalá:{" "}
            <CtaLink href="tel:+34722413378" origin="pie" className="hover:text-brand" ariaLabel="Llamar al centro DEFINE de Alcalá de Guadaíra">
              722 41 33 78
            </CtaLink>
          </p>
          <p className="text-sm leading-7 text-muted">
            Email:{" "}
            <CtaLink href="mailto:define@centrodefine.com" origin="pie" className="hover:text-brand" ariaLabel="Enviar un correo a DEFINE">
              define@centrodefine.com
            </CtaLink>
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-eyebrow">Centros inscritos</p>
          <div className="mt-3 grid grid-cols-[auto_1fr] items-center gap-4">
            <Image
              src="/logo_junta_sin_blanco_big.jpg"
              alt="Logotipo de la Junta de Andalucía"
              width={1537}
              height={1145}
              sizes="120px"
              className="h-auto w-auto max-w-[120px] object-contain"
            />
            <div className="space-y-1 text-sm leading-7 text-muted">
              <p>Arahal Nº NICA: 52308</p>
              <p>Alcalá de Gdra. Nº NICA: 59133</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
