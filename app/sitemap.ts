import type { MetadataRoute } from "next";

const BASE_URL = "https://www.centrodefine.com";

// Fecha de la última revisión de contenido. Se actualiza a mano cuando cambia
// la página, para no anunciar cambios inexistentes en cada despliegue.
const LAST_REVIEWED = new Date("2026-08-31");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: LAST_REVIEWED,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/aviso-legal`,
      lastModified: LAST_REVIEWED,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/politica-de-privacidad`,
      lastModified: LAST_REVIEWED,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
