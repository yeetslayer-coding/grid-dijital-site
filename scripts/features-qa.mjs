import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser=await chromium.launch({headless:true,...(process.env.BROWSER_PATH?{executablePath:process.env.BROWSER_PATH}:{})});
const base=process.env.QA_URL||'http://localhost:4317', label=process.env.QA_LABEL||'six-features';
const widths=(process.env.QA_WIDTHS||'320,390,768,1440').split(',').map(Number);
await mkdir('qa',{recursive:true});
const report={url:base,browser:browser.version(),viewports:[],variants:{},errors:[],externalRequests:[]};
const page=await browser.newPage();
page.on('pageerror',e=>report.errors.push(e.message));
page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});
page.on('request',r=>{if(!r.url().startsWith(base)&&!r.url().startsWith('data:'))report.externalRequests.push(r.url());});
const shot=async(selector,name)=>{const element=page.locator(selector);await element.scrollIntoViewIfNeeded();await page.waitForTimeout(300);await element.screenshot({path:`qa/${label}-${name}.png`});};
const fits=async()=>assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'page overflow');
async function windowFits(selector){const box=await page.locator(selector).boundingBox();const viewport=page.viewportSize();assert.ok(box.y>=-1&&box.y+box.height<=viewport.height+1&&box.x>=-1&&box.x+box.width<=viewport.width+1,JSON.stringify({selector,box,viewport}));}
try{
for(const width of widths){
 await page.setViewportSize({width,height:1000});assert.equal((await page.goto(base,{waitUntil:'networkidle'})).status(),200);await page.evaluate(()=>document.fonts.ready);
 assert.equal(await page.locator('iframe').count(),0);await fits();
 // Ad browsing neither selects nor submits. Every panel keeps the shared height.
 const adTabs=page.locator('[data-tabs=ads] [role=tab]');const heights=[];
 for(let n=0;n<4;n++){
  await adTabs.nth(n).click();const panel=page.locator('.ad-panel:not([hidden])');
  await panel.locator('img').evaluate(image=>image.decode());heights.push((await panel.boundingBox()).height);
  assert.equal(await page.locator('input[name=project]:checked').count(),0);
  assert.equal(await page.locator('.ad-panel[hidden][inert][aria-hidden=true]').count(),3);
  assert.ok(await page.locator('.ad-panel[hidden]').evaluateAll(panels=>panels.every(panel=>getComputedStyle(panel).visibility==='hidden')));
  await shot('#cozumler',`${width}-ad-${n}`);await fits();
 }
 assert.ok(Math.max(...heights)-Math.min(...heights)<1,'ad height changed');
 await adTabs.last().focus();await page.keyboard.press('Home');assert.equal(await adTabs.first().getAttribute('aria-selected'),'true');
 await page.keyboard.press('End');assert.equal(await adTabs.last().getAttribute('aria-selected'),'true');
 await page.locator('.ad-panel:not([hidden]) [data-apply-project]').click();
 assert.equal(await page.locator('input[name=project]:checked').inputValue(),'Tarımsal sulama GES');
 // Genuine pointer event on SVG geometry, followed by the equivalent list path.
 await page.locator('[data-province="Konya"]').click();assert.equal(await page.locator('#city').inputValue(),'Konya');
 assert.equal(await page.locator('[data-province].is-selected').count(),1);
 await page.locator('#map-city-list').click();await page.locator('#city-search').fill('istanbul');await page.locator('#city-search').press('Enter');await page.locator('#city-dialog').waitFor({state:'hidden'});
 assert.equal(await page.locator('[data-province].is-selected').getAttribute('data-province'),'İstanbul');
 assert.equal(await page.locator('#map-city-list').evaluate(e=>e===document.activeElement),true);
 await shot('.region-map',`${width}-map`);
 // Optional means the unanalysed base brief still works exactly as before.
 await page.locator('button.form-button').click();const baseline=await page.locator('#brief-message').innerText();assert.ok(!baseline.includes('önceliklerim'));
 await page.locator('#edit-brief').click();
 await page.locator('#startup-analysis summary').click();await page.locator('#analysis-run').click();assert.equal(await page.locator('input[name=analysis-ads]').first().evaluate(e=>e===document.activeElement),true);
 for(const [key,value] of Object.entries({ads:'none',tracking:'none',response:'late',capacity:'unclear'}))await page.locator(`input[name="analysis-${key}"][value="${value}"]`).check();
 await page.locator('#analysis-run').click();assert.equal(await page.locator('#analysis-priorities li').count(),3);assert.equal(await page.evaluate(()=>window.gridSelection.get().analysis.length),0);
 await page.locator('#analysis-include').click();await shot('#analysis-result',`${width}-analysis`);
 await page.locator('button.form-button').click();let message=await page.locator('#brief-message').innerText();assert.ok(message.startsWith(baseline+'\n\nBaşlangıç önceliklerim:'));
 assert.equal(new URL(await page.locator('#whatsapp-link').getAttribute('href')).searchParams.get('text'),message);await shot('#brief-result',`${width}-brief`);
 await page.locator('#edit-brief').click();await page.locator('input[name=analysis-response][value=same-day]').check();assert.equal(await page.locator('#analysis-result').isVisible(),false);
 await page.locator('button.form-button').click();assert.equal(await page.locator('#brief-message').innerText(),baseline);await page.locator('#edit-brief').click();
 await page.locator('#startup-analysis summary').click();await shot('#uygunluk',`${width}-contact`);
 // CRM uses local fixtures and updates counts, next task and terminal state.
 const before=await page.evaluate(()=>JSON.stringify(window.gridSelection.get()));
 await shot('#sistem',`${width}-crm`);const crmHeight=(await page.locator('.crm-shell').boundingBox()).height;
 for(const id of ['D-101','D-102','D-103']){
  await page.locator(`[data-record="${id}"]`).click();
  while(!await page.locator('#crm-advance').isDisabled())await page.locator('#crm-advance').click();
 }
 assert.deepEqual(await page.locator('.crm-count').allTextContents(),['0','0','0','3']);
 assert.equal(await page.evaluate(()=>JSON.stringify(window.gridSelection.get())),before);
 const crmFinalHeight=(await page.locator('.crm-shell').boundingBox()).height;
 assert.ok(Math.abs(crmFinalHeight-crmHeight)<1, 'CRM height changed');
 await page.locator('#crm-reset').click();assert.deepEqual(await page.locator('.crm-count').allTextContents(),['1','1','1','0']);
 // Delivery dialog stays in the viewport while background scroll settles.
 await page.locator('[data-output=tracking]').click();await page.waitForTimeout(350);await windowFits('#output-dialog');
 assert.equal(await page.locator('#output-dialog [role=tab][aria-selected=true]').getAttribute('data-output-tab'),'tracking');
 const docHeights=[];
 for(let n=0;n<4;n++){
  await page.locator('#output-dialog [role=tab]').nth(n).click();
  docHeights.push((await page.locator('#output-dialog .tab-stack').boundingBox()).height);
  assert.equal(await page.locator('#output-dialog').evaluate(e=>e.scrollWidth<=e.clientWidth),true,'dialog overflow');
  await page.screenshot({path:`qa/${label}-${width}-document-${n}.png`});
 }
 assert.ok(Math.max(...docHeights)-Math.min(...docHeights)<1,'document stack height changed');
 await page.locator('#output-dialog [role=tab]').first().focus();await page.keyboard.press('End');assert.equal(await page.locator('#output-tab-review').getAttribute('aria-selected'),'true');
 for(let n=0;n<10;n++){await page.keyboard.press('Tab');assert.equal(await page.locator('#output-dialog').evaluate(e=>e.contains(document.activeElement)||document.activeElement===document.body),true);}
 await page.locator('#output-tab-review').focus();await page.keyboard.press('Escape');await page.locator('#output-dialog').waitFor({state:'hidden'});assert.equal(await page.locator('[data-output=tracking]').evaluate(e=>e===document.activeElement),true);
 await fits();report.viewports.push({width,overflow:false,adHeights:heights,documentHeights:docHeights,crmHeight,crmFinalHeight,map:true,analysis:true,projectTransfer:true,crm:true,outputKeyboard:true});console.log(`${width}px six features passed`);
}
assert.deepEqual(report.externalRequests,[],'no automatic external requests');
await page.route('https://www.youtube-nocookie.com/**',route=>route.fulfill({status:200,contentType:'text/html',body:'<title>Video QA stub</title>'}));
for(let n=0;n<4;n++){
 await page.locator('[data-video]').nth(n).click();await page.waitForTimeout(300);await windowFits('#video-dialog');
 assert.ok((await page.locator('#video-official-title').innerText()).length>30);
 await page.screenshot({path:`qa/${label}-story-${n}.png`});await page.keyboard.press('Escape');await page.locator('#video-dialog').waitFor({state:'hidden'});await page.locator('iframe').waitFor({state:'detached'});assert.equal(await page.locator('iframe').count(),0);
}
report.variants.customerVideo='Four attributed dossiers; lifecycle checked with transport stub; external playback not tested.';
await page.emulateMedia({reducedMotion:'reduce'});await page.locator('[data-output]').first().click();assert.equal(await page.locator('#output-dialog').evaluate(e=>getComputedStyle(e).transform),'none');await page.keyboard.press('Escape');await page.locator('#output-dialog').waitFor({state:'hidden'});
report.variants.reducedMotion=true;
await page.emulateMedia({reducedMotion:'no-preference'});await page.locator('[data-output]').first().focus();await page.keyboard.press('Enter');assert.equal(await page.locator('#output-dialog').evaluate(e=>getComputedStyle(e).transitionDuration),'0s');await page.keyboard.press('Escape');await page.locator('#output-dialog').waitFor({state:'hidden'});
report.variants.instantKeyboard=true;
const touch=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const mobile=await touch.newPage();await mobile.goto(base,{waitUntil:'networkidle'});
await mobile.locator('#map-city-list').tap();await mobile.locator('#city-search').fill('sanliurfa');await mobile.locator('.city-option').tap();await mobile.locator('#city-dialog').waitFor({state:'hidden'});
assert.equal(await mobile.locator('#map-selection').innerText(),'Şanlıurfa seçildi.');await mobile.locator('[data-output=application]').tap();await mobile.waitForTimeout(300);const box=await mobile.locator('#output-dialog').boundingBox();assert.ok(box.y>=0&&box.y+box.height<=845);await mobile.screenshot({path:`qa/${label}-touch-document.png`});await touch.close();report.variants.touch='Chromium touch emulation; not physical device testing.';
const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:844}});const staticPage=await nojs.newPage();await staticPage.goto(base,{waitUntil:'networkidle'});
assert.equal(await staticPage.locator('.ad-panel:visible').count(),4);assert.equal(await staticPage.locator('.crm-record:visible').count(),3);assert.equal(await staticPage.locator('#brief-form').isVisible(),false);assert.equal(await staticPage.locator('.official-application a').isVisible(),true);assert.equal(await staticPage.locator('.location-phone').isVisible(),true);assert.equal(await staticPage.locator('.conveyor-object:visible').count(),5);assert.ok(await staticPage.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await staticPage.locator('#sistem').screenshot({path:`qa/${label}-nojs-crm.png`});await nojs.close();report.variants.noJavaScript=true;
// Simulate unsupported blur at the computed-style level; no engine capability claim.
await page.addStyleTag({content:'.liquid-glass{background:var(--glass-solid)!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important}'});await shot('#cozumler','opaque-glass');report.variants.opaqueGlass='CSS fallback simulated and visually inspected';
assert.deepEqual(report.errors,[]);report.status='passed';
}catch(error){report.status='failed';report.failure=error.stack;console.error(error);process.exitCode=1;await page.screenshot({path:`qa/${label}-failure.png`,fullPage:true}).catch(()=>{});
}finally{await writeFile(`qa/${label}-report.json`,JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report));await browser.close();}
