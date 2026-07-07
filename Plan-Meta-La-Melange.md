# Plan Meta — La Melange · Vajilla para eventos

> Documento consolidado (julio 2026). Reúne todo lo definido: cómo medir WhatsApp como
> conversión, análisis de presupuesto y proyecciones, estructura final de campañas,
> ángulos creativos y la guía de configuración en el Administrador de anuncios.
> Reemplaza a los borradores anteriores (`Meta-Estructura-Campanas-La-Melange.md`).

---

## 1. Decisión de medición: WhatsApp como conversión (flujo con landing)

Los anuncios llevan a la **landing** (no directo a WhatsApp). Entonces la conversión que importa
es que **hagan clic en el botón de WhatsApp desde la web**.

- El **Pixel** ya está instalado. El clic en WhatsApp se registra como evento **`Contact`**;
  la solicitud completa se registra como **`Lead`**.
- Falta un paso en Meta (5 min): crear una **conversión personalizada "WhatsApp – clic"** a partir
  del evento `Contact`. Eso le da a las campañas un objetivo concreto: traer gente que hace clic
  en WhatsApp, no solo visitas.
- Configuración de campaña: objetivo **Ventas** → lugar de conversión **Sitio web** → optimizar por
  la conversión **"WhatsApp – clic"**.
- Dos niveles: `Contact` (clic) = conversión principal a optimizar; `Lead` (solicitud completa) =
  lead fuerte, se mide aparte como calidad.
- Límite honesto: el Pixel mide el **clic**, no si la persona terminó de mandar el mensaje. Para el
  modelo con landing es normal y suficiente.
- Nota de volumen: Meta aprende mejor con ~50 conversiones/semana por conjunto. A presupuesto bajo
  no vas a llegar a eso: no leas los números los primeros días, dale **10–14 días** antes de decidir.

### Mensajes de WhatsApp que califican (ya implementados en la web)
Cada botón de WhatsApp prellena un mensaje que pide **fecha, invitados y zona**, y cambia según el
ángulo del anuncio mediante un parámetro en la URL (`?c=...`). Así cada consulta llega calificada y
se reconoce de qué anuncio vino.

| Ángulo | Parámetro URL |
|---|---|
| Salón elegante Premium | `?c=p1` |
| Mesa de honor | `?c=p2` |
| Boutique mix & match | `?c=p3` |
| Tea Party | `?c=teaparty` |
| Corporativo | `?c=corpo` |

---

## 2. Análisis de presupuesto y proyecciones

### Números de partida
- Ticket promedio por reserva: ARS 500.000–1.000.000 ≈ **USD 333–667** (1 USD ≈ ARS 1.500).
  Promedio de trabajo: **USD 500**.
- Capacidad: **hasta 50 eventos por semana**. En temporada alta (~17 semanas) son ~850 eventos
  posibles → **la capacidad NO es el límite**. El límite real es la rentabilidad, cuánto sube el
  CPL al escalar, y que el equipo responda < 1 h y sirva los eventos sin bajar calidad.

### El embudo (supuestos a validar con las primeras 2 semanas)

| Escenario | CPL (clic WA) | Califican | Cierran | Costo por reserva | ROAS s/ticket |
|---|---|---|---|---|---|
| Optimista | USD 4 | 50% | 30% | **~USD 27** | ~18x |
| Base | USD 6 | 40% | 20% | **~USD 75** | ~6,7x |
| Pesimista | USD 10 | 35% | 15% | **~USD 190** | ~2,6x |

Incluso en el peor caso pagás ~USD 190 (ARS 285k) por una reserva de ~USD 500 (ARS 750k). La
economía tiene mucho margen.

### Proyección por nivel de gasto (caso base: CPA ~USD 75, ticket USD 500)

| Gasto/mes | Reservas/mes | Facturación/mes | ROAS | Eventos/sem | % capacidad (50/sem) |
|---|---|---|---|---|---|
| USD 350 (test) | ~5 | ARS 3,7M | 7x | ~1 | 2% |
| USD 900 | ~12 | ARS 9M | 7x | ~3 | 6% |
| USD 1.800 | ~24 | ARS 18M | 7x | ~6 | 12% |
| USD 3.000 | ~40 | ARS 30M | 7x | ~9 | 18% |
| USD 6.000 | ~80 | ARS 60M | 7x | ~18 | 37% |

A USD 6.000/mes usás apenas ~37% de la capacidad: **no se frena por cupo, se frena por rentabilidad.**

