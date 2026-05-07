import { FallbackImage } from "./FallbackImage";

export function Card({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-[0_18px_50px_-28px_rgba(44,74,67,0.35)] backdrop-blur ${className}`}>
      {children}
    </div>
  );
}

export function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-3 text-center">
      <span className="text-sm font-semibold uppercase tracking-[0.24em] text-eyebrow">{eyebrow}</span>
      <h2 className="font-serif text-3xl tracking-tight text-ink sm:text-4xl">{title}</h2>
      {description ? <p className="text-base leading-7 text-muted-strong sm:text-lg">{description}</p> : null}
    </div>
  );
}

export function PrimaryButton({ href, children, className = "", ariaLabel }: { href: string; children: React.ReactNode; className?: string; ariaLabel?: string }) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className={`inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-12px_rgba(47,109,99,0.8)] transition hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${className}`}
    >
      {children}
    </a>
  );
}

export function SecondaryButton({ href, children, className = "", ariaLabel }: { href: string; children: React.ReactNode; className?: string; ariaLabel?: string }) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className={`inline-flex min-h-12 items-center justify-center rounded-full border border-[#b5c8c1] bg-white/80 px-6 py-3 text-sm font-semibold text-ink-soft transition hover:border-[#90aca4] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${className}`}
    >
      {children}
    </a>
  );
}

export function ImageFrame({
  src,
  alt,
  className = "",
  overlayClassName = "",
  fallbackSrc,
  sizes,
}: {
  src: string;
  alt: string;
  className?: string;
  overlayClassName?: string;
  fallbackSrc?: string;
  sizes?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-[24px] ${className}`}>
      <FallbackImage
        src={src}
        fallbackSrc={fallbackSrc}
        alt={alt}
        fill
        sizes={sizes ?? "(min-width: 1024px) 50vw, 100vw"}
        className="object-cover"
      />
      <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${overlayClassName}`} />
    </div>
  );
}
