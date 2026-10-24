// GitHub Pages serves this project under /display/, but the site uses root-absolute paths.
// Run after `astro build`: prefixes every root path in dist so the preview works from a sub-folder.
import fs from 'node:fs';
import path from 'node:path';
const P = '/display';
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
for (const f of walk('dist')) {
  const ext = path.extname(f);
  if (!['.html', '.css', '.js'].includes(ext)) continue;
  let s = fs.readFileSync(f, 'utf8');
  s = s
    .replace(/(\b(?:href|src|poster|action)=["'])\/(?!\/)/g, `$1${P}/`)
    .replace(/(&quot;|["'`])\/(assets|uploads|favicon)/g, `$1${P}/$2`)
    .replace(/url\((["']?)\/(?!\/)/g, `url($1${P}/`);
  fs.writeFileSync(f, s);
}
fs.copyFileSync('dist/404.html', 'dist/404.html');
console.log('prefixed with', P);
