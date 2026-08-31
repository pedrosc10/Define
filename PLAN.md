# Plan de acción priorizado — centrodefine.com

Derivado de `AUDITORIA.md`. Ordenado por **impacto / esfuerzo**. Cada bloque = un commit atómico, con `npm run build` verde antes de pasar al siguiente.

Leyenda: 🟢 **puedo aplicarlo sin consultarte** (seguro, reversible, sin cambio de significado) · 🟡 **necesito tu visto bueno** · 🔴 **necesita datos o decisiones del centro**

---

## Bloque 1 — Quick wins (bajo esfuerzo, alto impacto)

> Estimación: ~1 h · 6 commits · riesgo visual prácticamente nulo

### 1.1 🟢 `seo: desbloquea /_next/ en robots y refuerza sitemap`
- Quitar `/_next/` de `disallow` en `app/robots.ts` (deja solo `/api/`).
- `sitemap.ts`: `lastModified` fijo en lugar de `new Date()` en cada build.
- **Impacto: el más alto de toda la lista.** Permite a Google renderizar la web e indexar las 21 fotos.

### 1.2 🟢 `refactor: elimina componentes y assets no utilizados`
- Borrar: `GalleryGrid.tsx` (roto), `Gallery.tsx`, `sections/GallerySection.tsx`, `sections/Services.tsx`, `sections/Team.tsx`, `sections/WhyDefine.tsx`.
- **Conservar de momento** `sections/Psychotherapy.tsx` y `sections/AdultSupport.tsx` → contienen contenido real no publicado (pregunta abierta 5).
- Borrar `public/{next,vercel,globe,window,file}.svg`, `public/favicon.jpg`, `app/README.txt`.
- Limpiar `ImageFrame` de `ui.tsx` y `FallbackImage.tsx` si quedan sin usar; limpiar los keyframes `marquee-*` de `globals.css`.
- Cerrar la CSP: fuera `picsum.photos`, `fonts.googleapis.com`, `fonts.gstatic.com`; quitar `images.remotePatterns` y la cabecera obsoleta `X-XSS-Protection`.
- **Resultado esperado: `npx eslint .` a cero errores y cero warnings.**

### 1.3 🟢 `fix: restaura los landmarks de cabecera y pie`
- Sacar `Header`, `Footer` y `StickyMobileBar` fuera de `<main>` en `page.tsx`.

### 1.4 🟢 `fix: navegación visible también en tablet`
- `MobileMenu`: `md:hidden` → `lg:hidden` (y el botón de teléfono/reservar del Header ajustado en consecuencia).
- `StickyMobileBar`: mostrarla hasta `lg` para no dejar el rango 768–1023 px sin CTA fijo.

### 1.5 🟢 `a11y: corrige contraste, foco visible y movimiento reducido`
- `--color-eyebrow`: `#5f7d76` → `#4e6b64` (AA sobre blanco y sobre `#F7F5F0`).
- Firma de `Quote`: `text-white/60` → `text-white/80`.
- `focus-visible` explícito en enlaces de Header, Footer y menú móvil.
- Bloque `@media (prefers-reduced-motion: reduce)` global que anule también las transiciones de tarjetas, del icono `+` del FAQ, del acordeón y de la sombra del Header.
- `SocialProof`: invertir `dt`/`dd` para que la etiqueta sea el término.
- *Skip link* «Saltar al contenido».
- `env(safe-area-inset-bottom)` en `StickyMobileBar`.

### 1.6 🟢 `a11y: mejora los patrones de tabs, acordeón y menú móvil`
- **Tabs**: `id` + `aria-labelledby`, *roving tabindex*, navegación con ←/→/Home/End, panel con `tabIndex={-1}`, altura mínima para suavizar el salto entre pestañas.
- **FAQ**: preguntas envueltas en `<h3>`, `aria-controls`/`id`, transición con `grid-template-rows: 0fr → 1fr` (**arregla el recorte de texto a 320 px**), y `hidden` real cuando está cerrado.
- **Menú móvil**: cierre con `Escape`, cierre al hacer clic fuera, `aria-controls`.

---

## Bloque 2 — Cambios de UX/UI

> Estimación: ~2–3 h · 2 commits · **es donde está el cambio visible**

### 2.1 🟡 `feat: rediseña la galería como carrusel controlado por el usuario`

Nuevo componente `components/GalleryCarousel` (reescrito) o `GallerySlider`:

