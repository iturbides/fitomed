// ==========================================
// FitoMed
// Service Worker
// ==========================================

const CACHE = "fitomed-v1.1";

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

    "./icons/icon-192.png",
    "./icons/icon-512.png"

];

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE)
            .then(cache => cache.addAll(ARCHIVOS))

    );

});

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
            .then(respuesta => respuesta || fetch(event.request))

    );

});
