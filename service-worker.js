const CACHE_NAME = "interest-calculator-cache-v1";
const urlsToCache = [
  "index.html",
  "styles.css",
  "script.js",
  "icons/icon-192x192.png",
  "icons/icon-512x512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("interest-calculator-cache-v1").then((cache) => {
      return cache.addAll([
        "./index.html",
        "./styles.css",
        "./script.js",
        "./icons/icon-192x192.png",
        "./icons/icon-512x512.png",
        "./manifest.json"
      ]);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== "interest-calculator-cache-v1") {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
