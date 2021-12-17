const CACHE_VERSION = 1;
const CURRENT_CACHE = {
  static: "catch-static-" + CACHE_VERSION,
  dynamic: "catch-dynamic-" + CACHE_VERSION,
};

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CURRENT_CACHE.static).then((cach) => cach.add("../src/offline.html")));
});

self.addEventListener("activate", (e) => {
  let expectedCacheNames = Object.values(CURRENT_CACHE);
  //   e.waitUntil(
  //     caches
  //       .keys()
  //       .then((cachNames) => Promise.all(cashNames.fillter((cashName) => cashName.delete(cashName !== expectedCacheNames))))
  //   );
});

self.addEventListener("fetch", (event) => {
  return event.respondWith(
    caches.match(event.request).then((res) => {
      if (res) return res;
      return fetch(event.request)
        .then((networkRes) => {
          return caches.open(CURRENT_CACHE["dynamic"]).then((cache) => {
            cache.put(event.request, networkRes);
            return networkRes;
          });
        })
        .catch((err) => {
          return caches.open(CURRENT_CACHE["static"]).then((cach) => {
            return caches.match("../src/offline.html");
          });
        });
    })
  );
});
