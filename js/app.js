// Campo Sano - Lógica de la aplicación
// Navegación, diagnóstico por síntomas y búsqueda.

const $ = (sel) => document.querySelector(sel);
const contenido = $("#contenido");
const titulo = $("#titulo");
const btnAtras = $("#btn-atras");
const buscador = $("#buscador-flotante");
const busqueda = $("#busqueda");

let seccionActual = "inicio";
let pilaNavegacion = [];

// ---------- Síntomas comunes para el diagnóstico ----------
const SINTOMAS_COMUNES = [
  { id: "agujeros", texto: "Agujeros en las hojas", claves: ["agujeros", "rasgadas", "hojas comidas", "cogollo", "excremento"] },
  { id: "insectos", texto: "Insectos pequeños visibles", claves: ["pulgones", "insectos verdes", "insectos negros", "mosca blanca", "mosquitas blancas", "trips", "pulgas", "escarbajo"] },
  { id: "manchas", texto: "Manchas en las hojas", claves: ["manchas", "manchas marrones", "manchas negras", "puntitos", "sigatoka"] },
  { id: "amarillo", texto: "Hojas amarillas", claves: ["amarillas", "amarillo", "pálidas"] },
  { id: "enrolladas", texto: "Hojas enrolladas o pegajosas", claves: ["enrolladas", "pegajoso", "hormigas"] },
  { id: "cortado", texto: "Tallo cortado o planta caída", claves: ["cortadas", "tallos cortados", "plantas caídas", "planta caída", "trocero"] },
  { id: "moho", texto: "Moho o polvo blancuzco", claves: ["moho", "polvo blanco", "fumagina"] },
  { id: "seca", texto: "Hojas secas o puntas secas", claves: ["seca", "secas", "hojas secas"] },
  { id: "podrido", texto: "Frutos o raíces podridas", claves: ["podridas", "se pudre", "frutos caídos"] },
  { id: "baba", texto: "Baba plateada o caracoles", claves: ["baba", "babosa", "caracol", "plateado"] },
  { id: "caminos", texto: "Caminos blancos en zigzag en las hojas", claves: ["zigzag", "galerías", "caminos", "líneas blancas", "minador"] },
  { id: "roya", texto: "Polvo amarillo o naranja en la hoja", claves: ["roya", "polvo amarillo", "polvo naranja"] },
  { id: "grano", texto: "Agujeritos en granos o frutos", claves: ["agujeritos", "granos huecos", "cereza", "broca", "agujeritos en el grano"] },
  { id: "tizon", texto: "Manchas oscuras que se pudren (avanza rápido)", claves: ["tizon", "gota", "aceitosas", "manchas oscuras", "manchas cafés"] },
  { id: "plateado", texto: "Puntitos o franjas plateadas", claves: ["plateado", "franjas", "barras plateadas"] }
];

// ---------- Utilidades ----------
function esc(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}

function listar(arr) {
  return arr.map((i) => "<li>" + esc(i) + "</li>").join("");
}

function gradoTexto(g) {
  if (g === "alta") return "⚠️ Grave: actuar pronto";
  if (g === "media") return "🔶 Medianamente grave";
  return "🔸 Leve";
}

// ---------- Navegación ----------
function irA(seccion, estado) {
  seccionActual = seccion;
  pilaNavegacion = [];
  buscarOculto();
  marcarMenu(seccion);
  const vistas = {
    inicio: verInicio,
    cultivos: verCultivos,
    identificar: verIdentificar,
    diagnostico: verDiagnostico,
    soluciones: verSoluciones,
    quimicos: verQuimicos
  };
  (vistas[seccion] || verInicio)(estado);
}

