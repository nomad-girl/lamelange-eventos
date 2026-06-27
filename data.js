/* ============================================================
   Datos del catálogo — La Mélange (vajilla para eventos)
   --------------------------------------------------------
   DATOS DE EJEMPLO. Reemplazar nombres, materiales y stock por
   los reales. Cuando estén las fotos, poner la URL en `foto`
   (ej: foto: "assets/bajoplato-ambar.jpg") y el slot se reemplaza.
   ============================================================ */

/* ---------- MEDICIÓN (analytics) ----------
   Pegá acá tus IDs cuando los tengas. Si quedan vacíos, no pasa nada:
   el sitio funciona igual, solo que no mide todavía.
   - ga4:   ID de Google Analytics 4. Formato: "G-XXXXXXXXXX"
            (analytics.google.com → Administrar → Flujos de datos → ID de medición)
   - pixel: ID de Meta Pixel (solo números). Formato: "123456789012345"
            (business.facebook.com → Administrador de eventos → tu pixel) */
var ANALYTICS = {
  ga4:   '',   // ← pegá acá el G-XXXXXXXXXX
  pixel: ''    // ← pegá acá el número del Meta Pixel
};

var ICONS = {
  plato:  '<svg viewBox="0 0 24 24" fill="none" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/></svg>',
  bowl:   '<svg viewBox="0 0 24 24" fill="none" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M7 7c0-1.5 1-2.5 2-2.5M12 6c0-1.5 1-2.5 2-2.5"/></svg>',
  copa:   '<svg viewBox="0 0 24 24" fill="none" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h10l-1 6a4 4 0 0 1-8 0L7 3z"/><path d="M12 13v6M8 21h8"/></svg>',
  cubierto:'<svg viewBox="0 0 24 24" fill="none" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3v7M5 3v4a2 2 0 0 0 4 0V3M7 10v11"/><path d="M16 3c-1.5 0-2 2-2 4s.5 4 2 4m0-8v18"/></svg>',
  textil: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="1"/><path d="M8 8l8 8M16 8l-8 8"/></svg>',
  centro: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c2 3 2 6 0 8-2-2-2-5 0-8z"/><path d="M12 10v10M6 21h12"/></svg>'
};

var COLECCIONES = [
  { id: 'cargadores', nombre: 'Platos de sitio',  icon: 'plato',   modelos: 4,  portada: 'assets/06-hero-portada/categorias/cat-platos-de-sitio.jpg' },
  { id: 'platos',     nombre: 'Platos',           icon: 'bowl',    modelos: 32, portada: 'assets/06-hero-portada/categorias/cat-platos.jpg' },
  { id: 'cubiertos',  nombre: 'Cubertería',       icon: 'cubierto',modelos: 4,  portada: 'assets/06-hero-portada/categorias/cat-cuberteria.png' },
  { id: 'cristaleria',nombre: 'Cristalería',      icon: 'copa',    modelos: 12, portada: 'assets/06-hero-portada/categorias/cat-cristaleria.jpg' },
  { id: 'plateria',   nombre: 'Platería',         icon: 'centro',  modelos: 0,  portada: 'assets/06-hero-portada/categorias/cat-plateria.jpg' }
];

