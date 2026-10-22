/* Lógica de la pantalla de resultados:
   1. Lee origen/fechas/presupuesto de la URL.
   2. Pide el Top 3 real a /api/busquedas (js/viajes.js).
   3. Pinta las tarjetas (o el aviso de "sin resultados viables").
   4. Al pulsar "Ver detalles": si no hay "sesión", abre el modal de
      registro (Regwall); si ya hay sesión, va directo al detalle. */

const TRIPS_STORAGE_KEY = "cheapscape_last_trips";
const BUSQUEDA_STORAGE_KEY = "cheapscape_last_busqueda";

const sinBusquedaEl = document.getElementById("sin-busqueda");
const sinResultadosEl = document.getElementById("sin-resultados");
const errorBusquedaEl = document.getElementById("error-busqueda");
const conBusquedaEl = document.getElementById("con-busqueda");
const cardsRowEl = document.getElementById("cards-row");

const ETIQUETAS = {
  barato: { label: "El más barato", emoji: "💸" },
  valorado: { label: "El mejor valorado", emoji: "⭐" },
  exotico: { label: "El más exótico", emoji: "🧭" },
};

// Degradados de reserva por si un destino no tuviera foto: uno por
// tipo de tarjeta (terracota, verde-azulado y ocre).
const FONDOS = {
  barato: "linear-gradient(160deg, #f3c7a4 0%, #c8532a 100%)",
  valorado: "linear-gradient(160deg, #8fd4ce 0%, #1d6b68 100%)",
  exotico: "linear-gradient(160deg, #f6d388 0%, #b9792b 100%)",
};

function pintarTarjeta(trip, origen) {
  const etiqueta = ETIQUETAS[trip.tipoTarjeta];

  const card = document.createElement("div");
  card.className = "trip-card glass";

  const tagsHtml = [];
  if (trip.vueloDirecto) {
    tagsHtml.push('<span class="tag">Vuelo directo</span>');
  }
  tagsHtml.push(
    '<span class="tag">' +
      (trip.tipoAlojamiento === "compartido" ? "Hostel compartido" : "Habitación privada") +
      " · " +
      trip.nota.toFixed(1).replace(".", ",") +
      "/10</span>"
  );
  if (trip.ahorroPct > 0) {
    tagsHtml.push(
      '<span class="tag tag-ahorro">Ahorras un ' + trip.ahorroPct + "% vs la media</span>"
    );
  }

  card.innerHTML =
    "<div class=\"trip-card-photo\" style=\"background-image:url('imagenes/destinos/" +
    trip.id +
    ".jpg'), " +
    FONDOS[trip.tipoTarjeta] +
    '">' +
    '<span class="badge glass-dark">' +
    etiqueta.emoji +
    " " +
    etiqueta.label +
    "</span>" +
    "</div>" +
    '<div class="trip-card-body">' +
    "<div>" +
    "<h3>" +
    trip.destino +
    "</h3>" +
    '<p class="pais">' +
    trip.pais +
    "</p>" +
    "</div>" +
    '<div class="tags">' +
    tagsHtml.join("") +
    "</div>" +
    '<div class="price-row">' +
    "<div>" +
    '<span class="price">' +
    trip.precioTotal +
    "€</span>" +
    '<p class="price-origin">Total estimado desde ' +
    origen +
    " · " +
    trip.noches +
    " noches</p>" +
    "</div>" +
    '<button class="btn btn-accent btn-ver-detalles" type="button">Ver detalles</button>' +
    "</div>" +
    "</div>";

  card.querySelector(".btn-ver-detalles").addEventListener("click", function () {
    handleVerDetalles(trip);
  });

  cardsRowEl.appendChild(card);
}

// ---------- Modal de registro (Regwall) ----------

const modalOverlay = document.getElementById("modal-overlay");
const modalDestino = document.getElementById("modal-destino");
let tripSeleccionado = null;

// Pestañas "Crear cuenta" / "Ya tengo cuenta" (ver js/formCuenta.js).
// Al entrar con email se va directo al detalle; con Google, login.html
// recoge la sesión al volver y lleva al mismo sitio.
const formModal = prepararFormCuenta(document.getElementById("modal-cuenta"), {
  modo: "crear",
  volverA: function () {
    return tripSeleccionado ? urlDetalle(tripSeleccionado) : "";
  },
  alEntrar: function () {
    const trip = tripSeleccionado;
    cerrarModal();
    if (trip) window.location.href = urlDetalle(trip);
  },
});

