/* Clarity website · v3. One document, two views. A full load boots the view the URL names;
 * switching views transitions and never re-boots. Scroll drives the two pinned sections. */
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
  }
  async function show(name, push) {
    if (switching || name === current) return; switching = true;
    var from = views[current], to = views[name];
    if (push) history.pushState({ v: name }, '', name === 'about' ? '/about' : '/');
    if (from && !reduced) { var out = from.animate([{ opacity: 1, filter: 'blur(0)' }, { opacity: 0, filter: 'blur(6px)' }], { duration: 220, easing: 'cubic-bezier(.6,0,.9,.4)', fill: 'forwards' }); await out.finished; out.cancel(); }
    if (from) from.hidden = true;
    to.hidden = false; scrollTo(0, 0); setChrome(name);
    if (name === 'about') { resetAbout(); requestAnimationFrame(onScroll); }
    if (!reduced) { var inn = to.animate([{ opacity: 0, filter: 'blur(6px)' }, { opacity: 1, filter: 'blur(0)' }], { duration: 420, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'both' }); await inn.finished; inn.cancel(); }
    current = name; switching = false;
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[data-nav]'); if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    e.preventDefault(); show(a.dataset.nav, true);
  });
  addEventListener('popstate', function () { show(viewFromPath(location.pathname), false); });

  /* ============================================================ about: reveals + pinned sections */
  var revealIO = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('in'); }); }, { threshold: .2 });
  document.querySelectorAll('.about .focus, .about .reveal').forEach(function (el) { revealIO.observe(el); });
  function resetAbout() { document.querySelectorAll('.about .focus, .about .reveal').forEach(function (el) { el.classList.remove('in'); }); capStep = -1; beStep = -1; }

  /* 1 · the captures: five shots, five captions */
  var CAPS = ['Type what’s confusing you, or just press Enter.', 'Press Enter.', 'Reading the problem… then writing.', 'The explanation, in about eight seconds.', 'The animation, about a minute later.'];
  var capStep = -1;
  function setCapture(i) {
    if (i === capStep) return; capStep = i;
    document.querySelectorAll('#shots .shot').forEach(function (s, k) { s.classList.toggle('on', k === i); });
    $('cap-line').textContent = CAPS[i];
  }

  /* 2 · the backend: twelve steps. nodes lit, edge lit, packet path, status, caption */
  var STEPS = [
    { n: ['n1'], e: null, pk: null, st: 'Capture', cap: 'Your screenshot leaves the Mac.' },
    { n: ['n1', 'n2'], e: 'e2', pk: ['e2', ''], st: 'Reading the problem…', cap: 'The coordinator opens a job for it.' },
    { n: ['n2', 'n3'], e: 'e3', pk: ['e3', ''], st: 'Reading the problem…', cap: 'Gemini reads the problem off the image, word for word.' },
    { n: ['n2', 'n4'], e: 'e4', pk: ['e4', ''], st: 'Reading the problem…', cap: 'Has anyone asked this before? If so, the answer is instant.' },
    { n: ['n2', 'n5'], e: 'e5', pk: ['e5', ''], st: 'Writing explanation…', cap: 'Not this time. Gemini writes the explanation and plans the animation.' },
    { n: ['n5', 'n1'], e: 'e6', pk: ['e6', 'mint'], lbl: 'l6', st: 'Writing explanation…', cap: 'The explanation is on your screen. You stop waiting here.' },
    { n: ['n2', 'n7'], e: 'e7', pk: ['e7', ''], st: 'Planning the animation…', cap: 'Three scenes. Claude writes the Manim code for each one.' },
    { n: ['n7', 'n8'], e: 'e8', pk: ['e8', ''], st: 'Rendering scene 1 of 3…', cap: 'Each scene renders in its own sandbox. If it crashes, Claude fixes it.' },
    { n: ['n8', 'n9'], e: 'e9', pk: ['e9', ''], st: 'Rendering scene 3 of 3…', cap: 'The scenes are joined into one video.' },
    { n: ['n9', 'n10'], e: 'e10', pk: ['e10', ''], st: 'Uploading…', cap: 'Stored, so nobody renders this problem twice.' },
    { n: ['n10', 'n1'], e: 'e11', pk: ['e11', 'amber'], lbl: 'l11', st: 'Done', cap: 'The video plays in the same window.' },
    { n: ['n2', 'n4'], e: 'e12', pk: ['e12', ''], lbl: 'l12', st: 'Done', cap: 'And the problem is remembered.' }
  ];
  var beStep = -1;
  function setBackend(i) {
    if (i === beStep) return; var prev = beStep; beStep = i;
    var flow = $('flow'); if (!flow) return;
    flow.querySelectorAll('.n').forEach(function (n) { n.classList.remove('on', 'done'); });
    flow.querySelectorAll('.e, .el').forEach(function (e) { e.classList.remove('on'); });
    for (var k = 0; k <= i; k++) {
      var s = STEPS[k];
      if (s.e) flow.querySelector('#' + s.e).classList.add('on');
      if (s.lbl) flow.querySelector('#' + s.lbl).classList.add('on');
      s.n.forEach(function (id) { flow.querySelector('#' + id).classList.add('done'); });
    }
    var cur = STEPS[i];
    cur.n.forEach(function (id) { flow.querySelector('#' + id).classList.add('on'); });
    var pk = $('pk'); pk.setAttribute('class', 'pk');
    if (cur.pk && i > prev && !reduced) {
      var d = flow.querySelector('#' + cur.pk[0]).getAttribute('d');
      pk.style.setProperty('--path', 'path("' + d + '")');
      void pk.getBoundingClientRect();
      pk.setAttribute('class', 'pk go ' + cur.pk[1]);
    }
    $('be-status-text').textContent = cur.st;
    $('be-status').classList.toggle('done', cur.st === 'Done');
    $('be-line').textContent = cur.cap;
  }
  /* Play: walks the twelve steps on a timer by scrolling the page along the section */
  var playing = null;
  $('be-replay').addEventListener('click', function () {
    if (playing) { clearInterval(playing); playing = null; $('be-replay').textContent = 'Play'; return; }
    var sec = $('backend'), k = 0; $('be-replay').textContent = 'Stop';
    function tick() {
      var total = sec.offsetHeight - innerHeight;
      var top = sec.getBoundingClientRect().top + scrollY;
      scrollTo({ top: top + total * (k + .5) / STEPS.length, behavior: 'instant' });
      k++; if (k >= STEPS.length) { clearInterval(playing); playing = null; $('be-replay').textContent = 'Play'; }
    }
    tick(); playing = setInterval(tick, 1100);
  });

  function progress(sec) {
    var r = sec.getBoundingClientRect(), total = sec.offsetHeight - innerHeight;
    return Math.min(1, Math.max(0, -r.top / total));
  }
  function onScroll() {
    if (current !== 'about') return;
    setCapture(Math.min(4, Math.floor(progress($('capture')) * 5)));
    setBackend(Math.min(STEPS.length - 1, Math.floor(progress($('backend')) * STEPS.length)));
  }
  addEventListener('scroll', function () { requestAnimationFrame(onScroll); }, { passive: true });
  addEventListener('resize', onScroll);

  /* ============================================================ download */
  var dl = $('download'), going = false;
  function go(e) {
    if (going) { if (e) e.preventDefault(); return; }
    if (e && (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1)) return;
    if (e) e.preventDefault(); going = true;
    dl.classList.add('is-going'); dl.querySelector('.label').textContent = 'Opening the latest release →';
    setTimeout(function () { location.href = dl.href; }, reduced ? 0 : 480);
  }
  dl.addEventListener('click', go);
  addEventListener('keydown', function (e) {
    if (e.key.toLowerCase() !== 'd' || e.metaKey || e.ctrlKey || e.altKey || current !== 'home') return;
    if (/^(input|textarea|select)$/i.test(document.activeElement.tagName)) return;
    e.preventDefault(); go();
  });

  /* ============================================================ boot */
  var start = viewFromPath(location.pathname);
  history.replaceState({ v: start }, '', location.pathname);
  Object.keys(views).forEach(function (k) { views[k].hidden = k !== start; });
  current = start; setChrome(start);
  document.fonts.ready.then(function () { html.classList.add('boot'); if (start === 'about') onScroll(); });
})();
