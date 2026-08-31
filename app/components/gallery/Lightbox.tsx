"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import type { GalleryPhoto } from "./photos";

type LightboxProps = {
  photos: GalleryPhoto[];
  openIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

/**
 * Visor a pantalla completa sobre <dialog>: el navegador ya se encarga del
 * fondo modal, del cierre con Escape y de retener el foco dentro del diálogo.
 */
export function Lightbox({ photos, openIndex, onClose, onNavigate }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isOpen = openIndex !== null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  useEffect(() => {
    if (openIndex === null) return;

    function onKeyDown(event: KeyboardEvent) {
      if (openIndex === null) return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        onNavigate((openIndex + 1) % photos.length);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        onNavigate((openIndex - 1 + photos.length) % photos.length);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openIndex, photos.length, onNavigate]);

  const photo = openIndex === null ? null : photos[openIndex];

  return (
    <dialog
      ref={dialogRef}
      aria-label="Foto ampliada"
      onClose={onClose}
      onClick={(event) => {
        // Clic en el fondo (el propio <dialog>, no su contenido) → cerrar.
        if (event.target === dialogRef.current) onClose();
      }}
      className="visor-foto m-auto p-4"
    >
      {photo ? (
        <div className="flex flex-col items-center gap-4">
          <Image
            src={photo.src}
            alt={photo.alt}
            width={1600}
            height={1200}
            sizes="92vw"
            className="h-auto max-h-[72dvh] w-auto max-w-full rounded-2xl object-contain"
          />

          <p className="max-w-2xl text-center text-sm leading-6 text-white">{photo.alt}</p>

          <div className="flex items-center gap-3">
            <LightboxButton
              label="Foto anterior"
              onClick={() => onNavigate((openIndex! - 1 + photos.length) % photos.length)}
            >
              <path d="M12.5 4 7 10l5.5 6" />
            </LightboxButton>

            <p className="min-w-16 text-center text-sm tabular-nums text-white/80">
              {openIndex! + 1} / {photos.length}
            </p>

            <LightboxButton
              label="Foto siguiente"
              onClick={() => onNavigate((openIndex! + 1) % photos.length)}
            >
              <path d="M7.5 4 13 10l-5.5 6" />
            </LightboxButton>

            <LightboxButton label="Cerrar la foto ampliada" onClick={onClose}>
              <path d="M5.5 5.5l9 9M14.5 5.5l-9 9" />
            </LightboxButton>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}

function LightboxButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white transition hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {children}
      </svg>
    </button>
  );
}
