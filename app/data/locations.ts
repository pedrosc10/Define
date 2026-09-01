export type Location = {
  id: string;
  city: string;
  address: string;
  postalCode: string;
  /** Coordenadas de la sede, para el marcado geo de schema.org. */
  geo: { latitude: number; longitude: number };
  phone: string;
  phoneHref: string;
  whatsappHref: string;
  hours: string;
  /** Ficha de Google Business del centro. */
  mapHref: string;
  /** Valoración media y número de reseñas en esa ficha de Google. */
  rating: { value: number; count: number };
  nica: string;
};

/** Horario publicado en la web, en el formato que entiende schema.org. */
export const openingHours = [
  { opens: "09:00", closes: "13:00" },
  { opens: "15:00", closes: "20:00" },
];

export const openingDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

/** Perfiles oficiales del centro, comunes a las dos sedes. */
export const socialProfiles = [
  "https://www.facebook.com/centrodefine/?locale=es_ES",
  "https://www.instagram.com/definecentro/?hl=es",
];

export const locations: Location[] = [
  {
    id: "arahal",
    city: "Arahal",
    address: "C/ Alondra, 38 - local B",
    postalCode: "41600",
    geo: { latitude: 37.257631, longitude: -5.552344 },
    phone: "622 67 12 19",
    phoneHref: "tel:+34622671219",
    whatsappHref: "https://wa.me/34622671219",
    hours: "Lunes a viernes · 9:00–13:00 h y 15:00–20:00 h",
    mapHref: "https://maps.app.goo.gl/UvChu8ZeKi2Ay6RP8",
    rating: { value: 4.8, count: 6 },
    nica: "52308",
  },
  {
    id: "alcala-de-guadaira",
    city: "Alcalá de Guadaíra",
    address: "C/ Bailén, 46",
    postalCode: "41500",
    geo: { latitude: 37.334422, longitude: -5.844603 },
    phone: "722 41 33 78",
    phoneHref: "tel:+34722413378",
    whatsappHref: "https://wa.me/34722413378",
    hours: "Lunes a viernes · 9:00–13:00 h y 15:00–20:00 h",
    mapHref: "https://maps.app.goo.gl/oWRdetArHnVWEigw8",
    rating: { value: 5.0, count: 5 },
    nica: "59133",
  },
];
