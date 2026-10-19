// Campo Sano - Modulo regional: Valle del Cauca / Santiago de Cali
// Sirve para que el extensionista ubique al productor por altitud y le recomiende.
// Fuente de los productos por corregimiento: DAGMA, Alcaldia de Santiago de Cali,
// "Productos agropecuarios producidos en la zona rural de Santiago de Cali" (2016-2023).
// El numero es la cantidad de veredas que reportaron el cultivo, no hectareas.

const REGIONAL = {
  zona: "Valle del Cauca - Santiago de Cali",
  nota: "La altitud es la variable que mas decide que se puede sembrar. Ubica primero la altitud del lote y despues elige el cultivo.",
  fuente: "DAGMA - Alcaldia de Santiago de Cali (2016-2023)",
  franjas: [
    {
      clave: "V",
      nombre: "Valle calido",
      altitud: "900 a 1.200 m",
      clima: "Calido, 24 a 26 grados C",
      corregimientos: "Navarro, El Hormiguero",
      consejo: "Zona de frutales, cana, arroz y tomate. Requiere buen manejo de sombra y viento."
    },
    {
      clave: "T",
      nombre: "Transicion",
      altitud: "1.200 a 1.800 m",
      clima: "Semicalido, 20 a 24 grados C",
      corregimientos: "Pichinde, Felidia, El Saladito, Montebello, La Castilla",
      consejo: "Plano del cafe y del platano. Zona de mayor produccion de la ladera."
    },
    {
      clave: "M",
      nombre: "Medio",
      altitud: "1.800 a 2.200 m",
      clima: "Templado, 17 a 21 grados C",
      corregimientos: "La Elvira, La Leonera, La Paz, Los Andes, Villacarmelo, Golondrinas",
      consejo: "Hortalizas, aromaticas y pancoger. El nicho mas rentable del municipio."
    },
    {
      clave: "A",
      nombre: "Alto",
      altitud: "2.200 a 3.000 m",
      clima: "Frio, 13 a 17 grados C",
      corregimientos: "La Buitrera (zona alta)",
      consejo: "Papa, arveja, coliflor y habas. Cuidado con las heladas."
    }
  ],

  corregimientos: [
    {
      nombre: "Navarro",
      altitudMin: 950,
      altitudMax: 1150,
      franja: "V",
      productosSugeridos: "Aguacate, guayaba, guanabana, mandarina y platano. Zona ideal para citricos y frutales de clima calido.",
      diversidad: 30,
      productos: [
        ["Aguacate", 27], ["Guayaba", 26], ["Platano", 23], ["Citricos", 17], ["Frutales", 17],
        ["Mandarina", 16], ["Guanabana", 14], ["Mango", 11], ["Musaceas", 9], ["Limon", 7], ["Cacao", 4]
      ],
      perfil: "Valle bajo. Zona fruticola por excelencia: aguacate, guayaba y guanabana."
    },
    {
      nombre: "El Hormiguero",
      altitudMin: 900,
      altitudMax: 1100,
      franja: "V",
      diversidad: 36,
      productos: [
        ["Aguacate", 24], ["Mandarina", 21], ["Citricos", 18], ["Platano", 18], ["Naranja", 17],
        ["Limon", 14], ["Frutales", 12], ["Guayaba", 12], ["Guanabana", 9], ["Zapallo", 7]
      ],
      perfil: "Valle bajo. Citrus y aguacate. Cacao incipiente."
    },
    {
      nombre: "Pance",
      altitudMin: 1600,
      altitudMax: 2400,
      franja: "T",
      diversidad: 35,
      productos: [
        ["Platano", 44], ["Cafe", 41], ["Cilantro", 22], ["Lechuga", 18], ["Frijol", 17],
        ["Cebolla", 16], ["Maiz", 16], ["Frutales", 13], ["Banano", 11], ["Citricos", 11]
      ],
      perfil: "Ladera sur. Cafe y platano leaders, con horticulture de hoja."
    },
    {
      nombre: "Pichinde",
      altitudMin: 1500,
      altitudMax: 1900,
      franja: "T",
      diversidad: 33,
      productos: [
        ["Cafe", 61], ["Platano", 45], ["Banano", 32], ["Maiz", 22], ["Limon", 17],
        ["Frijol", 15], ["Naranja", 12], ["Aguacate", 11], ["Citricos", 9], ["Musaceas", 8]
      ],
      perfil: "El cafetal mas fuerte del municipio: 61 veredas reportan cafe."
    },
    {
      nombre: "La Leonera",
      altitudMin: 1800,
      altitudMax: 2200,
      franja: "M",
      diversidad: 57,
      productos: [
        ["Cafe", 53], ["Platano", 28], ["Frijol", 21], ["Ruda", 19], ["Maiz", 16],
        ["Banano", 15], ["Aromaticas", 12], ["Cilantro", 11], ["Hortalizas", 10], ["Naranja", 10]
      ],
      perfil: "Cafe con fuerte presencia de aromaticas medicinales."
    },
    {
      nombre: "La Buitrera",
      altitudMin: 2000,
      altitudMax: 2500,
      franja: "A",
      diversidad: 45,
      productos: [
        ["Platano", 31], ["Citricos", 22], ["Maiz", 15], ["Frutales", 14], ["Cilantro", 13],
        ["Cafe", 10], ["Aromaticas", 7], ["Mandarina", 7], ["Yuca", 6], ["Arveja", 4]
      ],
      perfil: "Zona alta. Platano y agrumes de altura."
    },
    {
      nombre: "Villacarmelo",
      altitudMin: 1700,
      altitudMax: 2000,
      franja: "M",
      diversidad: 54,
      productos: [
        ["Platano", 40], ["Maiz", 21], ["Cafe", 18], ["Citricos", 18], ["Frijol", 18],
        ["Aguacate", 11], ["Banano", 10], ["Yuca", 9], ["Lulo", 7], ["Mora", 6]
      ],
      perfil: "Platano dominante mas rutas de clima templado: lulo, mora y tomate de arbol."
    },
    {
      nombre: "Felidia",
      altitudMin: 1500,
      altitudMax: 1800,
      franja: "T",
      diversidad: 56,
      productos: [
        ["Espinaca", 28], ["Frijol", 17], ["Maiz", 16], ["Cidra", 13], ["Oregano", 13],
        ["Aromaticas", 12], ["Cidron", 12], ["Tomillo", 12], ["Rabano", 11], ["Lechuga", 10]
      ],
      perfil: "Hortalizas y aromaticas de clima frio. El segundo productor de espinaca del municipio."
    },
    {
      nombre: "El Saladito",
      altitudMin: 1600,
      altitudMax: 1950,
      franja: "T",
      diversidad: 29,
      productos: [
        ["Frutales", 26], ["Cafe", 18], ["Maiz", 15], ["Banano", 13], ["Platano", 13],
        ["Frijol", 7], ["Cana", 5], ["Limon", 5], ["Arracacha", 3]
      ],
      perfil: "Ladera con mezcla de pancoger y cafe."
    },
    {
      nombre: "Golondrinas",
      altitudMin: 1900,
      altitudMax: 2400,
      franja: "M",
      diversidad: 24,
      productos: [
        ["Cafe", 7], ["Citricos", 7], ["Banano", 6], ["Platano", 6], ["Maiz", 5],
        ["Naranja", 5], ["Aguacate", 3], ["Limon", 3], ["Yuca", 2]
      ],
      perfil: "Ladera de ladera. Cafe de pequeno productor y autosustento."
    },
    {
      nombre: "La Castilla",
      altitudMin: 1600,
      altitudMax: 1900,
      franja: "T",
      diversidad: 61,
      productos: [
        ["Cafe", 33], ["Frutales", 21], ["Aromaticas", 20], ["Maiz", 16], ["Cilantro", 15],
        ["Frijol", 10], ["Tomillo", 10], ["Calendula", 9], ["Romero", 9], ["Guineo", 8]
      ],
      perfil: "Aromaticas y medicinales muy fuertes. Tomillo y calendula con presencia alta."
    },
    {
      nombre: "La Elvira",
      altitudMin: 1700,
      altitudMax: 2000,
      franja: "M",
      diversidad: 65,
      productos: [
        ["Banano", 23], ["Cafe", 22], ["Aromaticas", 13], ["Maiz", 13], ["Yerbabuena", 10],
        ["Calendula", 9], ["Arracacha", 8], ["Guineo", 8], ["Yuca", 8], ["Anturios", 6]
      ],
      perfil: "El corregimiento mas diverso del municipio: 65 cultivos distintos."
    },
    {
      nombre: "La Paz",
      altitudMin: 1700,
      altitudMax: 2000,
      franja: "M",
      diversidad: 59,
      productos: [
        ["Cafe", 25], ["Tomillo", 19], ["Platano", 17], ["Aromaticas", 14], ["Yerbabuena", 13],
        ["Citricos", 11], ["Cidron", 10], ["Cilantro", 10], ["Calendula", 8], ["Ruda", 8]
      ],
      perfil: "Segundo en tomillo. Fuerte en herbs medicinales."
    },
    {
      nombre: "Los Andes",
      altitudMin: 1800,
      altitudMax: 2200,
      franja: "M",
      diversidad: 43,
      productos: [
        ["Platano", 20], ["Citricos", 15], ["Cafe", 8], ["Frutales", 8], ["Maiz", 8],
        ["Hortalizas", 7], ["Cilantro", 6], ["Naranja", 6], ["Frijol", 5], ["Yuca", 5]
      ],
      perfil: "Ladera con predominio de platano y agrumes."
    },
    {
      nombre: "Montebello",
      altitudMin: 1600,
      altitudMax: 1850,
      franja: "T",
      diversidad: 34,
      productos: [
        ["Maiz", 9], ["Platano", 7], ["Aguacate", 6], ["Mango", 6], ["Flores", 4],
        ["Banano", 3], ["Frutales", 3], ["Limon", 3], ["Yuca", 3], ["Lechuga", 2]
      ],
      perfil: "Maiz y flores. Zonas de ornamentales y huerta."
    }
  ]
};

