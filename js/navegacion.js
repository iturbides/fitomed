// ==========================================
// FitoMed
// navegacion.js
// Historial de vistas y botón "Volver"
// (no importa nada: así evita dependencias circulares)
// ==========================================

// Vistas anteriores a la actual. Cada una guarda:
//   restaurar: función que vuelve a pintar la vista
//   scroll:    posición de scroll al salir de ella
const pila = [];

// Vista que se está mostrando ahora
let actual = null;

// Mientras sea true, las vistas no se registran en el historial
// (se usa al restaurar una vista y al ejecutar la búsqueda).
let suspendido = false;


/**
 * Ejecuta una función sin registrar vistas en el historial.
 */
export function sinRegistrar(fn) {

    const anterior = suspendido;
    suspendido = true;

    try {
        fn();
    } finally {
        suspendido = anterior;
    }

}


/**
 * La búsqueda es la vista raíz: cada vez que se busca,
 * el historial empieza de cero.
 */
export function reiniciarNavegacion(restaurar) {

    pila.length = 0;
    actual = { restaurar, scroll: 0 };

}


/**
 * Cada vista (ficha, listado...) se registra al empezar a pintarse.
 * La vista anterior se guarda para poder volver a ella.
 */
export function registrarVista(restaurar) {

    if (suspendido) return;

    if (actual) {
        actual.scroll = window.scrollY;
        pila.push(actual);
    }

    actual = { restaurar, scroll: 0 };

    // Una entrada en el historial del navegador para que el
    // botón "atrás" del móvil también funcione.
    history.pushState({ fitomed: true }, "");

    window.scrollTo(0, 0);

}


/**
 * Añade el botón "← Volver" al principio del contenedor,
 * solo si hay una vista anterior a la que volver.
 */
export function insertarBotonVolver(contenedor) {

    if (pila.length === 0) return;

    const boton = document.createElement("button");

    boton.type = "button";
    boton.className = "btn-volver";
    boton.textContent = "← Volver";

    boton.addEventListener("click", () => history.back());

    contenedor.prepend(boton);

}


// Botón atrás del móvil / del navegador (y también el botón Volver)
window.addEventListener("popstate", () => {

    if (pila.length === 0) return;

    const anterior = pila.pop();

    actual = anterior;

    sinRegistrar(() => anterior.restaurar());

    window.scrollTo(0, anterior.scroll || 0);

});
