import type { Metadata } from "next";
import { Lora, Nunito_Sans } from "next/font/google";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
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
  openGraph: {
    title:
      "Centro Psicopedagógico y de Desarrollo Integral DEFINE | Arahal y Alcalá de Guadaíra",
    description:
      "Psicopedagogía, psicología, logopedia, neuropsicología, atención temprana y apoyo a adultos con diversidad funcional en Arahal y Alcalá de Guadaíra. Evaluación, diagnóstico e intervención personalizada.",
    locale: "es_ES",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Centro Psicopedagógico y de Desarrollo Integral DEFINE | Arahal y Alcalá de Guadaíra",
    description:
      "Psicopedagogía, psicología, logopedia, neuropsicología, atención temprana y apoyo a adultos con diversidad funcional en Arahal y Alcalá de Guadaíra. Evaluación, diagnóstico e intervención personalizada.",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
