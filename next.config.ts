import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// next/font/google descarga y auto-hospeda las fuentes en build, así que en
// runtime no hay ninguna petición a Google: la CSP no necesita abrir
// fonts.googleapis.com ni fonts.gstatic.com.
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://va.vercel-scripts.com;
  style-src 'self' 'unsafe-inline';
  font-src 'self' data:;
  img-src 'self' blob: data:;
  connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com https://api.web3forms.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`;

const nextConfig: NextConfig = {
  images: {
    // AVIF primero, con WebP como alternativa para navegadores sin soporte.
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\s{2,}/g, " ").trim(),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
