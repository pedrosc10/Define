import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { StickyMobileBar } from "./components/StickyMobileBar";
import { Contact } from "./components/sections/Contact";
import { Faqs } from "./components/sections/Faqs";
import { Hero } from "./components/sections/Hero";
import { Locations } from "./components/sections/Locations";
import { PhotoGallery } from "./components/sections/PhotoGallery";
import { Process } from "./components/sections/Process";
import { Quote } from "./components/sections/Quote";
import { ServiceTabs } from "./components/sections/ServiceTabs";
import { SocialProof } from "./components/sections/SocialProof";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [{
    "@type": "MedicalBusiness",
    "@id": "https://www.centrodefine.com/#define",
    name: "Centro Psicopedagógico y de Desarrollo Integral DEFINE",
    url: "https://www.centrodefine.com",
    email: "define@centrodefine.com",
    telephone: "+34 622 67 12 19",
    areaServed: ["Arahal", "Alcalá de Guadaíra"],
    department: [
      { "@type": "MedicalBusiness", name: "DEFINE Arahal", telephone: "+34 622 67 12 19", address: { "@type": "PostalAddress", streetAddress: "C/ Alondra, 38 - local B", addressLocality: "Arahal", addressCountry: "ES" } },
      { "@type": "MedicalBusiness", name: "DEFINE Alcalá de Guadaíra", telephone: "+34 722 41 33 78", address: { "@type": "PostalAddress", streetAddress: "C/ Bailén, 46", addressLocality: "Alcalá de Guadaíra", addressCountry: "ES" } },
    ],
  }],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      {/* 1 — Navegación */}
      <Header />

      {/*
       * Header, Footer y StickyMobileBar quedan FUERA de <main>: <header> solo
       * expone el landmark "banner" y <footer> el landmark "contentinfo"
       * cuando su ancestro más cercano es <body>.
       */}
      <main id="contenido" className="bg-white text-ink-soft">
        {/* 2 — Hero emocional */}
        <Hero />

        {/* 3 — Franja de prueba social */}
        <SocialProof />

        {/* 4 — Servicios en tabs */}
        <ServiceTabs />

        {/* 5 — Cómo trabajamos */}
        <Process />

        {/* 6 — Galería de fotos */}
        <PhotoGallery />

        {/* 7 — Cita destacada (sección oscura de marca) */}
        <Quote />

        {/* 8 — FAQ acordeón */}
        <Faqs />

        {/* 9 — Nuestros centros */}
        <Locations />

        {/* 10 — CTA final */}
        <Contact />
      </main>

      <Footer />
      <StickyMobileBar />
    </>
  );
}
