// Campo Sano - Base de datos de identificación de plantas
// Características por parte: hoja (forma, borde, nervadura), tallo, fruto y flor.

const TIPO_DEFAULT = {
  arbol: {
    tipo: "arbol",
    hoja: { forma: ["ancha", "ovalada", "lanza"], borde: ["lisa"], nervadura: ["reticulada"] },
    tallo: ["leñoso", "liso"],
    flor: ["blanca", "amarilla"]
  },
  arbusto: {
    tipo: "arbusto",
    hoja: { forma: ["ancha", "ovalada", "lanza"], borde: ["lisa", "dentada"], nervadura: ["reticulada"] },
    tallo: ["leñoso", "verde suave"],
    flor: ["blanca", "amarilla", "morada"]
  },
  hierba: {
    tipo: "hierba",
    hoja: { forma: ["ancha", "larga", "en cinta", "ovalada"], borde: ["lisa", "dentada"], nervadura: ["paralela", "reticulada"] },
    tallo: ["verde suave", "liso", "jugoso"],
    flor: ["blanca", "amarilla"]
  },
  rastrera: {
    tipo: "rastrera",
    hoja: { forma: ["palmeada", "partida", "corazon", "ovalada"], borde: ["dentada"], nervadura: ["palmada", "reticulada"] },
    tallo: ["verde suave", "con pelos", "liso"],
    flor: ["amarilla", "blanca", "morada"]
  },
  palmera: {
    tipo: "palmera",
    hoja: { forma: ["larga", "en cinta", "ancha"], borde: ["lisa"], nervadura: ["paralela"] },
    tallo: ["leñoso", "liso"],
    flor: ["amarilla", "blanca"]
  }
};

function def(tipo, extra) {
  const base = TIPO_DEFAULT[tipo] || TIPO_DEFAULT.hierba;
  return {
    tipo: base.tipo,
    hoja: { forma: base.hoja.forma, borde: base.hoja.borde, nervadura: base.hoja.nervadura, ...(extra.hoja || {}) },
    tallo: base.tallo.concat(extra.tallo || []),
    flor: base.flor.concat(extra.flor || []),
    fruto: extra.fruto || {}
  };
}

