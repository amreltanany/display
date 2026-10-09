import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
const dir = process.argv[2] || 'out';
const d = (f, m) => `data:${m};base64,` + fs.readFileSync(`${dir}/${f}`).toString('base64');
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1800, height: 1010 });
const cell = (inner, bg) => `<div style="position:relative;width:900px;height:502px;background:${bg};overflow:hidden">${inner}</div>`;
const img = (s) => `<img src="${s}" style="position:absolute;inset:0;width:100%;height:100%">`;
await page.setContent(`<body style="margin:0;display:grid;grid-template-columns:900px 900px;gap:2px;background:#fff">
${cell(img(d('hero-sky.jpg', 'image/jpeg')), '#000')}
${cell(img(d('hero-letters.png', 'image/png')), '#e0107a')}
${cell(img(d('hero-fg.png', 'image/png')), '#10c050')}
${cell(img(d('hero-sky.jpg', 'image/jpeg')) + img(d('hero-letters.png', 'image/png')) + img(d('hero-fg.png', 'image/png')), '#000')}
</body>`);
await new Promise((r) => setTimeout(r, 800));
await page.screenshot({ path: `${dir}/sheet.png` });
await browser.close();
