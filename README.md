# Campo Sano

Guía para campesinos y técnicos extensionistas: siembra, diagnóstico, soluciones naturales y agroquímicos.

**Funciona sin internet.** Toda la información queda guardada en el teléfono. Solo la identificación automática por foto (IA) necesita conexión.

## Qué tiene la app

| Sección | Para qué sirve |
|---|---|
| **Cómo sembrar** | 48 cultivos con pasos sencillos en lenguaje fácil |
| **Registrar** | Registro en campo: GPS, corregimiento, producto y área sembrada. Acumula datos y da promedios |
| **Identificar** | Reconocer una planta por hoja, fruto, tallo o flor. Con o sin foto |
| **Diagnóstico** | 3 pasos y te dice qué puede tener la planta |
| **Natural** | Remedios caseros y ecológicos. Se intentan primero |
| **Químicos** | Agroquímicos solo como último recurso, con precauciones |
| **Técnico** | Fichas de producción: altitud, densidad de siembra, rendimiento por hectárea, fases del cultivo, costos y riesgos |
| **Mi zona** | Los 15 corregimientos de Santiago de Cali, su altitud y qué se cultiva más en cada uno |

## 📍 Registro en campo (herramienta del extensionista)

Para registrar productores durante la visita, sin necesidad de señal.

**Cómo se usa:**

1. **📡 Tocar para tomar mi ubicación.** La app lee el GPS y detecta sola en qué corregimiento estás. Funciona sin internet: usa los límites reales de los 15 corregimientos guardados en el teléfono.
2. Elige el **producto** sembrado (48 en la lista, o escribe otro).
3. Escribe el **área sembrada en hectáreas**.
4. Opcional: fecha, nombre del productor y observaciones.
5. **Guardar.** El dato queda en el teléfono.

**Qué calcula solo:**

| Indicador | Ejemplo |
|---|---|
| Total de registros | 4 registros |
| Área total sembrada | 8,8 ha |
| Promedio por registro | 2,2 ha |
| Por corregimiento | Felidia: 2,3 ha, 2 registros, promedio 1,15 ha |
| Por producto | Plátano: 4 ha, promedio 2 ha |
| Productores distintos | 3 |
| Registros con GPS | 4 de 4 |

**Además:**

- **📤 Descargar Excel/CSV** — una fila por registro, con corregimiento, producto, área, productor, latitud, longitud, precisión y observaciones. Abre directo en Excel.
- **💾 Respaldo en JSON** — copia de seguridad de todos los registros.
- **📥 Restaurar copia** — para pasar los datos entre teléfonos o unirlos entre varios extensionistas. No duplica: ignora los registros que ya están.

**Datos importantes:**

- Todo se guarda **en el teléfono**, en el almacenamiento local del navegador. No se envía a ningún servidor.
- El GPS guarda la coordenada exacta junto con el dato, así que siempre se puede saber dónde se tomó.
- Si el GPS falla o el punto cae fuera de Cali, el registro se puede hacer igual escribiendo el corregimiento a mano.
- Si cambias de teléfono, **exporta el respaldo antes**: si borras los datos del navegador o desinstalas la app, se pierden.

**Precisión de la zona:** los límites de los 15 corregimientos se descargaron de OpenStreetMap y se simplificaron (unos 20 m). La detección se validó punto por punto contra el geocodificador inverso de Nominatim: **15 de 15 coinciden**. Aun así, si estás justo sobre un límite, la app te avisa cuando estás a menos de 150 m y te deja corregir la zona a mano.

## Fichas técnicas

13 cultivos con ficha completa (platano, cafe, maiz, naranja, limon, aguacate, frijol, yuca, arroz, cana de azucar, tomate, cebolla y papa) y 35 cultivos mas con resumen rapido de altitud y rendimiento.

Cada ficha incluye:

- Altitud, clima y suelo recomendados
- Distancia de siembra y plantas por hectárea
- Rendimiento por hectárea (típico y potencial)
- Costo estimado de establecimiento en pesos colombianos
- Mercado al que va
- Fases del cultivo con tiempos en días
- Riesgos principales
- Clave del manejo

> **Los rendimientos y costos son rangos de referencia, no un presupuesto.**
> Antes de invertir, confirmar con el técnico de la zona, con Finagro y con los paquetes técnicos vigentes del Ministerio de Agricultura.

## Datos regionales

Los productos por corregimiento vienen de la base abierta de la Alcaldía de Santiago de Cali (DAGMA), *Productos agropecuarios producidos en la zona rural de Santiago de Cali*, período 2016-2023.

El número que aparece junto a cada cultivo es **cuántas veredas reportaron ese cultivo**, no hectares. Sirve para comparar qué se cultiva más en cada zona.

Las franjas de altitud son la variable principal para decidir qué se puede sembrar:

| Franja | Altitud | Clima | Corregimientos |
|---|---|---|---|
| V · Valle cálido | 900 a 1.200 m | 24 a 26 °C | Navarro, El Hormiguero |
| T · Transición | 1.200 a 1.800 m | 20 a 24 °C | Pichindé, Felidia, El Saladito, Montebello, La Castilla |
| M · Medio | 1.800 a 2.200 m | 17 a 21 °C | La Elvira, La Leonera, La Paz, Los Andes, Villacarmelo, Golondrinas |
| A · Alto | 2.200 a 3.000 m | 13 a 17 °C | La Buitrera (zona alta) |

## Fuentes técnicas

- Paquetes técnicos del Ministerio de Agricultura y Desarrollo Rural
- Agrosavia
- CENICAÑA (caña de azúcar)
- Federación Nacional de Cafeteros
- Copia Nacional del Cultivo de la Papa (UNAP)
- DAGMA — Alcaldía de Santiago de Cali

## Estructura

```
index.html          Pantalla principal
manifest.json       Datos de la app instalada
sw.js               Service worker: guarda todo para trabajar sin señal
servidor.js         Servidor local para probar en el computador
css/style.css       Estilos
js/app.js           Lógica de la app
js/registro.js      Registro en campo con GPS y promedios  ← nuevo
data/cultivos.js    48 cultivos
data/plagas.js      Plagas y enfermedades
data/identificacion.js  Claves para identificar plantas
data/plantas.js     151 plantas
data/tecnico.js     Fichas técnicas de producción
data/regional.js    Módulo regional de Cali
data/zonas.js       Límites de los 15 corregimientos (para el GPS)  ← nuevo
```

## Probar en el computador

```bash
node servidor.js
```

Luego abre <http://localhost:3000>.

## Instalar en el celular

Abre la app en el navegador del teléfono y usa "Agregar a la pantalla de inicio". Quedará instalada y seguirá funcionando sin internet.

## Uso recomendado

1. **Primero la altitud.** Es lo que decide qué se puede sembrar.
2. **Después la ficha técnica** del cultivo que te interesa.
3. **Luego el diagnóstico** si la planta ya está enferma: natural primero, químico solo de último.
4. **En "Mi zona"** compara con lo que ya se cultiva en tu corregimiento: hay mercado y hay conocimiento local para arrancar.

---

Creado por **Leonardo Favio Caicedo Casquete**
