# Auditoría técnica, SEO y UX — centrodefine.com

**Fecha:** 31 de agosto de 2026
**Alcance:** landing de una sola página (`app/page.tsx`), componentes, configuración de build, SEO y accesibilidad.
**Estado de partida:** el proyecto compila limpio. No se ha modificado ningún archivo todavía.

---

## Fase 0 — Reconocimiento

### Versiones reales instaladas

| Paquete | Declarado en `package.json` | Real (build) |
|---|---|---|
| Next.js | `^16.2.6` | **16.2.6** (Turbopack) |
| React / React DOM | `19.2.4` | 19.2.4 |
| Tailwind CSS | `^4` | v4 (`@tailwindcss/postcss`, sin `tailwind.config.js`) |
| TypeScript | `^5` | 5.x, `strict: true` |
| eslint-config-next | `16.2.1` | — |

Coincide con lo descrito en el brief. Sin dependencias extra: `@vercel/analytics` y `@vercel/speed-insights` son las únicas librerías de terceros en runtime.

### Resultado de `npm run build` (antes de tocar nada)

```
▲ Next.js 16.2.6 (Turbopack)
✓ Compiled successfully in 7.2s
✓ Generating static pages (6/6)
Route (app)
┌ ○ /            ○ (Static)
├ ○ /_not-found
├ ○ /robots.txt
└ ○ /sitemap.xml
[exit 0]
```

**Build limpio, sin warnings.** Todo se prerenderiza estático, que es lo correcto para esta web.

### Resultado de `npx eslint .` (antes de tocar nada)

```
✖ 5 problems (1 error, 4 warnings)
```

| Archivo | Tipo | Detalle |
|---|---|---|
| `GalleryGrid.tsx:37` | **error** | `react-hooks/refs` — se escribe `galleryRef.current` durante el render |
| `GalleryGrid.tsx:153` | warning | `<img>` nativo en vez de `next/image` |
| `GalleryCarousel.tsx:20` | warning | `pixelToTime` definida y nunca usada (código muerto) |
| `GalleryCarousel.tsx:71,94` | warning (×2) | `useEffect` con dependencias incompletas |

**Nota importante:** el único *error* de lint está en `GalleryGrid.tsx`, un componente que **no se usa en ninguna parte**. El lint no se ejecuta en el build (Next 16 no lo lanza por defecto), por eso el build pasa limpio pese al error.

### Cambios sin commitear detectados

Hay 4 archivos modificados en el working tree (correcciones de contenido reales: sesiones de 60 min, «Terapia familiar» en lugar de «Terapia sistémica», «habilidades sociales» en lugar de «dificultades sociales», y «Psicología infantojuvenil» movida de la pestaña *Familia* a *Niños y adolescentes*). **Los respeto como fuente de verdad y no los revierto.**

---

## Fase 1 — Auditoría

Severidades: 🔴 **Crítico** · 🟠 **Importante** · 🔵 **Mejora**

---

## 1. Contenido y copywriting

### 1.1 🟠 El H1 promete solo la mitad del negocio

`Hero.tsx`: *«Tu hijo merece ser entendido. Nosotros lo hacemos posible.»*

El titular habla **exclusivamente de niños**, pero el centro atiende también a adolescentes, adultos, familias y adultos con diversidad funcional (así lo dice el propio párrafo de debajo y la pestaña «Adultos»). El H1 es el elemento con más peso semántico de la página: para Google y para un adulto que busca «psicólogo Arahal», el mensaje actual lo excluye. Además hay una fricción interna: H1 infantil → párrafo que menciona adultos → SocialProof «familias acompañadas» → tabs con «Adultos».

No propongo cambiar el ángulo emocional (funciona y es el público mayoritario), sino ampliarlo sin perder fuerza. Ver propuestas en `PLAN.md` §3.

### 1.2 🔵 Solapamiento Hero ↔ Contact

Hero y Contact repiten literalmente los mismos dos CTAs con el mismo texto («Reserva tu primera consulta» / «Llamar ahora») y un mensaje muy parecido. No es un error —cerrar con el mismo CTA es correcto—, pero el bloque Contact podría aportar algo que el Hero no da: qué pasa después de escribir, o el recordatorio de las dos sedes con sus dos teléfonos (ahora Contact solo enlaza al teléfono de Arahal, ver 1.4).

### 1.3 🔵 `SocialProof` y `Quote` compiten por el mismo espacio mental

Las cuatro métricas (+500 familias, 5.0 ★, 10+ especialistas, +8 años) y la cita de marca dicen ambas «puedes confiar en nosotros». Colocadas como están (una arriba, otra a mitad de página) funcionan; solo dejo constancia de que no hay una tercera prueba social real: **no hay testimonios**. Es la carencia de conversión más grande de la página (ver §4.7).

### 1.4 🟠 Inconsistencia: Alcalá de Guadaíra desaparece de todos los CTAs

Todos los botones de acción de la página (Hero, Header, Contact, StickyMobileBar) apuntan **solo al teléfono/WhatsApp de Arahal** (`622 67 12 19`). El número de Alcalá (`722 41 33 78`) aparece únicamente en `Locations` y en el `Footer`.

Un usuario de Alcalá que pulse «Reserva tu primera consulta» escribe al centro equivocado. No es un bug de código, es una decisión de negocio con impacto real en conversión → **pregunta abierta** (ver §6).

### 1.5 🔵 Erratas y detalles menores de copy

