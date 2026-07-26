// ==========================================
// FitoMed
// ficha.js
// Visualización de la ficha de una planta
// ==========================================

import { obtenerPlantaPorId } from "./datos.js";
import { mostrarListado } from "./listado.js";

const app = document.getElementById("app");

export function mostrarFicha(id) {

    const planta = obtenerPlantaPorId(id);

    if (!planta) {
        return;
    }

    app.innerHTML = "";

    const contenedor = document.createElement("div");
    contenedor.className = "ficha";

    contenedor.innerHTML = `

        <h2>${planta.nombreComun}</h2>


<p class="botanico">

    <a
        href="https://www.ecosia.org/images?q=${encodeURIComponent(planta.nombreBotanico)}"
        target="_blank"
title="Buscar imágenes en Ecosia"
        rel="noopener noreferrer">

        ${planta.nombreBotanico}

    </a>

</p>


        <section>

            <h3>Acciones</h3>

            <div class="etiquetas">
                ${crearEtiquetas(planta.acciones, "accion")}
            </div>

        </section>

        <section>

            <h3>Principios activos</h3>

            <div class="etiquetas">
                ${crearEtiquetas(planta.principiosActivos, "principio")}
            </div>

        </section>

        <section>

            <h3>Droga vegetal</h3>

            <div class="etiquetas">
                ${crearEtiquetas(planta.drogaVegetal, "droga")}
            </div>

        </section>

        <section>

            <h3>Uso</h3>

            <div class="etiquetas">
                ${crearEtiquetas(planta.uso, "uso")}
            </div>

        </section>


<section>

    <h3>Observación</h3>

    ${
        planta.observacion
            ? `<div class="observacion">${planta.observacion}</div>`
            : "<p>-</p>"
    }

</section>


        <section>

            <h3>Notas</h3>

            <p>${planta.notas || "-"}</p>

        </section>

    `;

    app.appendChild(contenedor);

        // Eventos de las etiquetas
    document.querySelectorAll(".etiqueta").forEach(etiqueta => {

        etiqueta.addEventListener("click", () => {

            mostrarListado(
                etiqueta.dataset.tipo,
                etiqueta.dataset.valor
            );

        });

    });

}

function crearEtiquetas(lista, tipo) {

    if (!lista || lista.length === 0) {
        return "<span>-</span>";
    }

    return lista.map(item => `

        <button
            class="etiqueta"
            data-tipo="${tipo}"
            data-valor="${item}">

            ${item}

        </button>

    `).join("");

}