var PRODUCTOS = [
  /* ---------- Platos de sitio (cargadores) ---------- */
  { nombre: 'Plato de sitio Perla oro', coleccion: 'cargadores', icon: 'plato', material: 'Borde perlado dorado', destacado: true,  piezas: [{ s: 300 }], fotos: ['assets/01-platos-de-sitio/perla-oro/perla-oro-1.jpg','assets/01-platos-de-sitio/perla-oro/perla-oro-2.jpg','assets/01-platos-de-sitio/perla-oro/perla-oro-3.jpg'] },
  { nombre: 'Plato de sitio Satín oro', coleccion: 'cargadores', icon: 'plato', material: 'Dorado satinado',     destacado: false, piezas: [{ s: 180 }], fotos: ['assets/01-platos-de-sitio/satin-oro/satin-oro-1.jpg','assets/01-platos-de-sitio/satin-oro/satin-oro-2.jpg'] },
  { nombre: 'Plato de sitio Yute',      coleccion: 'cargadores', icon: 'plato', material: 'Fibra de yute',       destacado: false, piezas: [{ s: 340 }], fotos: ['assets/01-platos-de-sitio/yute/yute-1.jpg','assets/01-platos-de-sitio/yute/yute-2.jpg'] },
  { nombre: 'Plato de sitio Palma',     coleccion: 'cargadores', icon: 'plato', material: 'Fibra de palma',      destacado: false, piezas: [{ s: 200 }], fotos: ['assets/01-platos-de-sitio/palma/palma-1.jpg','assets/01-platos-de-sitio/palma/palma-2.jpg'] },

  /* ---------- Platos (modelos reales del shooting · STOCK A CONFIRMAR ⚠️) ----------
     Las fotos y tags están cargados. El stock figura como "—" hasta que Natali
     pase las cantidades reales de cada pieza. Mix & Match se carga aparte. */
  { id:'luxury-gold', nombre:'Luxury Gold', coleccion:'platos', icon:'bowl', material:'Porcelana · borde dorado', destacado:true, piezas:[{t:'Playo',s:120},{t:'Postre',s:110}], tags:['dorado','clásico','porcelana','playo','postre'], descripcion:'Línea Luxury con borde dorado. Elegante y de alto impacto para mesas premium.', combinaCon:['luxury-white'], fotos:['assets/02-platos/luxury-gold/luxury-gold-1.jpg','assets/02-platos/luxury-gold/luxury-gold-2.jpg','assets/02-platos/luxury-gold/luxury-gold-3.jpg'] },
  { id:'luxury-white', nombre:'Luxury White', coleccion:'platos', icon:'bowl', material:'Porcelana · blanco y oro', destacado:false, piezas:[{t:'Playo',s:90},{t:'Postre',s:80}], tags:['blanco','dorado','clásico','porcelana','playo','postre'], descripcion:'Línea Luxury en blanco con filo dorado. Clásica y luminosa.', combinaCon:['luxury-gold'], fotos:['assets/02-platos/luxury-white/luxury-white-1.jpg','assets/02-platos/luxury-white/luxury-white-2.jpg','assets/02-platos/luxury-white/luxury-white-3.jpg'] },
  { id:'perla-rosa', nombre:'Perla rosa', coleccion:'platos', icon:'bowl', material:'Cerámica · rosa', destacado:true, piezas:[{t:'Playo',s:70},{t:'Postre',s:60}], tags:['rosa','romántico','cerámica','playo','postre'], descripcion:'Cerámica rosa empolvado con borde festoneado y fluteado. Romántica, ideal para mesas boutique.', combinaCon:['perla-blanco','rosa-ceramica','rosa-puntilla'], fotos:['assets/02-platos/perla-rosa/perla-rosa-5.jpg','assets/02-platos/perla-rosa/perla-rosa-1.jpg','assets/02-platos/perla-rosa/perla-rosa-2.jpg','assets/02-platos/perla-rosa/perla-rosa-3.jpg','assets/02-platos/perla-rosa/perla-rosa-4.jpg','assets/02-platos/perla-rosa/perla-rosa-6.jpg','assets/02-platos/perla-rosa/perla-rosa-7.jpg','assets/02-platos/perla-rosa/perla-rosa-8.jpg','assets/02-platos/perla-rosa/perla-rosa-9.jpg'] },
  { id:'perla-blanco', nombre:'Perla blanco', coleccion:'platos', icon:'bowl', material:'Cerámica · blanco', destacado:false, piezas:[{t:'Playo',s:80},{t:'Postre',s:72}], tags:['blanco','romántico','cerámica','playo','postre'], descripcion:'Cerámica blanca con borde festoneado. La versión neutra de la línea Perla.', combinaCon:['perla-rosa','relieve-blanco'], fotos:['assets/02-platos/perla-blanco/perla-blanco-1.jpg','assets/02-platos/perla-blanco/perla-blanco-2.jpg','assets/02-platos/perla-blanco/perla-blanco-3.jpg','assets/02-platos/perla-blanco/perla-blanco-4.jpg'] },
  { id:'premium', nombre:'Premium', coleccion:'platos', icon:'bowl', material:'Porcelana · línea Premium', destacado:false, piezas:[{t:'Playo',s:100}], tags:['blanco','dorado','clásico','porcelana','playo'], descripcion:'Línea Premium en porcelana, blanco impecable con detalle dorado.', fotos:['assets/02-platos/premium/premium-1.jpg','assets/02-platos/premium/premium-2.jpg','assets/02-platos/premium/premium-3.jpg'] },
  { id:'relieve-blanco', nombre:'Relieve blanco', coleccion:'platos', icon:'bowl', material:'Cerámica · relieve blanco', destacado:false, piezas:[{t:'Playo',s:96},{t:'Postre',s:84}], tags:['blanco','clásico','cerámica','playo','postre'], descripcion:'Cerámica blanca con relieve perimetral. Neutro y elegante, combina con todo.', combinaCon:['relieve-verde','perla-blanco'], fotos:['assets/02-platos/relieve-blanco/relieve-blanco-1.jpg','assets/02-platos/relieve-blanco/relieve-blanco-2.jpg','assets/02-platos/relieve-blanco/relieve-blanco-3.jpg','assets/02-platos/relieve-blanco/relieve-blanco-4.jpg'] },
  { id:'relieve-verde', nombre:'Relieve verde', coleccion:'platos', icon:'bowl', material:'Cerámica · relieve verde', destacado:false, piezas:[{t:'Playo',s:70},{t:'Postre',s:64}], tags:['verde','campestre','cerámica','playo','postre'], descripcion:'Cerámica verde con relieve. Fresca y natural, ideal para eventos al aire libre.', combinaCon:['relieve-blanco'], fotos:['assets/02-platos/relieve-verde/relieve-verde-1.jpg','assets/02-platos/relieve-verde/relieve-verde-2.jpg','assets/02-platos/relieve-verde/relieve-verde-3.jpg','assets/02-platos/relieve-verde/relieve-verde-4.jpg'] },
  { id:'joy', nombre:'Joy', coleccion:'platos', icon:'bowl', material:'Línea B&N', destacado:false, piezas:[{t:'Postre / pan',s:48}], tags:['blanco','negro','moderno','postre'], descripcion:'Plato de la línea blanco y negro, con impronta moderna.', combinaCon:['net','negro'], fotos:['assets/02-platos/joy/joy-3.jpg','assets/02-platos/joy/joy-1.jpg','assets/02-platos/joy/joy-2.jpg','assets/02-platos/joy/joy-4.jpg','assets/02-platos/joy/joy-5.jpg'] },
  { id:'net', nombre:'Net', coleccion:'platos', icon:'bowl', material:'Línea B&N', destacado:false, piezas:[{t:'Postre / entrada',s:60}], tags:['blanco','negro','moderno','postre'], descripcion:'Plato de entrada de la línea blanco y negro, con patrón gráfico.', combinaCon:['joy','negro'], fotos:['assets/02-platos/net/net-2.jpg','assets/02-platos/net/net-1.jpg'] },
  { id:'negro', nombre:'Negro', coleccion:'platos', icon:'bowl', material:'Cerámica · negro', destacado:false, piezas:[{t:'Playo',s:90}], tags:['negro','moderno','playo'], descripcion:'Plato playo negro. Base moderna y de contraste para la línea B&N.', combinaCon:['joy','net'], fotos:['assets/02-platos/negro/negro-1.jpg','assets/02-platos/negro/negro-2.jpg','assets/02-platos/negro/negro-3.jpg'] },
  { id:'rosa-puntilla', nombre:'Rosa Puntilla', coleccion:'platos', icon:'bowl', material:'Cerámica · rosa', destacado:false, piezas:[{t:'Postre',s:36}], tags:['rosa','romántico','postre'], descripcion:'Plato de postre rosa con detalle de puntilla. Delicado y romántico.', combinaCon:['perla-rosa','rosa-ceramica'], fotos:['assets/02-platos/rosa-puntilla/rosa-puntilla-1.jpg'] },
  { id:'rosa-ceramica', nombre:'Plato cerámica rosa', coleccion:'platos', icon:'bowl', material:'Cerámica · rosa', destacado:false, piezas:[{t:'Playo',s:80},{t:'Postre',s:70}], tags:['rosa','romántico','cerámica','playo','postre'], descripcion:'Cerámica en tono rosa suave. Combina monocromo o con otros rosas y blancos.', combinaCon:['perla-rosa','rosa-puntilla'], fotos:['assets/02-platos/rosa-ceramica/rosa-ceramica-1.jpg'] },

  /* ---------- Mix & Match (familias con sub-modelos · STOCK A CONFIRMAR ⚠️) ----------
     Cada playo y cada postre es un producto propio (filtrable). Se cruzan en "combiná con".
     Nombres de postres provisorios (Blue & White 01..10 / Bordó 01..04). */
  { id:'bw-rockwood', nombre:'Inglés Blue Rockwood', coleccion:'platos', icon:'bowl', material:'Mix & match · azul', destacado:false, piezas:[{t:'Playo 25 cm',s:12},{t:'Postre 22 cm',s:12}], tags:['azul','vintage','mix & match','playo','postre'], descripcion:'Modelo Blue & White de mix & match. Combinable con cualquier otro de la familia.', combinaCon:['bw-lozalit','bw-gural','bw-printemps','bw-british-anchor','bw-country','bw-johnson','bw-saxonia','bw-tsuji-old','bw-kent','bw-opulence','bw-verbano','bw-tsuji-flora','bw-bavaria'], fotos:['assets/02-platos/bw-rockwood/bw-rockwood-1.jpg','assets/02-platos/bw-rockwood/bw-rockwood-2.jpg','assets/02-platos/bw-rockwood/bw-rockwood-3.jpg'] },
  { id:'bw-lozalit', nombre:'Azul con Flores Vintage Lozalit', coleccion:'platos', icon:'bowl', material:'Mix & match · azul', destacado:false, piezas:[{t:'Playo 25 cm',s:28},{t:'Postre 20 cm',s:21}], tags:['azul','vintage','mix & match','playo','postre'], descripcion:'Modelo Blue & White de mix & match. Combinable con cualquier otro de la familia.', combinaCon:['bw-rockwood','bw-gural','bw-printemps','bw-british-anchor','bw-country','bw-johnson','bw-saxonia','bw-tsuji-old','bw-kent','bw-opulence','bw-verbano','bw-tsuji-flora','bw-bavaria'], fotos:['assets/02-platos/bw-lozalit/bw-lozalit-1.jpg','assets/02-platos/bw-lozalit/bw-lozalit-2.jpg','assets/02-platos/bw-lozalit/bw-lozalit-3.jpg'] },
  { id:'bw-gural', nombre:'Azul y Oro Gural', coleccion:'platos', icon:'bowl', material:'Mix & match · azul y oro', destacado:false, piezas:[{t:'Playo 27 cm',s:7},{t:'Postre 20 cm',s:6}], tags:['azul','dorado','vintage','mix & match','playo','postre'], descripcion:'Modelo Blue & White de mix & match. Combinable con cualquier otro de la familia.', combinaCon:['bw-rockwood','bw-lozalit','bw-printemps','bw-british-anchor','bw-country','bw-johnson','bw-saxonia','bw-tsuji-old','bw-kent','bw-opulence','bw-verbano','bw-tsuji-flora','bw-bavaria'], fotos:['assets/02-platos/bw-gural/bw-gural-1.jpg','assets/02-platos/bw-gural/bw-gural-2.jpg'] },
  { id:'bw-printemps', nombre:'Blue & White Printemps', coleccion:'platos', icon:'bowl', material:'Mix & match · azul', destacado:false, piezas:[{t:'Playo 23 cm',s:23},{t:'Postre 20 cm',s:12}], tags:['azul','vintage','mix & match','playo','postre'], descripcion:'Modelo Blue & White de mix & match. Combinable con cualquier otro de la familia.', combinaCon:['bw-rockwood','bw-lozalit','bw-gural','bw-british-anchor','bw-country','bw-johnson','bw-saxonia','bw-tsuji-old','bw-kent','bw-opulence','bw-verbano','bw-tsuji-flora','bw-bavaria'], fotos:['assets/02-platos/bw-printemps/bw-printemps-1.jpg','assets/02-platos/bw-printemps/bw-printemps-2.jpg'] },
  { id:'bw-british-anchor', nombre:'Blue British Anchor', coleccion:'platos', icon:'bowl', material:'Mix & match · azul', destacado:false, piezas:[{t:'Playo 23 cm',s:6},{t:'Postre 20 cm',s:5}], tags:['azul','vintage','mix & match','playo','postre'], descripcion:'Modelo Blue & White de mix & match. Combinable con cualquier otro de la familia.', combinaCon:['bw-rockwood','bw-lozalit','bw-gural','bw-printemps','bw-country','bw-johnson','bw-saxonia','bw-tsuji-old','bw-kent','bw-opulence','bw-verbano','bw-tsuji-flora','bw-bavaria'], fotos:['assets/02-platos/bw-british-anchor/bw-british-anchor-1.jpg','assets/02-platos/bw-british-anchor/bw-british-anchor-2.jpg'] },
  { id:'bw-country', nombre:'Blue Country', coleccion:'platos', icon:'bowl', material:'Mix & match · azul', destacado:false, piezas:[{t:'Entrada 19 cm',s:44}], tags:['azul','vintage','mix & match','postre'], descripcion:'Modelo Blue & White de mix & match. Combinable con cualquier otro de la familia.', combinaCon:['bw-rockwood','bw-lozalit','bw-gural','bw-printemps','bw-british-anchor','bw-johnson','bw-saxonia','bw-tsuji-old','bw-kent','bw-opulence','bw-verbano','bw-tsuji-flora','bw-bavaria'], fotos:['assets/02-platos/bw-country/bw-country-1.jpg','assets/02-platos/bw-country/bw-country-2.jpg'] },
  { id:'bw-johnson', nombre:'Johnson Bros Blue & White', coleccion:'platos', icon:'bowl', material:'Mix & match · azul', destacado:false, piezas:[{t:'Playo 25 cm',s:11},{t:'Postre 20 cm',s:10}], tags:['azul','vintage','mix & match','playo','postre'], descripcion:'Modelo Blue & White de mix & match. Combinable con cualquier otro de la familia.', combinaCon:['bw-rockwood','bw-lozalit','bw-gural','bw-printemps','bw-british-anchor','bw-country','bw-saxonia','bw-tsuji-old','bw-kent','bw-opulence','bw-verbano','bw-tsuji-flora','bw-bavaria'], fotos:['assets/02-platos/bw-johnson/bw-johnson-1.jpg','assets/02-platos/bw-johnson/bw-johnson-2.jpg','assets/02-platos/bw-johnson/bw-johnson-3.jpg'] },
  { id:'bw-saxonia', nombre:'Porcelana Azul Saxonia', coleccion:'platos', icon:'bowl', material:'Mix & match · azul', destacado:false, piezas:[{t:'Postre 20 cm',s:12}], tags:['azul','vintage','mix & match','postre'], descripcion:'Modelo Blue & White de mix & match. Combinable con cualquier otro de la familia.', combinaCon:['bw-rockwood','bw-lozalit','bw-gural','bw-printemps','bw-british-anchor','bw-country','bw-johnson','bw-tsuji-old','bw-kent','bw-opulence','bw-verbano','bw-tsuji-flora','bw-bavaria'], fotos:['assets/02-platos/bw-saxonia/bw-saxonia-1.jpg','assets/02-platos/bw-saxonia/bw-saxonia-2.jpg'] },
  { id:'bw-tsuji-old', nombre:'Old Blue Tsuji', coleccion:'platos', icon:'bowl', material:'Mix & match · azul', destacado:false, piezas:[{t:'Postre 20 cm',s:11}], tags:['azul','vintage','mix & match','postre'], descripcion:'Modelo Blue & White de mix & match. Combinable con cualquier otro de la familia.', combinaCon:['bw-rockwood','bw-lozalit','bw-gural','bw-printemps','bw-british-anchor','bw-country','bw-johnson','bw-saxonia','bw-kent','bw-opulence','bw-verbano','bw-tsuji-flora','bw-bavaria'], fotos:['assets/02-platos/bw-tsuji-old/bw-tsuji-old-1.jpg','assets/02-platos/bw-tsuji-old/bw-tsuji-old-2.jpg'] },
  { id:'bw-kent', nombre:'Blue & White Kent', coleccion:'platos', icon:'bowl', material:'Mix & match · azul', destacado:false, piezas:[{t:'Playo 24 cm',s:12}], tags:['azul','vintage','mix & match','playo'], descripcion:'Modelo Blue & White de mix & match. Combinable con cualquier otro de la familia.', combinaCon:['bw-rockwood','bw-lozalit','bw-gural','bw-printemps','bw-british-anchor','bw-country','bw-johnson','bw-saxonia','bw-tsuji-old','bw-opulence','bw-verbano','bw-tsuji-flora','bw-bavaria'], fotos:['assets/02-platos/bw-kent/bw-kent-1.jpg','assets/02-platos/bw-kent/bw-kent-2.jpg','assets/02-platos/bw-kent/bw-kent-3.jpg'] },
  { id:'bw-opulence', nombre:'Opulence Blue & White', coleccion:'platos', icon:'bowl', material:'Mix & match · azul', destacado:false, piezas:[{t:'Playo 27 cm',s:19}], tags:['azul','vintage','mix & match','playo'], descripcion:'Modelo Blue & White de mix & match. Combinable con cualquier otro de la familia.', combinaCon:['bw-rockwood','bw-lozalit','bw-gural','bw-printemps','bw-british-anchor','bw-country','bw-johnson','bw-saxonia','bw-tsuji-old','bw-kent','bw-verbano','bw-tsuji-flora','bw-bavaria'], fotos:['assets/02-platos/bw-opulence/bw-opulence-1.jpg','assets/02-platos/bw-opulence/bw-opulence-2.jpg','assets/02-platos/bw-opulence/bw-opulence-3.jpg','assets/02-platos/bw-opulence/bw-opulence-4.jpg','assets/02-platos/bw-opulence/bw-opulence-5.jpg'] },
  { id:'bw-verbano', nombre:'Verbano Azul y Oro', coleccion:'platos', icon:'bowl', material:'Mix & match · azul y oro', destacado:false, piezas:[{t:'Playo 25 cm',s:32},{t:'Postre 20 cm',s:23}], tags:['azul','dorado','vintage','mix & match','playo','postre'], descripcion:'Modelo Blue & White de mix & match. Combinable con cualquier otro de la familia.', combinaCon:['bw-rockwood','bw-lozalit','bw-gural','bw-printemps','bw-british-anchor','bw-country','bw-johnson','bw-saxonia','bw-tsuji-old','bw-kent','bw-opulence','bw-tsuji-flora','bw-bavaria'], fotos:['assets/02-platos/bw-verbano/bw-verbano-1.jpg','assets/02-platos/bw-verbano/bw-verbano-2.jpg','assets/02-platos/bw-verbano/bw-verbano-3.jpg'] },
  { id:'bw-tsuji-flora', nombre:'Tsuji Blue Flora', coleccion:'platos', icon:'bowl', material:'Mix & match · azul', destacado:false, piezas:[{t:'Postre 20 cm',s:12}], tags:['azul','vintage','mix & match','postre'], descripcion:'Modelo Blue & White de mix & match. Combinable con cualquier otro de la familia.', combinaCon:['bw-rockwood','bw-lozalit','bw-gural','bw-printemps','bw-british-anchor','bw-country','bw-johnson','bw-saxonia','bw-tsuji-old','bw-kent','bw-opulence','bw-verbano','bw-bavaria'], fotos:['assets/02-platos/bw-tsuji-flora/bw-tsuji-flora-1.jpg','assets/02-platos/bw-tsuji-flora/bw-tsuji-flora-2.jpg','assets/02-platos/bw-tsuji-flora/bw-tsuji-flora-3.jpg'] },
  { id:'bw-bavaria', nombre:'Flores Azul Bavaria Marie Luise', coleccion:'platos', icon:'bowl', material:'Mix & match · azul', destacado:false, piezas:[{t:'Postre',s:20}], tags:['azul','vintage','mix & match','postre'], descripcion:'Modelo Blue & White de mix & match. Combinable con cualquier otro de la familia.', combinaCon:['bw-rockwood','bw-lozalit','bw-gural','bw-printemps','bw-british-anchor','bw-country','bw-johnson','bw-saxonia','bw-tsuji-old','bw-kent','bw-opulence','bw-verbano','bw-tsuji-flora'], fotos:['assets/02-platos/bw-bavaria/bw-bavaria-1.jpg'] },
  { id:'bordo-clasico', nombre:'Bordó', coleccion:'platos', icon:'bowl', material:'Mix & match · bordó', destacado:false, piezas:[{t:'Playo',s:40}], tags:['bordó','vintage','mix & match','playo'], descripcion:'Plato playo Bordó de la familia mix & match. Combinable con todos los postres de la línea.', combinaCon:['bordo-opulence','bordo-postre-01','bordo-postre-02','bordo-postre-03','bordo-postre-04'], fotos:['assets/02-platos/bordo-clasico/bordo-clasico-1.jpg','assets/02-platos/bordo-clasico/bordo-clasico-2.jpg','assets/02-platos/bordo-clasico/bordo-clasico-3.jpg','assets/02-platos/bordo-clasico/bordo-clasico-4.jpg'] },
  { id:'bordo-opulence', nombre:'Bordó Opulence', coleccion:'platos', icon:'bowl', material:'Mix & match · bordó', destacado:false, piezas:[{t:'Playo',s:32}], tags:['bordó','vintage','mix & match','playo'], descripcion:'Plato playo Bordó de la familia mix & match. Combinable con todos los postres de la línea.', combinaCon:['bordo-clasico','bordo-postre-01','bordo-postre-02','bordo-postre-03','bordo-postre-04'], fotos:['assets/02-platos/bordo-opulence/bordo-opulence-1.jpg','assets/02-platos/bordo-opulence/bordo-opulence-2.jpg','assets/02-platos/bordo-opulence/bordo-opulence-3.jpg','assets/02-platos/bordo-opulence/bordo-opulence-4.jpg','assets/02-platos/bordo-opulence/bordo-opulence-5.jpg','assets/02-platos/bordo-opulence/bordo-opulence-6.jpg','assets/02-platos/bordo-opulence/bordo-opulence-7.jpg','assets/02-platos/bordo-opulence/bordo-opulence-8.jpg','assets/02-platos/bordo-opulence/bordo-opulence-9.jpg','assets/02-platos/bordo-opulence/bordo-opulence-10.jpg','assets/02-platos/bordo-opulence/bordo-opulence-11.jpg'] },
  { id:'bordo-postre-01', nombre:'Postre Bordó 01', coleccion:'platos', icon:'bowl', material:'Mix & match · bordó', destacado:false, piezas:[{t:'Postre',s:12}], tags:['bordó','vintage','mix & match','postre'], descripcion:'Plato de postre mix & match Bordó. Combinable con cualquier playo de la línea.', combinaCon:['bordo-clasico','bordo-opulence'], fotos:['assets/02-platos/bordo-postre-01/bordo-postre-01-1.jpg'] },
  { id:'bordo-postre-02', nombre:'Postre Bordó 02', coleccion:'platos', icon:'bowl', material:'Mix & match · bordó', destacado:false, piezas:[{t:'Postre',s:10}], tags:['bordó','vintage','mix & match','postre'], descripcion:'Plato de postre mix & match Bordó. Combinable con cualquier playo de la línea.', combinaCon:['bordo-clasico','bordo-opulence'], fotos:['assets/02-platos/bordo-postre-02/bordo-postre-02-1.jpg'] },
  { id:'bordo-postre-03', nombre:'Postre Bordó 03', coleccion:'platos', icon:'bowl', material:'Mix & match · bordó', destacado:false, piezas:[{t:'Postre',s:8}], tags:['bordó','vintage','mix & match','postre'], descripcion:'Plato de postre mix & match Bordó. Combinable con cualquier playo de la línea.', combinaCon:['bordo-clasico','bordo-opulence'], fotos:['assets/02-platos/bordo-postre-03/bordo-postre-03-1.jpg'] },
  { id:'bordo-postre-04', nombre:'Postre Bordó 04', coleccion:'platos', icon:'bowl', material:'Mix & match · bordó', destacado:false, piezas:[{t:'Postre',s:15}], tags:['bordó','vintage','mix & match','postre'], descripcion:'Plato de postre mix & match Bordó. Combinable con cualquier playo de la línea.', combinaCon:['bordo-clasico','bordo-opulence'], fotos:['assets/02-platos/bordo-postre-04/bordo-postre-04-1.jpg'] },

  /* ---------- Cubertería (por línea; muestra las piezas) ---------- */
  { nombre: 'Cubertería NY',             coleccion: 'cubiertos', icon: 'cubierto', material: 'Acero inoxidable',     destacado: false, piezas: [{ t:'Tenedor', s:178 }, { t:'Cuchillo', s:170 }, { t:'Cuchara postre', s:148 }], fotos: ['assets/04-cuberteria/ny/cubiertos-dorados-new-york-2.jpg'] },
  { nombre: 'Cubertería Oro Premium',    coleccion: 'cubiertos', icon: 'cubierto', material: 'Acero dorado',         destacado: true,  piezas: [{ t:'Tenedor', s:450 }, { t:'Cuchillo', s:440 }, { t:'Cuchara', s:190 }], fotos: ['assets/04-cuberteria/oro-premium/file-00000000f0806230add065812b3b2cb2.png'] },
  { nombre: 'Cubertería Black & Gold',   coleccion: 'cubiertos', icon: 'cubierto', material: 'Acero negro y dorado', destacado: false, piezas: [{ t:'Tenedor', s:80 }, { t:'Cuchillo', s:80 }, { t:'Cuchara', s:80 }], fotos: ['assets/04-cuberteria/black-and-gold/img-20190815-010752-089.jpg'] },
  { nombre: 'Cubertería Antique Premium',coleccion: 'cubiertos', icon: 'cubierto', material: 'Plata antigua · mix & match', destacado: false, piezas: [{ t:'Set para 6', s:6 }], fotos: ['assets/04-cuberteria/antique-premium/img-20170925-021125-989.jpg'] },

  /* ---------- Cristalería ---------- */
  { nombre: 'Copas Spirit',    coleccion: 'cristaleria', icon: 'copa', material: 'Cristal · línea Spirit', destacado: true,  piezas: [{ t:'Agua', s:380 }, { t:'Vino', s:380 }, { t:'Champagne', s:350 }], fotos: ['assets/03-cristaleria/copas-spirit/spirit-retocada-1_orig.jpg','assets/03-cristaleria/copas-spirit/barone-agua-y-vino_orig.jpg'] },
  { nombre: 'Copas Adagio',    coleccion: 'cristaleria', icon: 'copa', material: 'Cristal · línea Adagio', destacado: false, piezas: [{ t:'Agua', s:190 }, { t:'Vino', s:170 }, { t:'Champagne', s:230 }], fotos: ['assets/03-cristaleria/copas-adagio/1541563539334-5.jpg'] },
  { nombre: 'Copas Borde oro', coleccion: 'cristaleria', icon: 'copa', material: 'Cristal · borde oro',   destacado: false, piezas: [{ t:'Agua', s:18 }, { t:'Vino', s:43 }, { t:'Champagne', s:30 }], fotos: ['assets/03-cristaleria/copas-borde-oro/img-6038.jpg'] },
  { nombre: 'Copas de color',  coleccion: 'cristaleria', icon: 'copa', material: 'Cristal de color · mix & match', destacado: false, piezas: [{ t:'Cristal grande', s:50 }, { t:'Cristal mediana', s:80 }, { t:'Rosa', s:70 }, { t:'Verde', s:100 }, { t:'Azul', s:60 }, { t:'Fumé', s:40 }], fotos: ['assets/03-cristaleria/copas-de-color/dsc06409.jpg','assets/03-cristaleria/copas-de-color/753b5ba0-fe36-47f8-8a0c-6308becf3641.jpg','assets/03-cristaleria/copas-de-color/original-a56181f3-6e0c-4929-9081-089c591fe708-screenshot-20220410-120152.jpg','assets/03-cristaleria/copas-de-color/p1065.png'] },
  { nombre: 'Vaso trago largo LAV 17',           coleccion: 'cristaleria', icon: 'copa', material: 'Vidrio', destacado: false, piezas: [{ s:120 }], fotos: ['assets/03-cristaleria/vaso-lav-17/vaso-t-l-lav-17.jpg'] },
  { nombre: 'Vaso trago largo tallado cristal',  coleccion: 'cristaleria', icon: 'copa', material: 'Cristal tallado · mix & match', destacado: false, piezas: [{ t:'Modelo A', s:40 }, { t:'Modelo B', s:30 }], fotos: ['assets/03-cristaleria/vaso-trago-tallado-cristal/vaso-trago-tallado-cristal-1.png'] },
  { nombre: 'Vaso trago largo vidrio',           coleccion: 'cristaleria', icon: 'copa', material: 'Vidrio', destacado: false, piezas: [{ s:34 }], fotos: ['assets/03-cristaleria/vaso-trago-vidrio/p1030.png','assets/03-cristaleria/vaso-trago-vidrio/p1032.png'] },
  { nombre: 'Vaso whiskey tallado cristal',      coleccion: 'cristaleria', icon: 'copa', material: 'Cristal tallado · mix & match', destacado: false, piezas: [{ s:60 }], fotos: ['assets/03-cristaleria/vaso-whiskey-tallado/p1021.png'] },
  { nombre: 'Vaso whiskey facetado',             coleccion: 'cristaleria', icon: 'copa', material: 'Vidrio', destacado: false, piezas: [{ s:20 }], fotos: ['assets/03-cristaleria/vaso-whiskey-facetado/p1019.png'] },
  { nombre: 'Vaso Bombe LAV 15',                 coleccion: 'cristaleria', icon: 'copa', material: 'Vidrio · 510 cc', destacado: false, piezas: [{ s:35 }], fotos: ['assets/03-cristaleria/vaso-bombe-lav-15/vaso-bombe-lav-color.jpg'] },
  { nombre: 'Vaso Bombe común (liso)',           coleccion: 'cristaleria', icon: 'copa', material: 'Vidrio · 460 ml', destacado: false, piezas: [{ s:65 }], fotos: ['assets/03-cristaleria/vaso-bombe-comun/vaso-bombe.jpg'] },
  { nombre: 'Copa vidrio labrada vintage',       coleccion: 'cristaleria', icon: 'copa', material: 'Vidrio labrado · mix & match', destacado: false, piezas: [{ s:40 }], fotos: ['assets/03-cristaleria/copa-labrada-vintage/copa-labrada-vintage-1.png'] }
];

