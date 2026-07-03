# -*- coding: utf-8 -*-
"""Genera el informe PDF del plan de lanzamiento para aprobación de dirección.
Uso: python3 generar-informe-direccion.py
Salida: ../../Informe-Plan-Lanzamiento-La-Melange.pdf (raíz del proyecto)
"""
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
from reportlab.platypus import (BaseDocTemplate, PageTemplate, Frame, Paragraph,
                                Spacer, Table, TableStyle, PageBreak, HRFlowable,
                                KeepTogether)

BASE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.normpath(os.path.join(BASE, "..", "..", "Informe-Plan-Lanzamiento-La-Melange.pdf"))

# ---------- Paleta (estética del sitio: blanco minimal, slate, bronce) ----------
INK    = colors.HexColor("#1c1c1c")
SLATE  = colors.HexColor("#2c3e50")
BRONCE = colors.HexColor("#8a6d3b")
SAND   = colors.HexColor("#f5f1ea")
GRIS   = colors.HexColor("#6b6b6b")
LINEA  = colors.HexColor("#d9d2c5")

# ---------- Estilos ----------
def st(name, **kw):
    base = dict(fontName="Helvetica", fontSize=9.5, leading=13.5, textColor=INK,
                spaceAfter=6, alignment=TA_JUSTIFY)
    base.update(kw)
    return ParagraphStyle(name, **base)

S = {
    "portada_marca": st("pm", fontName="Times-Bold", fontSize=34, leading=40,
                        alignment=TA_CENTER, textColor=INK),
    "portada_sub":   st("ps", fontSize=11, alignment=TA_CENTER, textColor=BRONCE,
                        spaceAfter=0),
    "portada_tit":   st("pt", fontName="Times-Roman", fontSize=19, leading=25,
                        alignment=TA_CENTER, textColor=SLATE),
    "portada_meta":  st("pme", fontSize=9.5, alignment=TA_CENTER, textColor=GRIS),
    "h1":  st("h1", fontName="Times-Bold", fontSize=16, leading=20, textColor=SLATE,
              spaceBefore=6, spaceAfter=10),
    "h2":  st("h2", fontName="Helvetica-Bold", fontSize=10.5, leading=14,
              textColor=BRONCE, spaceBefore=10, spaceAfter=5),
    "body": st("body"),
    "bullet": st("bullet", leftIndent=14, bulletIndent=4, spaceAfter=4),
    "cell": st("cell", fontSize=8.5, leading=11.5, alignment=0, spaceAfter=0),
    "cellb": st("cellb", fontName="Helvetica-Bold", fontSize=8.5, leading=11.5,
                alignment=0, spaceAfter=0, textColor=colors.white),
    "caja": st("caja", fontSize=9.5, leading=14, alignment=0, spaceAfter=0),
    "nota": st("nota", fontSize=8, leading=11, textColor=GRIS),
}

def h1(n, t):
    return [Paragraph(f'<font color="#8a6d3b">{n}</font>&nbsp;&nbsp;{t}', S["h1"]),
            HRFlowable(width="100%", thickness=0.7, color=LINEA, spaceAfter=10)]

def bullets(items):
    return [Paragraph(x, S["bullet"], bulletText="•") for x in items]

def tabla(header, rows, widths, align_center_cols=()):
    data = [[Paragraph(c, S["cellb"]) for c in header]]
    for r in rows:
        data.append([Paragraph(c, S["cell"]) for c in r])
    t = Table(data, colWidths=widths, repeatRows=1)
    style = [
        ("BACKGROUND", (0, 0), (-1, 0), SLATE),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, SAND]),
        ("GRID", (0, 0), (-1, -1), 0.4, LINEA),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
    ]
    t.setStyle(TableStyle(style))
    return t

def caja(texto, fondo=SAND, borde=BRONCE):
    t = Table([[Paragraph(texto, S["caja"])]], colWidths=[16.2 * cm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), fondo),
        ("LINEBEFORE", (0, 0), (0, -1), 2.2, borde),
        ("TOPPADDING", (0, 0), (-1, -1), 9),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
        ("LEFTPADDING", (0, 0), (-1, -1), 12),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
    ]))
    return t

