// ==========================================
// FitoMed
// afecciones.js
// Ficha y listado de afecciones
// ==========================================

import { obtenerAfecciones, obtenerAfeccionPorId } from "./datos.js";


/**
 * Muestra el listado de afecciones que comparten un síntoma.
 */
export function mostrarListadoAfecciones(sintoma) {

    const app = document.getElementById("app");

    const afecciones = obtenerAfecciones();

    const resultados = afecciones.filter(afeccion =>
        afeccion.sintomas.includes(sintoma)
    );

    app.innerHTML = `

        <h2>${sintoma}</h2>

        <p>${resultados.length} afecciones encontradas.</p>

        <div id="resultados"></div>

    `;

    const contenedor = document.getElementById("resultados");

    resultados.forEach(afeccion => {

        contenedor.innerHTML += `

            <article class="resultado resultado-afeccion" data-id="${afeccion.id}">

                <h3>${afeccion.afeccion}</h3>

            </article>

        `;

    });

}


/**
 * Muestra la ficha completa de una afección.
 */
export function mostrarFichaAfeccion(id) {

    const afeccion = obtenerAfeccionPorId(id);

    if (!afeccion) {
        return;
    }

    const app = document.getElementById("app");

    app.innerHTML = "";

    const contenedor = document.createElement("div");
    contenedor.className = "ficha";

    contenedor.innerHTML = `

        <h2>${afeccion.afeccion}</h2>

        <section>

            <h3>Definición</h3>

            <p>${afeccion.definicion}</p>

        </section>

        <section>

            <h3>Síntomas</h3>

            <div class="etiquetas">
                ${crearEtiquetasSintomas(afeccion.sintomas)}
            </div>

        </section>

        <section>

            <h3>Recomendaciones</h3>

            <p>${afeccion.recomendaciones || "-"}</p>

        </section>

    `;

    app.appendChild(contenedor);

    // Eventos de las etiquetas de síntomas
    document.querySelectorAll(".etiqueta-sintoma").forEach(etiqueta => {

        etiqueta.addEventListener("click", () => {

            mostrarListadoAfecciones(etiqueta.dataset.valor);

        });

    });

}

function crearEtiquetasSintomas(lista) {

    if (!lista || lista.length === 0) {
        return "<span>-</span>";
    }

    return lista.map(item => `

        <button
            class="etiqueta etiqueta-sintoma"
            data-valor="${item}">

            ${item}

        </button>

    `).join("");

}
