"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const SECONDS_PER_PHOTO = 1;

export function GalleryCarousel({ images }: { images: string[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  // Touch drag state — refs avoid re-renders during gesture
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartTranslate = useRef(0);

  function getTranslateX(el: HTMLElement): number {
    return new DOMMatrix(getComputedStyle(el).transform).m41;
  }

  // Attach touchmove as non-passive so we can preventDefault (stops page scroll)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function onTouchMove(e: TouchEvent) {
      if (!isDragging.current || !track) return;
      e.preventDefault();
      const delta = e.touches[0].clientX - dragStartX.current;
      track.style.transform = `translateX(${dragStartTranslate.current + delta}px)`;
    }

    track.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => track.removeEventListener("touchmove", onTouchMove);
  }, []);

  if (images.length === 0) return null;

  // Duplicate for seamless loop: animation moves -50% = exactly one full set width
  const looped = [...images, ...images];
  const duration = `${images.length * SECONDS_PER_PHOTO}s`;

  function handleTouchStart(e: React.TouchEvent) {
    const track = trackRef.current;
    if (!track) return;
    isDragging.current = true;
    dragStartX.current = e.touches[0].clientX;
    dragStartTranslate.current = getTranslateX(track);
    // Freeze animation at current position
    track.style.animationPlayState = "paused";
    track.style.transform = `translateX(${dragStartTranslate.current}px)`;
  }

  function handleTouchEnd() {
    if (!isDragging.current) return;
    isDragging.current = false;
    const track = trackRef.current;
    if (!track) return;

    // Convert current px offset back to an animation-delay that resumes seamlessly
    const currentX = getTranslateX(track);
    const halfWidth = track.scrollWidth / 2;
    const totalDurationMs = images.length * SECONDS_PER_PHOTO * 1000;

    // Normalize offset to [-halfWidth, 0]
    let normalized = currentX % halfWidth;
    if (normalized > 0) normalized -= halfWidth;

    const progress = Math.abs(normalized) / halfWidth;
    const delay = -(progress * totalDurationMs);

    track.style.transform = "";
    track.style.animationDelay = `${delay}ms`;
    track.style.animationPlayState = "running";
  }

  return (
    // Wrapper: full viewport width, fade edges, clip overflow
    <div
      className="mt-8 overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
      }}
    >
      <div
        ref={trackRef}
        className="gallery-carousel-track"
        style={{ animationDuration: duration }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {looped.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt={i < images.length ? `Galería DEFINE — foto ${i + 1}` : ""}
            aria-hidden={i >= images.length}
            width={400}
            height={280}
            className="gallery-carousel-img"
            sizes="400px"
            loading={i < 8 ? "eager" : "lazy"}
            draggable={false}
          />
        ))}
      </div>
    </div>
  );
}
