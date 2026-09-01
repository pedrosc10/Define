import { ContactForm } from "../ContactForm";
import { SedeCta } from "../SedeCta";

// Clave pública de Web3Forms. Mientras no esté configurada, el formulario no se
// muestra y la sección funciona igual que antes, con WhatsApp y teléfono.
const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

export function Contact() {
  return (
    <section id="contacto" className="scroll-mt-28 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[32px] bg-[linear-gradient(135deg,#f6fbf8_0%,#edf4ef_100%)] p-8 shadow-[0_18px_50px_-28px_rgba(44,74,67,0.3)] sm:p-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-eyebrow">
                Da el primer paso hoy
              </p>
              <h2 className="mt-3 font-serif text-3xl tracking-tight text-ink sm:text-4xl lg:text-[2.5rem]">
                Cuéntanos tu caso y encontramos el mejor camino juntos.
              </h2>
              <p className="mt-4 text-base leading-7 text-muted-strong">
                Escríbenos o llámanos desde Arahal o Alcalá de Guadaíra. Respondemos con cercanía y sin compromiso.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <SedeCta channel="whatsapp" origin="contacto" className="w-full sm:w-auto">
                Reserva tu primera consulta
              </SedeCta>
              <SedeCta channel="telefono" origin="contacto" variant="secondary" className="w-full sm:w-auto">
                Llamar ahora
              </SedeCta>
            </div>
          </div>
        </div>

        {web3formsKey ? (
          <div className="mx-auto mt-8 max-w-2xl rounded-[32px] border border-line bg-white p-8 shadow-[0_18px_50px_-28px_rgba(44,74,67,0.3)] sm:p-10">
            <h3 className="font-serif text-2xl tracking-tight text-ink">
              ¿Prefieres que te escribamos nosotros?
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              Déjanos tus datos y te respondemos sin compromiso. Si no te apetece llamar o escribir
              por WhatsApp en un primer contacto, este es tu sitio.
            </p>

            <ContactForm accessKey={web3formsKey} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
