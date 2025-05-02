const CACHE_NAME = 'compras-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './assets/js/script.js',
  './manifest.json',
  './assets/icon/icon-192.png',
  './assets/icon/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(resp => resp || fetch(event.request))
  );
});
