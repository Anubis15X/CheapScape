/* Lógica de la landing: valida el formulario de búsqueda (origen es un
   <select> con las provincias de España agrupadas por comunidad
   autónoma, fechas es un <input type="date"> con calendario nativo) y
   navega a resultados.html pasando origen, fechas y presupuesto como
   parámetros en la URL (?origen=...&fechas=...&presupuesto=...). */

const form = document.getElementById("search-form");

// Rótulo de "estimación orientativa" bajo el buscador (texto en motor.js).
document.getElementById("aviso-precios").textContent = textoAvisoPrecios();
const errorEl = document.getElementById("search-error");
const fechaSalidaEl = document.getElementById("fecha-salida");
const fechaLlegadaEl = document.getElementById("fecha-llegada");

// Fix informe UX #1 (crítico): el formulario aceptaba fechas pasadas
// sin avisar. Salida no puede ser antes de hoy, y Vuelta no puede ser
// antes que la Salida elegida.
const hoyISO = new Date().toISOString().slice(0, 10);
fechaSalidaEl.min = hoyISO;
fechaLlegadaEl.min = hoyISO;

fechaSalidaEl.addEventListener("change", function () {
  fechaLlegadaEl.min = fechaSalidaEl.value || hoyISO;
  if (fechaLlegadaEl.value && fechaLlegadaEl.value < fechaLlegadaEl.min) {
    fechaLlegadaEl.value = "";
  }
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const origen = document.getElementById("origen").value.trim();
  const fechaSalida = fechaSalidaEl.value.trim();
  const fechaLlegada = fechaLlegadaEl.value.trim();
  const presupuesto = Number(document.getElementById("presupuesto").value);

  if (!origen) {
    mostrarError(t("Dinos desde dónde viajas."));
    return;
  }
  if (!fechaSalida) {
    mostrarError(t("Elige una fecha de salida."));
    return;
  }
  if (fechaSalida < hoyISO) {
    mostrarError(t("La fecha de salida no puede ser anterior a hoy."));
    return;
  }
  if (!fechaLlegada) {
    mostrarError(t("Elige una fecha de vuelta."));
    return;
  }
  if (fechaLlegada <= fechaSalida) {
    mostrarError(t("La vuelta tiene que ser al menos un día después de la salida."));
    return;
  }
  if (!presupuesto || presupuesto <= 0) {
    mostrarError(t("El presupuesto tiene que ser mayor que 0€."));
    return;
  }

  ocultarError();

  const params = new URLSearchParams({
    origen: origen,
    fecha_salida: fechaSalida,
    fecha_llegada: fechaLlegada,
    presupuesto: String(presupuesto),
  });
  if (document.getElementById("compartido").checked) {
    params.set("compartido", "1");
  }

  window.location.href = "resultados.html?" + params.toString();
});

function mostrarError(mensaje) {
  errorEl.textContent = mensaje;
  errorEl.classList.remove("is-empty");
}

function ocultarError() {
  errorEl.textContent = "";
  errorEl.classList.add("is-empty");
}

// El mensaje de error se quedaba visible aunque el usuario ya hubiera
// corregido el campo que fallaba, así que lo ocultamos en cuanto toca
// cualquier campo del buscador.
form.querySelectorAll("input, select").forEach(function (campo) {
  campo.addEventListener("input", ocultarError);
  campo.addEventListener("change", ocultarError);
});

// Botón "Buscar mi viaje" del CTA final: sube del todo para que se
// vea el buscador completo (no solo su borde superior) y deja el
// cursor listo en el campo de origen.
const ctaBuscar = document.getElementById("cta-buscar");
if (ctaBuscar) {
  ctaBuscar.addEventListener("click", function (event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    const origenSelect = document.getElementById("origen");
    if (origenSelect) {
      setTimeout(function () {
        origenSelect.focus();
      }, 400);
    }
  });
}

// Mismo comportamiento, pero llegando desde como-funciona.html o
// top-chollos.html: esas páginas enlazan a
// "index.html?ir_a_buscador=1" porque el buscador no está en ellas.
// Antes enlazaban con href="index.html#search-form", que no
// desplazaba del todo ni enfocaba nada, así que "no funcionaba" tal y
// como se pedía en el index.
const paramsLlegada = new URLSearchParams(window.location.search);
if (paramsLlegada.get("ir_a_buscador") === "1") {
  window.scrollTo({ top: 0, behavior: "smooth" });
  const origenSelect = document.getElementById("origen");
  if (origenSelect) {
    setTimeout(function () {
      origenSelect.focus();
    }, 400);
  }
}
