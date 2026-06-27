const CACHE_NAME = 'compras-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './assets/js/main.js',
  './assets/css/style.css',
  './manifest.json',
  './assets/icon/icon-192.png',
  './assets/icon/icon-512.png'
];

// Instala o SW e adiciona ao cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Ativa o novo SW imediatamente para controlar as páginas
self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

// Intercepta requisições e retorna do cache ou faz fetch
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});

// Escuta por mensagens do tipo SKIP_WAITING
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