| Antes | Después |
|---|---|
| Marquee infinito a ~380 px/s | **Sin autoplay.** El usuario decide |
| Sin controles visibles | Flechas ‹ › en escritorio + puntos de paginación |
| Arrastre con JS y *forced reflow* | `overflow-x: auto` + `scroll-snap-type: x mandatory` nativos |
| Secuestra el scroll vertical en móvil | Gesto nativo, no interfiere |
| Inaccesible por teclado | Contenedor enfocable + `role="group"` + `aria-roledescription` |
| 70 % de fotos inalcanzable con *reduced motion* | Todas accesibles siempre |
| CLS horizontal al cargar | Cajas de proporción fija + `placeholder="blur"` |
| 8 imágenes `eager` bajo el pliegue | Solo las 2–3 primeras |
| Fotos a 280 px, no se aprecian | **Lightbox** al hacer clic (`<dialog>` nativo, cierre con `Escape`) |

**Procedimiento acordado:** el componente actual **no se borra** hasta que valides el nuevo. Lo dejo como `GalleryCarousel.legacy.tsx` y te doy antes/después; una vez aprobado, commit de borrado aparte.

*Alternativa B si prefieres cero movimiento:* rejilla estática con lightbox y botón «ver más». Dímelo y la hago así.

### 2.2 🟢 `fix: unifica el comportamiento de los enlaces de WhatsApp`
- `target="_blank"` + `rel="noopener noreferrer"` en todos los `wa.me` (hoy solo los tiene `Locations`).

### 2.3 🟡 `refactor: mueve los colores sueltos a tokens del tema`
- `#F7F5F0`, `#c8d8d2`, `#5a746e`, `#4f6560`, `#b5c8c1`, `#90aca4`, `#e3ece8` → tokens en `@theme inline`.
- Cambio puramente interno; **misma apariencia píxel a píxel**. Lo marco en amarillo solo porque toca muchos archivos a la vez.

---

## Bloque 3 — Contenido y SEO (reescritura que preserva el significado)

> **Nada de este bloque se aplica sin tu aprobación explícita.** Todo son reformulaciones; no añado servicios, horarios, precios ni titulaciones.

### 3.1 🟡 `seo: acorta title y description a la longitud indexable`

**`title`** — actual (83 car., se trunca): `Centro Psicopedagógico y de Desarrollo Integral DEFINE | Arahal y Alcalá de Guadaíra`

- **Opción A (recomendada, 57 car.):** `Centro DEFINE | Psicología y Logopedia · Arahal y Alcalá`
- **Opción B (60 car., prioriza especialidad):** `Psicopedagogía, Psicología y Logopedia en Arahal | DEFINE`

Opción A mantiene marca + las dos localidades, que es lo que decide el clic en búsqueda local. El nombre legal completo se conserva en el JSON-LD y en la página.

**`description`** — actual (232 car.): se corta en «…apoyo a adultos con diversidad funcional en Arahal y Alcalá…»

- **Propuesta (148 car.):** `Psicopedagogía, psicología, logopedia y neuropsicología en Arahal y Alcalá de Guadaíra. Evaluación, diagnóstico e intervención para niños y adultos.`

Mismos hechos, solo más corta; el listado completo de servicios sigue íntegro en la página.

### 3.2 🟡 `seo: amplía el mensaje del hero sin cambiar su tono`

El H1 actual solo habla de niños, pero el centro atiende adolescentes, adultos y familias.

- **Opción A (conservadora, recomendada):** **el H1 no se toca.** Se añade la localidad al subtítulo:
  > *«Centro Psicopedagógico de Psicología y Logopedia **en Arahal y Alcalá de Guadaíra**. Evaluación, diagnóstico e intervención personalizada para niños, adolescentes, adultos y familias.»*
  Único cambio: 5 palabras que añaden la keyword local más valiosa. Cero riesgo.
- **Opción B (amplía el público):** H1 → *«Cada persona merece ser entendida. Nosotros lo hacemos posible.»* Mantiene ritmo, tono y promesa; deja de excluir al público adulto. Pierde algo de gancho emocional para familias.

### 3.3 🟡 `seo: refuerza los h2 con especialidad y localidad`

Reformulaciones que **no cambian lo que dice cada sección**, solo lo hacen explícito:

| Sección | Actual | Propuesta |
|---|---|---|
| ServiceTabs | Áreas de apoyo psicológico y educativo | Áreas de apoyo psicológico, educativo y del lenguaje |
| Process | Un proceso claro desde el primer contacto | Cómo es tu primera consulta en DEFINE |
| Faqs | Información útil antes de empezar | Preguntas frecuentes sobre nuestras terapias |
| Locations | Dos centros para acompañarte más cerca | Nuestros centros en Arahal y Alcalá de Guadaíra |
| PhotoGallery | Nuestros espacios y momentos | *(sin cambios)* |

