const CACHE_VERSION = 6;
const CURRENT_CACHE = {
  static: "cache-static-" + CACHE_VERSION,
  dynamic: "cache-dynamic-" + CACHE_VERSION,
};

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CURRENT_CACHE.static)
      .then((cache) =>
        cache.addAll([
          "/",
          "/offline.js",
          "/static/js/bundle.js",
          "/build/react_devtools_backend.js",
          "/js/dom.js",
          "/js/js.js",
          "/sw.js",
          "https://httpbin.org/get",
        ])
      )
  );
});

self.addEventListener("activate", (event) =>
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CURRENT_CACHE.dynamic && cacheName !== CURRENT_CACHE.static) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  )
);

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) =>
      response
        ? response
        : fetch(event.request)
            .then((res) =>
              caches.open(CURRENT_CACHE.dynamic).then((cache) => {
                cache.put(event.request.url, res.clone());
                return res;
              })
            )
            .catch((err) => caches.open(CURRENT_CACHE.static).then((response) => response.match("/offline.html")))
    )
  );
});
