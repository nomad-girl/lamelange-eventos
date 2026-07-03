# Traspaso — La Mélange · Vajilla para eventos (sitio web)

> Documento para retomar el proyecto en otra computadora.
> Última actualización: junio 2026.

---

## 1. Qué es esto

Una **landing + catálogo** enfocada SOLO en **vajilla para eventos** (bodas, fiestas, corporativos),
separada de la tienda actual de antigüedades/utilería. Objetivo: **generar demanda** en el nicho de
wedding planners, ambientadores, salones y caterings, con anuncios dirigidos.

Inspiración: casadeperrin.com y portotablesetting.com.ar (producto al frente, propuestas claras).
Estética copiada de la tienda actual **lamelange.com.ar** (blanco minimal, Playfair Display + Montserrat).

Es un sitio **estático** (HTML + CSS + JavaScript, sin framework). Liviano y fácil de editar.
Más adelante se migra a Next.js + Booqable (ver `ROADMAP.md`).

---

## 2. Dónde están los archivos

Todo vive en la carpeta del proyecto:

```
La Melange Rental OS/
├── web-eventos/            ← EL SITIO (esto es lo importante)
│   ├── index.html          Home (todas las secciones)
│   ├── catalogo.html       Catálogo navegable por colección
│   ├── styles.css          Todo el diseño (colores, tipografías, layout)
│   ├── data.js             ★ LOS DATOS: colecciones, productos, mesas, stock
│   ├── assets/             (vacío) acá van las fotos cuando estén
│   ├── ROADMAP.md          Plan completo del proyecto en fases
│   └── HANDOFF.md          este archivo
├── ROADMAP.md              Roadmap del Rental OS (proyecto más grande, a futuro)
└── docs/                   Documentación del Rental OS (Booqable, etc.)
```

### Cómo llevarlo a otra computadora
La forma más simple: **copiar toda la carpeta `La Melange Rental OS`** (por USB, Google Drive,
Dropbox o AirDrop). No hace falta instalar nada para *editar* o *ver* el sitio, solo un navegador.

(Alternativa para más adelante: subirlo a GitHub y clonarlo. No es necesario por ahora.)

---

## 3. Cómo ver el sitio localmente

Necesitás **Python 3** (viene instalado en casi todas las Mac). En una Terminal:

```bash
cd "ruta/a/La Melange Rental OS/web-eventos"
python3 -m http.server 4321
```

Después abrí en el navegador: **http://127.0.0.1:4321/index.html**

> También se puede abrir `index.html` con doble clic, pero conviene el servidor
> para que cargue bien el archivo `data.js`.

### Verlo en el iPhone (misma red Wi-Fi)
1. Levantá el server permitiendo la red local:
   `python3 -m http.server 4321 --bind 0.0.0.0`
2. Averiguá la IP de la Mac: `ipconfig getifaddr en0`
3. En el iPhone (mismo Wi-Fi), entrá a `http://ESA-IP:4321`

### Link público temporal (para mostrar desde cualquier lado)
Con Node instalado:
```bash
npx -y cloudflared tunnel --url http://127.0.0.1:4321
```
Te da una URL `https://...trycloudflare.com`. Es **temporal** (muere al cerrar la Mac).

---

## 4. Cómo está armada la home (el user journey)

El profesional llega → hero → **elige 1 de 3 modalidades** → consulta por WhatsApp (= lead).

Orden de las secciones en `index.html`:
1. **Navegación** + botón "Pedir presupuesto"
2. **Hero** — foto de mesa montada + título
3. **Elegí cómo armar tu mesa** — las 3 modalidades (el corazón del journey)
4. **Colecciones** (Modalidad A) — líneas completas por tipo → al catálogo
5. **Mesas curadas** (Modalidad B) — combinaciones armadas, galería por modelo
6. **Armá tu mesa** (Modalidad C) — constructor interactivo (apila platos)
7. **Stock real por modelo** — banda de confianza
8. **Lookbook** — mesas montadas
9. **Por qué La Mélange** — 3 valores
10. **Para profesionales** — condiciones + catálogo PDF
11. **Contacto** (WhatsApp) + **Footer**

### Las 3 modalidades (clave del proyecto)
- **A · Catálogo por línea:** stock alto, todas iguales. Producto + cantidad.
- **B · Mesas curadas:** mix & match ya combinado por ustedes. Propuesta lista.
- **C · Armá tu mesa:** el cliente combina capa por capa. El stock manda.

### Regla de capacidad (mesas y constructor)
"Para cuántos comensales alcanza" = **el menor stock de las piezas** de la mesa.
La pieza más escasa (un antiguo mix & match) define la capacidad. Se calcula solo.

---

## 5. Cómo editar el contenido — archivo `data.js`

