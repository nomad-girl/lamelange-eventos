/* ============================================================
   Medición — La Melange · Vajilla para eventos
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

  /* ---------- Fuente del lead (de dónde vino): Google / Meta / orgánico ----------
     Se captura apenas entra alguien y se recuerda toda la sesión (aunque navegue
     entre páginas). Así cada consulta de WhatsApp llega diciendo su origen. */
  function lmComputeRef() {
    try {
      var q = new URLSearchParams(location.search);
      var c = (q.get('c') || '').toLowerCase();
      var utm = (q.get('utm_source') || '').toLowerCase();
      if (c) return c;                     // Meta: p1/p3/teaparty… o código propio
      if (utm) return utm;                 // utm_source=google, etc.
      if (q.get('gclid')) return 'google'; // clic de Google Ads
      if (q.get('fbclid')) return 'meta';  // clic de Meta
    } catch (e) {}
    return '';
  }
  window.lmRef = function () {
    try {
      var fresh = lmComputeRef();
      if (fresh) sessionStorage.setItem('lm_ref', fresh);
      return sessionStorage.getItem('lm_ref') || 'organico';
    } catch (e) { return lmComputeRef() || 'organico'; }
  };
  window.lmRef(); // capturar la fuente al cargar la página

  /* ---------- Etiqueta de Google (GA4 + Google Ads) ---------- */
  if (cfg.ga4 || cfg.ads) {
    var tagId = cfg.ga4 || cfg.ads;
    var g = document.createElement('script');
    g.async = true;
    g.src = 'https://www.googletagmanager.com/gtag/js?id=' + tagId;
    document.head.appendChild(g);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    if (cfg.ga4) gtag('config', cfg.ga4);   // Google Analytics 4
    if (cfg.ads) gtag('config', cfg.ads);   // Google Ads
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
    if (window.gtag && cfg.adsLabel) gtag('event', 'conversion', { send_to: cfg.adsLabel }); // Google Ads: WhatsApp = Cotización
    if (window.fbq)  fbq('track', 'Contact', { content_name: label });
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href*="wa.me"]');
    if (!a) return;
    var ref = window.lmRef();
    /* Pega la fuente al final del mensaje de WhatsApp (una sola vez) */
    try {
      var u = new URL(a.href);
      var t = u.searchParams.get('text') || '';
      if (ref && t.indexOf('· ref:') === -1) {
        u.searchParams.set('text', t + ' · ref: ' + ref);
        a.href = u.toString();
      }
    } catch (e2) {}
    trackLead(((a.textContent || 'whatsapp').trim().slice(0, 40)) + ' | ' + ref);
  });

  /* ---------- Lead fuerte: envío de solicitud (se llama desde solicitud.html) ----------
     Es el lead más valioso: la persona armó su pedido completo. */
  window.lmLead = function (label, params) {
    params = params || {}; params.source = label || 'solicitud';
    params.ref = window.lmRef();
    if (window.gtag) gtag('event', 'generate_lead', params);
    if (window.gtag && cfg.adsLabel) gtag('event', 'conversion', { send_to: cfg.adsLabel }); // Google Ads: solicitud enviada = Cotización
    if (window.fbq)  fbq('track', 'Lead', params);
  };
  /* Evento genérico reutilizable (ej: agregar a la solicitud). */
  window.lmTrack = function (name, params) {
    if (window.gtag) gtag('event', name, params || {});
    if (window.fbq)  fbq('trackCustom', name, params || {});
  };
})();