function abrirDetalleCultivo(id) {
  pilaNavegacion.push({ seccion: seccionActual });
  const c = obtenerCultivo(id);
  if (!c) return;
  titulo.textContent = c.emoji + " " + c.nombre;
  btnAtras.classList.remove("oculto");
  buscarOculto();
  contenido.innerHTML = `
    <div class="detalle">
      <div class="tarjeta">
        <p><b>Nombre científico:</b> ${esc(c.cientifico)}</p>
        <p><b>🌡️ Clima:</b> ${esc(c.clima)}</p>
        <p><b>🪨 Suelo:</b> ${esc(c.suelo)}</p>
        <p><b>🗓️ Época de siembra:</b> ${esc(c.epoca)}</p>
        <p><b>🌱 Germinación:</b> ${esc(c.germinacion)}</p>
        <p><b>💧 Riego:</b> ${esc(c.riego)}</p>
        <p><b>☀️ Sol:</b> ${esc(c.sol)}</p>
        <p><b>🧺 Cosecha:</b> ${esc(c.cosecha)}</p>
      </div>
      <div class="tarjeta">
        <h2>📋 Cuidados paso a paso</h2>
        <ul class="lista">${listar(c.cuidados)}</ul>
      </div>
      <div class="tarjeta">
        <h2>🐛 Problemas comunes en este cultivo</h2>
        ${c.plagas.map((id) => {
          const p = obtenerPlaga(id);
          return p ? `<button class="opcion-diag" onclick="abrirDetallePlaga('${p.id}')">${p.emoji} ${esc(p.nombre)} <span class="texto-chico">(${esc(p.tipo)})</span></button>` : "";
        }).join("")}
      </div>
      <button class="boton-grande" onclick="irA('diagnostico', { cultivo: '${c.id}' })"><span class="emoji">🔍</span>Diagnosticar este cultivo</button>
    </div>`;
}

function abrirDetallePlaga(id) {
  pilaNavegacion.push({ seccion: seccionActual, extra: id });
  const p = obtenerPlaga(id);
  if (!p) return;
  titulo.textContent = p.emoji + " " + p.nombre;
  btnAtras.classList.remove("oculto");
  buscarOculto();
  contenido.innerHTML = `
    <div class="detalle">
      <div class="tarjeta">
        <span class="etiqueta">${esc(p.tipo)}</span>
        <span class="etiqueta">${gradoTexto(p.gravedad)}</span>
        <p class="texto-chico" style="margin-top:6px">Afecta: ${p.cultivos.map((cid) => { const c = obtenerCultivo(cid); return c ? c.nombre : ""; }).filter(Boolean).join(", ")}</p>
      </div>
      <div class="tarjeta">
        <div class="seccion-titulo">👀 ¿Cómo lo reconoces?</div>
        <ul class="lista">${listar(p.sintomas)}</ul>
      </div>
      <div class="tarjeta">
        <div class="seccion-titulo">🛡️ Prevención</div>
        <p>${esc(p.prevencion)}</p>
      </div>
      <div class="tarjeta" style="border-left-color:#2e7d32">
        <div class="seccion-titulo">🌿 Soluciones naturales (primero intenta estas)</div>
        <ul class="lista">${listar(p.solucionesNaturales)}</ul>
      </div>
      <div class="aviso-peligro">
        <b>⚠️ Agroquímicos: SOLO como último recurso</b>
        <p>Usa lo natural primero. Si debes usar químicos:</p>
        <ul class="lista">
          ${p.agroquimicos.map((a) => `<li><b>${esc(a.nombre)}</b> (${esc(a.ingrediente)}). ${esc(a.como)}<br><b>Cuidado:</b> ${esc(a.precaucion)}</li>`).join("")}
        </ul>
      </div>
    </div>`;
}

// ---------- Vistas ----------
function verInicio() {
  titulo.textContent = "Campo Sano";
  btnAtras.classList.add("oculto");
  contenido.innerHTML = `
    <div class="tarjeta" style="background:#2e7d32;color:#fff;text-align:center">
      <div style="font-size:2.5rem">🌱</div>
      <h2 style="color:#fff">Tu guía del campo</h2>
      <p style="color:#e0f2e0">Aprende a sembrar, cuidar y curar tus cultivos. Todo con lenguaje sencillo.</p>
    </div>
    <div class="menu-inicio">
      <button class="boton-grande" onclick="irA('cultivos')"><span class="emoji">📖</span>Cómo sembrar</button>
      <button class="boton-grande" onclick="irA('identificar')"><span class="emoji">🔎</span>Identificar</button>
      <button class="boton-grande" onclick="irA('diagnostico')"><span class="emoji">🔍</span>Diagnóstico</button>
      <button class="boton-grande" onclick="irA('soluciones')"><span class="emoji">🌿</span>Natural</button>
      <button class="boton-grande" onclick="irA('quimicos')"><span class="emoji">⚠️</span>Químicos</button>
    </div>
    <div class="tarjeta">
      <h2>💡 ¿Cómo usar esta app?</h2>
      <ul class="lista">
        <li><b>📖 Cómo sembrar:</b> elige tu cultivo y mira los pasos.</li>
        <li><b>🔎 Identificar:</b> descubre qué planta es mirando sus hojas, frutos, tallo o flores (con o sin foto).</li>
        <li><b>🔍 Diagnóstico:</b> cuéntanos qué le pasa a tu planta y te decimos qué puede ser.</li>
        <li><b>🌿 Natural:</b> remedios caseros y ecológicos para plagas.</li>
        <li><b>⚠️ Químicos:</b> información de agroquímicos, solo para casos graves.</li>
      </ul>
    </div>
    <div class="aviso">
      <b>Importante:</b> esta app es una guía de apoyo. Si el daño es muy grave o no estás seguro, consulta a un agrónomo o técnico de tu zona.
    </div>`;
}

