/* ============================================================
   pdpView — render compartido del detalle de producto.
   Lo usan: el modal "vista rápida" (catalog.js) y producto.html.
   Requiere data.js (PRODUCTOS, COLECCIONES, ICONS, buscarProducto,
   productoId, WSP) y cart.js (Cart, cartFeedback).

   window.renderPDP(p, mountEl, { onNavigate })
     - onNavigate(id): si se pasa, los "combiná con" llaman a esto
       (modal) en vez de navegar de página.
   ============================================================ */
(function () {
  function waLink(txt) {
    var num = (typeof WSP !== 'undefined') ? WSP : '5491167199527';
    return 'https://wa.me/' + num + '?text=' + encodeURIComponent(txt);
  }
  function esc(s) { return String(s).replace(/"/g, '&quot;'); }

  function piezasAddUI(p) {
    var pz = p.piezas || [], rows;
    function mx(s){ return (typeof s === 'number') ? (' max="' + s + '" data-max="' + s + '"') : ''; }
    if (pz.length === 1 && !pz[0].t) {
      rows = '<div class="qadd-row"><span class="qadd-lbl">Cantidad <small>stock ' + pz[0].s + '</small></span>'
           + '<input class="qadd-qty" type="number" min="0" value="0" data-t="Unidad"' + mx(pz[0].s) + '></div>';
    } else {
      rows = pz.map(function (q) {
        return '<div class="qadd-row"><span class="qadd-lbl">' + q.t + ' <small>stock ' + q.s + '</small></span>'
             + '<input class="qadd-qty" type="number" min="0" value="0" data-t="' + esc(q.t) + '"' + mx(q.s) + '></div>';
      }).join('');
    }
    return '<div class="qadd"><div class="qadd-title">Agregar a mi solicitud</div>' + rows
         + '<button class="btn btn--solid qadd-btn" type="button">Agregar a mi solicitud</button></div>';
  }

  /* Visor (lightbox) para la galería de Inspiración: navegable con ‹ › y teclado. */
  var lbEl, lbImg, lbFotos = [], lbIdx = 0;
  function lbShow() {
    if (!lbImg) return;
    lbImg.src = lbFotos[lbIdx] || '';
    var c = lbEl.querySelector('.pdplb__count');
    if (c) c.textContent = (lbIdx + 1) + ' / ' + lbFotos.length;
  }
  function lbStep(d) { lbIdx = (lbIdx + d + lbFotos.length) % lbFotos.length; lbShow(); }
  function lbClose() { if (lbEl) { lbEl.hidden = true; lbImg.src = ''; document.body.style.overflow = ''; } }
  function lbOpen(fotos, i) {
    if (!lbEl) {
      lbEl = document.createElement('div');
      lbEl.className = 'pdplb'; lbEl.hidden = true;
      lbEl.innerHTML = '<button class="pdplb__close" type="button" aria-label="Cerrar">×</button>'
        + '<button class="pdplb__nav pdplb__prev" type="button" aria-label="Anterior">‹</button>'
        + '<img class="pdplb__img" alt="Foto ambientada">'
        + '<button class="pdplb__nav pdplb__next" type="button" aria-label="Siguiente">›</button>'
        + '<div class="pdplb__count"></div>';
      document.body.appendChild(lbEl);
      lbImg = lbEl.querySelector('.pdplb__img');
      lbEl.querySelector('.pdplb__close').addEventListener('click', lbClose);
      lbEl.querySelector('.pdplb__prev').addEventListener('click', function (e) { e.stopPropagation(); lbStep(-1); });
      lbEl.querySelector('.pdplb__next').addEventListener('click', function (e) { e.stopPropagation(); lbStep(1); });
      lbEl.addEventListener('click', function (e) { if (e.target === lbEl) lbClose(); });
      document.addEventListener('keydown', function (e) {
        if (lbEl.hidden) return;
        if (e.key === 'Escape') lbClose();
        else if (e.key === 'ArrowLeft') lbStep(-1);
        else if (e.key === 'ArrowRight') lbStep(1);
      });
    }
    lbFotos = fotos; lbIdx = i || 0;
    lbEl.querySelector('.pdplb__prev').style.display = fotos.length > 1 ? '' : 'none';
    lbEl.querySelector('.pdplb__next').style.display = fotos.length > 1 ? '' : 'none';
    lbShow(); lbEl.hidden = false; document.body.style.overflow = 'hidden';
  }

  window.renderPDP = function (p, mount, opts) {
    opts = opts || {};
    var col = (COLECCIONES.filter(function (c) { return c.id === p.coleccion; })[0] || {}).nombre || '';
    var fotos = p.fotos || [];
    var pid = p.id || productoId(p);

    var thumbs = fotos.map(function (f, i) {
      return '<button class="pdp-thumb' + (i === 0 ? ' on' : '') + '" data-i="' + i + '" style="background-image:url(' + f + ')"></button>';
    }).join('');
    var gallery = fotos.length
      ? '<div class="pdp-gallery"><div class="pdp-main" data-main style="background-image:url(' + fotos[0] + ')">'
        + (fotos.length > 1 ? '<button class="gnav gprev" data-prev>‹</button><button class="gnav gnext" data-next>›</button>' : '')
        + '<button class="pdp-share-img" type="button" data-share-img aria-label="Compartir esta foto" title="Compartir esta foto">↗</button>'
        + '</div>' + (fotos.length > 1 ? '<div class="pdp-thumbs">' + thumbs + '</div>' : '') + '</div>'
      : '<div class="pdp-gallery"><div class="pdp-main pdp-main--empty">' + (ICONS[p.icon] || '') + '</div></div>';

    var ficha = '<dl class="pdp-spec">'
      + (p.material ? '<div><dt>Material</dt><dd>' + p.material + '</dd></div>' : '')
      + (p.medidas ? '<div><dt>Medidas</dt><dd>' + p.medidas + '</dd></div>' : '')
      + (p.codigo ? '<div><dt>Código</dt><dd>' + p.codigo + '</dd></div>' : '')
      + '</dl>';
    var tags = (p.tags && p.tags.length)
      ? '<div class="pdp-tags">' + p.tags.map(function (t) {
          return '<a class="tag-chip" href="catalogo.html?tag=' + encodeURIComponent(t) + '">' + t + '</a>';
        }).join('') + '</div>' : '';

    var comboCards = (p.combinaCon || []).map(function (cid) {
      var c = buscarProducto(cid); if (!c) return '';
      var f = (c.fotos && c.fotos[0]) || '';
      return '<a class="combo-card" data-nav="' + productoId(c) + '" href="producto.html?id=' + productoId(c) + '">'
        + '<div class="combo-card__img" ' + (f ? 'style="background-image:url(' + f + ')"' : '') + '>' + (f ? '' : (ICONS[c.icon] || '')) + '</div>'
        + '<div class="combo-card__name">' + c.nombre + '</div></a>';
    }).join('');
    var combina = comboCards
      ? '<section class="pdp-combina"><h3 class="pdp-combina__title">✨ Combiná con</h3><div class="combo-row">' + comboCards + '</div></section>' : '';

    /* Segunda galería: fotos ambientadas ("en la mesa"). Se muestra solo si hay.
       Las toma de p.ambiente o del archivo ambiente.js (generado por carpetas). */
    var amb = p.ambiente || (typeof AMBIENTE !== 'undefined' && AMBIENTE[pid]) || [];
    var inspira = amb.length
      ? '<section class="pdp-insp"><h3 class="pdp-insp__title">✨ Inspiración · en la mesa</h3><div class="pdp-insp__grid">'
        + amb.map(function (f, i) { return '<button class="pdp-insp__item" type="button" data-amb-i="' + i + '" style="background-image:url(' + f + ')"></button>'; }).join('')
        + '</div></section>' : '';

    var wsp = 'Hola La Mélange! Me interesa el modelo "' + p.nombre + '"' + (p.codigo ? (' (' + p.codigo + ')') : '') + '. ¿Disponibilidad y precio?';

    mount.innerHTML =
      '<div class="pdp-top">' + gallery
        + '<div class="pdp-info">'
          + '<span class="eyebrow">' + col + '</span>'
          + '<h1 class="pdp-name">' + p.nombre + '</h1>'
          + tags + ficha
          + (p.descripcion ? '<p class="pdp-desc">' + p.descripcion + '</p>' : '')
          + piezasAddUI(p)
          + '<div class="pdp-actions">'
          + '<button class="pdp-share" type="button" data-share-prod>↗ Compartir este modelo</button>'
          + '<a class="pdp-wa" href="' + waLink(wsp) + '" target="_blank" rel="noopener">o consultá por WhatsApp →</a>'
          + '</div>'
        + '</div>'
      + '</div>' + inspira + combina;

    /* galería */
    var main = mount.querySelector('[data-main]');
    if (fotos.length > 1) {
      var idx = 0;
      var show = function (i) {
        idx = (i + fotos.length) % fotos.length;
        main.style.backgroundImage = 'url(' + fotos[idx] + ')';
        var ts = mount.querySelectorAll('.pdp-thumb');
        for (var k = 0; k < ts.length; k++) ts[k].classList.toggle('on', k === idx);
      };
      mount.querySelector('[data-prev]').addEventListener('click', function () { show(idx - 1); });
      mount.querySelector('[data-next]').addEventListener('click', function () { show(idx + 1); });
      mount.querySelectorAll('.pdp-thumb').forEach(function (b) {
        b.addEventListener('click', function () { show(+b.getAttribute('data-i')); });
      });
    }

    /* agregar a solicitud (por pieza) */
    var addBtn = mount.querySelector('.qadd-btn');
    addBtn.addEventListener('click', function () {
      var lineas = [].map.call(mount.querySelectorAll('.qadd-qty'), function (inp) {
        return { t: inp.getAttribute('data-t'), qty: parseInt(inp.value, 10) || 0 };
      }).filter(function (l) { return l.qty > 0; });
      if (!lineas.length) {
        var box = mount.querySelector('.qadd');
        if (box) { box.classList.add('qadd--error'); setTimeout(function () { box.classList.remove('qadd--error'); }, 1600); }
        var first = mount.querySelector('.qadd-qty'); if (first) first.focus();
        cartFeedback(addBtn, '↑ Elegí una cantidad');
        return;
      }
      Cart.add(pid, lineas);
      cartFeedback(addBtn, '✓ Agregado a tu solicitud');
      mount.querySelectorAll('.qadd-qty').forEach(function (i) { i.value = 0; });
    });

    /* tope de stock: no deja pedir más de lo disponible y avisa */
    mount.querySelectorAll('.qadd-qty').forEach(function (inp) {
      inp.addEventListener('input', function () {
        var mx = parseInt(inp.getAttribute('data-max'), 10);
        var v = parseInt(inp.value, 10) || 0;
        if (!isNaN(mx) && v > mx) {
          inp.value = mx;
          var row = inp.closest('.qadd-row'), small = row && row.querySelector('.qadd-lbl small');
          if (small) {
            small.textContent = 'máx ' + mx + ' disponibles';
            small.style.color = '#c0564d';
            clearTimeout(inp._stockT);
            inp._stockT = setTimeout(function () { small.textContent = 'stock ' + mx; small.style.color = ''; }, 2200);
          }
        }
      });
    });

    /* compartir el modelo (link a la ficha, que incluye fotos + datos) */
    var shareProd = mount.querySelector('[data-share-prod]');
    if (shareProd && window.lmShare) {
      shareProd.addEventListener('click', function () {
        var url = location.origin + '/producto.html?id=' + encodeURIComponent(pid);
        window.lmShare(url, p.nombre + ' · La Mélange').then(function (r) {
          if (r === 'copied') cartFeedback(shareProd, '✓ Link copiado');
        });
      });
    }
    /* compartir la foto que se está viendo (link directo a la imagen) */
    var shareImg = mount.querySelector('[data-share-img]');
    if (shareImg && window.lmShare && main) {
      shareImg.addEventListener('click', function (e) {
        e.stopPropagation();
        var m = (main.style.backgroundImage || '').match(/url\(["']?(.*?)["']?\)/);
        var rel = (m && m[1]) || fotos[0] || '';
        var url = /^https?:/.test(rel) ? rel : (location.origin + '/' + rel.replace(/^\//, ''));
        window.lmShare(url, p.nombre + ' · La Mélange').then(function (r) {
          if (r === 'copied') cartFeedback(shareImg, '✓');
        });
      });
    }

    /* Inspiración: abrir el visor navegable al hacer click en una foto */
    mount.querySelectorAll('[data-amb-i]').forEach(function (el) {
      el.addEventListener('click', function () { lbOpen(amb, +el.getAttribute('data-amb-i')); });
    });

    /* combiná con: en modal navega adentro; en página deja el <a> normal */
    if (opts.onNavigate) {
      mount.querySelectorAll('.combo-card').forEach(function (a) {
        a.addEventListener('click', function (e) { e.preventDefault(); opts.onNavigate(a.getAttribute('data-nav')); });
      });
    }
  };
})();
