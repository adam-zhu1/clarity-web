/* Clarity website · behaviour. Everything here is optional: the pages read fully without it. */
(function () {
  'use strict';
  const html = document.documentElement;
  html.classList.add('js');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wait = (ms) => new Promise((r) => setTimeout(r, reduced ? 0 : ms));

  /* ---- download button: press D, or click. Shows where you're going before it takes you. */
  const dl = document.getElementById('download');
  if (dl) {
    const label = dl.querySelector('.label');
    const kbd = dl.querySelector('kbd');
    let going = false;
    function go(e) {
      if (going) { e && e.preventDefault(); return; }
      if (e && (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1)) return; // let the browser open a new tab
      if (e) e.preventDefault();
      going = true;
      dl.classList.add('is-going');
      label.textContent = 'Opening the latest release →';
      setTimeout(() => { location.href = dl.href; }, reduced ? 0 : 520);
    }
    dl.addEventListener('click', go);
    addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() !== 'd' || e.metaKey || e.ctrlKey || e.altKey) return;
      if (/^(input|textarea|select)$/i.test(document.activeElement.tagName)) return;
      e.preventDefault();
      if (kbd) { kbd.classList.add('down'); setTimeout(() => kbd.classList.remove('down'), 120); }
      go();
    });
  }

  /* ---- page two: the three-step demo, plays once when in view */
  const demo = document.getElementById('demo');
  if (demo) {
    const keys = demo.querySelectorAll('.keys kbd');
    const dash = document.getElementById('dash');
    const result = document.getElementById('result');
    const ps = result.querySelectorAll('p');
    const clip = document.getElementById('clip');
    const status = document.getElementById('status');
    const statusText = document.getElementById('status-text');
    const steps = document.querySelectorAll('#steps li');
    let run = 0;

    function setStep(phase) { steps.forEach((s) => s.classList.toggle('live', s.dataset.phase === phase)); }
    function reset() {
      keys.forEach((k) => k.classList.remove('down'));
      dash.classList.remove('on'); result.classList.remove('on'); clip.classList.remove('on');
      ps.forEach((p) => p.classList.remove('on')); status.classList.remove('done');
      statusText.textContent = 'Reading the problem…'; setStep('');
    }
    async function play() {
      const id = ++run; reset();
      const alive = () => id === run;
      await wait(400); if (!alive()) return; setStep('press');
      for (const k of keys) { k.classList.add('down'); await wait(140); }
      await wait(240); keys.forEach((k) => k.classList.remove('down'));
      await wait(300); if (!alive()) return; dash.classList.add('on');
      await wait(900); if (!alive()) return; setStep('ask');
      await wait(700); if (!alive()) return; setStep('read'); result.classList.add('on');
      await wait(800); if (!alive()) return; statusText.textContent = 'Writing explanation…';
      await wait(600);
      for (const p of ps) { if (!alive()) return; p.classList.add('on'); await wait(420); }
      await wait(500); if (!alive()) return; statusText.textContent = 'Rendering 3 scenes…';
      await wait(1400); if (!alive()) return; statusText.textContent = 'Done'; status.classList.add('done'); clip.classList.add('on');
    }
    // Resting state is the final frame, so the page reads without waiting.
    result.classList.add('on'); ps.forEach((p) => p.classList.add('on')); dash.classList.add('on'); clip.classList.add('on'); status.classList.add('done'); statusText.textContent = 'Done';
    document.getElementById('replay').addEventListener('click', play);
    let started = false;
    new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting && !started) { started = true; play(); } }), { threshold: .4 }).observe(demo);
  }

  /* ---- page two: steps rise as they enter view; the rail fills */
  const rises = document.querySelectorAll('.rise');
  if (rises.length) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('seen'); io.unobserve(e.target); } }), { threshold: .2, rootMargin: '0px 0px -8% 0px' });
    rises.forEach((el, i) => { el.style.transitionDelay = (i % 6) * 70 + 'ms'; io.observe(el); });
    const list = document.getElementById('isteps');
    if (list) new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) list.classList.add('seen'); }), { threshold: .15 }).observe(list);
  }
})();
