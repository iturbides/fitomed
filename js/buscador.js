// ==========================================
// FitoMed
// buscador.js
// ==========================================

import {
    obtenerPlantas,
    obtenerDefiniciones
} from "./datos.js";

import { mostrarFicha } from "./ficha.js";
import { mostrarListado } from "./listado.js";


export function inicializarBuscador() {

    const input = document.getElementById("buscar");

    input.addEventListener("input", buscar);

    // Un único listener para todos los resultados
    document.addEventListener("click", gestionarClick);

}


/**
 * Normaliza un texto para facilitar las búsquedas.
 */
function normalizar(texto) {

    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

}


/**
 * Gestiona los clics sobre los resultados.
 */
function gestionarClick(evento) {

    // ==========================================
    // Resultado de búsqueda de acción
    // ==========================================

    const accion = evento.target.closest(".resultado-accion");

    if (accion) {

        mostrarListado(
            "accion",
            accion.dataset.valor
        );

        return;

    }


    // ==========================================
    // Resultado de búsqueda de definición
    // ==========================================

    const definicion = evento.target.closest(".resultado-definicion");

    if (definicion) {

        return;

    }


    // ==========================================
    // Resultado normal de búsqueda de planta
    // ==========================================

    const tarjeta = evento.target.closest(".resultado");

    if (!tarjeta) return;

    const id = Number(tarjeta.dataset.id);

    mostrarFicha(id);

}


/**
 * Realiza la búsqueda.
 */
function buscar() {

    const input = document.getElementById("buscar");

    const textoOriginal = input.value.trim();

    if (textoOriginal === "") {

        document.getElementById("app").innerHTML = "";

        return;

    }


    // ==========================================
    // Comandos
    // ==========================================

    const comando = normalizar(textoOriginal);


    // ==========================================
    // Comando !
    // ==========================================

    if (comando === "!") {

        mostrarAcciones("");

        return;

    }


    if (comando.startsWith("! ")) {

        const accion = textoOriginal.slice(3).trim();

        buscarAccion(accion);

        return;

    }


    // ==========================================
    // Comando !!
    // Busca en definiciones.json
    // ==========================================

    if (comando === "!!") {

        mostrarDefiniciones("");

        return;

    }


    if (comando.startsWith("!! ")) {

        const texto = textoOriginal.slice(3).trim();

        buscarDefinicion(texto);

        return;

    }


    // ==========================================
    // Búsqueda normal
    // ==========================================

    const texto = textoOriginal.toLowerCase();

    const resultados = obtenerResultados(texto);

    mostrarResultados(resultados);

}


/**
 * Busca una acción.
 */
function buscarAccion(texto) {

    const plantas = obtenerPlantas();

    const busqueda = normalizar(texto);


    // ------------------------------------------
    // Comprobar si es una acción exacta
    // ------------------------------------------

    const accionExacta = plantas
        .flatMap(planta => planta.acciones)
        .find(accion =>
            normalizar(accion) === busqueda
        );


    if (accionExacta) {

        mostrarListado(
            "accion",
            accionExacta
        );

        return;

    }


    // ------------------------------------------
    // Si no es exacta, mostrar coincidencias
    // ------------------------------------------

    mostrarAcciones(texto);

}


/**
 * Muestra las acciones disponibles.
 */
function mostrarAcciones(texto) {

    const plantas = obtenerPlantas();

    const busqueda = normalizar(texto);

    const acciones = [];


    // ------------------------------------------
    // Obtener acciones únicas
    // ------------------------------------------

    plantas.forEach(planta => {

        planta.acciones.forEach(accion => {

            const existe = acciones.some(
                existente =>
                    normalizar(existente) === normalizar(accion)
            );


            if (!existe) {

                acciones.push(accion);

            }

        });

    });


    // ------------------------------------------
    // Filtrar y ordenar por prioridad
    // ------------------------------------------

    const resultados = acciones
        .filter(accion =>
            normalizar(accion).includes(busqueda)
        )
        .map(accion => ({

            accion,

            prioridad: calcularPrioridadAccion(
                accion,
                busqueda
            )

        }))
        .sort((a, b) =>
            b.prioridad - a.prioridad
        );


    const app = document.getElementById("app");


    if (resultados.length === 0) {

        app.innerHTML = `
            <p>No se han encontrado acciones.</p>
        `;

        return;

    }


    let html = "";


    resultados.forEach(({ accion }) => {

        html += `

            <article
                class="resultado resultado-accion"
                data-valor="${accion}">

                <h2>${accion}</h2>

            </article>

        `;

    });


    app.innerHTML = html;

}


/**
 * Calcula la prioridad de una acción.
 */
function calcularPrioridadAccion(accion, texto) {

    const nombre = normalizar(accion);


    // La acción empieza exactamente por lo escrito
    if (nombre.startsWith(texto))
        return 1000;


    // Alguna palabra empieza por lo escrito
    if (
        nombre
            .split(" ")
            .some(palabra => palabra.startsWith(texto))
    )
        return 900;


    // La acción contiene el texto
    return 800;

}


