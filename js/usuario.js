/* "Mi cuenta": enseña los datos de la sesión guardada por Supabase
   (email, cómo entró y fecha de alta). Si no hay sesión, al login. */

const NOMBRES_METODO = { email: "Email y contraseña", google: "Google" };

if (!estaAutenticado()) {
  window.location.href = "login.html";
} else {
  const usuario = (sesionGuardada() || {}).user || {};
  const meta = usuario.user_metadata || {};
  const metodos = (usuario.app_metadata && usuario.app_metadata.providers) || [];

  // El nombre solo existe si entró con Google; con email, saludo genérico.
  const nombre = (meta.full_name || meta.name || "").split(" ")[0];
  if (nombre) {
    document.getElementById("cuenta-saludo").textContent = t("Hola, {nombre}", { nombre: nombre });
  }

  const email = emailActual();
  document.getElementById("cuenta-email").textContent = email || t("(sin email guardado)");
  document.getElementById("cuenta-avatar").textContent = (nombre || email || "?").charAt(0).toUpperCase();

  document.getElementById("cuenta-metodo").textContent =
    metodos.map(function (m) { return t(NOMBRES_METODO[m] || m); }).join(" · ") || t("Email y contraseña");

  document.getElementById("cuenta-alta").textContent = usuario.created_at
    ? new Date(usuario.created_at).toLocaleDateString(localeActual(), { day: "numeric", month: "long", year: "numeric" })
    : "—";

  document.getElementById("cuenta-admin").hidden = !esAdmin();

  // Si el servidor ya no reconoce la sesión (baneado o cerrada desde
  // otro sitio), fuera.
  comprobarSesionEnServidor().then(function (valida) {
    if (!valida) window.location.href = "login.html";
  });

  document.getElementById("btn-cerrar-sesion").addEventListener("click", function () {
    cerrarSesion();
    window.location.href = "index.html";
  });
}
