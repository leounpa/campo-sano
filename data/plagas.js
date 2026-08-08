// Campo Sano - Base de datos de plagas y enfermedades
// Español sencillo. Soluciones naturales primero, agroquímicos solo como último recurso.

const PLAGAS = [
  {
    id: "pulgones",
    nombre: "Pulgones",
    emoji: "🐛",
    tipo: "Insecto chupador",
    cultivos: ["maiz", "frijol", "papa", "tomate", "yuca", "cafe", "aguacate", "zanahoria", "pimiento", "platano"],
    sintomas: [
      "Insectos pequeños (verdes o negros) pegados en brotes y hojas nuevas",
      "Hojas que se enrollan o se ponen pegajosas",
      "Hormigas subiendo y bajando por la planta",
      "Puntos amarillos en las hojas"
    ],
    clavesSintomas: ["pulgones", "insectos verdes", "insectos negros", "hojas enrolladas", "pegajoso", "hormigas", "brotes", "pulgas"],
    prevencion: "Revisa las plantas cada semana. No uses demasiado abono nitrogenado porque atrae pulgones. Siembra plantas como cilantro o caléndula cerca del cultivo.",
    solucionesNaturales: [
      "Lava las hojas con agua jabonosa (jabón de lavar, no detergente).",
      "Jabón potásico: mezcla 10 ml de jabón potásico en 1 litro de agua y rocía.",
      "Jugo de ajo y ají: licúa 1 diente de ajo y 2 ajíes con 1 litro de agua, cuela y rocía.",
      "Las mariquitas (catarinas) se comen los pulgones: no las mates."
    ],
    agroquimicos: [
      {
        nombre: "Jabón insecticida (sales de potasio)",
        ingrediente: "Jabón potásico concentrado",
        como: "Aplicar según la dosis del frasco, en la mañana sin sol fuerte.",
        precaucion: "Usa guantes y no rocíes con viento. No apliques cerca de abejas."
      },
      {
        nombre: "Imidacloprid",
        ingrediente: "Imidacloprid 350",
        como: "Sigue exactamente la dosis de la etiqueta.",
        precaucion: "Muy tóxico para abejas. No aplicar cuando haya flores."
      }
    ],
    gravedad: "leve"
  },
  {
    id: "mosca-blanca",
    nombre: "Mosca blanca",
    emoji: "🦟",
    tipo: "Insecto chupador",
    cultivos: ["tomate", "pimiento", "frijol", "papa"],
    sintomas: [
      "Mosquitas blancas que vuelan cuando mueves la planta",
      "Hojas amarillas o pegajosas",
      "Mohito negro sobre las hojas (fumagina)",
      "Puntos blancos en el envés de las hojas"
    ],
    clavesSintomas: ["mosca blanca", "mosquitas blancas", "polvo negro", "fumagina", "amarillas"],
    prevencion: "No dejes restos de plantas enfermas en el lote. Usa trampas amarillas pegajosas.",
    solucionesNaturales: [
      "Trampas amarillas con pegamento para atrapar moscas.",
      "Jabón potásico (10 ml por litro de agua) cada 5 días.",
      "Ajo y ají: mezcla 1 ajo y 2 ajíes licuados en 1 litro de agua, rocía el envés de las hojas.",
      "Planta albahaca o cilantro cerca del tomate para ahuyentarlas."
    ],
    agroquimicos: [
      {
        nombre: "Aceite de neem con jabón",
        ingrediente: "Azadiractina",
        como: "Mezclar según etiqueta y rociar el envés de las hojas.",
        precaucion: "No aplicar al mediodía para no quemar las hojas."
      },
      {
        nombre: "Bifentrina",
        ingrediente: "Bifentrina 100",
        como: "Dosis según etiqueta, cubriendo bien la planta.",
        precaucion: "Tóxico para abejas. No aplicar cerca de agua o ríos."
      }
    ],
    gravedad: "media"
  },
  {
    id: "trips",
    nombre: "Trips",
    emoji: "🐜",
    tipo: "Insecto chupador",
    cultivos: ["cebolla", "pimiento", "aguacate", "yuca", "platano"],
    sintomas: [
      "Puntitos plateados o blancos en las hojas",
      "Franjas plateadas que se juntan",
      "Insectitos alargados muy pequeños de color claro",
      "Hojas que se ponen pálidas y torcidas"
    ],
    clavesSintomas: ["plateado", "puntitos", "franjas", "trips", "barras plateadas"],
    prevencion: "Mantén el lote limpio de malas hierbas. Usa trampas azules pegajosas.",
    solucionesNaturales: [
      "Trampas azules o blancas pegajosas cerca del suelo.",
      "Rocía con jabón potásico (10 ml por litro).",
      "Extracto de neem según etiqueta, cada 7 días.",
      "Moja bien el suelo: los trips viven en la tierra y no les gusta el agua."
    ],
    agroquimicos: [
      {
        nombre: "Spinetoram o acetamiprid",
        ingrediente: "Spinetoram 120",
        como: "Aplicar según dosis de la etiqueta.",
        precaucion: "No aplicar en horas de polinización de abejas."
      }
    ],
    gravedad: "media"
  },
  {
    id: "gusano-cogollero",
    nombre: "Gusano cogollero",
    emoji: "🐛",
    tipo: "Insecto masticador",
    cultivos: ["maiz"],
    sintomas: [
      "Hojas del centro (cogollo) con agujeros y excremento",
      "Gusano con manchas que se esconde en el cogollo del maíz",
      "Hojas nuevas rasgadas",
      "Plantas pequeñas con el centro comido"
    ],
    clavesSintomas: ["cogollo", "agujeros", "gusano", "hojas rasgadas", "centro comido", "excremento"],
    prevencion: "Siembra a tiempo al inicio de lluvias. Destruye los residuos de cosecha anterior.",
    solucionesNaturales: [
      "Recoge y destruye los gusanos a mano en la mañana.",
      "Echa tierra en el cogollo (aporque) para tapar el daño.",
      "Bacillus thuringiensis: se vende como polvo biológico, no daña la salud.",
      "Mezcla cultivos: siembra frijol o fríjol trepador junto al maíz."
    ],
    agroquimicos: [
      {
        nombre: "Clorpirifos (grado técnico limitado)",
        ingrediente: "Clorpirifos 48%",
        como: "Solo en caso grave, dosis de la etiqueta.",
        precaucion: "Tóxico. Respeta el tiempo de espera antes de comer el maíz."
      }
    ],
    gravedad: "alta"
  },
  {
    id: "gusano-trocero",
    nombre: "Gusano cortador (trocero)",
    emoji: "🪱",
    tipo: "Insecto masticador",
    cultivos: ["maiz", "papa", "tomate"],
    sintomas: [
      "Plantas jóvenes cortadas a ras del suelo",
      "Plantas caídas sin que se sepa por qué",
      "Gusano gris o café escondido en la tierra cerca del tallo"
    ],
    clavesSintomas: ["cortadas", "tallos cortados", "plantas caídas", "gusano gris", "trocero", "cortador"],
    prevencion: "Prepara bien la tierra y arranca malas hierbas antes de sembrar. El gusano llega del pasto.",
    solucionesNaturales: [
      "Pon un collar de cartón o plástico alrededor del tallo joven.",
      "Cava alrededor de la planta caída y mata el gusano.",
      "Esparce ceniza de madera alrededor de las plantas.",
      "Siembra una semana después de arar para romper su ciclo."
    ],
    agroquimicos: [
      {
        nombre: "Cebo envenenado de salvado",
        ingrediente: "Clorpirifos mezclado con salvado",
        como: "Prepara cebos según recomendación técnica.",
        precaucion: "Mantén lejos de animales y niños."
      }
    ],
    gravedad: "media"
  },
  {
    id: "minador",
    nombre: "Minador de hojas",
    emoji: "🌿",
    tipo: "Insecto minador",
    cultivos: ["tomate", "pimiento", "frijol"],
    sintomas: [
      "Caminos blancos o amarillos en zigzag dentro de la hoja",
      "Parece que alguien dibujó mapas en las hojas",
      "Hojas que se secan y caen"
    ],
    clavesSintomas: ["caminos", "zigzag", "galerías", "líneas blancas", "minador"],
    prevencion: "No siembres cerca de plantas viejas de tomate. Usa trampas amarillas.",
    solucionesNaturales: [
      "Corta y destruye las hojas afectadas (quémalas o entiérralas).",
      "Trampas amarillas con pegamento.",
      "Aceite de neem cada 7 días por el envés.",
      "Las avispitas pequeñas que ponen huevos en el minador son tus aliadas."
    ],
    agroquimicos: [
      {
        nombre: "Abamectina",
        ingrediente: "Abamectina 18 g/L",
        como: "Dosis de etiqueta, rociando bien.",
        precaucion: "Tóxico para abejas y organismos acuáticos."
      }
    ],
    gravedad: "media"
  },
  {
    id: "hongos-hoja",
    nombre: "Hongos en las hojas (manchas y roya general)",
    emoji: "🍂",
    tipo: "Enfermedad por hongos",
    cultivos: ["maiz", "frijol", "papa", "tomate", "cebolla", "yuca", "aguacate", "zanahoria", "pimiento", "arroz"],
    sintomas: [
      "Manchas marrones, negras o amarillas en las hojas",
      "Polvo blancuzco o moho sobre las hojas",
      "Bordes de las hojas que se secan",
      "Se ve peor cuando hay mucha humedad"
    ],
    clavesSintomas: ["manchas", "mohos", "polvo blanco", "manchas marrones", "manchas negras", "seca", "podridas"],
    prevencion: "No mojes las hojas al regar. Riega en la mañana. Deja espacio entre plantas para que circule el aire.",
    solucionesNaturales: [
      "Caldo bordelés (sulfato de cobre + cal): preparación según recomendación técnica.",
      "Rocía con agua y bicarbonato: 1 cucharada de bicarbonato por litro de agua.",
      "Jugo de cola de caballo o de manzanilla hervida, colada y fría.",
      "Quita y destruye las hojas enfermas; no las dejes en el lote."
    ],
    agroquimicos: [
      {
        nombre: "Mancozeb o clorotalonil",
        ingrediente: "Mancozeb 80%",
        como: "Solo si lo natural no funciona, con dosis de etiqueta.",
        precaucion: "Usa mascarilla y guantes. Respeta días de espera antes de la cosecha."
      }
    ],
    gravedad: "media"
  },
  {
    id: "tizon-tardio",
    nombre: "Tizón tardío (gota)",
    emoji: "🍅",
    tipo: "Enfermedad por hongos (grave)",
    cultivos: ["papa", "tomate"],
    sintomas: [
      "Manchas grandes café oscuro en las hojas con un anillo verde pálido",
      "Manchas aceitosas y oscuras en los tallos",
      "Frutos con manchas oscuras y duras",
      "La planta se pudre y huele mal en días húmedos",
      "Avanza muy rápido tras las lluvias"
    ],
    clavesSintomas: ["gota", "tizon", "manchas oscuras", "se pudre", "humedo", "lluvias", "aceitosas"],
    prevencion: "Usa semilla o papa sana. No siembres papa y tomate juntos. Riega en la mañana y nunca de noche.",
    solucionesNaturales: [
      "Caldo bordelés apenas aparezcan las primeras manchas, cada 7 días.",
      "Rocía con caldo de ceniza: 1 taza de ceniza hervida en 5 litros de agua, colar y rociar.",
      "Corta las hojas y plantas enfermas y sácalas del lote.",
      "Aplica trichoderma (hongo benéfico) al suelo."
    ],
    agroquimicos: [
      {
        nombre: "Metalaxil + mancozeb",
        ingrediente: "Metalaxil-M 4% + Mancozeb 64%",
        como: "Aplicar según etiqueta apenas se vea la enfermedad.",
        precaucion: "Muy tóxico. Usa equipo de protección completo."
      }
    ],
    gravedad: "alta"
  },
  {
    id: "sigatoka",
    nombre: "Sigatoka (plátano/banano)",
    emoji: "🍌",
    tipo: "Enfermedad por hongos",
    cultivos: ["platano"],
    sintomas: [
      "Puntitos amarillos que se vuelven manchas cafés con borde amarillo",
      "Las hojas se secan rápido de afuera hacia adentro",
      "Racimos pequeños y dedos delgados"
    ],
    clavesSintomas: ["sigatoka", "manchas cafés", "hojas secas", "plátano", "banano"],
    prevencion: "Poda las hojas con manchas apenas las veas. No siembres plantas muy juntas.",
    solucionesNaturales: [
      "Poda y quema las hojas enfermas.",
      "Caldo bordelés cada 15 días en época de lluvias.",
      "Bicarbonato: 1 cucharada por litro de agua, rocía las hojas.",
      "No mojes las hojas al regar."
    ],
    agroquimicos: [
      {
        nombre: "Propineb o mancozeb",
        ingrediente: "Propineb 70%",
        como: "Dosis de etiqueta con calendario fijo.",
        precaucion: "Respeta los días de espera. Usa protección."
      }
    ],
    gravedad: "alta"
  },
  {
    id: "picudo",
    nombre: "Picudo del plátano",
    emoji: "🐞",
    tipo: "Insecto barrenador",
    cultivos: ["platano"],
    sintomas: [
      "Hoyos en la base del tallo (seudotallo) con un jugo espeso",
      "Cáscaras y túneles por dentro del tallo",
      "Las hojas se amarillan y el racimo no crece",
      "Escarabajos negros con pico largo cerca de la base"
    ],
    clavesSintomas: ["picudo", "hoyos en el tallo", "túneles", "escarbajo negro", "base del tallo"],
    prevencion: "No lleves colinos de otra finca sin revisarlos. Mantén limpia la base de las plantas.",
    solucionesNaturales: [
      "Trampa tipo 'tronco': corta un pedazo de tallo, ponlo en el suelo y revisa cada semana.",
      "Recoge los escarabajos y destrúyelos.",
      "Aporca con ceniza alrededor de la base.",
      "Usa colinos sanos y desinfectados."
    ],
    agroquimicos: [
      {
        nombre: "Imidacloprid (granulado)",
        ingrediente: "Imidacloprid 20%",
        como: "Aplicar en el suelo según dosis de etiqueta.",
        precaucion: "Muy tóxico para abejas. No aplicar cerca de agua."
      }
    ],
    gravedad: "alta"
  },
  {
    id: "roya",
    nombre: "Roya del café",
    emoji: "☕",
    tipo: "Enfermedad por hongos",
    cultivos: ["cafe"],
    sintomas: [
      "Polvo amarillo-naranja en el envés de las hojas",
      "Manchas amarillas que se ven desde arriba",
      "Las hojas se caen y el árbol queda pelado",
      "Producción baja en la cosecha"
    ],
    clavesSintomas: ["roya", "polvo amarillo", "polvo naranja", "hojas caídas", "café"],
    prevencion: "Mantén buena sombra. Siembra variedades resistentes (castillo, caturra resistente). Abona bien el árbol.",
    solucionesNaturales: [
      "Recoge y entierra las hojas caídas con roya.",
      "Caldo bordelés en época de lluvias.",
      "Caldo de ceniza cada 15 días.",
      "Podas de aireación para que circule el aire."
    ],
    agroquimicos: [
      {
        nombre: "Triadimefón o propiconazol",
        ingrediente: "Propiconazol 25%",
        como: "Dosis de etiqueta en época crítica.",
        precaucion: "Usa protección completa. No comas el café hasta el tiempo de espera."
      }
    ],
    gravedad: "alta"
  },
  {
    id: "broca",
    nombre: "Broca del café",
    emoji: "🪲",
    tipo: "Insecto del fruto",
    cultivos: ["cafe"],
    sintomas: [
      "Agujeritos pequeños en los frutos de café (cerezas)",
      "Frutos caídos con huecos",
      "Insectito negro pequeño dentro del grano",
      "Granos que se caen antes de madurar"
    ],
    clavesSintomas: ["broca", "agujeritos", "cereza", "frutos caídos", "granos huecos", "café"],
    prevencion: "Recoge todo el café maduro y los frutos caídos. No dejes café maduro en la planta.",
    solucionesNaturales: [
      "Recoge las cerezas atacadas y entiérralas (saca los bichos del lote).",
      "Recoge todo el café a tiempo; la broca se cría en lo que queda.",
      "Usa trampas con feromona de la broca.",
      "Las avispitas (parasitoides) controlan la broca: siembra árboles que las atraigan."
    ],
    agroquimicos: [
      {
        nombre: "Clorpirifos",
        ingrediente: "Clorpirifos 48%",
        como: "Solo en infestación fuerte, dosis de etiqueta.",
        precaucion: "Tóxico. No aplicar cerca de la cosecha."
      }
    ],
    gravedad: "media"
  },
  {
    id: "gorgojos",
    nombre: "Gorgojos (plagas de grano)",
    emoji: "🪲",
    tipo: "Insecto de almacén",
    cultivos: ["frijol", "arroz", "maiz"],
    sintomas: [
      "Granos con agujeritos pequeños",
      "Polvito fino en el fondo del costal",
      "Insectitos oscuros con pico caminando entre el grano"
    ],
    clavesSintomas: ["gorgojo", "agujeritos en el grano", "polvito", "grano guardado", "almacén"],
    prevencion: "Guarda el grano bien seco. Los gorgojos llegan con la humedad.",
    solucionesNaturales: [
      "Seca bien el grano antes de guardarlo.",
      "Guarda en costales o frascos cerrados, con una hoja de eucalipto o laurel adentro.",
      "Mete el grano 24 horas al congelador para matar huevos.",
      "Ceniza fina mezclada con el grano guardado (lava antes de cocinar)."
    ],
    agroquimicos: [
      {
        nombre: "Tabletas de fosfuro de aluminio",
        ingrediente: "Fosfuro de aluminio (fumigante)",
        como: "Solo con asistencia técnica; muy tóxico.",
        precaucion: "NO lo uses si no sabes hacerlo. Mata personas si se inhala. Mejor busca asesoría."
      }
    ],
    gravedad: "media"
  },
  {
    id: "babosas",
    nombre: "Babosas y caracoles",
    emoji: "🐌",
    tipo: "Plaga rastrera",
    cultivos: ["frijol", "cebolla", "zanahoria", "pimiento"],
    sintomas: [
      "Hojas y tallos comidos con baba brillante",
      "Huellas plateadas de baba sobre la tierra y hojas",
      "La planta aparece mordida en la noche"
    ],
    clavesSintomas: ["baba", "plateado", "babosa", "caracol", "hojas comidas en la noche"],
    prevencion: "Riega en la mañana para que la tierra esté seca en la noche.",
    solucionesNaturales: [
      "Pon trampas con cáscaras de naranja o plátano boca abajo; revisa en la mañana.",
      "Esparce ceniza o cáscara de huevo molida alrededor de las plantas.",
      "Recógelas de noche con linterna.",
      "Trampas de cerveza: un plato enterrado con cerveza al nivel del suelo."
    ],
    agroquimicos: [
      {
        nombre: "Metaldehído (cebo)",
        ingrediente: "Metaldehído 5%",
        como: "Cebos pequeños, dosis de etiqueta.",
        precaucion: "Peligroso para perros y gatos. Retira los cebos en el día."
      }
    ],
    gravedad: "leve"
  },
  {
    id: "gusanos-tierra",
    nombre: "Gusanos de la tierra (babosas y gusanos del suelo)",
    emoji: "🪱",
    tipo: "Plaga del suelo",
    cultivos: ["arroz", "maiz", "frijol"],
    sintomas: [
      "Gusanos blancos o grises en la raíz",
      "Plantas que se ponen amarillas sin razón",
      "Plantas que se caen y la raíz está comida"
    ],
    clavesSintomas: ["raíces comidas", "gusanos blancos", "amarillas", "planta caída"],
    prevencion: "Airea el suelo. No siembres siempre el mismo cultivo (rotación).",
    solucionesNaturales: [
      "Rotación de cultivos: cambia de cultivo cada temporada.",
      "Echa compost maduro para fortalecer las plantas.",
      "Esparce trichoderma (hongo benéfico) en el suelo.",
      "Aporca tierra nueva al pie de las plantas afectadas."
    ],
    agroquimicos: [
      {
        nombre: "Carbofurano (uso restringido)",
        ingrediente: "Carbofurano 3%",
        como: "Solo con asesoría técnica.",
        precaucion: "Extremadamente tóxico. Mejor busca un agrónomo."
      }
    ],
    gravedad: "media"
  }
];

const obtenerPlaga = (id) => PLAGAS.find((p) => p.id === id);
const obtenerPlagasPorCultivo = (cultivoId) => PLAGAS.filter((p) => p.cultivos.includes(cultivoId));
