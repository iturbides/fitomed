# FitoMed Database

Base de datos fitoterapéutica ligera, de alta precisión y diseñada como Aplicación Web Progresiva (PWA) para su uso en dispositivos móviles y de escritorio, con funcionamiento offline completo.

## ⚠️ IMPORTANTE — Finalidad educativa y de consulta

FitoMed está concebida como una guía y herramienta de apoyo para estudiantes, investigadores y personas interesadas en el estudio de las plantas medicinales y la fitoterapia. Su contenido tiene una **finalidad exclusivamente educativa y de consulta**, y en ningún caso pretende sustituir el criterio, diagnóstico, tratamiento o recomendaciones de los profesionales de la salud, ya sea desde la medicina convencional u occidental, la naturopatía, la medicina tradicional china, la medicina ayurvédica u otras disciplinas sanitarias.

La información incluida en FitoMed debe utilizarse como material de estudio y consulta y no como una recomendación médica personalizada.

---

## 🎯 Objetivos de la Aplicación

FitoMed tiene como objetivo principal construir una herramienta de consulta fitoterapéutica rigurosa y homogénea, que prioriza la utilidad y la rapidez frente a la acumulación indiscriminada de datos.

La aplicación y su base de datos cumplen con los siguientes principios fundamentales:

* **Evidencia científica y tradición:** Información científicamente contrastada basada en farmacopeas oficiales y literatura científica, respetando el valor documental del uso tradicional.
* **Terminología uniforme:** Estandarización estricta de términos, acciones, principios activos y droga vegetal.
* **Estructura sencilla y ligera:** Formato optimizado para cargas instantáneas y fácil mantenimiento.
* **Uso offline prioritario:** Diseño enfocado en la disponibilidad continua sin necesidad de estar conectado a Internet.
* **Uso responsable de la información:** La información proporcionada debe interpretarse como material de consulta y estudio y no como una recomendación médica personalizada.

---

## ⚡ Funciones y Comandos de Búsqueda

FitoMed ofrece un sistema de búsqueda dinámico diseñado para facilitar tanto la consulta directa como la exploración rápida de la base de datos:

### 1. Búsqueda Principal de Plantas Medicinales (General)
Es la función por defecto de la aplicación. Realiza un rastreo global sobre los campos clave de la base de datos: **nombre común, nombre botánico, acciones, principios activos, droga vegetal, uso y notas**.

* **Listado de resultados:** Al introducir cualquier texto, la aplicación presenta un listado en tiempo real con las plantas que coinciden con el criterio ingresado.
* **Ficha completa:** Al seleccionar una planta del listado, se abre su ficha detallada.
* **Etiquetas interactivas:** Dentro de la ficha, las **acciones**, los **principios activos** y la **droga vegetal** se muestran en formato de etiquetas clicables. Al pulsar sobre cualquiera de ellas, se genera automáticamente un nuevo listado con todas las plantas que comparten esa misma acción, principio activo o parte de la planta. El campo **uso**, en cambio, se muestra como una lista de texto y no genera listados.

### 2. Búsqueda Directa de Acciones Terapéuticas (`!`)
Permite filtrar específicamente el catálogo por acciones o propiedades fitoterapéuticas.

* **Búsqueda interactiva:** Al escribir `!` seguido de las primeras letras (ejemplo: `! car`), el sistema despliega sugerencias en tiempo real como `CARMINATIVA` o `CARDIOTÓNICA`.
* **Selección directa:** Al seleccionar una opción o escribir el término completo (ejemplo: `! carminativa`), se accede de forma instantánea al listado de plantas vinculadas a esa acción.

### 3. Búsqueda de Definiciones (`!!`)
Permite consultar la definición o explicación de un término, acción fitoterapéutica, principio activo o concepto médico registrado en la aplicación.

* **Sintaxis:** Antepone un doble signo de exclamación `!!` seguido del término a consultar (ejemplos: `!! carminativa` o `!! mucílago`).
* **Resultado:** Despliega una vista rápida con la definición editorial estandarizada del concepto, facilitando la comprensión técnica sin salir del flujo de trabajo.

### 4. Búsqueda de Afecciones y Patologías (`?`)
Permite consultar las afecciones o patologías registradas en la aplicación.

* **Listado completo:** Al escribir solo `?`, se muestran todas las afecciones ordenadas alfabéticamente.
* **Búsqueda:** Al escribir `?` seguido de un texto (ejemplos: `? gastritis` o `? tos`), se filtran las afecciones cuyo **nombre, definición o síntomas** contienen ese texto. La búsqueda no distingue mayúsculas ni tildes, y las afecciones cuyo nombre empieza por lo escrito aparecen en primer lugar.
* **Ficha de la afección:** Al seleccionar una afección del listado, se abre su ficha detallada.

---

## 📂 Registro y Estructura de Datos

Cada registro de planta contenido en `plantas_medicinales.json` cuenta con la siguiente estructura estandarizada:

* `id`: Identificador único.
* `nombreComun`: Denominación principal (siempre en mayúsculas), seguida si procede de sus sinónimos populares separados por comas.
* `nombreBotanico`: Nombre científico aceptado, sin autor.
* `acciones`: Lista de propiedades fitoterapéuticas principales (etiquetas).
* `principiosActivos`: Grupos químicos o marcadores característicos (etiquetas).
* `drogaVegetal`: Parte de la planta utilizada (etiquetas).
* `uso`: Formas de preparación con una breve aclaración opcional (texto libre, no etiquetas).
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
  * El nombre principal va en primer lugar (*ej. `MANZANILLA DULCE`*). Si la planta tiene sinónimos populares, se añaden a continuación separados por comas (*ej. `HIPÉRICO, HIERBA DE SAN JUAN`*).
  * No se usan guiones ni barras como separador. El paréntesis se reserva para aclarar, no para añadir sinónimos (*ej. `CALABAZA (SEMILLA)`*).
* **Nombre botánico:** 
  * Se utiliza la denominación científica aceptada actualmente, sin autor (*ej. `Matricaria chamomilla`*).
  * Si se recogen varias especies o sinónimos, se separan por comas (*ej. `Rosmarinus officinalis, Salvia rosmarinus`*).
* **Acciones:**
  * Las que sean necesarias, priorizando las más importantes de cada planta.
  * Siempre en **singular** y en mayúsculas, como en el JSON (*ej. `ANTIINFLAMATORIA`, `CARMINATIVA`, `SEDANTE`*).
  * Ordenadas por importancia terapéutica.
* **Principios activos:**
  * Se incluyen únicamente los responsables de la actividad farmacológica o marcadores clave (*ej. `Flavonoides`, `Aceite esencial`, `Silimarina`*).
  * Funcionan como etiquetas, por lo que el nombre debe coincidir exactamente entre plantas: solo la inicial en mayúscula (*ej. `Aceite esencial`*), sin plurales ni variantes duplicadas.
  * Cada etiqueta contiene un único compuesto o grupo, sin listas entre paréntesis. Los minerales llevan su símbolo (*ej. `Potasio (K)`*) y las vitaminas su nombre entre paréntesis (*ej. `Vitamina C (ácido ascórbico)`*).
  * No se usan términos genéricos como `Vitaminas` o `Minerales`.
* **Droga vegetal:**
  * Terminología alineada con la Farmacopea Europea (*ej. `Raíz`, `Sumidad florida`, `Hoja`*).
  * Siempre en singular y solo la parte de la planta, sin paréntesis. El estado (fresca, seca, triturada...) y otros detalles se indican en `uso`.
* **Uso:**
  * Indica la forma o preparación empleada, con una breve aclaración opcional entre paréntesis (*ej. `Infusión (hoja fresca)`, `Decocción (una vez al día)`, `Uso externo`*).
  * Es texto libre: no funciona como etiqueta ni requiere una lista cerrada, ya que la misma indicación puede variar de una planta a otra.
* **Observación:**
  * Reservado exclusivamente para advertencias de seguridad destacadas visualmente (*ej. `Abortiva`, `Fotosensibilizante`, `Planta tóxica`*).
  * Las indicaciones concretas sobre cómo emplear la planta (por ejemplo, partes que no deben usarse) se incluyen en `uso`.
* **Notas:**
  * Apartado descriptivo más extenso (historia, cultivo, contexto botánico o tradicional).

### Incorporación de Nuevas Plantas
Las nuevas especies a incorporar deben cumplir:
* Interés fitoterapéutico reconocido.
* Documentación suficiente sobre sus propiedades.
* Respaldo en farmacopeas oficiales o amplio registro tradicional bien documentado.
* Terminología estrictamente compatible con la base de datos.

### Filosofía del Proyecto
FitoMed prioriza **la calidad sobre la cantidad**. Es preferible disponer de un catálogo de plantas cuidadosamente documentadas y estandarizadas que de miles de registros incompletos o inconsistentes.

---

## 🗂️ Documentación y control de calidad

El repositorio incluye archivos de apoyo para revisar y mantener la coherencia de la base de datos. No forman parte de la aplicación y no se descargan al instalar la PWA.

* `principios_activos_referencia.md`: lista de las etiquetas válidas de `principiosActivos`, con el número de plantas que usa cada una.
* `droga_vegetal_referencia.md`: lista de los valores válidos de `drogaVegetal`.
* `listado_plantas.md`: listado completo de plantas en texto, pensado para revisión e impresión.

Estos archivos se generan a partir de `plantas_medicinales.json`, por lo que conviene regenerarlos cada vez que se modifiquen los datos.


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


### Datos
* Plantas: **323**
* Principios activos distintos: **331**
* Acciones distintas: **125**
* Valores de droga vegetal: **39**
* Definiciones: **497**
* Afecciones **60**

---