// Resumen tecnico de los cultivos que no tienen ficha completa.
// Aqui basta altitud y rendimiento: sirve para descartar rapido en la visita de campo.
const RESUMEN = {
  zanahoria: ["800 a 1.800 m", "18 a 25 t/ha"],
  pimiento: ["800 a 1.800 m", "15 a 25 t/ha"],
  lechuga: ["1.600 a 2.400 m", "25 a 40 t/ha"],
  repollo: ["1.400 a 2.400 m", "30 a 45 t/ha"],
  pepino: ["800 a 1.600 m", "20 a 30 t/ha"],
  calabaza: ["1.000 a 1.800 m", "15 a 25 t/ha"],
  camote: ["800 a 1.600 m", "20 a 35 t/ha"],
  cacao: ["500 a 1.200 m", "0,8 a 1,5 t/ha de cacao seco"],
  mango: ["0 a 1.200 m", "10 a 16 t/ha"],
  ajo: ["1.200 a 2.200 m", "8 a 12 t/ha"],
  espinaca: ["1.600 a 2.400 m", "14 a 20 t/ha"],
  ejote: ["900 a 1.800 m", "8 a 14 t/ha"],
  maracuya: ["900 a 1.800 m", "18 a 28 t/ha"],
  sandia: ["600 a 1.400 m", "25 a 40 t/ha"],
  "sandia-baby": ["600 a 1.400 m", "12 a 20 t/ha"],
  papaya: ["900 a 1.600 m", "25 a 40 t/ha"],
  guanabana: ["900 a 1.600 m", "7 a 11 t/ha"],
  lulo: ["1.500 a 2.500 m", "18 a 25 t/ha"],
  guayaba: ["800 a 1.800 m", "14 a 20 t/ha"],
  pitahaya: ["1.200 a 1.800 m", "10 a 18 t/ha"],
  granadilla: ["1.600 a 2.400 m", "12 a 20 t/ha"],
  mora: ["1.400 a 2.400 m", "8 a 12 t/ha"],
  "tomate-arbol": ["1.500 a 2.400 m", "14 a 20 t/ha"],
  chontaduro: ["0 a 900 m", "15 a 25 t/ha"],
  brocoli: ["1.600 a 2.400 m", "18 a 26 t/ha"],
  remolacha: ["1.600 a 2.400 m", "15 a 22 t/ha"],
  arveja: ["1.800 a 2.800 m", "6 a 10 t/ha"],
  cilantro: ["1.400 a 2.200 m", "10 a 15 t/ha"],
  rabano: ["1.400 a 2.200 m", "12 a 18 t/ha"],
  pina: ["800 a 1.600 m", "30 a 45 t/ha"],
  fresa: ["1.800 a 2.600 m", "8 a 14 t/ha"],
  uchuva: ["1.800 a 2.600 m", "10 a 16 t/ha"],
  melon: ["600 a 1.400 m", "20 a 30 t/ha"],
  berenjena: ["800 a 1.800 m", "25 a 40 t/ha"],
  coliflor: ["1.800 a 2.800 m", "20 a 30 t/ha"]
};
