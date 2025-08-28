// Service Worker para Álbum PWA
const \1-vFIX\2;
const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './offline.html',
  './icons/icon.svg'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (e) => {
  const req = e.request;

  // Navegaciones: network-first con fallback offline
  if (req.mode === 'navigate') {
    e.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        const cache = await caches.open(CACHE_NAME);
        cache.put('./', fresh.clone());
        return fresh;
      } catch (err) {
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match('./index.html');
        return cached || cache.match('./offline.html');
      }
    })());
    return;
  }

  // Imágenes y videos: stale-while-revalidate
  if (req.destination === 'image' || req.destination === 'video') {
    e.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(req);
      const fetchAndPut = fetch(req).then(res => {
        // Cachea respuestas (incluye opaque para CORS)
        cache.put(req, res.clone());
        return res;
      }).catch(() => cached);
      return cached || fetchAndPut;
    })());
    return;
  }

  // Por defecto: cache-first fallback a network
  e.respondWith(caches.match(req).then(c => c || fetch(req)));
});
