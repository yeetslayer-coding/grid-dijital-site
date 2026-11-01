import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
const source = readFileSync(new URL('../dist/grid-motion.js', import.meta.url), 'utf8');
function grid({ reduced = false, fine = true } = {}) {
  const dom = new JSDOM('<canvas data-industrial-grid="page"></canvas><canvas data-industrial-grid="inverse"></canvas>', { runScripts: 'outside-only', pretendToBeVisual: true });
  const w = dom.window, frames = new Map(), paints = new Map(), medias = new Map();
  let id = 0, observe, hidden = false;
  Object.defineProperty(w.document, 'hidden', { get: () => hidden });
  Object.defineProperty(w, 'devicePixelRatio', { value: 3 });
  w.matchMedia = query => {
    const listeners = new Set();
    const media = { matches: query.includes('reduced-motion') ? reduced : fine, addEventListener: (_, cb) => listeners.add(cb), removeEventListener: (_, cb) => listeners.delete(cb), change(value) { this.matches = value; listeners.forEach(cb => cb({ matches: value })); } };
    medias.set(query, media); return media;
  };
  w.requestAnimationFrame = cb => { frames.set(++id, cb); return id; };
  w.cancelAnimationFrame = key => frames.delete(key);
  w.ResizeObserver = class { observe() {} disconnect() {} };
  w.IntersectionObserver = class { constructor(cb) { observe = cb; } observe() {} disconnect() {} };
  const canvases = [...w.document.querySelectorAll('canvas')];
  canvases.forEach(canvas => {
    canvas.getBoundingClientRect = () => ({ width: 300, height: 200, left: 0, top: 0 });
    canvas.getContext = () => ({ clearRect() { paints.set(canvas, (paints.get(canvas) || 0) + 1); }, setTransform() {}, beginPath() {}, moveTo() {}, lineTo() {}, quadraticCurveTo() {}, stroke() {}, fillRect() {}, createRadialGradient() { return { addColorStop() {} }; } });
  });
  w.eval(source);
  return { w, canvases, frames, paints, medias,
    intersect(index, visible) { observe([{ target: canvases[index], isIntersecting: visible }]); },
    tick(time) { const pending = [...frames.values()]; frames.clear(); pending.forEach(cb => cb(time)); },
    hide(value) { hidden = value; w.document.dispatchEvent(new w.Event('visibilitychange')); },
    move(type) { const e = new w.Event('pointermove'); Object.assign(e, { pointerType: type, clientX: 80, clientY: 80 }); w.dispatchEvent(e); },
    close() { w.dispatchEvent(new w.PageTransitionEvent('pagehide')); w.close(); }
  };
}
test('grid caps DPR, skips offscreen drawing and cancels the loop in a hidden document', () => {
  const g = grid();
  assert.equal(g.canvases[0].width, 450);
  g.tick(100); assert.equal(g.paints.size, 0);
  g.intersect(0, true); g.tick(150);
  assert.ok(g.paints.get(g.canvases[0]) > 0);
  assert.equal(g.paints.get(g.canvases[1]), undefined);
  g.hide(true); assert.equal(g.frames.size, 0);
  assert.equal(g.canvases[0].dataset.motion, 'paused');
  g.hide(false); assert.equal(g.frames.size, 1);
  g.close(); assert.equal(g.frames.size, 0);
});
test('reduced motion paints once without a frame loop and coarse/touch input cannot activate magnetic behavior', () => {
  const g = grid({ reduced: true, fine: false });
  g.intersect(0, true);
  assert.equal(g.frames.size, 0);
  assert.equal(g.canvases[0].dataset.motion, 'reduced');
  assert.equal(g.paints.get(g.canvases[0]), 1);
  g.move('touch'); assert.notEqual(g.canvases[0].dataset.pointer, 'magnetic');
  g.medias.get('(prefers-reduced-motion: reduce)').change(false);
  g.move('mouse'); assert.notEqual(g.canvases[0].dataset.pointer, 'magnetic');
  g.medias.get('(hover: hover) and (pointer: fine)').change(true);
  g.move('touch'); assert.notEqual(g.canvases[0].dataset.pointer, 'magnetic');
  g.move('mouse'); assert.equal(g.canvases[0].dataset.pointer, 'magnetic');
  g.medias.get('(prefers-reduced-motion: reduce)').change(true);
  assert.equal(g.frames.size, 0);
  g.close();
});
test('drawing is throttled to at most 30fps for fine pointers and 24fps for coarse pointers', () => {
  for (const [fine, cap] of [[true, 30], [false, 24]]) {
    const g = grid({ fine }); g.intersect(0, true);
    for (let time = 1; time <= 1000; time += 1000 / 120) g.tick(time);
    const count = g.paints.get(g.canvases[0]);
    assert.ok(count > 15 && count <= cap, `${fine ? 'fine' : 'coarse'} drew ${count} times`);
    g.close();
  }
});
