// Campo Sano - Registro de Productores en campo
// El extensionista registra en la finca: ubicacion por GPS, corregimiento,
// producto y area sembrada. Todo queda guardado en el telefono y funciona sin internet.

const CLAVE_REGISTROS = "campo-sano-registros-v1";

let regEstado = { lat: null, lon: null, exactitud: null, altitud: null, zonaId: "" };

// ---------- Guardado en el telefono ----------

function cargarRegistros() {
  try {
    const crudo = localStorage.getItem(CLAVE_REGISTROS);
    if (!crudo) return [];
    const arr = JSON.parse(crudo);
    return Array.isArray(arr) ? arr : [];
  } catch (e) {
    return [];
  }
}

function guardarRegistrosEnDisco(lista) {
  try {
    localStorage.setItem(CLAVE_REGISTROS, JSON.stringify(lista));
    return true;
  } catch (e) {
    return false;
  }
}

function nombreCultivo(id) {
  const c = obtenerCultivo(id);
  return c ? c.nombre : id;
}

// ---------- GPS ----------

function obtenerUbicacion() {
  const caja = document.getElementById("caja-gps");
  const btn = document.getElementById("btn-gps");
  if (!("geolocation" in navigator)) {
    caja.innerHTML = '<div class="aviso-peligro">Este navegador no tiene GPS. Escribe el corregimiento a mano.</div>';
    return;
  }
  caja.innerHTML = '<div class="pasos">Buscando señal GPS...</div>';
  btn.disabled = true;

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      btn.disabled = false;
      regEstado.lat = pos.coords.latitude;
      regEstado.lon = pos.coords.longitude;
      regEstado.exactitud = pos.coords.accuracy;
      regEstado.altitud = pos.coords.altitude;

      const zona = typeof zonaDesdeGps === "function" ? zonaDesdeGps(regEstado.lat, regEstado.lon) : null;
      if (zona) regEstado.zonaId = zona.id;

      const dist = zona ? Math.round(distanciaAlBorde(regEstado.lat, regEstado.lon, zona)) : null;

      caja.innerHTML = `
        <div class="tarjeta gps-ok">
          <b>📡 Ubicación tomada</b>
          <p class="texto-chico">Latitud ${regEstado.lat.toFixed(5)} · Longitud ${regEstado.lon.toFixed(5)}</p>
          <p class="texto-chico">Precisión: ${Math.round(regEstado.exactitud)} m${regEstado.altitud ? " · Altitud: " + Math.round(regEstado.altitud) + " m" : ""}</p>
          ${zona
            ? `<p><b>Zona detectada: ${esc(zona.nombre)}</b>${dist !== null && dist < 150 ? ' <span class="texto-chico">(estás a ' + dist + " m del límite, revisa)</span>" : ""}</p>`
            : '<div class="aviso">Este punto no cae dentro de los corregimientos de Cali. Elige la zona a mano.</div>'}
          ${zona ? '<button class="boton-grande" onclick="irA(\'regional\')">📈 Ver qué se cultiva en ' + esc(zona.nombre) + '</button>' : ""}
        </div>`;
      const sel = document.getElementById("sel-zona");
      if (sel && zona) sel.value = zona.id;
      refrescarResumenFlotante();
    },
    (err) => {
      btn.disabled = false;
      const msg =
        err.code === 1 ? "No diste permiso para usar el GPS."
        : err.code === 2 ? "No se pudo leer la señal del GPS."
        : "El GPS está tomando demasiado tiempo. Intenta de nuevo en campo abierto.";
      caja.innerHTML = `<div class="aviso-peligro"><b>⚠️ ${msg}</b><br>Puedes registrar igual escribiendo el corregimiento a mano.</div>`;
    },
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
  );
}

// ---------- Formulario ----------

