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
  { id: 'cargadores', nombre: 'Platos de sitio',  icon: 'plato',   modelos: 4  },
  { id: 'platos',     nombre: 'Platos',           icon: 'bowl',    modelos: 12 },
  { id: 'cristaleria',nombre: 'Cristalería',      icon: 'copa',    modelos: 12 },
  { id: 'cubiertos',  nombre: 'Cubertería',       icon: 'cubierto',modelos: 4  }
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
  { nombre: 'Plato Black', coleccion: 'platos', icon: 'bowl', material: 'Línea B&N · negro', destacado: false, piezas: [{ t:'Principal', s:70 }], fotos: ['assets/02-platos/black/black-1.webp','assets/02-platos/black/black-2.jpg'] },
  { nombre: 'Plato NET',   coleccion: 'platos', icon: 'bowl', material: 'Línea B&N',         destacado: false, piezas: [{ t:'Entrada', s:50 }], fotos: ['assets/02-platos/net/net-1.jpg','assets/02-platos/net/net-2.jpg'] },
  { nombre: 'Plato JOY',   coleccion: 'platos', icon: 'bowl', material: 'Línea B&N',         destacado: false, piezas: [{ t:'Entrada / pan', s:50 }], fotos: ['assets/02-platos/joy/joy-1.jpg','assets/02-platos/joy/joy-2.jpg','assets/02-platos/joy/joy-3.jpg'] },
  { nombre: 'Relieve',     coleccion: 'platos', icon: 'bowl', material: 'Cerámica blanca',   destacado: false, piezas: [{ t:'Principal', s:100 }, { t:'Postre / entrada', s:80 }], fotos: ['assets/02-platos/relieve/relieve-1.jpg','assets/02-platos/relieve/relieve-2.jpg','assets/02-platos/relieve/relieve-3.jpg'] },
  { nombre: 'Perla rosa',  coleccion: 'platos', icon: 'bowl', material: 'Cerámica · rosa',   destacado: false, piezas: [{ t:'Principal', s:60 }, { t:'Entrada', s:20 }], fotos: ['assets/02-platos/perla-rosa/perla-rosa-1.jpg','assets/02-platos/perla-rosa/perla-rosa-2.jpg'] },
  { nombre: 'Flor de liz', coleccion: 'platos', icon: 'bowl', material: 'Mix & match · antiguo', destacado: false, piezas: [{ t:'Principal', s:20 }, { t:'Postre', s:20 }], fotos: ['assets/02-platos/flor-de-liz/flor-de-liz-1.jpg','assets/02-platos/flor-de-liz/flor-de-liz-2.jpg'] },
  { nombre: 'Rosa CMYk',   coleccion: 'platos', icon: 'bowl', material: 'Cerámica · rosa',   destacado: false, piezas: [{ t:'Principal', s:20 }, { t:'Postre', s:20 }], fotos: [] },
  { nombre: 'Minerva',     coleccion: 'platos', icon: 'bowl', material: 'Mix & match · antiguo', destacado: false, piezas: [{ t:'Principal 23 cm', s:17 }, { t:'Entrada 20 cm', s:11 }], fotos: ['assets/02-platos/minerva/minerva-1.jpeg'] },
  { nombre: 'Vogt',        coleccion: 'platos', icon: 'bowl', material: 'Mix & match · antiguo', destacado: false, piezas: [{ t:'Playo', s:35 }, { t:'Entrada', s:18 }], fotos: ['assets/02-platos/vogt/vogt-1.jpg','assets/02-platos/vogt/vogt-2.jpg'] },

  /* ---------- Cristalería ---------- */
  { nombre: 'Copas Spirit',    coleccion: 'cristaleria', icon: 'copa', material: 'Cristal · línea Spirit', destacado: true,  piezas: [{ t:'Agua', s:380 }, { t:'Vino', s:380 }, { t:'Champagne', s:350 }], fotos: [] },
  { nombre: 'Copas Adagio',    coleccion: 'cristaleria', icon: 'copa', material: 'Cristal · línea Adagio', destacado: false, piezas: [{ t:'Agua', s:190 }, { t:'Vino', s:170 }, { t:'Champagne', s:230 }], fotos: [] },
  { nombre: 'Copas Borde oro', coleccion: 'cristaleria', icon: 'copa', material: 'Cristal · borde oro',   destacado: false, piezas: [{ t:'Agua', s:18 }, { t:'Vino', s:43 }, { t:'Champagne', s:30 }], fotos: [] },
  { nombre: 'Copas de color',  coleccion: 'cristaleria', icon: 'copa', material: 'Cristal de color · mix & match', destacado: false, piezas: [{ t:'Cristal grande', s:50 }, { t:'Cristal mediana', s:80 }, { t:'Rosa', s:70 }, { t:'Verde', s:100 }, { t:'Azul', s:60 }, { t:'Fumé', s:40 }], fotos: [] },
  { nombre: 'Vaso trago largo LAV 17',           coleccion: 'cristaleria', icon: 'copa', material: 'Vidrio', destacado: false, piezas: [{ s:120 }], fotos: [] },
  { nombre: 'Vaso trago largo tallado cristal',  coleccion: 'cristaleria', icon: 'copa', material: 'Cristal tallado · mix & match', destacado: false, piezas: [{ t:'Modelo A', s:40 }, { t:'Modelo B', s:30 }], fotos: [] },
  { nombre: 'Vaso trago largo vidrio',           coleccion: 'cristaleria', icon: 'copa', material: 'Vidrio', destacado: false, piezas: [{ s:34 }], fotos: [] },
  { nombre: 'Vaso whiskey tallado cristal',      coleccion: 'cristaleria', icon: 'copa', material: 'Cristal tallado · mix & match', destacado: false, piezas: [{ s:60 }], fotos: [] },
  { nombre: 'Vaso whiskey facetado',             coleccion: 'cristaleria', icon: 'copa', material: 'Vidrio', destacado: false, piezas: [{ s:20 }], fotos: [] },
  { nombre: 'Vaso Bombe LAV 15',                 coleccion: 'cristaleria', icon: 'copa', material: 'Vidrio · 510 cc', destacado: false, piezas: [{ s:35 }], fotos: [] },
  { nombre: 'Vaso Bombe común (liso)',           coleccion: 'cristaleria', icon: 'copa', material: 'Vidrio · 460 ml', destacado: false, piezas: [{ s:65 }], fotos: [] },
  { nombre: 'Copa vidrio labrada vintage',       coleccion: 'cristaleria', icon: 'copa', material: 'Vidrio labrado', destacado: false, piezas: [{ s:40 }], fotos: [] },

  /* ---------- Cubertería (por línea; muestra las piezas) ---------- */
  { nombre: 'Cubertería NY',             coleccion: 'cubiertos', icon: 'cubierto', material: 'Acero inoxidable',     destacado: false, piezas: [{ t:'Tenedor', s:178 }, { t:'Cuchillo', s:170 }, { t:'Cuchara postre', s:148 }], fotos: [] },
  { nombre: 'Cubertería Oro Premium',    coleccion: 'cubiertos', icon: 'cubierto', material: 'Acero dorado',         destacado: true,  piezas: [{ t:'Tenedor', s:450 }, { t:'Cuchillo', s:440 }, { t:'Cuchara', s:190 }], fotos: [] },
  { nombre: 'Cubertería Black & Gold',   coleccion: 'cubiertos', icon: 'cubierto', material: 'Acero negro y dorado', destacado: false, piezas: [{ t:'Tenedor', s:80 }, { t:'Cuchillo', s:80 }, { t:'Cuchara', s:80 }], fotos: [] },
  { nombre: 'Cubertería Antique Premium',coleccion: 'cubiertos', icon: 'cubierto', material: 'Plata antigua · mix & match', destacado: false, piezas: [{ t:'Set para 6', s:6 }], fotos: [] }
];

