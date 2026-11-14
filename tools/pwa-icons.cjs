// Generates the PWA icons from the logo mark: red background + white monogram.
const sharp = require('sharp');
const path = require('path');
const out = path.join(__dirname, '..', 'public', 'assets', 'icons');
require('fs').mkdirSync(out, { recursive: true });
const mark = path.join(__dirname, '..', 'public', 'assets', 'images', 'logo-mark.webp');
async function icon(size, name, markRatio, radius = 0) {
  const w = Math.round(size * markRatio);
  const m = await sharp(mark).resize({ width: w }).png().toBuffer();
  let img = sharp({ create: { width: size, height: size, channels: 4, background: '#ff0000' } }).composite([{ input: m, gravity: 'center' }]);
  if (radius) {
    const mask = Buffer.from(`<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="#fff"/></svg>`);
    img = sharp(await img.png().toBuffer()).composite([{ input: mask, blend: 'dest-in' }]);
  }
  await img.png().toFile(path.join(out, name));
  console.log(name, size);
}
(async () => {
  await icon(192, 'icon-192.png', 0.62);
  await icon(512, 'icon-512.png', 0.62);
  await icon(512, 'icon-maskable-512.png', 0.5); // maskable: keep the mark inside the safe zone
  await icon(180, 'apple-touch-icon.png', 0.62);
})();
