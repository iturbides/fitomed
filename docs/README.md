# FitoMed Database

FitoMed es una aplicación web progresiva (PWA) que permite consultar una base de datos de plantas medicinales de forma rápida y eficiente, incluso sin conexión a internet.

## Objetivos

La base de datos y la aplicación están diseñadas para cumplir los siguientes principios:

- Proporcionar información fitoterapéutica científicamente contrastada cuando exista evidencia disponible.
- Ofrecer una terminología uniforme y fácilmente comprensible.
- Mantener una estructura sencilla que facilite el mantenimiento.
- Priorizar la utilidad práctica frente a la acumulación indiscriminada de información.
- Compatibilidad total con la PWA FitoMed y con FitoMed Admin.

## Funciones principales

### Búsqueda de plantas

La búsqueda principal permite encontrar plantas medicinales por:
- Nombre común
- Nombre botánico
- Acciones terapéuticas
- Principios activos
- Droga vegetal
- Usos
- Observaciones y notas

Los resultados se muestran ordenados por relevancia, priorizando las coincidencias exactas en el nombre común.

### Búsqueda de acciones (`!`)

El comando `!` permite buscar acciones terapéuticas de forma rápida:

```text
!              → Muestra todas las acciones ordenadas alfabéticamente
! car          → Muestra acciones que empiezan por "car" (ej: CARMINATIVA, CARDIOTÓNICA).

Al seleccionar una acción, se listan todas las plantas que la poseen.

También es posible introducir directamente la acción completa:

! carminativa

En este caso se accederá directamente al listado de plantas con esa acción.

### Búsqueda de definiciones (!!)

El comando !! permite consultar el glosario de definiciones de acciones terapéuticas:

!!             → Muestra todas las definiciones ordenadas alfabéticamente
!! anti        → Muestra definiciones que empiezan por "anti" (ej: ANTIINFLAMATORIA, ANTIOXIDANTE).

Este sistema utiliza el archivo definiciones.json y proporciona una descripción clara de cada acción terapéutica.

### Fichas de plantas
Cada planta dispone de una ficha completa que incluye:

-Nombre común

-Nombre botánico

-Acciones terapéuticas

-Principios activos

-Droga vegetal

-Usos recomendados

-Observaciones importantes

-Notas descriptivas

### Instalación como PWA en dispositivos móviles
FitoMed funciona como una Progressive Web App, lo que permite instalarla en tu dispositivo móvil para usarla sin conexión a internet.

### En Android (Chrome)
Abre la aplicación FitoMed en Chrome.

Toca el icono de menú (tres puntos verticales) en la esquina superior derecha.

Selecciona "Instalar aplicación" o "Añadir a la pantalla de inicio".

Confirma la instalación.

La aplicación aparecerá en tu pantalla de inicio con su propio icono.

Una vez instalada, puedes abrirla directamente desde el icono y funcionará sin conexión.

### En iOS (Safari)
Abre la aplicación FitoMed en Safari.

Toca el icono de compartir (cuadrado con flecha hacia arriba) en la parte inferior.

Desplázate hacia abajo y selecciona "Añadir a la pantalla de inicio".

Puedes editar el nombre si lo deseas y tocar "Añadir".

La aplicación aparecerá en tu pantalla de inicio.

Funcionará sin conexión una vez que hayas cargado los datos al menos una vez.

### Ventajas de la instalación PWA
Sin conexión: Una vez cargados los datos, puedes consultar la base de datos sin necesidad de internet.

Carga rápida: La aplicación se abre casi instantáneamente.

Experiencia similar a una app nativa: Pantalla completa, sin barra de navegación del navegador.

Sin necesidad de descargas desde tiendas: Se instala directamente desde el navegador.

### Fuentes de referencia
Las fuentes utilizadas se consultan siguiendo el siguiente orden de prioridad:

Farmacopea Europea (Ph. Eur.)

ESCOP

EMA (HMPC)

Comisión E Alemana

Literatura científica reciente revisada por pares.

Cuando existen discrepancias entre diferentes fuentes, prevalecen la Farmacopea Europea, ESCOP y EMA.

Para determinadas plantas de uso tradicional que disponen de menor documentación científica moderna, se consideran también fuentes tradicionales y farmacognósticas de reconocida relevancia, especialmente las tradiciones médicas ayurvédicas, diferenciando siempre el uso tradicional de la evidencia clínica actualmente disponible.