function verCultivos() {
  titulo.textContent = "Cómo sembrar";
  btnAtras.classList.add("oculto");
  contenido.innerHTML = `
    <div class="tarjeta"><p>Elige tu cultivo para ver cómo sembrarlo, cuidarlo y cuándo cosechar.</p></div>
    <div class="lista-items">
      ${CULTIVOS.map((c) => `<button class="item" onclick="abrirDetalleCultivo('${c.id}')"><span class="emoji">${c.emoji}</span><span class="nombre">${esc(c.nombre)}</span></button>`).join("")}
    </div>`;
}

function verDiagnostico(estado) {
  titulo.textContent = "Diagnóstico";
  btnAtras.classList.add("oculto");
  const paso = estado ? estado.paso : 1;
  let html = `
    <div class="pasos">Paso ${paso} de 3</div>
    <div class="aviso"><b>¿Cómo funciona?</b> Contesta 3 preguntas fáciles y la app te dice qué puede tener tu planta y cómo curarla.</div>`;

  if (paso === 1) {
    html += `<div class="tarjeta"><h2>1️⃣ ¿Qué cultivo es?</h2>`;
    html += CULTIVOS.map((c) => `<button class="opcion-diag" onclick="irA('diagnostico', { paso: 2, cultivo: '${c.id}' })">${c.emoji} ${esc(c.nombre)}</button>`).join("");
    html += `<button class="opcion-diag" onclick="irA('diagnostico', { paso: 2, cultivo: '' })">🤔 No sé / otro cultivo</button>`;
    html += `</div>`;
  } else if (paso === 2) {
    const cultivo = estado.cultivo;
    const c = cultivo ? obtenerCultivo(cultivo) : null;
    html += `<div class="tarjeta"><h2>2️⃣ ¿Qué le ves a la planta?</h2>`;
    html += `<p class="texto-chico">Marca todo lo que veas (puedes tocar varias).${c ? " Cultivo: <b>" + c.nombre + "</b>" : ""}</p>`;
    html += SINTOMAS_COMUNES.map((s) => `<button class="opcion-diag" onclick="marcarSintoma('${s.id}', '${esc(s.texto)}')" id="sintoma-${s.id}">${esc(s.texto)}</button>`).join("");
    html += `<button class="boton-grande" onclick="irA('diagnostico', { paso: 3, cultivo: '${cultivo}', sintomas: obtenerSeleccion() })"><span class="emoji">🔍</span>Ver resultados</button>`;
    html += `</div>`;
  } else {
    html += `<div class="tarjeta"><h2>3️⃣ Resultados</h2>`;
    const resultados = diagnosticar(estado.cultivo, estado.sintomas || []);
    if (resultados.length === 0) {
      html += `<p>No encontramos una coincidencia clara. Prueba marcar más síntomas o busca con palabras.</p>`;
      html += `<button class="boton-grande" onclick="mostrarBuscador()">🔎 Buscar por palabras</button>`;
    } else {
      html += `<p class="texto-chico">Estos son los problemas más probables según lo que marcaste (en orden de coincidencia):</p>`;
      resultados.forEach((r, i) => {
        html += `<div class="tarjeta">
          <span class="etiqueta">#${i + 1}</span>
          <h2>${r.emoji} ${esc(r.nombre)}</h2>
          <p class="texto-chico">${gradoTexto(r.gravedad)} · Coincide con ${r.coincidencias} síntoma(s)</p>
          <button class="opcion-diag" onclick="abrirDetallePlaga('${r.id}')">Ver cómo tratarlo →</button>
        </div>`;
      });
    }
    html += `</div>`;
    html += `<button class="boton-grande" onclick="irA('diagnostico')">🔄 Empezar de nuevo</button>`;
  }
  contenido.innerHTML = html;
}

