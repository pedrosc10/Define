"use client";

import { useRef, useState } from "react";

import { type IconKey, tabs } from "../../data/services";
import { Card, SectionHeading } from "../ui";

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function ServiceIcon({ icon }: { icon: IconKey }) {
  return (
    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-tint text-brand">
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        {icon === "book" && (
          <>
            <path {...strokeProps} d="M5.5 6.5A2.5 2.5 0 0 1 8 4h10.5v15H8a2.5 2.5 0 0 0-2.5 2.5V6.5Z" />
            <path {...strokeProps} d="M8 4v15" />
          </>
        )}
        {icon === "speech" && (
          <>
            <path {...strokeProps} d="M5 7.5A2.5 2.5 0 0 1 7.5 5h9A2.5 2.5 0 0 1 19 7.5v5A2.5 2.5 0 0 1 16.5 15H11l-4 4v-4H7.5A2.5 2.5 0 0 1 5 12.5Z" />
            <path {...strokeProps} d="M8.5 9.5h7M8.5 12h4.5" />
          </>
        )}
        {icon === "brain" && (
          <>
            <path {...strokeProps} d="M9 5.5a2.5 2.5 0 0 1 5 0 3 3 0 0 1 3 3 3 3 0 0 1-1 5.82V15a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3v-.18A3 3 0 0 1 7 8.5a3 3 0 0 1 2-3Z" />
            <path {...strokeProps} d="M12 8v8M9.5 10.5H12M12 13.5h2.5" />
          </>
        )}
        {icon === "child" && (
          <>
            <circle {...strokeProps} cx="12" cy="6" r="2" />
            <path {...strokeProps} d="M12 10v5M9 12l1.5 3M15 12l-1.5 3M10 20h4" />
          </>
        )}
        {icon === "hand" && (
          <>
            <path {...strokeProps} d="M8 12V7.5a1.5 1.5 0 0 1 3 0V11" />
            <path {...strokeProps} d="M11 11V6.5a1.5 1.5 0 0 1 3 0V11" />
            <path {...strokeProps} d="M14 11V8a1.5 1.5 0 0 1 3 0v5.5c0 3.04-2.46 5.5-5.5 5.5H11A6 6 0 0 1 5 13v-1.5A1.5 1.5 0 0 1 8 11v1" />
          </>
        )}
        {icon === "music" && (
          <path {...strokeProps} d="M14 5v9.5a2.5 2.5 0 1 1-1.5-2.3V7.5l6-1.5v7.5a2.5 2.5 0 1 1-1.5-2.3V4.5Z" />
        )}
        {icon === "clipboard" && (
          <>
            <path {...strokeProps} d="M9.5 4h5a1.5 1.5 0 0 1 1.5 1.5V7H8V5.5A1.5 1.5 0 0 1 9.5 4Z" />
            <path {...strokeProps} d="M8 6.5H6.5A1.5 1.5 0 0 0 5 8v10.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V8A1.5 1.5 0 0 0 17.5 6.5H16" />
            <path {...strokeProps} d="M8.5 11h7M8.5 14h5" />
          </>
        )}
        {icon === "heart" && (
          <path {...strokeProps} d="M12 20s-6-3.74-6-9a3.5 3.5 0 0 1 6-2.45A3.5 3.5 0 0 1 18 11c0 5.26-6 9-6 9Z" />
        )}
        {icon === "star" && (
          <path {...strokeProps} d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01Z" />
        )}
        {icon === "people" && (
          <>
            <circle {...strokeProps} cx="9" cy="7" r="2.5" />
            <path {...strokeProps} d="M4 21v-2a4 4 0 0 1 4-4h2" />
            <circle {...strokeProps} cx="16" cy="10" r="2" />
            <path {...strokeProps} d="M13 21v-1.5a3.5 3.5 0 0 1 3.5-3.5h.5a3.5 3.5 0 0 1 3.5 3.5V21" />
          </>
        )}
        {icon === "home" && (
          <>
            <path {...strokeProps} d="M3 12l9-9 9 9" />
            <path {...strokeProps} d="M9 21V12h6v9" />
            <path {...strokeProps} d="M5 21h14" />
          </>
        )}
        {icon === "connect" && (
          <>
            <circle {...strokeProps} cx="6" cy="12" r="2.5" />
            <circle {...strokeProps} cx="18" cy="7" r="2.5" />
            <circle {...strokeProps} cx="18" cy="17" r="2.5" />
            <path {...strokeProps} d="M8.5 11 15.5 8M8.5 13 15.5 16" />
          </>
        )}
        {icon === "document" && (
          <>
            <path {...strokeProps} d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
            <path {...strokeProps} d="M14 2v6h6" />
            <path {...strokeProps} d="M8 13h8M8 17h5" />
          </>
        )}
      </svg>
    </span>
  );
}

export function ServiceTabs() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === activeTab) ?? tabs[0];
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Navegación con flechas dentro del tablist, según el patrón ARIA de tabs.
  function handleTabKeyDown(event: React.KeyboardEvent, index: number) {
    const lastIndex = tabs.length - 1;
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight") nextIndex = index === lastIndex ? 0 : index + 1;
    else if (event.key === "ArrowLeft") nextIndex = index === 0 ? lastIndex : index - 1;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = lastIndex;

    if (nextIndex === null) return;
    event.preventDefault();
    const nextTab = tabs[nextIndex];
    setActiveTab(nextTab.id);
    tabRefs.current[nextTab.id]?.focus();
  }

  return (
    <section id="servicios" className="scroll-mt-28 bg-surface-warm py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Especialidades"
          title="Áreas de apoyo psicológico, educativo y del lenguaje"
          description="Intervenimos desde distintas especialidades para ofrecer una respuesta completa, clara y coordinada."
        />

        <div className="mt-10 flex flex-col items-center gap-2 sm:flex-row sm:justify-center" role="tablist" aria-label="Grupos de servicio">
          {tabs.map((tab, index) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                ref={(node) => {
                  tabRefs.current[tab.id] = node;
                }}
                id={`tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`tabpanel-${tab.id}`}
                // Roving tabindex: el tablist es una sola parada de tabulación
                // y dentro se navega con las flechas.
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                  isActive
                    ? "bg-brand text-white shadow-[0_6px_20px_-8px_rgba(47,109,99,0.7)]"
                    : "bg-white/80 text-ink-soft hover:bg-white hover:text-ink"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          id={`tabpanel-${current.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${current.id}`}
          // El panel no contiene elementos enfocables, así que entra en el
          // orden de tabulación para que se pueda leer con el teclado.
          tabIndex={0}
          className="mt-8 grid gap-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:grid-cols-2 xl:grid-cols-3"
        >
          {current.services.map((service) => (
            <Card
              key={service.title}
              className="flex h-full flex-col bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_56px_-28px_rgba(44,74,67,0.4)]"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-semibold text-ink">{service.title}</h3>
                <ServiceIcon icon={service.icon} />
              </div>
              <div className="mt-5 h-px bg-divider" />
              <p className="mt-5 text-sm leading-7 text-muted">{service.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
