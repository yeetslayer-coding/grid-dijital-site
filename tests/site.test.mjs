import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { JSDOM } from 'jsdom';
const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
const script = ['selection.js','app.js','features.js'].map(name => readFileSync(new URL('../dist/'+name, import.meta.url), 'utf8')).join('\n');
function setup(options = {}) {
  const dom = new JSDOM(html, { url: 'https://grid.example/', runScripts: 'outside-only', pretendToBeVisual: true });
  const { window } = dom;
  window.matchMedia = options.matchMedia || (() => ({ matches: false, addEventListener() {} }));
  if (options.IntersectionObserver) window.IntersectionObserver = options.IntersectionObserver;
  window.document.querySelectorAll('dialog').forEach(dialog => {
    dialog.showModal = function () { this.open = true; };
    dialog.close = function () { this.open = false; this.dispatchEvent(new window.Event('close')); };
  });
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
test('advertising tabs expose exactly one panel and support arrow, Home and End navigation', () => {
  const { window, document, close } = setup();
  const root = document.querySelector('[data-tabs=ads]');
  const tabs = [...root.querySelectorAll('[role=tab]')];
  function check(index) {
    assert.equal(root.querySelectorAll('[role=tab][aria-selected=true]').length, 1);
    assert.equal(root.querySelectorAll('[role=tabpanel]:not([hidden])').length, 1);
    assert.equal(tabs[index].getAttribute('aria-selected'), 'true');
    assert.equal(document.querySelector(`#${tabs[index].getAttribute('aria-controls')}`).hidden, false);
    assert.equal(tabs[index].tabIndex, 0);
    [...root.querySelectorAll('[role=tabpanel]')].forEach((panel, n) => {
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
  assert.equal(document.activeElement, document.querySelector('#city-trigger'));
  close();
});
test('video is requested only on click and unloaded when its dialog closes', () => {
  const { document, close } = setup();
  assert.equal(document.querySelectorAll('iframe').length, 0);
  const button = document.querySelector('[data-video]');
  button.click();
  assert.equal(document.querySelector('#video-dialog').open, true);
  assert.equal(document.querySelector('#video-dialog').hasAttribute('data-instant'), true, 'keyboard activation is instant');
  assert.match(document.querySelector('iframe').src, /youtube-nocookie\.com\/embed\/j4m6kfkmXHY/);
  assert.equal(document.querySelector('#video-title').textContent, 'Suntep Solar');
  document.querySelector('#video-dialog .close-dialog').click();
  assert.equal(document.querySelectorAll('iframe').length, 0);
  assert.equal(document.querySelector('#video-dialog').open, false);
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

test('conveyor repeats the five solar-module stages, has no pause control, and pauses offscreen or in a hidden tab', () => {
  let callback;
  class Observer { constructor(cb) { callback = cb; } observe() {} disconnect() {} }
  const { window, document, close } = setup({ IntersectionObserver: Observer, matchMedia: () => ({ matches: true, addEventListener() {} }) });
  const conveyor = document.querySelector('.production-line');
  assert.equal(document.querySelector('.motion-toggle'), null);
  assert.equal(document.querySelector('.parcel'), null);
  assert.equal(document.querySelectorAll('.conveyor-object').length, 10);
  const labels = [...conveyor.querySelectorAll('.panel-caption strong')].map(label => label.textContent);
  assert.deepEqual(labels.slice(0, 5), ['Bölge', 'Reklam', 'Başvuru', 'Keşif', 'Teklif']);
  assert.deepEqual(labels.slice(0, 5), labels.slice(5));
  assert.equal(conveyor.querySelector('img'), null);
  assert.equal(conveyor.querySelector('[style*="--object-bottom"]'), null);
  assert.match(document.querySelector('.project-art img').getAttribute('src'), /ges-objects\/villa\.webp$/);
  assert.ok(conveyor.classList.contains('is-offscreen'));
  callback([{ target: conveyor, isIntersecting: true }]);
  assert.equal(conveyor.classList.contains('is-offscreen'), false);
  callback([{ target: conveyor, isIntersecting: false }]);
  assert.ok(conveyor.classList.contains('is-offscreen'));
  Object.defineProperty(document, 'hidden', { value: true, configurable: true });
  document.dispatchEvent(new window.Event('visibilitychange'));
  assert.ok(document.body.classList.contains('is-hidden'));
  close();
});
test('reveal observer staggers by 75ms, runs once, and releases all content when reduced motion is requested', () => {
  let callback, preference, disconnected = false; const observed = [], released = [];
  class Observer {
    constructor(cb) { callback = cb; }
    observe(el) { if (el.matches('.reveal')) observed.push(el); }
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
test('without JavaScript the process descriptions and four advertising examples remain accessible and each video has a direct link', () => {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  assert.equal(document.querySelectorAll('.ad-panel:not([hidden]):not([inert])').length, 4);
  assert.equal(document.querySelectorAll('.stage-panel:not([hidden]):not([inert])').length, 4);
  assert.equal(document.querySelectorAll('noscript a[href*="youtube.com/watch"]').length, 4);
  assert.ok(document.querySelector('noscript style'), 'noscript style must be actual HTML, not escaped text');
  assert.ok(document.querySelector('.official-application a').href.includes('griddijital.com'));
  dom.window.close();
});

test('city search matches Turkish and ASCII spelling and never commits unmatched text', () => {
  const { window, document, close } = setup();
  const trigger = document.querySelector('#city-trigger'), search = document.querySelector('#city-search');
  trigger.click();
  assert.equal(document.querySelector('#city-dialog').open, true);
  assert.equal(document.querySelectorAll('.city-option').length, 81);
  for (const [query, city] of [['istanbul', 'İstanbul'], ['İZMİR', 'İzmir'], ['sanliurfa', 'Şanlıurfa'], ['AGRI', 'Ağrı'], [' IĞDIR ', 'Iğdır']]) {
    search.value = query; search.dispatchEvent(new window.Event('input'));
    assert.deepEqual([...document.querySelectorAll('.city-option')].map(el => el.dataset.city), [city]);
  }
  search.value = 'Atlantis'; search.dispatchEvent(new window.Event('input'));
  assert.equal(document.querySelectorAll('.city-option').length, 0);
  assert.equal(document.querySelector('.city-empty').hidden, false);
  assert.equal(document.querySelector('#city').value, '');
  search.value = 'izmir'; search.dispatchEvent(new window.Event('input'));
  search.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
  assert.equal(document.querySelector('#city').value, 'İzmir');
  assert.equal(document.querySelector('#city-value').textContent, 'İzmir');
  assert.equal(document.querySelector('#city-dialog').open, false);
  assert.equal(document.activeElement, trigger);
  close();
});
test('city dialog cancellation retains the selected city and keyboard navigation stays within results', () => {
  const { window, document, close } = setup();
  const city = document.querySelector('#city'), trigger = document.querySelector('#city-trigger');
  city.value = 'İzmir'; city.dispatchEvent(new window.Event('change'));
  trigger.click();
  assert.equal(document.querySelector('.city-option[aria-pressed=true]').dataset.city, 'İzmir');
  const search = document.querySelector('#city-search');
  search.value = 'an'; search.dispatchEvent(new window.Event('input'));
  search.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }));
  const buttons = [...document.querySelectorAll('.city-option')];
  assert.equal(document.activeElement, buttons[0]);
  buttons[0].dispatchEvent(new window.KeyboardEvent('keydown', { key: 'End', bubbles: true, cancelable: true }));
  assert.equal(document.activeElement, buttons.at(-1));
  document.querySelector('.city-cancel').click();
  assert.equal(city.value, 'İzmir'); assert.equal(document.activeElement, trigger);
  assert.equal(trigger.getAttribute('aria-expanded'), 'false');
  trigger.click(); assert.equal(search.value, '');
  assert.equal(document.querySelectorAll('.city-option').length, 81);
  close();
});
test('invalid form focuses city trigger, cards update the summary and editing keeps both choices', () => {
  const { window, document, close } = setup();
  const submit = () => document.querySelector('#brief-form').dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
  submit(); assert.equal(document.activeElement, document.querySelector('#city-trigger'));
  assert.equal(document.querySelector('#city-trigger').getAttribute('aria-invalid'), 'true');
  const city = document.querySelector('#city');city.value = 'Ankara'; city.dispatchEvent(new window.Event('change'));
  submit(); assert.equal(document.activeElement, document.querySelector('input[name=project]'));
  document.querySelector('input[value="Tarımsal sulama GES"]').click();
  assert.equal(document.querySelector('#selection-summary span').textContent, 'Ankara · Tarımsal sulama');
  submit(); assert.match(document.querySelector('#brief-message').textContent, /Ankara.*Tarımsal sulama GES/);
  document.querySelector('#edit-brief').click();
  assert.equal(document.querySelector('input[name=project]:checked').value, 'Tarımsal sulama GES');
  assert.equal(document.querySelector('#city-value').textContent, 'Ankara');
  close();
});

test('all 81 map provinces share the canonical city state; Istanbul has a single selection', () => {
  const {window,document,close}=setup();
  const provinces=[...document.querySelectorAll('[data-province]')];
  assert.equal(provinces.length,81);
  assert.equal(new Set(provinces.map(p=>p.dataset.province)).size,81);
  assert.equal(provinces.filter(p=>p.dataset.province==='İstanbul').length,1);
  for(const province of provinces){
    province.dispatchEvent(new window.MouseEvent('click',{bubbles:true}));
    assert.equal(document.querySelector('#city').value,province.dataset.province);
    assert.equal(document.querySelectorAll('[data-province].is-selected').length,1);
    assert.equal(window.gridSelection.get().city,province.dataset.province);
  }
  document.querySelector('#city').value='İstanbul'; document.querySelector('#city').dispatchEvent(new window.Event('change'));
  assert.equal(document.querySelector('[data-province].is-selected').dataset.province,'İstanbul');
  document.querySelector('#map-city-list').click();
  document.querySelector('#city-search').value='izmir';document.querySelector('#city-search').dispatchEvent(new window.Event('input'));
  document.querySelector('.city-option').click();
  assert.equal(document.querySelector('#map-selection').textContent,'İzmir seçildi.');
  assert.equal(document.activeElement,document.querySelector('#map-city-list'));close();
});
test('advertising browsing is isolated; only the explicit CTA applies each canonical project', () => {
  const {window,document,close}=setup();
  window.HTMLElement.prototype.scrollIntoView=function(){};
  const tabs=[...document.querySelectorAll('[data-tabs=ads] [role=tab]')];
  tabs.forEach(tab=>tab.click());
  assert.equal(window.gridSelection.get().project,'');
  [...document.querySelectorAll('[data-apply-project]')].forEach((button,index)=>{
    tabs[index].click();button.click();
    assert.equal(document.querySelector('input[name=project]:checked').value,window.GridLogic.projects[index]);
    assert.equal(window.gridSelection.get().project,window.GridLogic.projects[index]);
  });close();
});
test('process tabs expose exactly one panel and support arrow, Home and End navigation', () => {
  const { window, document, close } = setup();
  const root = document.querySelector('#sistem');
  assert.equal(document.querySelector('#crm-board'), null);
  const tabs = [...root.querySelectorAll('[role=tab]')];
  function check(index) {
    assert.equal(root.querySelectorAll('[role=tab][aria-selected=true]').length, 1);
    assert.equal(root.querySelectorAll('[role=tabpanel]:not([hidden])').length, 1);
    assert.equal(tabs[index].getAttribute('aria-selected'), 'true');
    assert.equal(document.querySelector(`#${tabs[index].getAttribute('aria-controls')}`).hidden, false);
    assert.equal(tabs[index].tabIndex, 0);
    [...root.querySelectorAll('[role=tabpanel]')].forEach((panel, n) => {
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
test('analysis covers every answer combination with three distinct priorities in the promised order', () => {
  const {window,close}=setup(); const logic=window.GridLogic;
  let combinations=0;
  for(const ads of logic.analysisChoices.ads)for(const tracking of logic.analysisChoices.tracking)for(const response of logic.analysisChoices.response)for(const capacity of logic.analysisChoices.capacity){
    const results=logic.analyze({ads,tracking,response,capacity});
    assert.equal(results.length,3);assert.equal(new Set(results.map(r=>r.id)).size,3);
    const expected=[];
    if(response!=='same-day')expected.push('response');if(capacity!=='ready')expected.push('capacity');
    if(tracking!=='shared')expected.push('tracking');if(ads!=='active')expected.push('campaign');
    expected.push('qualification','creative','review');
    assert.deepEqual(Array.from(results,r=>r.id),expected.slice(0,3));combinations++;
  }
  assert.equal(combinations,81);
  assert.equal(logic.analyze({}).length,0);
  assert.equal(logic.analyze({ads:'invalid',tracking:'shared',response:'same-day',capacity:'ready'}).length,0);
  close();
});
test('analysis is optional, opt-in, reviewable, and invalidated after answer changes', () => {
  const {window,document,close}=setup();
  window.gridSelection.setCity('İzmir');window.gridSelection.setProject(window.GridLogic.projects[0]);
  const baseline="Merhaba Grid Dijital, İzmir bölgesinde Konut ve villa GES alanında müşteri kazanımı için görüşmek istiyorum. Bölgesel Talep Sistemi'nin firmamıza uygunluğunu birlikte değerlendirebilir miyiz?";
  assert.equal(window.GridLogic.buildBrief(window.gridSelection.get()),baseline);
  document.querySelector('#analysis-run').click();
  assert.equal(document.activeElement,document.querySelector('input[name=analysis-ads]'));
  assert.equal(document.querySelector('#analysis-error').hidden,false);
  for(const [key,value] of Object.entries({ads:'none',tracking:'none',response:'late',capacity:'unclear'}))document.querySelector(`input[name="analysis-${key}"][value="${value}"]`).click();
  document.querySelector('#analysis-run').click();
  assert.equal(document.querySelectorAll('#analysis-priorities li').length,3);
  assert.equal(window.GridLogic.buildBrief(window.gridSelection.get()),baseline);
  document.querySelector('#analysis-include').click();
  const submit=()=>document.querySelector('#brief-form').dispatchEvent(new window.Event('submit',{bubbles:true,cancelable:true}));submit();
  let message=document.querySelector('#brief-message').textContent;
  assert.ok(message.startsWith(baseline+'\n\nBaşlangıç önceliklerim:'));
  assert.match(message,/1\. İlk dönüş/);assert.match(message,/2\. Keşif/);assert.match(message,/3\. Başvuruları/);
  assert.equal(new URL(document.querySelector('#whatsapp-link').href).searchParams.get('text'),message);
  document.querySelector('#edit-brief').click();
  document.querySelector('input[name=analysis-response][value=same-day]').click();
  assert.equal(document.querySelector('#analysis-result').hidden,true);
  assert.equal(window.gridSelection.get().analysis.length,0);submit();
  assert.equal(document.querySelector('#brief-message').textContent,baseline);
  document.querySelector('#edit-brief').click();document.querySelector('#analysis-run').click();document.querySelector('#analysis-include').click();
  assert.equal(window.gridSelection.get().analysis.length,3);
  document.querySelector('#analysis-remove').click();assert.equal(window.gridSelection.get().analysis.length,0);
  assert.equal(window.localStorage.length,0);assert.equal(window.sessionStorage.length,0);assert.equal(document.cookie,'');close();
});
test('delivery dialog opens the requested document, switches with keyboard, and restores focus', () => {
  const {window,document,close}=setup();
  const dialog=document.querySelector('#output-dialog');
  for(const button of document.querySelectorAll('[data-output]')){
    button.click();assert.equal(dialog.open,true);
    assert.equal(dialog.querySelector('[role=tab][aria-selected=true]').dataset.outputTab,button.dataset.output);
    document.querySelector('.output-close').click();assert.equal(document.activeElement,button);
  }
  const opener=document.querySelector('[data-output]');opener.click();
  const tab=dialog.querySelector('[role=tab][aria-selected=true]');
  tab.dispatchEvent(new window.KeyboardEvent('keydown',{key:'End',bubbles:true}));
  assert.equal(dialog.querySelector('[role=tab][aria-selected=true]').dataset.outputTab,'review');
  assert.equal(dialog.querySelectorAll('[role=tabpanel]:not([hidden])').length,1);
  assert.equal(dialog.querySelector('form,input'),null);
  assert.match(dialog.querySelector('.output-disclaimer').textContent,/Temsili örnek/);
  close();
});
test('real customer stories have attributed titles and no synthetic CRM records', () => {
  const {document,close}=setup();
  for(const button of document.querySelectorAll('[data-video]')){
    button.click();
    assert.ok(document.querySelector('#video-official-title').textContent.length>30);
    assert.match(document.querySelector('#video-fallback').href,new RegExp(button.dataset.video));
    assert.match(document.querySelector('#video-solution').href,/griddijital\.com/);
    assert.doesNotMatch(document.querySelector('#video-dialog').textContent,/D-101|D-102|D-103/);
    document.querySelector('#video-dialog .close-dialog').click();
  }
  assert.equal(document.querySelectorAll('iframe').length,0);close();
});
