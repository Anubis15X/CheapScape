/* Filtro de la página "Top Chollos": muestra/oculta las tarjetas del
   Top 10 según el botón de categoría pulsado (data-filtro en el botón
   vs. data-categoria en cada tarjeta). */

const filtros = document.querySelectorAll(".filter-btn");
const tarjetas = document.querySelectorAll("#top10-row .trip-card");

filtros.forEach(function (boton) {
  boton.addEventListener("click", function () {
    filtros.forEach(function (b) {
      b.classList.remove("active");
    });
    boton.classList.add("active");

    const filtro = boton.dataset.filtro;
    tarjetas.forEach(function (tarjeta) {
      const coincide = filtro === "todos" || tarjeta.dataset.categoria === filtro;
      tarjeta.hidden = !coincide;
    });
  });
});