- No he encontrado **ninguna errata ortográfica** en el texto visible. El copy está bien escrito y el tono es consistente (cercano, en «vosotros», profesional).
- `Faqs.tsx` mezcla tratamiento: la mayoría usa «vosotros/os» («Contactáis con nosotros»), pero *«¿Trabajáis solo con niños?»* se responde con «En DEFINE acompañamos a…». Es coherente, no es un error.
- `Process.tsx` («Hablamos / Valoramos / Comenzamos») y la primera FAQ («¿Cómo es la primera toma de contacto?») cuentan **exactamente lo mismo** con otras palabras. Duplicidad menor y probablemente intencionada.

### 1.6 🔵 Nombres de sección poco aprovechados para SEO

Los `h2` actuales son emocionales pero pobres en keywords locales: «Un proceso claro desde el primer contacto», «Información útil antes de empezar», «Dos centros para acompañarte más cerca». Ninguno menciona la especialidad ni la localidad. Se pueden mejorar **sin cambiar el significado ni el tono** (ver `PLAN.md` §3).

---

## 2. SEO

### 2.1 🔴 `robots.ts` bloquea `/_next/` — impide a Google renderizar la página

```ts
disallow: ["/api/", "/_next/"]
```

`/_next/` contiene **el CSS, el JS y las imágenes optimizadas** (`/_next/image`, `/_next/static`). Bloquearlo significa que:

- Googlebot no puede renderizar la página tal como la ve un usuario (evalúa mobile-friendliness y Core Web Vitals sobre el render).
- **Ninguna foto de la galería puede indexarse en Google Imágenes**, porque todas se sirven desde `/_next/image?url=…`.

Google desaconseja explícitamente bloquear los recursos de renderizado. Es el hallazgo SEO más grave de la auditoría y se arregla borrando una línea.

### 2.2 🟠 JSON-LD `MedicalBusiness` incompleto y con datos disponibles sin usar

El bloque actual (`page.tsx`) es válido pero deja fuera información **que ya está en la web**:

| Falta | Está disponible en |
|---|---|
| `openingHoursSpecification` | `Locations.tsx` (L–V 9:00–13:00 y 15:00–20:00) |
| `postalCode` / `addressRegion` (Sevilla) | parcialmente — CP no está en el repo (pregunta abierta) |
| `image` / `logo` | `/logo.png`, `/gallery/*` |
| `@id` y `url` por sede | — |
| `hasMap` | `Locations.tsx` (enlaces a Google Maps) |
| `availableService` | `ServiceTabs.tsx` (15 servicios listados) |
| `sameAs` (redes sociales) | **no existe en el repo** → pregunta abierta |
| `geo` (lat/long) | **no existe en el repo** → pregunta abierta, no lo invento |

Problemas de estructura adicionales:

- `areaServed` como array de strings sueltos; lo correcto para Google es `{"@type":"City","name":"Arahal"}`.
- El `@graph` contiene un único nodo. Faltan nodos `Organization` y `WebSite` que consolidan la entidad de marca.
- **No hay `FAQPage`** pese a haber 8 FAQs redactadas. Es la oportunidad de *rich result* más barata de toda la web: se genera automáticamente desde el array `faqs` que ya existe, sin escribir contenido nuevo.
- El tipo: `MedicalBusiness` es correcto y admitido por Google. Los dos `department` podrían tiparse de forma más específica (`["MedicalBusiness","Psychologist"]`), pero **no lo recomiendo**: el centro presta también logopedia, psicopedagogía y terapia ocupacional, que no son psicología; `Psychologist` estrecharía indebidamente la descripción. Mantener `MedicalBusiness` es la opción honesta y compatible.

### 2.3 🟠 Estructura de encabezados: correcta, con un salto

- **Un solo `<h1>`** ✅ (Hero).
- `h2` por sección vía `SectionHeading` ✅, más el `h2` propio de `Contact` ✅.
- `h3` para tarjetas de servicio, pasos del proceso y sedes ✅.
- ⚠️ `SocialProof` y `Quote` no tienen encabezado (usan `aria-label`). Aceptable, pero deja dos secciones fuera del esquema del documento.
- ⚠️ Las preguntas del FAQ son `<span>` dentro de un `<button>`, no encabezados. Para el patrón acordeón accesible lo recomendado es `<h3><button>…</button></h3>`: da navegación por encabezados al lector de pantalla y refuerza el esquema.

### 2.4 🟠 Metadata: correcta pero con dos problemas concretos

- **Longitud del `title`:** «Centro Psicopedagógico y de Desarrollo Integral DEFINE | Arahal y Alcalá de Guadaíra» = **83 caracteres**. Google trunca alrededor de 55–60. Lo que se ve en el SERP es aproximadamente *«Centro Psicopedagógico y de Desarrollo Integral DEFINE | …»* → **la marca y las dos localidades, que es lo que más convierte en búsqueda local, se pierden**.
- **`description` = 232 caracteres.** Google corta en ~155–160. La cola («Evaluación, diagnóstico e intervención personalizada») no se muestra nunca.
- Los tres textos (metadata, OpenGraph y Twitter) están **triplicados literalmente**. Funciona, pero es mantenimiento duplicado y desaprovecha que OG puede ser más emocional que el `title` de búsqueda.
- 🔵 `keywords`: Google la ignora desde 2009. Inofensiva, pero es ruido.
- 🔵 Falta `authors` / `publisher` / `category`, `themeColor` y `appleWebApp`. Detalles menores.

### 2.5 🟠 Imagen OpenGraph inservible

`openGraph.images` y `twitter.images` apuntan a `/logo.png` → **1718 × 361 px, ratio 4.76:1, 360 KB**.

Con `twitter:card = summary_large_image`, WhatsApp, Facebook, X y LinkedIn esperan ~1200×630 (1.91:1). Un logo apaisado se recorta o se muestra con enormes bandas. **Y en este negocio el canal principal de captación es WhatsApp**: cada vez que una familia comparte el enlace del centro por WhatsApp, la vista previa está rota.

