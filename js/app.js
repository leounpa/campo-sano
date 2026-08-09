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

// ---------- Instalar la app (PWA) ----------
let eventoInstalar = null;

function esIOS() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

function dibujarBotonInstalar() {
  const cont = $("#contenedor-instalar");
  if (!cont) return;
  if (window.matchMedia("(display-mode: standalone)").matches) { cont.innerHTML = ""; return; }
  if (esIOS()) {
    cont.innerHTML = `<button class="boton-grande boton-instalar" onclick="instruccionesInstalar()"><span class="emoji">📲</span>Instalar la app en mi celular<span class="desc">Para usarla como una app normal</span></button>`;
  } else if (eventoInstalar) {
    cont.innerHTML = `<button class="boton-grande boton-instalar" onclick="instalarApp()"><span class="emoji">📲</span>Instalar la app en mi celular<span class="desc">Se agrega al inicio con el icono 🌱</span></button>`;
  } else {
    cont.innerHTML = "";
  }
}

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  eventoInstalar = e;
  dibujarBotonInstalar();
});

window.addEventListener("appinstalled", () => {
  eventoInstalar = null;
  const cont = $("#contenedor-instalar");
  if (cont) cont.innerHTML = "";
});

function instalarApp() {
  if (!eventoInstalar) return;
  eventoInstalar.prompt();
  eventoInstalar.userChoice.then((eleccion) => {
    if (eleccion.outcome === "accepted") {
      const cont = $("#contenedor-instalar");
      if (cont) cont.innerHTML = "";
    }
    eventoInstalar = null;
  });
}

function instruccionesInstalar() {
  const cont = $("#contenedor-instalar");
  if (!cont) return;
  cont.innerHTML = `
    <div class="tarjeta" style="text-align:left">
      <b>📲 Para instalar la app en tu celular:</b>
      <ol class="lista" style="margin-top:6px">
        <li>Pulsa el botón de <b>Compartir</b> en el navegador <span style="font-size:1.2em">⎋</span>.</li>
        <li>Busca y elige <b>“Añadir a la pantalla de inicio”</b> (o “Agregar a inicio”).</li>
        <li>Confirma con <b>Agregar</b> y listo: tendrás la app con su icono 🌱 en tu celular.</li>
      </ol>
    </div>`;
}


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

