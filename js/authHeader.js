/* Sincroniza el botón "Iniciar sesión" del header (versión escritorio
   y versión móvil) con el estado real de la sesión simulada
   (js/auth.js). Se incluye en todas las páginas, justo después de
   auth.js. */

(function () {
  function aplicar(boton) {
    if (!boton) return;

    if (typeof estaAutenticado === "function" && estaAutenticado()) {
      boton.textContent = esAdmin() ? "Panel admin" : "Mi cuenta";
      boton.onclick = function () {
        window.location.href = esAdmin() ? "admin.html" : "usuario.html";
      };
    } else {
      boton.textContent = "Iniciar sesión";
      boton.onclick = function () {
        window.location.href = "login.html";
      };
    }
  }

  aplicar(document.querySelector(".btn-login-desktop"));
  aplicar(document.querySelector("#main-nav-mobile .btn-login-mobile"));
})();
