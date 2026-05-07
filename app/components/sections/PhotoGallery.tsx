import { readdir } from "fs/promises";
import path from "path";

import { GalleryCarousel } from "../GalleryCarousel";
import { SectionHeading } from "../ui";

const SUPPORTED_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

async function getGalleryImages(): Promise<string[]> {
  const dir = path.join(process.cwd(), "public", "gallery");
  try {
    const files = await readdir(dir);
    return files
      .filter((f) => SUPPORTED_EXTS.has(path.extname(f).toLowerCase()))
      .sort(() => Math.random() - 0.5) // random order each build
      .map((f) => `/gallery/${f}`);
  } catch {
    return [];
  }
}

export async function PhotoGallery() {
  const images = await getGalleryImages();

  if (images.length === 0) return null;

  return (
    <section id="galeria" className="scroll-mt-28 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Galería"
          title="Nuestros espacios y momentos"
          description="Instalaciones adaptadas y momentos reales de intervención en nuestros centros de Arahal y Alcalá de Guadaíra."
        />
      </div>
      <GalleryCarousel images={images} />
    </section>
  );
}
