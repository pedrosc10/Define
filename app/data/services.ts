import { cityOf, type LocationId } from "./locations";

export type ServiceItem = {
  title: string;
  description: string;
  icon: IconKey;
  /** Sedes donde se presta. Si se omite, se ofrece en todas. */
  availableAt?: LocationId[];
};
export type Tab = { id: string; label: string; services: ServiceItem[] };
export type IconKey =
  | "book"
  | "speech"
  | "brain"
  | "child"
  | "hand"
  | "music"
  | "clipboard"
  | "heart"
  | "star"
  | "people"
  | "home"
  | "connect"
  | "document";

export const tabs: Tab[] = [
  {
    id: "ninos",
    label: "Niños y adolescentes",
    services: [
      {
        title: "Psicopedagogía",
        description: "Dificultades de aprendizaje: TDAH, dislexia, discalculia, comprensión lectora. Adaptación escolar y habilidades sociales.",
        icon: "book",
      },
      {
        title: "Logopedia",
        description: "Trastornos del lenguaje, habla y comunicación. Deglución, terapia miofuncional y sistemas aumentativos de comunicación (SAAC).",
        icon: "speech",
      },
      {
        title: "Neuropsicología",
        description: "Estimulación de funciones cognitivas: memoria, atención, lenguaje, función ejecutiva, cognición social y percepción.",
        icon: "brain",
      },
      {
        title: "Atención temprana",
        description: "Estimulación del desarrollo cognitivo, motor, social y del lenguaje. Intervención global en la primera infancia.",
        icon: "child",
      },
      {
        title: "Terapia ocupacional",
        description: "Autonomía y participación en actividades de la vida diaria. Intervención en procesamiento sensorial y motricidad.",
        icon: "hand",
        availableAt: ["arahal"],
      },
      {
        title: "Musicoterapia",
        description: "Estimulación cognitiva, motora y emocional mediante el uso terapéutico de la música.",
        icon: "music",
      },
      {
        title: "Evaluación y diagnóstico",
        description: "Valoraciones completas con informe detallado, orientación personalizada y recomendaciones para el entorno educativo y familiar.",
        icon: "clipboard",
      },
      {
        title: "Psicología infantojuvenil",
        description: "Intervención en trastornos del neurodesarrollo, problemas de conducta, regulación emocional y dificultades de autoestima.",
        icon: "people",
      },
    ],
  },
  {
    id: "adultos",
    label: "Adultos",
    services: [
      {
        title: "Psicoterapia",
        description: "Enfoques cognitivo-conductual, EMDR, ACT, terapia narrativa y sistémica. Ansiedad, depresión, trauma, duelo, TCA y bloqueos personales.",
        icon: "heart",
      },
      {
        title: "Neuropsicología",
        description: "Estimulación y rehabilitación de funciones cognitivas: memoria, atención, lenguaje y función ejecutiva.",
        icon: "brain",
      },
      {
        title: "Evaluación psicológica",
        description: "Valoraciones especializadas con informe diagnóstico y plan de intervención personalizado según cada caso.",
        icon: "clipboard",
      },
      {
        title: "Diversidad funcional",
        description: "Programa de acompañamiento para adultos orientado a la autonomía personal, el bienestar emocional y la inclusión social.",
        icon: "star",
      },
    ],
  },
  {
    id: "familia",
    label: "Familia",
    services: [
      {
        title: "Orientación familiar",
        description: "Acompañamiento y asesoramiento a familias, con coordinación activa con los centros educativos y otros profesionales.",
        icon: "home",
      },
      {
        title: "Terapia familiar",
        description: "Comprensión de la persona dentro de su entorno familiar y relacional para mejorar la dinámica de convivencia.",
        icon: "connect",
      },
      {
        title: "Gestión de becas NEAE",
        description: "Nos encargamos de todo el proceso de solicitud y tramitación de la beca NEAE para alumnos con necesidades específicas de apoyo educativo.",
        icon: "document",
      },
    ],
  },
];

/** ¿Se presta este servicio en esa sede? Sin `availableAt`, en todas. */
export function isAvailableAt(service: ServiceItem, locationId: LocationId): boolean {
  return !service.availableAt || service.availableAt.includes(locationId);
}

/**
 * Aviso corto para los servicios que no están en todas las sedes
 * ("Solo en Arahal"); null cuando se presta en todas.
 */
export function availabilityNote(service: ServiceItem): string | null {
  if (!service.availableAt || service.availableAt.length !== 1) return null;
  return `Solo en ${cityOf(service.availableAt[0])}`;
}
