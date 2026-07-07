# Estructura de campañas Meta — La Melange · Vajilla para eventos

> Foco: parte comercial + growth en Meta (Instagram + Facebook), agresiva pero medible.
> Eje de medición: **WhatsApp como evento de conversión**.
> Setup real: WhatsApp Business (app), Pixel `1799713711390754`, GA4 `G-SEN9FXSX5L`, sitio en Vercel.
> Presupuesto: según Plan v3 (arranque USD 6–8/día, escalar en temporada alta).
> Fecha: julio 2026 — **C1 Tea Party se lanza ya**.

---

## 0. La decisión que cambia todo: cómo medir WhatsApp como conversión

Hoy el sitio mide el clic en `wa.me` como `Contact` (Pixel) — eso es un **clic en el navegador**, no una conversación real. Con la app normal de WhatsApp Business (sin API) hay una forma correcta y una incorrecta de medir:

| | ❌ Modelo actual (a corregir) | ✅ Modelo recomendado |
|---|---|---|
| **Flujo** | Anuncio → landing → clic `wa.me` | Anuncio **click-to-WhatsApp (CTWA)**: abre WhatsApp directo |
| **Objetivo Meta** | Tráfico (optimiza clics) | **Interacción** o **Clientes potenciales** (optimiza conversaciones) |
| **Evento de conversión** | `Contact` del Pixel (un clic) | **Conversaciones de mensajería iniciadas** (nativo, dentro de WhatsApp) |
| **A quién le muestra Meta el anuncio** | Gente que toca links | Gente que **realmente escribe** |
| **Necesita API/CAPI** | — | **No.** Funciona con la app normal |

**Cómo funciona sin API:** cuando alguien hace clic en un anuncio CTWA y manda el primer mensaje, Meta detecta la conversación por un identificador propio (`ctwa_clid`) y la cuenta como conversión automáticamente. No hay que instalar nada. La métrica que vas a mirar en el Administrador de anuncios se llama **"Conversaciones de mensajería iniciadas"** — ese es tu evento de conversión de WhatsApp.

**Regla de oro:** para CTWA, **nunca uses el objetivo Tráfico.** Optimiza clics baratos que no escriben. Usá Interacción o Clientes potenciales.

**El Pixel no desaparece — cambia de rol.** El Pixel (`Contact` / `Lead`) sigue sirviendo para: (a) medir el flujo landing→WhatsApp como señal secundaria, (b) construir públicos de remarketing (visitantes 30/90 días), (c) medir la solicitud completa (`Lead`) como el lead más valioso. Pero la optimización principal de las campañas de captación va sobre la conversación de WhatsApp, no sobre el clic.

**Advertencia de calidad (importante con stock premium limitado):** optimizar solo por "conversaciones iniciadas" tiende a bajar la calidad del lead con el tiempo (gente que abre chat pero no reserva). Dos defensas: (1) el **mensaje prellenado que califica** desde el primer mensaje (§4), y (2) para los ángulos de alto valor (P1/corporativo), usar el objetivo **Clientes potenciales**, que hace que Meta busque gente más propensa a responder el guion de calificación, no solo a abrir el chat.

---

## 1. Checklist de cuenta antes de lanzar (esta semana)

- [ ] **Vincular el número de WhatsApp Business a la Página de Facebook** (Meta Business Suite → Configuración → Cuentas de WhatsApp → conectar el número `5491167199527`). Sin esto no aparece WhatsApp como destino del anuncio.
- [ ] Confirmar que el número queda disponible en el **Administrador de anuncios** al elegir destino de mensaje.
- [ ] **WhatsApp Business app** configurada para responder rápido: mensaje de bienvenida, respuestas rápidas (`/fecha`, `/invitados`, `/catalogo`), etiquetas (Nuevo, Calificado, Presupuesto, Reservado) y mensaje de ausencia fuera de horario.
- [ ] Verificar en **Administrador de eventos** que el Pixel dispara `PageView`, `Contact` (clic wa.me) y `Lead` (solicitud). Ya están en el código — solo confirmar que llegan.
- [ ] Crear **públicos personalizados** en Meta: visitantes del sitio 30/90/180 días (Pixel) e interacciones IG/FB 365 días.
- [ ] Definir una **conversión personalizada** desde el evento `Lead` (solicitud enviada) = lead fuerte, para reportar por separado.
- [ ] KPI operativo n°1: **primera respuesta en WhatsApp < 1 hora en horario laboral.** Una campaña CTWA que genera chats sin respuesta en la primera hora quema plata.

---

## 2. Nomenclatura (para leer los resultados sin perderte)