function opcionesZonas() {
  const lista = typeof ZONAS !== "undefined" ? ZONAS : [];
  return (
    '<option value="">Elige el corregimiento...</option>' +
    lista.map((z) => `<option value="${z.id}">${esc(z.nombre)}</option>`).join("") +
    '<option value="otro">Otro municipio o fuera de Cali</option>'
  );
}

function opcionesCultivos() {
  return (
    '<option value="">Elige el producto...</option>' +
    CULTIVOS.map((c) => `<option value="${c.id}">${c.emoji} ${esc(c.nombre)}</option>`).join("") +
    '<option value="otro">Otro producto (escríbelo abajo)</option>'
  );
}

function verRegistro() {
  titulo.textContent = "Registro en campo";
  btnAtras.classList.add("oculto");
  const hoy = new Date().toISOString().slice(0, 10);
  contenido.innerHTML = `
    <div class="tarjeta">
      <p><b>Registra la visita.</b> La app guarda el dato en este teléfono, aunque no haya señal.</p>
    </div>

    <div class="tarjeta">
      <div class="seccion-titulo">1. Ubicación (GPS)</div>
      <button id="btn-gps" class="boton-grande" onclick="obtenerUbicacion()"><span class="emoji">📡</span>Tocar para tomar mi ubicación</button>
      <div id="caja-gps"></div>
    </div>

    <div class="tarjeta">
      <div class="seccion-titulo">2. Datos del registro</div>
      <label class="campo">Corregimiento</label>
      <select id="sel-zona" class="entrada" onchange="regEstado.zonaId = this.value">${opcionesZonas()}</select>

      <label class="campo">Producto sembrado</label>
      <select id="sel-cultivo" class="entrada" onchange="mostrarOtroCultivo()">${opcionesCultivos()}</select>

      <div id="caja-otro-cultivo" class="oculto">
        <label class="campo">Nombre del producto</label>
        <input id="inp-otro-cultivo" class="entrada" type="text" placeholder="Ej: maracuyá, ají, pasto">
      </div>

      <label class="campo">Área sembrada (hectáreas)</label>
      <input id="inp-area" class="entrada" type="number" step="0.01" min="0" inputmode="decimal" placeholder="Ej: 1.5">

      <label class="campo">Fecha</label>
      <input id="inp-fecha" class="entrada" type="date" value="${hoy}">

      <label class="campo">Productor (opcional)</label>
      <input id="inp-productor" class="entrada" type="text" placeholder="Nombre del productor o lote">

      <label class="campo">Observaciones (opcional)</label>
      <textarea id="inp-obs" class="entrada" rows="3" placeholder="Manejo, problema, variedad,merketing"></textarea>

      <button class="boton-grande boton-guardar" onclick="guardarRegistro()"><span class="emoji">💾</span>Guardar registro</button>
      <div id="caja-mensaje"></div>
    </div>

    <div class="tarjeta">
      <div class="seccion-titulo">3. Resumen de lo registrado</div>
      <div id="resumen-flotante"></div>
      <button class="boton-grande" onclick="irA('resumen')"><span class="emoji">📊</span>Ver promedios y totales</button>
    </div>

    <button class="boton-grande" onclick="exportarCSV()"><span class="emoji">📤</span>Descargar Excel/CSV</button>
    <button class="boton-grande" onclick="exportarJSON()"><span class="emoji">💾</span>Respaldar copia (JSON)</button>
    <button class="boton-grande" onclick="document.getElementById('inp-importar').click()"><span class="emoji">📥</span>Restaurar copia</button>
    <input id="inp-importar" type="file" accept=".json,application/json" class="oculto" onchange="importarJSON(this)">`;

  refrescarResumenFlotante();
}

function mostrarOtroCultivo() {
  const sel = document.getElementById("sel-cultivo");
  const caja = document.getElementById("caja-otro-cultivo");
  if (!sel || !caja) return;
  caja.classList.toggle("oculto", sel.value !== "otro");
}