// Selección temporal de síntomas del paso 2
let sintomasSeleccion = new Set();

function marcarSintoma(id, texto) {
  if (sintomasSeleccion.has(id)) {
    sintomasSeleccion.delete(id);
    $("#sintoma-" + id).style.background = "#fff";
  } else {
    sintomasSeleccion.add(id);
    $("#sintoma-" + id).style.background = "#dceacd";
  }
}

function obtenerSeleccion() {
  return Array.from(sintomasSeleccion);
}

function diagnosticar(cultivoId, sintomasIds) {
  const pestes = cultivoId ? obtenerPlagasPorCultivo(cultivoId) : PLAGAS;
  const resultados = pestes.map((p) => {
    let coincidencias = 0;
    const clavesPlaga = p.clavesSintomas.join(" ").toLowerCase();
    sintomasIds.forEach((sid) => {
      const s = SINTOMAS_COMUNES.find((x) => x.id === sid);
      if (s && s.claves.some((clave) => clavesPlaga.includes(clave.toLowerCase()))) coincidencias++;
    });
    return { p, coincidencias };
  }).filter((r) => r.coincidencias > 0)
    .sort((a, b) => b.coincidencias - a.coincidencias);
  return resultados.slice(0, 5).map((r) => ({ ...r.p, coincidencias: r.coincidencias }));
}

function verSoluciones() {
  titulo.textContent = "Soluciones naturales";
  btnAtras.classList.add("oculto");
  contenido.innerHTML = `
    <div class="tarjeta"><p>🌿 Todas las soluciones naturales y caseras, por problema. Intenta siempre primero estas opciones.</p></div>
    <div class="tarjeta" style="border-left-color:#ef6c00">
      <b>Antes que nada:</b> recuerda que lo natural no contamina, no daña tu salud ni a los animales, y es más barato.
    </div>
    ${PLAGAS.map((p) => `<button class="boton-grande" onclick="abrirDetallePlaga('${p.id}')"><span class="emoji">${p.emoji}</span>${esc(p.nombre)}<span class="desc">${esc(p.tipo)} · ver remedios naturales</span></button>`).join("")}`;
}

function verQuimicos() {
  titulo.textContent = "Agroquímicos";
  btnAtras.classList.add("oculto");
  contenido.innerHTML = `
    <div class="aviso-peligro">
      <b>⚠️ LEE ESTO PRIMERO</b>
      <p>Los agroquímicos son peligrosos para tu salud, tu familia, los animales y el agua.</p>
      <p>Úsalos <b>SOLO como último recurso</b>, cuando lo natural no funcionó.</p>
      <p>Siempre: usa guantes y mascarilla, respeta las dosis, no comas el cultivo antes del tiempo de espera y guarda los envases fuera del alcance de niños.</p>
    </div>
    <div class="tarjeta"><p>Elige el problema para ver qué agroquímico puede usarse y cómo hacerlo con seguridad.</p></div>
    ${PLAGAS.map((p) => `<button class="boton-grande" onclick="abrirDetallePlaga('${p.id}')"><span class="emoji">${p.emoji}</span>${esc(p.nombre)}<span class="desc">ver opciones químicas con precauciones</span></button>`).join("")}`;
}

// ---------- Identificación de plantas ----------
let identEstado = { paso: 0, tipo: "", parte: "", foto: null, sel: {} };