Solución sin fotos nuevas: generar `app/opengraph-image.tsx` con `ImageResponse` (API nativa de Next, cero dependencias) componiendo logo + nombre + las dos sedes sobre el verde de marca.

### 2.6 🟠 Textos alternativos: todos genéricos o vacíos

| Imagen | `alt` actual | Problema |
|---|---|---|
| Galería (21 fotos) | `Galería DEFINE — foto 1…21` | Cero valor descriptivo, cero valor SEO, **inútil para un lector de pantalla** |
| Duplicados de la galería | `""` + `aria-hidden` | ✅ Correcto |
| Logo (Header) | `DEFINE` | Pobre; debería identificar la entidad |
| Logo Junta (Footer) | `Logotipo de la Junta de Andalucía` | ✅ Correcto |

He revisado el contenido real de las fotos: son sesiones de intervención reales (logopedia con material visual, estimulación sensorial, uso de tablet con pictogramas/SAAC, espacios del centro). Se pueden escribir `alt` **descriptivos y veraces** uno a uno, con keywords naturales («Sesión de logopedia con material visual en el centro DEFINE de Arahal»), sin *keyword stuffing* y sin inventar nada.

> ⚠️ **Aviso de privacidad, no de SEO:** varias fotos muestran **menores identificables de frente**. En España la publicación de imágenes de menores en una web comercial exige consentimiento expreso y documentado de padres/tutores (LOPDGDD art. 7 y RGPD). Doy por hecho que el centro lo tiene, pero es de las cosas que un consultor debe señalar. **Pregunta abierta**, no toco nada.

### 2.7 🟠 Core Web Vitals — riesgos detectados por código

**LCP**
- El logo usa `preload` (API correcta en Next 16; `priority` está deprecada desde v16 ✅). Pero es un **PNG de 360 KB** para renderizarse a 228–267 px de ancho. Se sirve optimizado por `/_next/image`… salvo que Googlebot no lo puede ver por el problema §2.1.
- El LCP real en móvil será casi con seguridad el `<h1>` (texto). Bien: no depende de imágenes.
- `images.formats` no está configurado → Next 16 usa **solo WebP** por defecto. Añadir AVIF ahorra un 20–30 % adicional en las 21 fotos de la galería.

**CLS** 🟠
- El carrusel es la fuente clara de layout shift: `.gallery-carousel-img { height: 280px; width: auto }` mientras que todos los `<Image>` declaran `width={400} height={280}`. Las fotos reales tienen ratios distintos (hay verticales y horizontales). Antes de cargar, cada hueco reserva 400 px de ancho; al cargar, pasa a su ancho real (una vertical 3:4 ocupa 210 px). **Todas las fotos de la fila se desplazan horizontalmente al cargar.**
- Fuentes con `display: swap` y sin `adjustFontFallback` explícito → posible micro-shift al intercambiar la fuente. Menor.

**INP** 🟠
- El carrusel escucha `mousemove` en **todo el `document` de forma permanente**, no solo durante el arrastre, durante toda la vida de la página. Cada movimiento del ratón ejecuta el handler.
- `moveTrack` hace `track.scrollWidth` en cada `mousemove`/`touchmove` → **forced reflow síncrono** en el hilo principal en cada frame de arrastre. Es el peor patrón posible para INP.
- 42 elementos `<Image>` en el DOM (21 fotos × 2 por el bucle), 8 de ellos con `loading="eager"` pese a estar por debajo del pliegue → compiten por ancho de banda con el contenido visible.

### 2.8 🔵 Enlazado interno y `next/link`

Correcto: al ser una landing de una sola página, los anclas `<a href="#seccion">` son la opción adecuada; `next/link` no aporta nada aquí y no es un error no usarlo. Sin breadcrumbs, que tampoco proceden en un sitio de una página.

Dos detalles:
- El logo del Header enlaza a `href="#"`, que ensucia la URL con una almohadilla suelta. Mejor `href="/"` o `#top`.
- La sección `#galeria` existe pero **no está en el menú**, ni en el móvil ni en escritorio.

### 2.9 🔵 `sitemap.ts`, canonical y hreflang

- `sitemap.ts` ✅ correcto para una sola URL. `lastModified: new Date()` marca «modificado hoy» en cada build aunque no cambie nada — cosmético.
- Canonical `/` con `metadataBase` correcto ✅.
- **hreflang: no procede.** Sitio monolingüe en español para dos municipios de Sevilla.
- Se podría añadir la extensión de imágenes al sitemap para reforzar la indexación de la galería.

### 2.10 🔵 Falta página 404 propia

No existe `app/not-found.tsx`. Un visitante que llegue a una URL errónea ve la 404 por defecto de Next: fondo blanco, **texto en inglés** («This page could not be found»), sin logo, sin salida hacia la home ni hacia el teléfono. Impacto pequeño en tráfico, impacto grande en percepción de marca.

### 2.11 🔵 Oportunidad estructural: una sola página limita el alcance local

Con una única URL, la web compite con un solo documento para *todas* las intenciones de búsqueda: «logopeda Arahal», «psicólogo infantil Alcalá de Guadaíra», «beca NEAE Sevilla», «atención temprana Arahal»… Lo natural sería una página por servicio y/o por sede. **Está fuera del alcance de este encargo** (requiere contenido nuevo y decisiones de negocio), pero es la palanca de crecimiento orgánico más grande que tiene el proyecto. Lo dejo en §6.

---

## 3. Stack técnico y calidad de código

### 3.1 🟠 Semántica de landmarks rota: `<header>` y `<footer>` dentro de `<main>`

`page.tsx` envuelve **todo** en `<main>`, incluidos `Header`, `Footer` y `StickyMobileBar`.

