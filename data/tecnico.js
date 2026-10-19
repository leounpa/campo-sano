// Campo Sano - Fichas tecnicas de produccion
// Datos de apoyo para el tecnico extensionista y el productor.
// Los rendimientos y costos son RANGOS DE REFERENCIA. No son un presupuesto.
// Fuentes: paquetes tecnicos MinAgricultura / Agrosavia, CENICANA, Federacion de Cafeteros,
// y base de datos DAGMA - Alcaldia de Santiago de Cali (2016-2023).

const TECNICO = {
  platano: {
    altitud: "900 a 2.000 m. El Valle rinde mejor entre 1.000 y 1.600 m",
    clima: "20 a 30 grados C. Bajo 13 grados el crecimiento se detiene",
    suelo: "Profundo, rico y con muy buen drenaje. No aguanta encharcamiento",
    densidad: "3,0 x 3,0 m. 1.100 plantas por hectarea",
    rendimiento: "12 a 20 t/ha al ano (potencial 25 a 32)",
    costos: "13 a 19 millones COP el primer ano",
    mercado: "Consumo interno y central de abastos",
    fases: [
      ["0. Preparacion", "Semana -2 a 0", "Analisis de suelo, trazada, hoyos de 40 x 40 x 50 cm, abonos de fondo"],
      ["1. Brotacion", "0 a 60 dias", "Brota la yema. Control de maleza y revision del cultivo"],
      ["2. Desarrollo", "60 a 240 dias", "5 a 7 hojas funcionales. Deshijuelar, abonar, quitar chupones"],
      ["3. Floracion", "240 a 300 dias", "Embolsa el racimo. Suspender nitrogeno, usar K y Ca"],
      ["4. Llenado", "300 a 380 dias", "Los dedos engordan y el racimo se empolla"],
      ["5. Cosecha", "380 a 420 dias", "Cortar cuando los dedos estan rectos y con las aristas levantadas"]
    ],
    riesgos: [
      "Viento: es la amenaza numero 1. Cortamuros desde el primer ano",
      "Fusarium TR4 no tiene cura. Prevenir con material sano y no sembrar en lotes con historial",
      "Heladas en las zonas altas de Pance",
      "Sequia en los meses secos: el platano no tiene periodo de reposo"
    ]
  },

  cafe: {
    altitud: "1.200 a 2.000 m. Optimo 1.500 a 1.900 m",
    clima: "18 a 22 grados C. No tolera heladas",
    suelo: "Profundo, drenado, pH 5,5 a 6,5. Los volcanicos son ideales",
    densidad: "Cafetal denso 1,5 x 1,3 m. 5.100 plantas por hectarea",
    rendimiento: "60 a 130 kg de pergamino por ha (potencial 180 a 230)",
    costos: "20 a 30 millones COP establecer. La cosecha sola son 6 a 9 millones al ano",
    mercado: "Comercializadoras, Federacion de Cafeteros, bolsa por diferencial",
    fases: [
      ["0. Vivero", "0 a 8 meses", "Semilla en chapas. Control de tizones y nematodos"],
      ["1. Multiplicacion", "0 a 8 meses", "Enramado de ramas e injerto. Da lotes homogeneos"],
      ["2. Trasplante", "9 a 12 meses", "Hoyo de 30 x 30 x 30 cm, con sombra"],
      ["3. Establishment", "10 a 36 meses", "Abonos de crecimiento, control de arvientes, reposicion"],
      ["4. Produccion", "Del ano 3", "Floracion oct-nov. Fruto maduro 7 a 8 meses despues"],
      ["5. Renovacion", "Cada 4 a 5 anos", "Zoca o renovacion total con variedad resistente"]
    ],
    riesgos: [
      "La roya (Hemileia vastatrix) es el riesgo numero 1. Use variedades resistentes",
      "Heladas en Pance, Golondrinas y La Buitrera sobre 2.000 m",
      "Falta de mano de obra en cosecha: es el 60 % del costo variable",
      "Precio volatil en bolsa. Diversifique"
    ],
    clave: "Recolectar solo fruto rojo maduro. Despulpar el mismo dia, fermentar 18 a 24 horas, secar a 10 a 12 % de humedad y guardar en bodega seca y ventilada."
  },

  maiz: {
    altitud: "300 a 1.800 m. Optimo 800 a 1.400 m en el Valle",
    clima: "20 a 28 grados C. El suelo necesita 15 grados o mas para germinar",
    suelo: "Franco arcilloso, drenado, pH 5,5 a 7,5",
    densidad: "0,75 m entre surcos y 0,20 a 0,25 m entre plantas. 66.000 plantas/ha",
    rendimiento: "4,0 a 5,5 t/ha de grano seco (potencial 7). Para silo 14 a 18 t/ha",
    costos: "6 a 9 millones COP en grano. 8 a 12 millones COP para silo",
    mercado: "Central de abastos, industria de alimentos, balanceados",
    fases: [
      ["0. Preparacion", "Semana -2", "Arado, nivelacion y fertilizacion de fondo"],
      ["1. Germinacion", "0 a 8 dias", "Profundidad 4 a 5 cm, con buena humedad"],
      ["2. Vegetativo", "8 a 60 dias", "Nitrogeno a los 20 a 30 dias. Control de maleza temprano"],
      ["3. Floracion", "65 a 80 dias", "Periodo critico. Asegurar riego"],
      ["4. Llenado", "80 a 120 dias", "Potasio y control de barrenadores"],
      ["5. Cosecha", "135 a 150 dias", "Secar a 14 a 15 % de humedad"]
    ],
    riesgos: [
      "Heladas de septiembre y octubre en lotes altos",
      "Sequia en los meses secos: la floracion no puede sufrir estres",
      "En anos humedos sube la pudricion de mazorca por Fusarium. Secado rapido",
      "El control de maleza se pierde si pasa de 30 dias"
    ]
  },

  naranja: {
    altitud: "700 a 1.600 m. Optimo 900 a 1.300 m",
    clima: "18 a 28 grados C. Necesita noches frias (10 a 15 grados) para florar",
    suelo: "Franco arcilloso bien drenado, pH 5,5 a 6,5",
    densidad: "Semintensivo 5 x 4 m. 500 plantas por hectarea",
    rendimiento: "18 a 26 t/ha (potencial 30 a 40)",
    costos: "25 a 40 millones COP la plantacion joven. 6 a 9 millones al ano en produccion",
    mercado: "Central de abastos, plantas de jugo congelado",
    fases: [
      ["0. Preparacion", "Semana -4 a 0", "Trazado, drenajes, curva de nivel, cortamuros"],
      ["1. Vivero", "8 a 12 meses", "Injerto en T o injerto ocular sobre portainjerto"],
      ["2. Trasplante", "12 a 15 meses", "Hoyo de 50 x 50 x 50 cm"],
      ["3. Formacion", "1 a 3 anos", "Guiado y copa en paraguas, abonos N y K"],
      ["4. Produccion", "Del ano 3", "Floracion de primavera, cuaje, crecimiento del fruto"],
      ["5. Cosecha", "5 a 7 meses tras florar", "Por color de piel y solidos (minimo 10 grados Brix)"]
    ],
    riesgos: [
      "Huanglongbing (HLB) es la amenaza existencial. Vector: mosca blanca citrica",
      "El viento rasga la piel de la fruta y abre la puerta a cancrosis",
      "No usar suelo alcalino: produce deficiency de hierro"
    ],
    clave: "Cosechar con tijera, nunca arrancar. Procesar dentro de 24 horas. Vida poscosecha de 2 a 4 semanas en frio."
  },

  limon: {
    altitud: "700 a 1.600 m",
    clima: "18 a 28 grados C",
    suelo: "Franco arcilloso drenado, pH 5,5 a 6,5",
    densidad: "4 x 4 m. 625 plantas por hectarea",
    rendimiento: "18 a 26 t/ha (potencial 30 a 38)",
    costos: "25 a 40 millones COP la plantacion joven",
    mercado: "Industria de jugo y mercado local",
    fases: [
      ["0. Vivero", "8 a 12 meses", "Injerto sobre portainjerto"],
      ["1. Trasplante", "12 a 15 meses", "Hoyo de 50 cm"],
      ["2. Formacion", "1 a 3 anos", "Guiado y formacion de copa"],
      ["3. Produccion", "Del ano 3", "Floracion y cuaje"],
      ["4. Cosecha", "5 a 7 meses tras florar", "Por color y solidos"]
    ],
    riesgos: [
      "Mismo HLB que en naranja. Controle la mosca blanca",
      "El exceso de agua pudre la raiz"
    ]
  },

  aguacate: {
    altitud: "1.000 a 2.200 m. Optimo 1.500 a 2.000 m",
    clima: "16 a 25 grados C. Muy susceptible a heladas",
    suelo: "Profundo, drenado, pH 5,5 a 7,0. Muy sensible al encharcamiento",
    densidad: "Criollo 8 x 8 m (156/ha). Hass 6 x 5 m (333/ha)",
    rendimiento: "Criollo 12 a 20 t/ha. Hass 9 a 15 t/ha",
    costos: "30 a 45 millones COP la plantacion Hass joven",
    mercado: "Exportacion a Estados Unidos y Europa. Pulpa congelada",
    fases: [
      ["0. Preparacion", "Semana -4 a 0", "Revisar pendiente, control de erosion, drenajes"],
      ["1. Almacigo", "0 a 6 meses", "Semilla en bolsa con sombra controlada"],
      ["2. Vivero de injerto", "4 a 12 meses", "Injerto y manejo de vivero"],
      ["3. Trasplante", "6 a 12 meses", "Hoyo de 50 cm. Instalar colmenas desde el primer ano"],
      ["4. Formacion", "1 a 4 anos", "Guiado y abonos N y K"],
      ["5. Produccion", "3 a 5 anos", "Floracion dic-ene, cuaje feb-mar"],
      ["6. Cosecha", "8 a 12 meses tras florar", "Fruta firme, piel oscura, tallo verde"]
    ],
    riesgos: [
      "Heladas matan la flor y el fruto joven. No sembrar en zonas con heladas",
      "Phytophthora es muy dificil de controlar una vez establecida",
      "Mosca de la fruta: puede cerrar la exportacion",
      "Flor dioica: sin polinizadores no hay cuaje"
    ],
    clave: "Anadir 10 a 15 % de plantas polinizadoras. Cosechar con bolsa de felpa: cualquier golpe produce pudricion interna."
  },

  frijol: {
    altitud: "900 a 2.100 m. Optimo 1.400 a 1.900 m",
    clima: "18 a 24 grados C",
    suelo: "Franco, drenado, pH 5,6 a 7,0. Muy sensible al encharcamiento",
    densidad: "0,50 m entre surcos y 0,25 m entre plantas. 45 a 60 kg de semilla por ha",
    rendimiento: "1,2 a 2,0 t/ha en arbustivo (potencial 2,4 a 3,0). Trepador 2 a 3 t/ha",
    costos: "5 a 8 millones COP por hectarea",
    mercado: "Autoconsumo, mercado local y tienda de barrio",
    fases: [
      ["0. Preparacion", "Semana -2", "Arado y fertilizacion de fondo con fosforo y potasio"],
      ["1. Germinacion", "0 a 8 dias", "Profundidad 3 a 4 cm. Siembra directa, no trasplantar"],
      ["2. Vegetativo", "8 a 45 dias", "Hojas trifoliadas. Control de maleza temprano"],
      ["3. Floracion", "45 a 60 dias", "La fase mas sensible a la sequia"],
      ["4. Llenado", "60 a 78 dias", "Cuaje de vainas"],
      ["5. Cosecha", "85 a 95 dias", "Desgranado a mano. Secar a 12 a 14 % de humedad"]
    ],
    riesgos: [
      "Sequia en floracion es la principal causa de perdida",
      "Aves granivoras destruyen el cultivo recien sembrado",
      "Mosaico dorado: sin semilla sana no hay solucion",
      "Antracnosis puede destruir el cultivo en ciclo humedo"
    ],
    clave: "Aporta nitrogeno al suelo. Si lo siembras entre el maiz, mejora la tierra."
  },

  yuca: {
    altitud: "900 a 2.000 m. Optimo 1.200 a 1.700 m",
    clima: "22 a 30 grados C",
    suelo: "Tolera suelos pobres y acidos. Menos exigente que otros cultivos",
    densidad: "1,50 m entre surcos y 0,80 m entre plantas. 8.000 a 10.000 esquejes/ha",
    rendimiento: "15 a 25 t/ha de raiz fresca (potencial 30 a 40)",
    costos: "10 a 14 millones COP por hectarea",
    mercado: "Autoconsumo, procesadoras de almidon y snacks",
    fases: [
      ["0. Preparacion", "Semana -2 a 0", "Limpieza, trazada y abonos de fondo"],
      ["1. Brotacion", "0 a 45 dias", "Brota y sale la primera hoja"],
      ["2. Vegetativo", "45 a 300 dias", "Macollamiento. Nitrogeno temprano y potasio despues"],
      ["3. Engrosamiento", "300 a 420 dias", "La raiz tuberiza. Suspender el nitrogeno"],
      ["4. Cosecha", "420 a 540 dias", "Raiz de 25 a 40 cm. Dejar 15 cm de pedunculo"]
    ],
    riesgos: [
      "Muy susceptible a heladas. Una helada fuerte destruye la plantacion",
      "Encharcamiento en invierno causa pudricion",
      "La raiz se pudre en 3 a 5 dias si se golpea o se apila"
    ],
    clave: "Siembra el esqueje inclinado a 45 grados, con un tercio enterrado. Sirve para recuperar areas agotadas."
  },

  arroz: {
    altitud: "0 a 1.200 m",
    clima: "24 a 30 grados C. Bajo 15 grados no germina",
    suelo: "Arcilloso, pH 5,5 a 6,5, con lamina de agua de 5 a 7 cm",
    densidad: "110 a 130 kg de semilla por ha. Surcos de 0,20 a 0,25 m",
    rendimiento: "5,0 a 7,0 t/ha de paddy humedo (potencial 8 a 9)",
    costos: "12 a 16 millones COP por hectarea",
    mercado: "Comercializadoras de arroz e industria",
    fases: [
      ["0. Preparacion", "Semana -1", "Arado y nivelacion del suelo. La nivelacion es clave"],
      ["1. Siembra", "Semana 0", "Con lamina de agua de 3 a 4 cm"],
      ["2. Crecimiento", "0 a 45 dias", "Germinacion. Mantener la lamina"],
      ["3. Macollamiento", "45 a 70 dias", "Abono de nitrogeno a los 20 a 30 dias"],
      ["4. Embuchamiento", "70 a 110 dias", "Inicio de panicula. Drenar ligeramente"],
      ["5. Floracion y llenado", "110 a 150 dias", "Periodo critico. Lamina de 5 a 10 cm"],
      ["6. Cosecha", "175 a 190 dias", "Drenar 5 a 7 dias antes. Secar a 14 %"]
    ],
    riesgos: [
      "Falta de agua: si se corta el riego en floracion se pierde el cultivo",
      "Vaneador puede quitar hasta 30 % de la produccion",
      "Piricularia en anos humedos con exceso de nitrogeno",
      "Un suelo mal nivelado retiene agua de mas en unas zonas y nada en otras"
    ],
    clave: "La maleza principal es el arrozgrama, que ademas es hospedero del vaneador. Controlarlo temprano."
  },

  "cana-azucar": {
    altitud: "500 a 1.500 m",
    clima: "24 a 30 grados C",
    suelo: "Profundo, arcilloso-arenoso, pH 6,0 a 7,5",
    densidad: "2,5 m entre surcos y 1,4 m entre plantas. 10.000 a 12.000 trojes/ha",
    rendimiento: "90 a 120 t/ha al ano (potencial 140 a 170)",
    costos: "12 a 16 millones COP la siembra. 5 a 8 millones al ano en manejo",
    mercado: "Molienda. Zucar, panela y etanol",
    fases: [
      ["0. Preparacion", "Semana -4", "Arado doble, subsolado, abonos de fondo y revision del drenaje"],
      ["1. Brotacion", "0 a 45 dias", "Brote de la yema y aparicion de renacillos"],
      ["2. Desarrollo", "45 a 120 dias", "Macollamiento y desarrollo del follaje"],
      ["3. Entejado", "120 a 300 dias", "Se forma el tallo. Fase critica para el azucar"],
      ["4. Madurez", "300 a 420 dias", "Cortar a los 12 o 13 meses, antes de que florezca"],
      ["5. Retono", "5 a 7 dias despues", "Desojado del campo, abono N y K, brota de nuevo"]
    ],
    riesgos: [
      "Matanza o pudricion roja: la enfermedad mas grave de la cana",
      "Sequia en la fase de entejado",
      "Transporte: el azucar se pierde 1 a 3 % por dia de retraso a la molienda"
    ],
    clave: "El lote debe quedar cerca de la molienda. Cure el material de siembra para matar la Matanza."
  },

  tomate: {
    altitud: "800 a 2.200 m. Optimo 1.200 a 1.800 m",
    clima: "18 a 26 grados C. Arriba de 32 grados la flor no cuaja",
    suelo: "Franco, muy drenado, pH 6,0 a 6,8",
    densidad: "Mesa 1,10 x 0,50 m (1.800 plantas). Industria 2,0 x 0,60 m (33.000)",
    rendimiento: "Mesa 45 a 70 t/ha. Industria 8 a 10 t/ha",
    costos: "45 a 60 millones COP por hectarea en mesa con plasticultura",
    mercado: "Central de abastos, restaurantes, planta de salsa y pasta",
    fases: [
      ["0. Almacigo", "0 a 35 dias", "Semilla en bandeja. Control de tizones y acaros. Endurecer antes de trasplantar"],
      ["1. Trasplante", "35 dias", "Con el sistema de riego ya instalado"],
      ["2. Establishment", "35 a 55 dias", "Raiz y adaptacion. Control de maleza"],
      ["3. Vegetativo", "55 a 80 dias", "Amarrar guias, podar hojas bajas"],
      ["4. Floracion y cuaje", "80 a 100 dias", "Polinizacion con abejones o vibracion"],
      ["5. Llenado", "100 a 130 dias", "Abono de K y Ca. Riego constante"],
      ["6. Cosecha", "90 a 130 dias del trasplante", "8 a 12 cortes cada 5 a 8 dias"]
    ],
    riesgos: [
      "Tuta absoluta es la plaga critica en Colombia",
      "Virus del rilado amarillo (TYLCV). Lo transmite la mosca blanca",
      "Heladas en lotes altos",
      "Aguacero en cosecha puede quebrar la planta y pudrir el fruto",
      "Es uno de los cultivos mas caros: empieza con superficie pequena"
    ],
    clave: "En almacigo usa malla anti-insectos. Si colocas cobertura, no riegues por encima de las hojas."
  },

  cebolla: {
    altitud: "1.000 a 2.400 m. Optimo 1.400 a 2.000 m",
    clima: "15 a 22 grados C. Necesita dias largos al inicio del ciclo",
    suelo: "Franco arcilloso, drenado, pH 6,0 a 7,0",
    densidad: "0,30 m entre surcos y 0,10 m entre plantas. 4 a 6 kg de semilla/ha",
    rendimiento: "22 a 32 t/ha (potencial 38 a 45)",
    costos: "30 a 40 millones COP por hectarea",
    mercado: "Central de abastos, restaurantes y industria",
    fases: [
      ["0. Preparacion", "Semana -2", "Camas altas o surcos, abonos de fondo"],
      ["1. Siembra", "0 a 15 dias", "Profundidad de solo 1 a 1,5 cm, en suelo humedo"],
      ["2. Vegetativo", "15 a 60 dias", "5 a 6 hojas. Riego moderado y nitrogeno temprano"],
      ["3. Inicio de bulbo", "60 a 100 dias", "Suspender el nitrogeno y usar potasio"],
      ["4. Madurez", "100 a 130 dias", "El cuello se dobla y la piel se pone papery"],
      ["5. Cosecha", "130 a 160 dias", "Arrancar cuando 30 a 50 % de los tallos se doblan"]
    ],
    riesgos: [
      "Trips es la plaga mas importante. Empieza al aparecer en clima seco",
      "Podredumbre por Sclerotium: se transmite por semilla y suelo. Cambia de cultivo",
      "Peronospora destruye el cultivo en valle humedo",
      "El curado es el punto mas critico: si falla, se pierde el lote en bodega"
    ],
    clave: "Cura 2 a 3 semanas antes de almacenar. Guarda en la oscuridad, en un sitio ventilado y seco, sin follaje."
  },

  papa: {
    altitud: "1.800 a 3.000 m. Optimo 2.200 a 2.800 m",
    clima: "13 a 20 grados C. El cultivo mas sensible al calor",
    suelo: "Franco, muy drenado, pH 5,0 a 6,0",
    densidad: "0,75 m entre surcos y 0,30 m entre plantas. 1.500 a 2.500 kg de semilla/ha",
    rendimiento: "16 a 24 t/ha (potencial 30 a 38)",
    costos: "18 a 25 millones COP por hectarea",
    mercado: "Mercado local, papa lavada a mejor precio, industria y chips",
    fases: [
      ["0. Preparacion", "Semana -4", "Arado. Rotacion previa: nunca papa sobre papa"],
      ["1. Pregerminacion", "4 a 6 semanas antes", "Tuberculos en sitio fresco, luminoso y ventilado"],
      ["2. Siembra", "Semana 0", "Enterrar a 12 a 15 cm de profundidad"],
      ["3. Brotacion", "20 a 35 dias", "Brota y sale a superficie. Control de maleza temprano"],
      ["4. Vegetativo", "35 a 60 dias", "Aporca y abona"],
      ["5. Floracion y llenado", "60 a 100 dias", "Potasio y riego constante"],
      ["6. Madurez", "100 a 150 dias", "La piel se endurece. Suspender riego 10 dias antes"],
      ["7. Cosecha", "120 a 180 dias", "Arrancar en dias secos, nunca con lluvia"]
    ],
    riesgos: [
      "Heladas: una sola noche destruye todo el lote. Revisa el historial climatico antes de sembrar",
      "Nemato dorado: no hay rescate de un lote parasitado. Previene con semilla certificada y rotacion larga",
      "Tizon tardio es la enfermedad que mas lotes destruye",
      "Aves y roedores"
    ],
    clave: "Nunca use papa de consumo como semilla: transmite enfermedades. La papa lavada se vende rapido y a mejor precio; la de consumo aguanta mas mercado."
  }
};
