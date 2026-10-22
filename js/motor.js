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
      vuelo + traslado aeropuerto-ciudad + alojamiento de 2 noches
      (compartido si el usuario lo acepta, si no privado).
   2. Se quedan solo los que caben en el presupuesto ("viables").
   3. El más barato = el de menor total.
   4. El mejor valorado = el de mejor nota de alojamiento (a igualdad,
      el más barato), sin repetir el destino anterior.
   5. El más exótico = el más barato de los marcados como exóticos,
      sin repetir destino.
   6. ahorroPct = cuánto más barato es que la media de los viables. */

const NOCHES = 2;

const AEROPUERTO_ORIGEN = { Madrid: "MAD", Barcelona: "BCN" };

// Las fechas para las que se buscaron los precios de destinos.js.
const FECHAS_REFERENCIA = { salida: "2026-11-13", llegada: "2026-11-15" };

function redondear(n) {
  return Math.round(n * 100) / 100;
}

// Junta en un solo objeto todo lo necesario para un destino desde un
// origen. Devuelve null si falta algún dato (destino no disponible).
function calcularOpcion(d, origen, compartido) {
  const vuelo = d.vuelos[origen];
  if (!vuelo || vuelo.precio == null) return null;

  const traslado = d.traslados[vuelo.aeropuerto];
  if (!traslado || traslado.precioIdaVuelta == null) return null;

  // Si acepta compartido pero el destino no tiene, se usa el privado.
  const tipoAlojamiento = compartido && d.alojamiento.compartido ? "compartido" : "privado";
  const alojamiento = d.alojamiento[tipoAlojamiento];
  if (!alojamiento || alojamiento.precio2Noches == null) return null;

  return {
    d: d,
    vuelo: vuelo,
    traslado: traslado,
    alojamiento: alojamiento,
    tipoAlojamiento: tipoAlojamiento,
    total: Math.round(vuelo.precio + traslado.precioIdaVuelta + alojamiento.precio2Noches),
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
    precioHotel: op.alojamiento.precio2Noches,
    precioHotelNoche: redondear(op.alojamiento.precio2Noches / NOCHES),
    noches: NOCHES,
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
function calcularTop3(origen, presupuesto, compartido) {
  const opciones = DESTINOS.map(function (d) {
    return calcularOpcion(d, origen, compartido);
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
  return "https://www.google.com/travel/flights?hl=es&curr=EUR&q=" + encodeURIComponent(q);
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
    lang: "es",
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

  const op = calcularOpcion(d, origen, compartido);
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
  const salida = fechaSalida || FECHAS_REFERENCIA.salida;
  const llegada = fechaLlegada || FECHAS_REFERENCIA.llegada;

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
      nochesIncluidas: NOCHES,
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
  return (
    "Estimación orientativa con precios de referencia del finde del 13 al 15 de noviembre, " +
    "revisados el " + fechaRevisionLegible() + ". No es una oferta: el precio final lo pone cada proveedor. " +
    "Los enlaces de reserva pueden ser comerciales."
  );
}
