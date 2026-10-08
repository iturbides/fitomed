// ==========================================
// FitoMed
// emuntorios.js
// Depuración de emuntorios (DETOX):
// carga de datos, búsqueda y ficha
// ==========================================

import {
    obtenerPlantas,
    obtenerEmuntorios,
    obtenerEmuntorioPorId,
    obtenerAfeccionPorId
} from "./datos.js";
import { mostrarFicha } from "./ficha.js";
import { mostrarFichaAfeccion } from "./afecciones.js";


// Mínimo de letras para activar los disparadores
const MINIMO_LETRAS = 4;


function normalizar(texto) {

    if (!texto) return "";

    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

}


/**
 * Devuelve los emuntorios cuyas palabras clave empiezan por el texto.
 * Ejemplos: "detox", "depur", "higado", "renal"...
 */
export function buscarEmuntorios(texto) {

    const busqueda = normalizar(texto).trim();

    if (busqueda.length < MINIMO_LETRAS) {
        return [];
    }

    return obtenerEmuntorios().filter(emuntorio =>
        emuntorio.palabrasClave.some(clave =>
            normalizar(clave).startsWith(busqueda)
        )
    );

}


/**
 * Plantas de un emuntorio: la primera acción de la ficha es la
 * principal; el resto se consideran plantas de apoyo.
 */
function obtenerPlantasEmuntorio(emuntorio) {

    const principal = emuntorio.acciones[0];

    const orden = (a, b) =>
        a.nombreComun.localeCompare(b.nombreComun, "es");

    const plantas = obtenerPlantas().filter(planta =>
        planta.acciones.some(accion => emuntorio.acciones.includes(accion))
    );

    return {

        principales: plantas
            .filter(planta => planta.acciones.includes(principal))
            .sort(orden),

        apoyo: plantas
            .filter(planta => !planta.acciones.includes(principal))
            .sort(orden)

    };

}


/**
 * Tarjetas de emuntorio para el listado de resultados del buscador.
 */
export function htmlTarjetasEmuntorios(lista) {

    return lista.map(emuntorio => {

        const { principales, apoyo } = obtenerPlantasEmuntorio(emuntorio);

        return `

            <article
                class="resultado resultado-emuntorio"
                data-id="${emuntorio.id}">

                <span class="insignia">DETOX</span>

                <h2>${emuntorio.titulo}</h2>

                <div class="detalle">
                    ${principales.length + apoyo.length} plantas relacionadas
                </div>

            </article>

        `;

    }).join("");

}


function crearLista(lista) {

    if (!lista || lista.length === 0) {
        return "<p>-</p>";
    }

    return `
        <ul class="lista-texto">
            ${lista.map(item => `<li>${item}</li>`).join("")}
        </ul>
    `;

}


function crearEnlacesPlantas(plantas) {

    if (plantas.length === 0) {
        return "<p>-</p>";
    }

    return `
        <div class="etiquetas">
            ${plantas.map(planta => `
                <button
                    class="enlace enlace-planta"
                    data-planta="${planta.id}">
                    ${planta.nombreComun}
                </button>
            `).join("")}
        </div>
    `;

}


function crearEnlacesAfecciones(ids) {

    const encontradas = (ids || [])
        .map(id => obtenerAfeccionPorId(id))
        .filter(Boolean);

    if (encontradas.length === 0) {
        return "<p>-</p>";
    }

    return `
        <div class="etiquetas">
            ${encontradas.map(afeccion => `
                <button
                    class="enlace enlace-afeccion"
                    data-afeccion="${afeccion.id}">
                    ${afeccion.afeccion}
                </button>
            `).join("")}
        </div>
    `;

}


/**
 * Ficha completa de un emuntorio.
 */
export function mostrarFichaEmuntorio(id) {

    const emuntorio = obtenerEmuntorioPorId(id);

    if (!emuntorio) {
        return;
    }

    const app = document.getElementById("app");

    const { principales, apoyo } = obtenerPlantasEmuntorio(emuntorio);

    app.innerHTML = `

        <div class="ficha ficha-emuntorio">

            <span class="insignia">DETOX</span>

            <h2>${emuntorio.titulo}</h2>

            <section>
                <h3>Definición</h3>
                <p>${emuntorio.definicion}</p>
            </section>

            <section>
                <h3>Función</h3>
                <p>${emuntorio.funcion}</p>
            </section>

            <section>
                <h3>Causas de sobrecarga</h3>
                ${crearLista(emuntorio.causas)}
            </section>

            <section>
                <h3>Síntomas</h3>
                ${crearLista(emuntorio.sintomas)}
            </section>

            <section>
                <h3>Plantas principales (${principales.length})</h3>
                ${crearEnlacesPlantas(principales)}
            </section>

            ${apoyo.length > 0 ? `

                <section>
                    <details>
                        <summary>Plantas de apoyo (${apoyo.length})</summary>
                        ${crearEnlacesPlantas(apoyo)}
                    </details>
                </section>

            ` : ""}

            <section>
                <h3>Hábitos</h3>
                <p>${emuntorio.habitos}</p>
            </section>

            <section>
                <h3>Precauciones</h3>
                <div class="precauciones">${emuntorio.precauciones}</div>
            </section>

            <section>
                <h3>Afecciones relacionadas</h3>
                ${crearEnlacesAfecciones(emuntorio.afeccionesRelacionadas)}
            </section>

        </div>

    `;

    // Enlaces a las fichas de plantas
    app.querySelectorAll("[data-planta]").forEach(boton => {

        boton.addEventListener("click", () => {
            mostrarFicha(Number(boton.dataset.planta));
        });

    });

    // Enlaces a las fichas de afecciones
    app.querySelectorAll("[data-afeccion]").forEach(boton => {

        boton.addEventListener("click", () => {
            mostrarFichaAfeccion(Number(boton.dataset.afeccion));
        });

    });

}
