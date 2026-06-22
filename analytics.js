/* ============================================================
   Medición — La Mélange · Vajilla para eventos
   ------------------------------------------------------------
   Se activa SOLO si cargaste los IDs en data.js (variable ANALYTICS).
   Si están vacíos, este archivo no hace nada y el sitio anda igual.

   Qué mide:
   - Google Analytics 4 → visitas, secciones, de dónde viene la gente.
   - Meta Pixel → para que tus anuncios de Instagram midan y optimicen.
   - Clic en cualquier botón de WhatsApp → se registra como LEAD
     (evento "generate_lead" en GA4 y "Contact" en Meta).
   ============================================================ */
(function () {
  var cfg = (typeof ANALYTICS !== 'undefined') ? ANALYTICS : {};

  /* ---------- Google Analytics 4 ---------- */
  if (cfg.ga4) {
    var g = document.createElement('script');
    g.async = true;
    g.src = 'https://www.googletagmanager.com/gtag/js?id=' + cfg.ga4;
    document.head.appendChild(g);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', cfg.ga4);
  }

  /* ---------- Meta Pixel ---------- */
  if (cfg.pixel) {
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
      n.queue = []; t = b.createElement(e); t.async = !0;
      t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', cfg.pixel);
    fbq('track', 'PageView');
  }

  /* ---------- Lead: clic en WhatsApp ---------- */
  function trackLead(label) {
    if (window.gtag) gtag('event', 'generate_lead', { method: 'whatsapp', source: label });
    if (window.fbq)  fbq('track', 'Contact', { content_name: label });
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href*="wa.me"]');
    if (a) trackLead((a.textContent || 'whatsapp').trim().slice(0, 60));
  });
})();
