import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { JSDOM } from 'jsdom';
const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
const script = readFileSync(new URL('../dist/app.js', import.meta.url), 'utf8');
function setup(options = {}) {
  const dom = new JSDOM(html, { url: 'https://grid.example/', runScripts: 'outside-only', pretendToBeVisual: true });
  const { window } = dom;
  window.matchMedia = options.matchMedia || (() => ({ matches: false, addEventListener() {} }));
  if (options.IntersectionObserver) window.IntersectionObserver = options.IntersectionObserver;
  const dialog = window.document.querySelector('dialog');
  dialog.showModal = function () { this.open = true; };
  dialog.close = function () { this.open = false; this.dispatchEvent(new window.Event('close')); };
  window.eval(script);
  return { window, document: window.document, close: () => window.close() };
}
test('navigation opens, closes after link activation and restores focus on Escape', () => {
  const { window, document, close } = setup();
  const toggle = document.querySelector('.menu-button');
  toggle.click();
  assert.equal(toggle.getAttribute('aria-expanded'), 'true');
  assert.ok(document.querySelector('nav').classList.contains('is-open'));
  document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  assert.equal(toggle.getAttribute('aria-expanded'), 'false');
  assert.equal(document.activeElement, toggle);
  toggle.click();
  document.querySelector('nav a').click();
  assert.equal(toggle.getAttribute('aria-expanded'), 'false');
  close();
});
test('process tabs expose exactly one panel and support arrow, Home and End navigation', () => {
  const { window, document, close } = setup();
  const tabs = [...document.querySelectorAll('[role=tab]')];
  function check(index) {
    assert.equal(document.querySelectorAll('[role=tab][aria-selected=true]').length, 1);
    assert.equal(document.querySelectorAll('[role=tabpanel]:not([hidden])').length, 1);
    assert.equal(tabs[index].getAttribute('aria-selected'), 'true');
    assert.equal(document.querySelector(`#${tabs[index].getAttribute('aria-controls')}`).hidden, false);
    assert.equal(tabs[index].tabIndex, 0);
    [...document.querySelectorAll('[role=tabpanel]')].forEach((panel, n) => {
      assert.equal(panel.hasAttribute('inert'), n !== index);
      assert.equal(panel.getAttribute('aria-hidden'), String(n !== index));
      assert.equal(panel.tabIndex, n === index ? 0 : -1);
    });
  }
  check(0); tabs[2].click(); check(2);
  tabs[2].dispatchEvent(new window.KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true })); check(3);
  tabs[3].dispatchEvent(new window.KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true })); check(0);
  tabs[0].dispatchEvent(new window.KeyboardEvent('keydown', { key: 'End', bubbles: true })); check(3);
  tabs[3].dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Home', bubbles: true })); check(0);
  close();
});
test('contact validates fields, creates a Turkish brief, preserves choices and never submits remotely', () => {
  const { window, document, close } = setup();
  const city = document.querySelector('#city');
  const form = document.querySelector('form');
  const submit = () => form.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
  assert.equal(city.options.length, 82);
  assert.equal(new Set([...city.options].map(o => o.value)).size, 82);
  submit();
  assert.equal(document.querySelector('#city-error').hidden, false);
  assert.equal(document.querySelector('#project-error').hidden, false);
  assert.equal(document.querySelector('#brief-result').hidden, true);
  city.value = 'İzmir';
  city.dispatchEvent(new window.Event('change'));
  submit();
  assert.equal(document.querySelector('#city-error').hidden, true);
  assert.equal(document.querySelector('#project-error').hidden, false);
  document.querySelector('input[value="Ticari ve endüstriyel çatı GES"]').click();
  submit();
  assert.equal(document.querySelector('#brief-result').hidden, false);
  assert.equal(form.hidden, true);
  const message = document.querySelector('#brief-message').textContent;
  assert.match(message, /İzmir/); assert.match(message, /Ticari ve endüstriyel çatı GES/);
  const handoff = new URL(document.querySelector('#whatsapp-link').href);
  assert.equal(handoff.origin, 'https://wa.me');
  assert.equal(handoff.pathname, '/905515062980');
  assert.equal(handoff.searchParams.get('text'), message);
  assert.match(document.querySelector('.result-intro').textContent, /Henüz bir başvuru gönderilmedi/);
  assert.equal(window.localStorage.length, 0);
  document.querySelector('#edit-brief').click();
  assert.equal(form.hidden, false); assert.equal(city.value, 'İzmir');
  assert.equal(document.activeElement, city);
  close();
});
test('video is requested only on click and unloaded when its dialog closes', () => {
  const { document, close } = setup();
  assert.equal(document.querySelectorAll('iframe').length, 0);
  const button = document.querySelector('[data-video]');
  button.click();
  assert.equal(document.querySelector('dialog').open, true);
  assert.equal(document.querySelector('dialog').hasAttribute('data-instant'), true, 'keyboard activation is instant');
  assert.match(document.querySelector('iframe').src, /youtube-nocookie\.com\/embed\/j4m6kfkmXHY/);
  assert.equal(document.querySelector('#video-title').textContent, 'Suntep Solar');
  document.querySelector('.close-dialog').click();
  assert.equal(document.querySelectorAll('iframe').length, 0);
  assert.equal(document.querySelector('dialog').open, false);
  assert.equal(document.activeElement, button);
  close();
});
test('all local assets, anchor destinations, labels and ARIA relationships resolve', () => {
  const { document, close } = setup();
  const ids = [...document.querySelectorAll('[id]')].map(el => el.id);
  assert.equal(new Set(ids).size, ids.length, 'Duplicate IDs');
  for (const el of document.querySelectorAll('[src], link[href], a[href^="#"]')) {
    const value = el.getAttribute('src') || el.getAttribute('href');
    if (value.startsWith('/')) assert.ok(existsSync(new URL(`../dist${value}`, import.meta.url)), `Missing ${value}`);
    if (value.startsWith('#')) assert.ok(document.getElementById(value.slice(1)), `Missing anchor ${value}`);
  }
  for (const el of document.querySelectorAll('[aria-controls],[aria-labelledby],[aria-describedby]')) {
    for (const name of ['aria-controls', 'aria-labelledby', 'aria-describedby']) {
      for (const id of (el.getAttribute(name) || '').split(' ').filter(Boolean)) assert.ok(document.getElementById(id), `Missing ARIA reference ${id}`);
    }
  }
  for (const el of document.querySelectorAll('[data-icon]')) assert.ok(existsSync(new URL(`../dist/assets/icons/${el.dataset.icon}.svg`, import.meta.url)));
  for (const el of document.querySelectorAll('a[target="_blank"]')) assert.match(el.rel, /noopener/);
  assert.equal(document.querySelectorAll('h1').length, 1);
  assert.equal(document.documentElement.lang, 'tr');
  assert.equal(document.querySelector('meta[name=robots]').content, 'noindex,nofollow');
  close();
});

