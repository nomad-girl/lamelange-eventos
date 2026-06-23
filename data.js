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
  { id: 'platos',     nombre: 'Platos',           icon: 'bowl',    modelos: 12, portada: 'assets/06-hero-portada/categorias/cat-platos.jpg' },
  { id: 'cristaleria',nombre: 'Cristalería',      icon: 'copa',    modelos: 12, portada: 'assets/06-hero-portada/categorias/cat-cristaleria.jpg' },
  { id: 'cubiertos',  nombre: 'Cubertería',       icon: 'cubierto',modelos: 4,  portada: 'assets/06-hero-portada/categorias/cat-cuberteria.png' },
  { id: 'plateria',   nombre: 'Platería',         icon: 'centro',  modelos: 0,  portada: 'assets/06-hero-portada/categorias/cat-plateria.jpg' }
];

var PRODUCTOS = [
  /* ---------- Platos de sitio (cargadores) ---------- */
  { nombre: 'Plato de sitio Perla oro', coleccion: 'cargadores', icon: 'plato', material: 'Borde perlado dorado', destacado: true,  piezas: [{ s: 300 }], fotos: ['assets/01-platos-de-sitio/perla-oro/perla-oro-1.jpg','assets/01-platos-de-sitio/perla-oro/perla-oro-2.jpg','assets/01-platos-de-sitio/perla-oro/perla-oro-3.jpg'] },
  { nombre: 'Plato de sitio Satín oro', coleccion: 'cargadores', icon: 'plato', material: 'Dorado satinado',     destacado: false, piezas: [{ s: 180 }], fotos: ['assets/01-platos-de-sitio/satin-oro/satin-oro-1.jpg','assets/01-platos-de-sitio/satin-oro/satin-oro-2.jpg'] },
  { nombre: 'Plato de sitio Yute',      coleccion: 'cargadores', icon: 'plato', material: 'Fibra de yute',       destacado: false, piezas: [{ s: 340 }], fotos: ['assets/01-platos-de-sitio/yute/yute-1.jpg','assets/01-platos-de-sitio/yute/yute-2.jpg'] },
  { nombre: 'Plato de sitio Palma',     coleccion: 'cargadores', icon: 'plato', material: 'Fibra de palma',      destacado: false, piezas: [{ s: 200 }], fotos: ['assets/01-platos-de-sitio/palma/palma-1.jpg','assets/01-platos-de-sitio/palma/palma-2.jpg'] },

  /* ---------- Platos ---------- */
  { nombre: 'Mishka',      coleccion: 'platos', icon: 'bowl', material: 'Porcelana · línea Premium', destacado: true,  piezas: [{ t:'Playo', s:245 }, { t:'Entrada', s:215 }], fotos: ['assets/02-platos/mishka/mishka-1.jpg','assets/02-platos/mishka/mishka-2.jpg','assets/02-platos/mishka/mishka-3.png'] },
  { nombre: 'Luxury Gold Modelo 1', coleccion: 'platos', icon: 'bowl', material: 'Línea Luxury Gold · dorado', destacado: false, piezas: [{ t:'Playo', s:12 }, { t:'Postre', s:12 }], fotos: ['assets/02-platos/luxury-gold-modelo-1/luxury-gold-modelo-1-1.jpg'] },
  { nombre: 'Luxury Gold Modelo 2', coleccion: 'platos', icon: 'bowl', material: 'Línea Luxury Gold · dorado', destacado: false, piezas: [{ t:'Playo', s:12 }, { t:'Postre', s:12 }], fotos: ['assets/02-platos/luxury-gold-modelo-2/luxury-gold-modelo-2-1.jpg'] },
  { nombre: 'Plato Black', coleccion: 'platos', icon: 'bowl', material: 'Línea B&N · negro', destacado: false, piezas: [{ t:'Principal', s:70 }], fotos: ['assets/02-platos/black/black-2.jpg','assets/02-platos/black/black-1.webp'] },
  { nombre: 'Plato NET',   coleccion: 'platos', icon: 'bowl', material: 'Línea B&N',         destacado: false, piezas: [{ t:'Entrada', s:50 }], fotos: ['assets/02-platos/net/net-1.jpg','assets/02-platos/net/net-2.jpg'] },
  { nombre: 'Plato JOY',   coleccion: 'platos', icon: 'bowl', material: 'Línea B&N',         destacado: false, piezas: [{ t:'Entrada / pan', s:50 }], fotos: ['assets/02-platos/joy/joy-1.jpg','assets/02-platos/joy/joy-2.jpg','assets/02-platos/joy/joy-3.jpg'] },
  { nombre: 'Relieve',     coleccion: 'platos', icon: 'bowl', material: 'Cerámica blanca',   destacado: false, piezas: [{ t:'Principal', s:100 }, { t:'Postre / entrada', s:80 }], fotos: ['assets/02-platos/relieve/relieve-1.jpg','assets/02-platos/relieve/relieve-2.jpg','assets/02-platos/relieve/relieve-3.jpg'] },
  { nombre: 'Perla rosa',  coleccion: 'platos', icon: 'bowl', material: 'Cerámica · rosa',   destacado: false, piezas: [{ t:'Principal', s:60 }, { t:'Entrada', s:20 }], fotos: ['assets/02-platos/perla-rosa/perla-rosa-1.jpg','assets/02-platos/perla-rosa/perla-rosa-2.jpg'] },
  { nombre: 'Flor de liz', coleccion: 'platos', icon: 'bowl', material: 'Mix & match · antiguo', destacado: false, piezas: [{ t:'Principal', s:20 }, { t:'Postre', s:20 }], fotos: ['assets/02-platos/flor-de-liz/flor-de-liz-1.jpg','assets/02-platos/flor-de-liz/flor-de-liz-2.jpg'] },
  { nombre: 'Rosa CMYk',   coleccion: 'platos', icon: 'bowl', material: 'Cerámica · rosa',   destacado: false, piezas: [{ t:'Principal', s:20 }, { t:'Postre', s:20 }], fotos: [] },
  { nombre: 'Minerva',     coleccion: 'platos', icon: 'bowl', material: 'Mix & match · antiguo', destacado: false, piezas: [{ t:'Principal 23 cm', s:17 }, { t:'Entrada 20 cm', s:11 }], fotos: ['assets/02-platos/minerva/minerva-1.jpeg'] },
  { nombre: 'Vogt',        coleccion: 'platos', icon: 'bowl', material: 'Mix & match · antiguo', destacado: false, piezas: [{ t:'Playo', s:35 }, { t:'Entrada', s:18 }], fotos: ['assets/02-platos/vogt/vogt-1.jpg','assets/02-platos/vogt/vogt-2.jpg'] },

  /* ---------- Cristalería ---------- */
  { nombre: 'Copas Spirit',    coleccion: 'cristaleria', icon: 'copa', material: 'Cristal · línea Spirit', destacado: true,  piezas: [{ t:'Agua', s:380 }, { t:'Vino', s:380 }, { t:'Champagne', s:350 }], fotos: ['assets/03-cristaleria/copas-spirit/spirit-retocada-1_orig.jpg','assets/03-cristaleria/copas-spirit/barone-agua-y-vino_orig.jpg'] },
  { nombre: 'Copas Adagio',    coleccion: 'cristaleria', icon: 'copa', material: 'Cristal · línea Adagio', destacado: false, piezas: [{ t:'Agua', s:190 }, { t:'Vino', s:170 }, { t:'Champagne', s:230 }], fotos: ['assets/03-cristaleria/copas-adagio/1541563539334-5.jpg'] },
  { nombre: 'Copas Borde oro', coleccion: 'cristaleria', icon: 'copa', material: 'Cristal · borde oro',   destacado: false, piezas: [{ t:'Agua', s:18 }, { t:'Vino', s:43 }, { t:'Champagne', s:30 }], fotos: ['assets/03-cristaleria/copas-borde-oro/img-6038.jpg'] },
  { nombre: 'Copas de color',  coleccion: 'cristaleria', icon: 'copa', material: 'Cristal de color · mix & match', destacado: false, piezas: [{ t:'Cristal grande', s:50 }, { t:'Cristal mediana', s:80 }, { t:'Rosa', s:70 }, { t:'Verde', s:100 }, { t:'Azul', s:60 }, { t:'Fumé', s:40 }], fotos: ['assets/03-cristaleria/copas-de-color/dsc06409.jpg','assets/03-cristaleria/copas-de-color/753b5ba0-fe36-47f8-8a0c-6308becf3641.jpg','assets/03-cristaleria/copas-de-color/original-a56181f3-6e0c-4929-9081-089c591fe708-screenshot-20220410-120152.jpg','assets/03-cristaleria/copas-de-color/p1065.png'] },
  { nombre: 'Vaso trago largo LAV 17',           coleccion: 'cristaleria', icon: 'copa', material: 'Vidrio', destacado: false, piezas: [{ s:120 }], fotos: ['assets/03-cristaleria/vaso-lav-17/vaso-t-l-lav-17.jpg'] },
  { nombre: 'Vaso trago largo tallado cristal',  coleccion: 'cristaleria', icon: 'copa', material: 'Cristal tallado · mix & match', destacado: false, piezas: [{ t:'Modelo A', s:40 }, { t:'Modelo B', s:30 }], fotos: [] },
  { nombre: 'Vaso trago largo vidrio',           coleccion: 'cristaleria', icon: 'copa', material: 'Vidrio', destacado: false, piezas: [{ s:34 }], fotos: ['assets/03-cristaleria/vaso-trago-vidrio/p1030.png','assets/03-cristaleria/vaso-trago-vidrio/p1032.png'] },
  { nombre: 'Vaso whiskey tallado cristal',      coleccion: 'cristaleria', icon: 'copa', material: 'Cristal tallado · mix & match', destacado: false, piezas: [{ s:60 }], fotos: ['assets/03-cristaleria/vaso-whiskey-tallado/p1021.png'] },
  { nombre: 'Vaso whiskey facetado',             coleccion: 'cristaleria', icon: 'copa', material: 'Vidrio', destacado: false, piezas: [{ s:20 }], fotos: ['assets/03-cristaleria/vaso-whiskey-facetado/p1019.png'] },
  { nombre: 'Vaso Bombe LAV 15',                 coleccion: 'cristaleria', icon: 'copa', material: 'Vidrio · 510 cc', destacado: false, piezas: [{ s:35 }], fotos: ['assets/03-cristaleria/vaso-bombe-lav-15/vaso-bombe-lav-color.jpg'] },
  { nombre: 'Vaso Bombe común (liso)',           coleccion: 'cristaleria', icon: 'copa', material: 'Vidrio · 460 ml', destacado: false, piezas: [{ s:65 }], fotos: ['assets/03-cristaleria/vaso-bombe-comun/vaso-bombe.jpg'] },
  { nombre: 'Copa vidrio labrada vintage',       coleccion: 'cristaleria', icon: 'copa', material: 'Vidrio labrado · mix & match', destacado: false, piezas: [{ s:40 }], fotos: [] },

  /* ---------- Cubertería (por línea; muestra las piezas) ---------- */
  { nombre: 'Cubertería NY',             coleccion: 'cubiertos', icon: 'cubierto', material: 'Acero inoxidable',     destacado: false, piezas: [{ t:'Tenedor', s:178 }, { t:'Cuchillo', s:170 }, { t:'Cuchara postre', s:148 }], fotos: ['assets/04-cuberteria/ny/cubiertos-dorados-new-york-2.jpg'] },
  { nombre: 'Cubertería Oro Premium',    coleccion: 'cubiertos', icon: 'cubierto', material: 'Acero dorado',         destacado: true,  piezas: [{ t:'Tenedor', s:450 }, { t:'Cuchillo', s:440 }, { t:'Cuchara', s:190 }], fotos: ['assets/04-cuberteria/oro-premium/file-00000000f0806230add065812b3b2cb2.png'] },
  { nombre: 'Cubertería Black & Gold',   coleccion: 'cubiertos', icon: 'cubierto', material: 'Acero negro y dorado', destacado: false, piezas: [{ t:'Tenedor', s:80 }, { t:'Cuchillo', s:80 }, { t:'Cuchara', s:80 }], fotos: ['assets/04-cuberteria/black-and-gold/img-20190815-010752-089.jpg'] },
  { nombre: 'Cubertería Antique Premium',coleccion: 'cubiertos', icon: 'cubierto', material: 'Plata antigua · mix & match', destacado: false, piezas: [{ t:'Set para 6', s:6 }], fotos: ['assets/04-cuberteria/antique-premium/img-20170925-021125-989.jpg'] }
];

