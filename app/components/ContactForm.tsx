"use client";

import { track } from "@vercel/analytics";
import Link from "next/link";
import { useId, useRef, useState } from "react";

import { locations } from "../data/locations";

type Estado = "inactivo" | "enviando" | "enviado" | "error";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const campoClass =
  "w-full rounded-2xl border border-line-strong bg-white px-4 py-3 text-sm text-ink placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

const etiquetaClass = "block text-sm font-semibold text-ink-soft";

export function ContactForm({ accessKey }: { accessKey: string }) {
  const [estado, setEstado] = useState<Estado>("inactivo");
  const avisoRef = useRef<HTMLParagraphElement>(null);
  const id = useId();

  const idNombre = `nombre-${id}`;
  const idContacto = `contacto-${id}`;
  const idSede = `sede-${id}`;
  const idMensaje = `mensaje-${id}`;
  const idConsentimiento = `consentimiento-${id}`;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formulario = event.currentTarget;
    setEstado("enviando");

    const datos = new FormData(formulario);
    datos.append("access_key", accessKey);
    datos.append("subject", "Nueva consulta desde centrodefine.com");
    datos.append("from_name", "Web de DEFINE");

    // Si el medio de contacto es un correo, se usa como Reply-To para poder
    // responder directamente desde el buzón.
    const contacto = String(datos.get("Email o teléfono") ?? "");
    if (contacto.includes("@")) datos.append("replyto", contacto);

    try {
      const respuesta = await fetch(WEB3FORMS_ENDPOINT, { method: "POST", body: datos });
      const resultado = await respuesta.json();
      if (!respuesta.ok || !resultado.success) throw new Error(resultado.message ?? "Error de envío");

      formulario.reset();
      setEstado("enviado");
      track("cta", { accion: "formulario", origen: "contacto" });
    } catch {
      setEstado("error");
    } finally {
      // El aviso es enfocable para llevar allí al usuario de teclado.
      requestAnimationFrame(() => avisoRef.current?.focus());
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 grid gap-5">
      {/* Señuelo antispam: invisible para las personas, tentador para los bots. */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div>
        <label htmlFor={idNombre} className={etiquetaClass}>
          Nombre
        </label>
        <input
          id={idNombre}
          name="Nombre"
          type="text"
          required
          autoComplete="name"
          placeholder="Cómo te llamas"
          className={`mt-2 ${campoClass}`}
        />
      </div>

      <div>
        <label htmlFor={idContacto} className={etiquetaClass}>
          Email o teléfono
        </label>
        <input
          id={idContacto}
          name="Email o teléfono"
          type="text"
          required
          autoComplete="email"
          placeholder="Para poder responderte"
          className={`mt-2 ${campoClass}`}
        />
      </div>

      <div>
        <label htmlFor={idSede} className={etiquetaClass}>
          Centro que te viene mejor
        </label>
        <select id={idSede} name="Centro" required defaultValue="" className={`mt-2 ${campoClass}`}>
          <option value="" disabled>
            Elige un centro
          </option>
          {locations.map((location) => (
            <option key={location.id} value={location.city}>
              {location.city}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={idMensaje} className={etiquetaClass}>
          Mensaje
        </label>
        <textarea
          id={idMensaje}
          name="Mensaje"
          required
          rows={5}
          placeholder="Cuéntanos brevemente en qué podemos ayudarte"
          className={`mt-2 resize-y ${campoClass}`}
        />
        <p className="mt-2 text-xs leading-5 text-muted">
          Por tu privacidad, no incluyas aquí datos de salud ni información clínica: los vemos en la
          primera cita.
        </p>
      </div>

      <div className="flex items-start gap-3">
        <input
          id={idConsentimiento}
          name="Consentimiento"
          type="checkbox"
          required
          value="Acepta la política de privacidad"
          className="mt-1 h-5 w-5 shrink-0 rounded border-line-strong text-brand accent-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        />
        <label htmlFor={idConsentimiento} className="text-sm leading-6 text-muted">
          He leído y acepto la{" "}
          <Link
            href="/politica-de-privacidad"
            className="font-semibold text-brand underline underline-offset-2 hover:text-brand-hover"
          >
            política de privacidad
          </Link>
          . Tus datos se usan solo para responderte.
        </label>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={estado === "enviando"}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-12px_rgba(47,109,99,0.8)] transition hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-60"
        >
          {estado === "enviando" ? "Enviando…" : "Enviar mensaje"}
        </button>

        <p
          ref={avisoRef}
          tabIndex={-1}
          role="status"
          aria-live="polite"
          className={`text-sm leading-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand ${
            estado === "error" ? "text-danger" : "text-brand"
          }`}
        >
          {estado === "enviado" &&
            "¡Mensaje enviado! Te respondemos lo antes posible por el medio que nos has indicado."}
          {estado === "error" &&
            "No hemos podido enviar el mensaje. Inténtalo de nuevo o escríbenos por WhatsApp."}
        </p>
      </div>
    </form>
  );
}