# ---------- Documento ----------
def pie(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(GRIS)
    canvas.drawString(2 * cm, 1.15 * cm, "La Mélange · Plan de lanzamiento y crecimiento · Julio 2026 · Confidencial")
    canvas.drawRightString(A4[0] - 2 * cm, 1.15 * cm, f"Página {doc.page}")
    canvas.setStrokeColor(LINEA)
    canvas.setLineWidth(0.5)
    canvas.line(2 * cm, 1.5 * cm, A4[0] - 2 * cm, 1.5 * cm)
    canvas.restoreState()

def pie_portada(canvas, doc):
    pass

doc = BaseDocTemplate(OUT, pagesize=A4,
                      leftMargin=2 * cm, rightMargin=2 * cm,
                      topMargin=2 * cm, bottomMargin=2 * cm,
                      title="La Mélange · Plan de lanzamiento y crecimiento",
                      author="La Mélange")
frame = Frame(2 * cm, 2 * cm, A4[0] - 4 * cm, A4[1] - 4 * cm, id="f")
doc.addPageTemplates([
    PageTemplate(id="portada", frames=[frame], onPage=pie_portada),
    PageTemplate(id="cuerpo", frames=[frame], onPage=pie),
])

E = []  # story

# ================= PORTADA =================
E.append(Spacer(1, 4.2 * cm))
E.append(Paragraph("LA MÉLANGE", S["portada_marca"]))
E.append(Spacer(1, 0.2 * cm))
E.append(Paragraph("VAJILLA PARA EVENTOS", S["portada_sub"]))
E.append(Spacer(1, 2.2 * cm))
E.append(HRFlowable(width="40%", thickness=0.8, color=BRONCE, hAlign="CENTER"))
E.append(Spacer(1, 0.8 * cm))
E.append(Paragraph("Plan de lanzamiento y crecimiento", S["portada_tit"]))
E.append(Paragraph("Julio – Diciembre 2026", S["portada_tit"]))
E.append(Spacer(1, 0.8 * cm))
E.append(HRFlowable(width="40%", thickness=0.8, color=BRONCE, hAlign="CENTER"))
E.append(Spacer(1, 3 * cm))
E.append(Paragraph("Informe para aprobación de dirección", S["portada_meta"]))
E.append(Paragraph("Buenos Aires · Julio 2026 · Documento confidencial", S["portada_meta"]))
from reportlab.platypus import NextPageTemplate
E.insert(0, NextPageTemplate("cuerpo"))
E.append(PageBreak())

# ================= 1 · RESUMEN EJECUTIVO =================
E += h1("1", "Resumen ejecutivo")
E.append(Paragraph(
    "Este informe propone el plan para lanzar y hacer crecer el nuevo sitio de vajilla para eventos "
    "(lamelange-eventos.vercel.app) entre julio y diciembre de 2026. Se apoya en una investigación de "
    "mercado realizada este mes: competencia local, tendencias del sector y costos reales de "
    "publicidad digital en Argentina.", S["body"]))
E += bullets([
    "<b>La oportunidad:</b> nadie en Argentina ofrece vajilla antigua real con catálogo online profesional "
    "y servicio para organizadores de eventos. Los que tienen volumen no tienen estética; los que tienen "
    "estética no son antiguos; los que son antiguos son emprendimientos muy chicos sin sitio web.",
    "<b>Nuestro campo de juego:</b> el evento boutique de 20 a 100 invitados y la “mesa de honor” "
    "dentro de eventos grandes. <b>No competimos por volumen</b>: el evento de 250 cubiertos uniformes es "
    "de Casa Blanca y compañía. Nuestro stock antiguo llega a 80–100 invitados, y eso — bien contado — es "
    "exclusividad, no debilidad.",
    "<b>El momento es ahora:</b> los eventos de septiembre–diciembre (temporada alta) se están reservando "
    "entre julio y septiembre. Y el 20 de julio es el Día del Amigo, el evento social más fuerte del "
    "invierno: la página de Tea Party está lista para aprovecharlo.",
    "<b>La inversión pedida:</b> publicidad digital por un total estimado de USD 3.200–4.500 entre julio y "
    "diciembre, arrancando con un test de ~USD 250–350 en julio. Se escala solo si los números acompañan.",
    "<b>El resultado esperado</b> (estimación conservadora, no promesa): 60–100 consultas de WhatsApp por "
    "mes en los meses de escala, y 8–15 reservas mensuales en temporada alta entre los tres productos.",
])
E.append(Spacer(1, 6))
E.append(caja(
    "<b>Qué se pide en este documento:</b> aprobar el posicionamiento, los cambios de textos del sitio, "
    "el presupuesto de publicidad por etapas y la designación de una persona responsable de responder "
    "WhatsApp en menos de 1 hora. El detalle de decisiones está en la sección 11."))
E.append(PageBreak())

# ================= 2 · MERCADO =================
E += h1("2", "El mercado: competencia y oportunidad")
E.append(Paragraph(
    "Relevamos a los principales jugadores de alquiler de vajilla y ambientación de Buenos Aires "
    "(sitios web, redes, directorios de casamientos). El mapa queda así:", S["body"]))
E.append(tabla(
    ["Competidor", "Qué tiene", "Qué le falta"],
    [
        ["<b>Porto Tablesetting</b>", "Discurso profesional curado, catálogo PDF, WhatsApp. El más parecido a nuestra propuesta.", "No es vintage: lujo contemporáneo."],
        ["<b>Floralis</b> (Olivos)", "Showroom, mobiliario + vajilla, estética moderna.", "Sin textos de venta, sin vintage, sitio poco orientado a generar consultas."],
        ["<b>Vintich, La Bohème, Cositas Lindas</b>", "Vajilla antigua de verdad.", "Escala mínima, sin sitio profesional, solo le hablan a la particular."],
        ["<b>Volumen: Casa Blanca, Alquilando, B y L, etc.</b>", "<b>Escala real (200–350 cubiertos de todo)</b>, logística, años de trayectoria.", "Cero estética: líneas uniformes, compiten por precio y comodidad."],
    ],
    [3.6 * cm, 6.3 * cm, 6.3 * cm]))
E.append(Spacer(1, 8))
E.append(Paragraph("El hueco que podemos ocupar", S["h2"]))
E.append(Paragraph(
    "Vajilla antigua y de autor + catálogo online profesional + servicio B2B, <b>en el segmento "
    "boutique (20–100 invitados)</b>. En ese cuadrante hoy no hay nadie. El referente internacional que "
    "valida el modelo es Casa de Perrin (EE.UU.): catálogo visual sin precios, prueba social de "
    "profesionales y venues — no de novias —, y lenguaje de curaduría. Casa de Perrin tampoco vende "
    "volumen: vende la mesa que sale en las fotos.", S["body"]))
E.append(Spacer(1, 4))
E.append(caja(
    "<b>Dato transversal del relevamiento:</b> ningún competidor publica precios y todos captan por "
    "WhatsApp. Nuestro flujo de consulta por WhatsApp es el estándar del rubro: la diferencia se hará "
    "con la velocidad y calidad de respuesta."))
E.append(PageBreak())

# ================= 3 · TENDENCIAS =================
E += h1("3", "Tendencias que empujan a favor")
E.append(Paragraph("Eventos más chicos, más invertidos", S["h2"]))
E.append(Paragraph(
    "La prensa económica y las wedding planners argentinas documentan la misma dinámica 2025–2026: "
    "se reducen los invitados para subir la calidad por persona (“60 personas con buen servicio antes "
    "que 120 con un nivel más bajo”). Los casamientos de 50 invitados ya se cotizan como categoría "
    "propia en los medios. <b>50 invitados es exactamente lo que nuestro mix &amp; match antiguo sirve con "
    "comodidad.</b>", S["body"]))
E.append(Paragraph("Mix & match: la moda juega para nosotros", S["h2"]))
E.append(Paragraph(
    "En Pinterest, “vintage maximalism” creció +260% y las mesas de fiesta (“tablescapes”) +55%. "
    "La prensa de bodas internacional habla de la vajilla “de la abuela” pasando “de vintage a "
    "Vogue”. El dato clave: <b>nadie tiene 120 platos antiguos iguales — la mezcla intencional se volvió "
    "el punto estético</b>. Lo que antes era una limitación de stock hoy es la tendencia dominante de mesa.",
    S["body"]))
E.append(Paragraph("Tea party: el negocio del invierno", S["h2"]))
E.append(Paragraph(
    "La cuarta temporada de Bridgerton reactivó el ritual del té en Buenos Aires: notas en Gente, "
    "La Nación y Marie Claire durante 2026, salones de té nuevos abiertos en 2025, y planners locales que "
    "ya ofrecen “té de lluvia” y bridal showers. Son eventos de 10–40 personas: encaje perfecto con "
    "nuestro stock, en la estación donde más lo necesitamos.", S["body"]))
E.append(Paragraph("Estacionalidad y ventana crítica", S["h2"]))
E.append(Paragraph(
    "Temporada alta: septiembre–diciembre (en CABA se celebran 1.200–1.500 casamientos por mes en esos "
    "meses). La planificación se acortó a 6–9 meses: <b>los eventos de la temporada alta se están "
    "cerrando entre julio y septiembre. Sembrar ahora es cosechar en noviembre.</b> El invierno se "
    "puentea con Día del Amigo (20/7), tea parties, cumpleaños íntimos y, desde octubre, las fiestas "
    "corporativas de fin de año.", S["body"]))
E.append(PageBreak())

# ================= 4 · STOCK Y ESTRATEGIA =================
E += h1("4", "Nuestra realidad de stock y la estrategia elegida")
E.append(Paragraph(
    "Antes de definir a quién le vendemos, hay que ser honestos con lo que tenemos. Capacidad real "
    "según el inventario cargado al sitio (julio 2026):", S["body"]))
E.append(tabla(
    ["Familia de productos", "Capacidad real", "Naturaleza"],
    [
        ["Mix &amp; match antiguo (Minerva, Vogt, Winterling...)", "<b>~80–100 invitados</b> combinando colores", "El diferencial. Único en el mercado."],
        ["Líneas intermedias (Relieve blanco, Perla rosa...)", "60–100 invitados", "Puente entre boutique y volumen."],
        ["Línea Premium (porcelana moderna)", "<b>Única línea para 200+ invitados</b>", "Escala, pero no es antigua."],
        ["Platos de sitio (Yute 340, Perla oro 300, Palma 200...)", "<b>180–340 unidades</b>", "El único rubro con volumen real."],
    ],
    [6.0 * cm, 5.1 * cm, 5.1 * cm]))
E.append(Spacer(1, 8))
E.append(caja(
    "<b>Consecuencia estratégica: no competimos por escala.</b> La competencia de volumen ofrece 200–350 "
    "cubiertos de todo; nosotros no, y prometerlo sería defraudar clientes. En cambio, la escasez se "
    "convierte en argumento: cada pieza antigua es única, y cuando un cliente reserva su fecha, esas "
    "piezas quedan bloqueadas para su evento. Eso es exclusividad — y define tres productos claros."))
E.append(Spacer(1, 8))
E.append(Paragraph("Los tres productos, por capacidad", S["h2"]))
E.append(tabla(
    ["Producto", "Para quién / cuántos", "Qué es"],
    [
        ["<b>P1 · Evento boutique completo</b><br/>(producto estrella)",
         "Hasta ~80–100 invitados. Microbodas, civiles, casamientos íntimos, tea parties, showers, cenas corporativas chicas.",
         "Mix &amp; match antiguo pleno. Es donde el mercado crece y donde nadie compite."],
        ["<b>P2 · Mesa de honor con historia</b><br/>(el multiplicador)",
         "Casamientos y eventos GRANDES (150–300 invitados).",
         "No vestimos todo el salón: vestimos <b>la mesa que sale en todas las fotos</b> — la cabecera o mesa de los novios en vajilla antigua; el resto del salón usa la línea del catering o nuestra Premium. Nos mete en eventos grandes sin consumir stock y es la puerta de entrada con wedding planners."],
        ["<b>P3 · Todo el salón con acentos</b>",
         "Hasta ~200–245 invitados.",
         "Base Premium o Relieve + platos de sitio con volumen + acentos antiguos en mesas clave. Nuestra única oferta “grande”, vendida como híbrido curado, nunca como volumen puro."],
    ],
    [4.2 * cm, 4.6 * cm, 7.4 * cm]))
E.append(Spacer(1, 8))
E.append(Paragraph(
    "<b>Regla de honestidad comercial:</b> el sitio ya calcula y muestra “hasta N comensales” según la "
    "pieza más escasa de cada mesa. En los anuncios y en el primer mensaje de WhatsApp se pregunta la "
    "cantidad de invitados de entrada: si piden 250 cubiertos de antiguo, la respuesta es P2 o P3 — "
    "nunca prometer lo que no hay.", S["body"]))
E.append(PageBreak())

# ================= 5 · AUDIENCIAS =================
E += h1("5", "A quién le hablamos")
E.append(tabla(
    ["Audiencia", "Quiénes", "Cómo se les vende"],
    [
        ["<b>Primaria: profesionales de eventos boutique</b>",
         "Wedding planners y ambientadores de casamientos íntimos y eventos con estética. Un planner trae 5–20 eventos por año.",
         "Contacto directo + catálogo PDF. El pitch: “no somos otro proveedor de vajilla — somos el proveedor de la mesa que sale en las fotos” (P1 completo, o P2 dentro de un evento grande). A caterings y salones grandes: P2/P3 como complemento."],
        ["<b>Secundaria: la anfitriona / novia directa</b>",
         "Particulares que quieren una mesa que no sea “de alquiler de salón”. La publicidad de Instagram trae mayormente este público.",
         "La landing con puerta abierta (“¿estás armando tu propio evento? escribinos”) y calificación por cantidad de invitados desde el primer mensaje."],
        ["<b>De invierno: Tea Party</b>",
         "Mujeres 25–55 del AMBA organizando baby showers, tés de lluvia, cumpleaños, despedidas (10–40 invitados). Además: salones de té, pastelerías y planners boutique como canal indirecto.",
         "Página propia ya publicada (tea-party.html) + campaña de Instagram + alianzas comerciales con quienes ya tienen esa demanda."],
    ],
    [3.9 * cm, 5.6 * cm, 6.7 * cm]))
E.append(PageBreak())

# ================= 6 · CAMBIOS WEB =================
E += h1("6", "Cambios propuestos en la página web")
E.append(Paragraph(
    "El sitio ya está construido y funcionando. Los textos actuales dicen “vajilla de autor” pero "
    "esconden los dos diferenciales reales: <b>lo antiguo</b> y <b>la exclusividad de piezas únicas</b>. "
    "Cambios principales propuestos (sin reclamar jamás escala):", S["body"]))
E += bullets([
    "<b>Título principal:</b> de “Vajilla de autor para mesas memorables” a "
    "<b>“Piezas con historia para mesas que nadie más puede armar”</b>.",
    "<b>Palabras que la gente busca:</b> incorporar “alquiler de vajilla vintage/antigua”, "
    "“puesta de mesa”, “casamiento” (así se busca en Argentina; “boda” es de España) en títulos "
    "y descripciones para aparecer en Google.",
    "<b>La escasez como argumento:</b> junto a “Stock real por modelo”, sumar: “Piezas únicas, stock "
    "limitado por naturaleza. Reservá tu fecha y quedan bloqueadas para tu evento.”",
    "<b>Sección nueva “La mesa de honor” (P2):</b> hoy el producto no está nombrado en el sitio. "
    "Bloque propio: “¿Evento de 200 invitados? Vestimos la mesa que importa.”",
    "<b>Prueba social profesional:</b> bloque “nuestras piezas en producciones de cine, publicidad y "
    "eventos” — la historia de utilería de cine es un aval que ningún competidor tiene.",
    "<b>Tea Party:</b> sumar las ocasiones que la gente busca (té de lluvia, bridal shower, despedida, "
    "Día del Amigo) y un banner estacional que cambia con el calendario (julio: Día del Amigo; "
    "octubre: Día de la Madre).",
    "<b>Compromiso de respuesta:</b> agregar “Respondemos en el día” junto al contacto.",
])
E.append(Spacer(1, 4))
E.append(Paragraph(
    "El detalle texto por texto está en el documento de trabajo PLAN-LANZAMIENTO.md (sección 4). "
    "Son cambios de redacción sobre la página existente: no requieren rediseño ni inversión.", S["nota"]))
E.append(PageBreak())

# ================= 7 · PUBLICIDAD PAGA =================
E += h1("7", "Publicidad paga: Instagram/Facebook y Google")
E.append(Paragraph("Cómo funciona la captación", S["h2"]))
E.append(Paragraph(
    "Todas las campañas llevan a una conversación de WhatsApp (el formato que Meta llama "
    "“click-to-WhatsApp”): la persona ve el anuncio, toca el botón y nos escribe con un mensaje "
    "pre-armado que ya trae fecha y cantidad de invitados — así filtramos curiosos y derivamos cada "
    "consulta al producto correcto (P1, P2, P3 o Tea). El sitio ya tiene instalada la medición "
    "(Google Analytics y Meta Pixel), así que cada peso invertido se puede rastrear.", S["body"]))
E.append(Paragraph("Campañas en Meta (Instagram + Facebook)", S["h2"]))
E.append(tabla(
    ["Campaña", "Cuándo", "Público y mensaje", "Presupuesto"],
    [
        ["<b>C1 · Tea Party Invierno</b>", "YA (julio)",
         "Mujeres 25–55 AMBA. Primero “Día del Amigo estilo Bridgerton” (hasta el 20/7), después “el plan de invierno” (baby shower, té de lluvia, cumpleaños). Encaje de stock perfecto: 10–40 invitados.",
         "USD 6–8/día (~USD 200/mes)"],
        ["<b>C2 · Boutique / Temporada Alta</b>", "Agosto (test), escala en septiembre",
         "Comprometidos/as y profesionales de eventos. Dos anuncios separados: “Menos invitados, mejor mesa” (P1) y “La mesa de honor con historia” (P2) — así el evento de 200 invitados llega encaminado al producto correcto. Desde agosto: “las fechas de oct-dic se están reservando ahora”.",
         "USD 5/día en test; USD 10–20/día sept–nov si el costo por consulta acompaña"],
        ["<b>C3 · Remarketing</b>", "Desde agosto, siempre activa",
         "Personas que ya visitaron el sitio o interactuaron con el Instagram. Se les muestran las mesas curadas con nombre y capacidad.",
         "USD 2–3/día"],
    ],
    [3.3 * cm, 2.8 * cm, 7.3 * cm, 2.8 * cm]))
E.append(Spacer(1, 8))
E.append(Paragraph("Campañas en Google", S["h2"]))
E.append(tabla(
    ["Acción", "Cuándo", "Detalle", "Presupuesto"],
    [
        ["<b>G0 · Ficha de Google (Business Profile)</b>", "Esta semana",
         "GRATIS. Ficha con fotos de mesas montadas, WhatsApp y reseñas de los primeros clientes. Captura las búsquedas “alquiler vajilla cerca de mí”.", "$0"],
        ["<b>G1 · Búsquedas de nicho</b>", "Julio",
         "Anuncios en búsquedas como “alquiler vajilla vintage”, “vajilla antigua casamiento”, “vajilla tea party”. Competencia débil: clics baratos y de altísima intención.", "ARS 150–200 mil/mes"],
        ["<b>G2 · Búsquedas genéricas</b>", "Agosto (a prueba)",
         "“Alquiler de vajilla para eventos + zona”. Cuidado: esta búsqueda trae al cliente de volumen que no es nuestro — el anuncio precalifica: “vajilla vintage y de autor · eventos boutique y mesas de honor”. Se corta si trae buscadores de precio.", "ARS 100–150 mil/mes"],
    ],
    [3.6 * cm, 2.6 * cm, 7.2 * cm, 2.8 * cm]))
E.append(Spacer(1, 8))
E.append(Paragraph(
    "<b>Referencias de costo (Argentina 2025-26):</b> Argentina es uno de los mercados publicitarios más "
    "baratos del mundo. Costo estimado por conversación de WhatsApp iniciada: USD 3–10 (a validar con el "
    "test de julio). Se asume que un 20–30% de las consultas serán de baja calidad; el mensaje pre-armado "
    "con fecha e invitados es el filtro.", S["nota"]))
E.append(PageBreak())

# ================= 8 · SIN PAUTA =================
E += h1("8", "Acciones sin costo publicitario (donde se gana el B2B)")
E += bullets([
    "<b>1 · Contacto directo con profesionales — el canal más importante del plan.</b> Lista de 80–100 "
    "wedding planners, ambientadores, caterings y salones. Mensaje personalizado + catálogo PDF + "
    "invitación a conocer el acervo. El pitch según el cliente: a planners boutique, el evento completo "
    "(P1); a los de eventos grandes, la mesa de honor (P2). Meta: 15–20 respuestas y 8–10 reuniones "
    "antes de septiembre. Los alquileres de mobiliario y livings no compiten con nosotros: son aliados "
    "para referirnos clientes mutuamente.",
    "<b>2 · Alianzas de invierno para Tea Party.</b> Salones de té, pastelerías y planners boutique ya "
    "tienen la demanda; proponemos paquete “vajilla + mesa dulce” con comisión o precio de socio. "
    "Dos o tres alianzas pueden sostener el invierno solas.",
    "<b>3 · Directorios del rubro</b> (gratis o de bajo costo): casamientos.com.ar, casamientosonline.com, "
    "catering.com.ar — con fotos de mesas montadas, no de producto suelto.",
    "<b>4 · Prensa.</b> Los medios YA están cubriendo el tema (Gente, La Nación, Marie Claire). Dos "
    "propuestas de nota listas: “Bridgerton en tu mesa: la vajilla antigua que alquilan las porteñas "
    "para sus tea parties” y “De utilería de cine a tu casamiento: las piezas con historia que visten "
    "mesas de honor”. Una nota publicada = tráfico + credibilidad + material para anuncios.",
    "<b>5 · Pinterest.</b> Las búsquedas de mesas de fiesta crecieron +55%: subir todas las fotos "
    "ambientadas con descripciones en español. Tráfico gratuito y permanente, y el público de Pinterest "
    "es exactamente la anfitriona que planea.",
    "<b>6 · Instagram orgánico.</b> Tres formatos probados del nicho: video del armado de una mesa "
    "(proceso), carrusel “una mesa, tres estilos” con las mismas piezas, y colaboraciones con planners.",
])
E.append(PageBreak())

# ================= 9 · CALENDARIO =================
E += h1("9", "Calendario julio – diciembre")
E.append(tabla(
    ["Cuándo", "Qué se hace"],
    [
        ["<b>Semana 1 (3–9 jul)</b>",
         "Cambios de textos del sitio (incl. bloque Mesa de honor) · Ficha de Google · alta en directorios · verificación de la medición · <b>lanzar C1 Tea Party con gancho Día del Amigo</b> · lanzar G1 búsquedas de nicho."],
        ["<b>Semanas 2–3 (10–20 jul)</b>",
         "Pico Día del Amigo · primera ola de contacto directo B2B (50 profesionales) · primer envío a prensa · carga de Pinterest."],
        ["<b>Fin jul – agosto</b>",
         "Lanzar C2 (con anuncio P1 y anuncio P2 por separado) y C3 remarketing · G2 a prueba · cerrar alianzas de tea party · segunda ola B2B · mensaje “asegurá tu fecha de sept-dic” en todo."],
        ["<b>Septiembre</b>",
         "Escalar C2 según resultados · reuniones con los planners que respondieron · sumar ángulo corporativo boutique (fiestas de fin de año chicas)."],
        ["<b>Octubre</b>",
         "Banner tea party pasa a Día de la Madre (19/10) · pico de reservas corporativas de diciembre · pedir fotos y testimonios de cada evento realizado."],
        ["<b>Noviembre – diciembre</b>",
         "Cosecha: remarketing intensivo · la escasez real como mensaje (“quedan N fechas disponibles”) · registrar métricas, fotos y testimonios para el ciclo 2027."],
    ],
    [3.4 * cm, 12.8 * cm]))
E.append(PageBreak())

# ================= 10 · PRESUPUESTO =================
E += h1("10", "Presupuesto y resultados esperados")
E.append(Paragraph("Inversión en publicidad, por etapas", S["h2"]))
E.append(tabla(
    ["Etapa", "Período", "Inversión", "Condición para avanzar"],
    [
        ["Test", "Julio", "~USD 250–350", "Arranque: C1 Tea Party + G1 nicho."],
        ["Ajuste", "Agosto", "~USD 450–600", "Solo si julio genera consultas a costo razonable (USD 3–10 por conversación)."],
        ["Escala", "Sept – nov", "USD 700–1.000/mes", "Solo si el costo por consulta se sostiene y las consultas se convierten en presupuestos."],
        ["<b>Total jul–dic</b>", "", "<b>USD 3.200–4.500</b>", "Cada etapa se aprueba con los números de la anterior a la vista."],
    ],
    [2.6 * cm, 2.6 * cm, 3.4 * cm, 7.6 * cm]))
E.append(Spacer(1, 8))
E.append(Paragraph("Embudo esperado (estimación conservadora, no promesa)", S["h2"]))
E.append(Paragraph(
    "En los meses de escala: 60–100 conversaciones de WhatsApp por mes · ~40% califican (fecha e "
    "invitados dentro de capacidad) · 25–40 presupuestos enviados · <b>8–15 reservas por mes</b> en "
    "temporada alta, repartidas entre evento boutique (P1), mesas de honor (P2/P3) y tea parties. "
    "La mesa de honor es el multiplicador: suma reservas de eventos grandes sin consumir stock masivo.",
    S["body"]))
E.append(Spacer(1, 6))
E.append(caja(
    "<b>El indicador n°1 no es publicitario: es la velocidad de respuesta.</b> En este rubro, el "
    "proveedor que contesta primero se queda con el evento. Compromiso propuesto: primera respuesta de "
    "WhatsApp en menos de 1 hora en horario laboral, con guion de calificación (fecha · invitados · "
    "zona · tipo de evento) para derivar cada consulta al producto correcto."))
E.append(Spacer(1, 8))
E.append(Paragraph(
    "<b>Qué se revisa cada semana:</b> conversaciones por campaña · costo por consulta · % de consultas "
    "calificadas · presupuestos enviados · reservas por producto · ocupación de fechas de sept-dic.",
    S["body"]))
E.append(PageBreak())

# ================= 11 · DECISIONES =================
E += h1("11", "Decisiones que se piden aprobar")
E.append(tabla(
    ["#", "Decisión", "Costo"],
    [
        ["1", "<b>Posicionamiento:</b> La Mélange compite en el segmento boutique (20–100 invitados) y en la “mesa de honor” de eventos grandes. NO compite por volumen contra las vajilleras tradicionales.", "$0"],
        ["2", "<b>Textos del sitio:</b> aplicar los cambios de redacción de la sección 6, incluyendo el bloque nuevo “La mesa de honor”.", "$0 (trabajo interno)"],
        ["3", "<b>Publicidad julio (test):</b> campaña Tea Party en Instagram con gancho Día del Amigo + búsquedas de nicho en Google.", "~USD 250–350"],
        ["4", "<b>Publicidad agosto–noviembre:</b> escalado por etapas, cada etapa condicionada a los resultados de la anterior.", "Hasta USD 1.000/mes (tope)"],
        ["5", "<b>Responsable de WhatsApp:</b> designar quién responde las consultas con compromiso de primera respuesta en menos de 1 hora (horario laboral) y guion de calificación.", "$0"],
        ["6", "<b>Gestión comercial B2B:</b> autorizar el contacto directo con planners/caterings, las alianzas de tea party (comisión o precio de socio) y el alta en directorios.", "$0 – bajo"],
        ["7", "<b>Ficha de Google + dominio:</b> crear la ficha de Google Business (gratis) y definir el subdominio propio (eventos.lamelange.com.ar).", "$0"],
    ],
    [0.8 * cm, 12.0 * cm, 3.4 * cm]))
E.append(Spacer(1, 24))
E.append(HRFlowable(width="100%", thickness=0.5, color=LINEA))
E.append(Spacer(1, 16))
firma = Table([
    [Paragraph("_" * 34, S["cell"]), Paragraph("_" * 34, S["cell"])],
    [Paragraph("Aprobado por dirección<br/>Firma y aclaración", S["nota"]),
     Paragraph("Fecha", S["nota"])],
], colWidths=[8.1 * cm, 8.1 * cm])
firma.setStyle(TableStyle([
    ("TOPPADDING", (0, 0), (-1, -1), 2),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
]))
E.append(firma)
E.append(Spacer(1, 20))
E.append(Paragraph(
    "Fuentes del análisis: relevamiento directo de sitios de competidores (Porto Tablesetting, Floralis, "
    "Casa Blanca, Alquilando Vajilla, Vintich, entre otros), Casa de Perrin (EE.UU.), prensa argentina "
    "2025-26 (Infobae, El Cronista, La Nación, Gente, Marie Claire, Ohlalá), reportes de tendencias "
    "(Pinterest Predicts vía prensa) y benchmarks publicados de costos de Meta y Google Ads para "
    "Argentina. Detalle completo con enlaces en el documento de trabajo PLAN-LANZAMIENTO.md.", S["nota"]))

doc.build(E)
print(f"OK -> {OUT}")