const CARACTERISTICAS = {
  maiz: def("hierba", {
    hoja: { forma: ["larga", "en cinta"], borde: ["lisa"], nervadura: ["paralela"] },
    tallo: ["liso", "jugoso"],
    fruto: { tamaño: ["grande"], forma: ["alargado", "racimo"], color: ["amarillo"], textura: ["liso"] }
  }),
  frijol: def("rastrera", {
    hoja: { forma: ["partida", "corazon"], borde: ["lisa"] },
    fruto: { tamaño: ["pequeño", "mediano"], forma: ["alargado"], color: ["verde", "amarillo"], textura: ["liso"] },
    flor: ["blanca", "morada", "roja"]
  }),
  papa: def("hierba", {
    hoja: { forma: ["partida", "ancha"], borde: ["lisa"] },
    fruto: { tamaño: ["pequeño", "mediano"], forma: ["redondo", "ovalado"], color: ["café", "amarillo"], textura: ["áspero"] },
    flor: ["blanca", "morada", "rosa"]
  }),
  tomate: def("hierba", {
    hoja: { forma: ["partida", "ovalada"], borde: ["dentada"] },
    fruto: { tamaño: ["pequeño", "mediano"], forma: ["redondo"], color: ["rojo", "amarillo"], textura: ["liso"] },
    flor: ["amarilla"]
  }),
  cebolla: def("hierba", {
    hoja: { forma: ["en cinta", "larga"], borde: ["lisa"], nervadura: ["paralela"] },
    fruto: { tamaño: ["pequeño", "mediano"], forma: ["redondo", "ovalado"], color: ["blanco", "morado", "amarillo"], textura: ["liso"] },
    flor: ["blanca", "morada"]
  }),
  yuca: def("arbusto", {
    hoja: { forma: ["palmeada", "partida"], borde: ["lisa"], nervadura: ["palmada"] },
    tallo: ["leñoso"],
    fruto: { tamaño: ["grande"], forma: ["alargado"], color: ["café"], textura: ["áspero"] }
  }),
  platano: def("hierba", {
    hoja: { forma: ["larga", "ancha", "en cinta"], borde: ["lisa"], nervadura: ["paralela"] },
    tallo: ["verde suave", "jugoso", "liso"],
    fruto: { tamaño: ["grande"], forma: ["alargado", "racimo"], color: ["amarillo", "verde"], textura: ["liso"] }
  }),
  cafe: def("arbusto", {
    hoja: { forma: ["ovalada", "lanza", "ancha"], borde: ["lisa"] },
    fruto: { tamaño: ["pequeño"], forma: ["redondo", "ovalado", "racimo"], color: ["rojo", "verde"], textura: ["liso"] },
    flor: ["blanca"]
  }),
  arroz: def("hierba", {
    hoja: { forma: ["larga", "en cinta"], borde: ["lisa"], nervadura: ["paralela"] },
    fruto: { tamaño: ["pequeño"], forma: ["alargado", "racimo"], color: ["blanco", "amarillo"], textura: ["liso"] }
  }),
  aguacate: def("arbol", {
    hoja: { forma: ["ancha", "ovalada"], borde: ["lisa"] },
    fruto: { tamaño: ["mediano", "grande"], forma: ["ovalado", "redondo"], color: ["verde", "morado"], textura: ["áspero", "liso"] },
    flor: ["verde", "amarilla"]
  }),
  zanahoria: def("hierba", {
    hoja: { forma: ["partida", "larga"], borde: ["dentada"] },
    fruto: { tamaño: ["mediano"], forma: ["alargado"], color: ["naranja"], textura: ["liso"] },
    flor: ["blanca"]
  }),
  pimiento: def("hierba", {
    hoja: { forma: ["ancha", "ovalada"], borde: ["lisa"] },
    fruto: { tamaño: ["pequeño", "mediano"], forma: ["alargado", "ovalado", "redondo"], color: ["verde", "rojo", "amarillo"], textura: ["liso"] },
    flor: ["blanca"]
  }),
  lechuga: def("hierba", {
    hoja: { forma: ["ancha", "ovalada"], borde: ["dentada"] },
    fruto: { tamaño: ["mediano"], forma: ["redondo", "ovalado"], color: ["verde"], textura: ["liso"] }
  }),
  repollo: def("hierba", {
    hoja: { forma: ["ancha", "ovalada"], borde: ["lisa", "dentada"] },
    fruto: { tamaño: ["mediano", "grande"], forma: ["redondo", "ovalado"], color: ["verde"], textura: ["liso"] }
  }),
  pepino: def("rastrera", {
    hoja: { forma: ["palmeada", "corazon"], borde: ["dentada"] },
    fruto: { tamaño: ["mediano"], forma: ["alargado"], color: ["verde"], textura: ["liso", "áspero"] },
    flor: ["amarilla"]
  }),
  calabaza: def("rastrera", {
    hoja: { forma: ["palmeada", "corazon", "ancha"], borde: ["dentada"] },
    fruto: { tamaño: ["grande"], forma: ["redondo", "ovalado"], color: ["verde", "naranja"], textura: ["liso", "áspero"] },
    flor: ["amarilla"]
  }),
  camote: def("rastrera", {
    hoja: { forma: ["corazon", "palmeada"], borde: ["lisa"] },
    tallo: ["con pelos", "verde suave"],
    fruto: { tamaño: ["mediano"], forma: ["alargado", "ovalado"], color: ["café", "naranja"], textura: ["áspero"] },
    flor: ["morada", "blanca"]
  }),
  cacao: def("arbol", {
    hoja: { forma: ["larga", "ovalada", "lanza"], borde: ["lisa"] },
    fruto: { tamaño: ["mediano", "grande"], forma: ["alargado", "ovalado"], color: ["amarillo", "rojo", "naranja"], textura: ["áspero"] },
    flor: ["blanca", "rosa"]
  }),
  "cana-azucar": def("hierba", {
    hoja: { forma: ["larga", "en cinta"], borde: ["dentada"], nervadura: ["paralela"] },
    tallo: ["verde suave", "liso", "leñoso"],
    fruto: { tamaño: ["grande"], forma: ["alargado"], color: ["verde", "morado"], textura: ["liso"] }
  }),
  mango: def("arbol", {
    hoja: { forma: ["larga", "lanza"], borde: ["lisa"] },
    fruto: { tamaño: ["mediano", "grande"], forma: ["ovalado"], color: ["verde", "amarillo", "naranja"], textura: ["liso"] },
    flor: ["amarilla"]
  }),
  limon: def("arbol", {
    hoja: { forma: ["ovalada", "lanza"], borde: ["lisa"] },
    tallo: ["leñoso", "con espinas"],
    fruto: { tamaño: ["pequeño", "mediano"], forma: ["ovalado", "redondo"], color: ["verde", "amarillo"], textura: ["liso"] },
    flor: ["blanca"]
  }),
  naranja: def("arbol", {
    hoja: { forma: ["ovalada", "lanza"], borde: ["lisa"] },
    tallo: ["leñoso", "con espinas"],
    fruto: { tamaño: ["mediano"], forma: ["redondo"], color: ["naranja", "verde"], textura: ["liso", "áspero"] },
    flor: ["blanca"]
  }),
  ajo: def("hierba", {
    hoja: { forma: ["en cinta", "larga"], borde: ["lisa"], nervadura: ["paralela"] },
    fruto: { tamaño: ["pequeño"], forma: ["redondo"], color: ["blanco"], textura: ["liso"] },
    flor: ["blanca"]
  }),
  espinaca: def("hierba", {
    hoja: { forma: ["ancha", "ovalada"], borde: ["lisa"] }
  }),
  ejote: def("rastrera", {
    hoja: { forma: ["partida", "corazon"], borde: ["lisa"] },
    fruto: { tamaño: ["mediano"], forma: ["alargado"], color: ["verde"], textura: ["liso"] },
    flor: ["blanca", "morada"]
  }),
  maracuya: def("rastrera", {
    hoja: { forma: ["palmeada", "partida"], borde: ["dentada"] },
    tallo: ["verde suave", "liso"],
    fruto: { tamaño: ["mediano"], forma: ["redondo", "ovalado"], color: ["amarillo", "morado", "verde"], textura: ["liso"] },
    flor: ["morada", "blanca", "rosa"]
  }),
  sandia: def("rastrera", {
    hoja: { forma: ["palmeada", "partida"], borde: ["dentada"] },
    fruto: { tamaño: ["grande"], forma: ["redondo", "ovalado"], color: ["verde", "rojo"], textura: ["liso"] },
    flor: ["amarilla"]
  }),
  "sandia-baby": def("rastrera", {
    hoja: { forma: ["palmeada", "partida"], borde: ["dentada"] },
    fruto: { tamaño: ["pequeño"], forma: ["redondo"], color: ["verde", "rojo"], textura: ["liso"] },
    flor: ["amarilla"]
  }),
  papaya: def("arbol", {
    hoja: { forma: ["palmeada", "partida", "ancha"], borde: ["dentada"], nervadura: ["palmada"] },
    tallo: ["verde suave", "liso"],
    fruto: { tamaño: ["grande"], forma: ["alargado", "ovalado"], color: ["verde", "amarillo", "naranja"], textura: ["liso"] },
    flor: ["amarilla"]
  }),
  guanabana: def("arbol", {
    hoja: { forma: ["larga", "ovalada"], borde: ["lisa"] },
    fruto: { tamaño: ["grande"], forma: ["ovalado", "redondo"], color: ["verde"], textura: ["con espinas"] },
    flor: ["amarilla", "verde"]
  }),
  lulo: def("arbusto", {
    hoja: { forma: ["ancha", "ovalada", "corazon"], borde: ["dentada"], tallo: ["con pelos", "verde suave"] },
    fruto: { tamaño: ["mediano"], forma: ["redondo"], color: ["naranja", "amarillo"], textura: ["liso", "áspero"] },
    flor: ["blanca", "morada"]
  }),
  guayaba: def("arbol", {
    hoja: { forma: ["ovalada", "ancha"], borde: ["lisa"] },
    fruto: { tamaño: ["pequeño", "mediano"], forma: ["redondo", "ovalado"], color: ["amarillo", "verde", "rosado"], textura: ["áspero", "liso"] },
    flor: ["blanca"]
  }),
  pitahaya: def("rastrera", {
    hoja: { forma: ["larga"], borde: ["lisa"], nervadura: ["paralela"] },
    tallo: ["con espinas", "verde suave"],
    fruto: { tamaño: ["mediano", "grande"], forma: ["ovalado", "redondo"], color: ["rosado", "rojo", "blanco"], textura: ["áspero"] },
    flor: ["blanca"]
  }),
  granadilla: def("rastrera", {
    hoja: { forma: ["corazon", "ovalada"], borde: ["lisa"] },
    tallo: ["verde suave", "liso"],
    fruto: { tamaño: ["mediano"], forma: ["redondo", "ovalado"], color: ["naranja", "amarillo"], textura: ["liso"] },
    flor: ["roja", "rosa", "blanca"]
  }),
  mora: def("arbusto", {
    hoja: { forma: ["partida", "ovalada"], borde: ["dentada"] },
    tallo: ["con espinas", "verde suave"],
    fruto: { tamaño: ["pequeño"], forma: ["redondo", "racimo"], color: ["morado", "rojo"], textura: ["áspero"] },
    flor: ["blanca", "rosa"]
  }),
  "tomate-arbol": def("arbusto", {
    hoja: { forma: ["ancha", "ovalada", "corazon"], borde: ["lisa"] },
    fruto: { tamaño: ["mediano"], forma: ["ovalado", "redondo"], color: ["rojo", "naranja", "amarillo"], textura: ["liso"] },
    flor: ["rosa", "blanca"]
  }),
  chontaduro: def("palmera", {
    hoja: { forma: ["larga", "en cinta"], borde: ["lisa"], nervadura: ["paralela"] },
    tallo: ["con espinas", "leñoso"],
    fruto: { tamaño: ["pequeño", "mediano"], forma: ["redondo", "ovalado", "racimo"], color: ["naranja", "rojo"], textura: ["liso"] }
  }),
  brocoli: def("hierba", {
    hoja: { forma: ["ancha", "ovalada"], borde: ["dentada"] },
    fruto: { tamaño: ["mediano"], forma: ["redondo"], color: ["verde"], textura: ["áspero"] }
  }),
  remolacha: def("hierba", {
    hoja: { forma: ["ancha", "ovalada"], borde: ["lisa", "dentada"] },
    fruto: { tamaño: ["mediano"], forma: ["redondo"], color: ["rojo"], textura: ["liso"] }
  }),
  arveja: def("rastrera", {
    hoja: { forma: ["ovalada", "partida"], borde: ["lisa"] },
    fruto: { tamaño: ["pequeño"], forma: ["alargado"], color: ["verde"], textura: ["liso"] },
    flor: ["blanca", "morada"]
  }),
  cilantro: def("hierba", {
    hoja: { forma: ["partida", "larga"], borde: ["dentada"] },
    flor: ["blanca"]
  }),
  rabano: def("hierba", {
    hoja: { forma: ["partida", "ancha"], borde: ["dentada"] },
    fruto: { tamaño: ["pequeño"], forma: ["redondo", "alargado"], color: ["rojo", "blanco"], textura: ["liso"] },
    flor: ["blanca", "rosa"]
  }),
  pina: def("hierba", {
    hoja: { forma: ["larga", "en cinta"], borde: ["dentada"], nervadura: ["paralela"] },
    tallo: ["jugoso", "verde suave"],
    fruto: { tamaño: ["mediano"], forma: ["ovalado"], color: ["amarillo", "café"], textura: ["áspero"] },
    flor: ["morada", "roja"]
  }),
  fresa: def("rastrera", {
    hoja: { forma: ["partida"], borde: ["dentada"], nervadura: ["reticulada"] },
    tallo: ["verde suave", "con pelos"],
    fruto: { tamaño: ["pequeño"], forma: ["redondo", "ovalado"], color: ["rojo"], textura: ["liso"] },
    flor: ["blanca"]
  }),
  uchuva: def("hierba", {
    hoja: { forma: ["corazon", "ovalada"], borde: ["dentada"], nervadura: ["reticulada"] },
    tallo: ["verde suave", "liso"],
    fruto: { tamaño: ["pequeño"], forma: ["redondo"], color: ["amarillo", "naranja"], textura: ["liso"] },
    flor: ["amarilla"]
  }),
  melon: def("rastrera", {
    hoja: { forma: ["palmeada", "corazon"], borde: ["dentada"], nervadura: ["palmada"] },
    tallo: ["verde suave", "con pelos"],
    fruto: { tamaño: ["mediano", "grande"], forma: ["redondo", "ovalado"], color: ["amarillo", "verde", "naranja"], textura: ["áspero", "liso"] },
    flor: ["amarilla"]
  }),
  berenjena: def("hierba", {
    hoja: { forma: ["ancha", "ovalada"], borde: ["lisa"], nervadura: ["reticulada"] },
    tallo: ["verde suave", "con pelos"],
    fruto: { tamaño: ["mediano"], forma: ["alargado", "ovalado"], color: ["morado"], textura: ["liso"] },
    flor: ["morada"]
  }),
  coliflor: def("hierba", {
    hoja: { forma: ["ancha", "ovalada"], borde: ["lisa"], nervadura: ["reticulada"] },
    tallo: ["verde suave", "jugoso"],
    fruto: { tamaño: ["mediano"], forma: ["redondo"], color: ["blanco"], textura: ["áspero"] },
    flor: ["blanca"]
  })
};