### Escalera de escala (subir por peldaños, no de un salto)
1. **Test (semanas 1–3):** ~USD 18/día (~USD 540/mes). Objetivo: descubrir CPL y tasa de cierre reales.
2. Si costo por reserva < USD 150 → subir a **~USD 30/día** (~USD 900/mes).
3. Si se mantiene → **~USD 60/día** (~USD 1.800/mes).
4. Seguir hacia **~USD 100/día** (~USD 3.000/mes) mientras (a) CPA < USD 150 y (b) el equipo dé abasto.

> Realismo: al escalar en AMBA el CPL sube (el nicho se satura). Esperá que el CPA se mueva de ~75
> hacia ~120–150. Sigue siendo muy rentable, por eso se valida peldaño a peldaño.

### Reglas de decisión
- **Escalar** una campaña solo si su costo por reserva se mantiene **< ~USD 150** (ARS 225k).
- **Frenar** cuando el equipo no dé abasto — el cuello de botella es operativo, no de cupo.
- **KPI operativo n°1:** primera respuesta en WhatsApp **< 1 hora** en horario hábil.

---

## 3. Estructura de campañas — Primera etapa (arranque agresivo)

Objetivo de cuenta: **Ventas** · Conversión **"WhatsApp – clic"** · Destino: la landing.
Total: **~USD 18/día (~USD 540/mes)**, con el ~80% en la temporada de venta.

> **La temporada de venta es AHORA:** las fechas de primavera–verano se reservan en estos meses.
> Por eso Bodas es la prioritaria, no Tea Party.

### Campaña 1 · Bodas & Eventos (Temporada Alta) — PRIORIDAD · ABO · USD 15/día
Una sola audiencia (el nicho ya es angosto; no se sub-segmenta P1/P2/P3). La diferenciación
Premium vs mix & match va **por creativo** (cada uno con su URL). Lo único que se separa en
conjuntos es **abierto vs intereses**, en **ABO** (presupuesto parejo) para comparar en igualdad
de condiciones y **apagar el que pierda** a los 10–14 días.

- **Conjunto A · `Bodas_Abierto`** — USD 7,5/día — público AMBA 25–55, sin intereses.
- **Conjunto B · `Bodas_Intereses`** — USD 7,5/día — mismo público + intereses (bodas, casamiento,
  planificación de bodas, novia).
- **Creativos (rotan en ambos conjuntos):** Premium/dorado (`?c=p1`) · Mix & match antiguo (`?c=p3`)
  · Mesa de honor (`?c=p2`, se suma en agosto).

### Campaña 2 · Tea Party — SECUNDARIA · CBO · USD 3/día
- **Un solo conjunto · `TeaParty_Abierto`** — a este presupuesto no conviene dividir: se concentra
  la señal. Público mujeres 25–55 AMBA, abierto. Ubicaciones Advantage+.
- Creativos con `?c=teaparty`.

### Pausadas / apagadas
- **Remarketing:** en pausa; se prende en ~3–4 semanas, cuando haya tráfico acumulado que perseguir.
- **Corporativo:** apagado hasta octubre.

### CBO vs ABO — por qué cada una
- **CBO** (presupuesto a nivel campaña, Meta reparte): para Tea Party, donde querés que Meta optimice
  sola con poca supervisión.
- **ABO** (presupuesto por conjunto): para Bodas, donde necesitás comparar abierto vs intereses en
  igualdad de plata para apagar el perdedor. Con CBO Meta vuelca el presupuesto a uno y nunca sabés
  si el otro habría rendido.

---

## 4. Ángulos creativos

Formatos y para qué sirve cada uno:
- **Reel (9:16):** máximo alcance barato. Movimiento: mesas armándose, reveals, close-ups. Los
  primeros 3 segundos definen todo (abrí con la mesa terminada o un detalle dorado, nunca con el logo).
- **Carrusel (4:5):** educar y mostrar variedad ("pieza por pieza", "una mesa para cada ocasión").
- **Estática (4:5):** una foto potente + gancho corto. La más barata; ideal para testear mensajes.

Regla transversal: piezas reales, foto pareja (es el diferencial), poco texto sobre la imagen, y
"stock real / hasta 200 cubiertos" como sello de confianza.

### Tea Party (mín. 3 anuncios)
1. **Premium del ritual / "Bridgerton":** el aire de época, la merienda de otro tiempo. (Estática/Reel)
2. **Ocasiones / versatilidad:** baby shower, té de lluvia, cumpleaños, despedida — una mesa para
   cada excusa. (Carrusel)
3. **Proceso / "se arma sola":** la mesa montándose capa por capa hasta el resultado final. (Reel)