### 3.4 🟢 `seo: textos alternativos descriptivos en la galería`

Sustituir `Galería DEFINE — foto N` por descripciones reales, escritas **tras mirar cada foto una a una**, sin *keyword stuffing* y **sin describir rasgos personales de los menores**. Ejemplos del estilo previsto:

- `Sesión de logopedia con material visual de vocabulario en el centro DEFINE`
- `Niño explorando una columna de burbujas en la sala de estimulación sensorial`
- `Uso de tablet con pictogramas (SAAC) durante una sesión de comunicación`

Lo marco en verde porque es descripción objetiva de lo que ya está publicado, pero si prefieres revisarlas antes de que entren, te paso la lista completa.

### 3.5 🟢 `seo: renombra las imágenes de la galería a nombres descriptivos`
- Hoy: `WhatsApp Imag3e 2026-05-08 at 09.02.44.jpeg`, `WhatsApp Image 2026-05-028 at 09.03.01.jpeg`…
- Después: `logopedia-material-visual-define-arahal.jpg`, `sala-estimulacion-sensorial-define.jpg`…
- **Seguro**: las fotos solo se referencian dinámicamente con `readdir`, ningún archivo apunta a un nombre concreto.
- Incluye orden fijo y curado (fin del barajado aleatorio no determinista).