// Opciones que se muestran en el asistente de identificación
const OPCIONES_ID = {
  tipo: [
    { v: "arbol", t: "🌳 Árbol (tronco grande y leñoso)" },
    { v: "arbusto", t: "🌿 Arbusto (mediano, varios tallos)" },
    { v: "hierba", t: "🍃 Mata o hierba (tallo blando)" },
    { v: "rastrera", t: "🌱 Guía o rastrera (se arrastra o trepa)" },
    { v: "palmera", t: "🌴 Palmera o similar" }
  ],
  parte: [
    { v: "hoja", t: "🍃 Hoja" },
    { v: "fruto", t: "🍎 Fruto o lo que se come" },
    { v: "tallo", t: "🌱 Tallo" },
    { v: "flor", t: "🌸 Flor" }
  ],
  hoja: {
    forma: [
      { v: "ancha", t: "Ancha y redondeada" },
      { v: "larga", t: "Larga y estrecha" },
      { v: "en cinta", t: "En cinta (como pasto)" },
      { v: "corazon", t: "En forma de corazón" },
      { v: "lanza", t: "En forma de lanza" },
      { v: "palmeada", t: "Como una mano abierta" },
      { v: "partida", t: "Partida en varios dedos" },
      { v: "ovalada", t: "Ovalada" }
    ],
    borde: [
      { v: "lisa", t: "Borde liso" },
      { v: "dentada", t: "Borde con dientes (aserrada)" }
    ],
    nervadura: [
      { v: "paralela", t: "Venas rectas y paralelas" },
      { v: "reticulada", t: "Venas en forma de red" },
      { v: "palmada", t: "Venas que salen del centro como dedos" }
    ]
  },
  tallo: [
    { v: "liso", t: "Liso" },
    { v: "leñoso", t: "Leñoso (como madera)" },
    { v: "con espinas", t: "Con espinas" },
    { v: "verde suave", t: "Verde y blando" },
    { v: "con pelos", t: "Con pelitos" },
    { v: "jugoso", t: "Jugoso y grueso" }
  ],
  fruto: {
    tamaño: [
      { v: "pequeño", t: "Pequeño" },
      { v: "mediano", t: "Mediano" },
      { v: "grande", t: "Grande" }
    ],
    forma: [
      { v: "redondo", t: "Redondo" },
      { v: "alargado", t: "Alargado" },
      { v: "ovalado", t: "Ovalado" },
      { v: "racimo", t: "En racimo o mano" }
    ],
    color: [
      { v: "verde", t: "Verde" },
      { v: "amarillo", t: "Amarillo" },
      { v: "rojo", t: "Rojo" },
      { v: "naranja", t: "Naranja" },
      { v: "morado", t: "Morado" },
      { v: "rosado", t: "Rosado" },
      { v: "blanco", t: "Blanco" },
      { v: "café", t: "Café" }
    ],
    textura: [
      { v: "liso", t: "Liso" },
      { v: "áspero", t: "Áspero o rugoso" },
      { v: "con espinas", t: "Con espinitas" }
    ]
  },
  flor: [
    { v: "blanca", t: "Blanca" },
    { v: "amarilla", t: "Amarilla" },
    { v: "rosa", t: "Rosa" },
    { v: "morada", t: "Morada" },
    { v: "roja", t: "Roja" },
    { v: "naranja", t: "Naranja" },
    { v: "verde", t: "Verde" }
  ]
};

function obtenerCaracteristicas(cropId) {
  return CARACTERISTICAS[cropId] || null;
}