/* ---------- MODALIDAD B · Mesas curadas ----------
   La capacidad (comensales) = el menor stock de las piezas.
   El sitio lo calcula solo. Etiqueta `tipo` es editorial. */
var MESAS = [
  { id:'otono-vintage', nombre:'Mesa Otoño Vintage', tipo:'Mesa principal · íntima', foto:null,
    piezas:[ {n:'Bajoplato vidrio ámbar', s:240}, {n:'Plato de sitio Minerva', s:18}, {n:'Plato postre antiguo flores', s:16} ] },
  { id:'perla-oro', nombre:'Mesa Perla Oro', tipo:'Para todo el salón', foto:null,
    piezas:[ {n:'Bajoplato Perla oro', s:300}, {n:'Plato de sitio Relieve', s:300}, {n:'Plato postre Rosa CMYk', s:200} ] },
  { id:'campestre', nombre:'Mesa Campestre', tipo:'Para todo el salón', foto:null,
    piezas:[ {n:'Bajoplato Yute natural', s:360}, {n:'Plato de sitio Perla rosa', s:120}, {n:'Postre cerámica blanca', s:260} ] },
  { id:'cristal-antiguo', nombre:'Mesa Cristal Antiguo', tipo:'Cabecera · íntima', foto:null,
    piezas:[ {n:'Bajoplato dorado cincelado', s:160}, {n:'Plato de sitio Vogt', s:24}, {n:'Copa cristal tallado mix&match', s:40} ] }
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
