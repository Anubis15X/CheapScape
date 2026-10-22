/* =========================================================
   CheapScape — motor del Top 3 (sin backend)
   =========================================================
   Calcula el Top 3 y el detalle de un viaje en el propio navegador a
   partir de la tabla de js/destinos.js. Sustituye al antiguo motor
   del backend (motorViajes.js) y devuelve los datos con la misma
   forma, así que las páginas apenas cambian.

   El Top 3 solo usa la parte pública (precios y notas). El detalle
   pide además la parte protegida a Supabase, que solo la entrega si
   hay sesión iniciada (regla RLS comprobada en el servidor).

   Algoritmo del Top 3 (explicado en el README):
   1. Para cada destino se calcula el precio total desde el origen:
      vuelo + traslado aeropuerto-ciudad + alojamiento por las noches
      que hay entre las fechas elegidas (compartido si el usuario lo
      acepta, si no privado).
   2. Se quedan solo los que caben en el presupuesto ("viables").
   3. El más barato = el de menor total.
   4. El mejor valorado = el de mejor nota de alojamiento (a igualdad,
      el más barato), sin repetir el destino anterior.
   5. El más exótico = el más barato de los marcados como exóticos,
      sin repetir destino.
   6. ahorroPct = cuánto más barato es que la media de los viables. */

const AEROPUERTO_ORIGEN = { Madrid: "MAD", Barcelona: "BCN" };

// Las fechas para las que se buscaron los precios de destinos.js. Los
// precios de alojamiento de la tabla son de estas 2 noches.
const FECHAS_REFERENCIA = { salida: "2026-11-13", llegada: "2026-11-15" };
const NOCHES_REFERENCIA = 2;

// Los precios vivos están en la tabla "destinos" de Supabase, que el
// admin edita desde admin.html. Se piden una vez por página y
// sustituyen a los de js/destinos.js; si Supabase no responde, se
// quedan los del archivo (por eso sigue existiendo).
let destinosCargados = false;

async function cargarDestinos() {
  if (destinosCargados || !window.supabase) return;
  destinosCargados = true;
  try {
    const respuesta = await clienteSupabase()
      .from("destinos")
      .select("id, datos")
      .order("orden");
    if (respuesta.error || !respuesta.data || respuesta.data.length === 0) return;
    DESTINOS.length = 0;
    respuesta.data.forEach(function (fila) {
      DESTINOS.push(Object.assign({ id: fila.id }, fila.datos));
    });
  } catch (e) {
    // Sin conexión: seguimos con js/destinos.js.
  }
}

function redondear(n) {
  return Math.round(n * 100) / 100;
}

// Noches entre dos fechas "AAAA-MM-DD". Sin fechas válidas, las de
// referencia.
function nochesEntre(salida, llegada) {
  const ms = new Date(llegada + "T00:00:00Z") - new Date(salida + "T00:00:00Z");
  const noches = Math.round(ms / 86400000);
  return noches >= 1 ? noches : NOCHES_REFERENCIA;
}

// Junta en un solo objeto todo lo necesario para un destino desde un
// origen. Devuelve null si falta algún dato (destino no disponible).
// El alojamiento se escala del precio por noche de referencia a las
// noches del viaje.
function calcularOpcion(d, origen, compartido, noches) {
  const vuelo = d.vuelos[origen];
  if (!vuelo || vuelo.precio == null) return null;

  const traslado = d.traslados[vuelo.aeropuerto];
  if (!traslado || traslado.precioIdaVuelta == null) return null;

  // Si acepta compartido pero el destino no tiene, se usa el privado.
  const tipoAlojamiento = compartido && d.alojamiento.compartido ? "compartido" : "privado";
  const alojamiento = d.alojamiento[tipoAlojamiento];
  if (!alojamiento || alojamiento.precio2Noches == null) return null;

  const precioNoche = alojamiento.precio2Noches / NOCHES_REFERENCIA;
  const precioAlojamiento = Math.round(precioNoche * noches);

  return {
    d: d,
    vuelo: vuelo,
    traslado: traslado,
    alojamiento: alojamiento,
    tipoAlojamiento: tipoAlojamiento,
    noches: noches,
    precioNoche: precioNoche,
    precioAlojamiento: precioAlojamiento,
    total: Math.round(vuelo.precio + traslado.precioIdaVuelta + precioAlojamiento),
  };
}

function aTarjeta(op, tipoTarjeta, media) {
  return {
    id: op.d.id,
    tipoTarjeta: tipoTarjeta,
    destino: op.d.destino,
    pais: op.d.pais,
    precioTotal: op.total,
    precioTransporte: op.vuelo.precio,
    precioTraslado: op.traslado.precioIdaVuelta,
    precioHotel: op.precioAlojamiento,
    precioHotelNoche: redondear(op.precioNoche),
    noches: op.noches,
    nota: op.alojamiento.nota,
    tipoAlojamiento: op.tipoAlojamiento,
    vueloDirecto: op.vuelo.directo,
    ahorroPct: Math.max(0, Math.round(((media - op.total) / media) * 100)),
  };
}

/**
 * Devuelve { trips, minimo }: trips es el Top 3 (puede tener menos de 3
 * o estar vacío) y minimo es el viaje más barato posible desde ese
 * origen, para decirle al usuario cuánto tendría que subir.
 */
