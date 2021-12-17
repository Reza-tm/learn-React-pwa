const CACHE_VERSION = 1;
const CURRENT_CACHE = {
  static: "catch-static-" + CACHE_VERSION,
  dynamic: "catch-dynamic-" + CACHE_VERSION,
};

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CURRENT_CACHE.static)
      .then((cache) =>
        cache.addAll([
          "/",
          "/static/js/bundle.js",
          "/build/react_devtools_backend.js",
          "/js/dom.js",
          "/js/js.js",
          "/ws",
          "/sw.js",
        ])
      )
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      } else {
        return fetch(event.request);
      }
    })
  );
});
