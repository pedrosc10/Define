export type Location = {
  id: string;
  city: string;
  address: string;
  phone: string;
  phoneHref: string;
  whatsappHref: string;
  hours: string;
  mapHref: string;
  nica: string;
};

/** Horario publicado en la web, en el formato que entiende schema.org. */
export const openingHours = [
  { opens: "09:00", closes: "13:00" },
  { opens: "15:00", closes: "20:00" },
];

export const openingDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export const locations: Location[] = [
  {
    id: "arahal",
    city: "Arahal",
    address: "C/ Alondra, 38 - local B",
    phone: "622 67 12 19",
    phoneHref: "tel:+34622671219",
    whatsappHref: "https://wa.me/34622671219",
    hours: "Lunes a viernes · 9:00–13:00 h y 15:00–20:00 h",
    mapHref: "https://maps.google.com/?q=Calle+Alondra+38+Arahal",
    nica: "52308",
  },
  {
    id: "alcala-de-guadaira",
    city: "Alcalá de Guadaíra",
    address: "C/ Bailén, 46",
    phone: "722 41 33 78",
    phoneHref: "tel:+34722413378",
    whatsappHref: "https://wa.me/34722413378",
    hours: "Lunes a viernes · 9:00–13:00 h y 15:00–20:00 h",
    mapHref: "https://maps.google.com/?q=Calle+Bailen+46+Alcala+de+Guadaira",
    nica: "59133",
  },
];
