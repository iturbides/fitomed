# FitoMed Database

Base de datos fitoterapéutica ligera, de alta precisión y diseñada como Aplicación Web Progresiva (PWA) para su uso en dispositivos móviles y de escritorio, con funcionamiento offline completo.

---

## 🎯 Objetivos de la Aplicación

FitoMed tiene como objetivo principal construir una herramienta de consulta fitoterapéutica rigurosa, homogénea priorizando la utilidad y rapidez frente a la acumulación indiscriminada de datos.

La aplicación y su base de datos cumplen con los siguientes principios fundamentales:

* **Evidencia científica y tradición:** Información científicamente contrastada basada en farmacopeas oficiales y literatura científica, respetando el valor documental del uso tradicional.
* **Terminología uniforme:** Estandarización estricta de términos, acciones y familias botánicas.
* **Estructura sencilla y ligera:** Formato optimizado para cargas instantáneas y fácil mantenimiento.
* **Uso offline prioritario:** Diseño enfocado en la disponibilidad continua sin necesidad de estar conectado a Internet.

---

## ⚡ Funciones y Comandos de Búsqueda

FitoMed ofrece un sistema de búsqueda dinámico diseñado para facilitar tanto la consulta directa como la exploración rápida de la base de datos:

### 1. Búsqueda Principal de Plantas Medicinales (General)
Es la función por defecto de la aplicación. Realiza un rastreo global sobre los campos clave de la base de datos: **nombre común, nombre botánico, principios activos, acciones y notas**.

* **Listado de resultados:** Al introducir cualquier texto, la aplicación presenta un listado en tiempo real con las plantas que coinciden con el criterio ingresado.
* **Ficha completa:** Al seleccionar una planta del listado, se abre su ficha detallada.
* **Etiquetas interactivas:** Dentro de la ficha, los **principios activos** y las **acciones** se muestran en formato de etiquetas clicables. Al pulsar sobre cualquiera de ellas, se genera automáticamente un nuevo listado con todas las plantas que comparten esa misma acción o principio activo.

### 2. Búsqueda Directa de Acciones Terapéuticas (`!`)
Permite filtrar específicamente el catálogo por acciones o propiedades fitoterapéuticas.

* **Búsqueda interactiva:** Al escribir `!` seguido de las primeras letras (ejemplo: `! car`), el sistema despliega sugerencias en tiempo real como `CARMINATIVA` o `CARDIOTÓNICA`.
* **Selección directa:** Al seleccionar una opción o escribir el término completo (ejemplo: `! carminativa`), se accede de forma instantánea al listado de plantas vinculadas a esa acción.

### 3. Búsqueda de Definiciones (`!!`)
Permite consultar la definición o explicación de un término, acción fitoterapéutica, principio activo o concepto médico registrado en la aplicación.

* **Sintaxis:** Antepone un doble signo de exclamación `!!` seguido del término a consultar (ejemplos: `!! carminativa` o `!! mucílago`).
* **Resultado:** Despliega una vista rápida con la definición editorial estandarizada del concepto, facilitando la comprensión técnica sin salir del flujo de trabajo.

---

## 📱 Cómo instalar FitoMed como PWA en tu móvil (Uso Offline)

FitoMed es una **Progressive Web App (PWA)**, lo que significa que no necesitas descargarla desde una tienda de aplicaciones (App Store o Google Play). Se puede instalar directamente desde el navegador y funciona **100% sin conexión a Internet**.

### En Android (Google Chrome / Samsung Internet)
1. Abre el navegador y navega a la URL de **FitoMed**.
2. Toca el menú de opciones (los tres puntos verticales en la esquina superior derecha).
3. Selecciona **"Añadir a la pantalla de inicio"** (o **"Instalar aplicación"**).
4. Confirma la instalación.
5. El icono de FitoMed aparecerá en la pantalla de inicio de tu dispositivo móvil y funcionará como una app nativa, incluso en modo avión.