### 3.6 🟢 `seo: completa el JSON-LD con los datos ya publicados`
- `openingHoursSpecification` (L–V 9:00–13:00 / 15:00–20:00, tal como figura en `Locations`).
- `image`, `logo`, `hasMap` (las URLs de Google Maps ya están en el código), `@id` y `url` por sede.
- `areaServed` como objetos `City`.
- Nodos `Organization` + `WebSite` en el `@graph`.
- **`FAQPage` generado automáticamente desde el array `faqs` existente** → candidato a *rich result* sin escribir nada nuevo.
- `availableService` derivado de los servicios ya listados en `ServiceTabs`.
- Sin `geo`, sin `sameAs`, sin `priceRange`, sin código postal: **no invento datos** (preguntas abiertas 4).
- **Validación:** copiar la URL en el [Rich Results Test](https://search.google.com/test/rich-results) y en el [Schema Markup Validator](https://validator.schema.org/). Se comprueban dos cosas: que detecte `LocalBusiness`/`MedicalBusiness` **y** `FAQPage` sin errores, y que los horarios se muestren correctamente.

### 3.7 🟡 `seo: imagen OpenGraph propia para compartir por WhatsApp`
- `app/opengraph-image.tsx` con `ImageResponse` (API nativa de Next, cero dependencias, cero recursos externos → la CSP no cambia).
- 1200×630, fondo verde de marca, logo, nombre del centro y las dos sedes. Solo usa texto que ya existe en la web.

### 3.8 🟢 `feat: página 404 en español con la identidad de la web`
- `app/not-found.tsx` con logo, mensaje breve y salidas a inicio / teléfono / WhatsApp.

---

## Bloque 4 — Técnico y estructural

### 4.1 🟢 `perf: activa AVIF y optimiza la carga de imágenes`
- `images.formats: ["image/avif", "image/webp"]` en `next.config.ts` (−20/30 % de peso).
- Recomprimir los 4 originales de más de 2 MB (`IMG_1550.jpeg` pesa 4,2 MB) a ~300 KB antes de subirlos al repo. Requiere herramienta externa → te digo cómo o lo hago si tienes `sharp` disponible.
- `placeholder="blur"` en la galería.

### 4.2 🔴 `chore: resuelve la analítica` — **bloqueado por la pregunta abierta 1**
- Si el deploy es **Netlify**: `@vercel/analytics` y `@vercel/speed-insights` no recogen nada. Se retiran (y se cierra la CSP) o se sustituyen por una alternativa sin cookies.
- Si el deploy es **Vercel**: se queda tal cual y se añade seguimiento de clics en los CTAs de teléfono y WhatsApp, que hoy no se miden.

### 4.3 🔵 `refactor: Header como Server Component` *(opcional)*
- El único motivo por el que `Header` es cliente es añadir una sombra al hacer scroll. Se puede hacer con CSS (`animation-timeline: scroll()`) y ahorrar JS. Bajo impacto; solo si sobra tiempo.

---

## Fuera del alcance de este encargo (recomendaciones a futuro)

1. **Páginas por servicio y por sede.** Con una sola URL se compite por todas las búsquedas a la vez. `/logopedia-arahal`, `/psicologia-infantil-alcala-de-guadaira`, `/atencion-temprana`… es la palanca de crecimiento orgánico más grande que tiene el proyecto. Requiere contenido nuevo (≈400–600 palabras por página).
2. **Testimonios.** Se afirma «5.0 ★» sin mostrar ni una reseña. Tres testimonios (aunque anónimos) + enlace al perfil de Google + marcado `AggregateRating`.
3. **Recuperar el contenido huérfano** de `Psychotherapy.tsx` y `AdultSupport.tsx` (EMDR, ACT, TCA, adicciones, duelo, taller ocupacional, accesibilidad cognitiva…). Es contenido escrito y de calidad que hoy no ve nadie y que aporta keywords valiosas.
4. **Formulario de contacto** con consentimiento RGPD, como alternativa a WhatsApp para quien no quiere dar su teléfono en el primer contacto.
5. **Textos legales**: aviso legal, política de privacidad y —si algún día se añade Google Maps embebido o analítica con cookies— banner de consentimiento.
6. **Ficha de Google Business Profile** de cada sede, enlazada desde la web y con las fotos de la galería. Para SEO local pesa tanto o más que la propia web.
7. **Fotografía profesional** de las dos sedes vacías (sin menores), útil para OpenGraph, para la galería y para evitar por completo el asunto del consentimiento de imagen.
8. **Blog / recursos para familias** (señales de alerta por edades, cómo pedir la beca NEAE…). Es el tipo de contenido que capta búsquedas informativas y alimenta el SEO local.

---

# Estado de la implementación (rama `mejora/auditoria-seo-ux`)

15 commits atómicos, `npm run build` limpio después de cada bloque.

## ✅ Aplicado

| Commit | Bloque |
|---|---|
| `seo: desbloquea /_next/ en robots.txt y estabiliza el sitemap` | 1.1 |
| `refactor: elimina componentes muertos y cierra la CSP` | 1.2 (+ AVIF de 4.1) |
| `fix: restaura los landmarks de cabecera y pie de página` | 1.3 |
| `fix: muestra la navegación también en tablet` | 1.4 |
| `a11y: corrige contraste, foco visible y movimiento reducido` | 1.5 |
| `a11y: completa los patrones de tabs, acordeón y menú móvil` | 1.6 |
| `feat: rediseña la galería como carrusel controlado con visor` | 2.1 |
| `feat: unifica los enlaces de contacto y mide los clics en los CTAs` | 2.2 + 4.2 |
| `seo: completa el JSON-LD con horarios, servicios y FAQPage` | 3.6 |
| `seo: ajusta title, description y encabezados de sección` | 3.1 + 3.2 + 3.3 |
| `seo: imagen OpenGraph propia de 1200×630` | 3.7 |
| `feat: página 404 propia en español` | 3.8 |
| `refactor: mueve los colores sueltos a tokens del tema` | 2.3 |
| `perf: recomprime los originales de la galería y corrige una foto girada` | 4.1 |
| (los textos alternativos y el renombrado de fotos entran con el commit de la galería) | 3.4 + 3.5 |

**ESLint:** de 1 error + 4 warnings a **0 errores y 0 warnings**.

## ⏳ Pendiente de decisión

Resueltos tras la auditoría:

1. ~~Borrar `GalleryCarousel.tsx`~~ → borrado, carrusel nuevo validado en móvil.
2. ~~`Psychotherapy.tsx` y `AdultSupport.tsx`~~ → borrados; el texto queda en el historial de git.
3. ~~Consentimiento de imagen~~ → confirmado por escrito para todas las fotos publicadas.
4. ~~Datos que faltaban en el JSON-LD~~ → añadidos códigos postales, coordenadas, fichas de Google Business y redes sociales.
5. ~~Los CTAs llevaban todos a Arahal~~ → resuelto con el selector de sede (`SedeCta`), en los dos canales (WhatsApp y teléfono) y en los nueve CTAs de la web.

Sigue abierto:

- **Variante del `title`**: se aplicó la opción A (`Centro DEFINE | Psicología y Logopedia · Arahal y Alcalá`). Abrevia «Alcalá de Guadaíra» por espacio; el nombre completo se conserva en OpenGraph, en el JSON-LD y en la página. Decisión tomada, reversible en una línea.
- **El teléfono de la cabecera**: pasa también por el selector. Al dejar de llevar a un número fijo, el texto cambia de `622 67 12 19` a «Llamar»; los dos números siguen visibles en la sección de centros y en el pie.
- Las recomendaciones fuera de alcance del final de este documento: testimonios, páginas por servicio y sede, formulario de contacto y textos legales.