function guardarRegistro() {
  const msg = document.getElementById("caja-mensaje");
  const zona = document.getElementById("sel-zona").value;
  const cult = document.getElementById("sel-cultivo").value;
  const areaTxt = document.getElementById("inp-area").value.trim().replace(",", ".");
  const fecha = document.getElementById("inp-fecha").value;
  const productor = document.getElementById("inp-productor").value.trim();
  const obs = document.getElementById("inp-obs").value.trim();

  let otroCultivo = "";
  if (cult === "otro") {
    otroCultivo = document.getElementById("inp-otro-cultivo").value.trim();
    if (!otroCultivo) { avisar("Escribe el nombre del producto.", true); return; }
  }

  if (!zona) { avisar("Elige el corregimiento.", true); return; }
  if (!cult) { avisar("Elige el producto sembrado.", true); return; }
  const area = parseFloat(areaTxt);
  if (isNaN(area) || area <= 0) { avisar("Escribe el área sembrada en hectáreas (número mayor que 0).", true); return; }

  const reg = {
    id: "r" + Date.now().toString(36) + Math.floor(Math.random() * 1e4).toString(36),
    fecha: fecha || new Date().toISOString().slice(0, 10),
    zona: zona,
    zonaNombre: zona === "otro" ? "Fuera de Cali" : (typeof ZONAS !== "undefined" ? (ZONAS.find((z) => z.id === zona) || {}).nombre : zona),
    cultivo: cult,
    cultivoNombre: cult === "otro" ? otroCultivo : nombreCultivo(cult),
    areaHa: area,
    productor: productor,
    obs: obs,
    lat: regEstado.lat,
    lon: regEstado.lon,
    exactitud: regEstado.exactitud,
    altitud: regEstado.altitud,
    ts: new Date().toISOString()
  };

  const lista = cargarRegistros();
  lista.push(reg);
  if (!guardarRegistrosEnDisco(lista)) {
    avisar("No se pudo guardar. El almacenamiento del navegador está lleno o bloqueado.", true);
    return;
  }

  avisar(
    "✅ Guardado: " + esc(reg.cultivoNombre) + ", " + reg.areaHa + " ha en " + esc(reg.zonaNombre) + ".",
    false
  );

  document.getElementById("inp-area").value = "";
  document.getElementById("inp-obs").value = "";
  refrescarResumenFlotante();
}

function avisar(texto, esError) {
  const msg = document.getElementById("caja-mensaje");
  if (!msg) return;
  msg.innerHTML = esError
    ? `<div class="aviso-peligro">${texto}</div>`
    : `<div class="aviso" style="border-left-color:#2e7d32;background:#e8f5e9">${texto}</div>`;
}

// ---------- Resumen y promedios ----------

function calcularResumen(lista) {
  const porZona = {};
  const porCultivo = {};
  let areaTotal = 0;

  for (const r of lista) {
    areaTotal += r.areaHa || 0;

    if (!porZona[r.zonaNombre]) porZona[r.zonaNombre] = { nombre: r.zonaNombre, registros: 0, area: 0, productores: {} };
    porZona[r.zonaNombre].registros++;
    porZona[r.zonaNombre].area += r.areaHa || 0;
    if (r.productor) porZona[r.zonaNombre].productores[r.productor] = true;

    const clave = r.cultivoNombre || "Sin dato";
    if (!porCultivo[clave]) porCultivo[clave] = { nombre: clave, registros: 0, area: 0 };
    porCultivo[clave].registros++;
    porCultivo[clave].area += r.areaHa || 0;
  }

  const zonas = Object.values(porZona).map((z) => ({
    nombre: z.nombre,
    registros: z.registros,
    area: z.area,
    promedio: z.registros ? z.area / z.registros : 0,
    productores: Object.keys(z.productores).length
  })).sort((a, b) => b.area - a.area);

  const cultivos = Object.values(porCultivo).map((c) => ({
    nombre: c.nombre,
    registros: c.registros,
    area: c.area,
    promedio: c.registros ? c.area / c.registros : 0
  })).sort((a, b) => b.area - a.area);

  const productores = new Set(lista.filter((r) => r.productor).map((r) => r.productor)).size;

  return {
    total: lista.length,
    areaTotal: areaTotal,
    promedio: lista.length ? areaTotal / lista.length : 0,
    zonas,
    cultivos,
    productores,
    conGps: lista.filter((r) => r.lat !== null && r.lat !== undefined).length
  };
}

