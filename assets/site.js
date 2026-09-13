/* Clarity website · v3.1. One document, two views. A full load boots the view the URL names;
 * switching views transitions and never re-boots. About's animations play on their own. */
(function () {
  'use strict';
  var html = document.documentElement, body = document.body;
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (id) { return document.getElementById(id); };

  /* ============================================================ views */
  var views = { home: $('view-home'), about: $('view-about') };
  var current = null, switching = false;
  function viewFromPath(p) { return /^\/about\/?$/.test(p) ? 'about' : 'home'; }
  function setChrome(name) {
    document.title = name === 'about' ? 'About Clarity' : 'Clarity';
    document.querySelectorAll('.bar [data-nav]').forEach(function (a) { if (a.dataset.nav === name) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    body.classList.toggle('locked', name === 'home');
    var film = $('film'); if (film) { if (name === 'home') film.play().catch(function () {}); else film.pause(); }
    parallax();
  }
  async function show(name, push) {
    if (switching || name === current) return; switching = true;
    var from = views[current], to = views[name];
    if (push) history.pushState({ v: name }, '', name === 'about' ? '/about' : '/');
    if (from && !reduced) { var out = from.animate([{ opacity: 1, filter: 'blur(0)' }, { opacity: 0, filter: 'blur(6px)' }], { duration: 180, easing: 'cubic-bezier(.6,0,.9,.4)', fill: 'forwards' }); await out.finished; out.cancel(); }
    if (from) from.hidden = true;
    to.hidden = false; scrollTo(0, 0); current = name; setChrome(name);
    if (name === 'about') resetAbout();
    if (!reduced) { var inn = to.animate([{ opacity: 0, filter: 'blur(6px)' }, { opacity: 1, filter: 'blur(0)' }], { duration: 320, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'both' }); await inn.finished; inn.cancel(); }
    switching = false;
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[data-nav]'); if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    e.preventDefault(); show(a.dataset.nav, true);
  });
  addEventListener('popstate', function () { show(viewFromPath(location.pathname), false); });

  /* ============================================================ background parallax */
  var layers = document.querySelectorAll('.bg i'), depth = [.35, .6, .9], px = 0, py = 0;
  function parallax() {
    if (reduced) return;
    layers.forEach(function (l, i) {
      var x = current === 'home' ? px * 40 * depth[i] : 0;
      var y = current === 'home' ? py * 30 * depth[i] : -scrollY * .12 * depth[i];
      l.style.setProperty('--x', x.toFixed(1) + 'px'); l.style.setProperty('--y', y.toFixed(1) + 'px');
    });
  }
  addEventListener('pointermove', function (e) { if (current !== 'home') return; px = e.clientX / innerWidth - .5; py = e.clientY / innerHeight - .5; requestAnimationFrame(parallax); }, { passive: true });
  addEventListener('scroll', function () { requestAnimationFrame(parallax); }, { passive: true });

  /* ============================================================ about: reveals */
  var revealIO = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('in'); }); }, { threshold: .2 });
  document.querySelectorAll('.about .focus, .about .reveal').forEach(function (el) { revealIO.observe(el); });
  function resetAbout() { document.querySelectorAll('.about .focus, .about .reveal').forEach(function (el) { el.classList.remove('in'); }); players.forEach(function (p) { p.set(0); }); }

  /* a player: steps through n states on a timer while its section is on screen; clicking a step jumps */
  var players = [];
  function player(sectionId, listEl, n, apply, ms) {
    var i = -1, timer = null, sec = $(sectionId);
    function set(k) { i = ((k % n) + n) % n; listEl.querySelectorAll('li').forEach(function (li, j) { li.classList.toggle('on', j === i); }); apply(i); }
    function start() { stop(); if (reduced) return; timer = setInterval(function () { set(i + 1); }, ms); }
    function stop() { if (timer) clearInterval(timer); timer = null; }
    listEl.addEventListener('click', function (e) { var li = e.target.closest('li'); if (!li) return; set([].indexOf.call(listEl.children, li)); start(); });
    new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { if (i < 0) set(0); start(); } else stop(); }); }, { threshold: .3 }).observe(sec);
    var p = { set: set, start: start, stop: stop }; players.push(p); return p;
  }

  /* 1 · the captures */
  player('capture', $('cap-steps'), 5, function (i) {
    document.querySelectorAll('#shots .shot').forEach(function (s, k) { s.classList.toggle('on', k === i); });
  }, 2000);

  /* 2 · the backend: twelve steps */
  var STEPS = [
    { n: ['n1'], e: null, pk: null, st: 'Capture', t: 'Capture', cap: 'Your screenshot leaves the Mac.' },
    { n: ['n1', 'n2'], e: 'e2', pk: ['e2', ''], st: 'Reading the problem…', t: 'A job', cap: 'The coordinator opens a job for it.' },
    { n: ['n2', 'n3'], e: 'e3', pk: ['e3', ''], st: 'Reading the problem…', t: 'Read', cap: 'Gemini reads the problem off the image, word for word.' },
    { n: ['n2', 'n4'], e: 'e4', pk: ['e4', ''], st: 'Reading the problem…', t: 'Seen before?', cap: 'MongoDB is checked. A known problem answers instantly.' },
    { n: ['n2', 'n5'], e: 'e5', pk: ['e5', ''], st: 'Writing explanation…', t: 'Explain', cap: 'Gemini writes the explanation and plans the animation.' },
    { n: ['n5', 'n1'], e: 'e6', pk: ['e6', 'mint'], lbl: 'l6', st: 'Writing explanation…', t: 'On your screen', cap: 'The explanation arrives. About eight seconds.' },
    { n: ['n2', 'n7'], e: 'e7', pk: ['e7', ''], st: 'Planning the animation…', t: 'Write code', cap: 'Three scenes. Claude writes Manim for each.' },
    { n: ['n7', 'n8'], e: 'e8', pk: ['e8', ''], st: 'Rendering the animation…', t: 'Render', cap: 'Each scene renders in a sandbox. Crashes get fixed and retried.' },
    { n: ['n8', 'n9'], e: 'e9', pk: ['e9', ''], st: 'Rendering the animation…', t: 'Join', cap: 'ffmpeg joins the scenes into one video.' },
    { n: ['n9', 'n10'], e: 'e10', pk: ['e10', ''], st: 'Rendering the animation…', t: 'Store', cap: 'S3 keeps it, so nobody renders this twice.' },
    { n: ['n10', 'n1'], e: 'e11', pk: ['e11', 'amber'], lbl: 'l11', st: 'Done', t: 'Play', cap: 'The video plays in the same window. About a minute.' },
    { n: ['n2', 'n4'], e: 'e12', pk: ['e12', ''], lbl: 'l12', st: 'Done', t: 'Remember', cap: 'The problem is remembered for the next person.' }
  ];
  $('be-steps').innerHTML = STEPS.map(function (s) { return '<li><b>' + s.t + '</b><span>' + s.cap + '</span></li>'; }).join('');
  var beStep = -1;
  player('backend', $('be-steps'), STEPS.length, function (i) {
    var flow = $('flow'), prev = beStep; beStep = i;
    flow.querySelectorAll('.n').forEach(function (n) { n.classList.remove('on', 'done'); });
    flow.querySelectorAll('.e, .el').forEach(function (e) { e.classList.remove('on'); });
    for (var k = 0; k <= i; k++) { var s = STEPS[k]; if (s.e) flow.querySelector('#' + s.e).classList.add('on'); if (s.lbl) flow.querySelector('#' + s.lbl).classList.add('on'); s.n.forEach(function (id) { flow.querySelector('#' + id).classList.add('done'); }); }
    var cur = STEPS[i]; cur.n.forEach(function (id) { flow.querySelector('#' + id).classList.add('on'); });
    var pk = $('pk'); pk.setAttribute('class', 'pk');
    if (cur.pk && !reduced) { pk.style.setProperty('--path', 'path("' + flow.querySelector('#' + cur.pk[0]).getAttribute('d') + '")'); void pk.getBoundingClientRect(); pk.setAttribute('class', 'pk go ' + cur.pk[1]); }
    $('be-status-text').textContent = cur.st; $('be-status').classList.toggle('done', cur.st === 'Done');
  }, 1150);

  /* ============================================================ download */
  var dl = $('download'), going = false;
  function go(e) {
    if (going) { if (e) e.preventDefault(); return; }
    if (e && (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1)) return;
    if (e) e.preventDefault(); going = true;
    dl.classList.add('is-going'); dl.querySelector('.label').textContent = 'Downloading Clarity.dmg\u2026';
    location.href = dl.href;   /* GitHub serves the asset as an attachment, so the page stays */
    setTimeout(function () { dl.classList.remove('is-going'); dl.querySelector('.label').textContent = 'Download for macOS'; going = false; }, 4000);
  }
  dl.addEventListener('click', go);
  addEventListener('keydown', function (e) {
    if (e.key.toLowerCase() !== 'd' || e.metaKey || e.ctrlKey || e.altKey || current !== 'home') return;
    if (/^(input|textarea|select)$/i.test(document.activeElement.tagName)) return;
    e.preventDefault(); go();
  });

  /* ============================================================ release facts, from GitHub's public API */
  fetch('https://api.github.com/repos/s0hamjain/Clarity/releases/latest', { headers: { Accept: 'application/vnd.github+json' } })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (rel) {
      if (!rel) return;
      var dmg = (rel.assets || []).filter(function (a) { return a.name === 'Clarity.dmg'; })[0];
      var ver = /^v?\d/.test(rel.tag_name) ? rel.tag_name.replace(/^v/, 'v') : (rel.name || rel.tag_name);
      var parts = [ver];
      if (dmg) parts.push(Math.round(dmg.size / 1048576) + ' MB');
      parts.push('macOS 14 or later', 'Apple Silicon');
      $('rel-note').textContent = parts.join(' \u00b7 ');
    }).catch(function () {});

  /* ============================================================ boot */
  var start = viewFromPath(location.pathname);
  history.replaceState({ v: start }, '', location.pathname);
  Object.keys(views).forEach(function (k) { views[k].hidden = k !== start; });
  current = start; setChrome(start);
  /* swap .pre (set in the markup) for .boot once the fonts are in, or after 1.5 s if they never arrive */
  var booted = false;
  function boot() { if (booted) return; booted = true; html.classList.remove('pre'); html.classList.add('boot'); }
  document.fonts.ready.then(boot);
  setTimeout(boot, 1500);
})();
