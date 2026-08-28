// ===== Cloud & DevOps Infrastructure — Kaala Mitra =====
(function () {
  'use strict';

  /* Sticky header shadow */
  var header = document.getElementById('site-header');
  var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 10); };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Mobile navigation */
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('site-nav');
  function closeNav() {
    nav.classList.remove('open');
    toggle.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
  }
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.classList.toggle('active', open);
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', function (e) {
    var link = e.target.closest('a');
    if (link) {
      closeNav();
      var dd = link.closest('.nav-drop');
      if (dd) { dd.classList.remove('open'); dd.querySelector('.nav-drop-btn').setAttribute('aria-expanded', 'false'); }
    }
  });

  /* Resources dropdown (click support for touch) */
  var dropBtn = document.querySelector('.nav-drop-btn');
  var drop = dropBtn.parentElement;
  dropBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    var open = drop.classList.toggle('open');
    dropBtn.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', function (e) {
    if (!drop.contains(e.target)) {
      drop.classList.remove('open');
      dropBtn.setAttribute('aria-expanded', 'false');
    }
  });

  /* Reveal on scroll */
  var revealIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('visible'); revealIO.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { revealIO.observe(el); });

  /* Scrollspy — highlight active nav link */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav > .nav-link[href^="#"]'));
  var byId = {};
  links.forEach(function (l) { byId[l.getAttribute('href').slice(1)] = l; });
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting && byId[en.target.id]) {
        links.forEach(function (l) { l.classList.remove('active'); });
        byId[en.target.id].classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  document.querySelectorAll('section[id]').forEach(function (s) { spy.observe(s); });
  byId.home = links[0];
  var homeSection = document.getElementById('home');
  if (homeSection) spy.observe(homeSection);

  /* FAQ accordion */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var btn = item.querySelector('.faq-q');
    btn.addEventListener('click', function () {
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (o) {
        o.classList.remove('open');
        o.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* Animated stat counters */
  function fmt(v, d) { return d > 0 ? v.toFixed(d) : String(Math.round(v)); }
  var countIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var el = en.target;
      countIO.unobserve(el);
      var target = parseFloat(el.getAttribute('data-target'));
      var dec = parseInt(el.getAttribute('data-decimals') || '0', 10);
      var dur = 1400, t0 = performance.now();
      (function tick(now) {
        var p = Math.min((now - t0) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(target * eased, dec);
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('.count').forEach(function (el) { countIO.observe(el); });

  /* Consultation form → WhatsApp message (no backend needed) */
  var WHATSAPP = '918884014055';
  var form = document.getElementById('consult-form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;
    var d = Object.fromEntries(new FormData(form));
    var lines = [
      'Hello Kaala Mitra! I am interested in your Cloud & DevOps services.',
      '',
      'Name: ' + d.name,
      'Mobile: ' + d.phone,
      'Email: ' + d.email,
      'Company: ' + (d.company || '-'),
      'Service: ' + d.service,
      'Requirements: ' + d.message
    ];
    var url = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(lines.join('\n'));
    window.open(url, '_blank', 'noopener');
  });

  /* Footer year */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();