function num(n) {
  return (Math.round(n * 100) / 100).toLocaleString("es-CO");
}

function refrescarResumenFlotante() {
  const caja = document.getElementById("resumen-flotante");
  if (!caja) return;
  const lista = cargarRegistros();
  if (!lista.length) {
    caja.innerHTML = '<p class="texto-chico">Todavía no hay registros. Registra el primero arriba.</p>';
    return;
  }
  const r = calcularResumen(lista);
  caja.innerHTML = `
    <div class="cifras">
      <div class="cifra"><b>${r.total}</b><span>registros</span></div>
      <div class="cifra"><b>${num(r.areaTotal)}</b><span>hectáreas</span></div>
      <div class="cifra"><b>${num(r.promedio)}</b><span>ha por registro</span></div>
      <div class="cifra"><b>${r.zonas.length}</b><span>zonas</span></div>
    </div>`;
}

function verResumen() {
  titulo.textContent = "Resumen de registros";
  btnAtras.classList.add("oculto");
  const lista = cargarRegistros();

  if (!lista.length) {
    contenido.innerHTML = `
      <div class="tarjeta"><p>Todavía no hay ningún registro guardado.</p></div>
      <button class="boton-grande" onclick="irA('registro')"><span class="emoji">📍</span>Ir a registrar</button>`;
    return;
  }

  const r = calcularResumen(lista);
  const conGps = lista.filter((x) => x.lat !== null && x.lat !== undefined);

  contenido.innerHTML = `
    <div class="tarjeta">
      <div class="seccion-titulo">Totales</div>
      <div class="cifras">
        <div class="cifra"><b>${r.total}</b><span>registros</span></div>
        <div class="cifra"><b>${num(r.areaTotal)}</b><span>hectáreas</span></div>
        <div class="cifra"><b>${num(r.promedio)}</b><span>promedio ha/registro</span></div>
        <div class="cifra"><b>${r.productores}</b><span>productores</span></div>
      </div>
      <p class="texto-chico">${r.conGps} de ${r.total} registros tienen ubicación GPS.</p>
    </div>

    <div class="tarjeta">
      <div class="seccion-titulo">📍 Por corregimiento</div>
      ${r.zonas.map((z) => `
        <div class="fila-resumen">
          <b>${esc(z.nombre)}</b>
          <div class="texto-chico">${z.registros} registros · ${num(z.area)} ha · promedio ${num(z.promedio)} ha${z.productores ? " · " + z.productores + " productores" : ""}</div>
        </div>`).join("")}
    </div>

    <div class="tarjeta">
      <div class="seccion-titulo">🌱 Por producto</div>
      ${r.cultivos.map((c) => `
        <div class="fila-resumen">
          <b>${esc(c.nombre)}</b>
          <div class="texto-chico">${c.registros} registros · ${num(c.area)} ha · promedio ${num(c.promedio)} ha</div>
        </div>`).join("")}
    </div>

    <div class="tarjeta">
      <div class="seccion-titulo">🕒 Últimos registros</div>
      ${lista.slice().reverse().slice(0, 12).map((x) => `
        <div class="fila-resumen">
          <b>${esc(x.cultivoNombre)}</b> <span class="texto-chico">${esc(x.fecha)}</span>
          <div class="texto-chico">${num(x.areaHa)} ha · ${esc(x.zonaNombre)}${x.productor ? " · " + esc(x.productor) : ""}${x.lat !== null && x.lat !== undefined ? " · 📡" : ""}</div>
          ${x.obs ? `<div class="texto-chico">${esc(x.obs)}</div>` : ""}
        </div>`).join("")}
    </div>

    <button class="boton-grande" onclick="exportarCSV()"><span class="emoji">📤</span>Descargar Excel/CSV</button>
    <button class="boton-grande" onclick="exportarJSON()"><span class="emoji">💾</span>Respaldar copia (JSON)</button>
    <button class="boton-grande" onclick="document.getElementById('inp-importar2').click()"><span class="emoji">📥</span>Restaurar copia</button>
    <input id="inp-importar2" type="file" accept=".json,application/json" class="oculto" onchange="importarJSON(this)">
    <button class="boton-grande boton-peligro" onclick="borrarTodo()"><span class="emoji">🗑️</span>Borrar todos los registros</button>`;
}

