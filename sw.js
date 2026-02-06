const CACHE_NAME = 'zen-abyss-v17-original';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://cdn.pixabay.com/audio/2022/03/10/audio_784d168582.mp3',
  'https://cdn.pixabay.com/audio/2021/08/04/audio_0625c1539c.mp3'
];

// Installs the service worker and caches your original assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Intercepts network requests to serve from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