function verIdentificar() {
  titulo.textContent = "Identificar";
  btnAtras.classList.add("oculto");
  detenerCamara();

  if (identEstado.paso === 0) {
    contenido.innerHTML = `
      <div class="tarjeta" style="text-align:center">
        <div style="font-size:2.5rem">🔎🌱</div>
        <h2>¿Qué planta es?</h2>
        <p>Te ayudamos a reconocer tu planta mirando sus hojas, tallo, frutos y flores. Funciona sin internet.</p>
      </div>
      <div class="aviso"><b>¿Cómo funciona?</b> Primero puedes tomarle una foto para tenerla de guía, y luego respondes 3 preguntas fáciles sobre lo que ves.</div>
      <button class="boton-grande" onclick="abrirCamara()"><span class="emoji">📷</span>Tomar foto de la planta</button>
      <button class="boton-grande" onclick="iniciarIdentificacion()"><span class="emoji">✋</span>No tengo foto, guíame con lo que veo</button>`;
    return;
  }

  const pasos = ["parte", "tipo", "caracteristicas", "resultado"];
  const pasoActual = identEstado.paso;
  let html = `<div class="pasos">Paso ${pasoActual} de 3</div>`;

  if (identEstado.foto) {
    html += `<div class="tarjeta" style="text-align:center"><img src="${identEstado.foto}" alt="Foto de la planta" style="max-width:100%;max-height:200px;border-radius:10px"><p class="texto-chico">📷 Esta es la foto que tomaste (sírvete de guía)</p></div>`;
  }

  if (pasoActual === 1) {
    // Elegir parte de la planta
    html += `<div class="tarjeta"><h2>1️⃣ ¿Qué parte vas a mirar?</h2>`;
    html += OPCIONES_ID.parte.map((o) => `<button class="opcion-diag" onclick="setParte('${o.v}')">${o.t}</button>`).join("");
    html += `</div>`;
  } else if (pasoActual === 2) {
    // Elegir tipo de planta
    html += `<div class="tarjeta"><h2>2️⃣ ¿Qué clase de planta es?</h2>`;
    html += OPCIONES_ID.tipo.map((o) => `<button class="opcion-diag" onclick="setTipo('${o.v}')">${o.t}</button>`).join("");
    html += `<button class="opcion-diag" onclick="setTipo('')">🤔 No estoy seguro</button>`;
    html += `</div>`;
  } else if (pasoActual === 3) {
    html += renderPasoCaracteristicas();
  } else {
    html += renderResultadoIdentificacion();
  }
  contenido.innerHTML = html;
}

function iniciarIdentificacion() {
  identEstado = { paso: 1, tipo: "", parte: "", foto: identEstado.foto, sel: {} };
  verIdentificar();
}

function setParte(p) {
  identEstado.parte = p;
  identEstado.sel = {};
  identEstado.paso = 2;
  verIdentificar();
}

function setTipo(t) {
  identEstado.tipo = t;
  identEstado.paso = 3;
  verIdentificar();
}

function renderPasoCaracteristicas() {
  const p = identEstado.parte;
  let html = `<div class="tarjeta"><h2>3️⃣ Describe lo que ves</h2><p class="texto-chico">Marca las opciones que coincidan (puedes marcar varias).</p>`;
  if (p === "hoja") {
    html += `<div class="seccion-titulo">Forma de la hoja</div>`;
    html += OPCIONES_ID.hoja.forma.map((o) => `<button class="opcion-diag" onclick="marcarId('forma','${o.v}')" id="id-forma-${o.v}">${o.t}</button>`).join("");
    html += `<div class="seccion-titulo">Borde</div>`;
    html += OPCIONES_ID.hoja.borde.map((o) => `<button class="opcion-diag" onclick="marcarId('borde','${o.v}')" id="id-borde-${o.v}">${o.t}</button>`).join("");
    html += `<div class="seccion-titulo">Nervaduras (las venitas)</div>`;
    html += OPCIONES_ID.hoja.nervadura.map((o) => `<button class="opcion-diag" onclick="marcarId('nervadura','${o.v}')" id="id-nervadura-${o.v}">${o.t}</button>`).join("");
  } else if (p === "fruto") {
    html += `<div class="seccion-titulo">Tamaño</div>`;
    html += OPCIONES_ID.fruto.tamaño.map((o) => `<button class="opcion-diag" onclick="marcarId('tamaño','${o.v}')" id="id-tamaño-${o.v}">${o.t}</button>`).join("");
    html += `<div class="seccion-titulo">Forma</div>`;
    html += OPCIONES_ID.fruto.forma.map((o) => `<button class="opcion-diag" onclick="marcarId('forma','${o.v}')" id="id-forma-${o.v}">${o.t}</button>`).join("");
    html += `<div class="seccion-titulo">Color</div>`;
    html += OPCIONES_ID.fruto.color.map((o) => `<button class="opcion-diag" onclick="marcarId('color','${o.v}')" id="id-color-${o.v}">${o.t}</button>`).join("");
    html += `<div class="seccion-titulo">Textura</div>`;
    html += OPCIONES_ID.fruto.textura.map((o) => `<button class="opcion-diag" onclick="marcarId('textura','${o.v}')" id="id-textura-${o.v}">${o.t}</button>`).join("");
  } else if (p === "tallo") {
    html += `<div class="seccion-titulo">¿Cómo es el tallo?</div>`;
    html += OPCIONES_ID.tallo.map((o) => `<button class="opcion-diag" onclick="marcarId('tallo','${o.v}')" id="id-tallo-${o.v}">${o.t}</button>`).join("");
  } else {
    html += `<div class="seccion-titulo">Color de la flor</div>`;
    html += OPCIONES_ID.flor.map((o) => `<button class="opcion-diag" onclick="marcarId('flor','${o.v}')" id="id-flor-${o.v}">${o.t}</button>`).join("");
  }
  html += `<button class="boton-grande" onclick="identEstado.paso = 4; verIdentificar();"><span class="emoji">🔍</span>Ver resultados</button>`;
  html += `</div>`;
  return html;
}