Según la especificación, `<header>` solo expone el landmark `banner` y `<footer>` solo expone `contentinfo` **cuando su ancestro más cercano es `<body>`**. Metidos dentro de `<main>` se degradan a elementos genéricos. Un usuario de lector de pantalla que navegue por landmarks (una vía de navegación habitual) **pierde la cabecera y el pie de página**. Además, el `<main>` pasa a contener la navegación, que debería quedar fuera.

Arreglo trivial y sin riesgo visual: sacar `Header`, `Footer` y `StickyMobileBar` fuera de `<main>` y mover las clases al `<body>` o a un fragmento.

### 3.2 🔴 Componentes muertos: 8 archivos sin usar, ~600 líneas

`page.tsx` solo importa 12 componentes. Sin ninguna referencia en el árbol de la aplicación:

| Archivo | Líneas | Estado |
|---|---|---|
| `components/GalleryGrid.tsx` | 174 | **Roto**: depende de las clases CSS `.gallery-grid`, `.gallery-item`, `.gallery-item-incoming` que **ya no existen en `globals.css`**. Además contiene el único *error* de ESLint del repo. |
| `components/Gallery.tsx` | 64 | Exporta `GalleryBlock` (nombre que no coincide con el archivo). Sin uso. |
| `sections/GallerySection.tsx` | 70 | Apunta a `/galeria/*.jpg`, **carpeta que no existe** (la real es `/gallery/`). Usa `picsum.photos` como fallback. Única razón por la que la CSP permite `picsum.photos`. |
| `sections/Services.tsx` | 107 | Versión anterior de `ServiceTabs`. Contenido duplicado y divergente. |
| `sections/Psychotherapy.tsx` | 65 | Contiene información **que no está en ninguna otra parte de la web** (EMDR, ACT, constelaciones familiares, TCA, adicciones, duelo…). |
| `sections/AdultSupport.tsx` | 40 | Ídem: el programa de diversidad funcional detallado en 8 líneas de servicio, hoy reducido a una tarjeta. |
| `sections/Team.tsx` | 168 | Contiene `"[Nombre]"` como placeholder y rutas `/team/*.jpg` inexistentes. |
| `sections/WhyDefine.tsx` | 23 | Sin uso. |

**Matiz importante:** `Psychotherapy.tsx` y `AdultSupport.tsx` no son código basura, son **contenido de negocio real que se cayó de la página**. Y las últimas ediciones del usuario tocan `Psychotherapy.tsx` y `Services.tsx`, es decir, **se están editando archivos que no se renderizan**. Eso es señal de que se dan por publicados. Antes de borrar nada hay que decidir si ese contenido vuelve a la página o se archiva.

También hay basura de plantilla: `public/next.svg`, `public/vercel.svg`, `public/globe.svg`, `public/window.svg`, `public/file.svg`, `public/favicon.jpg` (sin usar; el favicon real es `app/favicon.ico`) y `app/README.txt` (publicidad del conversor de iconos, versionado en git).

### 3.3 ✅ Server / Client Components: uso correcto

Bien resuelto y merece decirse: solo son `"use client"` los cinco componentes que realmente necesitan estado o eventos (`Header`, `MobileMenu`, `ServiceTabs`, `Faqs`, `GalleryCarousel`, `FallbackImage`). Hero, SocialProof, Process, Quote, Locations, Contact y Footer son Server Components puros. `PhotoGallery` es un Server Component `async` que lee el sistema de archivos en build. Es exactamente el patrón correcto en App Router.

Un matiz: `Header` es cliente **solo** para añadir una sombra al hacer scroll. Ese efecto se puede lograr en CSS puro con `animation-timeline: scroll()` o con un `IntersectionObserver` sobre un centinela, dejando el header como Server Component. Optimización menor, no urgente.

### 3.4 ✅ TypeScript: limpio

- **Cero `any`**, cero `@ts-ignore`, cero `console.log`, `strict: true`. Nada que reprochar.
- 🔵 Los tipos de datos viven inline en cada componente (`ServiceItem`, `Tab`, `IconKey`, `NavItem`, `GalleryImage`, `Member`). Con este tamaño de proyecto es razonable; no crearía una carpeta `types/` por ahora.
- 🔵 `PrimaryButton` y `SecondaryButton` repiten la firma de props y difieren solo en clases. Se unificarían en un `Button` con `variant`, pero es refactor cosmético.
- 🔵 `ui.tsx` mezcla cuatro componentes no relacionados (`Card`, `SectionHeading`, `PrimaryButton`, `SecondaryButton`, `ImageFrame`) en un archivo. Aceptable, aunque `ImageFrame` solo lo usa `Gallery.tsx`, que está muerto.

### 3.5 🟠 Organización de `app/components/`

- No existe `MobileMenLocations` (el brief lo mencionaba); el archivo real es `MobileMenu.tsx`, bien nombrado. ✅
- **Sí hay** una incoherencia real: `Gallery.tsx` **no exporta `Gallery`**, exporta `GalleryBlock`. Archivo y símbolo no coinciden.
- Los componentes de galería están repartidos entre `components/` (`Gallery`, `GalleryGrid`, `GalleryCarousel`) y `components/sections/` (`GallerySection`, `PhotoGallery`) sin criterio claro. Tras la limpieza queda uno solo y el problema desaparece.
- 🔵 Ni un solo test. Para una landing estática es defendible, pero no hay red de seguridad ante regresiones.

### 3.6 🟠 Gestión de imágenes