### Bodas (mín. 6 anuncios · 3 Premium · 2 mix & match · 1 mesa de honor)
- **Premium (`?c=p1`):**
  1. **Escala / "vestimos el salón entero":** el salón dorado completo, hasta 200 invitados. (Reel)
  2. **Detalle del lugar:** un place setting Premium impecable, cenital. (Estática)
  3. **"Pieza por pieza":** bajoplato → plato → copas → cubertería → mesa completa, con stock real. (Carrusel)
- **Mix & match antiguo (`?c=p3`):**
  4. **"No hay dos iguales":** close-ups de piezas únicas combinadas por color. (Reel)
  5. **"Una mesa con historia":** tablescape mix & match romántico completo. (Estática)
- **Mesa de honor (`?c=p2`):**
  6. **"La mesa de las fotos":** la cabecera de los novios en vajilla antigua, protagonista. (Estática/Carrusel)

> Producción: las estáticas y carruseles salen de las fotos que ya hay en `assets/` (mesas montadas
> luxury/romantic, place settings, piezas sueltas). Los reels idealmente se filman; si no, se arman
> como slideshow de fotos con movimiento.

---

## 5. Guía de configuración en el Administrador de anuncios

### Bloque 0 · Crear la conversión "WhatsApp – clic" (una sola vez)
1. **Administrador de eventos** → **Conversiones personalizadas** → **Crear conversión personalizada**.
2. Nombre: `WhatsApp – clic`. Origen: el **Pixel** (1799713711390754).
3. Evento: **Contact**. Categoría: **Contacto**. Valor: vacío. → **Crear**.
   - Si no aparece Contact, abrí la web y tocá WhatsApp una vez para registrarlo.

### Bloque 1 · Campaña 1 — Bodas (ABO, USD 15/día)
4. **+ Crear** → Objetivo **Ventas** → nombre `LM_Bodas_TemporadaAlta`.
5. **Presupuesto Advantage de la campaña: DESACTIVADO** (⚠️ esto la hace ABO). Categorías especiales: ninguna.
6. **Conjunto A `Bodas_Abierto`:** conversión **Sitio web → Pixel → WhatsApp – clic** · Presupuesto
   **diario USD 7,5** · Público **AMBA, 25–55, sin intereses** · Ubicaciones **Advantage+**.
7. **Anuncios:** cargar 3–4 creativos (Premium y mix & match). Destino **Sitio web** con la URL según
   ángulo: Premium `.../?c=p1`, mix & match `.../?c=p3`, mesa de honor `.../?c=p2`. CTA: **Más información**.
8. **Conjunto B `Bodas_Intereses`:** **duplicar** el conjunto A (hereda los anuncios), renombrar,
   mismo **USD 7,5**, y agregar **Intereses** (bodas, casamiento, planificación de bodas, novia).

### Bloque 2 · Campaña 2 — Tea Party (CBO, USD 3/día)
9. **+ Crear** → Objetivo **Ventas** → nombre `LM_TeaParty`.
10. **Presupuesto Advantage de la campaña: ACTIVADO** → diario **USD 3** (⚠️ esto la hace CBO).
11. Conjunto único `TeaParty_Abierto`: conversión **Sitio web → WhatsApp – clic** · Público
    **mujeres 25–55 AMBA, abierto** · Ubicaciones Advantage+.
12. Anuncios TP-1/2/3 con URL `.../tea-party.html?c=teaparty`.

### Bloque 3 · Publicar
13. Verificar **medio de pago** cargado en la cuenta.
14. **Publicar** → revisión de Meta (unas horas).
15. **No tocar nada 3–4 días** (editar resetea el aprendizaje). El aviso de "puede no salir de fase
    de aprendizaje" por presupuesto bajo es esperable.

---

## 6. Checklist técnico previo

- [ ] Número de WhatsApp `5491167199527` **vinculado a la Página de Facebook**.
- [ ] Sitio **deployado** con los últimos cambios (links de WhatsApp que califican por ángulo).
- [ ] Pixel `1799713711390754` disparando **PageView, Contact, Lead** (verificar en "Probar eventos").
- [ ] Conversión personalizada **"WhatsApp – clic"** creada.
- [ ] WhatsApp Business con **mensaje de bienvenida, respuestas rápidas, etiquetas** (Nuevo/Calificado/
      Presupuesto/Reservado) y **guion de calificación** (fecha · invitados · zona · tipo → P1/P2/P3).
- [ ] Compromiso de **respuesta < 1 hora** en horario hábil.

---

## 7. Qué medir cada semana
Conversión principal: **`Contact` (clic WhatsApp)** · costo por Contact (CPL) · `Lead` (solicitud) ·
% calificados · presupuestos enviados · **reservas y facturación por producto (P1/P2/P3/Tea)** ·
**utilización de la línea Premium** (el KPI de negocio que más importa) · tiempo de 1ª respuesta.