**Campaña:** `LM_[Objetivo]_[Producto]_[Mes]` → ej. `LM_ENG_TeaParty_Jul`
**Conjunto (ad set):** `[Producto]_[Público]_[Ubicación]` → ej. `TeaParty_Mujeres25-55-AMBA_Auto`
**Anuncio:** `[Formato]_[Gancho]_v[N]` → ej. `Reel_MesaArmandose_v1`

Objetivos abreviados: `ENG` = Interacción, `LEAD` = Clientes potenciales, `RMK` = Remarketing.

---

## 3. Estructura de campañas (alineada al calendario del Plan v3)

Presupuesto a nivel **campaña (CBO / Advantage+ campaign budget)** salvo que se indique. Todos los importes en USD/día; ajustar al tipo de cambio y a las percepciones vigentes sobre pauta al exterior.

### C1 · Tea Party Invierno — **LANZAR YA (julio)**

Encaje perfecto de stock (10–40 pax) y estación baja. Objetivo: volumen barato de conversaciones.

- **Objetivo:** Interacción (`ENG`) → ubicación de conversión **WhatsApp** (CTWA).
- **Evento de optimización:** Conversaciones de mensajería iniciadas.
- **Presupuesto:** USD 7/día (CBO).
- **Ubicaciones:** Advantage+ (automáticas), con prioridad visual Reels + Stories IG/FB.
- **Conjuntos:**
  - `TeaParty_Amplio-AMBA_Auto` — mujeres 25–55, AMBA (radio CABA + GBA), intereses: baby shower, bridal shower, té, Bridgerton, cumpleaños, decoración vintage. **60% del presupuesto.**
  - `TeaParty_Advantage-Abierto` — segmentación abierta (Advantage+ audience), dejar que Meta encuentre. **40%.** *(A menudo gana al público por intereses; testear.)*
- **Creativos (A/B/C):** Reel "una mesa que parece de cuento" (mesa armándose) · Carrusel de mesas ambientadas · Estático "El plan de invierno estilo Bridgerton". Base ya diseñada en `anuncios-meta/` y `ads-meta.html`.
- **Mensaje prellenado:** ver §4 (Tea Party).

### C2 · Temporada Alta (P1 / P2 / P3) — **LANZAR agosto, escalar septiembre**

Aquí está el volumen y la caja. **P1 (salón elegante Premium) es la prioridad comercial máxima**, así que va en **campaña propia con presupuesto protegido** — no compartido con P2/P3, para que el algoritmo no le quite plata.

**C2a · Salón elegante Premium (P1) — la prioritaria**
- **Objetivo:** Clientes potenciales (`LEAD`) → conversión Mensajería/WhatsApp. *(Elegimos LEAD, no ENG, para que Meta priorice calidad: gente propensa a responder el guion, no solo a abrir chat.)*
- **Presupuesto:** USD 5/día en agosto (test) → **USD 10–20/día sept–nov**.
- **Público:** comprometidos/as AMBA, intereses casamiento, wedding planning, salones; + Advantage+ abierto en un conjunto paralelo.
- **Ángulo:** "Tu casamiento con dorados de autor — vestimos el salón entero, hasta ~200 cubiertos."
- **Mensaje prellenado:** ver §4 (P1).

**C2b · Mesa de honor (P2)** y **C2c · Boutique mix & match (P3)** — segunda campaña, dos conjuntos
- **Objetivo:** Interacción (`ENG`) → WhatsApp (volumen de conversaciones; ticket menor).
- **Presupuesto:** USD 5–8/día combinados, repartidos por rendimiento.
- **Conjunto P2:** "La cabecera que todos van a fotografiar, en vajilla antigua." Público: bodas grandes, comprometidos/as, planners. *(P2 es el caballo de Troya que abre la venta del salón Premium.)*
- **Conjunto P3:** "Menos invitados, mejor mesa." Público: microbodas, civiles, eventos íntimos, deco vintage.
- **Urgencia desde agosto:** "Las fechas de octubre–diciembre se están reservando ahora."

### C3 · Corporativo fin de año — **LANZAR octubre**

- **Objetivo:** Clientes potenciales (`LEAD`) → Mensajería (y variante a landing para el que prefiere mail).
- **Presupuesto:** USD 5–8/día en oct–nov.
- **Público:** intereses RRHH / eventos corporativos / marketing, AMBA; + remarketing de visitantes; + Advantage+ abierto. *(La segmentación B2B por cargo en AR es limitada — apoyarse en intereses + remarketing + público abierto.)*
- **Ángulo:** "La cena de fin de año de tu empresa, con una mesa premium." Premium dorado = ideal corporativo (stock alto + estética neutra premium).

### C4 · Remarketing — **always-on desde agosto**

