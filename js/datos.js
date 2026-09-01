// ==========================================
// FitoMed
// datos.js
// Carga y acceso a la base de datos
// ==========================================

let plantas = [];
let definiciones = [];

/**
 * Carga los archivos JSON de plantas y definiciones.
 */
export async function cargarDatos() {

    try {

        const [respuestaPlantas, respuestaDefiniciones] = await Promise.all([
            fetch("data/plantas_medicinales.json"),
            fetch("data/definiciones.json")
        ]);

        if (!respuestaPlantas.ok) {
            throw new Error(
                `Error ${respuestaPlantas.status}: no se pudo cargar la base de datos de plantas.`
            );
        }

        if (!respuestaDefiniciones.ok) {
            throw new Error(
                `Error ${respuestaDefiniciones.status}: no se pudo cargar la base de datos de definiciones.`
            );
        }

        plantas = await respuestaPlantas.json();
        definiciones = await respuestaDefiniciones.json();

        console.log(`✔ ${plantas.length} plantas cargadas.`);
        console.log(`✔ ${definiciones.length} definiciones cargadas.`);

        return plantas;

    } catch (error) {

        console.error("Error cargando las bases de datos:", error);

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
 * Devuelve todas las definiciones.
 */
export function obtenerDefiniciones() {

    return definiciones;

}

/**
 * Busca una planta por su ID.
 */
export function obtenerPlantaPorId(id) {

    return plantas.find(planta => planta.id === id);

}

