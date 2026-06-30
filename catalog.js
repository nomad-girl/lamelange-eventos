/* ============================================================
   Catálogo compartido — La Mélange (vajilla para eventos)
   ------------------------------------------------------------
   Renderiza filtros (categoría + tipo) + grilla + visor (lightbox)
   en cualquier página. Lo usan index.html y catalogo.html.
   Requiere PRODUCTOS, COLECCIONES, ICONS (de data.js).

   Uso:
     initCatalogo({ filtros:'idA', filtrosTipo:'idB', grid:'idC', startCat:'platos' })
   ============================================================ */
(function () {
  var current = 'todas', tipo = 'todos', activeTags = [];
  var els = {};
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function isMix(p){ return /mix & match/i.test(p.material); }
  function hasTipo(p){
    if (tipo === 'todos')  return true;
    if (tipo === 'mix')    return isMix(p);
    if (tipo === 'playo')  return p.piezas.some(function(q){ return /playo|principal/i.test(q.t || ''); });
    if (tipo === 'postre') return p.piezas.some(function(q){ return /postre|entrada/i.test(q.t || ''); });
    return true;
  }

  function renderFiltros(){
    var f = els.filtros; if (!f) return;
    var btns = ['<button class="filter is-active" data-id="todas">Todas</button>'];
    btns = btns.concat(COLECCIONES.map(function(c){ return '<button class="filter" data-id="'+c.id+'">'+c.nombre+'</button>'; }));
    f.innerHTML = btns.join('');
    f.querySelectorAll('.filter').forEach(function(b){
      b.addEventListener('click', function(){
        current = b.getAttribute('data-id');
        f.querySelectorAll('.filter').forEach(function(x){ x.classList.remove('is-active'); });
        b.classList.add('is-active'); renderGrid();
      });
    });
    if (current !== 'todas'){
      f.querySelectorAll('.filter').forEach(function(b){ b.classList.toggle('is-active', b.getAttribute('data-id') === current); });
    }
  }

  function renderFiltrosTipo(){
    var f = els.filtrosTipo; if (!f) return;
    /* Chips rápidos (sin "Todos"): se togglean. Si ninguno está activo, muestra todo. */
    var opts = [['playo','Principales'], ['postre','Postre'], ['mix','Mix & match']];
    f.innerHTML = opts.map(function(o){ return '<button class="filter'+(tipo===o[0]?' is-active':'')+'" data-tipo="'+o[0]+'">'+o[1]+'</button>'; }).join('');
    f.querySelectorAll('.filter').forEach(function(b){
      b.addEventListener('click', function(){
        var v = b.getAttribute('data-tipo');
        tipo = (tipo === v) ? 'todos' : v;   // toggle on/off
        renderFiltrosTipo(); renderGrid();
      });
    });
  }

  /* ---- Filtros por TAG (facetas: color / estilo / material / uso) ----
     OR dentro de una faceta, AND entre facetas. Solo muestra tags que existen
     en algún producto. */
  function tagsPresentes(){
    var set = {};
    PRODUCTOS.forEach(function(p){ (p.tags || []).forEach(function(t){ set[t] = true; }); });
    return set;
  }
  function matchesTags(p){
    if (!activeTags.length) return true;
    var byFacet = {};
    activeTags.forEach(function(t){ var f = facetDeTag(t); (byFacet[f] = byFacet[f] || []).push(t); });
    var ptags = p.tags || [];
    for (var f in byFacet){
      var ok = byFacet[f].some(function(t){ return ptags.indexOf(t) >= 0; });
      if (!ok) return false;
    }
    return true;
  }
  function renderFiltrosTags(){
    var f = els.filtrosTags; if (!f) return;
    var present = tagsPresentes(), html = '';
    Object.keys(TAGS).forEach(function(facet){
      var tags = TAGS[facet].filter(function(t){ return present[t]; });
      if (!tags.length) return;
      html += '<div class="tagfacet"><span class="tagfacet__label">' + (TAGS_LABEL[facet] || facet) + '</span>'
        + tags.map(function(t){
            return '<button class="tagchip' + (activeTags.indexOf(t) >= 0 ? ' is-on' : '') + '" data-tag="' + t + '">' + t + '</button>';
          }).join('')
        + '</div>';
    });
    f.innerHTML = html;
    f.querySelectorAll('.tagchip').forEach(function(b){
      b.addEventListener('click', function(){
        var t = b.getAttribute('data-tag'), i = activeTags.indexOf(t);
        if (i >= 0) activeTags.splice(i, 1); else activeTags.push(t);
        renderFiltrosTags(); renderGrid();
      });
    });
    updateFilterCount();
  }
  function updateFilterCount(){
    if (!els.filtrosCount) return;
    if (activeTags.length){ els.filtrosCount.textContent = activeTags.length; els.filtrosCount.hidden = false; }
    else { els.filtrosCount.hidden = true; }
  }
  function setupDrawer(){
    if (!els.drawer || els.drawer._wired) return;
    els.drawer._wired = true;
    function open(){ els.drawer.hidden = false; requestAnimationFrame(function(){ els.drawer.classList.add('is-open'); }); document.body.style.overflow = 'hidden'; }
    function close(){ els.drawer.classList.remove('is-open'); document.body.style.overflow = ''; setTimeout(function(){ els.drawer.hidden = true; }, 280); }
    if (els.filtrosBtn) els.filtrosBtn.addEventListener('click', open);
    els.drawer.querySelectorAll('[data-close]').forEach(function(b){ b.addEventListener('click', close); });
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && !els.drawer.hidden) close(); });
    var limp = document.getElementById('catFiltrosLimpiar');
    if (limp) limp.addEventListener('click', function(){ activeTags = []; renderFiltrosTags(); renderGrid(); });
  }

  /* Refleja los filtros actuales en la URL, para poder compartir la vista. */
  function syncURL(){
    try {
      var params = new URLSearchParams();
      if (current && current !== 'todas') params.set('cat', current);
      if (tipo && tipo !== 'todos') params.set('tipo', tipo);
      activeTags.forEach(function(t){ params.append('tag', t); });
      var qs = params.toString();
      history.replaceState(null, '', qs ? ('?' + qs) : location.pathname);
    } catch(e) {}
  }

  function renderGrid(){
    var grid = els.grid; if (!grid) return;
    var list = PRODUCTOS.filter(function(p){
      return (current === 'todas' || p.coleccion === current) && hasTipo(p) && matchesTags(p);
    });
    grid.innerHTML = list.map(function(p){
      var fotos = p.fotos || [];
      var mixBadge = isMix(p) ? '<span class="mix-badge">Mix &amp; match</span>' : '';
      var media;
      if (fotos.length){
        var nav = fotos.length > 1
          ? '<button class="gnav gprev" aria-label="Anterior">‹</button><button class="gnav gnext" aria-label="Siguiente">›</button>'
            + '<div class="gdots">' + fotos.map(function(_, i){ return '<i class="'+(i===0?'on':'')+'"></i>'; }).join('') + '</div>'
          : '';
        media = '<div class="photo has-gal" data-pi="'+PRODUCTOS.indexOf(p)+'" data-idx="0" style="aspect-ratio:1/1; background-image:url('+fotos[0]+'); background-size:cover; background-position:center;">'+mixBadge+nav+'</div>';
      } else {
        media = '<div class="photo" data-label="'+p.nombre+'">'+mixBadge+ICONS[p.icon]+'</div>';
      }
      var piezasShow = p.piezas;
      if (tipo === 'playo')       piezasShow = p.piezas.filter(function(q){ return /playo|principal/i.test(q.t || ''); });
      else if (tipo === 'postre') piezasShow = p.piezas.filter(function(q){ return /postre|entrada/i.test(q.t || ''); });
      if (!piezasShow.length) piezasShow = p.piezas;
      var stk;
      if (piezasShow.length === 1 && !piezasShow[0].t) stk = '<span class="badge"><i></i>Disponibles: ' + piezasShow[0].s + '</span>';
      else stk = '<div class="piezas">' + piezasShow.map(function(q){ return '<span class="pieza"><b>' + q.s + '</b> ' + q.t + '</span>'; }).join('') + '</div>';
      return '<div class="product product--link" data-id="'+productoId(p)+'">' + media
        + '<div class="product__body"><div class="product__name">'+p.nombre+'</div>'
        + '<div class="product__meta">'+p.material+'</div>' + stk + '</div></div>';
    }).join('');
    setupHover();
    syncURL();
  }

  /* Galería que se reproduce sola al pasar el mouse (solo desktop) */
  function setupHover(){
    if (reduceMotion || !els.grid) return;
    els.grid.querySelectorAll('.photo.has-gal').forEach(function(ph){
      var pi = +ph.getAttribute('data-pi');
      var fotos = (PRODUCTOS[pi] && PRODUCTOS[pi].fotos) || [];
      if (fotos.length < 2) return;
      var timer = null, idx = 0, pre = false;
      function show(i){
        idx = (i + fotos.length) % fotos.length;
        ph.style.opacity = '0';
        setTimeout(function(){
          ph.style.backgroundImage = 'url(' + fotos[idx] + ')';
          ph.setAttribute('data-idx', idx);
          var dots = ph.querySelectorAll('.gdots i');
          for (var k = 0; k < dots.length; k++) dots[k].className = (k === idx ? 'on' : '');
          ph.style.opacity = '1';
        }, 110);
      }
      ph.addEventListener('mouseenter', function(){
        if (timer) return;
        if (!pre){ fotos.forEach(function(f){ var im = new Image(); im.src = f; }); pre = true; }
        timer = setInterval(function(){ show(idx + 1); }, 750);
      });
      ph.addEventListener('mouseleave', function(){
        clearInterval(timer); timer = null;
        if (idx !== 0) show(0);
        idx = 0;
      });
    });
  }

  /* ---------- Visor (lightbox) ---------- */
  var lb, lbImg, lbCap, galFotos = [], galIdx = 0, galName = '';
  function buildLightbox(){
    if (lb) return;
    lb = document.createElement('div'); lb.className = 'lb'; lb.hidden = true;
    lb.innerHTML = '<button class="lb__close" aria-label="Cerrar">×</button>'
      + '<button class="lb__nav lb__prev" aria-label="Anterior">‹</button>'
      + '<img class="lb__img" alt="" />'
      + '<button class="lb__nav lb__next" aria-label="Siguiente">›</button>'
      + '<div class="lb__cap"></div>';
    document.body.appendChild(lb);
    lbImg = lb.querySelector('.lb__img'); lbCap = lb.querySelector('.lb__cap');
    lb.querySelector('.lb__close').addEventListener('click', galClose);
    lb.querySelector('.lb__prev').addEventListener('click', function(){ galStep(-1); });
    lb.querySelector('.lb__next').addEventListener('click', function(){ galStep(1); });
    lb.addEventListener('click', function(e){ if (e.target === lb) galClose(); });
    document.addEventListener('keydown', function(e){
      if (lb.hidden) return;
      if (e.key === 'Escape') galClose();
      else if (e.key === 'ArrowLeft') galStep(-1);
      else if (e.key === 'ArrowRight') galStep(1);
    });
  }
  function galShow(){ lbImg.src = galFotos[galIdx]; lbCap.textContent = galName + '  ·  ' + (galIdx + 1) + ' / ' + galFotos.length; }
  function galOpen(pi, start){ var p = PRODUCTOS[pi]; if (!p || !p.fotos || !p.fotos.length) return; galFotos = p.fotos; galName = p.nombre; galIdx = start || 0; galShow(); lb.hidden = false; }
  function galClose(){ lb.hidden = true; lbImg.src = ''; }
  function galStep(d){ galIdx = (galIdx + d + galFotos.length) % galFotos.length; galShow(); }

  /* ---------- Vista rápida (modal) ---------- */
  var qv, qvBody;
  function buildQuickView(){
    if (qv) return;
    qv = document.createElement('div'); qv.className = 'qv'; qv.hidden = true;
    qv.innerHTML = '<div class="qv__backdrop" data-qv-close></div>'
      + '<div class="qv__panel">'
      + '<a class="qv__expand" data-qv-expand href="#" title="Ver la ficha completa">⤢ Ver completo</a>'
      + '<button class="qv__close" data-qv-close aria-label="Cerrar">×</button>'
      + '<div class="qv__body" id="qvBody"></div></div>';
    document.body.appendChild(qv);
    qvBody = qv.querySelector('#qvBody');
    qv.querySelectorAll('[data-qv-close]').forEach(function(b){ b.addEventListener('click', closeQuickView); });
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && !qv.hidden) closeQuickView(); });
  }
  function openQuickView(id){
    var p = buscarProducto(id);
    if (!p || typeof window.renderPDP !== 'function'){ window.location.href = 'producto.html?id=' + encodeURIComponent(id); return; }
    buildQuickView();
    var ex = qv.querySelector('[data-qv-expand]');
    if (ex) ex.href = 'producto.html?id=' + encodeURIComponent(id);
    renderPDP(p, qvBody, { onNavigate: openQuickView });
    qv.hidden = false; qvBody.scrollTop = 0;
    requestAnimationFrame(function(){ qv.classList.add('is-open'); });
    document.body.style.overflow = 'hidden';
  }
  function closeQuickView(){
    if (!qv) return;
    qv.classList.remove('is-open'); document.body.style.overflow = '';
    setTimeout(function(){ qv.hidden = true; qvBody.innerHTML = ''; }, 260);
  }

  function gridClick(e){
    var nav = e.target.closest ? e.target.closest('.gnav') : null;
    if (nav){
      e.stopPropagation();
      var ph = nav.parentNode, pi = +ph.getAttribute('data-pi');
      var fotos = (PRODUCTOS[pi] && PRODUCTOS[pi].fotos) || [];
      if (fotos.length < 2) return;
      var idx = (+ph.getAttribute('data-idx') || 0) + (nav.classList.contains('gnext') ? 1 : -1);
      idx = (idx + fotos.length) % fotos.length;
      ph.style.backgroundImage = 'url(' + fotos[idx] + ')'; ph.setAttribute('data-idx', idx);
      var dots = ph.querySelectorAll('.gdots i'); for (var k = 0; k < dots.length; k++) dots[k].className = (k === idx ? 'on' : '');
      return;
    }
    var prod = e.target.closest ? e.target.closest('.product--link') : null;
    if (prod){
      var pid = prod.getAttribute('data-id');
      if (pid) openQuickView(pid);
    }
  }

  window.initCatalogo = function(opts){
    opts = opts || {};
    els.filtros = document.getElementById(opts.filtros || 'catFilters');
    els.filtrosTipo = document.getElementById(opts.filtrosTipo || 'catFiltrosTipo');
    els.filtrosTags = document.getElementById(opts.filtrosTags || 'catFiltrosTags');
    els.filtrosBtn = document.getElementById(opts.filtrosBtn || 'catFiltrosBtn');
    els.drawer = document.getElementById(opts.drawer || 'catDrawer');
    els.filtrosCount = document.getElementById(opts.filtrosCount || 'catFiltrosCount');
    els.grid = document.getElementById(opts.grid || 'catGrid');
    if (!els.grid) return;
    current = opts.startCat || 'todas';
    try {
      var sp = new URLSearchParams(location.search);
      var c = sp.get('cat'); if (c) current = c;
      var tp = sp.get('tipo'); if (tp) tipo = tp;
      var tgs = sp.getAll('tag'); if (tgs.length) activeTags = tgs;
    } catch(e) {}
    buildLightbox();
    renderFiltros();
    renderFiltrosTipo();
    renderFiltrosTags();
    setupDrawer();
    setupShare();
    renderGrid();
    els.grid.addEventListener('click', gridClick);
  };

  /* Botón "Compartir búsqueda": copia/comparte la URL con los filtros puestos. */
  function setupShare(){
    if (!els.filtrosBtn || document.getElementById('catShare') || !window.lmShare) return;
    var sb = document.createElement('button');
    sb.id = 'catShare'; sb.type = 'button'; sb.className = 'filters-btn';
    sb.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg> Compartir';
    els.filtrosBtn.parentNode.insertBefore(sb, els.filtrosBtn.nextSibling);
    sb.addEventListener('click', function(){
      syncURL();
      window.lmShare(location.href, 'Selección · La Mélange').then(function(r){
        if (r === 'copied'){ var old = sb.innerHTML; sb.textContent = '✓ Link copiado'; setTimeout(function(){ sb.innerHTML = old; }, 1700); }
      });
    });
  }
})();
