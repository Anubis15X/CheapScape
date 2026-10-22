/* Diccionario español → inglés (ver js/i18n.js). La clave es el texto
   en español tal cual sale en la página (espacios seguidos cuentan como
   uno). Si el valor lleva enlaces o negritas, va con su HTML, y debe
   conservar los mismos id y href que el original.

   Si cambias un texto en español en el HTML o en un JS, cambia también
   su clave aquí; si no, en inglés saldrá en español. */

const TEXTOS_EN = {
  // ---------- Común: cabecera, pie, menús ----------
  "Explorar": "Explore",
  "Cómo funciona": "How it works",
  "Top Chollos": "Top Deals",
  "Quién somos": "About us",
  "Iniciar sesión": "Sign in",
  "Mi cuenta": "My account",
  "Abrir menú": "Open menu",
  "Cerrar menú": "Close menu",
  "Cerrar": "Close",
  "Tu viaje (vuelo + alojamiento), resuelto en un clic.": "Your trip (flight + stay), sorted in one click.",
  "Explora": "Explore",
  "Legal": "Legal",
  "Aviso legal": "Legal notice",
  "Política de privacidad": "Privacy policy",
  "Política de cookies": "Cookie policy",
  "Términos y condiciones": "Terms and conditions",
  "Contacto": "Contact",
  "© 2026 CheapScape. Todos los derechos reservados.": "© 2026 CheapScape. All rights reserved.",
  "Proyecto en fase de desarrollo — los precios y destinos mostrados son de ejemplo.": "Project in development — prices and destinations shown are examples.",

  // ---------- Portada ----------
  "CheapScape — Tu viaje, resuelto en un clic": "CheapScape — Your trip, sorted in one click",
  "Dinos tu presupuesto y te damos un Top 3 de viajes (vuelo + alojamiento), del finde a la semana entera, con precio total cerrado, sin comparar cien pestañas.":
    "Tell us your budget and we give you a Top 3 of trips (flight + stay), from a weekend to a whole week, with a fixed total price and no comparing a hundred tabs.",
  "Escápatesin arruinarte": "Get away<br>without going broke",
  "Dinos cuánto tienes, te decimos a dónde vas. Un finde, una semana o lo que te apetezca: vuelo + alojamiento, resuelto en un clic.":
    "Tell us how much you've got, we'll tell you where you're going. A weekend, a week or whatever you fancy: flight + stay, sorted in one click.",
  "Origen": "From",
  "Salida": "Departure",
  "Vuelta": "Return",
  "Presupuesto máx.": "Max. budget",
  "Elige ciudad": "Choose city",
  "Ej. 200": "E.g. 200",
  "Buscar": "Search",
  "Me vale dormir en habitación compartida (hostel), sale más barato": "I'm fine with a shared room (hostel), it's cheaper",
  "Sin filtros infinitos. Solo tu Top 3.": "No endless filters. Just your Top 3.",
  "Así de fácil": "That easy",
  "Cómo funciona CheapScape": "How CheapScape works",
  "Tres pasos y listo. Sin comparar cien pestañas ni perderte en filtros que no entiendes.":
    "Three steps and you're done. No comparing a hundred tabs or getting lost in filters you don't understand.",
  "PASO 1": "STEP 1",
  "PASO 2": "STEP 2",
  "PASO 3": "STEP 3",
  "Dinos tu presupuesto": "Tell us your budget",
  "Elige si sales de Madrid o Barcelona, una fecha de salida y otra de vuelta, y el máximo que quieres gastarte. Nada más.":
    "Choose whether you leave from Madrid or Barcelona, a departure date and a return date, and the most you want to spend. That's it.",
  "Recibe tu Top 3": "Get your Top 3",
  "El más barato, el mejor valorado y el más exótico. Vuelo/bus + hotel, precio total y ya.":
    "The cheapest, the best rated and the most exotic. Flight/bus + hotel, total price, done.",
  "Regístrate y reserva": "Sign up and book",
  "Crea tu cuenta gratis para ver el hotel exacto y los horarios, y reserva en el proveedor final.":
    "Create your free account to see the exact hotel and times, and book with the final provider.",
  "Ver todos los detalles →": "See all the details →",
  "Nuestros destinos": "Our destinations",
  "A dónde puedes escaparte": "Where you can get away to",
  "Un adelanto de los 15 destinos entre los que buscamos tu viaje: baratos, clásicos y exóticos.":
    "A preview of the 15 destinations we search for your trip: cheap, classic and exotic.",
  "💸 Baratos": "💸 Cheap",
  "⭐ Calidad-precio": "⭐ Best value",
  "🧭 Exóticos": "🧭 Exotic",
  "Precio por revisar": "Price under review",
  "Ver los 15 destinos →": "See all 15 destinations →",
  "La diferencia": "The difference",
  "Por qué CheapScape y no otro buscador": "Why CheapScape and not another search engine",
  "🎯 Cero sobrecarga": "🎯 Zero overload",
  "Nada de 200 resultados y 40 filtros. Solo 3 opciones, ya filtradas por nosotros.": "No 200 results and 40 filters. Just 3 options, already filtered by us.",
  "💶 Precio total, sin sorpresas": "💶 Total price, no surprises",
  "Vuelo/bus + hotel sumados desde el principio. Lo que ves es lo que pagas.": "Flight/bus + hotel added up from the start. What you see is what you pay.",
  "🗣️ Lenguaje humano": "🗣️ Human language",
  "Nada de jerga de agencia de viajes. Hablamos como hablarías con un colega.": "No travel agency jargon. We talk the way you'd talk to a friend.",
  "🔒 Reserva donde confías": "🔒 Book where you trust",
  "Te llevamos directo al proveedor final (hotel, aerolínea, etc.) para que reserves con quien quieras.":
    "We take you straight to the final provider (hotel, airline, etc.) so you book with whoever you want.",
  "¿Listo para tu próximo viaje?": "Ready for your next trip?",
  "Vuelve arriba, pon tu presupuesto y deja que el Top 3 haga el resto.": "Head back up, enter your budget and let the Top 3 do the rest.",
  "Buscar mi viaje": "Find my trip",

  // ---------- Destinos y países ----------
  "Budapest": "Budapest",
  "Praga": "Prague",
  "Varsovia": "Warsaw",
  "Atenas": "Athens",
  "Bratislava": "Bratislava",
  "Roma": "Rome",
  "París": "Paris",
  "Ámsterdam": "Amsterdam",
  "Berlín": "Berlin",
  "Viena": "Vienna",
  "Skopie": "Skopje",
  "Belgrado": "Belgrade",
  "Reikiavik": "Reykjavik",
  "Oslo": "Oslo",
  "Zúrich": "Zurich",
  "Hungría": "Hungary",
  "Chequia": "Czechia",
  "Polonia": "Poland",
  "Grecia": "Greece",
  "Eslovaquia": "Slovakia",
  "Italia": "Italy",
  "Francia": "France",
  "Países Bajos": "Netherlands",
  "Alemania": "Germany",
  "Austria": "Austria",
  "Macedonia del Norte": "North Macedonia",
  "Serbia": "Serbia",
  "Islandia": "Iceland",
  "Noruega": "Norway",
  "Suiza": "Switzerland",

  // ---------- Cómo funciona ----------
  "Cómo funciona — CheapScape": "How it works — CheapScape",
  "Cómo funciona CheapScape: pones tu presupuesto, recibes un Top 3 de viajes y te registras solo si quieres ver el hotel exacto y los horarios.":
    "How CheapScape works: you enter your budget, get a Top 3 of trips and only sign up if you want to see the exact hotel and times.",
  "De tu presupuesto a tu maleta": "From your budget to your suitcase",
  "Nada de comparar cien pestañas ni perderte en filtros que no entiendes. Tú pones el dinero que tienes, nosotros hacemos el resto.":
    "No comparing a hundred tabs or getting lost in filters you don't understand. You bring the money you have, we do the rest.",
  "Elige si sales de Madrid o Barcelona, una fecha de salida y otra de vuelta, y el máximo que quieres gastarte en el viaje (vuelo o bus + hotel, todo incluido). Nada de registrarte antes de ver nada.":
    "Choose whether you leave from Madrid or Barcelona, a departure date and a return date, and the most you want to spend on the trip (flight or bus + hotel, all included). No signing up before you've seen anything.",
  "En segundos te mostramos tres opciones ya filtradas: el más barato, el mejor valorado y el más exótico. Precio total cerrado, sin sorpresas al final del proceso.":
    "In seconds we show you three options, already filtered: the cheapest, the best rated and the most exotic. A fixed total price, no surprises at the end.",
  "Cuando ves un plan que te convence, creas una cuenta gratis en segundos para desbloquear el hotel exacto y los horarios, y te llevamos directo al proveedor final para que reserves.":
    "When you see a plan you like, you create a free account in seconds to unlock the exact hotel and times, and we take you straight to the final provider to book.",
  "Transparencia": "Transparency",
  "¿Por qué pedimos una cuenta?": "Why do we ask for an account?",
  "Te enseñamos el precio total y el Top 3 sin pedirte nada. Solo te pedimos registrarte justo antes del último paso, cuando ya sabes que el plan te interesa.":
    "We show you the total price and the Top 3 without asking for anything. We only ask you to sign up right before the last step, once you know you like the plan.",
  "🔓 Ves el precio antes de registrarte": "🔓 You see the price before signing up",
  "El Top 3 completo, con precio total y % de ahorro, se ve sin cuenta ni tarjeta.": "The full Top 3, with total price and % saved, is visible with no account and no card.",
  "🏨 El hotel exacto se desbloquea después": "🏨 The exact hotel is unlocked afterwards",
  "Dirección, horarios de vuelo/bus y nombre del hotel aparecen al crear tu cuenta gratis.": "Address, flight/bus times and the hotel's name appear when you create your free account.",
  "⚡ Registro en segundos": "⚡ Sign up in seconds",
  "Con Google o solo tu email. Sin formularios eternos ni confirmaciones por SMS.": "With Google or just your email. No endless forms or SMS confirmations.",
  "🔒 Reservas donde confías": "🔒 You book where you trust",
  "No gestionamos tu pago: te llevamos al proveedor final (hotel, aerolínea...) y reservas con quien quieras.":
    "We don't handle your payment: we take you to the final provider (hotel, airline...) and you book with whoever you want.",
  "¿Listo para probarlo?": "Ready to try it?",
  "Pon tu presupuesto y deja que el Top 3 haga el resto.": "Enter your budget and let the Top 3 do the rest.",

  // ---------- Top Chollos ----------
  "Top Chollos — CheapScape": "Top Deals — CheapScape",
  "Los 15 destinos de viaje de CheapScape, filtrables por baratos, calidad-precio y exóticos.": "CheapScape's 15 travel destinations, filterable by cheap, best value and exotic.",
  "Los 15 destinos de CheapScape": "CheapScape's 15 destinations",
  "Las ciudades entre las que buscamos tu viaje. Filtra por el tipo de viaje que te apetece.": "The cities we search for your trip. Filter by the kind of trip you fancy.",
  "Todos": "All",
  "Precios pendientes de revisar a mano antes del lanzamiento.": "Prices to be checked by hand before launch.",
  "¿Ves algo que te gusta?": "See something you like?",
  "Pon tu presupuesto y mira si te sale aún mejor.": "Enter your budget and see if it works out even better.",

  // ---------- Quién somos ----------
  "Quién somos — CheapScape": "About us — CheapScape",
  "Quién hay detrás de CheapScape: un proyecto personal para encontrar viajes baratos sin perder horas comparando vuelos y hoteles por separado.":
    "Who's behind CheapScape: a personal project to find cheap trips without spending hours comparing flights and hotels separately.",
  "Quién hay detrás": "Who's behind it",
  "Hola, soy Jose": "Hi, I'm Jose",
  "Soy técnico de sistemas (Técnico Superior en ASIR) de León, con la cabeza puesta en Linux, Docker, Nginx y todo lo que tenga que ver con infraestructura. Ahora mismo estoy en el programa Experience Plus de IA, formándome en consultoría e implementación de inteligencia artificial.":
    "I'm a systems technician (Higher Technician in ASIR, network systems administration) from León, Spain, focused on Linux, Docker, Nginx and everything to do with infrastructure. Right now I'm in the Experience Plus AI programme, training in artificial intelligence consulting and implementation.",
  "CheapScape es mi manera de salir de mi zona de confort: hasta ahora mi mundo era más de servidor y terminal que de interfaz y experiencia de usuario, así que este proyecto es a la vez mi pieza de portafolio y mi excusa para aprender a construir un producto de principio a fin, no solo la infraestructura que hay detrás.":
    "CheapScape is my way of stepping out of my comfort zone: until now my world was more servers and terminals than interfaces and user experience, so this project is both my portfolio piece and my excuse to learn how to build a product from start to finish, not just the infrastructure behind it.",
  "La idea nació de una frustración muy simple: cada vez que quería escaparme un fin de semana acababa con quince pestañas abiertas comparando vuelos y hoteles por separado. CheapScape es la herramienta que me habría gustado tener: tú pones el presupuesto, nosotros encontramos las opciones.":
    "The idea came from a very simple frustration: every time I wanted a weekend away I ended up with fifteen tabs open comparing flights and hotels separately. CheapScape is the tool I wish I'd had: you set the budget, we find the options.",
  "Algunos datos rápidos": "A few quick facts",
  "— De León, España — Técnico Superior en ASIR (Administración de Sistemas Informáticos en Red) — Formándome en Experience Plus de IA (consultoría e implementación de IA) — Base técnica en Linux, Docker, Nginx, monitorización (Prometheus/Grafana) y RAG — Prácticas previas en PrestaShop (Gran Velada, Bratislava) y administración de bases de datos (Desecom, León) — CheapScape es mi primer proyecto construyendo un producto completo, de cero":
    "— From León, Spain<br>— Higher Technician in ASIR (Network Computer Systems Administration)<br>— Training in the Experience Plus AI programme (AI consulting and implementation)<br>— Technical background in Linux, Docker, Nginx, monitoring (Prometheus/Grafana) and RAG<br>— Previous internships in PrestaShop (Gran Velada, Bratislava) and database administration (Desecom, León)<br>— CheapScape is my first project building a complete product, from scratch",
  "¿Tienes feedback o quieres colaborar?": "Got feedback or want to collaborate?",
  "Escríbeme, el proyecto está vivo y cambia cada semana.": "Drop me a line, the project is alive and changes every week.",
  "Escríbeme": "Write to me",

  // ---------- Resultados ----------
  "Tu Top 3 — CheapScape": "Your Top 3 — CheapScape",
  "Tu Top 3 de viajes según tu presupuesto: el más barato, el mejor valorado y el más exótico.": "Your Top 3 trips for your budget: the cheapest, the best rated and the most exotic.",
  "Tu Top 3": "Your Top 3",
  "Falta tu búsqueda. Vuelve a la portada para indicar origen y presupuesto.": "Your search is missing. Go back to the home page to enter your origin and budget.",
  "Volver al buscador": "Back to search",
  "← Nueva búsqueda": "← New search",
  "Con no llegamos a ningún destino de nuestra base ahora mismo. Prueba a subir el presupuesto.":
    "With <strong id=\"sin-resultados-presupuesto\"></strong> we can't reach any destination in our list right now. Try raising your budget<span id=\"sin-resultados-minimo\"></span>.",
  "Probar con otro presupuesto": "Try another budget",
  "Volver a intentarlo": "Try again",
  "¡Casi lo tienes!": "Almost there!",
  "Descubre el hotel exacto y los horarios de tu vuelo a con tu cuenta gratis.":
    "Find out the exact hotel and your flight times to <strong id=\"modal-destino\"></strong> with your free account.",
  "Los precios mostrados son estimados y dependen del proveedor final.": "Prices shown are estimates and depend on the final provider.",

  // ---------- Cuenta: login y modal ----------
  "Iniciar sesión — CheapScape": "Sign in — CheapScape",
  "Inicia sesión o crea tu cuenta gratis en CheapScape.": "Sign in or create your free CheapScape account.",
  "Tu cuenta gratis": "Your free account",
  "Entrar o crear cuenta": "Sign in or create account",
  "Entrar": "Sign in",
  "Crear cuenta": "Create account",
  "Ya tengo cuenta": "I have an account",
  "Continuar con Google": "Continue with Google",
  "Si es tu primera vez con Google, se crea tu cuenta y aceptas la política de privacidad y los términos.":
    "If it's your first time with Google, your account is created and you accept the <a href=\"privacidad.html\" target=\"_blank\">privacy policy</a> and the <a href=\"terminos.html\" target=\"_blank\">terms</a>.",
  "o": "<span class=\"line\"></span>or<span class=\"line\"></span>",
  "Email": "Email",
  "Contraseña": "Password",
  "Repite la contraseña": "Repeat password",
  "tu@email.com": "you@email.com",
  "Mínimo 6 caracteres": "At least 6 characters",
  "La misma otra vez": "The same again",
  "Contraseña (mín. 6 caracteres)": "Password (min. 6 characters)",
  "He leído la política de privacidad y acepto los términos y condiciones":
    "I have read the <a href=\"privacidad.html\" target=\"_blank\">privacy policy</a> and accept the <a href=\"terminos.html\" target=\"_blank\">terms and conditions</a>",

  // ---------- Detalle del viaje ----------
  "Tu viaje — CheapScape": "Your trip — CheapScape",
  "El detalle completo de tu viaje: horarios de ida y vuelta, alojamiento y precio total.": "The full details of your trip: outbound and return times, stay and total price.",
  "Necesitas una cuenta para ver este viaje. Vuelve al Top 3 y regístrate para desbloquearlo.": "You need an account to see this trip. Go back to the Top 3 and sign up to unlock it.",
  "Volver a resultados": "Back to results",
  "Cargando tu itinerario…": "Loading your itinerary…",
  "← Volver al Top 3": "← Back to the Top 3",
  "Estos son los horarios y tu alojamiento.": "These are your times and your stay.",
  "Itinerario": "Itinerary",
  "Del aeropuerto a la ciudad (ida y vuelta)": "From the airport to the city (return)",
  "Estancia": "Stay",
  "Alojamiento": "Accommodation",
  "Precio total estimado": "Estimated total price",
  "Reservar vuelo/bus": "Book flight/bus",
  "Reservar hotel": "Book hotel",
  "⬇ Descargar itinerario en PDF": "⬇ Download itinerary as PDF",

  // ---------- Mi cuenta ----------
  "Mi cuenta — CheapScape": "My account — CheapScape",
  "Tu cuenta en CheapScape.": "Your CheapScape account.",
  "Tu cuenta": "Your account",
  "Hola de nuevo": "Welcome back",
  "Sesión iniciada como": "Signed in as",
  "Entras con": "You sign in with",
  "Cuenta creada": "Account created",
  "Panel de administración": "Admin panel",
  "Cerrar sesión": "Sign out",
  "Qué te da tu cuenta": "What your account gives you",
  "Ver el detalle completo de cada viaje del Top 3: vuelos con horarios, alojamiento exacto y cómo ir del aeropuerto al centro.":
    "See the <strong>full details</strong> of each Top 3 trip: flights with times, the exact accommodation and how to get from the airport to the centre.",
  "Descargar el itinerario en PDF.": "Download the <strong>itinerary as a PDF</strong>.",
  "Ir directo a reservar en cada web, con las fechas ya puestas.": "Go straight to booking on each site, with the dates already filled in.",
  "Buscar un viaje": "Find a trip",
  "Tus datos": "Your data",
  "Solo guardamos tu email y la fecha de alta. No guardamos tus búsquedas. Si quieres borrar tu cuenta, escríbenos a hola@cheapscape.com desde este mismo email. Más info en la política de privacidad.":
    "We only store your email and sign-up date. We don't store your searches. If you want to delete your account, write to us at <a href=\"mailto:hola@cheapscape.com\">hola@cheapscape.com</a> from this same email. More info in the <a href=\"privacidad.html\">privacy policy</a>.",

  // ---------- Panel admin ----------
  "Panel de administración — CheapScape": "Admin panel — CheapScape",
  "Panel de administración de CheapScape (demo).": "CheapScape admin panel (demo).",
  "Solo administradores": "Admins only",
  "Panel de control": "Control panel",
  "Datos reales de Supabase. Lo que guardes aquí se usa al momento en la web.": "Live data from Supabase. Whatever you save here is used on the site straight away.",
  "Usuarios": "Users",
  "Entran con Google": "Sign in with Google",
  "Altas últimos 7 días": "Sign-ups, last 7 days",
  "Destinos": "Destinations",
  "↻ Refrescar": "↻ Refresh",
  "Entra con": "Signs in with",
  "Alta": "Joined",
  "Último acceso": "Last sign-in",
  "Rol": "Role",
  "Estado": "Status",
  "Acciones": "Actions",
  "Precios de los destinos": "Destination prices",
  "Precios por persona, en euros. El alojamiento es el precio de 2 noches: la web lo pasa a precio por noche y lo multiplica por las noches del viaje. Deja un campo vacío si no hay dato (ese destino no saldrá desde ese origen).":
    "Prices per person, in euros. Accommodation is the price for 2 nights: the site turns it into a price per night and multiplies it by the trip's nights. Leave a field empty if there's no data (that destination won't show up from that origin).",
  "Cargando...": "Loading...",
  "← Volver a Mi cuenta": "← Back to My account",
  "¿Seguro?": "Are you sure?",
  "Sí, hazlo": "Yes, do it",
  "Cancelar": "Cancel",

  // ---------- Textos que pintan los JS ----------
  // Portada y buscador
  "Vídeo": "Video",
  "Estimación orientativa: vuelos con precios de referencia del 13 al 15 de noviembre y alojamiento según su precio por noche, revisados el {fecha}. No es una oferta: el precio final lo pone cada proveedor. Los enlaces de reserva pueden ser comerciales.":
    "Rough estimate: flights at reference prices for 13 to 15 November and accommodation at its price per night, checked on {fecha}. This is not an offer: each provider sets the final price. Booking links may be commercial.",
  "Dinos desde dónde viajas.": "Tell us where you're travelling from.",
  "Elige una fecha de salida.": "Choose a departure date.",
  "La fecha de salida no puede ser anterior a hoy.": "The departure date can't be before today.",
  "Elige una fecha de vuelta.": "Choose a return date.",
  "La vuelta tiene que ser al menos un día después de la salida.": "The return has to be at least one day after departure.",
  "El presupuesto tiene que ser mayor que 0€.": "The budget has to be more than €0.",
  "Precio de ejemplo, ida y vuelta desde Madrid": "Example price, return from Madrid",

  // Resultados
  "El más barato": "The cheapest",
  "El mejor valorado": "The best rated",
  "El más exótico": "The most exotic",
  "Vuelo directo": "Direct flight",
  "Hostel compartido": "Shared hostel",
  "Habitación privada": "Private room",
  "Ahorras un {pct}% vs la media": "You save {pct}% vs the average",
  "Total estimado desde {origen} · {noches} noches": "Estimated total from {origen} · {noches} nights",
  "Ver detalles": "See details",
  "Fechas por elegir": "Dates to be chosen",
  "Buscando tu Top 3...": "Finding your Top 3...",
  ": el viaje más barato desde {origen} sale por {precio}€": ": the cheapest trip from {origen} costs €{precio}",
  // Va pegado a la frase anterior: la clave no lleva el espacio inicial
  // (se recorta al buscar), pero la traducción sí.
  "(o menos si te vale dormir en habitación compartida)": " (or less if you're fine with a shared room)",
  "Tu Top {n} desde {origen}": "Your Top {n} from {origen}",
  "Presupuesto máximo: {presupuesto}€": "Max. budget: €{presupuesto}",
  "De momento solo buscamos viajes desde Madrid o Barcelona.": "For now we only search trips from Madrid or Barcelona.",
  "No se pudo cargar el detalle.": "The details couldn't be loaded.",
  "No se pudo contactar con el servidor.": "Couldn't reach the server.",

  // Detalle del viaje
  "Tu viaje a {destino}": "Your trip to {destino}",
  "Desde {origen}": "From {origen}",
  "Estos son los horarios y tu alojamiento ({fechas}).": "These are your times and your stay ({fechas}).",
  "Vuelo": "Flight",
  "{tipo} de ida": "Outbound flight",
  "{tipo} de vuelta": "Return flight",
  "{medio} ({operador}) hasta {llegada}": "{medio} ({operador}) to {llegada}",
  "gratis": "free",
  "{noches} noches en {destino}": "{noches} nights in {destino}",
  "Cama en {tipo} de {personas} personas": "Bed in a {personas}-person {tipo}",
  "Cama en {tipo} compartido": "Bed in a shared {tipo}",
  "nota": "rating",
  "Reservar vuelo ({precio}€)": "Book flight (€{precio})",
  "Reservar alojamiento ({precio}€)": "Book accommodation (€{precio})",

  // PDF
  "ITINERARIO DE VIAJE": "TRAVEL ITINERARY",
  "Ref.": "Ref.",
  "Emitido el {fecha}": "Issued on {fecha}",
  "EL MÁS BARATO": "THE CHEAPEST",
  "EL MÁS EXÓTICO": "THE MOST EXOTIC",
  "EL MEJOR VALORADO": "THE BEST RATED",
  "TOTAL ESTIMADO": "ESTIMATED TOTAL",
  "por persona · {noches} noches": "per person · {noches} nights",
  "Vuelo de ida": "Outbound flight",
  "Del aeropuerto a la ciudad": "From the airport to the city",
  "llega a {aeropuerto}": "arrives at {aeropuerto}",
  "ida y vuelta": "return",
  "Billetes": "Tickets",
  "{noches} noches": "{noches} nights",
  "Vuelo de vuelta": "Return flight",
  "Atención": "Note",
  "Nota": "Rating",
  "Desglose por persona": "Breakdown per person",
  "Vuelo ida y vuelta": "Return flight",
  "Traslado aeropuerto (i/v)": "Airport transfer (return)",
  "Alojamiento ({noches} noches)": "Accommodation ({noches} nights)",
  "Total estimado": "Estimated total",
  "Dónde reservar": "Where to book",
  "Buscar en Google Flights": "Search on Google Flights",
  "Buscar {nombre} en Booking": "Search {nombre} on Booking",
  "Estimación orientativa con precios de referencia revisados el {fecha}. No es una oferta ni una reserva: el precio final y la disponibilidad los pone cada proveedor. Los enlaces de reserva pueden ser comerciales.":
    "Rough estimate with reference prices checked on {fecha}. This is not an offer or a booking: each provider sets the final price and availability. Booking links may be commercial.",
  "Escápate sin arruinarte": "Get away without going broke",

  // Cuenta
  "Hola, {nombre}": "Hi, {nombre}",
  "(sin email guardado)": "(no email saved)",
  "Email y contraseña": "Email and password",
  "Ya hay una cuenta con ese email. Entra desde la pestaña «Entrar».": "There's already an account with that email. Sign in from the \"Sign in\" tab.",
  "Email o contraseña incorrectos. Si aún no tienes cuenta, créala en la pestaña «Crear cuenta».":
    "Wrong email or password. If you don't have an account yet, create one in the \"Create account\" tab.",
  "Te hemos enviado un email para confirmar la cuenta. Ábrelo y vuelve a entrar.": "We've sent you an email to confirm your account. Open it and sign in again.",
  "No se pudo conectar con Google. Inténtalo de nuevo.": "Couldn't connect to Google. Please try again.",
  "No se pudo entrar con Google. Inténtalo de nuevo o usa tu email.": "Couldn't sign in with Google. Try again or use your email.",
  "Tu cuenta está suspendida. Si crees que es un error, escríbenos a hola@cheapscape.com.":
    "Your account is suspended. If you think this is a mistake, write to us at hola@cheapscape.com.",
  "La contraseña es demasiado débil. Usa al menos 6 caracteres.": "The password is too weak. Use at least 6 characters.",
  "Demasiados intentos. Espera unos minutos y vuelve a probar.": "Too many attempts. Wait a few minutes and try again.",
  "Ese email no es válido.": "That email isn't valid.",
  "Tienes que confirmar tu email antes de entrar.": "You need to confirm your email before signing in.",
  "No se pudo iniciar sesión. Inténtalo de nuevo.": "Couldn't sign in. Please try again.",
  "Tienes que marcar la casilla de privacidad y términos.": "You need to tick the privacy and terms box.",
  "Escribe un email válido.": "Enter a valid email.",
  "La contraseña debe tener al menos 6 caracteres.": "The password must be at least 6 characters long.",
  "Las dos contraseñas no coinciden.": "The two passwords don't match.",
  "Creando cuenta...": "Creating account...",
  "Entrando...": "Signing in...",

  // Panel admin
  "1 día": "1 day",
  "7 días": "7 days",
  "30 días": "30 days",
  "Para siempre": "Forever",
  "Un momento...": "One moment...",
  "No se ha podido: {motivo}": "Couldn't do it: {motivo}",
  "Activo": "Active",
  "Baneado para siempre": "Banned forever",
  "Baneado hasta {fecha}": "Banned until {fecha}",
  "(tu cuenta)": "(your account)",
  "Quitar admin": "Remove admin",
  "Hacer admin": "Make admin",
  "¿Quitar el rol de administrador a {email}?": "Remove the admin role from {email}?",
  "¿Hacer administrador a {email}? Podrá cambiar precios y gestionar usuarios.": "Make {email} an admin? They'll be able to change prices and manage users.",
  "{email} ya es administrador.": "{email} is now an admin.",
  "{email} ya no es administrador.": "{email} is no longer an admin.",
  "Quitar baneo": "Lift ban",
  "{email} puede volver a entrar.": "{email} can sign in again.",
  "Banear a {email}": "Ban {email}",
  "Banear…": "Ban…",
  "¿Banear a {email} ({tiempo})? Se cerrará su sesión.": "Ban {email} ({tiempo})? They'll be signed out.",
  "{email} baneado ({tiempo}).": "{email} banned ({tiempo}).",
  "Eliminar": "Delete",
  "¿Eliminar la cuenta de {email}? Se borra para siempre y no se puede deshacer.": "Delete {email}'s account? It's deleted forever and can't be undone.",
  "Cuenta de {email} eliminada.": "{email}'s account deleted.",
  "No se pudo cargar la lista. ¿Has ejecutado supabase/admin.sql y supabase/admin_usuarios.sql?":
    "The list couldn't be loaded. Have you run supabase/admin.sql and supabase/admin_usuarios.sql?",
  "Administrador": "Admin",
  "Usuario": "User",
  "No se pudieron cargar los destinos. ¿Has ejecutado supabase/admin.sql?": "The destinations couldn't be loaded. Have you run supabase/admin.sql?",
  "actualizado {fecha}": "updated {fecha}",
  "Desde {origen} (€, a {aeropuerto})": "From {origen} (€, to {aeropuerto})",
  "Directo": "Direct",
  "Alojamiento (precio de 2 noches)": "Accommodation (price for 2 nights)",
  "Privado (€)": "Private (€)",
  "Nota privado": "Private rating",
  "Compartido (€)": "Shared (€)",
  "Nota compartido": "Shared rating",
  "Traslado aeropuerto ↔ centro": "Airport ↔ centre transfer",
  "{aeropuerto} ida y vuelta (€)": "{aeropuerto} return (€)",
  "Otros": "Other",
  "Cuenta como exótico": "Counts as exotic",
  "Guardar cambios": "Save changes",
  "Revisa los números: no pueden ser negativos y la nota va de 0 a 10.": "Check the numbers: they can't be negative and the rating goes from 0 to 10.",
  "Guardando...": "Saving...",
  "No se ha guardado: el servidor no te reconoce como admin.": "Not saved: the server doesn't recognise you as an admin.",
  "Guardado. Ya se usa en la web.": "Saved. It's already live on the site.",
  // Errores que devuelve Supabase (supabase/admin_usuarios.sql)
  "Solo administradores": "Admins only",
  "No puedes cambiar tu propio rol": "You can't change your own role",
  "Rol no válido": "Invalid role",
  "Usuario no encontrado": "User not found",
  "No puedes banearte a ti mismo": "You can't ban yourself",
  "Días no válidos": "Invalid number of days",
  "No puedes eliminar tu propia cuenta desde aquí": "You can't delete your own account from here",

  // ---------- Legal: común ----------
  "Texto provisional: CheapScape es un proyecto en desarrollo. Los datos del titular que aparecen aquí (NIF y domicilio) son ficticios. Antes del lanzamiento real, este texto debe revisarlo un profesional del derecho.":
    "Provisional text: CheapScape is a project in development. The owner's details shown here (tax ID and address) are fictitious. Before the real launch, this text must be reviewed by a legal professional. This English version is a courtesy translation; the Spanish version prevails.",
  "Texto provisional: CheapScape es un proyecto en desarrollo. Los datos del titular que aparecen en el aviso legal (NIF y domicilio) son ficticios. Antes del lanzamiento real, este texto debe revisarlo un profesional del derecho.":
    "Provisional text: CheapScape is a project in development. The owner's details shown in the legal notice (tax ID and address) are fictitious. Before the real launch, this text must be reviewed by a legal professional. This English version is a courtesy translation; the Spanish version prevails.",
  "Última actualización: 22 de octubre de 2026": "Last updated: 22 October 2026",

  // ---------- Aviso legal ----------
  "Aviso legal — CheapScape": "Legal notice — CheapScape",
  "Aviso legal de CheapScape.": "CheapScape legal notice.",
  "1. Quién está detrás de CheapScape": "1. Who is behind CheapScape",
  "En cumplimiento del artículo 10 de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE), estos son los datos del titular de este sitio web:":
    "In compliance with article 10 of Spanish Law 34/2002 on information society services and electronic commerce (LSSI-CE), these are the details of the owner of this website:",
  "Titular: Jose Esgueda Gutiérrez (persona física).": "Owner: Jose Esgueda Gutiérrez (private individual).",
  "NIF: 00000000T.": "Tax ID (NIF): 00000000T.",
  "Domicilio: Calle Ejemplo 1, 24001 León (España).": "Address: Calle Ejemplo 1, 24001 León (Spain).",
  "Email de contacto: hola@cheapscape.com": "Contact email: <a href=\"mailto:hola@cheapscape.com\">hola@cheapscape.com</a>",
  "CheapScape no está inscrito en ningún registro mercantil ni ejerce una actividad sujeta a autorización administrativa previa.":
    "CheapScape is not entered in any commercial register and does not carry out any activity requiring prior administrative authorisation.",
  "2. Qué es CheapScape": "2. What CheapScape is",
  "CheapScape es una web que, según tu origen (Madrid o Barcelona), tus fechas y tu presupuesto, te propone un Top 3 de viajes: vuelo, traslado aeropuerto-ciudad y alojamiento para las noches que elijas.":
    "CheapScape is a website that, based on your origin (Madrid or Barcelona), your dates and your budget, suggests a Top 3 of trips: flight, airport-to-city transfer and accommodation for the nights you choose.",
  "Los precios que ves son estimaciones orientativas que cargamos a mano, con unas fechas de referencia (13-15 de noviembre de 2026) y revisadas el 22 de octubre de 2026. No son ofertas ni precios garantizados.":
    "The prices you see are <strong>rough estimates</strong> that we enter by hand, based on reference dates (13-15 November 2026) and checked on 22 October 2026. They are not offers or guaranteed prices.",
  "3. Qué no es CheapScape": "3. What CheapScape is not",
  "No es una agencia de viajes.": "It is not a travel agency.",
  "No organiza ni vende viajes combinados ni servicios de viaje vinculados.": "It does not organise or sell package travel or linked travel arrangements.",
  "No vende viajes ni cobra nada al usuario.": "It does not sell trips or charge the user anything.",
  "No gestiona reservas ni pagos.": "It does not handle bookings or payments.",
  "Cuando quieres reservar, te enlazamos a webs de terceros (por ejemplo, Google Flights o Booking.com). Cada servicio (vuelo, traslado, alojamiento) se contrata por separado, directamente con su proveedor y bajo sus propias condiciones. CheapScape no junta esos servicios en una sola reserva ni en un solo pago.":
    "When you want to book, we link you to third-party websites (for example, Google Flights or Booking.com). Each service (flight, transfer, accommodation) is booked separately, directly with its provider and under its own terms. CheapScape does not combine those services into a single booking or a single payment.",
  "4. Uso del sitio": "4. Use of the site",
  "Este aviso legal se aplica a cualquier persona que use la web. Si creas una cuenta, también se aplican los Términos y condiciones. Usa la web de forma lícita: no intentes dañarla, sobrecargarla ni acceder a partes que no son públicas.":
    "This legal notice applies to anyone who uses the website. If you create an account, the <a href=\"terminos.html\">Terms and conditions</a> also apply. Use the website lawfully: do not try to damage it, overload it or access parts that are not public.",
  "5. Enlaces a otras webs y enlaces comerciales": "5. Links to other websites and commercial links",
  "CheapScape incluye enlaces a webs de terceros. No controlamos su contenido, sus precios ni sus políticas, y no respondemos de ellos. Si sabemos que un enlace lleva a contenido ilícito, lo quitaremos enseguida; puedes avisarnos en hola@cheapscape.com. Al pulsar uno de esos enlaces sales de CheapScape.":
    "CheapScape includes links to third-party websites. We do not control their content, prices or policies, and we are not responsible for them. If we learn that a link leads to unlawful content, we will remove it straight away; you can let us know at <a href=\"mailto:hola@cheapscape.com\">hola@cheapscape.com</a>. When you click one of those links you leave CheapScape.",
  "Hoy no participamos en ningún programa de afiliación. En el futuro algunos enlaces podrán ser de afiliación: si reservas a través de ellos, CheapScape podría cobrar una comisión del proveedor, sin ningún coste extra para ti. Por eso debes tratar los enlaces de reserva como posibles enlaces comerciales.":
    "We do not currently take part in any affiliate programme. In the future some links may be affiliate links: if you book through them, CheapScape could receive a commission from the provider, <strong>at no extra cost to you</strong>. That is why you should treat booking links as possible commercial links.",
  "6. Responsabilidad": "6. Liability",
  "Intentamos que la información sea útil y esté al día, pero los precios, horarios y disponibilidad cambian constantemente y no dependen de nosotros. Comprueba siempre las condiciones finales en la web del proveedor antes de pagar. Tienes más detalle en los Términos y condiciones.":
    "We try to keep the information useful and up to date, but prices, times and availability change constantly and are outside our control. Always check the final conditions on the provider's website before paying. You'll find more detail in the <a href=\"terminos.html\">Terms and conditions</a>.",
  "7. Propiedad intelectual e industrial": "7. Intellectual and industrial property",
  "Los textos, el diseño, el logotipo, el código y la selección de destinos de CheapScape pertenecen a su titular o se usan con permiso. No puedes copiarlos, distribuirlos ni reutilizarlos con fines comerciales sin autorización por escrito.":
    "CheapScape's texts, design, logo, code and selection of destinations belong to its owner or are used with permission. You may not copy, distribute or reuse them for commercial purposes without written authorisation.",
  "Las marcas y nombres de terceros (por ejemplo, Google Flights o Booking.com) pertenecen a sus respectivos dueños y solo se citan para identificar sus servicios.":
    "Third-party brands and names (for example, Google Flights or Booking.com) belong to their respective owners and are only mentioned to identify their services.",
  "8. Protección de datos y cookies": "8. Data protection and cookies",
  "Cómo tratamos tus datos lo explicamos en la Política de privacidad, y qué guardamos en tu navegador, en la Política de cookies.":
    "How we handle your data is explained in the <a href=\"privacidad.html\">Privacy policy</a>, and what we store in your browser in the <a href=\"cookies.html\">Cookie policy</a>.",
  "9. Ley aplicable": "9. Applicable law",
  "Este aviso legal se rige por la ley española, sin que eso te quite la protección que te den las normas de consumo de tu país de residencia. Si eres consumidor, puedes acudir a los juzgados de tu domicilio. Si no lo eres, los de León (España).":
    "This legal notice is governed by Spanish law, without depriving you of the protection given by the consumer rules of your country of residence. If you are a consumer, you may go to the courts of your place of residence. If you are not, the courts of León (Spain).",

  // ---------- Cookies ----------
  "Política de cookies — CheapScape": "Cookie policy — CheapScape",
  "Política de cookies de CheapScape.": "CheapScape cookie policy.",
  "1. Resumen rápido": "1. Quick summary",
  "CheapScape no instala cookies propias.": "CheapScape <strong>does not set its own cookies</strong>.",
  "No usamos cookies de análisis, publicidad ni redes sociales.": "We do not use analytics, advertising or social media cookies.",
  "Solo guardamos en tu navegador lo imprescindible para que la web funcione. Por eso no verás un banner de cookies.":
    "We only store in your browser what is strictly necessary for the website to work. That's why you won't see a cookie banner.",
  "Responsable: el titular de CheapScape (datos en el Aviso legal).": "Controller: the owner of CheapScape (details in the <a href=\"aviso-legal.html\">Legal notice</a>).",
  "2. Qué son las cookies y el almacenamiento local": "2. What cookies and local storage are",
  "Las cookies son pequeños archivos que una web guarda en tu navegador. El almacenamiento local (localStorage y sessionStorage) es una tecnología parecida: también guarda información en tu dispositivo. El art. 22.2 de la LSSI-CE se aplica a ambas cosas por igual.":
    "Cookies are small files that a website stores in your browser. Local storage (<code>localStorage</code> and <code>sessionStorage</code>) is a similar technology: it also stores information on your device. Article 22.2 of the LSSI-CE applies to both equally.",
  "3. Qué guardamos en tu navegador": "3. What we store in your browser",
  "sb-ujkronhtrvlxrciwghaq-auth-token (localStorage)": "<strong><code>sb-ujkronhtrvlxrciwghaq-auth-token</code></strong> (<code>localStorage</code>)",
  "Quién lo pone: CheapScape, mediante la librería de Supabase.": "Set by: CheapScape, through the Supabase library.",
  "Para qué: mantener tu sesión iniciada mientras navegas.": "Purpose: keeping you signed in while you browse.",
  "Cuándo se crea: solo si inicias sesión o creas una cuenta.": "When it's created: only if you sign in or create an account.",
  "Cuánto dura: hasta que cierras sesión o borras los datos del sitio en tu navegador.": "How long it lasts: until you sign out or clear the site's data in your browser.",
  "cheapscape_last_busqueda y cheapscape_last_trips (sessionStorage)":
    "<strong><code>cheapscape_last_busqueda</code></strong> and <strong><code>cheapscape_last_trips</code></strong> (<code>sessionStorage</code>)",
  "Quién lo pone: CheapScape.": "Set by: CheapScape.",
  "Para qué: recordar tu última búsqueda y su Top 3, para poder mostrarte el detalle del viaje.": "Purpose: remembering your last search and its Top 3, so we can show you the trip details.",
  "Cuánto dura: se borra al cerrar la pestaña.": "How long it lasts: it's deleted when you close the tab.",
  "cheapscape_idioma (localStorage)": "<strong><code>cheapscape_idioma</code></strong> (<code>localStorage</code>)",
  "Para qué: recordar el idioma que eliges con el interruptor ES | EN.": "Purpose: remembering the language you choose with the ES | EN switch.",
  "Cuándo se crea: solo si cambias el idioma.": "When it's created: only if you change the language.",
  "Cuánto dura: hasta que borras los datos del sitio en tu navegador.": "How long it lasts: until you clear the site's data in your browser.",
  "Todo esto es técnico y necesario para darte el servicio que pides (buscar e iniciar sesión). Según el art. 22.2 de la LSSI-CE y la guía sobre cookies de la AEPD, este tipo de almacenamiento no necesita tu consentimiento. Aun así, te lo contamos.":
    "All of this is technical and necessary to provide the service you ask for (searching and signing in). Under article 22.2 of the LSSI-CE and the Spanish Data Protection Agency (AEPD) cookie guide, this kind of storage does not require your consent. We're telling you anyway.",
  "4. Recursos de terceros": "4. Third-party resources",
  "La web carga algunas librerías desde jsDelivr y cdnjs (Cloudflare); las tipografías las servimos nosotros. Esos servicios no necesitan cookies para funcionar y no les pedimos que las instalen, aunque al cargarse reciben tu dirección IP. Lo explicamos en la Política de privacidad.":
    "The website loads some libraries from jsDelivr and cdnjs (Cloudflare); we serve the fonts ourselves. Those services don't need cookies to work and we don't ask them to set any, although they receive your IP address when they load. We explain this in the <a href=\"privacidad.html\">Privacy policy</a>.",
  "Si pulsas un enlace a Google Flights, Booking.com u otro proveedor, sales de CheapScape. Esas webs usan sus propias cookies, que gestionas en su propio banner y según su propia política.":
    "If you click a link to Google Flights, Booking.com or another provider, you leave CheapScape. Those websites use their own cookies, which you manage in their own banner and under their own policy.",
  "5. Cómo borrar estos datos": "5. How to delete this data",
  "Puedes borrarlos cuando quieras. Si lo haces, se cerrará tu sesión y se perderá tu última búsqueda.": "You can delete it whenever you like. If you do, you'll be signed out and your last search will be lost.",
  "La forma más fácil: cierra sesión (borra el token de sesión) y cierra la pestaña (borra la última búsqueda).":
    "<strong>The easiest way:</strong> sign out (deletes the session token) and close the tab (deletes the last search).",
  "Chrome / Edge: pulsa el icono que hay a la izquierda de la dirección web → Configuración del sitio → Borrar datos.":
    "<strong>Chrome / Edge:</strong> click the icon to the left of the web address → Site settings → Delete data.",
  "Firefox: pulsa el candado de la barra de direcciones → Borrar cookies y datos del sitio.": "<strong>Firefox:</strong> click the padlock in the address bar → Clear cookies and site data.",
  "Safari (Mac): Ajustes → Privacidad → Gestionar datos de sitios web, busca el sitio y elimínalo.":
    "<strong>Safari (Mac):</strong> Settings → Privacy → Manage Website Data, find the site and remove it.",
  "Safari (iPhone): Ajustes → Safari → Avanzado → Datos de sitios web.": "<strong>Safari (iPhone):</strong> Settings → Safari → Advanced → Website Data.",
  "Los nombres exactos de los menús pueden cambiar según la versión de tu navegador.": "The exact menu names may vary depending on your browser version.",
  "6. Cambios": "6. Changes",
  "Hoy no usamos analítica. Si en el futuro añadimos alguna (por ejemplo, una sin cookies como Plausible o Umami) o cualquier cookie que no sea técnica, actualizaremos esta página antes y, si la ley lo exige, te pediremos permiso.":
    "We don't use analytics today. If in the future we add any (for example, a cookie-free one such as Plausible or Umami) or any non-technical cookie, we will update this page first and, if the law requires it, ask for your permission.",

  // ---------- Términos y condiciones ----------
  "Términos y condiciones — CheapScape": "Terms and conditions — CheapScape",
  "Términos y condiciones de uso de CheapScape.": "CheapScape terms and conditions of use.",
  "Estos términos regulan el uso de CheapScape y de las cuentas de usuario. El titular es Jose Esgueda Gutiérrez (datos completos en el Aviso legal). Se aplican a tu cuenta desde que la creas.":
    "These terms govern the use of CheapScape and of user accounts. The owner is Jose Esgueda Gutiérrez (full details in the <a href=\"aviso-legal.html\">Legal notice</a>). They apply to your account from the moment you create it.",
  "1. Qué es CheapScape": "1. What CheapScape is",
  "Una web gratuita que, a partir de tu origen (Madrid o Barcelona), tus fechas y tu presupuesto, te propone un Top 3 de viajes con vuelo, traslado aeropuerto-ciudad y alojamiento para las noches que elijas. Para ver el detalle de un viaje (alojamiento exacto, horarios) necesitas una cuenta gratuita.":
    "A free website that, from your origin (Madrid or Barcelona), your dates and your budget, suggests a Top 3 of trips with flight, airport-to-city transfer and accommodation for the nights you choose. To see the details of a trip (exact accommodation, times) you need a free account.",
  "Cómo se elige el Top 3: calculamos el precio total estimado de cada destino desde tu origen y nos quedamos con los que caben en tu presupuesto. De ellos, mostramos el más barato, el de alojamiento mejor valorado y el más barato de los que nosotros hemos marcado como destino exótico. Nunca repetimos destino.":
    "How the Top 3 is chosen: we calculate the estimated total price of each destination from your origin and keep the ones that fit your budget. Of those, we show the cheapest, the one with the best-rated accommodation and the cheapest of those we have marked as an exotic destination. We never repeat a destination.",
  "2. Qué no es CheapScape": "2. What CheapScape is not",
  "No vende nada ni te cobra nada.": "It doesn't sell anything or charge you anything.",
  "No gestiona reservas, pagos, cambios ni cancelaciones.": "It does not handle bookings, payments, changes or cancellations.",
  "El Top 3 es solo una propuesta informativa. Cada servicio (vuelo, traslado y alojamiento) lo contratas tú por separado, directamente con su proveedor. CheapScape no junta esos servicios en una sola reserva ni en un solo pago, así que no se aplica el régimen de los viajes combinados: los derechos que tengas dependen de cada contrato con cada proveedor.":
    "The Top 3 is only an informative suggestion. You book each service (flight, transfer and accommodation) separately, directly with its provider. CheapScape does not combine those services into a single booking or a single payment, so package travel rules do not apply: your rights depend on each contract with each provider.",
  "3. Los precios son orientativos": "3. Prices are approximate",
  "Son estimaciones que cargamos a mano, no ofertas ni precios garantizados. Última revisión: 22 de octubre de 2026.":
    "They are <strong>estimates</strong> that we enter by hand, not offers or guaranteed prices. Last checked: 22 October 2026.",
  "Se calculan con unas fechas de referencia (ahora, del 13 al 15 de noviembre de 2026), aunque tú elijas otras fechas.":
    "They are calculated with reference dates (currently 13 to 15 November 2026), even if you choose other dates.",
  "Incluyen vuelo de ida y vuelta, traslado aeropuerto-ciudad y alojamiento para las noches elegidas, por persona y en euros.":
    "They include a return flight, airport-to-city transfer and accommodation for the chosen nights, <strong>per person</strong> and in euros.",
  "El precio real puede ser distinto y cambiar en cualquier momento (temporada, disponibilidad, tasas, equipaje, etc.).":
    "The real price may be different and change at any time (season, availability, fees, luggage, etc.).",
  "4. Reserva y pago con el proveedor": "4. Booking and payment with the provider",
  "Cuando pulsas para reservar, sales de CheapScape a la web del proveedor (por ejemplo, Google Flights o Booking.com). La reserva, el pago, las cancelaciones y las reclamaciones son cosa tuya y del proveedor, bajo sus condiciones. CheapScape no forma parte de ese contrato. Revisa siempre precio final, horarios y condiciones antes de pagar.":
    "When you click to book, you leave CheapScape for the provider's website (for example, Google Flights or Booking.com). The booking, payment, cancellations and claims are between you and the provider, under its terms. CheapScape is not a party to that contract. Always check the final price, times and conditions before paying.",
  "5. Enlaces de afiliación": "5. Affiliate links",
  "Hoy no participamos en ningún programa de afiliación. En el futuro algunos enlaces a proveedores podrán serlo: si reservas a través de ellos, el proveedor podría pagar una comisión a CheapScape, sin coste extra para ti. Considera los enlaces de reserva como posibles enlaces comerciales. El Top 3 se calcula solo con los criterios del punto 1; si alguna vez una comisión influyera en el orden o en qué destinos salen, lo diríamos aquí antes de aplicarlo.":
    "We do not currently take part in any affiliate programme. In the future some links to providers may be affiliate links: if you book through them, the provider could pay CheapScape a commission, <strong>at no extra cost to you</strong>. Treat booking links as possible commercial links. The Top 3 is calculated only with the criteria in point 1; if a commission ever influenced the order or which destinations appear, we would say so here before applying it.",
  "6. Tu cuenta": "6. Your account",
  "Debes tener al menos 14 años.": "You must be at least 14 years old.",
  "Usa un email real que sea tuyo.": "Use a real email address that belongs to you.",
  "Guarda tu contraseña en secreto y no la compartas. Si crees que alguien está usando tu cuenta, avísanos en hola@cheapscape.com.":
    "Keep your password secret and don't share it. If you think someone is using your account, let us know at <a href=\"mailto:hola@cheapscape.com\">hola@cheapscape.com</a>.",
  "Haz un uso razonable: nada de bots o descargas masivas de datos, intentos de saltarse las protecciones, ni usos que dañen la web o a otros usuarios.":
    "Use it reasonably: no bots or mass data downloads, no attempts to get around the protections, and no uses that harm the website or other users.",
  "Puedes darte de baja cuando quieras, gratis: escribe a hola@cheapscape.com y borraremos tu cuenta.":
    "You can close your account whenever you like, free of charge: write to <a href=\"mailto:hola@cheapscape.com\">hola@cheapscape.com</a> and we will delete it.",
  "Si incumples estos términos de forma clara, podemos suspender o cerrar tu cuenta. Salvo casos graves o urgentes, antes te escribiremos al email de tu cuenta explicando el motivo, para que puedas contestar.":
    "If you clearly breach these terms, we may suspend or close your account. Except in serious or urgent cases, we will first write to your account's email explaining why, so that you can reply.",
  "7. Responsabilidad": "7. Liability",
  "CheapScape es una herramienta de orientación gratuita. Por eso, en la medida en que lo permite la ley:":
    "CheapScape is a free guidance tool. Therefore, to the extent permitted by law:",
  "No respondemos de diferencias entre nuestras estimaciones y el precio real, ni de la disponibilidad.":
    "We are not liable for differences between our estimates and the real price, or for availability.",
  "No respondemos de lo que hagan los proveedores: cancelaciones, retrasos, cambios, calidad del alojamiento o problemas con tu reserva.":
    "We are not liable for what providers do: cancellations, delays, changes, accommodation quality or problems with your booking.",
  "No garantizamos que la web funcione siempre sin interrupciones ni errores, aunque intentamos que así sea.":
    "We do not guarantee that the website will always work without interruptions or errors, although we try to make sure it does.",
  "Nada de esto limita los derechos que te da la ley como consumidor, ni nuestra responsabilidad por dolo o culpa grave, por daños a las personas o en los demás casos en que la ley no permite limitarla.":
    "None of this limits your statutory rights as a consumer, or our liability for wilful misconduct or gross negligence, for personal injury or in any other case where the law does not allow it to be limited.",
  "8. Propiedad intelectual": "8. Intellectual property",
  "Los textos, el diseño, el logotipo, el código y la selección de destinos y precios de CheapScape pertenecen a su titular o se usan con permiso. Puedes usar la web para tu uso personal, pero no copiar, extraer ni reutilizar su contenido con fines comerciales sin autorización. Las marcas de terceros pertenecen a sus dueños.":
    "CheapScape's texts, design, logo, code and selection of destinations and prices belong to its owner or are used with permission. You may use the website for personal use, but you may not copy, extract or reuse its content for commercial purposes without authorisation. Third-party brands belong to their owners.",
  "El tratamiento de tus datos se explica en la Política de privacidad.": "How your data is handled is explained in the <a href=\"privacidad.html\">Privacy policy</a>.",
  "9. Cambios en estos términos": "9. Changes to these terms",
  "Podemos actualizar estos términos si cambia el servicio o la ley. Cambiaremos la fecha de arriba y, si el cambio es importante, te lo avisaremos antes de que se aplique con un aviso visible en la web o en el email de tu cuenta. Si no estás de acuerdo, puedes dejar de usar CheapScape y pedir el borrado de tu cuenta.":
    "We may update these terms if the service or the law changes. We will change the date above and, if the change is significant, we will let you know before it applies with a visible notice on the website or by email to your account. If you don't agree, you can stop using CheapScape and ask us to delete your account.",
  "10. Ley aplicable y juzgados": "10. Applicable law and courts",
  "Estos términos se rigen por la ley española, sin que eso te quite la protección que te den las normas de consumo de tu país de residencia. Si eres consumidor, puedes acudir a los juzgados de tu domicilio. Si no lo eres, los de León (España). Si tienes un problema, escríbenos primero a hola@cheapscape.com y lo intentamos arreglar.":
    "These terms are governed by Spanish law, without depriving you of the protection given by the consumer rules of your country of residence. If you are a consumer, you may go to the courts of your place of residence. If you are not, the courts of León (Spain). If you have a problem, write to us first at <a href=\"mailto:hola@cheapscape.com\">hola@cheapscape.com</a> and we'll try to sort it out.",

  // ---------- Privacidad ----------
  "Política de privacidad — CheapScape": "Privacy policy — CheapScape",
  "Política de privacidad de CheapScape.": "CheapScape privacy policy.",
  "Aquí te contamos, sin rodeos, qué datos tuyos tratamos, para qué y qué derechos tienes. Se aplica el Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD).":
    "Here we tell you, plainly, what data of yours we process, what for and what rights you have. The General Data Protection Regulation (GDPR) and Spanish Organic Law 3/2018 (LOPDGDD) apply.",
  "1. Responsable del tratamiento": "1. Data controller",
  "Responsable: Jose Esgueda Gutiérrez (persona física).": "Controller: Jose Esgueda Gutiérrez (private individual).",
  "Email para cualquier tema de privacidad: hola@cheapscape.com":
    "Email for any privacy matter: <a href=\"mailto:hola@cheapscape.com\">hola@cheapscape.com</a>",
  "CheapScape no tiene delegado de protección de datos.": "CheapScape does not have a data protection officer.",
  "2. Qué datos tratamos": "2. What data we process",
  "Si solo navegas y buscas, sin cuenta:": "If you only browse and search, without an account:",
  "No guardamos tus búsquedas (origen, fechas, presupuesto) en ningún servidor. El Top 3 se calcula en tu propio navegador.":
    "We don't store your searches (origin, dates, budget) on any server. The Top 3 is calculated in your own browser.",
  "La última búsqueda y su Top 3 se guardan temporalmente en tu navegador (sessionStorage) para poder enseñarte el detalle, y se borran al cerrar la pestaña. Más info en la Política de cookies.":
    "Your last search and its Top 3 are stored temporarily in your browser (<code>sessionStorage</code>) so we can show you the details, and they are deleted when you close the tab. More info in the <a href=\"cookies.html\">Cookie policy</a>.",
  "Si creas una cuenta:": "If you create an account:",
  "Tu email.": "Your email.",
  "Tu contraseña, que se guarda cifrada mediante un hash. Nosotros nunca la vemos en claro.":
    "Your password, which is stored encrypted as a <em>hash</em>. We never see it in plain text.",
  "La fecha de alta y la de tu último acceso.": "Your sign-up date and the date of your last sign-in.",
  "Datos técnicos que nuestro proveedor registra por seguridad en sus logs, como tu dirección IP y el tipo de navegador.":
    "Technical data that our provider records in its logs for security, such as your IP address and browser type.",
  "El email y la contraseña son necesarios para crear la cuenta: sin ellos no podemos dártela. Puedes usar el buscador y ver el Top 3 sin cuenta.":
    "The email and password are needed to create the account: without them we can't give you one. You can use the search and see the Top 3 without an account.",
  "Si entras con Google:": "If you sign in with Google:",
  "No hay contraseña: Google nos confirma que eres tú y nos pasa tu email, tu nombre y tu foto de perfil, que se guardan en tu cuenta. Solo usamos el email; no pedimos acceso a tu correo, contactos ni a nada más de tu cuenta de Google.":
    "There's no password: Google confirms it's you and sends us your email, name and profile photo, which are stored in your account. We only use the email; we don't ask for access to your mail, contacts or anything else in your Google account.",
  "Google trata tus datos al iniciar sesión según su propia política de privacidad.":
    "Google processes your data when you sign in under its own <a href=\"https://policies.google.com/privacy\" target=\"_blank\" rel=\"noopener\">privacy policy</a>.",
  "Si nos escribes:": "If you write to us:",
  "Tu email y lo que nos cuentes en el mensaje.": "Your email and whatever you tell us in the message.",
  "No te pedimos nombre, teléfono, datos de pago ni documentos de identidad.": "We don't ask for your name, phone number, payment details or ID documents.",
  "3. Para qué los usamos y con qué base legal": "3. What we use them for and on what legal basis",
  "Crear y gestionar tu cuenta y dejarte ver el detalle de los viajes (alojamiento exacto, horarios). Base legal: la ejecución del contrato, es decir, de los Términos y condiciones que rigen la cuenta (art. 6.1.b RGPD). Esto incluye los emails imprescindibles del servicio, como el de confirmar tu cuenta.":
    "<strong>Creating and managing your account</strong> and letting you see trip details (exact accommodation, times). Legal basis: performance of the contract, that is, the <a href=\"terminos.html\">Terms and conditions</a> governing the account (art. 6.1.b GDPR). This includes essential service emails, such as the one to confirm your account.",
  "Mantener la seguridad del servicio y evitar abusos (logs técnicos). Base legal: nuestro interés legítimo en proteger la web y a sus usuarios (art. 6.1.f RGPD).":
    "<strong>Keeping the service secure</strong> and preventing abuse (technical logs). Legal basis: our legitimate interest in protecting the website and its users (art. 6.1.f GDPR).",
  "Responder a tus mensajes. Base legal: nuestro interés legítimo en contestarte cuando nos escribes (art. 6.1.f RGPD).":
    "<strong>Replying to your messages.</strong> Legal basis: our legitimate interest in answering you when you write to us (art. 6.1.f GDPR).",
  "Atender tus solicitudes de derechos. Base legal: el cumplimiento de una obligación legal (art. 6.1.c RGPD).":
    "<strong>Handling your rights requests.</strong> Legal basis: compliance with a legal obligation (art. 6.1.c GDPR).",
  "Ojo: la casilla que marcas al registrarte sirve para confirmar que has leído esta política. No es un consentimiento: tratamos los datos de tu cuenta porque los necesitamos para darte el servicio que pides, no porque nos des permiso. Por eso, si quieres que dejemos de tratarlos, lo que procede es borrar la cuenta.":
    "Note: the box you tick when signing up is to confirm that you've read this policy. <strong>It is not consent</strong>: we process your account data because we need it to provide the service you ask for, not because you give us permission. So, if you want us to stop processing it, the way to do that is to delete the account.",
  "Lo que no hacemos:": "What we <strong>don't</strong> do:",
  "No vendemos ni alquilamos tus datos.": "We don't sell or rent your data.",
  "No mostramos publicidad.": "We don't show advertising.",
  "No creamos perfiles comerciales ni tomamos decisiones automatizadas sobre ti.": "We don't build commercial profiles or make automated decisions about you.",
  "No enviamos newsletters ni emails comerciales.": "We don't send newsletters or marketing emails.",
  "No guardamos tus búsquedas en tu cuenta.": "We don't store your searches in your account.",
  "No usamos ninguna herramienta de analítica.": "We don't use any analytics tool.",
  "Más adelante podríamos añadir una analítica sin cookies (del tipo Plausible o Umami) para saber cuánta gente usa la web. Si lo hacemos, actualizaremos esta política antes de activarla.":
    "Later on we might add cookie-free analytics (such as Plausible or Umami) to find out how many people use the website. If we do, we will update this policy before switching it on.",
  "4. Quién más trata tus datos": "4. Who else processes your data",
  "Supabase (Supabase Inc.). Es nuestro proveedor de base de datos y de inicio de sesión, y trata los datos de tu cuenta por cuenta nuestra, como encargado del tratamiento. Nuestro proyecto está alojado en la región de la Unión Europea West EU (Irlanda, infraestructura de Amazon Web Services). Supabase es una empresa de Estados Unidos. Los datos se guardan en la UE, pero no podemos descartar que su personal o sus subproveedores accedan desde fuera del Espacio Económico Europeo (por ejemplo, para dar soporte). Según las condiciones del proveedor, el encargo se regula por su acuerdo de tratamiento de datos, que prevé para esos accesos las cláusulas contractuales tipo de la Comisión Europea. Si quieres más información sobre estas garantías, pídenosla en hola@cheapscape.com.":
    "<strong>Supabase (Supabase Inc.).</strong> It's our database and sign-in provider, and it processes your account data on our behalf, as a data processor. Our project is hosted in the European Union region <em>West EU</em> (Ireland, Amazon Web Services infrastructure). Supabase is a United States company. The data is stored in the EU, but we can't rule out its staff or sub-processors accessing it from outside the European Economic Area (for example, to provide support). Under the provider's terms, this is governed by its data processing agreement, which provides the European Commission's standard contractual clauses for such access. If you'd like more information about these safeguards, ask us at <a href=\"mailto:hola@cheapscape.com\">hola@cheapscape.com</a>.",
  "Google (Google Ireland Limited). Solo si eliges \"Continuar con Google\": Google gestiona ese inicio de sesión y nos envía tu email, nombre y foto de perfil. Google actúa como responsable independiente de los datos de tu cuenta de Google.":
    "<strong>Google (Google Ireland Limited).</strong> Only if you choose \"Continue with Google\": Google handles that sign-in and sends us your email, name and profile photo. Google acts as an independent controller of your Google account data.",
  "Proveedor de alojamiento de la web. El servidor que publica las páginas de CheapScape recibe, como en cualquier web, tu dirección IP y datos técnicos de cada visita, y puede guardarlos en sus logs durante un tiempo limitado. Lo usamos por nuestro interés legítimo en que la web funcione y sea segura (art. 6.1.f RGPD).":
    "<strong>Website hosting provider.</strong> The server that publishes CheapScape's pages receives, as with any website, your IP address and technical data from each visit, and may keep them in its logs for a limited time. We use it on the basis of our legitimate interest in the website working and being secure (art. 6.1.f GDPR).",
  "Recursos de terceros que carga tu navegador. Para que la web funcione, tu navegador descarga algunos archivos desde servidores de terceros. Al hacerlo, esos servidores reciben, como mínimo, tu dirección IP y datos técnicos de tu navegador:":
    "<strong>Third-party resources loaded by your browser.</strong> For the website to work, your browser downloads some files from third-party servers. When it does, those servers receive at least your IP address and technical data about your browser:",
  "jsDelivr (cdn.jsdelivr.net), para la librería de Supabase que gestiona el inicio de sesión.":
    "jsDelivr (<code>cdn.jsdelivr.net</code>), for the Supabase library that handles sign-in.",
  "cdnjs de Cloudflare (cdnjs.cloudflare.com), para la librería jsPDF con la que se genera el PDF del itinerario. El PDF se crea en tu propio navegador y no se envía a ningún servidor.":
    "Cloudflare's cdnjs (<code>cdnjs.cloudflare.com</code>), for the jsPDF library used to generate the itinerary PDF. The PDF is created in your own browser and is not sent to any server.",
  "Algunos de estos proveedores pueden tratar esos datos fuera de la UE, según sus propias políticas de privacidad. Usamos estos recursos por nuestro interés legítimo en que la web cargue bien y rápido (art. 6.1.f RGPD).":
    "Some of these providers may process that data outside the EU, under their own privacy policies. We use these resources on the basis of our legitimate interest in the website loading properly and quickly (art. 6.1.f GDPR).",
  "Webs a las que te enlazamos. Si pulsas un enlace a Google Flights, Booking.com u otro proveedor, sales de CheapScape. El enlace solo lleva datos del viaje (origen, destino, alojamiento y fechas). No les enviamos tu email ni otros datos de tu cuenta; lo que hagas allí se rige por sus propias políticas de privacidad y de cookies.":
    "<strong>Websites we link to.</strong> If you click a link to Google Flights, Booking.com or another provider, you leave CheapScape. The link only carries trip data (origin, destination, accommodation and dates). We don't send them your email or other account data; whatever you do there is governed by their own privacy and cookie policies.",
  "Fuera de estos casos, solo comunicaríamos tus datos a autoridades cuando una ley nos obligue.": "Apart from these cases, we would only disclose your data to authorities when required by law.",
  "5. Cuánto tiempo los guardamos": "5. How long we keep them",
  "Datos de la cuenta: mientras tu cuenta exista. Todavía no hay un botón para borrarla: si quieres eliminarla, escríbenos a hola@cheapscape.com y la borraremos.":
    "Account data: for as long as your account exists. There's no button to delete it yet: if you want it removed, write to us at <a href=\"mailto:hola@cheapscape.com\">hola@cheapscape.com</a> and we'll delete it.",
  "Logs técnicos: durante el tiempo limitado que los conservan Supabase y el proveedor de alojamiento, según sus condiciones, por motivos de seguridad.":
    "Technical logs: for the limited time Supabase and the hosting provider keep them, under their terms, for security reasons.",
  "Mensajes que nos envías: el tiempo necesario para responderte y resolver lo que nos plantees.": "Messages you send us: for as long as needed to reply and resolve whatever you raise.",
  "Datos guardados en tu navegador: ver la Política de cookies.": "Data stored in your browser: see the <a href=\"cookies.html\">Cookie policy</a>.",
  "Tras borrar tus datos, podremos mantener bloqueado lo imprescindible (art. 32 LOPDGDD): solo a disposición de jueces, tribunales y autoridades, y solo durante el plazo en que puedan exigirse responsabilidades legales. Pasado ese plazo, se eliminan.":
    "After deleting your data, we may keep the bare minimum blocked (art. 32 LOPDGDD): only available to judges, courts and authorities, and only for the period in which legal liability may be claimed. After that period, it is deleted.",
  "6. Edad mínima": "6. Minimum age",
  "Para crear una cuenta debes tener al menos 14 años (art. 7 LOPDGDD). Si detectamos una cuenta de un menor de 14 años, la borraremos.":
    "To create an account you must be at least 14 years old (art. 7 LOPDGDD). If we detect an account belonging to someone under 14, we will delete it.",
  "7. Tus derechos": "7. Your rights",
  "Puedes pedirnos en cualquier momento:": "You can ask us at any time for:",
  "Acceso: saber qué datos tuyos tenemos.": "<strong>Access:</strong> knowing what data of yours we hold.",
  "Rectificación: corregir datos incorrectos.": "<strong>Rectification:</strong> correcting inaccurate data.",
  "Supresión: borrar tus datos y tu cuenta.": "<strong>Erasure:</strong> deleting your data and your account.",
  "Oposición: oponerte a un tratamiento basado en interés legítimo.": "<strong>Objection:</strong> objecting to processing based on legitimate interest.",
  "Limitación: que congelemos el uso de tus datos en ciertos casos.": "<strong>Restriction:</strong> having us freeze the use of your data in certain cases.",
  "Portabilidad: recibir tus datos en un formato que puedas llevarte.": "<strong>Portability:</strong> receiving your data in a format you can take with you.",
  "Escríbenos a hola@cheapscape.com indicando qué derecho quieres ejercer. Si puedes, hazlo desde el email de tu cuenta: así comprobamos que eres tú sin pedirte más datos. Es gratis. Te responderemos en un mes como máximo; si la petición es muy compleja, ese plazo puede ampliarse dos meses más y te avisaremos dentro del primer mes.":
    "Write to us at <a href=\"mailto:hola@cheapscape.com\">hola@cheapscape.com</a> saying which right you want to exercise. If you can, do it from your account's email: that way we can check it's you without asking for more data. It's free. We'll reply within one month at most; if the request is very complex, that period may be extended by two more months and we'll let you know within the first month.",
  "Si crees que no hemos tratado bien tus datos, puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).":
    "If you think we haven't handled your data properly, you can complain to the Spanish Data Protection Agency (<a href=\"https://www.aepd.es\" target=\"_blank\" rel=\"noopener\">aepd.es</a>).",
  "8. Seguridad": "8. Security",
  "La comunicación entre tu navegador y Supabase va cifrada (HTTPS), las contraseñas se guardan con hash y el acceso a la base de datos está limitado con reglas que se comprueban en el servidor. Ningún sistema es infalible: si ocurriera una brecha de seguridad, la notificaríamos a la AEPD y, si supone un riesgo alto para ti, te avisaríamos, como marca el RGPD.":
    "Communication between your browser and Supabase is encrypted (HTTPS), passwords are stored as a <em>hash</em> and access to the database is restricted by rules checked on the server. No system is infallible: if a security breach occurred, we would notify the AEPD and, if it posed a high risk to you, we would let you know, as the GDPR requires.",
  "9. Cambios en esta política": "9. Changes to this policy",
  "Si cambiamos cómo tratamos tus datos, actualizaremos esta página y su fecha. Si el cambio es importante, te lo avisaremos antes de que se aplique con un aviso visible en la web o en el email de tu cuenta.":
    "If we change how we process your data, we will update this page and its date. If the change is significant, we will let you know before it applies with a visible notice on the website or by email to your account.",
};