/* ---------- MODALIDAD B · Mesas curadas ----------
   Combinaciones armadas, photo-first. `desc` y `tipo` son editoriales
   (ajustables). Cuando se definan las piezas se puede sumar capacidad. */
var MESAS = [
  { id:'romantic',   nombre:'Mesa Romantic',      tipo:'Romántica · jardín',   capacidad:20,  desc:'Flores en tonos rosados, cristal de color y dorados cálidos.',         fotos:['assets/05-mesas-montadas/romantic/romantic-1.jpeg','assets/05-mesas-montadas/romantic/romantic-2.jpg','assets/05-mesas-montadas/romantic/romantic-3.jpg','assets/05-mesas-montadas/romantic/romantic-4.jpg','assets/05-mesas-montadas/romantic/romantic-5.jpg'] },
  { id:'premium',    nombre:'Mesa Premium',       tipo:'Clásica · elegante',   capacidad:200, desc:'Vajilla de línea premium, dorados y blanco impecable.',                fotos:['assets/05-mesas-montadas/premium/premium-1.jpg','assets/05-mesas-montadas/premium/premium-2.jpg'] },
  { id:'blue-white', nombre:'Mesa Blue & White',  tipo:'Fresca · atemporal',   capacidad:80,  desc:'Azul y blanco, un clásico que siempre funciona.',                      fotos:['assets/05-mesas-montadas/blue-white/blue-white-1.jpg','assets/05-mesas-montadas/blue-white/blue-white-2.jpg'] },
  { id:'country',    nombre:'Mesa Country',       tipo:'Campestre · natural',  capacidad:80,  desc:'Fibras naturales, verdes y texturas para un evento al aire libre.',    fotos:['assets/05-mesas-montadas/country/country-1.jpg','assets/05-mesas-montadas/country/country-2.jpg','assets/05-mesas-montadas/country/country-3.jpg'] },
  { id:'luxury',     nombre:'Mesa Luxury',        tipo:'Lujo · statement',     capacidad:24,  desc:'Dorados, cristal y detalles de alto impacto.',                         fotos:['assets/05-mesas-montadas/luxury/luxury-1.jpg','assets/05-mesas-montadas/luxury/luxury-2.jpg','assets/05-mesas-montadas/luxury/luxury-3.jpg'] }
];