- `next/image` se usa correctamente con `width`/`height`/`sizes` en casi todos los sitios ✅.
- ❌ **Falta configurar AVIF** (`images.formats`), ver §2.7.
- ❌ **15 MB de originales para 21 fotos.** Cuatro de ellas superan los 2,4 MB (`IMG_1550.jpeg` pesa **4,2 MB**). Next las optimiza al servir, pero infla el repo y el tiempo de build/optimización.
- ❌ **Nombres de archivo con espacios y erratas de tecleo**: `WhatsApp Imag3e 2026-05-08 at 09.02.44.jpeg`, `WhatsApp Image 2026-05-028 at 09.03.01.jpeg`, `WhatsApp Image 2026-05-08 5at 09.02.06.jpeg`, `…09.402.06.jpeg`, `…09.802.06.jpeg`… Funcionan (Next codifica la URL), pero los espacios en URLs son frágiles y el nombre del archivo es una señal SEO menor en Google Imágenes. Como solo se referencian dinámicamente vía `readdir`, **renombrarlos es 100 % seguro**.
- 🔵 `PhotoGallery` baraja con `files.sort(() => Math.random() - 0.5)`: es un barajado **estadísticamente sesgado** y hace el build **no determinista** (cada deploy reordena la galería). Mejor un orden fijo y curado.
- 🔵 Sin `placeholder="blur"` en la galería: los huecos aparecen en blanco hasta que carga cada foto.

### 3.7 Accesibilidad

**🟠 Contraste — dos fallos AA reales** (calculados sobre la paleta actual):

| Elemento | Color | Fondo | Ratio | AA (4.5:1) |
|---|---|---|---|---|
| Eyebrow de sección («ESPECIALIDADES», «GALERÍA»…) | `#5f7d76` | blanco | **4.49** | ❌ (por 0.01) |
| Eyebrow de sección | `#5f7d76` | `#F7F5F0` | **4.12** | ❌ |
| «Equipo DEFINE» en `Quote` | blanco 60 % | `#2f6d63` | **3.30** | ❌ |
| Texto `muted` | `#576a66` | blanco | 5.74 | ✅ |
| Texto `muted` | `#576a66` | `#F7F5F0` | 5.27 | ✅ |
| Botón/enlace `brand` | `#2f6d63` | blanco | 6.02 | ✅ |
| Blanco sobre `brand` | `#ffffff` | `#2f6d63` | 6.02 | ✅ |
| `ink` / `ink-soft` | — | blanco | 13.70 / 10.24 | ✅ |

El resto de la paleta está bien. Los dos fallos se corrigen oscureciendo `--color-eyebrow` a ~`#4e6b64` y subiendo el blanco de la firma a 75–80 %, sin que cambie la percepción visual.

**🟠 Patrón de tabs incompleto (`ServiceTabs`)**
Usa `role="tablist"` / `role="tab"` / `role="tabpanel"`, así que un lector de pantalla anuncia «pestaña 1 de 3» y el usuario **espera poder moverse con las flechas** — y no puede. Además:
- Falta `id` en cada `<button role="tab">` y `aria-labelledby` en el panel.
- `aria-controls` apunta a `tabpanel-adultos` / `tabpanel-familia`, elementos que **no existen en el DOM** salvo cuando esa pestaña está activa (referencia rota).
- Sin *roving tabindex*: el foco recorre las tres pestañas con Tab, lo contrario del patrón ARIA.
- El panel no es enfocable (`tabIndex={-1}`), así que al cambiar de pestaña el foco no se lleva al contenido.

**🟠 Acordeón FAQ**
- Sin `aria-controls` ni `id` en el panel: el botón dice `aria-expanded` pero no *qué* expande.
- El contenido colapsado sigue en el DOM con `max-h-0 opacity-0` pero **sin `hidden` ni `visibility`**: un lector de pantalla lee las 8 respuestas aunque estén cerradas visualmente, y los enlaces internos serían enfocables si los hubiera.
- Las preguntas no son encabezados (ver §2.3).

**🟠 Menú móvil**
- No cierra con `Escape`, ni al hacer clic fuera, ni atrapa el foco.
- Sin `aria-controls` que vincule el botón con el panel desplegable.

**🔵 Foco visible**
`focus-visible:outline-brand` está bien aplicado en botones y tabs, pero **falta en los enlaces de navegación del Header, en los enlaces del Footer y en los del menú móvil**, que solo tienen `hover`. Un usuario de teclado se pierde en la cabecera. (El outline por defecto del navegador sigue existiendo, pero es inconsistente con el resto.)

**🟠 `prefers-reduced-motion` — aplicado a medias**
| Animación | ¿Respetada? |
|---|---|
| `.gallery-carousel-track` | ✅ `animation: none !important` |
| `.animate-marquee-*` | ✅ (aunque ya solo lo usa un componente muerto) |
| `scroll-behavior: smooth` | ✅ |
| **Transición de las tarjetas de servicio** (`hover:-translate-y-0.5`) | ❌ |
| **Rotación 45° del icono `+` del FAQ** | ❌ |
| **Transición `max-height` del acordeón** | ❌ |
| **Transición de sombra del Header al hacer scroll** | ❌ |

Y hay un detalle más grave: con `prefers-reduced-motion` activo, el carrusel **se congela mostrando las 6–7 primeras fotos y las 14 restantes quedan inalcanzables**, porque no hay ningún control manual. Es decir: para un usuario con sensibilidad al movimiento, el 70 % de la galería **no existe**.

**🔵 Otros**
- `dl` / `dt` / `dd` en `SocialProof` están **invertidos**: el valor («+500») es `dt` y la etiqueta («familias acompañadas») es `dd`. Semánticamente el término es la etiqueta y la descripción es el valor.
- Sin enlace «Saltar al contenido» (*skip link*).
- `StickyMobileBar` no contempla `env(safe-area-inset-bottom)` en iPhone con barra de gestos.

### 3.8 Rendimiento del bundle

