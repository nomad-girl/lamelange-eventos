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
  { id: 'platos',     nombre: 'Platos',           icon: 'bowl',    modelos: 17 },
  { id: 'cristaleria',nombre: 'Cristalería',      icon: 'copa',    modelos: 24 },
  { id: 'cubiertos',  nombre: 'Cubertería',       icon: 'cubierto',modelos: 4  }
];

var PRODUCTOS = [
  /* ---------- Platos de sitio (cargadores) ---------- */
  { nombre: 'Plato de sitio Perla oro', coleccion: 'cargadores', icon: 'plato', material: 'Borde perlado dorado', stock: 300, destacado: true,  fotos: [] },
  { nombre: 'Plato de sitio Satín oro', coleccion: 'cargadores', icon: 'plato', material: 'Dorado satinado',     stock: 180, destacado: false, fotos: [] },
  { nombre: 'Plato de sitio Yute',      coleccion: 'cargadores', icon: 'plato', material: 'Fibra de yute',       stock: 340, destacado: false, fotos: [] },
  { nombre: 'Plato de sitio Palma',     coleccion: 'cargadores', icon: 'plato', material: 'Fibra de palma',      stock: 200, destacado: false, fotos: [] },

  /* ---------- Platos ---------- */
  { nombre: 'Plato Mishka playo',         coleccion: 'platos', icon: 'bowl', material: 'Porcelana · línea Premium', stock: 245, destacado: true,  fotos: [] },
  { nombre: 'Plato Mishka entrada',       coleccion: 'platos', icon: 'bowl', material: 'Porcelana · línea Premium', stock: 215, destacado: false, fotos: [] },
  { nombre: 'Plato Black principal',      coleccion: 'platos', icon: 'bowl', material: 'Línea B&N · negro',         stock: 70,  destacado: false, fotos: [] },
  { nombre: 'Plato NET entrada',          coleccion: 'platos', icon: 'bowl', material: 'Línea B&N',                 stock: 50,  destacado: false, fotos: [] },
  { nombre: 'Plato JOY entrada / pan',    coleccion: 'platos', icon: 'bowl', material: 'Línea B&N',                 stock: 50,  destacado: false, fotos: [] },
  { nombre: 'Plato Relieve principal',    coleccion: 'platos', icon: 'bowl', material: 'Cerámica blanca',           stock: 100, destacado: false, fotos: [] },
  { nombre: 'Plato Relieve postre / entrada', coleccion: 'platos', icon: 'bowl', material: 'Cerámica blanca',       stock: 80,  destacado: false, fotos: [] },
  { nombre: 'Plato Perla rosa principal', coleccion: 'platos', icon: 'bowl', material: 'Cerámica · rosa',           stock: 60,  destacado: false, fotos: [] },
  { nombre: 'Plato Perla rosa entrada',   coleccion: 'platos', icon: 'bowl', material: 'Cerámica · rosa',           stock: 20,  destacado: false, fotos: [] },
  { nombre: 'Plato Flor de liz principal',coleccion: 'platos', icon: 'bowl', material: 'Mix & match · antiguo',     stock: 20,  destacado: false, fotos: [] },
  { nombre: 'Plato Flor de liz postre',   coleccion: 'platos', icon: 'bowl', material: 'Mix & match · antiguo',     stock: 20,  destacado: false, fotos: [] },
  { nombre: 'Plato Rosa CMYk principal',  coleccion: 'platos', icon: 'bowl', material: 'Cerámica · rosa',           stock: 20,  destacado: false, fotos: [] },
  { nombre: 'Plato Rosa CMYk postre',     coleccion: 'platos', icon: 'bowl', material: 'Cerámica · rosa',           stock: 20,  destacado: false, fotos: [] },
  { nombre: 'Plato Minerva principal 23 cm', coleccion: 'platos', icon: 'bowl', material: 'Mix & match · antiguo',  stock: 17,  destacado: false, fotos: [] },
  { nombre: 'Plato Minerva entrada 20 cm',   coleccion: 'platos', icon: 'bowl', material: 'Mix & match · antiguo',  stock: 11,  destacado: false, fotos: [] },
  { nombre: 'Plato Vogt playo',           coleccion: 'platos', icon: 'bowl', material: 'Mix & match · antiguo',     stock: 35,  destacado: false, fotos: [] },
  { nombre: 'Plato Vogt entrada',         coleccion: 'platos', icon: 'bowl', material: 'Mix & match · antiguo',     stock: 18,  destacado: false, fotos: [] },

  /* ---------- Cristalería ---------- */
  { nombre: 'Copa Spirit agua',      coleccion: 'cristaleria', icon: 'copa', material: 'Cristal · línea Spirit', stock: 380, destacado: true,  fotos: [] },
  { nombre: 'Copa Spirit vino',      coleccion: 'cristaleria', icon: 'copa', material: 'Cristal · línea Spirit', stock: 380, destacado: false, fotos: [] },
  { nombre: 'Copa Spirit champagne', coleccion: 'cristaleria', icon: 'copa', material: 'Cristal · línea Spirit', stock: 350, destacado: false, fotos: [] },
  { nombre: 'Copa Adagio agua',      coleccion: 'cristaleria', icon: 'copa', material: 'Cristal · línea Adagio', stock: 190, destacado: false, fotos: [] },
  { nombre: 'Copa Adagio vino',      coleccion: 'cristaleria', icon: 'copa', material: 'Cristal · línea Adagio', stock: 170, destacado: false, fotos: [] },
  { nombre: 'Copa Adagio champagne', coleccion: 'cristaleria', icon: 'copa', material: 'Cristal · línea Adagio', stock: 230, destacado: false, fotos: [] },
  { nombre: 'Copa Borde oro agua',      coleccion: 'cristaleria', icon: 'copa', material: 'Cristal · borde oro', stock: 18, destacado: false, fotos: [] },
  { nombre: 'Copa Borde oro vino',      coleccion: 'cristaleria', icon: 'copa', material: 'Cristal · borde oro', stock: 43, destacado: false, fotos: [] },
  { nombre: 'Copa Borde oro champagne', coleccion: 'cristaleria', icon: 'copa', material: 'Cristal · borde oro', stock: 30, destacado: false, fotos: [] },
  { nombre: 'Copa color cristal grande',  coleccion: 'cristaleria', icon: 'copa', material: 'Cristal',          stock: 50,  destacado: false, fotos: [] },
  { nombre: 'Copa color cristal mediana', coleccion: 'cristaleria', icon: 'copa', material: 'Cristal',          stock: 80,  destacado: false, fotos: [] },
  { nombre: 'Copa color rosa',  coleccion: 'cristaleria', icon: 'copa', material: 'Cristal de color · rosa',    stock: 70,  destacado: false, fotos: [] },
  { nombre: 'Copa color verde', coleccion: 'cristaleria', icon: 'copa', material: 'Cristal de color · verde',   stock: 100, destacado: false, fotos: [] },
  { nombre: 'Copa color azul',  coleccion: 'cristaleria', icon: 'copa', material: 'Cristal de color · azul',    stock: 60,  destacado: false, fotos: [] },
  { nombre: 'Copa color fumé',  coleccion: 'cristaleria', icon: 'copa', material: 'Cristal de color · fumé',    stock: 40,  destacado: false, fotos: [] },
  { nombre: 'Vaso trago largo LAV 17',         coleccion: 'cristaleria', icon: 'copa', material: 'Vidrio',         stock: 120, destacado: false, fotos: [] },
  { nombre: 'Vaso trago largo tallado cristal (A)', coleccion: 'cristaleria', icon: 'copa', material: 'Cristal tallado', stock: 40, destacado: false, fotos: [] },
  { nombre: 'Vaso trago largo tallado cristal (B)', coleccion: 'cristaleria', icon: 'copa', material: 'Cristal tallado', stock: 30, destacado: false, fotos: [] },
  { nombre: 'Vaso trago largo vidrio',         coleccion: 'cristaleria', icon: 'copa', material: 'Vidrio',         stock: 34,  destacado: false, fotos: [] },
  { nombre: 'Vaso whiskey tallado cristal',    coleccion: 'cristaleria', icon: 'copa', material: 'Cristal tallado', stock: 60, destacado: false, fotos: [] },
  { nombre: 'Vaso whiskey facetado',           coleccion: 'cristaleria', icon: 'copa', material: 'Vidrio',         stock: 20,  destacado: false, fotos: [] },
  { nombre: 'Vaso Bombe LAV 15',               coleccion: 'cristaleria', icon: 'copa', material: 'Vidrio · 510 cc', stock: 35, destacado: false, fotos: [] },
  { nombre: 'Vaso Bombe común (liso)',         coleccion: 'cristaleria', icon: 'copa', material: 'Vidrio · 460 ml', stock: 65, destacado: false, fotos: [] },
  { nombre: 'Copa vidrio labrada vintage',     coleccion: 'cristaleria', icon: 'copa', material: 'Vidrio labrado',  stock: 40, destacado: false, fotos: [] },

  /* ---------- Cubertería (agrupada por línea; stock = nº de tenedores) ---------- */
  { nombre: 'Cubertería NY',             coleccion: 'cubiertos', icon: 'cubierto', material: 'Acero inoxidable',      stock: 178, destacado: false, fotos: [] },
  { nombre: 'Cubertería Oro Premium',    coleccion: 'cubiertos', icon: 'cubierto', material: 'Acero dorado',          stock: 450, destacado: true,  fotos: [] },
  { nombre: 'Cubertería Black & Gold',   coleccion: 'cubiertos', icon: 'cubierto', material: 'Acero negro y dorado',  stock: 80,  destacado: false, fotos: [] },
  { nombre: 'Cubertería Antique Premium',coleccion: 'cubiertos', icon: 'cubierto', material: 'Plata antigua · mix & match', stock: 6, destacado: false, fotos: [] }
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
