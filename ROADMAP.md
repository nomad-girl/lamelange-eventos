# Roadmap — La Mélange · Vajilla para eventos

> Sub-proyecto enfocado: sitio de venta para el nicho de eventos
> (wedding planners, ambientadores, salones, caterings).
> Separado de la utilería de cine / antigüedades. Objetivo: **aumentar demanda YA**.

## Contexto del inventario

Todo el stock tiene **dos naturalezas**, y se ofrecen distinto:

| Tipo | Qué es | Cómo se ofrece |
|------|--------|----------------|
| **Líneas completas** | Stock alto, todas iguales (Perla oro, Yute, Palma, cerámicas, copas Spirit/Adagio, vasos LAV, cuberterías NY/Oro/Black&Gold) | Producto simple + cantidad |
| **Mix & match** | Antiguos, poco stock, combinables (Minerva, Vogt, cristal tallado, copas de color, cubertería Antigua Premium) | Mesas curadas + Constructor "Armá tu mesa" |

Categorías: Cargadores/bajoplatos · Platos · Cristalería · Cubertería · Mantelería · Centros.

---

## User journey y modalidades

El visitante (planner / ambientador / salón) llega → hero → **elige una de 3 modalidades** (sección justo después del hero) → consulta por WhatsApp = **lead**.

| Modalidad | Para quién | Qué ve | Acción |
|-----------|-----------|--------|--------|
| **A · Catálogo por línea** | Sabe qué quiere | Líneas completas por tipo, con stock | Modelo + cantidad → consulta |
| **B · Mesas curadas** | Quiere propuesta lista | Combinaciones armadas, fotografiadas | "Pedir esta mesa" → consulta |
| **C · Armá tu mesa** | Quiere combinar | Constructor capa por capa (en la home) | Combina → "Pedir combinación" → consulta |

**Regla de capacidad (B y C):** comensales = **menor stock** de las piezas de la mesa.
La pieza más escasa (un antiguo mix & match) define la capacidad. Cada mesa muestra
"Hasta N comensales". Etiquetar: mesas con antiguos = *cabecera / íntima*; mesas de
líneas completas = *para todo el salón*. Upsell: si no alcanza, ofrecer combinar con una línea completa.

Decisiones tomadas: sección de modalidades **justo después del hero**; constructor **en la home**.

---

## Fases

### Fase 0 — Definición de stock y mesas · *(Vos + equipo · EN CURSO)*
- Cerrar qué líneas son completas y cuáles mix & match (vajilla, cristalería, cubertería).
- Por cada modelo: **nombre · material · stock · foto**.
- Elegir **4–6 "mesas curadas"** (combinaciones hero) para lanzar.
- **Entregable:** una planilla final de productos con stock.

### Fase 1 — Sesión de fotos · *(Vos + equipo · PRÓXIMO)*
- **Producto:** ~40–60 piezas hero, fondo y luz únicos (parejas = efecto "colección").
- **Cenitales recortables:** platos/copas/cubiertos desde arriba, centrados, fondo blanco o PNG → necesarios para el **constructor** (se superponen capa sobre capa).
- **Ambientadas:** 6–10 mesas montadas (lookbook + las mesas curadas).

### Fase 2 — Sitio base + catálogo · *(Claude · BASE LISTA)*
- Landing + catálogo navegable por colección con stock — **hecho**, con la estética de lamelange.com.ar (Playfair + Montserrat, blanco minimal).
- Cargar **datos y fotos reales** (reemplazar los de ejemplo en `data.js`).
- WhatsApp y mail de contacto reales.
- Deploy a **preview de Vercel** → testear en iPhone.

### Fase 3 — Mesas curadas · *(Claude · PRÓXIMO)*
- Sección de combinaciones fotografiadas, presentadas como set.
- "Pedir esta mesa" → mensaje de WhatsApp armado.

### Fase 4 — Constructor "Armá tu mesa" · *(Claude · FASE 2)*
- Stack de platos (bajoplato → playo → postre) con fotos cenitales reales.
- El **stock manda**: comensales posibles = mínimo stock de la combinación.
- Extensión a **copas y cubiertos** como capas opcionales.
- "Pedir combinación" → guarda la selección + WhatsApp.

### Fase 5 — Catálogo PDF + ads por nicho · *(Marketing · FASE 2)*
- Catálogo descargable en PDF (la pieza que el planner reenvía a su cliente).
- **Captura de leads:** email/WhatsApp a cambio de la descarga.
- Landings por nicho (wedding planners / salones / ambientadores / corporativo).
- Anuncios (Meta/Instagram) → cada anuncio a su landing. Pixel + analítica.

### Fase 6 — Dominio, lanzamiento y medición · *(Claude + Vos · LANZAMIENTO)*
- Subdominio `eventos.lamelange.com.ar` (o dominio dedicado).
- SEO básico, Open Graph (preview al compartir), favicon.
- Lanzar + medir consultas.

### Futuro — Integración con la operación (Rental OS)
- Conectar el stock del sitio a **Booqable** (cuando avance el Rental OS) para que las cantidades se actualicen solas.
- Carrito con fecha de evento + presupuesto automático.

---

## Próximos pasos inmediatos

1. **Vos / equipo:** terminar la planilla de stock (modelo · material · cantidad) y elegir las 4–6 mesas curadas.
2. **Vos / equipo:** sacar las fotos según el brief (¡incluí las cenitales recortables para el constructor!).
3. **Claude:** sumar la sección "Mesas curadas" al sitio, dejar todo listo para cargar datos/fotos, y deployar la preview a Vercel para verla en el iPhone.

## Stack técnico

- Ahora: sitio estático (HTML/CSS/JS) en `web-eventos/` → deploy en Vercel ($0).
- Más adelante (al conectar Booqable): migración a Next.js.
