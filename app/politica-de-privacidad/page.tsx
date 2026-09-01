import type { Metadata } from "next";
import Link from "next/link";

import { LegalDisclaimer, LegalShell } from "../components/LegalShell";
import { company } from "../data/company";

export const metadata: Metadata = {
  title: "Política de privacidad | Centro DEFINE",
  description:
    "Cómo trata el Centro DEFINE los datos personales facilitados a través de centrodefine.com, conforme al RGPD y la LOPDGDD.",
  alternates: { canonical: "/politica-de-privacidad" },
};

export default function PoliticaDePrivacidad() {
  return (
    <LegalShell title="Política de privacidad">
      <h2>1. Responsable del tratamiento</h2>
      <dl className="datos-identificativos">
        <dt>Responsable</dt>
        <dd>
          {company.legalName} (CIF {company.taxId})
        </dd>
        <dt>Domicilio</dt>
        <dd>{company.address}</dd>
        <dt>Correo electrónico</dt>
        <dd>
          <a href={`mailto:${company.email}`}>{company.email}</a>
        </dd>
      </dl>

      <h2>2. Alcance de esta política</h2>
      <p>
        Esta política se refiere <strong>a los datos que se recogen a través de este sitio web</strong>:
        el formulario de contacto y las comunicaciones que se inician desde él. El tratamiento de los
        datos de las personas usuarias del centro —incluidos los datos de salud recabados en la
        valoración y la intervención— se rige por la información específica que se entrega y firma al
        inicio de la atención, y no por este documento.
      </p>

      <h2>3. Qué datos tratamos y con qué finalidad</h2>
      <p>
        A través del formulario de contacto se solicitan un nombre, un medio de contacto (correo
        electrónico o teléfono), la sede preferida y el mensaje que la persona quiera escribir. La
        única finalidad es <strong>atender la consulta planteada</strong> y, en su caso, concertar una
        primera cita de valoración.
      </p>
      <p>
        Se pide expresamente <strong>no incluir en el mensaje datos de salud ni información
        clínica</strong>: para eso está la primera cita, en un canal adecuado y con las garantías
        oportunas.
      </p>
      <p>
        Si el contacto se produce por teléfono, WhatsApp o correo electrónico, se tratarán únicamente
        los datos que la propia persona facilite en esa comunicación y con esa misma finalidad.
      </p>

      <h2>4. Base jurídica</h2>
      <p>
        La base que legitima el tratamiento es el <strong>consentimiento</strong> de la persona
        interesada (artículo 6.1.a del RGPD), que se recaba de forma expresa mediante la casilla de
        aceptación del formulario. Ese consentimiento puede retirarse en cualquier momento, sin que
        ello afecte a la licitud del tratamiento previo a su retirada.
      </p>

      <h2>5. Plazo de conservación</h2>
      <p>
        Los datos se conservarán el tiempo necesario para atender la solicitud y, después, durante los
        plazos legalmente exigibles para atender posibles responsabilidades. Si la consulta no deriva
        en una relación de servicio, se suprimirán una vez resuelta.
      </p>

      <h2>6. Destinatarios y proveedores</h2>
      <p>
        No se ceden datos a terceros, salvo obligación legal. Para el funcionamiento del sitio se
        utilizan los siguientes proveedores, que actúan como encargados del tratamiento:
      </p>
      <ul>
        <li>
          <strong>Vercel Inc.</strong> — alojamiento del sitio web y medición de audiencia agregada
          sin cookies.
        </li>
        <li>
          <strong>Web3Forms</strong> — envío de los mensajes del formulario de contacto al correo del
          centro.
        </li>
      </ul>
      <p>
        Algunos de estos proveedores están ubicados fuera del Espacio Económico Europeo. En esos
        casos, las transferencias internacionales se amparan en las garantías previstas en el capítulo
        V del RGPD, como las cláusulas contractuales tipo aprobadas por la Comisión Europea.
      </p>

      <h2>7. Cookies</h2>
      <p>
        <strong>Este sitio no instala cookies propias ni de terceros con fines publicitarios o de
        seguimiento.</strong> La herramienta de analítica utilizada mide visitas de forma agregada y
        sin cookies, por lo que no identifica a personas concretas ni permite elaborar perfiles. Por
        ese motivo no se muestra banner de consentimiento de cookies: no hay consentimiento que
        recabar.
      </p>

      <h2>8. Datos de menores</h2>
      <p>
        Buena parte de la actividad del centro se dirige a menores de edad. Cualquier dato relativo a
        un menor que se facilite a través de esta web debe ser aportado{" "}
        <strong>por su padre, madre o tutor legal</strong>, que es quien presta el consentimiento en su
        nombre.
      </p>

      <h2>9. Imágenes publicadas en la web</h2>
      <p>
        Las fotografías de la galería muestran instalaciones y momentos reales del centro. Se publican
        con el consentimiento expreso de las personas que aparecen en ellas o, cuando son menores, de
        sus padres o tutores legales. Cualquiera de ellos puede solicitar en cualquier momento la
        retirada de una imagen escribiendo a{" "}
        <a href={`mailto:${company.email}`}>{company.email}</a>, y se atenderá sin demora.
      </p>

      <h2>10. Derechos de las personas interesadas</h2>
      <p>
        Puedes ejercer los derechos de <strong>acceso, rectificación, supresión, oposición,
        limitación del tratamiento y portabilidad</strong>, así como retirar el consentimiento
        prestado, escribiendo a <a href={`mailto:${company.email}`}>{company.email}</a> o por correo
        postal a {company.address}, indicando el derecho que deseas ejercer y adjuntando copia de un
        documento que acredite tu identidad.
      </p>
      <p>
        Si consideras que el tratamiento no se ajusta a la normativa, puedes presentar una reclamación
        ante la <strong>Agencia Española de Protección de Datos</strong> (
        <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">
          www.aepd.es
        </a>
        ).
      </p>

      <h2>11. Seguridad</h2>
      <p>
        Se aplican las medidas técnicas y organizativas necesarias para garantizar la seguridad de los
        datos y evitar su alteración, pérdida o acceso no autorizado. La comunicación con este sitio
        web se realiza siempre cifrada mediante HTTPS.
      </p>

      <h2>12. Cambios en esta política</h2>
      <p>
        Esta política puede actualizarse para adaptarse a novedades normativas o a cambios en el
        funcionamiento del sitio. La fecha que figura al principio indica la última revisión.
      </p>

      <p>
        Para las condiciones de uso del sitio, consulta el{" "}
        <Link href="/aviso-legal">aviso legal</Link>.
      </p>

      <LegalDisclaimer />
    </LegalShell>
  );
}
