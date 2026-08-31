import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SedeCta } from "./components/SedeCta";

export const metadata: Metadata = {
  title: "Página no encontrada | Centro DEFINE",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="contenido" className="flex min-h-dvh flex-col items-center justify-center bg-white px-4 py-16 text-center">
      <Image
        src="/logo.png"
        alt="DEFINE — Centro Psicopedagógico y de Desarrollo Integral"
        width={1718}
        height={361}
        sizes="240px"
        className="h-14 w-auto object-contain"
      />

      <p className="mt-10 text-sm font-semibold uppercase tracking-[0.24em] text-eyebrow">Error 404</p>

      <h1 className="mt-3 font-serif text-3xl tracking-tight text-ink sm:text-4xl">
        No encontramos esta página
      </h1>

      <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-muted-strong">
        Puede que el enlace haya cambiado o que la dirección esté mal escrita. Desde aquí puedes volver
        al inicio o escribirnos directamente.
      </p>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <SedeCta channel="whatsapp" origin="error-404" className="w-full sm:w-auto">
          Escríbenos por WhatsApp
        </SedeCta>
        <SedeCta channel="telefono" origin="error-404" variant="secondary" className="w-full sm:w-auto">
          Llamar ahora
        </SedeCta>
      </div>

      <Link href="/" className="mt-8 text-sm font-semibold text-brand underline underline-offset-4 transition hover:text-brand-hover">
        Volver al inicio
      </Link>
    </main>
  );
}
