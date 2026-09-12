/* Clarity website · behaviour.
 * One document, two views (home, about). A full load boots whichever view the
 * URL names; switching views plays a transition and never re-boots. */
(function () {
  'use strict';
  var html = document.documentElement, body = document.body;
  html.classList.add('js');
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (id) { return document.getElementById(id); };
  var wait = function (ms) { return new Promise(function (r) { setTimeout(r, reduced ? 0 : ms); }); };

  /* ============================================================ content
   * PROVISIONAL. The app is in development; these problems, explanations and
   * clips stand in for real output. Replace here and nowhere else. */
  var PROBLEMS = {
    calculus: {
      title: 'Problem set 4 · question 3',
      q: 'Let <span class="math">f(x) = x² sin x</span>. Find <span class="math">f′(π)</span>.',
      ask: 'why does the x² term disappear at π?',
      lines: [
        '<b>Step 1 — Recognise the shape.</b> <span class="math">f</span> is a product, so use the product rule: <span class="math">(uv)′ = u′v + uv′</span>.',
        '<b>Step 2 — Differentiate each factor.</b> With <span class="math">u = x²</span> and <span class="math">v = sin x</span>: <span class="math">f′(x) = 2x sin x + x² cos x</span>.',
        '<b>Step 3 — Evaluate at π.</b> <span class="math">sin π = 0</span>, so the first term vanishes: <span class="math">f′(π) = π² cos π = −π²</span>.'
      ],
      clip: '<svg class="clip" viewBox="0 0 320 180" aria-hidden="true"><line class="axis" x1="20" y1="120" x2="300" y2="120"/><line class="axis" x1="60" y1="20" x2="60" y2="160"/><path class="curve" d="M 30 121 C 60 121, 75 60, 105 60 S 150 118, 175 118 S 225 60, 250 60 S 285 115, 300 118"/><g class="mover"><line class="tan" x1="70" y1="112" x2="150" y2="62"/><circle class="pt" cx="110" cy="87" r="3.5"/></g></svg>'
    },
    code: {
      title: 'binary_search.py',
      q: '<pre>def binary_search(arr, target):\n    lo, hi = 0, len(arr)\n    while lo &lt; hi:\n        mid = (lo + hi) // 2\n        if arr[mid] &lt; target: <b>lo = mid</b>\n        else: hi = mid\n    return lo</pre>',
      ask: 'why is my binary search not working? visualize where it’s messing up',
      lines: [
        '<b>Step 1 — What the loop is supposed to do.</b> Each pass should shrink the window <code>[lo, hi)</code> strictly. As long as it gets smaller every time, the loop has to end.',
        '<b>Step 2 — Where it stops shrinking.</b> <code>mid = (lo + hi) // 2</code> rounds down. When <code>hi - lo == 1</code>, <code>mid == lo</code>, so <code>lo = mid</code> assigns <code>lo</code> to itself and the window never changes.',
        '<b>Step 3 — The fix.</b> Move past the midpoint you already checked:',
        '<pre><code>lo = mid + 1     # instead of lo = mid</code></pre>'
      ],
      clip: '<video src="/docs/captures/placeholder-scene.mp4" muted playsinline loop autoplay></video>'
    }
  };

  /* ============================================================ views */
  var views = { home: $('view-home'), about: $('view-about') };
  var current = null;
  function viewFromPath(p) { return /^\/about\/?$/.test(p) ? 'about' : 'home'; }
  function setChrome(name) {
    document.title = name === 'about' ? 'About Clarity' : 'Clarity';
    document.querySelectorAll('.menu [data-nav]').forEach(function (a) {
      if (a.dataset.nav === name) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    body.classList.toggle('locked', name === 'home');
    html.classList.toggle('is-about', name === 'about');
  }
  function revealAbout(stagger) {
    var rises = views.about.querySelectorAll('.rise');
    rises.forEach(function (el, i) { el.style.transitionDelay = stagger ? Math.min(i, 8) * 60 + 'ms' : '0ms'; });
    requestAnimationFrame(function () { rises.forEach(function (el) { el.classList.add('seen'); }); });
  }
  var switching = false;
  async function show(name, push) {
    if (switching || name === current) return; switching = true;
    var from = views[current], to = views[name];
    if (push) history.pushState({ v: name }, '', name === 'about' ? '/about' : '/');
    setChrome(name);
    if (from && !reduced) {
      var out = from.animate([{ opacity: 1, filter: 'blur(0)', transform: 'none' }, { opacity: 0, filter: 'blur(6px)', transform: 'translateY(-8px)' }], { duration: 240, easing: 'cubic-bezier(.6,0,.9,.4)', fill: 'forwards' });
      await out.finished; out.cancel();
    }
    if (from) from.hidden = true;
    to.hidden = false; scrollTo(0, 0);
    if (name === 'about') { views.about.querySelectorAll('.rise').forEach(function (el) { el.classList.remove('seen'); }); revealAbout(true); }
    if (!reduced) {
      var inn = to.animate([{ opacity: 0, filter: 'blur(6px)', transform: 'translateY(10px)' }, { opacity: 1, filter: 'blur(0)', transform: 'none' }], { duration: 420, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'both' });
      await inn.finished; inn.cancel();
    }
    current = name; switching = false;
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[data-nav]'); if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    e.preventDefault(); show(a.dataset.nav, true);
  });
  addEventListener('popstate', function () { show(viewFromPath(location.pathname), false); });

  /* ============================================================ the demo */
  var which = localStorage.getItem('clarity:problem') === 'calculus' ? 'code' : 'calculus'; /* alternates per load */
  try { localStorage.setItem('clarity:problem', which); } catch (e) {}
  var timers = [];
  function dwait(ms) { return new Promise(function (r) { timers.push(setTimeout(r, reduced ? 0 : ms)); }); }
  function fit() { var w = $('stagewrap').clientWidth; $('stage').style.setProperty('--s', Math.min(1, w / 720)); }
  function load(p) {
    $('doc-t').textContent = p.title; $('doc-q').innerHTML = p.q + '<div class="sel" id="sel"></div>';
    $('ex').innerHTML = p.lines.map(function (l) { return l.indexOf('<pre') === 0 ? l : '<p>' + l + '</p>'; }).join('');
    $('video').innerHTML = p.clip;
  }
  function resetDemo() {
    timers.forEach(clearTimeout); timers = [];
    $('keys').className = 'keys'; $('cursor').className = 'cursor';
    $('dim').classList.remove('on'); $('spot').className = 'spot'; $('typed').textContent = ''; $('ph').style.display = '';
    $('res').className = 'res'; $('status').className = 'status working'; $('status').textContent = 'Reading the problem…';
    $('ex').querySelectorAll('p, pre').forEach(function (p) { p.classList.remove('on'); }); $('video').classList.remove('on');
  }
  async function demo() {
    var p = PROBLEMS[which]; load(p); resetDemo();
    await dwait(1400);
    $('keys').classList.add('on');
    var ks = $('keys').querySelectorAll('kbd');
    for (var i = 0; i < ks.length; i++) { ks[i].classList.add('down'); await dwait(100); }
    await dwait(160); ks.forEach(function (k) { k.classList.remove('down'); });
    var qr = $('doc-q').getBoundingClientRect(), dr = $('doc').getBoundingClientRect(), sc = +($('stage').style.getPropertyValue('--s') || 1);
    var cx = (qr.left - dr.left) / sc - 6, cy = (qr.top - dr.top) / sc + 24 - 6;
    var cur = $('cursor'); cur.style.transition = 'none'; cur.style.left = cx + 'px'; cur.style.top = cy + 'px'; void cur.offsetWidth; cur.style.transition = ''; cur.classList.add('on');
    $('dim').classList.add('on'); await dwait(120); $('sel').classList.add('on');
    cur.style.left = (cx + qr.width / sc + 8) + 'px'; cur.style.top = (cy + qr.height / sc + 8) + 'px';
    await dwait(520); $('dim').classList.remove('on'); $('keys').classList.remove('on'); cur.classList.remove('on');
    $('spot').classList.add('shown'); await dwait(380);
    $('ph').style.display = 'none';
    for (var c = 1; c <= p.ask.length; c++) { $('typed').textContent = p.ask.slice(0, c); await dwait(16 + Math.random() * 22); }
    await dwait(300); $('spot').classList.remove('shown'); $('spot').classList.add('leaving'); await dwait(160);
    $('res').classList.add('shown'); await dwait(600);
    $('status').textContent = 'Writing explanation…'; await dwait(450);
    var ps = $('ex').querySelectorAll('p, pre');
    for (var j = 0; j < ps.length; j++) { ps[j].classList.add('on'); await dwait(380); }
    await dwait(120); $('status').textContent = 'Planning the animation…'; await dwait(500);
    $('status').textContent = 'Rendering scene 1 of 3…'; await dwait(450);
    $('status').textContent = 'Rendering scene 2 of 3…'; await dwait(450);
    $('status').textContent = 'Done'; $('status').className = 'status done'; $('video').classList.add('on');
  }
  if (!reduced) {
    $('stagewrap').addEventListener('pointermove', function (e) {
      var r = $('stagewrap').getBoundingClientRect(); var dx = (e.clientX - r.left) / r.width - .5, dy = (e.clientY - r.top) / r.height - .5;
      $('tilt').style.setProperty('--ry', (dx * 6).toFixed(2) + 'deg'); $('tilt').style.setProperty('--rx', (-dy * 5).toFixed(2) + 'deg');
    });
    $('stagewrap').addEventListener('pointerleave', function () { $('tilt').style.setProperty('--ry', '0deg'); $('tilt').style.setProperty('--rx', '0deg'); });
  }
  addEventListener('resize', fit);

  /* ============================================================ download */
  var dl = $('download');
  var going = false;
  function go(e) {
    if (going) { if (e) e.preventDefault(); return; }
    if (e && (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1)) return;
    if (e) e.preventDefault(); going = true;
    dl.classList.add('is-going'); dl.querySelector('.label').textContent = 'Opening the latest release →';
    setTimeout(function () { location.href = dl.href; }, reduced ? 0 : 520);
  }
  dl.addEventListener('click', go);
  addEventListener('keydown', function (e) {
    if (e.key.toLowerCase() !== 'd' || e.metaKey || e.ctrlKey || e.altKey || current !== 'home') return;
    if (/^(input|textarea|select)$/i.test(document.activeElement.tagName)) return;
    e.preventDefault(); var k = dl.querySelector('kbd'); k.classList.add('down'); setTimeout(function () { k.classList.remove('down'); }, 120); go();
  });

  /* ============================================================ about visuals play when seen */
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { e.target.classList.toggle('play', e.isIntersecting); }); }, { threshold: .25 });
  ['flow', 'stack'].forEach(function (id) { var el = $(id); if (el) io.observe(el); });

  /* ============================================================ boot */
  var start = viewFromPath(location.pathname);
  history.replaceState({ v: start }, '', location.pathname);
  Object.keys(views).forEach(function (k) { views[k].hidden = k !== start; }); current = start; setChrome(start);
  fit(); load(PROBLEMS[which]);
  document.fonts.ready.then(function () {
    if (start === 'home') { html.classList.add('boot'); demo(); }
    else { html.classList.add('boot'); revealAbout(true); }
  });
})();
