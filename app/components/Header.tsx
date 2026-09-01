"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { MobileMenu } from "./MobileMenu";
import { SedeCta } from "./SedeCta";

const navItems = [
  { href: "/#servicios", label: "Servicios" },
  { href: "/#como-trabajamos", label: "Cómo trabajamos" },
  { href: "/#faq", label: "Preguntas" },
  { href: "/#centros", label: "Centros" },
  { href: "/#contacto", label: "Contacto" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 border-b border-line/80 bg-surface-alt/88 backdrop-blur transition-shadow duration-200 ${
        scrolled ? "shadow-[0_4px_24px_-8px_rgba(44,74,67,0.22)]" : ""
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center" aria-label="Inicio DEFINE">
          <Image
            src="/logo.png"
            alt="DEFINE"
            width={1718}
            height={361}
            preload
            sizes="(min-width: 640px) 267px, 228px"
            className="h-12 w-auto object-contain sm:h-14"
          />
        </Link>

        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-6 text-sm font-medium text-muted-strong lg:flex">
            {navItems.map((item) => (
              <Link key={item.href} className="transition hover:text-ink" href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          <SedeCta
            channel="telefono"
            origin="cabecera"
            variant="plain"
            className="hidden items-center gap-1.5 text-sm font-semibold text-ink-soft transition hover:text-brand md:flex"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.95-.94a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
            </svg>
            Llamar
          </SedeCta>

          <div className="hidden md:flex">
            <SedeCta channel="whatsapp" origin="cabecera" className="min-h-10 px-4 py-2 text-xs sm:text-sm">
              Reservar consulta
            </SedeCta>
          </div>

          <MobileMenu items={navItems} />
        </div>
      </div>
    </header>
  );
}
