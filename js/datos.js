// ==========================================
// FitoMed
// datos.js
// Carga y acceso a la base de datos
// ==========================================

let plantas = [];
let definiciones = [];
let afecciones = [];
let emuntorios = [];

/**
 * Carga los archivos JSON de plantas, definiciones y afecciones.
 */
export async function cargarDatos() {

    try {

        const [respuestaPlantas, respuestaDefiniciones, respuestaAfecciones] = await Promise.all([
            fetch("data/plantas_medicinales.json"),
            fetch("data/definiciones.json"),
            fetch("data/afecciones.json")
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

        if (!respuestaAfecciones.ok) {
            throw new Error(
                `Error ${respuestaAfecciones.status}: no se pudo cargar la base de datos de afecciones.`
            );
        }

        plantas = await respuestaPlantas.json();
        definiciones = await respuestaDefiniciones.json();
        afecciones = await respuestaAfecciones.json();

        console.log(`✔ ${plantas.length} plantas cargadas.`);
        console.log(`✔ ${definiciones.length} definiciones cargadas.`);
        console.log(`✔ ${afecciones.length} afecciones cargadas.`);

        // Emuntorios (DETOX): se cargan aparte para que, si fallan,
        // el resto de la aplicación siga funcionando.
        await cargarEmuntorios();

        return plantas;

    } catch (error) {

        console.error("Error cargando las bases de datos:", error);

        return [];

    }

}

/**
 * Carga el archivo JSON de emuntorios (DETOX).
 */
async function cargarEmuntorios() {

    try {

        const respuesta = await fetch("data/emuntorios.json");

        if (!respuesta.ok) {
            throw new Error(
                `Error ${respuesta.status}: no se pudo cargar la base de datos de emuntorios.`
            );
        }

        emuntorios = await respuesta.json();

        console.log(`✔ ${emuntorios.length} emuntorios cargados.`);

    } catch (error) {

        console.error("Error cargando los emuntorios:", error);

        emuntorios = [];

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

/**
 * Devuelve todas las afecciones.
 */
export function obtenerAfecciones() {

    return afecciones;

}

/**
 * Busca una afección por su ID.
 */
export function obtenerAfeccionPorId(id) {

    return afecciones.find(afeccion => afeccion.id === id);

}

/**
 * Devuelve todos los emuntorios (DETOX).
 */
export function obtenerEmuntorios() {

    return emuntorios;

}

/**
 * Busca un emuntorio por su ID.
 */
export function obtenerEmuntorioPorId(id) {

    return emuntorios.find(emuntorio => emuntorio.id === id);

}
