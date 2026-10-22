/* Lógica de la pantalla de detalle (viaje.html):
   1. Si no hay "sesión", muestra el bloqueo (401 real del backend).
   2. Si hay sesión, pide el detalle a /api/viajes/:id (requiere los
      datos de la búsqueda original, guardados en sessionStorage por
      resultados.js, porque el id se deriva de ellos).
   3. Pinta el itinerario, el alojamiento y el precio. */

const BUSQUEDA_STORAGE_KEY = "cheapscape_last_busqueda";

const bloqueadoEl = document.getElementById("bloqueado");
const cargandoEl = document.getElementById("cargando");
const detalleEl = document.getElementById("detalle");

// Mismos degradados que resultados.js, por tipo de tarjeta. Van
// debajo de la foto del destino y solo se ven si la foto no carga.
const FONDOS = {
  barato: "linear-gradient(160deg, #f3c7a4 0%, #c8532a 100%)",
  valorado: "linear-gradient(160deg, #8fd4ce 0%, #1d6b68 100%)",
  exotico: "linear-gradient(160deg, #f6d388 0%, #b9792b 100%)",
};

function formatearFecha(iso) {
  if (!iso) return "";
  const partes = iso.split("-");
  if (partes.length !== 3) return iso;
  const fecha = new Date(Number(partes[0]), Number(partes[1]) - 1, Number(partes[2]));
  return fecha.toLocaleDateString(localeActual(), { day: "numeric", month: "short", year: "numeric" });
}

function pintarDetalle(detalle) {
  document.getElementById("detalle-titulo").textContent = t("Tu viaje a {destino}", { destino: t(detalle.destino) });

  const origenTxt = detalle.origen ? t("Desde {origen}", { origen: detalle.origen }) : "";
  const fechasTxt =
    detalle.fechaSalida && detalle.fechaLlegada
      ? formatearFecha(detalle.fechaSalida) + " → " + formatearFecha(detalle.fechaLlegada)
      : "";
  document.getElementById("detalle-subtitulo").textContent =
    fechasTxt
      ? t("Estos son los horarios y tu alojamiento ({fechas}).", { fechas: fechasTxt })
      : t("Estos son los horarios y tu alojamiento.");
  document.getElementById("detalle-origen").textContent = [origenTxt, fechasTxt]
    .filter(Boolean)
    .join(" · ");

  document.getElementById("ida-tipo").textContent = t("{tipo} de ida", { tipo: t(detalle.transporte.tipo) });
  document.getElementById("ida-horario").textContent =
    detalle.transporte.idaSalida + " → " + detalle.transporte.idaLlegada + " · " + detalle.transporte.operador;

  const tr = detalle.traslado;
  document.getElementById("traslado-info").textContent =
    t("{medio} ({operador}) hasta {llegada}", { medio: tr.medio, operador: tr.operador, llegada: tr.llegaA }) +
    (tr.duracion ? " · " + tr.duracion : "") +
    " · " + (tr.precioIdaVuelta === 0 ? t("gratis") : tr.precioIdaVuelta + "€");

  document.getElementById("estancia-info").textContent =
    t("{noches} noches en {destino}", { noches: detalle.hotel.nochesIncluidas, destino: t(detalle.destino) });

  const avisoEl = document.getElementById("detalle-aviso");
  if (detalle.transporte.aviso) {
    avisoEl.textContent = "⚠️ " + detalle.transporte.aviso;
    avisoEl.hidden = false;
  }

  document.getElementById("aviso-precios").textContent = textoAvisoPrecios();

  document.getElementById("vuelta-tipo").textContent = t("{tipo} de vuelta", { tipo: t(detalle.transporte.tipo) });
  document.getElementById("vuelta-horario").textContent =
    detalle.transporte.vueltaSalida + " → " + detalle.transporte.vueltaLlegada + " · " + detalle.transporte.operador;

  const hotelFotoEl = document.getElementById("hotel-foto");
  hotelFotoEl.style.backgroundImage =
    "url('imagenes/destinos/" + detalle.id + ".jpg'), " + (FONDOS[detalle.tipoTarjeta] || FONDOS.valorado);
  // Es una foto de la ciudad, no del alojamiento: que quede claro.
  hotelFotoEl.innerHTML = '<span class="badge glass-dark">📍 ' + t(detalle.destino) + "</span>";

  document.getElementById("hotel-nombre").textContent = detalle.hotel.nombre;
  document.getElementById("hotel-direccion").textContent = detalle.hotel.direccion;
  document.getElementById("hotel-estrellas").textContent =
    (detalle.tipoAlojamiento === "compartido"
      ? (detalle.hotel.personas
        ? t("Cama en {tipo} de {personas} personas", { tipo: detalle.hotel.tipo, personas: detalle.hotel.personas })
        : t("Cama en {tipo} compartido", { tipo: detalle.hotel.tipo }))
      : detalle.hotel.tipo.charAt(0).toUpperCase() + detalle.hotel.tipo.slice(1)) +
    " · " + t("nota") + " " + formatearNota(detalle.nota) + "/10";

  document.getElementById("precio-total").textContent = detalle.precioTotal + "€";

  const btnTransporte = document.getElementById("btn-reservar-transporte");
  btnTransporte.textContent =
    t("Reservar vuelo ({precio}€)", { precio: detalle.precioTransporte });
  btnTransporte.href = detalle.enlaceAfiliadoTransporte;

  const btnHotel = document.getElementById("btn-reservar-hotel");
  btnHotel.textContent = t("Reservar alojamiento ({precio}€)", { precio: detalle.precioHotel });
  btnHotel.href = detalle.enlaceAfiliadoHotel;

  // Los dos enlaces van a webs externas: se abren en otra pestaña.
  [btnTransporte, btnHotel].forEach(function (btn) {
    btn.target = "_blank";
    btn.rel = "noopener sponsored";
  });

  cargandoEl.hidden = true;
  detalleEl.hidden = false;
}

// Marca "Explorar" como activo (ver mismo comentario en resultados.js).
document.querySelectorAll('.nav-link[href="index.html"]').forEach(function (link) {
  link.classList.add("active");
});

(async function () {
  if (!estaAutenticado()) {
    cargandoEl.hidden = true;
    bloqueadoEl.hidden = false;
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  let busqueda = {};
  try {
    busqueda = JSON.parse(window.sessionStorage.getItem(BUSQUEDA_STORAGE_KEY)) || {};
  } catch (e) {
    busqueda = {};
  }

  if (!id || !busqueda.origen) {
    cargandoEl.hidden = true;
    bloqueadoEl.hidden = false;
    return;
  }

  const resultado = await obtenerDetalleViaje(id, busqueda);

  if (!resultado.ok) {
    cargandoEl.hidden = true;
    bloqueadoEl.hidden = false;
    return;
  }

  // El tipo de tarjeta (barato/valorado/exotico) llega en la URL para
  // pintar el mismo color que en el Top 3.
  if (params.get("tipo")) resultado.detalle.tipoTarjeta = params.get("tipo");

  // Expuesto para que js/pdfItinerario.js pueda generar el PDF con
  // estos mismos datos sin tener que volver a pedirlos.
  window.cheapscapeDetalleActual = resultado.detalle;
  pintarDetalle(resultado.detalle);
})();
