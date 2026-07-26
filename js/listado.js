// ==========================================
// FitoMed
// listado.js
// Listados por etiquetas
// ==========================================

import { obtenerPlantas } from "./datos.js";

const app = document.getElementById("app");

export function mostrarListado(tipo, valor) {

    const plantas = obtenerPlantas();

    const resultados = plantas.filter(planta => {

        switch (tipo) {

            case "accion":
                return planta.acciones.includes(valor);

            case "principio":
                return planta.principiosActivos.includes(valor);

            case "droga":
                return planta.drogaVegetal.includes(valor);

            case "uso":
                return planta.uso.includes(valor);

            default:
                return false;

        }

    });

    app.innerHTML = `

        <h2>${valor}</h2>

        <p>${resultados.length} plantas encontradas.</p>

        <div id="resultados"></div>

    `;

    const contenedor = document.getElementById("resultados");

    resultados.forEach(planta => {

        contenedor.innerHTML += `

            <article class="resultado" data-id="${planta.id}">

                <h3>${planta.nombreComun}</h3>

                <div class="botanico">
                    ${planta.nombreBotanico}
                </div>

            </article>

        `;

    });

}