// ---------- Descargar y respaldar ----------

function descargar(texto, nombre, tipo) {
  const blob = new Blob([texto], { type: tipo });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = nombre;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

function exportarCSV() {
  const lista = cargarRegistros();
  if (!lista.length) { alert("No hay registros para descargar."); return; }
  const cab = ["id", "fecha", "corregimiento", "producto", "area_ha", "productor", "latitud", "longitud", "precision_m", "altitud_m", "observaciones"];
  const filas = lista.map((r) => [
    r.id, r.fecha, r.zonaNombre, r.cultivoNombre, r.areaHa, r.productor || "",
    r.lat !== null && r.lat !== undefined ? r.lat.toFixed(6) : "",
    r.lon !== null && r.lon !== undefined ? r.lon.toFixed(6) : "",
    r.exactitud ? Math.round(r.exactitud) : "",
    r.altitud ? Math.round(r.altitud) : "",
    (r.obs || "").replace(/[\r\n]+/g, " ")
  ]);
  const csv = [cab, ...filas]
    .map((f) => f.map((v) => '"' + String(v === undefined ? "" : v).replace(/"/g, '""') + '"').join(";"))
    .join("\r\n");
  descargar("﻿" + csv, "campo-sano-registros-" + new Date().toISOString().slice(0, 10) + ".csv", "text/csv;charset=utf-8");
}

function exportarJSON() {
  const lista = cargarRegistros();
  descargar(JSON.stringify({ app: "campo-sano", version: 1, fecha: new Date().toISOString(), registros: lista }, null, 2),
    "campo-sano-respaldo-" + new Date().toISOString().slice(0, 10) + ".json", "application/json");
}

function importarJSON(input) {
  const file = input.files && input.files[0];
  if (!file) return;
  const lector = new FileReader();
  lector.onload = () => {
    try {
      const obj = JSON.parse(lector.result);
      const nuevos = Array.isArray(obj) ? obj : obj.registros;
      if (!Array.isArray(nuevos)) throw new Error("formato");
      const actual = cargarRegistros();
      const ids = new Set(actual.map((r) => r.id));
      let nuevosTotal = 0;
      for (const r of nuevos) {
        if (!r || r.id === undefined) continue;
        if (ids.has(r.id)) continue;
        actual.push(r);
        ids.add(r.id);
        nuevosTotal++;
      }
      guardarRegistrosEnDisco(actual);
      alert("Se restauraron " + nuevosTotal + " registros. Ahora hay " + actual.length + " en total.");
      irA("resumen");
    } catch (e) {
      alert("El archivo no es una copia válida de Campo Sano.");
    }
    input.value = "";
  };
  lector.readAsText(file);
}

function borrarTodo() {
  const lista = cargarRegistros();
  if (!lista.length) return;
  if (!confirm("Vas a borrar " + lista.length + " registros de este teléfono. Si no tienes copia, no se pueden recuperar. ¿Continuar?")) return;
  guardarRegistrosEnDisco([]);
  alert("Registros borrados.");
  irA("resumen");
}