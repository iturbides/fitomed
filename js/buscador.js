// ==========================================
// FitoMed
// buscador.js
// ==========================================

import { obtenerPlantas } from "./datos.js";
import { mostrarFicha } from "./ficha.js";

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

    const tarjeta = evento.target.closest(".resultado");

    if (!tarjeta) return;

    const id = Number(tarjeta.dataset.id);

    console.log("Abrir ficha:", id);

    mostrarFicha(id);

}

function buscar() {

    const input = document.getElementById("buscar");
    const texto = input.value.trim().toLowerCase();

    if (texto === "") {

        document.getElementById("app").innerHTML = "";
        return;

    }

    const resultados = obtenerResultados(texto);

    mostrarResultados(resultados);

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

    if (planta.acciones.some(a => normalizar(a).includes(texto)))
        return 500;

    if (planta.principiosActivos.some(a => normalizar(a).includes(texto)))
        return 400;

    if (planta.drogaVegetal.some(a => normalizar(a).includes(texto)))
        return 300;

    if (planta.uso.some(a => normalizar(a).includes(texto)))
        return 200;

    if (normalizar(planta.observacion).includes(texto))
        return 100;

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
            <article class="resultado" data-id="${planta.id}">

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
