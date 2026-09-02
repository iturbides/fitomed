// ==========================================
// FitoMed
// Service Worker
// ==========================================

const CACHE = "fitomed-v1.41";

const ARCHIVOS = [

    "./",

    "./index.html",

    "./css/styles.css",

    "./js/app.js",
    "./js/datos.js",
    "./js/buscador.js",
    "./js/ficha.js",
    "./js/listado.js",

    "./data/plantas_medicinales.json",
    "./data/definiciones.json",

    "./icons/icon-192.png",
    "./icons/icon-512.png"

];

self.addEventListener("install", event => {

    self.skipWaiting();

    event.waitUntil(

        caches.open(CACHE)
            .then(cache => cache.addAll(ARCHIVOS))

    );

});


self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(keys =>

            Promise.all(

                keys
                    .filter(key => key !== CACHE)
                    .map(key => caches.delete(key))

            )

        )

    );

    self.clients.claim();

});


self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
            .then(response => response || fetch(event.request))

    );

});
