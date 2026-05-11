"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const SECONDS_PER_PHOTO = 1;
const DRAG_SENSITIVITY = 3;

export function GalleryCarousel({ images }: { images: string[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartTime = useRef(0); // animation currentTime at drag start (ms)

  function getAnimation(track: HTMLDivElement): Animation | null {
    return track.getAnimations()[0] ?? null;
  }

  function pixelToTime(pixelX: number, halfWidth: number, totalDurationMs: number): number {
    // Animation: time 0 → translateX(0), time totalDurationMs → translateX(-halfWidth)
    // pixelX is negative (moving left), so progress = -pixelX / halfWidth
    let normalized = (-pixelX) % halfWidth;
    if (normalized < 0) normalized += halfWidth;
    return (normalized / halfWidth) * totalDurationMs;
  }

  function freezeTrack(track: HTMLDivElement, clientX: number) {
    isDragging.current = true;
    dragStartX.current = clientX;
    const anim = getAnimation(track);
    if (!anim) return;
    // Save current animation time before pausing
    dragStartTime.current = (anim.currentTime as number) ?? 0;
    anim.pause();
  }

  function moveTrack(track: HTMLDivElement, clientX: number) {
    const anim = getAnimation(track);
    if (!anim) return;

    const delta = clientX - dragStartX.current;
    const halfWidth = track.scrollWidth / 2;
    const totalDurationMs = images.length * SECONDS_PER_PHOTO * 1000;

    const timeDelta = -(delta / halfWidth) * totalDurationMs * DRAG_SENSITIVITY;
    let newTime = (dragStartTime.current + timeDelta) % totalDurationMs;
    if (newTime < 0) newTime += totalDurationMs;

    anim.currentTime = newTime;
  }

  function resumeTrack(track: HTMLDivElement) {
    isDragging.current = false;
    getAnimation(track)?.play();
  }

  // Non-passive touchmove so we can preventDefault and block page scroll while swiping
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function onTouchMove(e: TouchEvent) {
      if (!isDragging.current || !track) return;
      e.preventDefault();
      moveTrack(track, e.touches[0].clientX);
    }

    track.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => track.removeEventListener("touchmove", onTouchMove);
  }, []);

  // Mouse drag — listeners on document so drag continues if cursor leaves the track
  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      const track = trackRef.current;
      if (!isDragging.current || !track) return;
      moveTrack(track, e.clientX);
    }

    function onMouseUp() {
      const track = trackRef.current;
      if (!isDragging.current || !track) return;
      resumeTrack(track);
      track.style.cursor = "grab";
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  if (images.length === 0) return null;

  const looped = [...images, ...images];
  const duration = `${images.length * SECONDS_PER_PHOTO}s`;

  function handleTouchStart(e: React.TouchEvent) {
    const track = trackRef.current;
    if (!track) return;
    freezeTrack(track, e.touches[0].clientX);
  }

  function handleTouchEnd() {
    const track = trackRef.current;
    if (!isDragging.current || !track) return;
    resumeTrack(track);
  }

  function handleMouseDown(e: React.MouseEvent) {
    const track = trackRef.current;
    if (!track) return;
    e.preventDefault();
    freezeTrack(track, e.clientX);
    track.style.cursor = "grabbing";
  }

  return (
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
        style={{ animationDuration: duration, cursor: "grab" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
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
