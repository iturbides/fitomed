// ==========================================
// FitoMed
// app.js
// Punto de entrada de la aplicación
// ==========================================

import { cargarDatos } from "./datos.js";
import { inicializarBuscador } from "./buscador.js";

document.addEventListener("DOMContentLoaded", iniciar);




async function iniciar() {

    console.log("Iniciando FitoMed...");

    const plantas = await cargarDatos();

    if (plantas.length === 0) {

        document.getElementById("app").innerHTML = `
            <p>No se ha podido cargar la base de datos.</p>
        `;

        return;

    }

    inicializarBuscador();

    console.log("FitoMed listo.");

    // Registrar el Service Worker
    if ("serviceWorker" in navigator) {

        navigator.serviceWorker.register("./service-worker.js")
            .then(() => console.log("✔ Service Worker registrado"))
            .catch(error => console.error(error));

    }

}