// Escapa comillas para usarlas dentro de onclick="..."
function q(s) {
  return String(s).replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/"/g, "&quot;");
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
    <div id="contenedor-instalar"></div>
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
  dibujarBotonInstalar();
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
    let html = `
      <div class="tarjeta" style="text-align:center">
        <div style="font-size:2.5rem">🔎🌱</div>
        <h2>¿Qué planta es?</h2>
        <p>Tómale una foto y la app la <b>identifica sola</b> con inteligencia artificial e internet: te dice qué planta es y muestra su información. Sin internet puedes guiarte marcando lo que ves.</p>
      </div>
      ${htmlEstadoIA()}
      <button class="boton-grande" onclick="abrirCamara()"><span class="emoji">📷</span>Tomar foto de la planta</button>
      <button class="boton-grande" onclick="elegirFotoGaleria()"><span class="emoji">🖼️</span>Elegir foto de la galería</button>
      <button class="boton-grande" onclick="iniciarIdentificacion()"><span class="emoji">✋</span>No tengo foto, guíame con lo que veo</button>`;

    const descubrimientos = obtenerDescubrimientos();
    if (descubrimientos.length > 0) {
      html += `<div class="tarjeta"><h2>📒 Mis descubrimientos (${descubrimientos.length})</h2>`;
      descubrimientos.forEach((d) => {
        html += `<div class="tarjeta" style="margin:8px 0">
          ${d.foto ? `<img src="${d.foto}" alt="Foto" style="max-width:100%;max-height:120px;border-radius:8px">` : ""}
          <b>✨ ${esc(d.nombre)}</b>
          <p class="texto-chico">Descubierta el ${esc(d.fecha)}</p>
          ${d.nota ? `<p class="texto-chico">${esc(d.nota)}</p>` : ""}
          <button class="opcion-diag" onclick="eliminarDescubrimiento('${d.id}')">🗑️ Borrar</button>
        </div>`;
      });
      html += `</div>`;
    }
    contenido.innerHTML = html;
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

function tieneCarac(carac, grupo, clave, valor) {
  if (!carac) return false;
  if (clave === null) return Array.isArray(carac[grupo]) && carac[grupo].includes(valor);
  return carac[grupo] && Array.isArray(carac[grupo][clave]) && carac[grupo][clave].includes(valor);
}

function nombreTipo(t) {
  const m = {
    arbol: "🌳 Árbol",
    arbusto: "🌿 Arbusto",
    hierba: "🍃 Hierba o mata",
    rastrera: "🌱 Guía o rastrera",
    palmera: "🌴 Palmera"
  };
  return m[t] || t || "Desconocido";
}

function identificar() {
  const sel = identEstado.sel;
  const todo = [
    ...CULTIVOS.map((c) => ({ c, carac: obtenerCaracteristicas(c.id), esCultivo: true })),
    ...PLANTAS_GENERALES.map((p) => ({ c: p, carac: p, esCultivo: false }))
  ];
  const resultados = todo.map((r) => {
    let puntos = 0;
    let coincidencias = 0;
    if (identEstado.tipo && r.carac && r.carac.tipo === identEstado.tipo) puntos += 3;
    const p = identEstado.parte;
    const agrupar = (grupo, clave, lista) => {
      (lista || []).forEach((v) => {
        if (tieneCarac(r.carac, grupo, clave, v)) { puntos++; coincidencias++; }
      });
    };
    if (p === "hoja") {
      agrupar("hoja", "forma", sel.forma);
      agrupar("hoja", "borde", sel.borde);
      agrupar("hoja", "nervadura", sel.nervadura);
    } else if (p === "fruto") {
      agrupar("fruto", "tamaño", sel.tamaño);
      agrupar("fruto", "forma", sel.forma);
      agrupar("fruto", "color", sel.color);
      agrupar("fruto", "textura", sel.textura);
    } else if (p === "tallo") {
      agrupar("tallo", null, sel.tallo);
    } else {
      agrupar("flor", null, sel.flor);
    }
    return { ...r, puntos, coincidencias };
  }).filter((r) => r.coincidencias > 0)
    .sort((a, b) => b.puntos - a.puntos || b.coincidencias - a.coincidencias);

  return resultados.slice(0, 8);
}

function renderResultadoIdentificacion() {
  const resultados = identificar();
  let html = `<div class="tarjeta"><h2>Posibles plantas</h2>`;
  if (resultados.length === 0) {
    html += `<p>No encontramos una coincidencia clara. Prueba marcar más opciones.</p>`;
    html += `<button class="boton-grande" onclick="identEstado.paso = 3; verIdentificar();">↩️ Volver a las opciones</button>`;
  } else {
    html += `<p class="texto-chico">Estas son las plantas que más coinciden con lo que marcaste (en orden):</p>`;
    html += `<p class="texto-chico">🌐 Si tienes internet, toca "Ver información en internet" en cada planta para leer su información.</p>`;
    resultados.forEach((r, i) => {
      const c = r.c;
      html += `<div class="tarjeta">
        <span class="etiqueta">#${i + 1}</span>
        <h2>${r.esCultivo ? (c.emoji || "🌿") : "🌿"} ${esc(c.nombre)}</h2>
        <p class="texto-chico"><b>${esc(c.cientifico || "")}</b> · ${r.coincidencias} característica(s) en común</p>
        <p class="texto-chico">Tipo: ${nombreTipo(r.carac ? r.carac.tipo : "")}</p>`;
      if (r.esCultivo) {
        html += `<button class="opcion-diag" onclick="abrirDetalleCultivo('${c.id}')">Ver guía de este cultivo →</button>`;
      } else {
        if (c.familia) html += `<p class="texto-chico">Familia: ${esc(c.familia)}</p>`;
        if (c.origen) html += `<p class="texto-chico">Origen: ${esc(c.origen)}</p>`;
        if (c.descripcion) html += `<p>${esc(c.descripcion)}</p>`;
      }
      html += `<button class="opcion-diag" onclick="infoOnline('${c.id}')">🌐 Ver información en internet</button>
        <div id="info-online-${c.id}"></div>`;
      html += `</div>`;
    });
  }
  html += `</div>`;
  html += `<div class="tarjeta">
    <h2>🌱 ¿No encuentras tu planta?</h2>
    <p class="texto-chico">Si ninguna coincide, ¡descúbrela tú mismo! Ponle un nombre común y quedará guardada en tu teléfono.</p>
    <input id="desc-nombre" class="entrada" type="text" placeholder="Nombre común (ej: Flor de mi abuela)">
    <textarea id="desc-nota" class="entrada" rows="2" placeholder="Nota (opcional): dónde la viste, cómo es..."></textarea>
    <p id="desc-error" class="texto-chico" style="color:#c62828"></p>
    <button class="boton-grande" onclick="guardarDescubrimiento()"><span class="emoji">✨</span>Guardar como descubrimiento</button>
  </div>`;
  html += `<button class="boton-grande" onclick="identEstado = { paso: 0, tipo: '', parte: '', foto: null, sel: {} }; verIdentificar();">🔄 Empezar de nuevo</button>`;
  return html;
}

// ---------- Descubrimientos (plantas que el usuario registra) ----------
function obtenerDescubrimientos() {
  try { return JSON.parse(localStorage.getItem("campo-sano-descubrimientos")) || []; } catch (e) { return []; }
}

function guardarDescubrimiento() {
  const nombre = $("#desc-nombre").value.trim();
  if (!nombre) {
    $("#desc-error").textContent = "Escribe al menos un nombre para tu planta.";
    return;
  }
  const nota = $("#desc-nota").value.trim();
  const lista = obtenerDescubrimientos();
  lista.unshift({
    id: "d" + Date.now(),
    nombre,
    nota,
    foto: identEstado.foto || null,
    fecha: new Date().toLocaleDateString("es-CO")
  });
  try { localStorage.setItem("campo-sano-descubrimientos", JSON.stringify(lista)); } catch (e) {}
  identEstado = { paso: 0, tipo: "", parte: "", foto: null, sel: {} };
  verIdentificar();
}

function eliminarDescubrimiento(id) {
  const lista = obtenerDescubrimientos().filter((d) => d.id !== id);
  try { localStorage.setItem("campo-sano-descubrimientos", JSON.stringify(lista)); } catch (e) {}
  verIdentificar();
}

// ---------- Información en internet (Wikipedia) ----------
function buscarInfoPlanta(id) {
  const c = CULTIVOS.find((x) => x.id === id);
  if (c) return { nombre: c.nombre, cientifico: c.cientifico };
  const p = PLANTAS_GENERALES.find((x) => x.id === id);
  if (p) return { nombre: p.nombre, cientifico: p.cientifico };
  return null;
}

function recortar(texto, max) {
  if (texto.length <= max) return texto;
  const corte = texto.lastIndexOf(" ", max);
  return texto.slice(0, corte > 0 ? corte : max) + "…";
}

function enlaceBusqueda(info) {
  return `https://www.google.com/search?q=${encodeURIComponent(info.nombre + " " + (info.cientifico || ""))}`;
}

function infoOnline(id) {
  const cont = $("#info-online-" + id);
  if (!cont) return;
  if (cont.dataset.abierto === "1") { cont.innerHTML = ""; cont.dataset.abierto = ""; return; }
  cont.dataset.abierto = "1";
  const info = buscarInfoPlanta(id);
  if (!info) return;

  if (!navigator.onLine) {
    cont.innerHTML = `<p class="texto-chico">📴 Sin conexión a internet. Conéctate para ver la información de <b>${esc(info.nombre)}</b>.</p>`;
    return;
  }

  cont.innerHTML = `<p class="texto-chico">🌐 Buscando información de <b>${esc(info.nombre)}</b>...</p>`;

  const pedirWiki = (titulo) =>
    fetch("https://es.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=1&explaintext=1&redirects=1&origin=*&titles=" + encodeURIComponent(titulo))
      .then((r) => r.json());

  const pintar = (page) => {
    if (page && page.extract) {
      cont.innerHTML = `<p class="texto-chico" style="margin-bottom:4px">🌐 Información de Wikipedia:</p>
        <b>${esc(page.title)}</b>
        <p>${esc(recortar(page.extract, 700))}</p>
        <a class="enlace" target="_blank" rel="noopener" href="https://es.wikipedia.org/wiki/${encodeURIComponent(page.title.replace(/ /g, "_"))}">Abrir página completa en Wikipedia →</a>`;
    } else {
      cont.innerHTML = `No encontramos artículo en Wikipedia de <b>${esc(info.nombre)}</b>. <a class="enlace" target="_blank" rel="noopener" href="${enlaceBusqueda(info)}">Buscar en Google →</a>`;
    }
  };

  pedirWiki(info.nombre)
    .then((data) => {
      const pages = data.query && data.query.pages ? Object.values(data.query.pages) : [];
      const page = pages.find((p) => p.extract);
      if (page) { pintar(page); return; }
      if (info.cientifico) {
        return pedirWiki(info.cientifico).then((data2) => {
          const pages2 = data2.query && data2.query.pages ? Object.values(data2.query.pages) : [];
          pintar(pages2.find((p) => p.extract));
        });
      }
      pintar(null);
    })
    .catch(() => {
      cont.innerHTML = `No pudimos consultar internet ahora. <a class="enlace" target="_blank" rel="noopener" href="${enlaceBusqueda(info)}">Buscar en Google →</a>`;
    });
}

// ---------- Identificación automática con IA (por foto) ----------
const CLAVE_ID_IA = "campo-sano-clave-ia";
const MODELOS_IA = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"];
const PROMPT_IDENTIFICA = `Eres un ingeniero agrónomo experto en botánica. Observa con detalle la foto de la planta y responde SOLO con un objeto JSON válido, sin texto antes ni después, con exactamente estas claves:
{"nombre_comun":"nombre común en español","nombre_cientifico":"nombre científico","familia":"familia botánica","tipo":"arbol|arbusto|hierba|rastrera|palmera","descripcion":"2 oraciones para reconocerla por sus hojas/tallo/flores","usos":["uso 1","uso 2","uso 3"],"cuidados":"una frase sobre luz, riego y suelo"}
Si no puedes identificarla con seguridad, responde {"nombre_comun":"No identificada","nombre_cientifico":"","familia":"","tipo":"","descripcion":"No estoy seguro de qué planta es.","usos":[],"cuidados":""}`;

function obtenerClaveIA() {
  try { return localStorage.getItem(CLAVE_ID_IA) || ""; } catch (e) { return ""; }
}

function htmlEstadoIA() {
  const clave = obtenerClaveIA();
  if (clave) {
    return `<div class="tarjeta" style="border-left-color:#2e7d32">
      <b>🤖 Identificación automática: activada</b>
      <p class="texto-chico">Toma la foto y la app identificará la planta sola y mostrará su información.</p>
      <button class="opcion-diag" onclick="abrirConfigIA()">⚙️ Cambiar clave</button>
    </div>`;
  }
  return `<div class="tarjeta" style="border-left-color:#ef6c00">
    <b>🤖 Identificación automática por foto</b>
    <p class="texto-chico">Actívala para que al tomar la foto la app identifique la planta <b>sola</b> con inteligencia artificial e internet. Es gratis y toma 1 minuto.</p>
    <button class="opcion-diag" onclick="abrirConfigIA()">⚙️ Activar (gratis)</button>
  </div>`;
}

function abrirConfigIA() {
  titulo.textContent = "Identificación automática";
  btnAtras.classList.add("oculto");
  const clave = obtenerClaveIA();
  contenido.innerHTML = `
    <div class="tarjeta">
      <h2>🤖 Identificación automática por foto</h2>
      <p>Para que la app identifique la planta <b>sola</b> al tomar la foto (con datos de internet), necesitas una <b>clave gratuita de Google</b>:</p>
      <ol class="lista">
        <li>Entra a <a class="enlace" target="_blank" rel="noopener" href="https://aistudio.google.com/apikey">aistudio.google.com/apikey</a> con tu cuenta de Google.</li>
        <li>Pulsa <b>Crear clave de API</b> y cópiala (empieza por <b>AIza…</b>).</li>
        <li>Pégala aquí abajo y pulsa Guardar.</li>
      </ol>
      <input id="clave-ia" class="entrada" type="text" placeholder="Pega tu clave aquí (AIza...)" value="${esc(clave)}">
      <p id="clave-ia-error" class="texto-chico" style="color:#c62828"></p>
      <button class="boton-grande" onclick="guardarConfigIA()">💾 Guardar</button>
      ${clave ? `<button class="opcion-diag" onclick="borrarConfigIA()">🗑️ Quitar clave</button>` : ""}
      <button class="opcion-diag" onclick="verIdentificar()">↩️ Volver</button>
    </div>
    <div class="aviso"><b>Nota:</b> la clave se guarda solo en tu teléfono. No compartas el enlace público de la app para que nadie use tu clave.</div>`;
}

function guardarConfigIA() {
  const v = $("#clave-ia").value.trim();
  const err = $("#clave-ia-error");
  if (!v) { err.textContent = "Pega la clave antes de guardar."; return; }
  if (!/^AIza/i.test(v)) { err.textContent = "La clave de Google empieza con 'AIza'. Revisa que la hayas copiado bien."; return; }
  localStorage.setItem(CLAVE_ID_IA, v);
  verIdentificar();
}

function borrarConfigIA() {
  localStorage.removeItem(CLAVE_ID_IA);
  verIdentificar();
}

function elegirFotoGaleria() {
  const inp = document.createElement("input");
  inp.type = "file";
  inp.accept = "image/*";
  inp.style.display = "none";
  document.body.appendChild(inp);
  inp.addEventListener("change", () => {
    const archivo = inp.files && inp.files[0];
    if (!archivo) { inp.remove(); return; }
    const lector = new FileReader();
    lector.onload = () => {
      identEstado.foto = lector.result;
      inp.remove();
      if (obtenerClaveIA()) {
        identificarConIA();
      } else {
        titulo.textContent = "Identificar";
        contenido.innerHTML = `
          <div class="tarjeta" style="text-align:center">
            <img src="${identEstado.foto}" alt="Foto de la planta" style="max-width:100%;max-height:200px;border-radius:10px">
            <p style="margin-top:8px">Para que la app <b>identifique la planta sola</b>, activa la identificación automática (gratis, 1 minuto):</p>
            <button class="boton-grande" onclick="abrirConfigIA()">⚙️ Activar identificación automática</button>
            <p class="texto-chico">o</p>
            <button class="opcion-diag" onclick="iniciarIdentificacion()">✋ Guiarme con lo que veo (sin internet)</button>
            <button class="opcion-diag" onclick="verIdentificar()">↩️ Volver</button>
          </div>`;
      }
    };
    lector.readAsDataURL(archivo);
  });
  inp.click();
}

async function identificarConIA() {
  const clave = obtenerClaveIA();
  if (!clave || !identEstado.foto) { iniciarIdentificacion(); return; }
  titulo.textContent = "Identificando…";
  btnAtras.classList.add("oculto");
  contenido.innerHTML = `
    <div class="tarjeta" style="text-align:center">
      <div style="font-size:2.5rem">🤖</div>
      <p><b>Analizando tu foto con inteligencia artificial…</b></p>
      <p class="texto-chico">Identificando la planta y buscando su información. Esto toma unos segundos.</p>
    </div>`;
  const base64 = (identEstado.foto.split(",")[1] || identEstado.foto).replace(/\s+/g, "");
  let ultimo = null;
  for (const modelo of MODELOS_IA) {
    try {
      const url = "https://generativelanguage.googleapis.com/v1beta/models/" + modelo + ":generateContent?key=" + encodeURIComponent(clave);
      const resp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [
            { inline_data: { mime_type: "image/jpeg", data: base64 } },
            { text: PROMPT_IDENTIFICA }
          ] }],
          generationConfig: { temperature: 0.2, maxOutputTokens: 900 }
        })
      });
      if (!resp.ok) {
        const errJson = await resp.json().catch(() => null);
        const msg = errJson && errJson.error && errJson.error.message ? errJson.error.message : "Error " + resp.status;
        ultimo = msg;
        if (/model|not found|not exist|does not exist/i.test(msg)) continue;
        break;
      }
      const datos = await resp.json();
      const texto = (datos.candidates && datos.candidates[0] && datos.candidates[0].content && datos.candidates[0].content.parts)
        ? datos.candidates[0].content.parts.map((p) => p.text || "").join("")
        : "";
      renderResultadoIA(texto);
      return;
    } catch (e) {
      ultimo = e && e.message ? e.message : "Error de conexión. Revisa tu internet.";
      break;
    }
  }
  contenido.innerHTML = `
    <div class="tarjeta">
      <h2>No se pudo identificar automáticamente</h2>
      <p class="texto-chico">${esc(ultimo || "Error")}</p>
      <p class="texto-chico">Sugerencias: revisa que tengas internet y que la clave sea correcta y esté activada.</p>
      <button class="boton-grande" onclick="abrirConfigIA()">⚙️ Revisar la clave</button>
      <button class="opcion-diag" onclick="iniciarIdentificacion()">✋ Guiarme con lo que veo (sin internet)</button>
      <button class="opcion-diag" onclick="abrirCamara()">📷 Tomar otra foto</button>
      <button class="opcion-diag" onclick="verIdentificar()">↩️ Volver</button>
    </div>`;
}

