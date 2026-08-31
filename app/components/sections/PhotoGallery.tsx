import { PhotoCarousel } from "../gallery/PhotoCarousel";
import { galleryPhotos } from "../gallery/photos";
import { SectionHeading } from "../ui";

export function PhotoGallery() {
  if (galleryPhotos.length === 0) return null;

  return (
    <section id="galeria" className="scroll-mt-28 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Galería"
          title="Nuestros espacios y momentos"
          description="Instalaciones adaptadas y momentos reales de intervención en nuestros centros de Arahal y Alcalá de Guadaíra."
        />
      </div>
      <PhotoCarousel photos={galleryPhotos} />
    </section>
  );
}
