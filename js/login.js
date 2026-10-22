/* Página de cuenta (login.html): pestañas "Entrar" y "Crear cuenta"
   (ver js/formCuenta.js). Empieza en "Entrar", o en "Crear cuenta" si
   la URL lleva ?modo=crear. También recoge la vuelta de Google. */

const loginOauthAviso = document.getElementById("login-oauth-aviso");

// A dónde ir después de entrar: al detalle del viaje si venimos del
// modal de resultados (?volver=viaje.html?...), si no a "Mi cuenta".
// Solo se acepta viaje.html para que nadie pueda usar este enlace para
// mandar al usuario a otra web.
function destinoTrasLogin() {
  const volver = new URLSearchParams(window.location.search).get("volver") || "";
  return /^viaje\.html\?/.test(volver) ? volver : "usuario.html";
}

prepararFormCuenta(document.getElementById("login-cuenta"), {
  modo: new URLSearchParams(window.location.search).get("modo") === "crear" ? "crear" : "entrar",
  volverA: function () {
    const volver = destinoTrasLogin();
    return volver === "usuario.html" ? "" : volver;
  },
  alEntrar: function () {
    window.location.href = destinoTrasLogin();
  },
});

// Al volver de Google, Supabase trae la sesión (o el error) en la URL.
const respuestaGoogle = new URLSearchParams(window.location.hash.slice(1) + "&" + window.location.search.slice(1));

if (respuestaGoogle.has("access_token") || respuestaGoogle.has("error")) {
  (async function () {
    // getSession() espera a que supabase-js lea y guarde la sesión de la URL.
    await clienteSupabase().auth.getSession();
    if (estaAutenticado()) {
      window.location.replace(destinoTrasLogin());
    } else {
      const suspendida = /banned/i.test(respuestaGoogle.get("error_description") || "");
      loginOauthAviso.textContent = suspendida
        ? MENSAJE_CUENTA_SUSPENDIDA
        : t("No se pudo entrar con Google. Inténtalo de nuevo o usa tu email.");
      loginOauthAviso.classList.add("visible");
    }
  })();
} else if (estaAutenticado()) {
  window.location.href = destinoTrasLogin();
}