function urlDetalle(trip) {
  return "viaje.html?id=" + encodeURIComponent(trip.id) + "&tipo=" + encodeURIComponent(trip.tipoTarjeta);
}

function handleVerDetalles(trip) {
  if (estaAutenticado()) {
    window.location.href = urlDetalle(trip);
    return;
  }
  tripSeleccionado = trip;
  modalDestino.textContent = trip.destino;
  modalOverlay.classList.add("open");
  formModal.limpiar();
}

function cerrarModal() {
  modalOverlay.classList.remove("open");
  tripSeleccionado = null;
}

document.getElementById("modal-close").addEventListener("click", cerrarModal);

// Cerrar el modal si se hace clic fuera de la tarjeta
modalOverlay.addEventListener("click", function (event) {
  if (event.target === modalOverlay) {
    cerrarModal();
  }
});

// ---------- Arranque de la página ----------
// (va al final del archivo para poder usar las funciones/constantes
// de arriba sin preocuparse del orden de declaración)

const params = new URLSearchParams(window.location.search);
const origen = params.get("origen") || "";
const fechaSalida = params.get("fecha_salida") || params.get("fechas") || "";
const fechaLlegada = params.get("fecha_llegada") || "";
const presupuesto = Number(params.get("presupuesto") || 0);
const compartido = params.get("compartido") === "1";

// El <input type="date"> entrega la fecha como "AAAA-MM-DD"; la
// pasamos a un formato legible ("24 oct 2026") para mostrarla.
function formatearFecha(iso) {
  if (!iso) return "";
  const partes = iso.split("-");
  if (partes.length !== 3) return iso;
  const fecha = new Date(Number(partes[0]), Number(partes[1]) - 1, Number(partes[2]));
  return fecha.toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" });
}

function formatearRangoFechas(salida, llegada) {
  if (!salida && !llegada) return "Fechas por elegir";
  if (salida && llegada) return formatearFecha(salida) + " – " + formatearFecha(llegada);
  return formatearFecha(salida || llegada);
}

// Marca "Explorar" como activo: resultados.html nace siempre de una
// búsqueda hecha desde ahí, así que es la sección que tiene sentido
// resaltar (antes ningún enlace del menú se marcaba activo aquí).
document.querySelectorAll('.nav-link[href="index.html"]').forEach(function (link) {
  link.classList.add("active");
});

(async function () {
  if (!origen || !presupuesto) {
    sinBusquedaEl.hidden = false;
    conBusquedaEl.hidden = true;
    return;
  }

  document.getElementById("titulo-resultados").textContent = "Buscando tu Top 3...";
  document.getElementById("subtitulo-resultados").textContent = "";

  window.sessionStorage.setItem(
    BUSQUEDA_STORAGE_KEY,
    JSON.stringify({
      origen: origen,
      fechaSalida: fechaSalida,
      fechaLlegada: fechaLlegada,
      presupuesto: presupuesto,
      compartido: compartido,
    })
  );

  const resultado = await buscarTop3(origen, fechaSalida, fechaLlegada, presupuesto, compartido);

  if (!resultado.ok) {
    conBusquedaEl.hidden = true;
    errorBusquedaEl.hidden = false;
    document.getElementById("error-busqueda-mensaje").textContent = resultado.error;
    return;
  }

  const trips = resultado.trips;

  if (!trips || trips.length === 0) {
    // Si no hay ninguna combinación por debajo del presupuesto, se avisa
    // en vez de inventar un viaje imposible, y se dice cuánto cuesta
    // el viaje más barato desde ese origen.
    conBusquedaEl.hidden = true;
    sinResultadosEl.hidden = false;
    document.getElementById("sin-resultados-presupuesto").textContent = presupuesto + "€";
    if (resultado.minimo) {
      document.getElementById("sin-resultados-minimo").textContent =
        ": el viaje más barato desde " + origen + " sale por " + resultado.minimo + "€" +
        (compartido ? "" : " (o menos si te vale dormir en habitación compartida)");
    }
  } else {
    document.getElementById("titulo-resultados").textContent = "Tu Top " + trips.length + " desde " + origen;
    document.getElementById("subtitulo-resultados").textContent =
      "Presupuesto máximo: " + presupuesto + "€ · " + formatearRangoFechas(fechaSalida, fechaLlegada);

    document.getElementById("aviso-precios").textContent = textoAvisoPrecios();

    window.sessionStorage.setItem(TRIPS_STORAGE_KEY, JSON.stringify(trips));
    trips.forEach(function (trip) {
      pintarTarjeta(trip, origen);
    });
  }
})();
