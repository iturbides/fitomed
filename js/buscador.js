// ==========================================
// FitoMed
// buscador.js
// ==========================================

import { obtenerPlantas } from "./datos.js";
import { mostrarFicha } from "./ficha.js";
import { mostrarListado } from "./listado.js";


export function inicializarBuscador() {

    const input = document.getElementById("buscar");

    input.addEventListener("input", buscar);

    // Un único listener para todos los resultados
    document.addEventListener("click", gestionarClick);

}


function normalizar(texto) {

    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

}


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
    // Resultado normal de búsqueda de planta
    // ==========================================

    const tarjeta = evento.target.closest(".resultado");

    if (!tarjeta) return;

    const id = Number(tarjeta.dataset.id);

    mostrarFicha(id);

}


function buscar() {

    const input = document.getElementById("buscar");

    const textoOriginal = input.value.trim();

    if (textoOriginal === "") {

        document.getElementById("app").innerHTML = "";

        return;

    }


    // ==========================================
    // Comando !a
    // ==========================================

    const comando = normalizar(textoOriginal);


    if (comando === "!a") {

        mostrarAcciones("");

        return;

    }


    if (comando.startsWith("!a ")) {

        const accion = textoOriginal.slice(3).trim();

        buscarAccion(accion);

        return;

    }


    // ==========================================
    // Búsqueda normal
    // ==========================================

    const texto = textoOriginal.toLowerCase();

    const resultados = obtenerResultados(texto);

    mostrarResultados(resultados);

}


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

