"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import type { GalleryPhoto } from "./photos";
import { Lightbox } from "./Lightbox";

// Rectángulo del color de fondo de marca: evita el hueco en blanco mientras
// carga cada foto.
const BLUR_PLACEHOLDER =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxIDEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNlY2Y0ZjEiLz48L3N2Zz4=";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function PhotoCarousel({ photos }: { photos: GalleryPhoto[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const syncScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const slide = track.firstElementChild as HTMLElement | null;
    if (!slide) return;

    const step = slide.offsetWidth + parseFloat(getComputedStyle(track).columnGap || "0");
    const index = Math.round(track.scrollLeft / step);

    setActiveIndex(Math.min(Math.max(index, 0), photos.length - 1));
    setAtStart(track.scrollLeft <= 1);
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 1);
  }, [photos.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(syncScrollState);
    };

    syncScrollState();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [syncScrollState]);

  function scrollBySlides(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;

    const slide = track.firstElementChild as HTMLElement | null;
    if (!slide) return;

    const step = slide.offsetWidth + parseFloat(getComputedStyle(track).columnGap || "0");
    track.scrollBy({
      left: step * direction,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }

  if (photos.length === 0) return null;

  return (
    <div
      role="group"
      aria-roledescription="carrusel"
      aria-label="Fotos de los centros DEFINE"
      className="mt-8"
    >
      <ul
        ref={trackRef}
        className="carrusel-pista mx-auto flex max-w-6xl snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 sm:scroll-px-6 sm:px-6 lg:scroll-px-8 lg:px-8"
      >
        {photos.map((photo, index) => (
          <li
            key={photo.src}
            className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[31%]"
            aria-label={`${index + 1} de ${photos.length}`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 78vw"
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
                loading={index < 3 ? "eager" : "lazy"}
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <span className="sr-only">Ampliar foto</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-5 flex max-w-6xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex gap-2">
          <CarouselButton label="Ver fotos anteriores" disabled={atStart} onClick={() => scrollBySlides(-1)}>
            <path d="M12.5 4 7 10l5.5 6" />
          </CarouselButton>
          <CarouselButton label="Ver más fotos" disabled={atEnd} onClick={() => scrollBySlides(1)}>
            <path d="M7.5 4 13 10l-5.5 6" />
          </CarouselButton>
        </div>

        {/* Barra de progreso: con 21 fotos, una fila de puntos sería ilegible. */}
        <div aria-hidden="true" className="h-1 flex-1 overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-brand transition-[width,margin] duration-300"
            style={{
              width: `${100 / photos.length}%`,
              marginInlineStart: `${(activeIndex * 100) / photos.length}%`,
            }}
          />
        </div>

        <p className="shrink-0 text-sm tabular-nums text-muted" aria-live="polite">
          <span className="sr-only">Foto </span>
          {activeIndex + 1} / {photos.length}
        </p>
      </div>

      <Lightbox photos={photos} openIndex={openIndex} onClose={() => setOpenIndex(null)} onNavigate={setOpenIndex} />
    </div>
  );
}

function CarouselButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-white text-ink-soft transition hover:border-accent hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line-strong disabled:hover:text-ink-soft"
    >
      <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {children}
      </svg>
    </button>
  );
}