function calcularTop3(origen, presupuesto, compartido, noches) {
  const opciones = DESTINOS.map(function (d) {
    return calcularOpcion(d, origen, compartido, noches);
  }).filter(Boolean);

  const minimo = opciones.length
    ? Math.min.apply(null, opciones.map(function (op) { return op.total; }))
    : null;

  const viables = opciones
    .filter(function (op) { return op.total <= presupuesto; })
    .sort(function (a, b) { return a.total - b.total; });

  if (viables.length === 0) return { trips: [], minimo: minimo };

  const media = viables.reduce(function (s, op) { return s + op.total; }, 0) / viables.length;
  const usados = [];
  const trips = [];

  function anadir(op, tipoTarjeta) {
    if (!op) return;
    usados.push(op.d.id);
    trips.push(aTarjeta(op, tipoTarjeta, media));
  }

  function libres() {
    return viables.filter(function (op) { return usados.indexOf(op.d.id) === -1; });
  }

  // viables ya está ordenado de más barato a más caro.
  anadir(viables[0], "barato");

  const porNota = libres().sort(function (a, b) {
    return b.alojamiento.nota - a.alojamiento.nota || a.total - b.total;
  });
  anadir(porNota[0], "valorado");

  const exoticos = libres().filter(function (op) { return op.d.exotico; });
  anadir(exoticos[0], "exotico");

  return { trips: trips, minimo: minimo };
}

function enlaceVuelos(origen, aeropuerto, salida, llegada) {
  const q = "Flights from " + AEROPUERTO_ORIGEN[origen] + " to " + aeropuerto + " on " + salida + " through " + llegada;
  return "https://www.google.com/travel/flights?hl=" + idiomaActual() + "&curr=EUR&q=" + encodeURIComponent(q);
}

// Busca en Booking el alojamiento concreto ("Nombre, Ciudad"), para que
// salga el primero en vez de una lista de toda la ciudad.
function enlaceAlojamiento(nombre, ciudad, salida, llegada) {
  const params = new URLSearchParams({
    ss: nombre + ", " + ciudad,
    checkin: salida,
    checkout: llegada,
    group_adults: "1",
    no_rooms: "1",
    lang: idiomaActual() === "en" ? "en-gb" : "es",
  });
  return "https://www.booking.com/searchresults.es.html?" + params.toString();
}

/**
 * Pide a Supabase la parte protegida de un destino (alojamiento exacto,
 * horarios, traslado...). Si no hay sesión, la regla RLS hace que el
 * servidor no devuelva nada y aquí llega null.
 */
async function pedirDatosProtegidos(id) {
  const respuesta = await clienteSupabase()
    .from("detalles_destino")
    .select("datos")
    .eq("id", id)
    .maybeSingle();
  if (respuesta.error || !respuesta.data) return null;
  return respuesta.data.datos;
}

/**
 * Detalle completo de un destino para una búsqueda. Devuelve null si
 * el destino no existe, no está disponible desde ese origen o el
 * servidor no da los datos protegidos (sin sesión).
 */
async function calcularDetalle(id, origen, compartido, fechaSalida, fechaLlegada) {
  const d = DESTINOS.find(function (x) { return x.id === id; });
  if (!d) return null;

  const salida = fechaSalida || FECHAS_REFERENCIA.salida;
  const llegada = fechaLlegada || FECHAS_REFERENCIA.llegada;

  const op = calcularOpcion(d, origen, compartido, nochesEntre(salida, llegada));
  if (!op) return null;

  const privado = await pedirDatosProtegidos(id);
  if (!privado) return null;

  // Se juntan los precios (públicos) con los datos protegidos.
  const vuelo = Object.assign({}, op.vuelo, privado.vuelos[origen]);
  const alojamiento = Object.assign({}, op.alojamiento, privado.alojamiento[op.tipoAlojamiento]);
  const traslado = Object.assign({}, op.traslado, privado.traslados[op.vuelo.aeropuerto]);
  op.vuelo = vuelo;
  op.alojamiento = alojamiento;
  op.traslado = traslado;

  const ida = op.vuelo.ida.split(" → ");
  const vuelta = op.vuelo.vuelta.split(" → ");

  const detalle = aTarjeta(op, d.exotico ? "exotico" : "valorado", op.total);
  return Object.assign(detalle, {
    origen: origen,
    fechaSalida: salida,
    fechaLlegada: llegada,
    transporte: {
      idaSalida: ida[0],
      idaLlegada: ida[1],
      vueltaSalida: vuelta[0],
      vueltaLlegada: vuelta[1],
      tipo: "Vuelo",
      operador: op.vuelo.aerolinea,
      aeropuerto: op.vuelo.aeropuerto,
      aviso: op.vuelo.aviso || "",
    },
    traslado: op.traslado,
    hotel: {
      nombre: op.alojamiento.nombre,
      tipo: op.alojamiento.tipo,
      direccion: op.alojamiento.barrio,
      personas: op.alojamiento.personas || null,
      nochesIncluidas: op.noches,
    },
    enlaceAfiliadoTransporte: enlaceVuelos(origen, op.vuelo.aeropuerto, salida, llegada),
    enlaceAfiliadoHotel: enlaceAlojamiento(op.alojamiento.nombre, d.destino, salida, llegada),
  });
}

// "2026-10-22" → "22/10/2026", para el rótulo de precios revisados.
function fechaRevisionLegible() {
  const p = FECHA_REVISION_PRECIOS.split("-");
  return p[2] + "/" + p[1] + "/" + p[0];
}

function textoAvisoPrecios() {
  return t(
    "Estimación orientativa: vuelos con precios de referencia del 13 al 15 de noviembre y " +
      "alojamiento según su precio por noche, revisados el {fecha}. No es una oferta: el " +
      "precio final lo pone cada proveedor. Los enlaces de reserva pueden ser comerciales.",
    { fecha: fechaRevisionLegible() }
  );
}
