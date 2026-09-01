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
import { Testimonials } from "./components/sections/Testimonials";
import { structuredData } from "./structured-data";

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

        {/* 8 — Testimonios de familias */}
        <Testimonials />

        {/* 9 — FAQ acordeón */}
        <Faqs />

        {/* 10 — Nuestros centros */}
        <Locations />

        {/* 11 — CTA final */}
        <Contact />
      </main>

      <Footer />
      <StickyMobileBar />
    </>
  );
}
