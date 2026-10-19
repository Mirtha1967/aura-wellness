// =====================================================================
// CONTENIDO DE EJEMPLO - Aura Wellness & Medical Spa (negocio ficticio)
// Todos los textos, precios, nombres y opiniones son PLACEHOLDERS.
// Sustitúyelos por los datos reales antes de publicar.
// =====================================================================

// ---- Medios (opcionales) --------------------------------------------
// Si dejas un valor vacío, la web muestra un diseño elegante de relleno.
// Puedes usar URLs completas o rutas de /public/images (ej. '/images/hero.jpg').
export const MEDIA = {
  hero: '',
  // ID de un vídeo de YouTube (lo que va después de "v=" en la URL). Vacío = reproductor simulado.
  videoYoutubeId: '',
}

// ---- Monedas (tipos de cambio ORIENTATIVOS: actualízalos tú) ---------
export const CURRENCIES = {
  EUR: { symbol: '€', rate: 1, locale: 'es-ES' },
  USD: { symbol: '$', rate: 1.08, locale: 'en-US' },
  GBP: { symbol: '£', rate: 0.86, locale: 'en-GB' },
}

// ---- Datos de contacto ----------------------------------------------
export const CONTACT_INFO = {
  address: 'Calle Ejemplo 123, 00000 Ciudad',
  phone: '+34 900 000 000',
  email: 'hola@aura-wellness.example',
  hours: [
    ['Lunes - Viernes', '09:30 - 20:30'],
    ['Sábado', '10:00 - 15:00'],
    ['Domingo', 'Cerrado'],
  ],
  socials: [
    { label: 'Instagram', href: '#' },
    { label: 'Facebook', href: '#' },
    { label: 'YouTube', href: '#' },
  ],
}

// ---- Estadísticas -----------------------------------------------------
export const STATS = [
  { value: 12, suffix: '+', label: 'Años de experiencia' },
  { value: 8500, suffix: '+', label: 'Clientes satisfechos' },
  { value: 45, suffix: '', label: 'Tratamientos exclusivos' },
  { value: 14, suffix: '', label: 'Profesionales certificados' },
]

// ---- Servicios --------------------------------------------------------
export const CATEGORIES = [
  { id: 'facial', es: 'Estética Facial', en: 'Facial Aesthetics' },
  { id: 'aparatologia', es: 'Aparatología Avanzada', en: 'Advanced Technology' },
  { id: 'spa', es: 'Masajes y Ritual Spa', en: 'Massage & Spa Ritual' },
]