### En iOS / iPhone (Safari)
1. Abre **Safari** y accede a la URL de **FitoMed**.
2. Toca el botón **Compartir** (el icono de un cuadrado con una flecha apuntando hacia arriba en la barra inferior).
3. Desplázate hacia abajo y selecciona **"Añadir a la pantalla de inicio"**.
4. Pulsa en **"Añadir"** en la esquina superior derecha.
5. Abre la aplicación desde el icono creado en tu pantalla de inicio.

---

## 📂 Registro y Estructura de Datos

Cada registro de planta contenido en `plantas_medicinales.json` cuenta con la siguiente estructura estandarizada:

* `id`: Identificador único.
* `nombreComun`: Denominación principal (siempre en mayúsculas).
* `nombreBotanico`: Nombre científico aceptado.
* `acciones`: Lista de propiedades fitoterapéuticas principales.
* `principiosActivos`: Grupos químicos o marcadores característicos.
* `drogaVegetal`: Parte de la planta utilizada.
* `uso`: Formas de preparación e indicaciones principales.
* `observacion`: Advertencias de seguridad críticas.
* `notas`: Descripción botánica, distribución, historia y detalles complementarios.

---

## 📐 Criterios Editoriales

Este apartado define las normas editoriales utilizadas en la elaboración y mantenimiento de la base de datos de **FitoMed**.

### Fuentes de Referencia
Las fuentes utilizadas se consultan siguiendo este estricto orden de prioridad:

1. Farmacopea Europea (Ph. Eur.)
2. ESCOP (European Scientific Cooperative on Phytotherapy)
3. EMA / HMPC (European Medicines Agency - Committee on Herbal Medicinal Products)
4. Comisión E Alemana
5. Literatura científica reciente revisada por pares.

*Nota:* Para determinadas plantas de uso tradicional que dispongan de menor documentación científica moderna (como las procedentes de tradiciones médicas ayurvédicas), se consideran fuentes farmacognósticas de reconocida relevancia, siempre diferenciando el uso tradicional de la evidencia clínica actual.

### Normas por Campo de Registro

* **Nombre común:** 
  * Siempre en mayúsculas.
  * Un único nombre principal por planta (*ej. `MANZANILLA DULCE`*).
* **Nombre botánico:** 
  * Se utiliza la denominación científica aceptada actualmente (*ej. `Matricaria chamomilla L.`*).
* **Acciones:**
  * Máximo recomendado: 10 acciones (lo habitual es entre 3 y 6).
  * Siempre en **singular** (*ej. `Antiinflamatoria`, `Carminativa`, `Sedante`*).
  * Ordenadas por importancia terapéutica.
* **Principios activos:**
  * Se incluyen únicamente los responsables de la actividad farmacológica o marcadores clave (*ej. `Flavonoides`, `Aceite esencial`, `Silimarina`*).
* **Droga vegetal:**
  * Terminología alineada con la Farmacopea Europea (*ej. `Raíz`, `Sumidad florida`, `Hojas`*).
* **Uso:**
  * Indica la forma o preparación empleada (*ej. `Infusión`, `Extracto`, `Uso externo`*).
* **Observación:**
  * Reservado exclusivamente para advertencias de seguridad destacadas visualmente (*ej. `Abortiva`, `Fotosensibilizante`, `Planta tóxica`*).
* **Notas:**
  * Apartado descriptivo más extenso (historia, cultivo, contexto botánico o tradicional).

### Incorporación de Nuevas Plantas
Las nuevas especies a incorporar deben cumplir:
* Interés fitoterapéutico reconocido.
* Documentación suficiente sobre sus propiedades.
* Respaldo en farmacopeas oficiales o amplio registro tradicional bien documentado.
* Terminología strictly compatible con la base de datos.

### Filosofía del Proyecto
FitoMed prioriza **la calidad sobre la cantidad**. Es preferible disponer de un catálogo de plantas cuidadosamente documentadas y estandarizadas que de miles de registros incompletos o inconsistentes.