/**
 * Busca una definición concreta.
 */
function buscarDefinicion(texto) {

    const definiciones = obtenerDefiniciones();

    const busqueda = normalizar(texto);


    const resultados = definiciones
        .filter(definicion =>
            normalizar(definicion.accion).includes(busqueda) ||
            normalizar(definicion.definicion).includes(busqueda)
        )
        .map(definicion => ({

            definicion,

            prioridad: calcularPrioridadDefinicion(
                definicion,
                busqueda
            )

        }))
        .sort((a, b) =>
            b.prioridad - a.prioridad
        )
        .slice(0, 8);


    mostrarDefinicionesResultados(resultados);

}


/**
 * Muestra todas las definiciones que coinciden.
 */
function mostrarDefiniciones(texto) {

    const definiciones = obtenerDefiniciones();

    const busqueda = normalizar(texto);


    const resultados = definiciones
        .filter(definicion =>
            normalizar(definicion.accion).includes(busqueda) ||
            normalizar(definicion.definicion).includes(busqueda)
        )
        .map(definicion => ({

            definicion,

            prioridad: calcularPrioridadDefinicion(
                definicion,
                busqueda
            )

        }))
        .sort((a, b) =>
            b.prioridad - a.prioridad
        );


    mostrarDefinicionesResultados(resultados);

}


/**
 * Calcula la prioridad de una definición.
 */
function calcularPrioridadDefinicion(definicion, texto) {

    const accion = normalizar(definicion.accion);
    const descripcion = normalizar(definicion.definicion);


    // La acción empieza exactamente por lo escrito
    if (accion.startsWith(texto))
        return 1000;


    // Alguna palabra de la acción empieza por lo escrito
    if (
        accion
            .split(/[\s-]+/)
            .some(palabra => palabra.startsWith(texto))
    )
        return 900;


    // La acción contiene el texto
    if (accion.includes(texto))
        return 800;


    // La definición contiene el texto
    if (descripcion.includes(texto))
        return 500;


    return 0;

}


/**
 * Genera los resultados de las definiciones.
 */
function mostrarDefinicionesResultados(resultados) {

    const app = document.getElementById("app");


    if (resultados.length === 0) {

        app.innerHTML = `
            <p>No se han encontrado definiciones.</p>
        `;

        return;

    }


    let html = "";


    resultados.forEach(({ definicion }) => {

        html += `

            <article
                class="resultado resultado-definicion">

                <h2>${definicion.accion}</h2>

                <div class="definicion">
                    ${definicion.definicion}
                </div>

            </article>

        `;

    });


    app.innerHTML = html;

}


/**
 * Obtiene los resultados de búsqueda de plantas.
 */
function obtenerResultados(texto) {

    const plantas = obtenerPlantas();

    return plantas
        .map(planta => ({

            planta,
            prioridad: calcularPrioridad(planta, texto)

        }))
        .filter(r => r.prioridad > 0)
        .sort((a, b) => b.prioridad - a.prioridad)
        .slice(0, 8);

}


/**
 * Calcula la prioridad de una planta.
 */
function calcularPrioridad(planta, texto) {

    texto = normalizar(texto);

    const comun = normalizar(planta.nombreComun);
    const botanico = normalizar(planta.nombreBotanico);


    // Nombre común empieza
    if (comun.startsWith(texto))
        return 1000;


    // Alguna palabra empieza
    if (comun.split(" ").some(p => p.startsWith(texto)))
        return 900;


    // Nombre común contiene
    if (comun.includes(texto))
        return 800;


    // Nombre botánico empieza
    if (botanico.startsWith(texto))
        return 700;


    // Nombre botánico contiene
    if (botanico.includes(texto))
        return 600;


    // Acción
    if (planta.acciones.some(a =>
        normalizar(a).includes(texto)
    ))
        return 500;


    // Principio activo
    if (planta.principiosActivos.some(a =>
        normalizar(a).includes(texto)
    ))
        return 400;


    // Droga vegetal
    if (planta.drogaVegetal.some(a =>
        normalizar(a).includes(texto)
    ))
        return 300;


    // Uso
    if (planta.uso.some(a =>
        normalizar(a).includes(texto)
    ))
        return 200;


    // Observación
    if (normalizar(planta.observacion).includes(texto))
        return 100;


    // Notas
    if (normalizar(planta.notas).includes(texto))
        return 50;


    return 0;

}


/**
 * Muestra los resultados normales de plantas.
 */
function mostrarResultados(resultados) {

    const app = document.getElementById("app");


    if (resultados.length === 0) {

        app.innerHTML = `
            <p>No se han encontrado plantas.</p>
        `;

        return;

    }


    let html = "";


    resultados.forEach(({ planta }) => {

        html += `

            <article
                class="resultado"
                data-id="${planta.id}">

                <h2>${planta.nombreComun}</h2>

                <div class="botanico">
                    ${planta.nombreBotanico}
                </div>

                <div class="acciones">
                    ${planta.acciones.slice(0,2).join(" · ")}
                </div>

            </article>

        `;

    });


    app.innerHTML = html;

}
