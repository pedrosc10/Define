import type { Location } from "./locations";

export type Testimonial = {
  quote: string;
  author: string;
  /** Sede a la que corresponde la reseña, según `locations`. */
  locationId: Location["id"];
};

/**
 * Reseñas publicadas por las familias en las fichas de Google del centro.
 * Se reproducen literalmente: no se resumen, se completan ni se corrigen.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Para nosotros ya sois parte de la familia. Gracias por esa alegría inmensa y por cómo ayudáis a nuestros hijos y seres queridos.",
    author: "Rocío L.",
    locationId: "alcala-de-guadaira",
  },
  {
    quote: "Un trato genial siempre por parte de todos y unos grandes profesionales.",
    author: "Susana C.",
    locationId: "arahal",
  },
  {
    quote: "Son las mejores profesionales que existen.",
    author: "Juan José F.",
    locationId: "arahal",
  },
];
