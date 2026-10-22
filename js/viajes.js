/* =========================================================
   CheapScape — cliente del buscador
   =========================================================
   Antes estas dos funciones pedían el Top 3 y el detalle al backend
   por fetch (/api/busquedas y /api/viajes/:id). Ahora los calcula
   js/motor.js: el Top 3 con la tabla pública de js/destinos.js y el
   detalle juntándola con la parte protegida de Supabase. Se mantienen
   los mismos nombres y la misma respuesta ({ ok, ... }) para que
   resultados.js y viaje.js no tengan que cambiar su forma de llamarlas,
   y para que el día que vuelva a haber backend baste con cambiar este
   archivo. Necesita destinos.js y motor.js cargados antes. */

/**
 * Pide el Top 3 para una búsqueda. Devuelve { ok: true, trips, minimo }
 * (trips puede ser un array vacío si no hay nada viable) o
 * { ok: false, error }.
 */
async function buscarTop3(origen, fechaSalida, fechaLlegada, presupuesto, compartido) {
  if (!AEROPUERTO_ORIGEN[origen]) {
    return { ok: false, error: "De momento solo buscamos viajes desde Madrid o Barcelona." };
  }
  const resultado = calcularTop3(origen, presupuesto, compartido, nochesEntre(fechaSalida, fechaLlegada));
  return { ok: true, trips: resultado.trips, minimo: resultado.minimo };
}

/**
 * Pide el detalle de un viaje. Necesita los datos de la búsqueda
 * original (origen, compartido y fechas). Devuelve { ok: true, detalle }
 * o { ok: false, error }.
 */
async function obtenerDetalleViaje(id, busqueda) {
  const b = busqueda || {};
  try {
    const detalle = await calcularDetalle(id, b.origen, Boolean(b.compartido), b.fechaSalida, b.fechaLlegada);
    if (!detalle) {
      return { ok: false, error: "No se pudo cargar el detalle." };
    }
    return { ok: true, detalle: detalle };
  } catch (e) {
    return { ok: false, error: "No se pudo contactar con el servidor." };
  }
}