function emparejarPlantaIA(ia) {
  const nombres = [ia.nombre_comun, ia.nombre_cientifico].filter(Boolean).map((n) => n.toLowerCase().trim());
  const matcher = (c) => {
    const cand = [c.nombre, c.cientifico].filter(Boolean).map((n) => n.toLowerCase().trim());
    return nombres.some((n) => cand.some((c2) => c2 === n || (n.length > 3 && c2.length > 3 && (c2.includes(n) || n.includes(c2)))));
  };
  let c = CULTIVOS.find(matcher);
  if (c) return { c, esCultivo: true };
  c = PLANTAS_GENERALES.find(matcher);
  if (c) return { c, esCultivo: false };
  return null;
}

function renderResultadoIA(texto) {
  let ia = null;
  try {
    let limpio = String(texto || "").replace(/```[a-zA-Z]*\n?/g, "").replace(/```/g, "").trim();
    const ini = limpio.indexOf("{");
    const fin = limpio.lastIndexOf("}");
    if (ini >= 0 && fin > ini) ia = JSON.parse(limpio.slice(ini, fin + 1));
  } catch (e) { ia = null; }

  const noIdentificada = !ia || !ia.nombre_comun || /no identific/i.test(ia.nombre_comun);
  if (noIdentificada) {
    contenido.innerHTML = `
      <div class="tarjeta">
        <h2>No se pudo identificar</h2>
        <p class="texto-chico">La inteligencia artificial no reconoció la planta con seguridad. Prueba con una foto más nítida, de cerca y con buena luz.</p>
        <button class="opcion-diag" onclick="abrirCamara()">📷 Tomar otra foto</button>
        <button class="opcion-diag" onclick="iniciarIdentificacion()">✋ Guiarme con lo que veo</button>
        <button class="opcion-diag" onclick="verIdentificar()">↩️ Volver a empezar</button>
      </div>`;
    return;
  }

  const local = emparejarPlantaIA(ia);
  const nombreFinal = local ? local.c.nombre : (ia.nombre_comun || "Planta");
  const cientFinal = local && local.c.cientifico ? local.c.cientifico : (ia.nombre_cientifico || "");
  titulo.textContent = "🌿 " + nombreFinal;
  btnAtras.classList.add("oculto");

  let html = `<div class="detalle">`;
  if (identEstado.foto) html += `<div class="tarjeta" style="text-align:center"><img src="${identEstado.foto}" alt="Foto de la planta" style="max-width:100%;max-height:200px;border-radius:10px"></div>`;
  html += `<div class="tarjeta">
    <h2>${esc(nombreFinal)}</h2>
    ${cientFinal ? `<p><b>Nombre científico:</b> <i>${esc(cientFinal)}</i></p>` : ""}
    ${ia.familia ? `<p><b>Familia:</b> ${esc(ia.familia)}</p>` : ""}
    ${ia.tipo ? `<p><b>Tipo:</b> ${esc(nombreTipo(ia.tipo))}</p>` : ""}
    ${ia.descripcion ? `<p>${esc(ia.descripcion)}</p>` : ""}
    ${ia.usos && ia.usos.length ? `<div class="seccion-titulo">🪴 Usos</div><ul class="lista">${listar(ia.usos)}</ul>` : ""}
    ${ia.cuidados ? `<div class="seccion-titulo">💧 Cuidados</div><p>${esc(ia.cuidados)}</p>` : ""}
  </div>`;

  if (local) {
    if (local.esCultivo) {
      html += `<button class="boton-grande" onclick="abrirDetalleCultivo('${q(local.c.id)}')"><span class="emoji">📖</span>Ver guía de siembra en Campo Sano</button>`;
    } else {
      const c = local.c;
      html += `<div class="tarjeta"><p><b>Familia:</b> ${esc(c.familia || "")}</p>${c.origen ? `<p><b>Origen:</b> ${esc(c.origen)}</p>` : ""}${c.descripcion ? `<p>${esc(c.descripcion)}</p>` : ""}</div>`;
      html += `<button class="boton-grande" onclick="infoOnline('${q(c.id)}')"><span class="emoji">🌐</span>Ver información en internet</button>
        <div id="info-online-${q(c.id)}"></div>`;
    }
  } else {
    const nombreWeb = ia.nombre_cientifico || ia.nombre_comun;
    html += `<div class="tarjeta">
      <button class="opcion-diag" onclick="infoOnlineNombre('${q(nombreWeb)}')">🌐 Ver información de <b>${esc(nombreWeb)}</b> en internet</button>
      <div id="info-online-ia"></div>
    </div>`;
  }

  html += `<div class="tarjeta">
    <button class="opcion-diag" onclick="abrirCamara()">📷 Tomar otra foto</button>
    <button class="opcion-diag" onclick="iniciarIdentificacion()">✋ ¿No es esta? Guiarme con lo que veo</button>
    <button class="opcion-diag" onclick="identEstado = { paso: 0, tipo: '', parte: '', foto: null, sel: {} }; verIdentificar();">🔄 Empezar de nuevo</button>
  </div>`;
  html += `</div>`;
  contenido.innerHTML = html;
}

