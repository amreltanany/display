/* Display Egypt service worker.
   Pages: network first (always fresh), cached copy when offline, /offline/ as the last resort.
   Same-origin images, CSS, JS, fonts: stale-while-revalidate (instant, refreshed in the background).
   Bump VERSION to drop old caches. */
const VERSION = 'de-v1';
const CORE = ['/offline/', '/assets/images/logo-dea-light.webp', '/assets/icons/icon-192.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  if (req.headers.has('range') || url.pathname.startsWith('/assets/video/')) return; // video: let the browser stream it

  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => {
          if (res.ok) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); }
          return res;
        })
        .catch(() => caches.match(req).then((hit) => hit || caches.match('/offline/')))
    );
    return;
  }

  e.respondWith(
    caches.open(VERSION).then((cache) =>
      cache.match(req).then((hit) => {
        const refresh = fetch(req).then((res) => { if (res.ok) cache.put(req, res.clone()); return res; }).catch(() => hit);
        return hit || refresh;
      })
    )
  );
});
