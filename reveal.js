/* Shared site behaviours: mobile nav + scroll reveal.
   Loaded on every page. Safe to run alongside each page's inline nav-scroll/counter code. */
(function () {
  /* ---------- Mobile nav (hamburger) ---------- */
  (function buildMobileNav() {
    var wrap = document.querySelector('.nav-wrap');
    if (!wrap) return;
    var nav = wrap.querySelector('.nav');
    if (!nav || nav.querySelector('.nav-toggle')) return;
    var links = wrap.querySelector('.nav-links');
    var cta = wrap.querySelector('.nav-cta');

    var btn = document.createElement('button');
    btn.className = 'nav-toggle';
    btn.setAttribute('aria-label', 'Open menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<span></span><span></span><span></span>';
    nav.appendChild(btn);

    var menu = document.createElement('div');
    menu.className = 'mobile-menu';
    if (links) Array.prototype.forEach.call(links.querySelectorAll('a'), function (a) {
      var x = a.cloneNode(true); x.className = 'mm-link'; menu.appendChild(x);
    });
    if (cta) Array.prototype.forEach.call(cta.querySelectorAll('a'), function (a) {
      menu.appendChild(a.cloneNode(true));
    });
    wrap.appendChild(menu);

    function close() {
      menu.classList.remove('open'); btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
    btn.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      btn.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) close(); });
    window.addEventListener('resize', function () { if (window.innerWidth > 860) close(); });
  })();

  /* ---------- Scroll reveal ---------- */
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var sel = [
    '.section-head', '.final-cta-inner', '.cat-section', '.subcat', '.cat-details',
    '.stage', '.legend-card', '.bring-item', '.value-card', '.num-block',
    '.fac-spec', '.press-card', '.formula-card', '.faq-group', '.still-card',
    '.svc-card', '.cat-card', '.facility-card', '.stat-big', '.her-tl-card', '.world-stat'
  ].join(', ');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll(sel).forEach(function (el) {
    if (el.classList.contains('reveal')) return;
    var base = el.classList[0];
    el.classList.add('reveal');
    var sibs = el.parentElement ? Array.prototype.filter.call(el.parentElement.children, function (c) { return c.classList.contains(base); }) : [];
    var i = sibs.indexOf(el);
    if (i > 0) el.style.transitionDelay = Math.min(i * 65, 320) + 'ms';
    io.observe(el);
  });
})();
