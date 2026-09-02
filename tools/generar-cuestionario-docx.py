# -*- coding: utf-8 -*-
"""
Genera PREGUNTAS-CONTENIDO-WEB.docx a partir de PREGUNTAS-CONTENIDO-WEB.txt.

El .txt es la fuente: si cambian las preguntas se editan allí y se vuelve a
ejecutar este script, de modo que no hay dos versiones que se desincronicen.

    python tools/generar-cuestionario-docx.py

Un .docx es un ZIP con XML dentro, así que se construye con la biblioteca
estándar y no hace falta instalar nada.
"""

import re
import zipfile
from pathlib import Path
from xml.sax.saxutils import escape

RAIZ = Path(__file__).resolve().parent.parent
ORIGEN = RAIZ / "PREGUNTAS-CONTENIDO-WEB.txt"
DESTINO = RAIZ / "PREGUNTAS-CONTENIDO-WEB.docx"

# Las seis preguntas comunes a todos los servicios. En el .txt aparecen una sola
# vez al principio de la parte 3 y luego se referencian como "(1)".."(6)"; aquí
# se expanden dentro de cada servicio para que quien responda desde el móvil no
# tenga que volver atrás a mirar cuál era cuál.
PREGUNTAS_SERVICIO = {
    "1": "¿A quién va dirigido? Edades y perfil.",
    "2": "SEÑALES DE ALERTA: ¿qué nota una familia en casa o un profesor en clase "
         "que debería hacer que os llamen? Cuantas más y más concretas, mejor.",
    "3": "¿Cómo es una sesión? Duración, cada cuánto, quién entra, qué material o método.",
    "4": "¿Cuánto suele durar la intervención completa?",
    "5": "¿Qué 3 o 4 preguntas os hacen siempre las familias sobre esto, y su respuesta?",
    "6": "¿Algo que la gente crea erróneamente sobre este servicio y convenga aclarar?",
}

VERDE = "2F6D63"
TINTA = "18322D"
GRIS = "576A66"
FONDO_RESPUESTA = "F4F7F6"
BORDE_RESPUESTA = "C7D9D3"

LADOS = ("top", "left", "bottom", "right")


def parrafo(texto="", estilo=None, negrita=False, cursiva=False, color=None, respuesta=False):
    """Devuelve el XML de un párrafo."""
    props = []
    if estilo:
        props.append('<w:pStyle w:val="' + estilo + '"/>')
    if respuesta:
        props.append('<w:shd w:val="clear" w:color="auto" w:fill="' + FONDO_RESPUESTA + '"/>')
        bordes = "".join(
            '<w:' + lado + ' w:val="single" w:sz="6" w:space="6" w:color="' + BORDE_RESPUESTA + '"/>'
            for lado in LADOS
        )
        props.append("<w:pBdr>" + bordes + "</w:pBdr>")
        props.append('<w:spacing w:before="60" w:after="280" w:line="360" w:lineRule="auto"/>')

    rpr = []
    if negrita:
        rpr.append("<w:b/>")
    if cursiva:
        rpr.append("<w:i/>")
    if color:
        rpr.append('<w:color w:val="' + color + '"/>')

    ppr = "<w:pPr>" + "".join(props) + "</w:pPr>" if props else ""
    if not texto:
        return "<w:p>" + ppr + "</w:p>"
    run_props = "<w:rPr>" + "".join(rpr) + "</w:rPr>" if rpr else ""
    return (
        "<w:p>" + ppr + "<w:r>" + run_props
        + '<w:t xml:space="preserve">' + escape(texto) + "</w:t></w:r></w:p>"
    )


def caja_respuesta():
    return parrafo("", respuesta=True)


def es_regla(linea, caracter):
    s = linea.strip()
    return len(s) > 10 and set(s) == {caracter}


def inicia_bloque(linea):
    """¿La línea abre un elemento nuevo? Sirve para no tragárselo como prosa."""
    s = linea.strip()
    if not s:
        return True
    if re.match(r"^\d+\.[0-9A-Z]", s) or re.match(r"^\(\d\)$", s):
        return True
    if s.startswith(">>>") or s.startswith("EXTRA"):
        return True
    return any(es_regla(linea, c) for c in "=-.")


