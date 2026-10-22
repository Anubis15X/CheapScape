/* Hace clicables las tarjetas de ejemplo ("Los chollos del momento"
   en index.html y el Top 10 en top-chollos.html), que antes no
   llevaban a ningún sitio. Al pulsar una, se entra al flujo de
   búsqueda real (resultados.html) con un origen de ejemplo (Madrid),
   el próximo fin de semana y un presupuesto ya relacionado con el
   precio que mostraba la tarjeta — así el usuario puede ver y ajustar
   el presupuesto, en vez de quedarse mirando una tarjeta estática.
   No toca las tarjetas de #cards-row (resultados.html), que ya tienen
   su propio botón "Ver detalles" gestionado por resultados.js. */

(function () {
  function proximoSabado() {
    const hoy = new Date();
    const dia = hoy.getDay(); // 0 = domingo ... 6 = sábado
    const diff = (6 - dia + 7) % 7 || 7;
    const sabado = new Date(hoy);
    sabado.setDate(hoy.getDate() + diff);
    return sabado;
  }

  function iso(fecha) {
    return fecha.toISOString().slice(0, 10);
  }

  document.querySelectorAll(".trip-card").forEach(function (card) {
    if (card.closest("#cards-row")) return;

    // Caption "desde Madrid" bajo el precio: antes no se sabía desde
    // dónde salía ese precio de ejemplo.
    const priceRow = card.querySelector(".price-row");
    const body = card.querySelector(".trip-card-body");
    // Solo si la tarjeta tiene un precio de verdad (con los precios aún
    // por revisar no hay nada que explicar).
    if (priceRow && body && card.querySelector(".price") && !card.querySelector(".price-origin")) {
      const caption = document.createElement("p");
      caption.className = "price-origin";
      caption.textContent = "Precio de ejemplo, ida y vuelta desde Madrid";
      body.insertBefore(caption, priceRow);
    }

    card.style.cursor = "pointer";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");

    function irABusqueda() {
      const precioEl = card.querySelector(".price");
      const precio = precioEl ? parseInt(precioEl.textContent, 10) : 150;
      const salida = proximoSabado();
      const llegada = new Date(salida);
      llegada.setDate(salida.getDate() + 1);

      const params = new URLSearchParams({
        origen: "Madrid",
        fecha_salida: iso(salida),
        fecha_llegada: iso(llegada),
        presupuesto: String(Math.max((precio || 150) + 25, 70)),
        compartido: "1",
      });
      window.location.href = "resultados.html?" + params.toString();
    }

    card.addEventListener("click", function (event) {
      if (event.target.closest("a, button")) return;
      irABusqueda();
    });

    card.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        irABusqueda();
      }
    });
  });
})();
