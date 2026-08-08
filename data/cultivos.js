// Campo Sano - Base de datos de cultivos
// Español sencillo. Cada cultivo incluye siembra, germinación y cuidados.

const CULTIVOS = [
  {
    id: "maiz",
    nombre: "Maíz",
    emoji: "🌽",
    cientifico: "Zea mays",
    clima: "Cálido y templado. No aguanta heladas.",
    suelo: "Tierra suelta, bien drenada y con abono orgánico.",
    epoca: "Inicio de lluvias (siembra directa).",
    germinacion: "7 a 12 días",
    riego: "Moderado. Mucha agua al inicio, menos cuando florece.",
    sol: "Sol directo todo el día.",
    cuidados: [
      "Siembra 2 a 3 semillas por hoyo, a 4 cm de profundidad.",
      "Deja 25 cm entre planta y planta y 80 cm entre hileras.",
      "Aporca (sube tierra al pie de la planta) a los 30 días.",
      "Abona con compost al sembrar y otra vez cuando la planta mida 40 cm.",
      "Cosecha cuando el elote esté lleno y el cabello seco."
    ],
    cosecha: "3 a 4 meses",
    plagas: ["gusano-cogollero", "pulgones", "hongos-hoja", "gusano-trocero"]
  },
  {
    id: "frijol",
    nombre: "Frijol",
    emoji: "🫘",
    cientifico: "Phaseolus vulgaris",
    clima: "Templado y cálido. Sensible a heladas.",
    suelo: "Suelto, con buen drenaje. No quiere tierra encharcada.",
    epoca: "Al inicio de las lluvias.",
    germinacion: "7 a 14 días",
    riego: "Poco y constante. No mojar mucho las hojas.",
    sol: "Media sombra o sol directo.",
    cuidados: [
      "Siembra 2 semillas por golpe, a 3 cm de profundidad.",
      "Separa los surcos 40 cm y las plantas 20 cm.",
      "No uses demasiado abono nitrogenado: el frijol produce su propio nitrógeno.",
      "Si lo siembras entre el maíz, ayuda a mejorar el suelo.",
      "Cosecha cuando las vainas estén secas y amarillentas."
    ],
    cosecha: "2.5 a 4 meses",
    plagas: ["pulgones", "hongos-hoja", "gorgojos", "babosas"]
  },
  {
    id: "papa",
    nombre: "Papa",
    emoji: "🥔",
    cientifico: "Solanum tuberosum",
    clima: "Frío y templado (clima de montaña).",
    suelo: "Tierra suelta, profunda, con mucho abono orgánico.",
    epoca: "Inicio de lluvias (se siembra el tubérculo).",
    germinacion: "Brotes en 20 a 30 días",
    riego: "Regular, sin encharcar el suelo.",
    sol: "Sol directo, pero agradece algo de sombra en el calor fuerte.",
    cuidados: [
      "Usa papa semilla sana y con brotes; corta en trozos con 2 brotes cada uno.",
      "Siembra a 10 cm de profundidad, 30 cm entre plantas y 90 cm entre surcos.",
      "Aporca 2 veces: cuando la planta mida 20 cm y otra a los 45 días.",
      "Riega en las mañanas, nunca de noche.",
      "Cosecha cuando la planta se pone amarilla y se seca."
    ],
    cosecha: "3.5 a 5 meses",
    plagas: ["tizon-tardio", "gusano-trocero", "pulgones", "hongos-hoja"]
  },
  {
    id: "tomate",
    nombre: "Tomate",
    emoji: "🍅",
    cientifico: "Solanum lycopersicum",
    clima: "Cálido y templado. No aguanta heladas.",
    suelo: "Tierra suelta, rica en abono, buen drenaje.",
    epoca: "Se siembra en semillero y se trasplanta a los 30 días.",
    germinacion: "7 a 14 días",
    riego: "Constante pero sin mojar las hojas.",
    sol: "Sol directo, mínimo 6 horas al día.",
    cuidados: [
      "Haz semillero con tierra fina; riega con regadera suave.",
      "Trasplanta cuando tenga 4 hojas verdaderas.",
      "Pon una estaca o tutor para que la planta no se caiga.",
      "Corta los brotes que salen entre el tallo y la rama (chupones).",
      "Cosecha los frutos cuando estén rojos pero firmes."
    ],
    cosecha: "3 a 4.5 meses",
    plagas: ["tizon-tardio", "mosca-blanca", "pulgones", "minador", "hongos-hoja"]
  },
  {
    id: "cebolla",
    nombre: "Cebolla",
    emoji: "🧅",
    cientifico: "Allium cepa",
    clima: "Templado. Aguanta algo de frío.",
    suelo: "Tierra suelta y suave, sin piedras, buen drenaje.",
    epoca: "Semillero en tierra húmeda; trasplante a los 60 días.",
    germinacion: "10 a 15 días",
    riego: "Regular; parar el riego 15 días antes de cosechar.",
    sol: "Sol directo.",
    cuidados: [
      "Siembra las semillas en semillero, muy superficiales.",
      "Trasplanta los bulbillos pequeños separados 10 cm.",
      "No entierres el bulbo, debe quedar medio al descubierto.",
      "Quita las malas hierbas con cuidado de no dañar la raíz.",
      "Cosecha cuando el tallo se doble y se seque la punta."
    ],
    cosecha: "4 a 5 meses",
    plagas: ["hongos-hoja", "babosas", "trips"]
  },
  {
    id: "yuca",
    nombre: "Yuca",
    emoji: "🌿",
    cientifico: "Manihot esculenta",
    clima: "Cálido, no aguanta heladas.",
    suelo: "Tierra suelta y profunda, no soporta encharcamiento.",
    epoca: "Al inicio de lluvias (se siembra por estacas o tallos).",
    germinacion: "Brotan en 15 a 25 días",
    riego: "Muy poco; aguanta sequías.",
    sol: "Sol directo.",
    cuidados: [
      "Usa estacas de 20 a 30 cm de tallo maduro, con yemas.",
      "Entierra la estaca inclinada, dejando 2 yemas fuera.",
      "No necesita mucho abono, pero agradece el compost.",
      "Controla las malas hierbas los primeros 3 meses.",
      "Cosecha a los 9 a 12 meses, cuando las hojas se ponen amarillas."
    ],
    cosecha: "9 a 12 meses",
    plagas: ["trips", "pulgones", "hongos-hoja"]
  },
  {
    id: "platano",
    nombre: "Plátano",
    emoji: "🍌",
    cientifico: "Musa paradisiaca",
    clima: "Cálido y húmedo.",
    suelo: "Tierra profunda, con buen drenaje y mucha materia orgánica.",
    epoca: "Se siembra por hijos o cormos en época lluviosa.",
    germinacion: "Colino listo en 1 a 2 meses",
    riego: "Regular, mantener la tierra húmeda.",
    sol: "Sol directo o media sombra.",
    cuidados: [
      "Planta el colino (hijo) en hoyo grande de 40 cm con abono.",
      "Deja 2.5 a 3 metros entre plantas.",
      "Corta los hijos sobrantes para que la planta se concentre en el racimo.",
      "Poda hojas secas y viejas para evitar enfermedades.",
      "Cosecha el racimo cuando los dedos se vean llenos, antes de que maduren."
    ],
    cosecha: "9 a 12 meses",
    plagas: ["sigatoka", "picudo", "pulgones"]
  },
  {
    id: "cafe",
    nombre: "Café",
    emoji: "☕",
    cientifico: "Coffea arabica",
    clima: "Templado de montaña, con sombra.",
    suelo: "Tierra ácida, profunda, con buen drenaje.",
    epoca: "Se siembra en almácigo y se trasplanta a los 6 a 8 meses.",
    germinacion: "40 a 60 días",
    riego: "Moderado; no dejes secar el suelo al inicio.",
    sol: "Le gusta la sombra (con árboles como guamo o plátano).",
    cuidados: [
      "Siembra las semillas en almácigo con sombra.",
      "Trasplanta en época de lluvia, 1 metro entre plantas.",
      "Mantén la sombra para que no se queme el fruto.",
      "Abona 2 veces al año con abono orgánico.",
      "Cosecha solo los frutos rojos y maduros."
    ],
    cosecha: "3 a 4 años para la primera cosecha",
    plagas: ["roya", "broca", "pulgones"]
  },
  {
    id: "arroz",
    nombre: "Arroz",
    emoji: "🌾",
    cientifico: "Oryza sativa",
    clima: "Cálido y húmedo.",
    suelo: "Tierra que aguante agua (anegable), limosa o arcillosa.",
    epoca: "Al inicio de lluvias.",
    germinacion: "5 a 10 días",
    riego: "Llenar de agua el lote en etapas.",
    sol: "Sol directo.",
    cuidados: [
      "Siembra la semilla en tierra húmeda y luego inunda el lote.",
      "Mantén una lámina de agua de 5 a 10 cm durante el crecimiento.",
      "Desagua 10 días antes de la cosecha.",
      "Controla las malas hierbas cuando el agua esté baja.",
      "Cosecha cuando el grano esté dorado y duro."
    ],
    cosecha: "4 a 5 meses",
    plagas: ["hongos-hoja", "gorgojos", "gusanos-tierra"]
  },
  {
    id: "aguacate",
    nombre: "Aguacate",
    emoji: "🥑",
    cientifico: "Persea americana",
    clima: "Cálido y templado, sin heladas.",
    suelo: "Tierra profunda con buen drenaje.",
    epoca: "Inicio de lluvias (injerto o plántula).",
    germinacion: "Plántula de semilla en 3 a 6 semanas",
    riego: "Moderado; riega bien el primer año.",
    sol: "Sol directo.",
    cuidados: [
      "Siembra injertos de variedad buena para producir más rápido.",
      "Hoyo grande (50 cm) con abono orgánico.",
      "Deja 6 metros entre árboles.",
      "Riega cada semana el primer año, después menos.",
      "Poda solo ramas secas o enfermas."
    ],
    cosecha: "3 a 5 años para la primera cosecha",
    plagas: ["hongos-hoja", "trips", "pulgones"]
  },
  {
    id: "zanahoria",
    nombre: "Zanahoria",
    emoji: "🥕",
    cientifico: "Daucus carota",
    clima: "Templado y fresco.",
    suelo: "Tierra muy suelta y profunda, sin piedras.",
    epoca: "Siembra directa en tierra húmeda.",
    germinacion: "15 a 20 días",
    riego: "Frecuente y ligero; no dejes secar la tierra.",
    sol: "Sol directo o media sombra.",
    cuidados: [
      "Siembra las semillas muy superficiales (a 1 cm).",
      "Riega suave con regadera para no sacar las semillas.",
      "Ralea (saca plantas de más) dejando 5 cm entre plantas.",
      "Afloja la tierra alrededor para que crezca larga.",
      "Cosecha a los 3 a 4 meses cuando el hombro salga del suelo."
    ],
    cosecha: "3 a 4 meses",
    plagas: ["hongos-hoja", "babosas", "pulgones"]
  },
  {
    id: "pimiento",
    nombre: "Pimiento (Ají)",
    emoji: "🌶️",
    cientifico: "Capsicum annuum",
    clima: "Cálido y templado.",
    suelo: "Tierra suelta, con buen drenaje y abono.",
    epoca: "Semillero y trasplante a los 30 a 40 días.",
    germinacion: "10 a 20 días",
    riego: "Moderado y constante, sin mojar las hojas.",
    sol: "Sol directo.",
    cuidados: [
      "Haz semillero protegido del sol fuerte.",
      "Trasplanta a 40 cm entre plantas.",
      "Pon tutor cuando la planta crezca.",
      "Abona con compost cuando aparezcan las primeras flores.",
      "Cosecha los frutos verdes o maduros según la variedad."
    ],
    cosecha: "3.5 a 5 meses",
    plagas: ["pulgones", "trips", "mosca-blanca", "hongos-hoja"]
  },
  {
    id: "lechuga",
    nombre: "Lechuga",
    emoji: "🥬",
    cientifico: "Lactuca sativa",
    clima: "Templado y fresco.",
    suelo: "Tierra suelta y fértil, con buen drenaje.",
    epoca: "Se siembra en semillero todo el año en clima fresco.",
    germinacion: "7 a 12 días",
    riego: "Frecuente y ligero; no dejes secar la tierra.",
    sol: "Sol suave o media sombra en calor fuerte.",
    cuidados: [
      "Haz semillero y trasplanta cuando tenga 4 hojas.",
      "Deja 25 cm entre plantas.",
      "Riega en las mañanas, sin mojar las hojas al mediodía.",
      "Abona con compost al trasplantar.",
      "Cosecha hoja por hoja o la cabeza completa a los 2 meses."
    ],
    cosecha: "2 a 3 meses",
    plagas: ["babosas", "pulgones", "hongos-hoja"]
  },
  {
    id: "repollo",
    nombre: "Repollo",
    emoji: "🥬",
    cientifico: "Brassica oleracea",
    clima: "Templado y fresco.",
    suelo: "Tierra firme y fértil, con buen drenaje.",
    epoca: "Semillero y trasplante a los 30 a 40 días.",
    germinacion: "7 a 14 días",
    riego: "Regular; mantén la tierra húmeda sin charcos.",
    sol: "Sol directo o media sombra.",
    cuidados: [
      "Trasplanta a 40 cm entre plantas.",
      "Abona con compost y cal agrícola si la tierra es ácida.",
      "Aporca para que el tallo quede firme.",
      "Riega en las mañanas.",
      "Cosecha cuando la cabeza esté firme y llena."
    ],
    cosecha: "3 a 4 meses",
    plagas: ["babosas", "pulgones", "hongos-hoja"]
  },
  {
    id: "pepino",
    nombre: "Pepino",
    emoji: "🥒",
    cientifico: "Cucumis sativus",
    clima: "Cálido.",
    suelo: "Tierra suelta, fértil y con buen drenaje.",
    epoca: "Siembra directa al inicio de lluvias.",
    germinacion: "5 a 10 días",
    riego: "Regular y constante; no mojar las flores.",
    sol: "Sol directo.",
    cuidados: [
      "Siembra 2 semillas por golpe a 2 cm de profundidad.",
      "Deja 40 cm entre plantas y 1 metro entre surcos.",
      "Pon tutor o malla para que trepe y produzca más.",
      "Abona con compost cuando aparezcan las guías.",
      "Cosecha los frutos verdes y firmes, no dejes que se pongan amarillos."
    ],
    cosecha: "2.5 a 3.5 meses",
    plagas: ["hongos-hoja", "mosca-blanca", "pulgones", "babosas"]
  },
  {
    id: "calabaza",
    nombre: "Calabaza (Ayote)",
    emoji: "🎃",
    cientifico: "Cucurbita moschata",
    clima: "Cálido y templado.",
    suelo: "Tierra suelta, rica en abono orgánico.",
    epoca: "Al inicio de lluvias (siembra directa).",
    germinacion: "7 a 14 días",
    riego: "Poco; riega bien al inicio y menos cuando ya hay frutos.",
    sol: "Sol directo.",
    cuidados: [
      "Siembra 2 a 3 semillas por golpe, a 3 cm.",
      "Deja 1.5 metros entre plantas.",
      "Las guías se esparcen: dales espacio o guíalas con cuidado.",
      "Abona con compost cuando empiecen a salir las guías.",
      "Cosecha cuando el tallo del fruto se ponga seco y leñoso."
    ],
    cosecha: "3.5 a 5 meses",
    plagas: ["hongos-hoja", "mosca-blanca", "babosas"]
  },
  {
    id: "camote",
    nombre: "Camote (Batata)",
    emoji: "🍠",
    cientifico: "Ipomoea batatas",
    clima: "Cálido.",
    suelo: "Tierra suelta y arenosa, con buen drenaje.",
    epoca: "Se siembra por esquejes (ramas) en época de lluvias.",
    germinacion: "Esquejes enraizan en 10 a 15 días",
    riego: "Poco; aguanta bien la sequía.",
    sol: "Sol directo.",
    cuidados: [
      "Corta ramas de 30 cm de plantas sanas y entierra la mitad.",
      "Deja 30 cm entre plantas y 90 cm entre surcos.",
      "No uses mucho abono nitrogenado o saldrán puras hojas.",
      "Voltea las ramas que echan raíz para que los camotes crezcan grandes.",
      "Cosecha a los 4 a 5 meses, aflojando la tierra con cuidado."
    ],
    cosecha: "4 a 5 meses",
    plagas: ["gusanos-tierra", "pulgones", "gorgojos"]
  },
  {
    id: "cacao",
    nombre: "Cacao",
    emoji: "🍫",
    cientifico: "Theobroma cacao",
    clima: "Cálido y húmedo, con sombra.",
    suelo: "Tierra profunda, fértil y con buen drenaje.",
    epoca: "Al inicio de lluvias (injerto o plántula).",
    germinacion: "Plántula en 3 a 4 semanas",
    riego: "Regular; no dejes secar el suelo al inicio.",
    sol: "Le gusta la sombra (con plátano o árboles grandes).",
    cuidados: [
      "Planta bajo sombra de árboles o plátano.",
      "Deja 3 metros entre plantas.",
      "Abona 2 veces al año con abono orgánico.",
      "Poda ramas secas y enfermas.",
      "Cosecha las mazorcas maduras (amarillas o rojas), saca y fermenta las semillas."
    ],
    cosecha: "3 a 4 años para la primera cosecha",
    plagas: ["hongos-hoja", "pulgones", "picudo"]
  },
  {
    id: "cana-azucar",
    nombre: "Caña de azúcar",
    emoji: "🎋",
    cientifico: "Saccharum officinarum",
    clima: "Cálido y húmedo.",
    suelo: "Tierra profunda y fértil.",
    epoca: "Se siembra por trozos de tallo al inicio de lluvias.",
    germinacion: "Brota en 15 a 25 días",
    riego: "Regular; más agua en la época de crecimiento.",
    sol: "Sol directo.",
    cuidados: [
      "Entierra trozos de tallo con 2 a 3 yemas, inclinados.",
      "Deja 50 cm entre cañas y 1.2 metros entre surcos.",
      "Aporca cuando los tallos jóvenes lleguen a 40 cm.",
      "Quita las hojas secas de abajo.",
      "Cosecha a los 12 a 18 meses, cortando la caña a ras del suelo."
    ],
    cosecha: "12 a 18 meses",
    plagas: ["hongos-hoja", "gusanos-tierra", "trips"]
  },
  {
    id: "mango",
    nombre: "Mango",
    emoji: "🥭",
    cientifico: "Mangifera indica",
    clima: "Cálido.",
    suelo: "Tierra profunda, con buen drenaje.",
    epoca: "Inicio de lluvias (injerto o plántula).",
    germinacion: "Plántula de semilla en 2 a 4 semanas",
    riego: "Moderado; riega bien el primer año.",
    sol: "Sol directo.",
    cuidados: [
      "Siembra injertos de buena variedad para producir antes.",
      "Hoyo grande (50 cm) con abono orgánico.",
      "Deja 8 metros entre árboles.",
      "Riega el primer año, después el árbol se sostiene solo.",
      "Poda solo ramas secas o cruzadas."
    ],
    cosecha: "3 a 5 años para la primera cosecha",
    plagas: ["hongos-hoja", "mosca-blanca", "trips"]
  },
  {
    id: "limon",
    nombre: "Limón",
    emoji: "🍋",
    cientifico: "Citrus limon",
    clima: "Cálido.",
    suelo: "Tierra suelta con buen drenaje, no encharcada.",
    epoca: "Inicio de lluvias (injerto o plántula).",
    germinacion: "Plántula en 3 a 6 semanas",
    riego: "Regular; más en el primer año.",
    sol: "Sol directo.",
    cuidados: [
      "Siembra injertos para frutos más rápido.",
      "Deja 4 a 5 metros entre árboles.",
      "Abona con compost y materia orgánica.",
      "Riega bien el primer año.",
      "Cosecha los frutos verdes o amarillos según el uso."
    ],
    cosecha: "2 a 4 años para la primera cosecha",
    plagas: ["hongos-hoja", "pulgones", "trips"]
  },
  {
    id: "naranja",
    nombre: "Naranja",
    emoji: "🍊",
    cientifico: "Citrus sinensis",
    clima: "Cálido y templado.",
    suelo: "Tierra profunda con buen drenaje.",
    epoca: "Inicio de lluvias (injerto o plántula).",
    germinacion: "Plántula en 3 a 6 semanas",
    riego: "Regular; más en el primer año.",
    sol: "Sol directo.",
    cuidados: [
      "Siembra injertos de buena variedad.",
      "Deja 5 a 6 metros entre árboles.",
      "Abona 2 veces al año.",
      "Riega bien el primer año.",
      "Cosecha los frutos cuando estén bien coloridos."
    ],
    cosecha: "3 a 5 años para la primera cosecha",
    plagas: ["hongos-hoja", "pulgones", "trips"]
  },
  {
    id: "ajo",
    nombre: "Ajo",
    emoji: "🧄",
    cientifico: "Allium sativum",
    clima: "Templado y fresco.",
    suelo: "Tierra suelta y suave, sin piedras.",
    epoca: "Se siembra el diente en tierra húmeda.",
    germinacion: "Brota en 10 a 20 días",
    riego: "Regular; para el riego 2 semanas antes de cosechar.",
    sol: "Sol directo.",
    cuidados: [
      "Planta los dientes con la punta hacia arriba, a 3 cm.",
      "Deja 10 cm entre dientes y 30 cm entre surcos.",
      "No mojes mucho las hojas.",
      "Quita las malas hierbas a mano.",
      "Cosecha cuando las hojas se pongan amarillas y se doblen."
    ],
    cosecha: "4 a 6 meses",
    plagas: ["hongos-hoja", "trips", "babosas"]
  },
  {
    id: "espinaca",
    nombre: "Espinaca",
    emoji: "🍃",
    cientifico: "Spinacia oleracea",
    clima: "Templado y fresco.",
    suelo: "Tierra fértil, húmeda y con buen drenaje.",
    epoca: "Siembra directa en clima fresco.",
    germinacion: "7 a 14 días",
    riego: "Frecuente y ligero.",
    sol: "Media sombra o sol suave.",
    cuidados: [
      "Siembra las semillas a 1 cm de profundidad.",
      "Deja 10 cm entre plantas.",
      "Riega en las mañanas.",
      "Abona con compost antes de sembrar.",
      "Cosecha las hojas de afuera para que siga produciendo."
    ],
    cosecha: "1.5 a 2.5 meses",
    plagas: ["pulgones", "babosas", "hongos-hoja"]
  },
  {
    id: "ejote",
    nombre: "Ejote (Habichuela)",
    emoji: "🫛",
    cientifico: "Phaseolus vulgaris",
    clima: "Cálido y templado.",
    suelo: "Tierra suelta con buen drenaje.",
    epoca: "Al inicio de lluvias.",
    germinacion: "7 a 12 días",
    riego: "Poco y constante.",
    sol: "Sol directo.",
    cuidados: [
      "Siembra 2 semillas por golpe, a 3 cm.",
      "Deja 20 cm entre plantas y 50 cm entre surcos.",
      "Si es trepador, pon tutores.",
      "Cosecha las vainas tiernas cada 2 o 3 días.",
      "Cosechar seguido hace que produzca más."
    ],
    cosecha: "2 a 3 meses",
    plagas: ["pulgones", "hongos-hoja", "minador", "babosas"]
  },
  {
    id: "maracuya",
    nombre: "Maracuyá",
    emoji: "🍈",
    cientifico: "Passiflora edulis",
    clima: "Cálido y templado.",
    suelo: "Tierra suelta, fértil y con buen drenaje.",
    epoca: "Semillero y trasplante al inicio de lluvias.",
    germinacion: "20 a 30 días",
    riego: "Moderado y constante; no encharcar.",
    sol: "Sol directo.",
    cuidados: [
      "Haz semillero con tierra fina y abono.",
      "Trasplanta a 2.5 metros entre plantas.",
      "Pon tutor o guía para que la planta trepe.",
      "Poda ramas viejas después de cada cosecha.",
      "Cosecha los frutos cuando se pongan amarillos y caigan solos."
    ],
    cosecha: "8 a 12 meses",
    plagas: ["hongos-hoja", "trips", "mosca-blanca", "pulgones"]
  },
  {
    id: "sandia",
    nombre: "Sandía",
    emoji: "🍉",
    cientifico: "Citrullus lanatus",
    clima: "Cálido.",
    suelo: "Tierra suelta y arenosa, con buen drenaje.",
    epoca: "Al inicio de lluvias (siembra directa).",
    germinacion: "7 a 14 días",
    riego: "Regular; más agua cuando el fruto crece.",
    sol: "Sol directo.",
    cuidados: [
      "Siembra 2 a 3 semillas por golpe, a 3 cm.",
      "Deja 1.5 metros entre plantas.",
      "Poda la punta de la guía para que salgan más frutos.",
      "Pon un pedazo de paja bajo cada fruto para que no se pudra.",
      "Cosecha cuando el zarcillo cerca del fruto esté seco y el golpe suene hueco."
    ],
    cosecha: "3 a 4 meses",
    plagas: ["hongos-hoja", "mosca-blanca", "babosas", "pulgones"]
  },
  {
    id: "sandia-baby",
    nombre: "Sandía baby (mini)",
    emoji: "🍉",
    cientifico: "Citrullus lanatus var.",
    clima: "Cálido.",
    suelo: "Tierra suelta y arenosa, buen drenaje.",
    epoca: "Al inicio de lluvias.",
    germinacion: "7 a 14 días",
    riego: "Regular; menos agua que la sandía grande.",
    sol: "Sol directo.",
    cuidados: [
      "Igual que la sandía grande, pero con frutos de 1 a 3 kilos.",
      "Deja 1 metro entre plantas.",
      "Cosecha cuando el tallo se seque cerca del fruto.",
      "Ideal para huertos pequeños y caseros."
    ],
    cosecha: "3 meses",
    plagas: ["hongos-hoja", "mosca-blanca", "pulgones"]
  },
  {
    id: "papaya",
    nombre: "Papaya",
    emoji: "🫒",
    cientifico: "Carica papaya",
    clima: "Cálido, sin heladas.",
    suelo: "Tierra suelta, fértil y con buen drenaje.",
    epoca: "Semillero y trasplante al inicio de lluvias.",
    germinacion: "15 a 25 días",
    riego: "Regular; no dejes secar el suelo.",
    sol: "Sol directo.",
    cuidados: [
      "Haz semillero y trasplanta a los 30 días.",
      "Deja 2 metros entre plantas.",
      "La planta crece rápido: abona con compost cada 2 meses.",
      "Corta las flores macho si quieres más frutos.",
      "Cosecha cuando el fruto empiece a amarillear."
    ],
    cosecha: "8 a 12 meses",
    plagas: ["hongos-hoja", "mosca-blanca", "trips", "pulgones"]
  },
  {
    id: "guanabana",
    nombre: "Guanábana",
    emoji: "🍐",
    cientifico: "Annona muricata",
    clima: "Cálido y húmedo.",
    suelo: "Tierra profunda y fértil.",
    epoca: "Inicio de lluvias (injerto o plántula).",
    germinacion: "Plántula en 3 a 6 semanas",
    riego: "Moderado; riega bien el primer año.",
    sol: "Sol directo o media sombra.",
    cuidados: [
      "Siembra injertos para frutos más rápido.",
      "Deja 4 metros entre árboles.",
      "Abona con materia orgánica 2 veces al año.",
      "Poda ramas secas y bajas.",
      "Cosecha cuando las espinas del fruto se ablanden."
    ],
    cosecha: "3 a 4 años para la primera cosecha",
    plagas: ["hongos-hoja", "pulgones", "trips"]
  },
  {
    id: "lulo",
    nombre: "Lulo",
    emoji: "🍊",
    cientifico: "Solanum quitoense",
    clima: "Templado de montaña (1.200 a 2.200 m).",
    suelo: "Tierra suelta, ácida y con buen drenaje.",
    epoca: "Semillero y trasplante en época de lluvias.",
    germinacion: "25 a 40 días",
    riego: "Regular y constante.",
    sol: "Media sombra cuando es joven.",
    cuidados: [
      "Haz semillero y trasplanta a los 60 días.",
      "Deja 2 metros entre plantas.",
      "Pon tutores y poda a 1.5 metros para que produzca más.",
      "Abona con compost cada 2 meses.",
      "Cosecha cuando el fruto se ponga amarillo-naranja."
    ],
    cosecha: "8 a 12 meses",
    plagas: ["pulgones", "hongos-hoja", "minador", "trips"]
  },
  {
    id: "guayaba",
    nombre: "Guayaba",
    emoji: "🍏",
    cientifico: "Psidium guajava",
    clima: "Cálido.",
    suelo: "Cualquier tierra, con buen drenaje.",
    epoca: "Inicio de lluvias (injerto o plántula).",
    germinacion: "Plántula en 3 a 6 semanas",
    riego: "Moderado; más en el primer año.",
    sol: "Sol directo.",
    cuidados: [
      "Siembra injertos de variedad roja o blanca.",
      "Deja 4 metros entre árboles.",
      "Poda después de la cosecha.",
      "Abona con compost 2 veces al año.",
      "Cosecha los frutos cuando estén perfumados."
    ],
    cosecha: "2 a 3 años para la primera cosecha",
    plagas: ["hongos-hoja", "trips", "mosca-blanca"]
  },
  {
    id: "pitahaya",
    nombre: "Pitahaya",
    emoji: "🌺",
    cientifico: "Hylocereus undatus",
    clima: "Cálido y seco.",
    suelo: "Tierra suelta y arenosa, con buen drenaje.",
    epoca: "Se siembran esquejes de tallo al inicio de lluvias.",
    germinacion: "Esquejes enraizan en 15 a 25 días",
    riego: "Poco; riega cada 2 semanas.",
    sol: "Sol directo.",
    cuidados: [
      "Planta esquejes de tallo contra una guía o poste.",
      "Deja 3 metros entre plantas.",
      "Ata los tallos al tutor a medida que crecen.",
      "No la mojes mucho o se pudre.",
      "Cosecha cuando el fruto se ponga rosado."
    ],
    cosecha: "18 a 24 meses",
    plagas: ["hongos-hoja", "pulgones", "babosas"]
  },
  {
    id: "granadilla",
    nombre: "Granadilla",
    emoji: "🍑",
    cientifico: "Passiflora ligularis",
    clima: "Templado de montaña.",
    suelo: "Tierra suelta, fértil y con buen drenaje.",
    epoca: "Semillero y trasplante en época de lluvias.",
    germinacion: "20 a 30 días",
    riego: "Regular; más en floración.",
    sol: "Sol directo.",
    cuidados: [
      "Haz semillero y trasplanta a los 3 meses.",
      "Deja 2.5 metros entre plantas.",
      "Pon tutor o espaldera para las guías.",
      "Poda después de cada cosecha.",
      "Cosecha cuando el fruto se ponga naranja y se desprenda fácil."
    ],
    cosecha: "8 a 12 meses",
    plagas: ["hongos-hoja", "trips", "mosca-blanca", "pulgones"]
  },
  {
    id: "mora",
    nombre: "Mora",
    emoji: "🫐",
    cientifico: "Rubus glaucus",
    clima: "Templado de montaña (1.500 a 2.500 m).",
    suelo: "Tierra suelta, fértil y húmeda.",
    epoca: "Se siembran colinos al inicio de lluvias.",
    germinacion: "Colinos enraizan en 20 a 30 días",
    riego: "Regular; no dejes secar la tierra.",
    sol: "Sol directo o media sombra.",
    cuidados: [
      "Planta los colinos a 2 metros entre sí.",
      "Pon tutores y guía las ramas.",
      "Poda las ramas que ya dieron fruto.",
      "Abona con compost cada 2 meses.",
      "Cosecha los frutos bien morados, sin que se deshagan."
    ],
    cosecha: "9 a 15 meses",
    plagas: ["hongos-hoja", "pulgones", "babosas"]
  },
  {
    id: "tomate-arbol",
    nombre: "Tomate de árbol",
    emoji: "🍅",
    cientifico: "Solanum betaceum",
    clima: "Templado de montaña.",
    suelo: "Tierra suelta, fértil y con buen drenaje.",
    epoca: "Semillero y trasplante en época de lluvias.",
    germinacion: "20 a 30 días",
    riego: "Regular; no encharcar.",
    sol: "Sol directo o media sombra.",
    cuidados: [
      "Haz semillero y trasplanta a los 60 días.",
      "Deja 2 metros entre plantas.",
      "Poda a 1.5 metros para que se ramifique.",
      "Abona con compost cada 2 meses.",
      "Cosecha cuando el fruto cambie de color."
    ],
    cosecha: "8 a 12 meses",
    plagas: ["hongos-hoja", "pulgones", "mosca-blanca", "trips"]
  },
  {
    id: "chontaduro",
    nombre: "Chontaduro",
    emoji: "🥥",
    cientifico: "Bactris gasipaes",
    clima: "Cálido y húmedo (selva baja).",
    suelo: "Tierra profunda y fértil.",
    epoca: "Se siembran hijos o semillas al inicio de lluvias.",
    germinacion: "Semilla en 2 a 4 meses",
    riego: "Moderado; más en la época seca.",
    sol: "Sol directo.",
    cuidados: [
      "Planta los hijos a 3 metros entre sí.",
      "Abona con materia orgánica 2 veces al año.",
      "Quita los hijuelos sobrantes.",
      "Cosecha los racimos cuando los frutos estén rojo-naranja.",
      "Los frutos se hierven para comerlos."
    ],
    cosecha: "4 a 6 años para la primera cosecha",
    plagas: ["picudo", "hongos-hoja", "pulgones"]
  },
  {
    id: "brocoli",
    nombre: "Brócoli",
    emoji: "🥦",
    cientifico: "Brassica oleracea var. italica",
    clima: "Templado y fresco.",
    suelo: "Tierra firme y fértil, con buen drenaje.",
    epoca: "Semillero y trasplante a los 30 a 40 días.",
    germinacion: "7 a 14 días",
    riego: "Regular; no dejes secar la tierra.",
    sol: "Sol directo.",
    cuidados: [
      "Trasplanta a 40 cm entre plantas.",
      "Abona con compost al trasplantar.",
      "Riega en las mañanas.",
      "Cosecha la cabeza principal cuando esté firme y verde oscuro.",
      "Después, salen cabezas pequeñas en los laterales."
    ],
    cosecha: "3 a 4 meses",
    plagas: ["pulgones", "babosas", "hongos-hoja"]
  },
  {
    id: "remolacha",
    nombre: "Remolacha (Betabel)",
    emoji: "🟣",
    cientifico: "Beta vulgaris",
    clima: "Templado y fresco.",
    suelo: "Tierra suelta y profunda, sin piedras.",
    epoca: "Siembra directa en tierra húmeda.",
    germinacion: "10 a 20 días",
    riego: "Regular; no dejes secar la tierra.",
    sol: "Sol directo.",
    cuidados: [
      "Siembra las semillas a 2 cm de profundidad.",
      "Ralea dejando 10 cm entre plantas.",
      "Riega en las mañanas.",
      "Cosecha cuando la raíz tenga 5 a 8 cm.",
      "No la dejes crecer de más o se pone fibrosa."
    ],
    cosecha: "2.5 a 3.5 meses",
    plagas: ["babosas", "pulgones", "gusanos-tierra"]
  },
  {
    id: "arveja",
    nombre: "Arveja (Guisante)",
    emoji: "🫛",
    cientifico: "Pisum sativum",
    clima: "Templado y fresco.",
    suelo: "Tierra suelta y fértil.",
    epoca: "Al inicio de lluvias.",
    germinacion: "7 a 14 días",
    riego: "Moderado; menos agua en floración.",
    sol: "Sol directo.",
    cuidados: [
      "Siembra 2 semillas por golpe, a 4 cm.",
      "Deja 10 cm entre plantas y 40 cm entre surcos.",
      "Pon tutores si es trepadora.",
      "Cosecha las vainas verdes llenas.",
      "Cosechar seguido hace que produzca más."
    ],
    cosecha: "3 a 4 meses",
    plagas: ["hongos-hoja", "pulgones", "minador"]
  },
  {
    id: "cilantro",
    nombre: "Cilantro",
    emoji: "🍀",
    cientifico: "Coriandrum sativum",
    clima: "Templado.",
    suelo: "Tierra suelta y fértil, con buen drenaje.",
    epoca: "Se siembra directo durante todo el año.",
    germinacion: "10 a 20 días",
    riego: "Frecuente y ligero.",
    sol: "Sol directo.",
    cuidados: [
      "Siembra las semillas a 1 cm, en surquitos.",
      "Riega con regadera suave.",
      "Cosecha cuando la planta tenga 15 cm.",
      "Corta por encima de la base para que rebrote.",
      "Siembra cada 15 días para tener siempre cilantro."
    ],
    cosecha: "1 a 2 meses",
    plagas: ["pulgones", "hongos-hoja"]
  },
  {
    id: "rabano",
    nombre: "Rábano",
    emoji: "🔴",
    cientifico: "Raphanus sativus",
    clima: "Templado y fresco.",
    suelo: "Tierra suelta, con buen drenaje.",
    epoca: "Siembra directa todo el año en clima fresco.",
    germinacion: "4 a 7 días",
    riego: "Frecuente y ligero.",
    sol: "Sol directo o media sombra.",
    cuidados: [
      "Siembra las semillas a 1 cm de profundidad.",
      "Ralea dejando 5 cm entre plantas.",
      "Riega a diario con poca agua.",
      "Cosecha a los 20 a 30 días cuando la raíz tenga 2 cm.",
      "Si lo dejas más tiempo se pone picante y duro."
    ],
    cosecha: "1 mes",
    plagas: ["pulgones", "babosas", "gusanos-tierra"]
  }
];

const obtenerCultivo = (id) => CULTIVOS.find((c) => c.id === id);
const obtenerCultivoPorNombre = (nombre) => CULTIVOS.find((c) => c.nombre.toLowerCase() === nombre.toLowerCase());
