"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type NavItem = { href: string; label: string };

const MENU_ID = "menu-navegacion-movil";

export function MobileMenu({ items }: { items: NavItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      buttonRef.current?.focus();
    }

    function onPointerDown(event: PointerEvent) {
      if (containerRef.current?.contains(event.target as Node)) return;
      setIsOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isOpen}
        aria-controls={MENU_ID}
        onClick={() => setIsOpen((open) => !open)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-white text-ink-soft"
      >
        <span className="sr-only">Menú</span>
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path
            d={isOpen ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <div
        id={MENU_ID}
        hidden={!isOpen}
        className="absolute inset-x-0 top-full border-t border-line bg-surface-alt"
      >
        <nav aria-label="Navegación principal" className="mx-auto flex max-w-6xl flex-col px-4 py-3 sm:px-6">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="rounded-2xl px-3 py-3 text-sm font-medium text-ink-soft transition hover:bg-white/80"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
