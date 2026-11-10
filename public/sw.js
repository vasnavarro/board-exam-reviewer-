// Service Worker for Dr. Leane DLE Reviewer PWA
// Version 13.0: Network-First navigation & immediate cache-busting
const CACHE_NAME = "dr-leane-dle-v13-dsp-master";
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/icons/apple-touch-icon.png",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(() => { });
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("message", (event) => {
  if (event.data && (event.data.type === "SKIP_WAITING" || event.data.type === "FORCE_PURGE")) {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  // Let cloud sync API and KVdb pass directly through network
  if (event.request.url.includes("/api/") || event.request.url.includes("kvdb.io")) {
    return;
  }

  // 1. Navigation requests (HTML / root): STRICT Network-First to guarantee latest code
  if (event.request.mode === "navigate" || event.request.headers.get("accept")?.includes("text/html")) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match(event.request).then((cached) => cached || caches.match("/index.html"));
        })
    );
    return;
  }

  // 2. Hashed static assets (JS/CSS/Images): Stale-while-revalidate for fast offline performance
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && event.request.method === "GET") {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
