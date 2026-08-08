# FitoMed Database

## Criterios editoriales

Este documento define las normas editoriales utilizadas en la elaboración y mantenimiento de la base de datos de **FitoMed**.

El objetivo principal es construir una base de datos fitoterapéutica rigurosa, homogénea y fácilmente mantenible, priorizando la utilidad práctica frente a la acumulación indiscriminada de información.

---

# Objetivos

La base de datos debe cumplir los siguientes principios:

* Información científicamente contrastada cuando exista evidencia disponible.
* Terminología uniforme.
* Estructura sencilla.
* Fácil mantenimiento.
* Orientación práctica para la fitoterapia.
* Compatibilidad con la PWA FitoMed y con FitoMed Admin.

---

# Fuentes de referencia

Las fuentes utilizadas se consultarán siguiendo el siguiente orden de prioridad:

1. Farmacopea Europea (Ph. Eur.)
2. ESCOP
3. EMA (HMPC)
4. Comisión E Alemana
5. Literatura científica reciente revisada por pares.

Cuando existan discrepancias entre diferentes fuentes, prevalecerán la Farmacopea Europea, ESCOP y EMA.

Para determinadas plantas de uso tradicional que dispongan de menor documentación científica moderna, podrán considerarse también fuentes tradicionales y farmacognósticas de reconocida relevancia. Entre ellas se incluyen, especialmente, las tradiciones médicas ayurvédicas, siempre diferenciando el uso tradicional de la evidencia clínica actualmente disponible.

---

# Registro de cada planta

Cada planta contiene actualmente los siguientes campos:

* id
* nombreComun
* nombreBotanico
* acciones
* principiosActivos
* drogaVegetal
* uso
* observacion
* notas

La estructura del archivo JSON deberá mantenerse lo más simple posible.

---

# Nombre común

* Siempre en mayúsculas.
* Un único nombre principal por planta.
* Los sinónimos podrán incorporarse en futuras versiones si fuese necesario.

Ejemplo:

```text
MANZANILLA DULCE
```

---

# Nombre botánico

Se utilizará la denominación científica aceptada actualmente.

Ejemplo:

```text
Matricaria chamomilla L.
```

---

# Acciones

Las acciones representan las propiedades fitoterapéuticas principales de la planta.

## Criterios

* Máximo recomendado: 10 acciones.
* Lo habitual será entre 3 y 6.
* Se incluirán únicamente las acciones relevantes para el uso fitoterapéutico.
* No se añadirán acciones experimentales sin aplicación clínica consolidada.
* Las acciones se ordenarán por importancia terapéutica.
* No es necesario incluir todas las actividades farmacológicas descritas en la literatura si no tienen relevancia práctica en fitoterapia.

Una planta puede presentar numerosas actividades farmacológicas, pero el registro deberá centrarse en aquellas que tengan mayor relevancia para su utilización fitoterapéutica habitual.

## Terminología

Siempre en singular.

Ejemplos:

* Antiinflamatoria
* Digestiva
* Carminativa
* Antiespasmódica
* Antioxidante
* Hepatoprotectora
* Colerética
* Colagoga
* Diurética
* Sedante
* Ansiolítica
* Expectorante
* Mucolítica
* Antiséptica
* Antimicrobiana
* Emoliente
* Demulcente
* Astringente
* Hipoglucemiante
* Hipolipemiante

No deberán utilizarse variantes en plural ni expresiones equivalentes.

---

# Principios activos

Se incluirán únicamente los principios activos responsables de la actividad farmacológica o aquellos considerados relevantes desde el punto de vista farmacognóstico.

No es necesario listar todos los compuestos identificados.

Se priorizarán:

* grupos químicos
* principios activos característicos
* marcadores farmacológicos

Ejemplos:

* Flavonoides
* Taninos
* Saponinas
* Mucílagos
* Aceite esencial
* Alcaloides
* Cumarinas
* Iridoides
* Alicina
* Silimarina
* Ginkgólidos
* Hipericina
* Hiperforina
* Valepotriatos