Casi todo el contenido sale de **`data.js`**. Se edita con cualquier editor de texto.
No hay que tocar HTML para cambiar productos, mesas o stock.

### `COLECCIONES` — las categorías de la home
```js
{ id:'platos', nombre:'Platos', icon:'bowl', modelos:18 }
```

### `PRODUCTOS` — las piezas del catálogo
```js
{ nombre:'Bajoplato vidrio ámbar', coleccion:'cargadores', icon:'plato',
  material:'Vidrio · ámbar', stock:240, destacado:true, foto:null }
```
- `coleccion` debe coincidir con un `id` de COLECCIONES.
- `destacado:true` → aparece también en la sección "Stock real".
- `foto:null` → muestra un slot gris. Poné `foto:"assets/archivo.jpg"` cuando tengas la imagen.

### `MESAS` — las mesas curadas (Modalidad B)
```js
{ id:'otono-vintage', nombre:'Mesa Otoño Vintage', tipo:'Mesa principal · íntima',
  fotos:[], piezas:[ {n:'Bajoplato vidrio ámbar', s:240}, {n:'Plato Minerva', s:18} ] }
```
- `piezas` con su stock `s` → el sitio calcula "Hasta N comensales" (el menor `s`).
- `tipo` es el texto chico de arriba (ej: "Para todo el salón" o "Cabecera · íntima").
- `fotos:[]` → galería. La primera foto es la grande, las siguientes son miniaturas.
  Ej: `fotos:["assets/otono-1.jpg","assets/otono-2.jpg","assets/otono-3.jpg"]`

### `LAYERS` — opciones del constructor (Modalidad C)
Cada capa (bajoplato / playo / postre) con sus modelos. Por ahora usan `color`/`rim`
provisorios; cuando haya fotos **cenitales recortadas** se agrega `foto` y se ven reales.

### `WSP` — número de WhatsApp
```js
var WSP = '5491100000000';   // ← REEMPLAZAR por el número real (formato internacional, sin +)
```

---

## 6. Pendientes / cosas a reemplazar (están como ejemplo)

- [ ] **Número de WhatsApp** real en `data.js` (`WSP`).
- [ ] **Mail de contacto** real (ahora `hola@lamelange.com.ar` en `index.html` y `catalogo.html`).
- [ ] **Datos reales** de productos, mesas y stock en `data.js` (hoy son de ejemplo).
- [ ] **Fotos** (ver brief abajo). Hoy todo son slots grises.
- [ ] **Link de Instagram** en el footer.

---

## 7. Las fotos (lo que define la categoría) 📸

La diferencia con la web actual son **fotos parejas**. Tres tipos:

1. **Producto (catálogo):** ~40-60 piezas hero. Fondo único y neutro, luz natural difusa,
   mismo ángulo por tipo, misma distancia. Que todas se vean "de la misma familia".
2. **Cenitales recortables (para el constructor):** platos/copas/cubiertos desde arriba,
   centrados, fondo blanco o PNG transparente → se superponen capa sobre capa.
3. **Ambientadas (lookbook + mesas curadas):** 6-10 mesas montadas completas, una por estilo.

Las fotos van en `web-eventos/assets/` y se referencian desde `data.js`.

---

## 8. Cómo deployar (para una URL fija y compartible)

Recomendado: **Vercel** (gratis para esto). Con Node instalado:
```bash
npm i -g vercel        # una vez
cd "ruta/.../web-eventos"
vercel login           # una vez (interactivo, abre el navegador)
vercel --prod          # deploya y te da la URL (ej: la-melange.vercel.app)
```
No toca el dominio actual. Para usar un subdominio propio (ej: `eventos.lamelange.com.ar`)
se configura después en el panel de Vercel.

---

## 9. Decisiones de diseño ya tomadas

- Estética = la de **lamelange.com.ar**: blanco minimal, negro, acento slate `#2c3e50`.
- Tipografías: **Playfair Display** (títulos) + **Montserrat** (textos).
- Sección de modalidades **justo después del hero**; constructor **en la home**.
- Mesas curadas **photo-first** (foto grande protagonista + galería), texto secundario.
- Banda "Para profesionales" en **negro cálido + bronce** (sin azul).
- Mesas etiquetadas por capacidad: con antiguos = *cabecera/íntima*; líneas completas = *para todo el salón*.

---

## 10. Próximos pasos

Ver **`ROADMAP.md`** (mismo folder) para el plan completo en fases. Resumen inmediato:
1. Terminar la planilla de stock (modelo · material · cantidad) y elegir 4-6 mesas curadas.
2. Sacar las fotos (incluí las cenitales recortables para el constructor).
3. Cargar datos y fotos reales en `data.js`, poner WhatsApp/mail reales, y deployar a Vercel.
```
