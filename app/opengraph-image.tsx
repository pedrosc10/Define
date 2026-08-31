import { readFile } from "fs/promises";
import path from "path";
import { ImageResponse } from "next/og";

export const alt =
  "DEFINE — Centro Psicopedagógico y de Desarrollo Integral en Arahal y Alcalá de Guadaíra";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Vista previa al compartir el enlace (WhatsApp, Facebook, X, LinkedIn).
 * Antes se usaba /logo.png, de 1718 × 361 px: con un ratio de 4.76:1 las redes
 * lo recortaban o lo mostraban con bandas enormes. Aquí se compone la imagen
 * 1200 × 630 que esperan, solo con texto que ya está en la web.
 */
export default async function OpenGraphImage() {
  const logo = await readFile(path.join(process.cwd(), "public", "logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
          padding: 80,
          background: "linear-gradient(135deg, #ffffff 0%, #ecf4f1 100%)",
          borderBottom: "24px solid #2f6d63",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="" width={620} height={130} />

        <div
          style={{
            display: "flex",
            fontSize: 46,
            lineHeight: 1.25,
            color: "#18322d",
            textAlign: "center",
            maxWidth: 940,
          }}
        >
          Psicopedagogía, psicología, logopedia y neuropsicología
        </div>

        <div style={{ display: "flex", fontSize: 38, color: "#2f6d63", fontWeight: 600 }}>
          Arahal · Alcalá de Guadaíra
        </div>
      </div>
    ),
    size,
  );
}
