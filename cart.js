/* ============================================================
   Carrito de "Solicitud de presupuesto" — La Melange
   Sin backend: guarda la selección en localStorage del navegador.
   Cada item guarda cantidades POR PIEZA (ej: Playo x30, Postre x20).
   Item = { id, lineas: [ {t, qty}, ... ] }
   ============================================================ */
(function () {
  var KEY = 'lm_solicitud';

  /* Normaliza items viejos { id, qty } -> { id, lineas:[{t:'Unidad', qty}] } */
  function normalize(arr) {
    return (arr || []).map(function (x) {
      if (x && x.lineas) return x;
      if (x && typeof x.qty !== 'undefined') return { id: x.id, lineas: [{ t: 'Unidad', qty: x.qty }] };
      return { id: x && x.id, lineas: [] };
    }).filter(function (x) { return x.lineas.length; });
  }
  function read() {
    try { return normalize(JSON.parse(localStorage.getItem(KEY)) || []); }
    catch (e) { return []; }
  }
  function write(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
    updateBadges();
  }

  var Cart = {
    items: read,
    distinct: function () { return read().length; },
    count: function () {
      return read().reduce(function (n, it) {
        return n + (it.lineas || []).reduce(function (m, l) { return m + (l.qty || 0); }, 0);
      }, 0);
    },
    /* lineas: array de {t, qty}. Suma a lo existente. Devuelve true si agregó algo. */
    add: function (id, lineas) {
      lineas = (lineas || []).filter(function (l) { return l.qty > 0; });
      if (!lineas.length) return false;
      var it = read(), found = null;
      for (var i = 0; i < it.length; i++) if (it[i].id === id) found = it[i];
      if (!found) { found = { id: id, lineas: [] }; it.push(found); }
      lineas.forEach(function (l) {
        var ex = null;
        for (var j = 0; j < found.lineas.length; j++) if (found.lineas[j].t === l.t) ex = found.lineas[j];
        if (ex) ex.qty += l.qty; else found.lineas.push({ t: l.t, qty: l.qty });
      });
      write(it);
      return true;
    },
    setLinea: function (id, t, qty) {
      qty = parseInt(qty, 10) || 0;
      var it = read();
      for (var i = 0; i < it.length; i++) if (it[i].id === id) {
        it[i].lineas = it[i].lineas.map(function (l) { return l.t === t ? { t: t, qty: qty } : l; })
                                   .filter(function (l) { return l.qty > 0; });
      }
      write(it.filter(function (x) { return x.lineas.length; }));
    },
    remove: function (id) { write(read().filter(function (x) { return x.id !== id; })); },
    clear: function () { write([]); }
  };
  window.Cart = Cart;

  function updateBadges() {
    var n = Cart.distinct();
    var els = document.querySelectorAll('[data-cart-count]');
    for (var i = 0; i < els.length; i++) {
      els[i].textContent = n;
      els[i].style.display = n ? '' : 'none';
    }
  }

  function injectNavLink() {
    // El carrito va en la barra superior (no dentro del menú), para que en
    // mobile quede SIEMPRE visible aunque el menú hamburguesa esté cerrado.
    var bar = document.querySelector('.nav__inner');
    if (!bar || document.getElementById('navCart')) return;
    var a = document.createElement('a');
    a.href = 'solicitud.html';
    a.id = 'navCart';
    a.className = 'nav__cart';
    a.setAttribute('aria-label', 'Mi solicitud');
    a.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg><span class="nav__cart-badge" data-cart-count></span>';
    var toggle = bar.querySelector('.nav__toggle');
    if (toggle) bar.insertBefore(a, toggle); else bar.appendChild(a);
  }

  /* Compartir: en mobile abre el menú nativo (WhatsApp, etc.); en desktop
     copia el link al portapapeles. Devuelve promesa con 'shared' | 'copied'. */
  window.lmShare = function (url, title) {
    url = url || location.href;
    if (navigator.share) {
      return navigator.share({ title: title || document.title, url: url })
        .then(function () { return 'shared'; })
        .catch(function () { return 'cancel'; });
    }
    var copy;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      copy = navigator.clipboard.writeText(url);
    } else {
      copy = new Promise(function (res) {
        var ta = document.createElement('textarea');
        ta.value = url; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(ta); res();
      });
    }
    return copy.then(function () { return 'copied'; }).catch(function () { return 'error'; });
  };

  window.cartFeedback = function (btn, txt) {
    if (!btn) return;
    var old = btn.getAttribute('data-label') || btn.textContent;
    btn.setAttribute('data-label', old);
    btn.textContent = txt || '✓ Agregado';
    btn.classList.add('is-added');
    setTimeout(function () { btn.textContent = old; btn.classList.remove('is-added'); }, 1500);
  };

  document.addEventListener('DOMContentLoaded', function () {
    injectNavLink();   // crear el ícono + badge PRIMERO
    write(read());     // migra el formato viejo y recién ahí actualiza el contador
  });
})();