---

# Droga vegetal

Se utilizará la terminología de la Farmacopea Europea.

Ejemplos:

* Raíz
* Rizoma
* Bulbo
* Corteza
* Hojas
* Flores
* Sumidad florida
* Frutos
* Semillas
* Pericarpio

---

# Uso

El campo "uso" recogerá únicamente las principales indicaciones fitoterapéuticas.

No pretende sustituir una monografía completa.

El término **uso** se refiere a la forma o preparación mediante la que se emplea la planta, cuando corresponda.

Ejemplos:

* Infusión
* Decocción
* Polvo
* Extracto
* Uso externo
* Aplicación tópica

---

# Observación

Este campo está reservado exclusivamente para advertencias importantes que deban destacarse visualmente.

Ejemplos:

* Abortiva
* Uso exclusivamente externo
* Planta tóxica
* Fotosensibilizante

Debe contener únicamente mensajes breves.

---

# Notas

Las notas constituyen el apartado descriptivo de la planta.

Pueden incluir:

* descripción botánica
* distribución
* historia
* curiosidades
* información farmacognóstica
* detalles de cultivo
* información complementaria

No existe un límite estricto de longitud.

---

# Incorporación de nuevas plantas

Las nuevas especies deberán cumplir los siguientes requisitos:

* interés fitoterapéutico reconocido;
* documentación suficiente sobre sus propiedades o usos;
* respaldo en Farmacopea Europea, ESCOP o EMA cuando exista;
* terminología compatible con el resto de la base de datos.

También podrán incorporarse plantas cuyo uso fitoterapéutico esté ampliamente documentado por la tradición médica y farmacognóstica, aunque su investigación científica moderna sea todavía limitada.

En estos casos, especialmente cuando se trate de plantas utilizadas tradicionalmente en sistemas como la medicina ayurvédica, la información deberá reflejar claramente su carácter tradicional y no presentar dicho uso como equivalente a una evidencia clínica moderna cuando esta no exista.

No se añadirán especies únicamente por aumentar el número de registros.

---

# Búsqueda de acciones

La PWA permite realizar búsquedas específicas de acciones mediante el comando:

```text
!a
```

Por ejemplo:

```text
!a car
```

mostrará dinámicamente las acciones que coincidan con el texto introducido, como:

```text
CARMINATIVA
CARDIOTÓNICA
```

El usuario puede continuar escribiendo hasta encontrar la acción deseada o seleccionar directamente una de las opciones mostradas.

Al seleccionar una acción, FitoMed genera el mismo listado de plantas que se obtiene al pulsar dicha acción desde la ficha de cualquier planta.

También es posible introducir directamente la acción completa:

```text
!a carminativa
```

En este caso se accederá directamente al listado correspondiente.

Este sistema utiliza las acciones registradas en `plantas_medicinales.json`, por lo que la nomenclatura de las acciones debe mantenerse uniforme en toda la base de datos.

---

# Filosofía del proyecto

FitoMed prioriza la calidad sobre la cantidad.

Es preferible disponer de unas 300 plantas cuidadosamente documentadas que de miles de registros incompletos o inconsistentes.

La base de datos debe mantenerse sencilla, coherente y fácilmente editable durante muchos años.

La información científica disponible tendrá prioridad cuando exista, pero FitoMed también reconoce el valor documental y farmacognóstico del uso tradicional de determinadas plantas, especialmente aquellas utilizadas durante largos periodos en sistemas médicos tradicionales como el Ayurveda.

En estos casos se procurará mantener una separación clara entre:

* evidencia científica moderna;
* conocimiento farmacognóstico;
* uso tradicional.

De esta manera, FitoMed puede recoger un patrimonio fitoterapéutico amplio sin presentar como evidencia clínica aquello que todavía no ha sido suficientemente estudiado.

