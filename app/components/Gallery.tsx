"use client";

import { useState } from "react";
import { FallbackImage } from "./FallbackImage";
import { Card, ImageFrame } from "./ui";

export type GalleryImage = {
  src: string;
  alt: string;
  label: string;
  fallbackSrc: string;
};

export function GalleryBlock({ title, intro, images }: { title: string; intro: string; images: GalleryImage[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = images[selectedIndex];

  return (
    <Card className="bg-surface p-5 sm:p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-ink">{title}</h3>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted sm:text-base">{intro}</p>
      </div>
      <ImageFrame
        src={selectedImage.src}
        fallbackSrc={selectedImage.fallbackSrc}
        alt={selectedImage.alt}
        className="aspect-[16/10] rounded-[24px] shadow-[0_24px_60px_-36px_rgba(44,74,67,0.45)]"
        overlayClassName="bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(24,50,45,0.12))]"
        sizes="(min-width: 1024px) 960px, 100vw"
      />
      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {images.map((image, index) => {
          const isActive = index === selectedIndex;

          return (
            <button
              key={image.label}
              type="button"
              onClick={() => setSelectedIndex(index)}
              aria-pressed={isActive}
              aria-label={`Mostrar ${image.label}`}
              className={`group overflow-hidden rounded-[22px] border bg-white text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${isActive ? "border-[#8fb1a7] ring-2 ring-[#dbe8e3]" : "border-[#e4ece8] hover:border-[#bfd2cc]"}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <FallbackImage
                  src={image.src}
                  fallbackSrc={image.fallbackSrc}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1280px) 240px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-300 group-hover:scale-[1.02]"
                />
              </div>
              <div className="px-4 py-3">
                <p className="text-sm font-medium text-ink-soft">{image.label}</p>
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