export const SERVICES = [
  // Estética facial
  {
    id: 'hydrafacial-aura',
    category: 'facial',
    name: 'Limpieza Facial Profunda Aura',
    duration: 60,
    price: 75,
    description:
      'Protocolo de limpieza, exfoliación suave y extracción con hidratación final adaptada a tu tipo de piel.',
    benefits: ['Piel más luminosa', 'Poros visiblemente más limpios', 'Hidratación inmediata'],
  },
  {
    id: 'peeling-suave',
    category: 'facial',
    name: 'Peeling Renovador',
    duration: 45,
    price: 95,
    description:
      'Exfoliación química superficial para renovar la textura de la piel. Requiere valoración previa.',
    benefits: ['Mejora la textura', 'Unifica el aspecto del tono', 'Efecto luminoso'],
  },
  {
    id: 'facial-antiedad',
    category: 'facial',
    name: 'Ritual Facial Antiedad',
    duration: 75,
    price: 120,
    description:
      'Tratamiento con masaje facial, activos antioxidantes y mascarilla de acabado para una piel descansada.',
    benefits: ['Aspecto más firme y descansado', 'Masaje de drenaje facial', 'Activos antioxidantes'],
  },
  {
    id: 'facial-hidratacion',
    category: 'facial',
    name: 'Hidratación Intensiva',
    duration: 50,
    price: 70,
    description: 'Aporte de agua y nutrientes para pieles secas, deshidratadas o sensibles.',
    benefits: ['Confort inmediato', 'Piel flexible y suave', 'Apto para pieles sensibles'],
  },
  // Aparatología avanzada
  {
    id: 'radiofrecuencia',
    category: 'aparatologia',
    name: 'Radiofrecuencia Facial',
    duration: 50,
    price: 110,
    description:
      'Aparatología de calor controlado orientada a mejorar la apariencia de firmeza de la piel. Valoración previa obligatoria.',
    benefits: ['Sin tiempo de recuperación', 'Sesiones cómodas', 'Pauta personalizada'],
  },
  {
    id: 'microneedling',
    category: 'aparatologia',
    name: 'Microneedling con Activos',
    duration: 60,
    price: 140,
    description:
      'Técnica de microperforaciones superficiales combinada con activos. Realizada por personal cualificado tras valoración.',
    benefits: ['Mejora la textura', 'Potencia la absorción de activos', 'Pauta en varias sesiones'],
  },
  {
    id: 'presoterapia',
    category: 'aparatologia',
    name: 'Presoterapia Corporal',
    duration: 40,
    price: 50,
    description: 'Compresión secuencial en piernas para una agradable sensación de ligereza.',
    benefits: ['Sensación de piernas ligeras', 'Relajante', 'Complemento ideal de masajes'],
  },
  {
    id: 'criolipolisis-ligera',
    category: 'aparatologia',
    name: 'Tratamiento Corporal Reductor',
    duration: 60,
    price: 130,
    description:
      'Programa corporal con aparatología para trabajar zonas concretas, siempre con valoración y hábitos saludables.',
    benefits: ['Diagnóstico corporal previo', 'Plan por sesiones', 'Seguimiento incluido'],
  },
  // Masajes y ritual spa
  {
    id: 'masaje-relajante',
    category: 'spa',
    name: 'Masaje Relajante Aura',
    duration: 60,
    price: 65,
    description: 'Masaje de cuerpo completo con aceites aromáticos y maniobras suaves para desconectar.',
    benefits: ['Reduce la sensación de tensión', 'Aromaterapia', 'Descanso profundo'],
  },
  {
    id: 'masaje-piedras',
    category: 'spa',
    name: 'Masaje con Piedras Calientes',
    duration: 75,
    price: 85,
    description: 'Combinación de masaje y piedras calientes para una relajación muscular profunda.',
    benefits: ['Calor envolvente', 'Alivio de la sensación de rigidez', 'Experiencia sensorial'],
  },
  {
    id: 'ritual-aguas',
    category: 'spa',
    name: 'Ritual de Aguas y Descanso',
    duration: 90,
    price: 60,
    description: 'Circuito de aguas con tiempos de contraste y zona de descanso con infusiones.',
    benefits: ['Circuito de contraste', 'Zona de relax', 'Infusiones incluidas'],
  },
  {
    id: 'ritual-pareja',
    category: 'spa',
    name: 'Ritual Spa en Pareja',
    duration: 120,
    price: 220,
    description: 'Suite privada con circuito de aguas, masaje en cabina doble y momento gourmet.',
    benefits: ['Suite privada', 'Masaje simultáneo', 'Detalle de bienvenida'],
  },
]

// ---- Bonos y fidelización ----------------------------------------------
export const BONOS = [
  {
    id: 'essential',
    name: 'Bono Essential',
    sessions: 4,
    price: 260,
    perks: ['4 sesiones a elegir (faciales o masaje 60 min)', 'Validez 3 meses', 'Cambio de cita sin coste'],
  },
  {
    id: 'signature',
    name: 'Bono Signature',
    sessions: 8,
    price: 480,
    featured: true,
    perks: ['8 sesiones a elegir', 'Validez 6 meses', 'Acceso al circuito de aguas 1 vez/mes', 'Valoración de piel gratuita'],
  },
  {
    id: 'prestige',
    name: 'Bono Prestige',
    sessions: 12,
    price: 690,
    perks: ['12 sesiones a elegir', 'Validez 9 meses', 'Circuito de aguas 2 veces/mes', 'Prioridad de reserva'],
  },
]

export const LOYALTY = {
  discountPercent: 10,
  fromVisit: 5,
}

// ---- Galería -----------------------------------------------------------
export const GALLERY_ZONES = [
  { id: 'recepcion', es: 'Recepción', en: 'Reception' },
  { id: 'cabinas', es: 'Cabinas', en: 'Treatment rooms' },
  { id: 'aguas', es: 'Zona de Aguas', en: 'Water area' },
  { id: 'vip', es: 'Suites VIP', en: 'VIP suites' },
]

// image: '' → relleno elegante. Pon aquí tus fotos reales (/images/xxx.jpg).
export const GALLERY = [
  { id: 1, zone: 'recepcion', title: 'Recepción y lounge de bienvenida', image: '' },
  { id: 2, zone: 'recepcion', title: 'Rincón de infusiones', image: '' },
  { id: 3, zone: 'cabinas', title: 'Cabina de tratamiento facial', image: '' },
  { id: 4, zone: 'cabinas', title: 'Cabina de masaje', image: '' },
  { id: 5, zone: 'cabinas', title: 'Sala de aparatología', image: '' },
  { id: 6, zone: 'aguas', title: 'Piscina de contraste', image: '' },
  { id: 7, zone: 'aguas', title: 'Sauna y zona de vapor', image: '' },
  { id: 8, zone: 'vip', title: 'Suite VIP para parejas', image: '' },
  { id: 9, zone: 'vip', title: 'Suite VIP con jacuzzi privado', image: '' },
]

