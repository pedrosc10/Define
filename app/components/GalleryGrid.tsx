"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const BLUR_PLACEHOLDER =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxIDEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNlZWY0ZjEiLz48L3N2Zz4=";

const DISPLAY_COUNT = 6;
const INTERVAL_MS = 3000;
const TRANSITION_MS = 400;

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type GalleryState = { visible: string[]; pool: string[] };
type Transition = { slotIndex: number; incoming: string } | null;

export function GalleryGrid({ images }: { images: string[] }) {
  const [gallery, setGallery] = useState<GalleryState>(() => {
    const shuffled = shuffleArray(images);
    const count = Math.min(DISPLAY_COUNT, shuffled.length);
    return { visible: shuffled.slice(0, count), pool: shuffled.slice(count) };
  });

  // Which slot is currently mid-crossfade
  const [transition, setTransition] = useState<Transition>(null);

  // Refs so the interval callback always sees fresh values
  const galleryRef = useRef(gallery);
  galleryRef.current = gallery;
  const isAnimating = useRef(false);
  const inViewport = useRef(true);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Pause rotation when the grid scrolls out of view
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { inViewport.current = entry.isIntersecting; },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Rotation interval — only active when pool has photos to swap
  useEffect(() => {
    if (images.length <= DISPLAY_COUNT) return;

    const tick = () => {
      if (isAnimating.current) return;
      if (!inViewport.current) return;
      if (prefersReducedMotion.current) return;

      const { visible, pool } = galleryRef.current;
      if (pool.length === 0) return;

      const slotIndex = Math.floor(Math.random() * visible.length);
      const poolIndex = Math.floor(Math.random() * pool.length);
      const incoming = pool[poolIndex];
      const outgoing = visible[slotIndex];

      isAnimating.current = true;

      // 1. Start crossfade: outgoing fades out, incoming overlays and fades in
      setTransition({ slotIndex, incoming });

      // 2. After transition: commit swap, remove overlay
      setTimeout(() => {
        setGallery((s) => {
          const newVisible = [...s.visible];
          newVisible[slotIndex] = incoming;
          // Remove incoming from pool, push outgoing back
          const newPool = s.pool.filter((p) => p !== incoming);
          newPool.push(outgoing);
          return { visible: newVisible, pool: newPool };
        });
        setTransition(null);
        isAnimating.current = false;
      }, TRANSITION_MS + 60); // +60ms buffer for CSS to settle
    };

    const id = setInterval(tick, INTERVAL_MS);
    return () => clearInterval(id);
  }, [images.length]);

  if (images.length === 0) {
    return (
      <p className="mt-10 px-4 text-center text-sm text-muted">
        Las fotos aparecerán aquí en cuanto se añadan a{" "}
        <code className="rounded bg-tint px-1.5 py-0.5 font-mono text-xs">
          /public/gallery/
        </code>
        .
      </p>
    );
  }

  return (
    <div ref={containerRef} className="mt-8">
      <div className="gallery-grid px-4 sm:px-6 lg:px-8">
        {gallery.visible.map((src, i) => {
          const isThisSlotTransitioning = transition?.slotIndex === i;

          return (
            // key by index (position), NOT by src — keeps the DOM node stable
            <div key={i} className="gallery-item">
              {/*
               * In-flow image: determines the container height.
               * Fades out when this slot is transitioning.
               * We do NOT change its src until the transition completes,
               * so the container height stays locked throughout.
               */}
              <Image
                src={src}
                alt={`Galería DEFINE — foto ${i + 1}`}
                width={0}
                height={0}
                sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: "8px",
                  opacity: isThisSlotTransitioning ? 0 : 1,
                  transition: `opacity ${TRANSITION_MS}ms ease`,
                }}
                loading={i < 6 ? "eager" : "lazy"}
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
              />

              {/*
               * Incoming image: absolutely positioned overlay, fades in via CSS
               * animation. Uses object-fit: cover to fill the slot while the
               * container height is still set by the outgoing image.
               */}
              {isThisSlotTransitioning && transition && (
                <img
                  src={transition.incoming}
                  alt=""
                  aria-hidden="true"
                  className="gallery-item-incoming"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