function marcarId(categoria, valor) {
  const boton = $("#id-" + categoria + "-" + valor);
  if (!boton) return;
  if (!identEstado.sel[categoria]) identEstado.sel[categoria] = [];
  const lista = identEstado.sel[categoria];
  const idx = lista.indexOf(valor);
  if (idx >= 0) {
    lista.splice(idx, 1);
    boton.style.background = "#fff";
  } else {
    lista.push(valor);
    boton.style.background = "#dceacd";
  }
}

function identificar(cultivoIdOpcional) {
  const sel = identEstado.sel;
  const resultados = CULTIVOS.map((c) => {
    const carac = obtenerCaracteristicas(c.id);
    if (!carac) return { c, puntos: 0, coincidencias: 0 };
    let puntos = 0;
    let coincidencias = 0;
    if (identEstado.tipo && carac.tipo === identEstado.tipo) puntos += 3;

    if (identEstado.parte === "hoja") {
      if (sel.forma) sel.forma.forEach((v) => { if (carac.hoja.forma.includes(v)) { puntos++; coincidencias++; } });
      if (sel.borde) sel.borde.forEach((v) => { if (carac.hoja.borde.includes(v)) { puntos++; coincidencias++; } });
      if (sel.nervadura) sel.nervadura.forEach((v) => { if (carac.hoja.nervadura.includes(v)) { puntos++; coincidencias++; } });
    } else if (identEstado.parte === "fruto") {
      if (sel.tamaño) sel.tamaño.forEach((v) => { if ((carac.fruto.tamaño || []).includes(v)) { puntos++; coincidencias++; } });
      if (sel.forma) sel.forma.forEach((v) => { if ((carac.fruto.forma || []).includes(v)) { puntos++; coincidencias++; } });
      if (sel.color) sel.color.forEach((v) => { if ((carac.fruto.color || []).includes(v)) { puntos++; coincidencias++; } });
      if (sel.textura) sel.textura.forEach((v) => { if ((carac.fruto.textura || []).includes(v)) { puntos++; coincidencias++; } });
    } else if (identEstado.parte === "tallo") {
      if (sel.tallo) sel.tallo.forEach((v) => { if (carac.tallo.includes(v)) { puntos++; coincidencias++; } });
    } else {
      if (sel.flor) sel.flor.forEach((v) => { if (carac.flor.includes(v)) { puntos++; coincidencias++; } });
    }
    return { c, puntos, coincidencias };
  }).filter((r) => r.coincidencias > 0)
    .sort((a, b) => b.puntos - a.puntos || b.coincidencias - a.coincidencias);

  return resultados.slice(0, 6);
}

function renderResultadoIdentificacion() {
  const resultados = identificar();
  let html = `<div class="tarjeta"><h2>Posibles plantas</h2>`;
  if (resultados.length === 0) {
    html += `<p>No encontramos una coincidencia clara. Prueba marcar más opciones.</p>`;
    html += `<button class="boton-grande" onclick="identEstado.paso = 3; verIdentificar();">↩️ Volver a las opciones</button>`;
  } else {
    html += `<p class="texto-chico">Estas son las plantas que más coinciden con lo que marcaste (en orden):</p>`;
    resultados.forEach((r, i) => {
      html += `<div class="tarjeta">
        <span class="etiqueta">#${i + 1}</span>
        <h2>${r.c.emoji} ${esc(r.c.nombre)}</h2>
        <p class="texto-chico">${esc(r.c.cientifico)} · ${r.coincidencias} característica(s) en común</p>
        <button class="opcion-diag" onclick="abrirDetalleCultivo('${r.c.id}')">Ver guía de este cultivo →</button>
      </div>`;
    });
  }
  html += `</div>`;
  html += `<button class="boton-grande" onclick="identEstado = { paso: 0, tipo: '', parte: '', foto: null, sel: {} }; verIdentificar();">🔄 Empezar de nuevo</button>`;
  return html;
}

