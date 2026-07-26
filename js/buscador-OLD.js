// ==========================================
// FitoMed
// buscador.js
// Gestión del buscador
// ==========================================

import { obtenerPlantas } from "./datos.js";
import { mostrarFicha } from "./ficha.js";
console.log("buscador.js cargado");
const inputBuscar = document.getElementById("buscar");
const app = document.getElementById("app");

export function inicializarBuscador() {

    inputBuscar.addEventListener("input", buscar);

}

function buscar() {

    const texto = inputBuscar.value.trim().toLowerCase();

    // Si no hay texto, no mostramos resultados
    if (texto === "") {

        app.innerHTML = "";
        console.log("mostrarResultados()");
        return;

    }

    const resultados = obtenerResultados(texto);

    mostrarResultados(resultados);

}

function obtenerResultados(texto) {

    const plantas = obtenerPlantas();

    const resultados = [];

    plantas.forEach(planta => {

        let prioridad = 0;

        // Nombre común
        if (planta.nombreComun.toLowerCase().includes(texto)) {
            prioridad = 100;
        }

        // Nombre botánico
        else if (planta.nombreBotanico.toLowerCase().includes(texto)) {
            prioridad = 90;
        }

        // Acciones
        else if (planta.acciones.some(a =>
            a.toLowerCase().includes(texto))) {
            prioridad = 80;
        }

        // Principios activos
        else if (planta.principiosActivos.some(p =>
            p.toLowerCase().includes(texto))) {
            prioridad = 70;
        }

        // Droga vegetal
        else if (planta.drogaVegetal.some(d =>
            d.toLowerCase().includes(texto))) {
            prioridad = 60;
        }

        // Uso
        else if (planta.uso.some(u =>
            u.toLowerCase().includes(texto))) {
            prioridad = 50;
        }

        // Observación
        else if (planta.observacion.toLowerCase().includes(texto)) {
            prioridad = 40;
        }

        // Notas
        else if (planta.notas.toLowerCase().includes(texto)) {
            prioridad = 30;
        }

        if (prioridad > 0) {

            resultados.push({
                prioridad,
                planta
            });

        }

    });

    resultados.sort((a, b) => b.prioridad - a.prioridad);

    return resultados.slice(0, 5);

}

function mostrarResultados(resultados) {

    if (resultados.length === 0) {

        app.innerHTML = `
            <p>No se han encontrado plantas.</p>
        `;

        return;

    }

    app.innerHTML = "";

    resultados.forEach(resultado => {

        const planta = resultado.planta;

        const acciones = planta.acciones
            .slice(0, 2)
            .join(" · ");

        app.innerHTML += `
            <div class="resultado"
                 data-id="${planta.id}">

                <h2>${planta.nombreComun}</h2>

                <div class="botanico">
                    ${planta.nombreBotanico}
                </div>

                <div class="acciones">
                    ${acciones}
                </div>

            </div>
        `;

    });

}
