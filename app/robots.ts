import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // No se bloquea /_next/: contiene el CSS, el JS y las imágenes
      // optimizadas que Google necesita para renderizar e indexar la web.
      disallow: ["/api/"],
    },
    sitemap: "https://www.centrodefine.com/sitemap.xml",
  };
}