def convertir(lineas):
    """Recorre el .txt y devuelve la lista de párrafos del documento."""
    out = []
    i = 0
    n = len(lineas)
    primer_titulo = True
    en_intro = False

    while i < n:
        linea = lineas[i].rstrip()
        crudo = linea.strip()

        # Encabezados: la regla marca el nivel, el texto va dentro del recuadro.
        regla = next((c for c in "=-." if es_regla(linea, c)), None)
        if regla:
            j = i + 1
            titulo = []
            while j < n and not es_regla(lineas[j], regla):
                if lineas[j].strip():
                    titulo.append(lineas[j].strip())
                j += 1
            texto = " — ".join(titulo) if regla == "=" else " ".join(titulo)
            if texto:
                if regla == "=":
                    out.append(parrafo(texto, estilo="Title" if primer_titulo else "Heading1"))
                    primer_titulo = False
                    en_intro = False
                else:
                    en_intro = texto.upper().startswith("ANTES DE EMPEZAR")
                    out.append(parrafo(texto, estilo="Heading2"))
            i = j + 1
            continue

        if not crudo:
            i += 1
            continue

        # Marcador de pregunta común de servicio: "(3)"
        marcador = re.fullmatch(r"\((\d)\)", crudo)
        if marcador:
            num = marcador.group(1)
            destacada = num == "2"
            out.append(
                parrafo("(" + num + ") " + PREGUNTAS_SERVICIO.get(num, ""),
                        negrita=destacada, color=VERDE if destacada else TINTA)
            )
            out.append(caja_respuesta())
            i += 1
            continue

        # Pregunta numerada: "1.1  ¿A partir de qué edad…" / "3.2  LOGOPEDIA…"
        pregunta = re.match(r"^(\d+\.[0-9A-Z]+(?:\.\d+)?)\s+(.+)$", crudo)
        if pregunta:
            ident, texto = pregunta.groups()
            j = i + 1
            while j < n and not inicia_bloque(lineas[j]):
                texto += " " + lineas[j].strip()
                j += 1

            es_servicio = re.fullmatch(r"3\.\d+", ident) is not None
            out.append(
                parrafo(ident + "  " + texto,
                        estilo="Heading3" if es_servicio else None,
                        negrita=True,
                        color=VERDE if es_servicio else TINTA)
            )
            # Los servicios llevan sus cajas en los "(1)".."(6)"; el resto, aquí.
            if not es_servicio:
                out.append(caja_respuesta())
            i = j
            continue

        # Aviso destacado
        if crudo.startswith(">>>"):
            texto = crudo.lstrip("> ").strip()
            j = i + 1
            while j < n and not inicia_bloque(lineas[j]):
                texto += " " + lineas[j].strip()
                j += 1
            out.append(parrafo(texto, negrita=True, color=VERDE))
            i = j
            continue

        # Bloque EXTRA: enunciado propio y su caja
        if crudo.startswith("EXTRA"):
            texto = crudo
            j = i + 1
            while j < n and lineas[j].strip():
                texto += " " + lineas[j].strip()
                j += 1
            out.append(parrafo(texto, negrita=True, color=TINTA))
            out.append(caja_respuesta())
            i = j
            continue

        # Prosa suelta: se agrupa el párrafo entero.
        texto = crudo
        j = i + 1
        while j < n and not inicia_bloque(lineas[j]):
            texto += " " + lineas[j].strip()
            j += 1
        out.append(parrafo(texto, cursiva=en_intro, color=GRIS if en_intro else TINTA))
        i = j

    return out


ESTILOS = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:docDefaults><w:rPrDefault><w:rPr>
    <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:cs="Calibri"/>
    <w:sz w:val="22"/><w:szCs w:val="22"/><w:lang w:val="es-ES"/>
  </w:rPr></w:rPrDefault></w:docDefaults>
  <w:style w:type="paragraph" w:default="1" w:styleId="Normal">
    <w:name w:val="Normal"/>
    <w:pPr><w:spacing w:after="120" w:line="276" w:lineRule="auto"/></w:pPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Title">
    <w:name w:val="Title"/><w:basedOn w:val="Normal"/>
    <w:pPr><w:spacing w:before="0" w:after="360"/></w:pPr>
    <w:rPr><w:b/><w:color w:val="__VERDE__"/><w:sz w:val="40"/><w:szCs w:val="40"/></w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Heading1">
    <w:name w:val="heading 1"/><w:basedOn w:val="Normal"/>
    <w:pPr><w:outlineLvl w:val="0"/><w:spacing w:before="480" w:after="200"/>
      <w:pBdr><w:bottom w:val="single" w:sz="12" w:space="4" w:color="__VERDE__"/></w:pBdr></w:pPr>
    <w:rPr><w:b/><w:color w:val="__VERDE__"/><w:sz w:val="30"/><w:szCs w:val="30"/></w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Heading2">
    <w:name w:val="heading 2"/><w:basedOn w:val="Normal"/>
    <w:pPr><w:outlineLvl w:val="1"/><w:spacing w:before="360" w:after="160"/></w:pPr>
    <w:rPr><w:b/><w:color w:val="__TINTA__"/><w:sz w:val="26"/><w:szCs w:val="26"/></w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Heading3">
    <w:name w:val="heading 3"/><w:basedOn w:val="Normal"/>
    <w:pPr><w:outlineLvl w:val="2"/><w:spacing w:before="300" w:after="140"/></w:pPr>
    <w:rPr><w:b/><w:color w:val="__VERDE__"/><w:sz w:val="24"/><w:szCs w:val="24"/></w:rPr>
  </w:style>
</w:styles>""".replace("__VERDE__", VERDE).replace("__TINTA__", TINTA)

CONTENT_TYPES = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
</Types>"""

RELS = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
</Relationships>"""

DOC_RELS = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>"""

CORE = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <dc:title>Centro DEFINE - Informacion para las nuevas paginas de la web</dc:title>
  <dc:language>es-ES</dc:language>
</cp:coreProperties>"""


def main():
    lineas = ORIGEN.read_text(encoding="utf-8").splitlines()
    parrafos = convertir(lineas)
    cuerpo = "".join(parrafos)

    documento = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">'
        "<w:body>" + cuerpo
        + '<w:sectPr><w:pgSz w:w="11906" w:h="16838"/>'
        '<w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134"'
        ' w:header="709" w:footer="709" w:gutter="0"/></w:sectPr>'
        "</w:body></w:document>"
    )

    with zipfile.ZipFile(DESTINO, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr("[Content_Types].xml", CONTENT_TYPES)
        z.writestr("_rels/.rels", RELS)
        z.writestr("docProps/core.xml", CORE)
        z.writestr("word/_rels/document.xml.rels", DOC_RELS)
        z.writestr("word/styles.xml", ESTILOS)
        z.writestr("word/document.xml", documento)

    cajas = cuerpo.count(FONDO_RESPUESTA)
    print(DESTINO.name)
    print("  parrafos:", len(parrafos))
    print("  cajas de respuesta:", cajas)
    print("  tamano:", round(DESTINO.stat().st_size / 1024, 1), "KB")


if __name__ == "__main__":
    main()
