import Image from "next/image";
import Link from "next/link";

import { socialProfiles } from "../data/locations";
import { CtaLink } from "./CtaLink";

const socialLinks = [
  { name: "Facebook", href: socialProfiles[0] },
  { name: "Instagram", href: socialProfiles[1] },
] as const;

function SocialIcon({ name }: { name: (typeof socialLinks)[number]["name"] }) {
  if (name === "Facebook") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      aria-hidden="true"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.1" cy="6.9" r="1.05" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footer() {
  return (
    // pb-24 deja hueco para la StickyMobileBar fija; desaparece cuando la barra
    // deja de mostrarse.
    <footer className="border-t border-line bg-white/70 pb-24 lg:pb-0">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 lg:px-8 xl:grid-cols-4">
        <div>
          <p className="font-serif text-2xl text-ink">DEFINE</p>
          <p className="mt-3 text-sm leading-7 text-muted">
            Evaluación, diagnóstico e intervención personalizada en Arahal y Alcalá de Guadaíra.
          </p>

          <ul className="mt-4 flex gap-2">
            {socialLinks.map((social) => (
              <li key={social.href}>
                <CtaLink
                  href={social.href}
                  origin="pie"
                  ariaLabel={`DEFINE en ${social.name}`}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-ink-soft transition hover:border-control-hover hover:text-brand"
                >
                  <SocialIcon name={social.name} />
                </CtaLink>
              </li>
            ))}
          </ul>
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
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-eyebrow">Legal</p>
          <ul className="mt-3 space-y-1 text-sm leading-7 text-muted">
            <li>
              <Link href="/aviso-legal" className="transition hover:text-brand">
                Aviso legal
              </Link>
            </li>
            <li>
              <Link href="/politica-de-privacidad" className="transition hover:text-brand">
                Política de privacidad
              </Link>
            </li>
          </ul>
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
