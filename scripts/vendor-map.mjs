// Build-time only. Keep only province path geometry; never execute the upstream page.
import { writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
const source = 'https://raw.githubusercontent.com/dnomak/svg-turkiye-haritasi/master/';
const response = await fetch(source + 'index.html');
assert.ok(response.ok);
const doc = new JSDOM(await response.text()).window.document;
const provinces = new Map();
for (const group of doc.querySelectorAll('g[data-plakakodu]')) {
  const plate = Number(group.getAttribute('data-plakakodu'));
  if (plate < 1 || plate > 81) continue;
  const entry = provinces.get(plate) || { plate, name: group.getAttribute('data-iladi').replace(/ \(.+\)/, ''), paths: [] };
  entry.paths.push(...[...group.querySelectorAll('path')].map(path => path.getAttribute('d')));
  provinces.set(plate, entry);
}
assert.equal(provinces.size, 81);
const list = [...provinces.values()].sort((a,b) => a.plate-b.plate);
const attribution = 'Geometry: 6F-6C-63-61-79, Turkey provinces blank gray.svg, Wikimedia Commons, CC BY-SA 3.0. Adapted through dnomak/svg-turkiye-haritasi (MIT). Grid adaptation: Istanbul merged, non-Turkish regions omitted, IDs and presentation simplified. Adapted map geometry remains CC BY-SA 3.0.';
await writeFile('dist/assets/maps/turkiye.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1007.478 527.323" fill="#d8dad5" stroke="#f4f4f2"><title>Türkiye'nin 81 ili</title><metadata>${attribution} https://creativecommons.org/licenses/by-sa/3.0/</metadata>${list.map(p => `<g id="province-${p.plate}">${p.paths.map(d => `<path d="${d}"/>`).join('')}</g>`).join('')}</svg>\n`);
await writeFile('dist/assets/maps/provinces.json', JSON.stringify(list.map(({plate,name})=>({plate,name})), null, 2)+'\n');
const licenseResponse = await fetch(source+'LICENSE');
assert.ok(licenseResponse.ok);
await writeFile('dist/assets/maps/LICENSE.txt', `${attribution}\n\nOriginal geometry: https://commons.wikimedia.org/wiki/File:Turkey_provinces_blank_gray.svg\nLicense: https://creativecommons.org/licenses/by-sa/3.0/\nAdaptation source: https://github.com/dnomak/svg-turkiye-haritasi\n\n${await licenseResponse.text()}`);
console.log(`Vendored ${list.length} provinces; Istanbul has ${provinces.get(34).paths.length} paths.`);