/* ---------- MODALIDAD C · Constructor "Armá tu mesa" ----------
   Cada capa con sus opciones. `color`/`rim` son provisorios
   hasta tener las fotos cenitales recortadas (campo `foto`). */
/* PRUEBA: campo `foto` con PNG reales recortados (assets/Platos centiales/pngs).
   Los nombres/stock son todavía provisorios — esto es solo para ver el armador con fotos. */
var PNG = 'assets/Platos%20centiales/pngs/';
var LAYERS = [
 { key:'bajo', el:'cBajo', label:'Bajoplato', hint:'la base del lugar', size:260, opts:[
   {id:'oro',name:'Borde oro',color:'#EFE7D4',rim:'#C9A24B',stock:300,mix:false,foto:PNG+'DSC04811.png'},
   {id:'yute',name:'Relieve blanco',color:'#CDBB98',rim:'#AE9B74',stock:360,mix:false,foto:PNG+'DSC04819.png'},
   {id:'ambar',name:'Chevron negro',color:'#D89B4E',rim:'#B0762C',stock:240,mix:false,foto:PNG+'DSC04863.png'},
   {id:'palma',name:'Bordó y oro',color:'#8C9A75',rim:'#6E7C58',stock:200,mix:false,foto:PNG+'DSC04928.png'}
 ]},
 { key:'playo', el:'cPlayo', label:'Plato de sitio', hint:'el plato playo, al centro', size:180, opts:[
   {id:'relieve',name:'Flores azul',color:'#F4F1EA',rim:'#D6CDBB',stock:300,mix:false,foto:PNG+'DSC04848.png'},
   {id:'perlarosa',name:'Perla rosa',color:'#EAD0CB',rim:'#CFA9A2',stock:120,mix:false,foto:PNG+'DSC04800.png'},
   {id:'flordeliz',name:'Willow azul',color:'#BBD1D2',rim:'#8FB0B1',stock:60,mix:true,foto:PNG+'DSC04892.png'},
   {id:'minerva',name:'Azul y oro',color:'#3E5C8A',rim:'#2C3E50',stock:18,mix:true,foto:PNG+'DSC04899.png'},
   {id:'vogt',name:'Rosas',color:'#E9E2D6',rim:'#C6BCA5',stock:24,mix:true,foto:PNG+'DSC04921.png'}
 ]},
 { key:'postre', el:'cPostre', label:'Plato de postre', hint:'arriba de todo', size:108, opts:[
   {id:'rosacmyk',name:'Flores chico',color:'#E8B7AE',rim:'#CD968C',stock:200,mix:false,foto:PNG+'DSC04906.png'},
   {id:'blanca',name:'Blanco',color:'#F2EEE6',rim:'#DBD3C4',stock:260,mix:false,foto:PNG+'DSC04826.png'},
   {id:'celeste',name:'Cebolla azul',color:'#C0D3D4',rim:'#94B1B2',stock:60,mix:true,foto:PNG+'DSC04877.png'},
   {id:'flores',name:'Rosa floral',color:'#CF9B96',rim:'#A86E68',stock:16,mix:true,foto:PNG+'DSC04855.png'}
 ]}
];