test('conveyor pause control preserves its accessible state', () => {
  const { document, close } = setup();
  const button = document.querySelector('.motion-toggle');
  button.click();
  assert.equal(button.getAttribute('aria-pressed'), 'true');
  assert.ok(document.querySelector('.production-line').classList.contains('is-paused'));
  assert.equal(button.textContent, 'Bandı oynat');
  button.click();
  assert.equal(button.getAttribute('aria-pressed'), 'false');
  assert.equal(button.textContent, 'Bandı durdur');
  close();
});
test('reveal observer staggers by 75ms, runs once, and releases all content when reduced motion is requested', () => {
  let callback, preference, disconnected = false; const observed = [], released = [];
  class Observer {
    constructor(cb) { callback = cb; }
    observe(el) { observed.push(el); }
    unobserve(el) { released.push(el); }
    disconnect() { disconnected = true; }
  }
  const { document, close } = setup({ IntersectionObserver: Observer, matchMedia: query => ({ matches: false, addEventListener: (_, cb) => { if (query.includes('reduced-motion')) preference = cb; } }) });
  assert.ok(document.documentElement.classList.contains('js-reveal'));
  assert.equal(observed[0].style.getPropertyValue('--reveal-delay'), '0ms');
  assert.equal(observed[1].style.getPropertyValue('--reveal-delay'), '75ms');
  callback([{ target: observed[0], isIntersecting: true }]);
  assert.equal(released[0], observed[0]);
  assert.ok(observed[0].classList.contains('is-visible'));
  preference({ matches: true });
  assert.ok(disconnected);
  assert.equal(document.documentElement.classList.contains('js-reveal'), false);
  close();
});
test('without JavaScript all four process descriptions remain accessible and each video has a direct link', () => {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  assert.equal(document.querySelectorAll('.stage-panel:not([hidden]):not([inert]):not([aria-hidden=true])').length, 4);
  assert.equal(document.querySelectorAll('noscript a[href*="youtube.com/watch"]').length, 4);
  assert.ok(document.querySelector('noscript style'), 'noscript style must be actual HTML, not escaped text');
  assert.ok(document.querySelector('.official-application a').href.includes('griddijital.com'));
  dom.window.close();
});
