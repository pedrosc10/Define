import { FallbackImage } from "../FallbackImage";
import { SectionHeading } from "../ui";

type GalleryImg = { src: string; alt: string; fallbackSrc: string };

const facilityImages: GalleryImg[] = [
  { src: "/galeria/instalaciones-1.jpg", alt: "Sala de intervención en DEFINE", fallbackSrc: "https://picsum.photos/seed/define-space-1/900/600" },
  { src: "/galeria/instalaciones-2.jpg", alt: "Espacio de trabajo terapéutico", fallbackSrc: "https://picsum.photos/seed/define-space-2/900/600" },
  { src: "/galeria/instalaciones-3.jpg", alt: "Centro DEFINE en Arahal", fallbackSrc: "https://picsum.photos/seed/define-space-3/900/600" },
  { src: "/galeria/instalaciones-4.jpg", alt: "Centro DEFINE en Alcalá de Guadaíra", fallbackSrc: "https://picsum.photos/seed/define-space-4/900/600" },
];

const activityImages: GalleryImg[] = [
  { src: "/galeria/actividad-1.jpg", alt: "Momento de intervención en DEFINE", fallbackSrc: "https://picsum.photos/seed/define-activity-1/900/600" },
  { src: "/galeria/actividad-2.jpg", alt: "Actividad terapéutica en el centro", fallbackSrc: "https://picsum.photos/seed/define-activity-2/900/600" },
  { src: "/galeria/actividad-3.jpg", alt: "Sesión de trabajo en DEFINE", fallbackSrc: "https://picsum.photos/seed/define-activity-3/900/600" },
  { src: "/galeria/actividad-4.jpg", alt: "Espacio de acompañamiento profesional", fallbackSrc: "https://picsum.photos/seed/define-activity-4/900/600" },
];

function MarqueeStrip({ images, direction }: { images: GalleryImg[]; direction: "left" | "right" }) {
  // Triple the array so the strip always covers the viewport before looping
  const strip = [...images, ...images, ...images];

  return (
    <div className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <div
        className={`flex w-max gap-4 ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        } group-hover:[animation-play-state:paused]`}
      >
        {strip.map((img, i) => (
          <div
            key={i}
            className="relative h-52 w-72 shrink-0 overflow-hidden rounded-2xl shadow-[0_8px_24px_-12px_rgba(44,74,67,0.25)] sm:h-60 sm:w-80"
          >
            <FallbackImage
              src={img.src}
              fallbackSrc={img.fallbackSrc}
              alt={img.alt}
              fill
              sizes="320px"
              className="object-cover transition duration-500 group-hover:scale-[1.02]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function GallerySection() {
  return (
    <section id="galeria" className="scroll-mt-28 overflow-hidden py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Así es DEFINE"
          title="Nuestros espacios y momentos de acompañamiento"
          description="Instalaciones adaptadas y momentos reales de intervención en nuestros centros de Arahal y Alcalá de Guadaíra."
        />
      </div>
      <div className="mt-10 space-y-4">
        <MarqueeStrip images={facilityImages} direction="left" />
        <MarqueeStrip images={activityImages} direction="right" />
      </div>
      <p className="mx-auto mt-8 max-w-3xl px-4 text-center text-sm leading-7 text-muted-soft sm:text-base">
        En DEFINE cuidamos tanto el entorno como la forma de acompañar a cada persona, creando espacios serenos, profesionales y adaptados a cada necesidad.
      </p>
    </section>
  );
}
