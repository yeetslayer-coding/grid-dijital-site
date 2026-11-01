import assert from 'node:assert/strict';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_PATH ? { executablePath: process.env.BROWSER_PATH } : {}) });
const base = process.env.QA_URL || 'http://localhost:4317';
await mkdir('qa', { recursive: true });
const report = process.env.QA_VARIANTS_ONLY ? JSON.parse(await readFile('qa/browser-report.json', 'utf8')) : { browser: browser.version(), viewports: [], variants: {}, reference: [] };
delete report.failure;
report.reference = [];
const errors = [];
const context = await browser.newContext();
await context.addInitScript(() => {
  window.__paints = {};
  const clear = CanvasRenderingContext2D.prototype.clearRect;
  CanvasRenderingContext2D.prototype.clearRect = function(...args) {
    const key = this.canvas.dataset.industrialGrid;
    if (key) window.__paints[key] = (window.__paints[key] || 0) + 1;
    return clear.apply(this, args);
  };
});
const page = await context.newPage();
page.on('pageerror', e => errors.push(e.message));
page.on('console', msg => { if (msg.type() === 'error' && !msg.text().includes('youtube')) errors.push(msg.text()); });
try {
  for (const width of (process.env.QA_VARIANTS_ONLY ? [] : [320, 390, 768, 1440])) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(850);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${width}px overflow`);
    const hiddenPaints = await page.evaluate(() => window.__paints.inverse || 0);
    assert.equal(hiddenPaints, 0, 'offscreen process canvas should not paint');
    await page.screenshot({ path: `qa/grid-${width}-hero.png` });
    await page.locator('#sistem').scrollIntoViewIfNeeded();
    await page.waitForTimeout(850);
    const heights = [];
    for (let index = 0; index < 4; index++) {
      await page.locator('.stage-tab').nth(index).click();
      heights.push(await page.locator('.stage-panels').evaluate(el => el.getBoundingClientRect().height));
      assert.equal(await page.getByRole('tabpanel').count(), 1, 'hidden panels excluded from accessibility tree');
      assert.equal(await page.locator('.stage-panel[inert]').count(), 3);
      const inactiveFocusBlocked = await page.locator('.stage-panel[inert]').first().evaluate(el => { el.focus(); return document.activeElement !== el; });
      assert.ok(inactiveFocusBlocked, 'inert panel rejects programmatic focus');
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${width}px panel ${index} overflow`);
    }
    assert.ok(Math.max(...heights) - Math.min(...heights) < 1, `${width}px panel heights ${heights}`);
    await page.locator('.stage-tab').first().focus();
    await page.keyboard.press('End');
    assert.equal(await page.locator('.stage-tab').last().getAttribute('aria-selected'), 'true');
    assert.equal(await page.locator('.stage-tab').last().evaluate(el => getComputedStyle(el).transitionDuration), '0s');
    await page.locator('#sistem').screenshot({ path: `qa/grid-${width}-process.png` });
    await page.locator('#teklif').scrollIntoViewIfNeeded();
    await page.waitForTimeout(850);
    await page.locator('#teklif').screenshot({ path: `qa/grid-${width}-services.png` });
    await page.locator('#uygunluk').scrollIntoViewIfNeeded();
    await page.waitForTimeout(850);
    await page.locator('#uygunluk').screenshot({ path: `qa/grid-${width}-contact.png` });
    for (const el of await page.locator('.reveal').all()) { await el.scrollIntoViewIfNeeded(); }
    await page.waitForTimeout(850);
    await page.screenshot({ path: `qa/grid-${width}-full.png`, fullPage: true });
    report.viewports.push({ width, overflow: false, panelHeights: heights, activePanels: 1, inertPanels: 3, hiddenFocusBlocked: true, keyboardInstant: true, blur: await page.locator('.header').evaluate(el => getComputedStyle(el).backdropFilter) });
  }
  console.log('Viewport checks complete; checking interaction variants.');
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.locator('.motion-toggle').click();
  assert.equal(await page.locator('.conveyor-track').evaluate(el => getComputedStyle(el).animationPlayState), 'paused');
  await page.locator('.motion-toggle').click();
  assert.equal(await page.locator('.conveyor-track').evaluate(el => getComputedStyle(el).animationPlayState), 'running');
  await page.locator('#city').selectOption('İzmir');
  await page.getByText('Ticari çatı', { exact: true }).click();
  await page.locator('button.form-button').click();
  assert.equal(await page.locator('#brief-result').isVisible(), true);
  assert.match(await page.locator('#whatsapp-link').getAttribute('href'), /wa.me\/905515062980\?text=/);
  // Check actual native dialog focus/cleanup. External playback depends on YouTube and is not asserted.
  await page.route('https://www.youtube-nocookie.com/**', route => route.fulfill({ status: 200, contentType: 'text/html', body: '<title>Video transport stub</title>' }));
  await page.locator('[data-video]').first().focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.locator('dialog').evaluate(el => el.open), true);
  assert.equal(await page.locator('dialog').evaluate(el => getComputedStyle(el).transitionDuration), '0s');
  await page.keyboard.press('Escape');
  await page.locator('iframe').waitFor({ state: 'detached' });
  assert.equal(await page.locator('iframe').count(), 0);
  assert.equal(await page.locator('[data-video]').first().evaluate(el => el === document.activeElement), true);
  report.variants.interactions = { conveyorPause: true, localBrief: true, keyboardDialogAndEscape: true, iframePlayback: 'not tested: transport stubbed' };
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(base, { waitUntil: 'networkidle' });
  const firstFrame = await page.locator('canvas').first().evaluate(el => el.toDataURL());
  await page.waitForTimeout(250);
  assert.equal(await page.locator('canvas').first().evaluate(el => el.toDataURL()), firstFrame);
  assert.equal(await page.locator('.conveyor-track').evaluate(el => getComputedStyle(el).animationName), 'none');
  assert.equal(await page.locator('canvas').first().getAttribute('data-motion'), 'reduced');
  await page.screenshot({ path: 'qa/grid-reduced-motion.png' });
  report.variants.reducedMotion = { staticGrid: true, staticConveyor: true };
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  // Simulate lack of backdrop-filter feature support at the stylesheet gate, retaining real fallback CSS.
  await page.route('**/styles.css', async route => { const response = await route.fetch(); const css = (await response.text()).replace('@supports ((backdrop-filter:blur(1px)) or (-webkit-backdrop-filter:blur(1px)))', '@supports (unsupported-grid-property: unsupported)'); await route.fulfill({ response, body: css }); });
  await page.reload({ waitUntil: 'networkidle' });
  assert.equal(await page.locator('.header').evaluate(el => getComputedStyle(el).backdropFilter), 'none');
  assert.ok(!(await page.locator('.header').evaluate(el => getComputedStyle(el).backgroundImage)).includes('rgba'));
  await page.waitForTimeout(850);
  await page.screenshot({ path: 'qa/grid-opaque-fallback.png' });
  report.variants.blurFallback = { simulatedUnsupportedGate: true, opaqueSurface: true };
  await page.unroute('**/styles.css');
  const touch = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 3 });
  const mobile = await touch.newPage();
  await mobile.goto(base, { waitUntil: 'networkidle' });
  await mobile.locator('.menu-button').tap();
  assert.equal(await mobile.locator('.navigation').isVisible(), true);
  await mobile.locator('.navigation a').first().tap();
  assert.equal(await mobile.locator('.navigation').isVisible(), false);
  await mobile.locator('.stage-tab').nth(1).tap();
  assert.equal(await mobile.locator('.stage-tab').nth(1).getAttribute('aria-selected'), 'true');
  assert.equal(await mobile.locator('canvas').first().evaluate(el => el.width / el.getBoundingClientRect().width), 1.5);
  assert.notEqual(await mobile.locator('canvas').first().getAttribute('data-pointer'), 'magnetic');
  report.variants.touch = { mobileEmulation: true, menu: true, tabs: true, dprCap: 1.5, magneticPointer: false };
  await touch.close();
  const nojs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const staticPage = await nojs.newPage();
  await staticPage.goto(base, { waitUntil: 'networkidle' });
  assert.equal(await staticPage.getByRole('tabpanel').count(), 4);
  assert.equal(await staticPage.locator('.stage-tabs').isVisible(), false);
  assert.equal(await staticPage.locator('.navigation').isVisible(), true);
  assert.equal(await staticPage.locator('#brief-form').isVisible(), false);
  assert.equal(await staticPage.locator('noscript a[href*="youtube.com/watch"]').count(), 4);
  assert.equal(await staticPage.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
  await staticPage.screenshot({ path: 'qa/grid-no-js.png', fullPage: true });
  report.variants.noJavaScript = { fourReadablePanels: true, navigation: true, officialContact: true, directVideoLinks: 4, overflow: false };
  await nojs.close();
  console.log('Variants complete; capturing Perakende reference.');
  const reference = await browser.newPage();
  for (const width of [320, 390, 768, 1440]) {
    await reference.setViewportSize({ width, height: 1000 });
    await reference.goto('https://perakendedijital.com/', { waitUntil: 'domcontentloaded' });
    await reference.evaluate(() => document.fonts.ready);
    await reference.waitForTimeout(1000);
    await reference.screenshot({ path: `qa/perakende-${width}-hero.png` });
    report.reference.push({ width, url: reference.url(), heading: await reference.locator('h1').innerText() });
  }
  assert.deepEqual(errors, []);
  report.consoleErrors = errors;
  report.status = 'passed';
} catch (error) {
  report.status = 'failed'; report.failure = error.stack; console.error(error); process.exitCode = 1;
  await page.screenshot({ path: 'qa/failure.png', fullPage: true }).catch(() => {});
} finally {
  await writeFile('qa/browser-report.json', JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  await browser.close();
}