/* ---------- MODALIDAD B · Mesas curadas ----------
   Combinaciones armadas, photo-first. `desc` y `tipo` son editoriales
   (ajustables). Cuando se definan las piezas se puede sumar capacidad. */
var MESAS = [
  { id:'romantic',   nombre:'Mesa Romantic',      tipo:'Romántica · jardín',   capacidad:20,  desc:'Flores en tonos rosados, cristal de color y dorados cálidos.',         fotos:['assets/05-mesas-montadas/romantic/romantic-1.jpeg','assets/05-mesas-montadas/romantic/romantic-2.jpg','assets/05-mesas-montadas/romantic/romantic-3.jpg','assets/05-mesas-montadas/romantic/romantic-4.jpg','assets/05-mesas-montadas/romantic/romantic-5.jpg'] },
  { id:'premium',    nombre:'Mesa Premium',       tipo:'Clásica · elegante',   capacidad:200, desc:'Vajilla de línea premium, dorados y blanco impecable.',                fotos:['assets/05-mesas-montadas/premium/premium-1.jpg','assets/05-mesas-montadas/premium/premium-2.jpg'] },
  { id:'blue-white', nombre:'Mesa Blue & White',  tipo:'Fresca · atemporal',   capacidad:20,  desc:'Azul y blanco, un clásico que siempre funciona.',                      fotos:['assets/05-mesas-montadas/blue-white/blue-white-1.jpg','assets/05-mesas-montadas/blue-white/blue-white-2.jpg'] },
  { id:'country',    nombre:'Mesa Country',       tipo:'Campestre · natural',  capacidad:80,  desc:'Fibras naturales, verdes y texturas para un evento al aire libre.',    fotos:['assets/05-mesas-montadas/country/country-1.jpg','assets/05-mesas-montadas/country/country-2.jpg','assets/05-mesas-montadas/country/country-3.jpg'] },
  { id:'luxury',     nombre:'Mesa Luxury',        tipo:'Lujo · statement',     capacidad:40,  desc:'Dorados, cristal y detalles de alto impacto.',                         fotos:['assets/05-mesas-montadas/luxury/luxury-1.jpg','assets/05-mesas-montadas/luxury/luxury-2.jpg','assets/05-mesas-montadas/luxury/luxury-3.jpg'] }
];