- **Objetivo:** Interacción → WhatsApp (para quien ya conoce) + una variante Ventas/Tráfico a la landing con la solicitud.
- **Presupuesto:** USD 2–3/día.
- **Públicos:** visitantes del sitio 30/90 días (Pixel), interacciones IG/FB 365 días, reproductores de video 75%. Excluir quienes ya escribieron.
- **Creativo:** mesas curadas con **nombre y capacidad real** ("Hasta N comensales"), escasez de fechas sept–dic.

---

## 4. Mensajes prellenados por ángulo (califican y etiquetan el lead)

El prellenado **no** debe ser genérico ("Hola, me interesa"). Cada ángulo lleva su propio texto: (a) califica desde el primer mensaje (fecha, invitados, zona, tipo), y (b) te dice **de qué anuncio vino** sin herramientas extra. Guion de respuesta: fecha · invitados · zona · tipo → derivar a P1/P2/P3.

| Ángulo | Mensaje prellenado sugerido |
|---|---|
| **Tea Party (C1)** | `¡Hola La Melange! Vi el anuncio de Tea Party y quiero armar una merienda. Es para el [fecha] · [nº] personas · zona [___]. ¿Me pasan info?` |
| **P1 Salón elegante (C2a)** | `¡Hola! Quiero cotizar la vajilla elegante para mi casamiento. Fecha: [___] · invitados: [___] · salón/zona: [___].` |
| **P2 Mesa de honor (C2b)** | `¡Hola! Me interesa la mesa de honor en vajilla antigua para mi evento. Fecha: [___] · invitados totales: [___] · zona: [___].` |
| **P3 Boutique (C2c)** | `¡Hola! Quiero una mesa mix & match para un evento íntimo. Fecha: [___] · invitados: [___] · tipo (civil/microboda/cumple): [___].` |
| **Corporativo (C3)** | `¡Hola! Consulto por vajilla para un evento de empresa. Fecha: [___] · comensales: [___] · zona: [___] · empresa: [___].` |

En CTWA, el mensaje prellenado se carga en el anuncio (campo "mensaje de bienvenida"). Mantené los corchetes como recordatorio visual para que la persona complete.

---

## 5. Qué medir cada semana (tablero simple)

**Métrica de conversión primaria:** Conversaciones de mensajería iniciadas (por campaña).

Por campaña/ángulo: conversaciones iniciadas · **costo por conversación (CPL real)** · % que responden el guion (calificados) · presupuestos enviados · **reservas y facturación por producto (P1/P2/P3/Tea)** · ocupación de fechas sept–dic · **utilización de la línea Premium** (el indicador de negocio que más importa).

Secundario (Pixel/GA4): `Contact` (clic wa.me en landing) · `Lead` (solicitud completa) · visitantes para remarketing.

**Benchmarks AR 2025–26 (a validar con tus datos):** CPM ≈ USD 2–5 · CPC ≈ USD 0,10–0,40 · CPL WhatsApp estimado USD 3–10. Prever 20–30% de leads de baja calidad → el prellenado con fecha + invitados filtra.

**Embudo objetivo (conservador):** en escala, 60–100 conversaciones/mes → ~40% califican → 25–40 presupuestos → **8–15 reservas/mes** en temporada alta, con el grueso en P1.

---

## 6. Orden de lanzamiento (accionable)

1. **Esta semana (julio):** completar checklist §1 · vincular WhatsApp a la Página · lanzar **C1 Tea Party** (CTWA, Interacción→WhatsApp, USD 7/día).
2. **Fin julio:** leer resultados de C1, quedarse con el conjunto y creativo ganadores, subir a USD 10/día si CPL ≤ USD 8.
3. **Agosto:** lanzar **C2a (P1, Leads)** en campaña propia + **C2b/c (P2/P3, Interacción)** + activar **C4 remarketing**. Sumar urgencia "fechas sept–dic".
4. **Septiembre:** escalar C2a priorizando P1 (USD 10–20/día).
5. **Octubre:** lanzar **C3 corporativo**. Sumar fotos/testimonios de eventos realizados a los creativos.
6. **Nov–dic:** cosecha. Remarketing agresivo + escasez real de fechas.

---

## 7. Riesgos y cómo cubrirlos

- **Leads que no reservan:** mensaje prellenado que califica + objetivo Leads en P1/corporativo + respuesta < 1 h.
- **Prometer stock que no hay (300+ de antiguo no existe):** el prellenado pregunta invitados de entrada → derivar al producto correcto. Nunca reclamar escala uniforme de 300+.
- **Atribución imperfecta con app (sin API):** aceptable para este volumen. Si más adelante se migra a WhatsApp Platform/API, se suma la Conversions API de mensajería (`ctwa_clid` + `action_source: business_messaging`) para optimizar por leads calificados reales, no solo conversaciones. Es el próximo salto de madurez, no un requisito ahora.
