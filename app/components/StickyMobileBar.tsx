import { PrimaryButton, SecondaryButton } from "./ui";

export function StickyMobileBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 px-4 py-3 shadow-[0_-10px_30px_-20px_rgba(44,74,67,0.45)] backdrop-blur lg:hidden"
      // Evita que la barra de gestos del iPhone tape los botones.
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto flex max-w-6xl gap-3">
        <SecondaryButton href="tel:+34622671219" ariaLabel="Llamar por teléfono a DEFINE" className="flex-1">
          Llamar
        </SecondaryButton>
        <PrimaryButton href="https://wa.me/34622671219" ariaLabel="Escribir por WhatsApp a DEFINE" className="flex-1">
          WhatsApp
        </PrimaryButton>
      </div>
    </div>
  );
}
