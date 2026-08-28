const CACHE_NAME = "rop-cache-v1";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.webmanifest"
];

// Install
self.addEventListener("install", (event) => {
    console.log("[RoP SW] Installing...");

    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("[RoP SW] Caching RoP files...");
            return cache.addAll(FILES_TO_CACHE);
        })
    );

    self.skipWaiting();
});

// Activate
self.addEventListener("activate", (event) => {
    console.log("[RoP SW] Activated!");

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log(
                            "[RoP SW] Removing old cache:",
                            cacheName
                        );

                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );

    self.clients.claim();
});

// Fetch
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }

            return fetch(event.request);
        })
    );
});
