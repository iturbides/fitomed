// ==========================================
// FitoMed
// datos.js
// Carga y acceso a la base de datos
// ==========================================

let plantas = [];

/**
 * Carga el archivo JSON de plantas.
 */
export async function cargarDatos() {

    try {

        const respuesta = await fetch("data/plantas_medicinales.json");

        if (!respuesta.ok) {
            throw new Error(`Error ${respuesta.status}: no se pudo cargar la base de datos.`);
        }

        plantas = await respuesta.json();

        console.log(`✔ ${plantas.length} plantas cargadas.`);

        return plantas;

    } catch (error) {

        console.error("Error cargando plantas_medicinales.json", error);

        return [];

    }

}

/**
 * Devuelve todas las plantas.
 */
export function obtenerPlantas() {

    return plantas;

}

/**
 * Busca una planta por su ID.
 */
export function obtenerPlantaPorId(id) {

    return plantas.find(planta => planta.id === id);

}
