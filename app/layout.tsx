import type { Metadata } from "next";
import { Lora, Nunito_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

// El title y la description de búsqueda se mantienen dentro de lo que Google
// llega a mostrar (~60 y ~155 caracteres). Los de OpenGraph no tienen ese
// límite, así que conservan el nombre completo y el listado íntegro.
const SOCIAL_TITLE =
  "Centro Psicopedagógico y de Desarrollo Integral DEFINE | Arahal y Alcalá de Guadaíra";
const SOCIAL_DESCRIPTION =
  "Psicopedagogía, psicología, logopedia, neuropsicología, atención temprana y apoyo a adultos con diversidad funcional en Arahal y Alcalá de Guadaíra. Evaluación, diagnóstico e intervención personalizada.";

export const metadata: Metadata = {
  title: "Centro DEFINE | Psicología y Logopedia · Arahal y Alcalá",
  description:
    "Psicopedagogía, psicología, logopedia y neuropsicología en Arahal y Alcalá de Guadaíra. Evaluación, diagnóstico e intervención para niños y adultos.",
  keywords: [
    "centro psicopedagógico Arahal",
    "centro psicopedagógico Alcalá de Guadaíra",
    "logopedia Arahal",
    "psicología infantil Arahal",
    "atención temprana Arahal",
    "adultos con diversidad funcional",
    "autonomía personal",
    "estimulación cognitiva",
  ],
  metadataBase: new URL("https://www.centrodefine.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: SOCIAL_TITLE,
    description: SOCIAL_DESCRIPTION,
    locale: "es_ES",
    type: "website",
    url: "https://www.centrodefine.com",
    siteName: "DEFINE Centro Psicopedagógico",
    // La imagen la genera app/opengraph-image.tsx (1200 × 630).
  },
  twitter: {
    card: "summary_large_image",
    title: SOCIAL_TITLE,
    description: SOCIAL_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${nunitoSans.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-brand focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Saltar al contenido
        </a>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
