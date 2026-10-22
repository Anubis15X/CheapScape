/* Sincroniza el botón "Iniciar sesión" del header (versión escritorio
   y versión móvil) con el estado real de la sesión simulada
   (js/auth.js). Se incluye en todas las páginas, justo después de
   auth.js. */

(function () {
  function aplicar(boton) {
    if (!boton) return;

    if (typeof estaAutenticado === "function" && estaAutenticado()) {
      // Los admin también van a "Mi cuenta"; desde ahí entran al panel.
      boton.textContent = "Mi cuenta";
      boton.onclick = function () {
        window.location.href = "usuario.html";
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
