import { faqs } from "./data/faqs";
import { locations, openingDays, openingHours, socialProfiles } from "./data/locations";
import { isAvailableAt, tabs } from "./data/services";

const SITE_URL = "https://www.centrodefine.com";
const ORGANIZATION_ID = `${SITE_URL}/#organizacion`;
const WEBSITE_ID = `${SITE_URL}/#web`;

const LEGAL_NAME = "Centro Psicopedagógico y de Desarrollo Integral DEFINE";
const EMAIL = "define@centrodefine.com";

const openingHoursSpecification = openingHours.map((range) => ({
  "@type": "OpeningHoursSpecification",
  dayOfWeek: openingDays,
  opens: range.opens,
  closes: range.closes,
}));

// Un servicio por cada especialidad publicada en la sección de servicios.
const allServices = tabs.flatMap((tab) =>
  tab.services.map((service) => ({
    item: service,
    schema: {
      "@type": "MedicalTherapy",
      name: service.title,
      description: service.description,
      audience: { "@type": "Audience", audienceType: tab.label },
    },
  })),
);

const availableService = allServices.map((entry) => entry.schema);

const departments = locations.map((location) => ({
  "@type": "MedicalBusiness",
  "@id": `${SITE_URL}/#${location.id}`,
  name: `DEFINE ${location.city}`,
  parentOrganization: { "@id": ORGANIZATION_ID },
  url: `${SITE_URL}/#centros`,
  telephone: location.phoneHref.replace("tel:", ""),
  email: EMAIL,
  image: `${SITE_URL}/gallery/sala-de-espera-centro-define.jpg`,
  hasMap: location.mapHref,
  sameAs: socialProfiles,
  address: {
    "@type": "PostalAddress",
    streetAddress: location.address,
    postalCode: location.postalCode,
    addressLocality: location.city,
    addressRegion: "Sevilla",
    addressCountry: "ES",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: location.geo.latitude,
    longitude: location.geo.longitude,
  },
  areaServed: { "@type": "City", name: location.city },
  // No todas las sedes prestan todos los servicios.
  availableService: allServices
    .filter((entry) => isAvailableAt(entry.item, location.id))
    .map((entry) => entry.schema),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: location.rating.value,
    reviewCount: location.rating.count,
    bestRating: 5,
    worstRating: 1,
  },
  openingHoursSpecification,
}));

const faqPage = {
  "@type": "FAQPage",
  "@id": `${SITE_URL}/#faq`,
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalBusiness",
      "@id": ORGANIZATION_ID,
      name: LEGAL_NAME,
      alternateName: "Centro DEFINE",
      url: SITE_URL,
      email: EMAIL,
      telephone: "+34622671219",
      logo: `${SITE_URL}/logo.png`,
      image: `${SITE_URL}/logo.png`,
      description:
        "Centro de psicopedagogía, psicología, logopedia y neuropsicología en Arahal y Alcalá de Guadaíra. Evaluación, diagnóstico e intervención personalizada para niños, adolescentes, adultos y familias.",
      sameAs: socialProfiles,
      areaServed: locations.map((location) => ({ "@type": "City", name: location.city })),
      openingHoursSpecification,
      availableService,
      department: departments,
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: "DEFINE Centro Psicopedagógico",
      inLanguage: "es-ES",
      publisher: { "@id": ORGANIZATION_ID },
    },
    faqPage,
  ],
};
