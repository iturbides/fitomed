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

    if (!texto) return "";
    
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

        // Extraer el texto después de "! "
        const accion = textoOriginal.slice(2).trim();
        
        buscarAccion(accion);

        return;

    }


    // ==========================================
    // Comando !!
    // ==========================================

    if (comando === "!!") {

        mostrarDefiniciones("");

        return;

    }


    if (comando.startsWith("!! ")) {

        // Extraer el texto después de "!! "
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

    // Pasamos el texto original, NO el normalizado
    mostrarAcciones(texto);

}


/**
 * Muestra las acciones disponibles.
 */
function mostrarAcciones(texto) {

    const plantas = obtenerPlantas();

    // Normalizamos el texto aquí (una sola vez)
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
    // Filtrar acciones que coinciden
    // ------------------------------------------

    const accionesFiltradas = acciones
        .filter(accion =>
            normalizar(accion).includes(busqueda)
        );


    // Si no hay texto de búsqueda, mostrar todas ordenadas alfabéticamente
    if (busqueda === "") {
        const resultados = accionesFiltradas
            .sort((a, b) => {
                const normalizadaA = normalizar(a);
                const normalizadaB = normalizar(b);
                return normalizadaA.localeCompare(normalizadaB);
            });
        
        mostrarAccionesResultados(resultados);
        return;
    }


    // Ordenar: primero las que empiezan por el texto, luego las que contienen
    const resultados = accionesFiltradas
        .sort((a, b) => {
            const accionA = normalizar(a);
            const accionB = normalizar(b);
            
            // Verificar si empiezan por el texto buscado
            const empiezaA = accionA.startsWith(busqueda);
            const empiezaB = accionB.startsWith(busqueda);
            
            // Si una empieza y la otra no, la que empieza va primero
            if (empiezaA && !empiezaB) return -1;
            if (!empiezaA && empiezaB) return 1;
            
            // Si ambas empiezan o ambas no empiezan, orden alfabético usando valores normalizados
            return accionA.localeCompare(accionB);
        });


    mostrarAccionesResultados(resultados);

}


/**
 * Muestra los resultados de acciones.
 */
function mostrarAccionesResultados(resultados) {

    const app = document.getElementById("app");


    if (resultados.length === 0) {

        app.innerHTML = `
            <p>No se han encontrado acciones.</p>
        `;

        return;

    }


    let html = "";


    resultados.forEach((accion) => {

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
 * Busca una definición concreta.
 */
function buscarDefinicion(texto) {

    const definiciones = obtenerDefiniciones();

    const busqueda = normalizar(texto);


    // Primero filtramos las definiciones que coinciden
    const filtradas = definiciones
        .filter(definicion =>
            normalizar(definicion.accion).includes(busqueda) ||
            normalizar(definicion.definicion).includes(busqueda)
        );


    // Luego las ordenamos: primero las que empiezan por el texto, luego las que contienen
    const resultados = filtradas
        .sort((a, b) => {
            const accionA = normalizar(a.accion);
            const accionB = normalizar(b.accion);
            
            // Verificar si empiezan por el texto buscado
            const empiezaA = accionA.startsWith(busqueda);
            const empiezaB = accionB.startsWith(busqueda);
            
            // Si una empieza y la otra no, la que empieza va primero
            if (empiezaA && !empiezaB) return -1;
            if (!empiezaA && empiezaB) return 1;
            
            // Si ambas empiezan o ambas no empiezan, orden alfabético
            return accionA.localeCompare(accionB);
        })
        .slice(0, 8);


    mostrarDefinicionesResultados(resultados);

}


/**
 * Muestra todas las definiciones que coinciden.
 */
function mostrarDefiniciones(texto) {

    const definiciones = obtenerDefiniciones();

    const busqueda = normalizar(texto);


    // Si no hay texto de búsqueda, mostrar todas ordenadas alfabéticamente
    if (busqueda === "") {
        const resultados = definiciones
            .sort((a, b) => {
                const accionA = normalizar(a.accion);
                const accionB = normalizar(b.accion);
                return accionA.localeCompare(accionB);
            });
        
        mostrarDefinicionesResultados(resultados);
        return;
    }


    // Primero filtramos las definiciones que coinciden
    const filtradas = definiciones
        .filter(definicion =>
            normalizar(definicion.accion).includes(busqueda) ||
            normalizar(definicion.definicion).includes(busqueda)
        );


    // Luego las ordenamos: primero las que empiezan por el texto, luego las que contienen
    const resultados = filtradas
        .sort((a, b) => {
            const accionA = normalizar(a.accion);
            const accionB = normalizar(b.accion);
            
            // Verificar si empiezan por el texto buscado
            const empiezaA = accionA.startsWith(busqueda);
            const empiezaB = accionB.startsWith(busqueda);
            
            // Si una empieza y la otra no, la que empieza va primero
            if (empiezaA && !empiezaB) return -1;
            if (!empiezaA && empiezaB) return 1;
            
            // Si ambas empiezan o ambas no empiezan, orden alfabético
            return accionA.localeCompare(accionB);
        });


    mostrarDefinicionesResultados(resultados);

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


    resultados.forEach((definicion) => {

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
