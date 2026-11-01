const {chromium}=await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
const browser=await chromium.launch({headless:true,...(process.env.BROWSER_PATH?{executablePath:process.env.BROWSER_PATH}:{})});
const base=process.env.QA_URL||'http://localhost:4317',label=process.env.QA_LABEL||'six-features-dossiers';
const report={url:base,browser:browser.version(),viewports:[],errors:[]};
try {
for(const width of [390,1440]){
 const page=await browser.newPage({viewport:{width,height:844}});
 page.on('pageerror',e=>report.errors.push(e.message));
 await page.route('https://www.youtube-nocookie.com/**',r=>r.fulfill({status:200,contentType:'text/html',body:'<title>Video transport stub</title>'}));
 await page.goto(base,{waitUntil:'networkidle'});
 for(let n=0;n<4;n++){
  const opener=page.locator('[data-video]').nth(n);
  await opener.click();await page.waitForTimeout(300);
  const bounds=await page.locator('#video-dialog').boundingBox();assert.ok(bounds.y>=0&&bounds.y+bounds.height<=845);
  assert.equal(await page.locator('#video-dialog').evaluate(el=>el.scrollWidth<=el.clientWidth),true);
  await page.screenshot({path:`qa/${label}-${width}-${n}.png`});
  await page.locator('#video-fallback').scrollIntoViewIfNeeded();
  const closeButton=page.locator('#video-dialog .close-dialog');const closeBox=await closeButton.boundingBox();assert.ok(closeBox.y>=0&&closeBox.y+closeBox.height<=845);
  await closeButton.click();await page.locator('iframe').waitFor({state:'detached'});assert.equal(await opener.evaluate(el=>el===document.activeElement),true);
 }
 report.viewports.push({width,dossiers:4,dialogBounds:true,stickyClose:true,focusReturn:true});await page.close();
}
assert.deepEqual(report.errors,[]);report.status='passed';report.scope='Lifecycle and layout only; video transport stubbed, playback not tested.';
} catch(error){report.status='failed';report.failure=error.stack;process.exitCode=1;}
finally{await writeFile(`qa/${label}-report.json`,JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report));await browser.close();}