function infoOnlineNombre(nombre) {
  const cont = $("#info-online-ia");
  if (!cont) return;
  if (cont.dataset.abierto === "1") { cont.innerHTML = ""; cont.dataset.abierto = ""; return; }
  cont.dataset.abierto = "1";
  if (!navigator.onLine) {
    cont.innerHTML = `<p class="texto-chico">📴 Sin conexión a internet. Conéctate para ver la información de <b>${esc(nombre)}</b>.</p>`;
    return;
  }
  cont.innerHTML = `<p class="texto-chico">🌐 Buscando información de <b>${esc(nombre)}</b>...</p>`;
  const pedirWiki = (titulo) =>
    fetch("https://es.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=1&explaintext=1&redirects=1&origin=*&titles=" + encodeURIComponent(titulo))
      .then((r) => r.json());
  pedirWiki(nombre)
    .then((data) => {
      const pages = data.query && data.query.pages ? Object.values(data.query.pages) : [];
      const page = pages.find((p) => p.extract);
      if (page && page.extract) {
        cont.innerHTML = `<p class="texto-chico" style="margin-bottom:4px">🌐 Información de Wikipedia:</p>
          <b>${esc(page.title)}</b>
          <p>${esc(recortar(page.extract, 700))}</p>
          <a class="enlace" target="_blank" rel="noopener" href="https://es.wikipedia.org/wiki/${encodeURIComponent(page.title.replace(/ /g, "_"))}">Abrir página completa en Wikipedia →</a>`;
      } else {
        cont.innerHTML = `Sin artículo en Wikipedia de <b>${esc(nombre)}</b>. <a class="enlace" target="_blank" rel="noopener" href="https://www.google.com/search?q=${encodeURIComponent(nombre)}">Buscar en Google →</a>`;
      }
    })
    .catch(() => {
      cont.innerHTML = `No pudimos consultar internet ahora. <a class="enlace" target="_blank" rel="noopener" href="https://www.google.com/search?q=${encodeURIComponent(nombre)}">Buscar en Google →</a>`;
    });
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
  if (obtenerClaveIA()) {
    identificarConIA();
  } else {
    titulo.textContent = "Identificar";
    contenido.innerHTML = `
      <div class="tarjeta" style="text-align:center">
        <img src="${identEstado.foto}" alt="Foto de la planta" style="max-width:100%;max-height:200px;border-radius:10px">
        <p style="margin-top:8px">Para que la app <b>identifique la planta sola</b> al tomar la foto, activa la identificación automática (gratis, 1 minuto):</p>
        <button class="boton-grande" onclick="abrirConfigIA()">⚙️ Activar identificación automática</button>
        <p class="texto-chico">o</p>
        <button class="opcion-diag" onclick="iniciarIdentificacion()">✋ Guiarme con lo que veo (sin internet)</button>
        <button class="opcion-diag" onclick="verIdentificar()">↩️ Volver</button>
      </div>`;
  }
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