- ✅ Sin dependencias pesadas, sin librerías de animación, iconos SVG inline (buena decisión).
- 🟠 **`@vercel/analytics` y `@vercel/speed-insights` no funcionan en Netlify.** Ambos envían datos a un endpoint `/_vercel/insights/*` que solo existe en el hosting de Vercel. Si el deploy real es Netlify (como indica `netlify.toml`), se está cargando JS de terceros que **no recoge un solo dato**, con el coste de una conexión externa, y encima obliga a abrir la CSP a `va.vercel-scripts.com` y `vitals.vercel-insights.com`. → **Pregunta abierta**: ¿el deploy es Netlify o Vercel?
- 🔵 `netlify.toml` no declara `@netlify/plugin-nextjs`; Netlify lo autodetecta, así que funciona, pero es una dependencia implícita.

### 3.9 Cabeceras de seguridad y CSP

Revisadas contra todo lo que carga la web hoy:

| Directiva | Estado |
|---|---|
| `script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com` | ✅ funciona. `'unsafe-inline'` es necesario hoy para los scripts inline de Next y el JSON-LD. |
| `style-src … https://fonts.googleapis.com` | 🔵 **innecesario**: `next/font/google` descarga y auto-hospeda las fuentes en build; no hay ninguna petición a Google en runtime. |
| `font-src … https://fonts.gstatic.com` | 🔵 innecesario, mismo motivo. |
| `img-src … https://picsum.photos` | 🔵 **innecesario**: solo lo usaban los fallbacks de componentes muertos. |
| `connect-src` (vercel insights) | ✅ correcto *si* el deploy es Vercel; sobra si es Netlify. |
| `frame-ancestors 'none'`, `object-src 'none'`, `base-uri`, `form-action` | ✅ |
| HSTS `max-age=63072000; includeSubDomains; preload` | ✅ |
| `X-XSS-Protection: 1; mode=block` | 🔵 **cabecera obsoleta**. Los navegadores modernos la ignoran y en su día introdujo vulnerabilidades propias; la recomendación actual (OWASP) es omitirla o ponerla a `0`. Inofensiva. |
| `Permissions-Policy` | 🔵 correcta; se le podría añadir `interest-cohort=()`, `payment=()`, `usb=()`. |

**Conclusión: la CSP no rompe nada hoy y es estricta.** Solo tiene permisos de más que se pueden cerrar al limpiar el código muerto. Si en el futuro se incrusta un mapa de Google, hará falta `frame-src https://www.google.com`.

---

## 4. Diseño UX / UI

### 4.1 🔴 El carrusel de la galería — análisis detallado

Es, como sospechabas, el punto más débil de la web. Desglose de por qué:

**a) Velocidad: matemáticamente vertiginosa.**
`SECONDS_PER_PHOTO = 1` y 21 fotos → la mitad de la pista (~8.000 px) se recorre en **21 segundos**, es decir **≈ 380 px/s**. Cada foto cruza y desaparece en poco más de un segundo. Para comparar: un marquee de logos cómodo va a 40–80 px/s. Va **entre 5 y 9 veces más rápido de lo que resulta legible**. No es una impresión subjetiva: a esa velocidad el ojo no puede fijar ninguna imagen. De ahí la sensación de mareo y de descontrol.

**b) Controles: hay dos, ambos ocultos y ninguno descubrible.**
- Pausa al pasar el ratón por encima: **solo escritorio**, y nada lo anuncia.
- Arrastre manual: no hay ninguna señal visual de que se pueda arrastrar (más allá del cursor `grab`), y en móvil compite con el scroll vertical de la página.
- **No hay flechas, ni puntos, ni botón de pausa, ni indicador de posición.** El usuario no sabe cuántas fotos hay ni dónde está.

**c) Móvil:** el `touchmove` llama a `preventDefault()`, así que **secuestra el gesto vertical**: si el usuario empieza a deslizar dentro del carrusel para seguir bajando por la página, la página no baja. Es un patrón que genera frustración en móvil, que es donde estará la mayoría del tráfico.

**d) Accesibilidad:**
- El contenedor no tiene `role`, ni `aria-label`, ni `aria-roledescription`. Un lector de pantalla se encuentra **21 imágenes sueltas** con textos alternativos «foto 1… foto 21», sin manera de saltarse el bloque ni de entender qué es.
- Con teclado: **totalmente inaccesible.** No hay ningún elemento enfocable.
- `prefers-reduced-motion` para la animación ✅… pero deja 14 fotos inalcanzables (§3.7).

**e) Rendimiento:** forced reflow por frame de arrastre, `mousemove` global permanente, 42 nodos de imagen, 8 en `eager`, CLS horizontal al cargar (§2.7).

**f) Tono de marca:** una tira de fotos disparada a 380 px/s comunica **ruido y urgencia**. El público objetivo es una familia preocupada buscando ayuda para su hijo, o un adulto en un momento vulnerable. La web debe transmitir **calma, orden y profesionalidad**. Esta pieza hace justo lo contrario, y está colocada en mitad de la página, justo después de «Cómo trabajamos».

**Alternativa recomendada — carrusel con scroll-snap nativo + lightbox, sin autoplay**

```
┌───────────────────────────────────────────────────────┐
│  Galería · Nuestros espacios y momentos               │
│                                                       │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌───────           │
│  │        │ │        │ │        │ │                   │
│  │  foto  │ │  foto  │ │  foto  │ │  foto             │
│  │        │ │        │ │        │ │                   │
│  └────────┘ └────────┘ └────────┘ └───────           │
│   ◄   ►                        ● ● ○ ○ ○ ○            │
└───────────────────────────────────────────────────────┘
        clic en una foto → lightbox a pantalla completa
```