// ---- Antes y después ---------------------------------------------------
// before / after: URLs de imagen reales (con consentimiento escrito del cliente).
export const RESULTS = [
  { id: 'luminosidad', es: 'Luminosidad facial', en: 'Facial radiance', before: '', after: '' },
  { id: 'textura', es: 'Textura de la piel', en: 'Skin texture', before: '', after: '' },
]

// ---- Equipo ------------------------------------------------------------
export const TEAM = [
  {
    id: 'elena',
    name: 'Dra. Elena Marín',
    role: 'Directora médica',
    specialty: 'Medicina estética',
    bio: 'Más de 15 años de experiencia en medicina estética. Diseña cada pauta tras una valoración personalizada.',
    photo: '',
  },
  {
    id: 'lucia',
    name: 'Lucía Ferrer',
    role: 'Esteticista senior',
    specialty: 'Estética facial',
    bio: 'Especialista en protocolos faciales y cuidado de pieles sensibles. Formación continua en cosmética avanzada.',
    photo: '',
  },
  {
    id: 'marcos',
    name: 'Marcos Valls',
    role: 'Técnico en aparatología',
    specialty: 'Aparatología avanzada',
    bio: 'Responsable de la sala de aparatología. Trabaja con planes por sesiones y seguimiento de resultados.',
    photo: '',
  },
  {
    id: 'irene',
    name: 'Irene Solano',
    role: 'Terapeuta spa',
    specialty: 'Masajes y rituales',
    bio: 'Terapeuta con formación en masaje relajante, piedras calientes y rituales de bienestar.',
    photo: '',
  },
]

// ---- Testimonios (FICTICIOS: sustitúyelos por opiniones reales) -----------
export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Marta G.',
    treatment: 'Limpieza Facial Profunda',
    rating: 5,
    text: 'Un trato exquisito desde que entras. Salí con la piel descansada y el espacio es una maravilla.',
    photo: '',
  },
  {
    id: 2,
    name: 'Carlos R.',
    treatment: 'Masaje con Piedras Calientes',
    rating: 5,
    text: 'Necesitaba desconectar y lo conseguí. Muy profesionales y todo impecable.',
    photo: '',
  },
  {
    id: 3,
    name: 'Sofía L.',
    treatment: 'Ritual Spa en Pareja',
    rating: 5,
    text: 'Fuimos a celebrar nuestro aniversario y fue perfecto: privacidad, calma y atención al detalle.',
    photo: '',
  },
  {
    id: 4,
    name: 'Andrea P.',
    treatment: 'Radiofrecuencia Facial',
    rating: 4,
    text: 'Me explicaron todo con claridad antes de empezar y el seguimiento posterior fue muy cercano.',
    photo: '',
  },
]

// ---- FAQ -----------------------------------------------------------------
export const FAQS = [
  {
    q: '¿Cómo debo prepararme para mi tratamiento?',
    a: 'Acude sin maquillaje si es un tratamiento facial, evita la exposición solar intensa 48 horas antes y comunícanos alergias, medicación o embarazo en la valoración previa. Si tienes dudas sobre un tratamiento concreto, te lo indicamos al reservar.',
  },
  {
    q: '¿Qué política de cancelación tenéis?',
    a: 'Puedes cancelar o cambiar tu cita sin coste hasta 24 horas antes. Pasado ese plazo, o en caso de no presentarse, podremos cobrar un porcentaje del servicio reservado.',
  },
  {
    q: '¿Es necesaria una valoración previa?',
    a: 'Para la aparatología avanzada y los peelings sí: un profesional valora tu piel y tu historial antes de recomendar la pauta. Para masajes y rituales spa no es necesaria.',
  },
  {
    q: '¿Puedo acudir si estoy embarazada o en periodo de lactancia?',
    a: 'Algunos tratamientos no están indicados en embarazo o lactancia. Indícalo al reservar y te propondremos alternativas adecuadas.',
  },
  {
    q: '¿Cómo funcionan los bonos?',
    a: 'Los bonos incluyen un número de sesiones a elegir entre los tratamientos indicados y tienen un periodo de validez. Son personales e intransferibles, salvo que se indique lo contrario.',
  },
  {
    q: '¿Qué medidas de higiene seguís?',
    a: 'Utilizamos material desechable o esterilizado, desinfectamos las cabinas entre cada cliente y seguimos la normativa sanitaria vigente aplicable a nuestra actividad.',
  },
]