var WSP = '5491167199527';

/* ---------- Helpers de producto (id por slug + búsqueda) ----------
   Cada producto se identifica por `id` (si lo tiene) o por el slug de su nombre.
   Así la página producto.html?id=perla-rosa encuentra el producto, y `combinaCon`
   referencia a otros por ese mismo id. */
function slugify(s){
  return (s || '').toString().toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}
function productoId(p){ return p && (p.id || slugify(p.nombre)); }
function buscarProducto(id){
  for (var i = 0; i < PRODUCTOS.length; i++){ if (productoId(PRODUCTOS[i]) === id) return PRODUCTOS[i]; }
  return null;
}

/* ---------- TAGS · taxonomía controlada (búsqueda inteligente) ----------
   Vocabulario fijo por faceta. Usá SOLO estos tags en los productos para que
   la búsqueda no se fragmente. Agregá tags nuevos acá cuando haga falta. */
var TAGS = {
  color:    ['rosa','blanco','azul','verde','dorado','ámbar','bordó','negro','transparente','multicolor'],
  estilo:   ['romántico','clásico','vintage','moderno','campestre','boho'],
  material: ['cerámica','porcelana','cristal','vidrio','vidrio de color','plata','fibra natural'],
  uso:      ['playo','postre','bajoplato','mix & match','copa de agua','copa de vino','trago']
};
var TAGS_LABEL = { color:'Color', estilo:'Estilo', material:'Material', uso:'Tipo' };
function facetDeTag(t){ for (var k in TAGS){ if (TAGS[k].indexOf(t) >= 0) return k; } return 'otros'; }