// ---------- Cámara ----------
let streamCamara = null;
let videoElemento = null;

function abrirCamara() {
  detenerCamara();
  contenido.innerHTML = `
    <div class="tarjeta" style="text-align:center">
      <h2>📷 Toma una foto</h2>
      <video id="camara" autoplay playsinline style="width:100%;max-height:300px;border-radius:10px;background:#000"></video>
      <p id="camara-error" class="texto-chico"></p>
      <button class="boton-grande" onclick="capturarFoto()"><span class="emoji">📸</span>Tomar foto</button>
      <button class="opcion-diag" onclick="identEstado = { paso: 0, tipo: '', parte: '', foto: null, sel: {} }; verIdentificar();">↩️ Cancelar</button>
    </div>`;
  videoElemento = $("#camara");
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false })
      .then((s) => {
        streamCamara = s;
        videoElemento.srcObject = s;
        videoElemento.play().catch(() => {});
      })
      .catch((e) => {
        $("#camara-error").textContent = "No se pudo abrir la cámara: " + (e && e.message ? e.message : "permiso denegado") + ". Puedes seguir sin foto.";
      });
  } else {
    $("#camara-error").textContent = "Este navegador no permite cámara. Puedes seguir sin foto.";
  }
}

function capturarFoto() {
  if (!videoElemento) return;
  const canvas = document.createElement("canvas");
  canvas.width = videoElemento.videoWidth || 640;
  canvas.height = videoElemento.videoHeight || 480;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(videoElemento, 0, 0, canvas.width, canvas.height);
  identEstado.foto = canvas.toDataURL("image/jpeg", 0.7);
  detenerCamara();
  iniciarIdentificacion();
}

function detenerCamara() {
  if (streamCamara) {
    streamCamara.getTracks().forEach((t) => t.stop());
    streamCamara = null;
  }
}

// ---------- Búsqueda ----------
function mostrarBuscador() {
  buscarOculto();
  buscador.classList.remove("oculto");
  busqueda.focus();
}

function buscarOculto() {
  buscador.classList.add("oculto");
  busqueda.value = "";
}

function buscar(term) {
  const t = term.trim().toLowerCase();
  if (!t) return verDiagnostico();
  titulo.textContent = "Resultados";
  const resultados = [];
  PLAGAS.forEach((p) => {
    const textoCompleto = [p.nombre, p.tipo, p.sintomas.join(" "), p.clavesSintomas.join(" ")].join(" ").toLowerCase();
    if (textoCompleto.includes(t)) resultados.push(p);
  });
  contenido.innerHTML = `
    <div class="tarjeta"><p>Resultados para <b>"${esc(term)}"</b>:</p></div>
    ${resultados.length === 0 ? `<div class="tarjeta"><p>No encontramos nada. Prueba con otras palabras, por ejemplo: manchas, gusano, baba, moho, agujeros.</p></div>` : resultados.map((p) => `
      <div class="tarjeta resultado-busq">
        <h2>${p.emoji} ${esc(p.nombre)}</h2>
        <p class="texto-chico">${esc(p.sintomas[0])}</p>
        <button class="opcion-diag" onclick="abrirDetallePlaga('${p.id}')">Ver cómo tratarlo →</button>
      </div>`).join("")}`;
}

// ---------- Eventos ----------
function marcarMenu(seccion) {
  document.querySelectorAll(".m-item").forEach((b) => {
    b.classList.toggle("activo", b.dataset.seccion === seccion);
  });
}

document.querySelectorAll(".m-item").forEach((b) => {
  b.addEventListener("click", () => irA(b.dataset.seccion));
});

btnAtras.addEventListener("click", () => {
  const anterior = pilaNavegacion.pop();
  if (anterior) {
    if (anterior.seccion === "diagnostico") verDiagnostico();
    else irA(anterior.seccion);
  } else {
    irA("inicio");
  }
});

busqueda.addEventListener("input", (e) => {
  if (e.target.value.trim()) buscar(e.target.value);
  else irA("diagnostico");
});

// ---------- Service worker (para funcionar sin internet) ----------
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

// ---------- Arranque ----------
irA("inicio");
