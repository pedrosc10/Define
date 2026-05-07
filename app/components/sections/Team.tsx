import Image from "next/image";

import { SectionHeading } from "../ui";

// Inline SVG placeholder — neutral grey, fills the circular avatar while photos load
const AVATAR_PLACEHOLDER =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxIDEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNkNmUyZGUiLz48L3N2Zz4=";

type Member = {
  name: string;
  role: string;
  image: string;
  quote?: string;
};

type DirectionMember = {
  name: string;
  image: string;
};

const direction: DirectionMember[] = [
  { name: "[Nombre]", image: "/team/direccion-1.jpg" },
  { name: "[Nombre]", image: "/team/direccion-2.jpg" },
  { name: "[Nombre]", image: "/team/direccion-3.jpg" },
];

const admin: Member[] = [
  {
    name: "[Nombre]",
    role: "Coordinación y gestión",
    image: "/team/coordinacion.jpg",
  },
  {
    name: "[Nombre]",
    role: "Atención al cliente",
    image: "/team/atencion-cliente.jpg",
  },
];

const professionals: Member[] = [
  {
    name: "[Nombre]",
    role: "Psicóloga · Neurodesarrollo infantil",
    image: "/team/profesional-1.jpg",
    quote: "Cada niño tiene su propio ritmo. Mi trabajo es encontrarlo y acompañarlo.",
  },
  {
    name: "[Nombre]",
    role: "Logopeda · Lenguaje y comunicación",
    image: "/team/profesional-2.jpg",
    quote: "Ayudar a alguien a encontrar su voz es uno de los mayores privilegios que conozco.",
  },
  {
    name: "[Nombre]",
    role: "Psicopedagoga · Dificultades de aprendizaje",
    image: "/team/profesional-3.jpg",
    quote: "Cuando un niño entiende cómo aprende, todo cambia para él y para su familia.",
  },
  {
    name: "[Nombre]",
    role: "Terapeuta ocupacional",
    image: "/team/profesional-4.jpg",
    quote: "La autonomía y el bienestar siempre van de la mano.",
  },
  {
    name: "[Nombre]",
    role: "Neuropsicóloga",
    image: "/team/profesional-5.jpg",
    quote: "Entender cómo funciona el cerebro nos permite acompañar mejor a cada persona.",
  },
  {
    name: "[Nombre]",
    role: "Psicóloga · Psicoterapia de adultos",
    image: "/team/profesional-6.jpg",
    quote: "Cada persona que llega lleva una historia que merece ser escuchada sin prisa.",
  },
  {
    name: "[Nombre]",
    role: "Profesional",
    image: "/team/profesional-7.jpg",
  },
  {
    name: "[Nombre]",
    role: "Profesional",
    image: "/team/profesional-8.jpg",
  },
  {
    name: "[Nombre]",
    role: "Profesional",
    image: "/team/profesional-9.jpg",
  },
  {
    name: "[Nombre]",
    role: "Profesional",
    image: "/team/profesional-10.jpg",
  },
];

function TeamCard({ name, image }: { name: string; image: string }) {
  return (
    <div className="group flex flex-col items-center gap-2 rounded-xl bg-white px-3 py-4">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-[#d6e2de] transition-transform duration-300 group-hover:scale-105">
        <Image
          src={image}
          alt={`Foto de ${name}`}
          fill
          sizes="56px"
          className="object-cover"
          placeholder="blur"
          blurDataURL={AVATAR_PLACEHOLDER}
        />
      </div>
      <p className="text-center text-sm font-semibold text-ink">{name}</p>
    </div>
  );
}

function GroupLabel({ label }: { label: string }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-eyebrow">
      {label}
    </p>
  );
}

export function Team() {
  return (
    <section id="equipo" className="scroll-mt-28 bg-[#F7F5F0] py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Nuestro equipo"
          title="Profesionales que te acompañan en cada paso"
          description="Un equipo humano y multidisciplinar comprometido con el acompañamiento cercano, personalizado y basado en la evidencia."
        />

        {/* Dirección */}
        <div className="mt-10">
          <GroupLabel label="Dirección" />
          <div className="mx-auto grid max-w-lg gap-2 grid-cols-3">
            {direction.map((m, i) => (
              <TeamCard key={i} name={m.name} image={m.image} />
            ))}
          </div>
        </div>

        {/* Administración */}
        <div className="mt-8">
          <GroupLabel label="Administración" />
          <div className="grid gap-2 grid-cols-2 sm:grid-cols-3">
            {admin.map((m) => (
              <TeamCard key={m.name + m.role} name={m.name} image={m.image} />
            ))}
          </div>
        </div>

        {/* Profesionales */}
        <div className="mt-8">
          <GroupLabel label="Profesionales" />
          <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {professionals.map((m) => (
              <TeamCard key={m.name + m.role} name={m.name} image={m.image} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