Por qué esta y no otra:

1. **Scroll nativo (`overflow-x: auto` + `scroll-snap-type: x mandatory`)**: en móvil se desliza con el gesto que el usuario ya conoce, con inercia real del sistema, **sin secuestrar el scroll vertical** y sin una sola línea de JS de arrastre. Adiós al forced reflow y a los listeners globales.
2. **El movimiento lo controla siempre la persona.** Cero autoplay ⇒ cero mareo, cero problema con `prefers-reduced-motion` (no hay animación que desactivar) y cero contenido inalcanzable. Es la opción que transmite calma.
3. **Flechas visibles en escritorio + puntos de paginación**: descubribilidad inmediata y sensación de control. Los puntos indican cuántas fotos hay.
4. **Accesible por defecto**: un contenedor con `overflow` y `tabindex="0"` es enfocable y navegable con flechas del teclado de forma nativa; se añade `role="group"` + `aria-roledescription="carrusel"` y `alt` reales por foto.
5. **Lightbox al hacer clic**: las fotos de instalaciones y de sesiones son un argumento de venta; a 280 px de alto y en movimiento no se aprecian. Poder verlas grandes convierte la galería de decoración en prueba social.
6. **Sin CLS**: cada slide en una caja de proporción fija con `object-fit: cover` y `placeholder="blur"`.

*Alternativa B, si prefieres la máxima calma:* rejilla estática tipo mosaico (3–4 columnas en escritorio, 2 en móvil) con lightbox y un botón «ver más». Cero movimiento, la más sobria y la más rápida. Es una opción perfectamente válida para este sector; la descarto como primera recomendación solo porque una rejilla de 21 fotos ocupa mucho vertical en una landing que ya es larga.

### 4.2 🟠 Sin navegación entre 768 px y 1024 px (tablet)

```
Header.tsx
  <nav className="hidden … lg:flex">     → visible a partir de 1024 px
  <MobileMenu className="… md:hidden">   → oculto a partir de  768 px
```

Entre **768 y 1023 px (iPad vertical, tablets Android, móviles en horizontal) no hay ningún acceso a la navegación**: ni menú hamburguesa ni enlaces. Solo quedan el teléfono y el botón de reservar. Es un bug de responsive real y afecta a un rango de pantallas muy común. Se corrige cambiando `md:hidden` por `lg:hidden` en el botón del menú.

### 4.3 🟠 Acordeón FAQ: el texto se corta en pantallas pequeñas

`max-h-48` = 192 px fijos. En un móvil de 320 px de ancho (iPhone SE), la respuesta más larga ocupa ~216 px → **se corta sin aviso**. En pantallas de 360 px queda al borde. Solución robusta: transición con `grid-template-rows: 0fr → 1fr`, que se adapta a cualquier alto sin números mágicos.

### 4.4 🔵 Jerarquía visual y espaciado: sólidos

- Ritmo vertical consistente (`py-20 sm:py-24` en todas las secciones) ✅
- Alternancia de fondos blanco / `#F7F5F0` / verde de marca bien dosificada ✅
- `SectionHeading` unifica eyebrow + h2 + descripción en toda la página ✅
- 🔵 **Un valor mágico repetido**: `bg-[#F7F5F0]` está hardcodeado en `ServiceTabs` y `Faqs`, pero no es un token del `@theme`. Lo mismo con `#c8d8d2`, `#5a746e`, `#4f6560` (Hero), `#b5c8c1`, `#90aca4` (botones), `#e3ece8` (separadores). Hay tokens definidos para casi todos ellos (`--color-tint`, `--color-line`, `--color-line-strong`, `--color-muted-*`) y aun así se usan hexadecimales sueltos. Contradice la regla del propio proyecto de no hardcodear.
- 🔵 En `ServiceTabs`, la pestaña «Niños y adolescentes» muestra 8 tarjetas y «Familia» solo 3: el salto de altura al cambiar de pestaña es brusco y desplaza el pie de página.

### 4.5 🔵 CTAs: consistentes, con dos matices

- `PrimaryButton` / `SecondaryButton` con `min-h-12` (48 px) cumplen el tamaño mínimo táctil ✅
- Los enlaces de WhatsApp de `Hero`, `Contact`, `Header` y `StickyMobileBar` **no llevan `target="_blank"` ni `rel="noopener noreferrer"`**, mientras que los de `Locations` sí. Incoherencia: en escritorio, WhatsApp Web sustituye la pestaña de la web y el usuario pierde la página.
- `StickyMobileBar` pone «Llamar» como botón secundario y «WhatsApp» como primario, mientras que el Hero prioriza «Reserva tu primera consulta». Coherente en intención, pero conviene revisar que WhatsApp sea de verdad el canal preferido.
- 🔵 **Ningún CTA está medido.** Sin eventos de analítica en clics de WhatsApp/teléfono no hay forma de saber qué convierte. (Depende de resolver §3.8.)

### 4.6 🔵 «Formulario de contacto»: no existe

La sección `#contacto` **no tiene formulario**: son dos botones a WhatsApp y a teléfono. Por eso no hay nada que auditar en validación ni en feedback de errores.

No es necesariamente un fallo —en este sector WhatsApp convierte muy bien y evita fricción—, pero se pierde a quien no quiere llamar ni dar su número al primer contacto (bastante común precisamente en salud mental), y a quien visita la web fuera de horario. Un formulario mínimo (nombre, contacto, motivo, sede, consentimiento RGPD) es la mejora de conversión más probable después del carrusel. **Requiere decisiones que no puedo tomar**: a qué correo llegan los avisos, texto de la política de privacidad, y confirmar el hosting. → §6.

### 4.7 🟠 Falta la prueba social que más convierte: testimonios

