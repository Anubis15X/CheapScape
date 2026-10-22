/* Menú hamburguesa móvil: abre/cierra, y además se cierra solo al
   hacer scroll, al pulsar un enlace de dentro o al tocar fuera de él
   (antes se quedaba abierto ocupando media pantalla). */

const navToggle = document.getElementById("nav-toggle");
const navMobile = document.getElementById("main-nav-mobile");

function cerrarMenuMobile() {
  if (!navMobile || navMobile.hidden) return;
  navMobile.hidden = true;
  if (navToggle) navToggle.textContent = "☰";
}

if (navToggle && navMobile) {
  navToggle.addEventListener("click", function (event) {
    event.stopPropagation();
    navMobile.hidden = !navMobile.hidden;
    navToggle.textContent = navMobile.hidden ? "☰" : "✕";
  });

  // Cerrar al elegir una sección del menú.
  navMobile.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", cerrarMenuMobile);
  });

  // Cerrar al hacer scroll (se quedaba fijo tapando la página).
  window.addEventListener(
    "scroll",
    function () {
      cerrarMenuMobile();
    },
    { passive: true }
  );

  // Cerrar al tocar/clicar fuera del menú y del botón que lo abre.
  document.addEventListener("click", function (event) {
    if (navMobile.hidden) return;
    if (navMobile.contains(event.target) || navToggle.contains(event.target)) return;
    cerrarMenuMobile();
  });
}