/* ---------- MODALIDAD C · Constructor "Armá tu mesa" ----------
   Cada capa con sus opciones. `color`/`rim` son provisorios
   hasta tener las fotos cenitales recortadas (campo `foto`). */
var LAYERS = [
 { key:'bajo', el:'cBajo', label:'Bajoplato', hint:'la base del lugar', size:230, opts:[
   {id:'oro',name:'Perla oro',color:'#EFE7D4',rim:'#C9A24B',stock:300,mix:false},
   {id:'yute',name:'Yute natural',color:'#CDBB98',rim:'#AE9B74',stock:360,mix:false},
   {id:'ambar',name:'Vidrio ámbar',color:'#D89B4E',rim:'#B0762C',stock:240,mix:false},
   {id:'palma',name:'Palma verde',color:'#8C9A75',rim:'#6E7C58',stock:200,mix:false}
 ]},
 { key:'playo', el:'cPlayo', label:'Plato de sitio', hint:'el plato playo, al centro', size:165, opts:[
   {id:'relieve',name:'Relieve',color:'#F4F1EA',rim:'#D6CDBB',stock:300,mix:false},
   {id:'perlarosa',name:'Perla rosa',color:'#EAD0CB',rim:'#CFA9A2',stock:120,mix:false},
   {id:'flordeliz',name:'Flor de liz',color:'#BBD1D2',rim:'#8FB0B1',stock:60,mix:true},
   {id:'minerva',name:'Minerva',color:'#3E5C8A',rim:'#2C3E50',stock:18,mix:true},
   {id:'vogt',name:'Vogt',color:'#E9E2D6',rim:'#C6BCA5',stock:24,mix:true}
 ]},
 { key:'postre', el:'cPostre', label:'Plato de postre', hint:'arriba de todo', size:100, opts:[
   {id:'rosacmyk',name:'Rosa CMYk',color:'#E8B7AE',rim:'#CD968C',stock:200,mix:false},
   {id:'blanca',name:'Blanca',color:'#F2EEE6',rim:'#DBD3C4',stock:260,mix:false},
   {id:'celeste',name:'Celeste',color:'#C0D3D4',rim:'#94B1B2',stock:60,mix:true},
   {id:'flores',name:'Antiguo flores',color:'#CF9B96',rim:'#A86E68',stock:16,mix:true}
 ]}
];

var WSP = '5491167199527';