Se afirma «5.0 ★ valoración en Google» pero **no hay ni una sola reseña citada, ni enlace al perfil de Google**. Un bloque con 3 testimonios reales (aunque sean anónimos: «Madre de un niño de 7 años, Arahal») multiplicaría la credibilidad y permitiría marcado `Review`/`AggregateRating` en JSON-LD. **Requiere contenido nuevo del cliente** → §6.

### 4.8 🔵 Aviso legal, privacidad y cookies: ausentes

No hay página ni enlace de **Aviso legal, Política de privacidad ni Política de cookies**. Para una empresa española que además trata datos de salud y publica imágenes de menores, es una carencia legal, no estética. Hoy la web **no instala cookies propias** (Vercel Analytics es *cookieless*), así que no hace falta banner de consentimiento, pero sí los textos legales identificando al titular. → §6, requiere datos fiscales reales.

### 4.9 🔵 Responsive: revisión por breakpoints

| Ancho | Estado |
|---|---|
| 320 px (iPhone SE) | ⚠️ FAQ recortado (§4.3). El resto responde bien. |
| 360–430 px (móvil común) | ✅ Correcto. `StickyMobileBar` + `pb-24` bien resueltos. |
| **768–1023 px (tablet)** | 🔴 **Sin navegación** (§4.2). Además `StickyMobileBar` desaparece en `md:` (768 px), así que en tablet no hay ni menú ni barra fija. |
| 1024–1279 px | ✅ Correcto. |
| ≥ 1280 px | ✅ `max-w-6xl` mantiene la medida de lectura. |

---

## 5. Resumen de hallazgos por severidad

**🔴 Crítico (3)**
1. `robots.ts` bloquea `/_next/`: impide a Google renderizar la web e indexar las imágenes. (§2.1)
2. Carrusel de la galería: velocidad ingobernable, sin controles, inaccesible por teclado, secuestra el scroll en móvil y esconde el 70 % de las fotos con `prefers-reduced-motion`. (§4.1)
3. 8 componentes muertos (~600 líneas), uno de ellos roto y con el único error de ESLint del repo. (§3.2)

**🟠 Importante (13)**
4. `<header>`/`<footer>` dentro de `<main>`: se pierden los landmarks. (§3.1)
5. Sin navegación entre 768 y 1023 px. (§4.2)
6. Contraste AA insuficiente en los eyebrows y en la firma de la cita. (§3.7)
7. Patrón de tabs ARIA incompleto (sin flechas, `aria-controls` roto). (§3.7)
8. Acordeón FAQ: contenido oculto legible por lectores de pantalla, sin `aria-controls`, y **texto cortado a 320 px**. (§3.7, §4.3)
9. JSON-LD sin horarios, sin `FAQPage`, sin `image`, sin servicios. (§2.2)
10. `title` de 83 caracteres y `description` de 232: ambos truncados en el SERP. (§2.4)
11. Imagen OpenGraph = logo apaisado: vista previa rota al compartir por WhatsApp. (§2.5)
12. `alt` genéricos en las 21 fotos de la galería. (§2.6)
13. CLS horizontal e INP degradado por el carrusel; sin AVIF. (§2.7, §3.6)
14. `prefers-reduced-motion` no cubre 4 de las 8 animaciones. (§3.7)
15. Analítica de Vercel probablemente inoperante en Netlify. (§3.8)
16. H1 solo habla de niños pese a atender adultos y familias. (§1.1)
17. Sin testimonios pese a afirmar 5.0 ★. (§4.7)

**🔵 Mejora (14)** — menú móvil sin `Escape`/foco atrapado, foco visible ausente en enlaces, `dl/dt/dd` invertidos, sin *skip link*, sin 404 propia, valores de color hardcodeados fuera del `@theme`, `Gallery.tsx` mal nombrado, imágenes de 4 MB con nombres con erratas, barajado aleatorio no determinista, sin `placeholder="blur"`, CSP con permisos sobrantes, `X-XSS-Protection` obsoleta, WhatsApp sin `target="_blank"`, basura de plantilla en `public/` y `app/README.txt`.

---

## 6. Preguntas abiertas (necesito tu respuesta / la del centro)

1. **¿El deploy real es Netlify o Vercel?** De ello depende si la analítica funciona y si se puede usar Netlify Forms para un formulario de contacto.
2. **¿Los CTAs deben seguir dirigiendo todo a Arahal?** Un usuario de Alcalá que pulsa «Reserva tu primera consulta» escribe al centro de Arahal. Alternativa: un selector de sede antes de abrir WhatsApp.
3. **Fotos de menores identificables**: ¿existe consentimiento firmado de padres/tutores para su uso en la web? Es requisito legal (RGPD / LOPDGDD).
4. **Datos que faltan y no invento**: códigos postales de ambas sedes, coordenadas GPS, perfiles de redes sociales (Instagram/Facebook) y enlace a la ficha de Google Business. Todos mejorarían el JSON-LD y el SEO local.
5. **`Psychotherapy.tsx` y `AdultSupport.tsx`** contienen contenido real (EMDR, ACT, TCA, adicciones, duelo, taller ocupacional, accesibilidad cognitiva…) que **no aparece en ninguna parte de la web publicada**. ¿Se recupera en la página o lo archivo? Estás editando esos archivos, así que sospecho que los das por publicados.
6. **Testimonios**: ¿podemos publicar 3 reseñas (aunque sean anónimas)? Es la mejora de conversión más rentable que queda.
7. **Textos legales**: hacen falta datos fiscales del titular para el aviso legal y la política de privacidad.
8. **Formulario de contacto**: ¿interesa? ¿A qué correo llegarían los avisos?

---

*El plan de acción priorizado está en `PLAN.md`.*
