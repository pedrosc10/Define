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

export const metadata: Metadata = {
  title:
    "Centro Psicopedagógico y de Desarrollo Integral DEFINE | Arahal y Alcalá de Guadaíra",
  description:
    "Psicopedagogía, psicología, logopedia, neuropsicología, atención temprana y apoyo a adultos con diversidad funcional en Arahal y Alcalá de Guadaíra. Evaluación, diagnóstico e intervención personalizada.",
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
    title:
      "Centro Psicopedagógico y de Desarrollo Integral DEFINE | Arahal y Alcalá de Guadaíra",
    description:
      "Psicopedagogía, psicología, logopedia, neuropsicología, atención temprana y apoyo a adultos con diversidad funcional en Arahal y Alcalá de Guadaíra. Evaluación, diagnóstico e intervención personalizada.",
    locale: "es_ES",
    type: "website",
    url: "https://www.centrodefine.com",
    siteName: "DEFINE Centro Psicopedagógico",
    images: [
      {
        url: "/logo.png",
        width: 1718,
        height: 361,
        alt: "DEFINE — Centro Psicopedagógico y de Desarrollo Integral",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Centro Psicopedagógico y de Desarrollo Integral DEFINE | Arahal y Alcalá de Guadaíra",
    description:
      "Psicopedagogía, psicología, logopedia, neuropsicología, atención temprana y apoyo a adultos con diversidad funcional en Arahal y Alcalá de Guadaíra. Evaluación, diagnóstico e intervención personalizada.",
    images: ["/logo.png"],
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
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
