/* ============================================================
   Carrito de "Solicitud de presupuesto" — La Mélange
   Sin backend: guarda la selección en localStorage del navegador.
   Expone window.Cart y mantiene el contador del nav actualizado.
   Cargar en todas las páginas (después de data.js).
   ============================================================ */
(function () {
  var KEY = 'lm_solicitud';

  function read() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch (e) { return []; }
  }
  function write(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
    updateBadges();
  }

  var Cart = {
    items: read,
    distinct: function () { return read().length; },
    count: function () { return read().reduce(function (n, i) { return n + (i.qty || 1); }, 0); },
    add: function (id, qty) {
      qty = parseInt(qty, 10) || 1;
      var it = read(), found = null;
      for (var i = 0; i < it.length; i++) if (it[i].id === id) found = it[i];
      if (found) found.qty += qty; else it.push({ id: id, qty: qty });
      write(it);
    },
    setQty: function (id, qty) {
      qty = parseInt(qty, 10) || 0;
      var it = read().map(function (x) { return x.id === id ? { id: id, qty: qty } : x; })
                     .filter(function (x) { return x.qty > 0; });
      write(it);
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

  /* Inyecta el enlace "Mi solicitud (N)" en el nav de cualquier página */
  function injectNavLink() {
    var nav = document.getElementById('navLinks');
    if (!nav || document.getElementById('navCart')) return;
    var a = document.createElement('a');
    a.href = 'solicitud.html';
    a.id = 'navCart';
    a.className = 'nav__cart';
    a.innerHTML = 'Mi solicitud <span class="nav__cart-badge" data-cart-count></span>';
    var cta = nav.querySelector('.nav__cta');
    if (cta) nav.insertBefore(a, cta); else nav.appendChild(a);
  }

  /* Feedback breve al agregar */
  window.cartFeedback = function (btn, txt) {
    if (!btn) return;
    var old = btn.textContent;
    btn.textContent = txt || '✓ Agregado';
    btn.classList.add('is-added');
    setTimeout(function () { btn.textContent = old; btn.classList.remove('is-added'); }, 1400);
  };

  document.addEventListener('DOMContentLoaded', function () {
    injectNavLink();
    updateBadges();
  });
})();
