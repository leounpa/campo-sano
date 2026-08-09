// Campo Sano - Service worker para funcionar sin internet
const CACHE = "campo-sano-v8";

const ARCHIVOS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./css/style.css",
  "./js/app.js",
  "./data/cultivos.js",
  "./data/plagas.js",
  "./data/identificacion.js",
  "./data/plantas.js"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ARCHIVOS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then((resp) => {
      if (resp) return resp;
      return fetch(e.request)
        .then((red) => {
          if (red && red.status === 200 && red.type === "basic") {
            const copia = red.clone();
            caches.open(CACHE).then((c) => c.put(e.request, copia));
          }
          return red;
        })
        .catch(() => {
          if (e.request.mode === "navigate") return caches.match("./index.html");
          return Response.error();
        });
    })
  );
});
