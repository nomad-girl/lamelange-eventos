/* ============================================================
   Animaciones sutiles — La Melange
   - Scroll reveal (fade-up al entrar en viewport, escalonado)
   - Sombra del nav al scrollear
   Respeta prefers-reduced-motion. Progressive enhancement:
   la clase .reveal la agrega este JS, así sin JS todo se ve igual.
   ============================================================ */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Scroll reveal ---------- */
  if (!reduce && 'IntersectionObserver' in window) {
    var sel = '.section__head, .col-card, .mesa-band, .value, .pro__grid > div, .builder';
    var els = [].slice.call(document.querySelectorAll(sel));
    els.forEach(function (el) { el.classList.add('reveal'); });

    // Escalonado entre hermanos que también revelan (cards, valores, etc.)
    els.forEach(function (el) {
      var sibs = [].slice.call(el.parentNode.children).filter(function (c) { return c.classList && c.classList.contains('reveal'); });
      var i = sibs.indexOf(el);
      if (i > 0) el.style.transitionDelay = (Math.min(i, 5) * 0.08) + 's';
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });

    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Sombra del nav al scrollear ---------- */
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
})();
