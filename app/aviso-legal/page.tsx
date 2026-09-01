import type { Metadata } from "next";
import Link from "next/link";

import { LegalDisclaimer, LegalShell } from "../components/LegalShell";
import { company } from "../data/company";

export const metadata: Metadata = {
  title: "Aviso legal | Centro DEFINE",
  description:
    "Datos identificativos del titular de centrodefine.com y condiciones de uso del sitio web.",
  alternates: { canonical: "/aviso-legal" },
};

export default function AvisoLegal() {
  return (
    <LegalShell title="Aviso legal">
      <h2>1. Datos identificativos</h2>
      <p>
        En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de servicios de la sociedad
        de la información y de comercio electrónico (LSSI-CE), se facilitan los siguientes datos del
        titular de este sitio web:
      </p>
      <dl className="datos-identificativos">
        <dt>Razón social</dt>
        <dd>{company.legalName}</dd>
        <dt>Nombre comercial</dt>
        <dd>{company.tradeName}</dd>
        <dt>CIF</dt>
        <dd>{company.taxId}</dd>
        <dt>Forma jurídica</dt>
        <dd>{company.legalForm}</dd>
        <dt>Actividad</dt>
        <dd>{company.activity}</dd>
        <dt>Domicilio</dt>
        <dd>{company.address}</dd>
        <dt>Correo electrónico</dt>
        <dd>
          <a href={`mailto:${company.email}`}>{company.email}</a>
        </dd>
        <dt>Sitio web</dt>
        <dd>{company.website}</dd>
      </dl>

      <p>
        Las profesionales sanitarias del centro se encuentran colegiadas con los siguientes números:
      </p>
      <ul>
        {company.registrations.map((registration) => (
          <li key={registration}>{registration}</li>
        ))}
      </ul>

      <h2>2. Objeto</h2>
      <p>
        El presente aviso legal regula el acceso, la navegación y el uso de este sitio web. La
        navegación por él atribuye la condición de usuario e implica la aceptación plena de estas
        condiciones en la versión publicada en el momento del acceso. El titular se reserva el derecho
        a modificarlas en cualquier momento, por lo que se recomienda revisarlas periódicamente.
      </p>

      <h2>3. Condiciones de uso</h2>
      <p>
        El usuario se compromete a hacer un uso diligente del sitio web y de la información contenida
        en él, conforme a la ley, a la buena fe y al orden público. En particular, se compromete a no
        emplearlo con fines ilícitos, lesivos de derechos de terceros o que puedan dañar, sobrecargar
        o impedir la normal utilización del sitio.
      </p>
      <p>
        La información publicada tiene <strong>carácter divulgativo y orientativo</strong>. No
        constituye diagnóstico, tratamiento ni recomendación clínica alguna, y en ningún caso
        sustituye la valoración profesional individualizada, que requiere consulta presencial.
      </p>

      <h2>4. Propiedad intelectual e industrial</h2>
      <p>
        Los contenidos de este sitio —textos, fotografías, logotipos, diseño gráfico y código
        fuente— son titularidad del centro o de terceros que han autorizado su uso, y están
        protegidos por la normativa de propiedad intelectual e industrial. Queda prohibida su
        reproducción, distribución, comunicación pública o transformación sin autorización expresa y
        por escrito del titular, salvo los usos permitidos por la ley.
      </p>

      <h2>5. Responsabilidad</h2>
      <p>
        El titular procura que la información publicada sea exacta y esté actualizada, pero no puede
        garantizar la ausencia de errores ni la disponibilidad ininterrumpida del sitio. No se
        responsabiliza de los daños que pudieran derivarse del uso de la información contenida en él,
        ni de las interrupciones del servicio ajenas a su control.
      </p>

      <h2>6. Enlaces a sitios de terceros</h2>
      <p>
        Este sitio incluye enlaces a servicios de terceros —fichas de Google Business, WhatsApp y
        perfiles en redes sociales— cuyo único objeto es facilitar el contacto y el acceso a
        información complementaria. El titular no controla dichos sitios ni se hace responsable de sus
        contenidos ni de sus políticas de privacidad.
      </p>

      <h2>7. Protección de datos</h2>
      <p>
        El tratamiento de los datos personales facilitados a través de este sitio se rige por la{" "}
        <Link href="/politica-de-privacidad">política de privacidad</Link>.
      </p>

      <h2>8. Legislación aplicable y jurisdicción</h2>
      <p>
        Estas condiciones se rigen por la legislación española. Para la resolución de cualquier
        controversia derivada del acceso o uso del sitio web, las partes se someten a los juzgados y
        tribunales que resulten competentes conforme a la normativa vigente.
      </p>

      <LegalDisclaimer />
    </LegalShell>
  );
}
