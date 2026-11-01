import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({ headless:true, ...(process.env.BROWSER_PATH ? {executablePath:process.env.BROWSER_PATH} : {}) });
const base = process.env.QA_URL || 'http://localhost:4317';
const label = process.env.QA_LABEL || 'design-options';
const widths = (process.env.QA_WIDTHS || '320,390,768,1440').split(',').map(Number);
const page = await browser.newPage();
const report = { url:base, browser:browser.version(), widths:[], errors:[] };
page.on('pageerror', error => report.errors.push(error.message));
page.on('console', message => { if (message.type()==='error') report.errors.push(message.text()); });
try {
 for (const width of widths) {
  await page.setViewportSize({width,height:1000});
  const response=await page.goto(`${base}/ray-ornekleri/`,{waitUntil:'networkidle'}); assert.equal(response.status(),200);
  await page.evaluate(()=>document.fonts.ready);
  for(const direction of ['dosya','panel']) {
   await page.locator(`#tab-${direction}`).click();
   const candidate=page.locator(`#${direction}`);
   await candidate.locator('.production-line').scrollIntoViewIfNeeded();
   await page.waitForFunction(name=>!document.querySelector(`#${name} .production-line`).classList.contains('is-offscreen'),direction);
   assert.equal(await page.locator('.candidate:visible').count(),1);
   assert.equal(await page.locator('[role=tab][aria-selected=true]').getAttribute('data-direction'),direction);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
   const track=candidate.locator('.conveyor-track');
   assert.equal(await track.evaluate(e=>getComputedStyle(e).animationDuration),'32s');
   assert.equal(await track.evaluate(e=>getComputedStyle(e).animationPlayState),'running');
   await track.evaluate(e=>e.getAnimations().forEach(a=>a.pause()));
   await candidate.locator('.production-line').screenshot({path:`qa/${label}-${direction}-${width}.png`});
   await track.evaluate(e=>e.getAnimations().forEach(a=>a.play()));
  }
  await page.locator('#tab-panel').focus(); await page.keyboard.press('ArrowLeft');
  assert.equal(await page.locator('#tab-dosya').getAttribute('aria-selected'),'true');
  assert.equal(await page.locator('#tab-dosya').evaluate(e=>e===document.activeElement),true);
  await page.goto(`${base}/#uygunluk`,{waitUntil:'networkidle'});
  await page.locator('.contact-location').scrollIntoViewIfNeeded(); await page.waitForTimeout(850);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  assert.equal(await page.locator('.contact-phone').count(),0);
  assert.equal(await page.locator('.location-phone').getAttribute('href'),'tel:+905515062980');
  assert.equal(await page.locator('.location-phone strong').innerText(),'+90 551 506 29 80');
  const map=new URL(await page.locator('.location-map-link').getAttribute('href'));
  assert.equal(map.searchParams.get('query'),'29 Ekim Cumhuriyet Caddesi No:76-A Keşan Edirne');
  assert.equal(await page.locator('.footer-location').getAttribute('href'),'#location-heading');
  assert.ok((await page.locator('.location-phone').boundingBox()).height>=44);
  assert.ok((await page.locator('.location-map-link').boundingBox()).height>=44);
  await page.locator('.contact-copy').screenshot({path:`qa/${label}-contact-${width}.png`});
  report.widths.push({width,options:true,keyboard:true,contact:true,overflow:false});
 }
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto(`${base}/ray-ornekleri/?yon=panel`,{waitUntil:'networkidle'});
 for(const direction of ['dosya','panel']) {
  await page.locator(`#tab-${direction}`).click();
  assert.equal(await page.locator(`#${direction} .conveyor-track`).evaluate(e=>getComputedStyle(e).animationName),'none');
  assert.equal(await page.locator(`#${direction} .conveyor-group`).nth(1).isVisible(),false);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 }
 report.reducedMotion=true;
 const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:844}});
 const staticPage=await nojs.newPage();await staticPage.goto(base,{waitUntil:'networkidle'});
 assert.equal(await staticPage.locator('.location-phone').getAttribute('href'),'tel:+905515062980');
 assert.equal(await staticPage.locator('.location-map-link').isVisible(),true);
 assert.equal(await staticPage.locator('.official-application a').isVisible(),true);
 assert.equal(await staticPage.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 report.noJavaScriptContact=true; await nojs.close();
 assert.deepEqual(report.errors,[]); report.status='passed';
} catch(error) { report.status='failed';report.failure=error.stack;process.exitCode=1; }
finally { await writeFile(`qa/${label}-report.json`,JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report));await browser.close(); }
