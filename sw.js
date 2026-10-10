const CACHE_NAME = "minkowski-sim-v2";
const ASSETS = ["./", "./index.html", "./script.js", "./manifest.json", "./icon.svg"];
const NETWORK_FIRST = ["index.html", "script.js"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  const name = url.pathname.split("/").pop();
  const isNetworkFirst = req.mode === "navigate" || name === "" || NETWORK_FIRST.includes(name);

  if (isNetworkFirst) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match("./index.html")))
    );
  } else {
    event.respondWith(
      caches.match(req).then((response) => response || fetch(req))
    );
  }
});
