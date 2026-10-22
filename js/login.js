/* Login con Supabase (js/auth.js): intenta entrar y, si la cuenta no
   existe todavía, la crea. Antes hay que marcar la casilla de
   "política de privacidad leída y términos aceptados". */

const loginForm = document.getElementById("login-form");
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const loginError = document.getElementById("login-error");
const loginBoton = loginForm.querySelector("button[type=submit]");

const loginOauthAviso = document.getElementById("login-oauth-aviso");
const loginGoogle = document.getElementById("login-google");

// A dónde ir después de entrar: al detalle del viaje si venimos del
// modal de resultados (?volver=viaje.html?...), si no a "Mi cuenta".
// Solo se acepta viaje.html para que nadie pueda usar este enlace para
// mandar al usuario a otra web.
function destinoTrasLogin() {
  const volver = new URLSearchParams(window.location.search).get("volver") || "";
  return /^viaje\.html\?/.test(volver) ? volver : "usuario.html";
}

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
        : "No se pudo entrar con Google. Inténtalo de nuevo o usa tu email.";
      loginOauthAviso.classList.add("visible");
    }
  })();
} else if (estaAutenticado()) {
  window.location.href = destinoTrasLogin();
}

loginGoogle.addEventListener("click", async function () {
  if (!document.getElementById("login-privacidad").checked) {
    loginOauthAviso.textContent = "Tienes que marcar la casilla de privacidad y términos.";
    loginOauthAviso.classList.add("visible");
    return;
  }

  loginOauthAviso.classList.remove("visible");
  loginGoogle.disabled = true;

  const volver = destinoTrasLogin();
  const resultado = await iniciarConGoogle(volver === "usuario.html" ? "" : volver);

  if (!resultado.ok) {
    loginGoogle.disabled = false;
    loginOauthAviso.textContent = resultado.error;
    loginOauthAviso.classList.add("visible");
  }
});

loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = loginEmail.value.trim();
  const password = loginPassword.value;
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!emailValido) {
    mostrarErrorLogin("Escribe un email válido.");
    return;
  }
  if (password.length < 6) {
    mostrarErrorLogin("La contraseña debe tener al menos 6 caracteres.");
    return;
  }
  if (!document.getElementById("login-privacidad").checked) {
    mostrarErrorLogin("Tienes que marcar la casilla de privacidad y términos.");
    return;
  }

  loginBoton.disabled = true;
  loginBoton.textContent = "Entrando...";

  const resultado = await iniciarOcrearSesion(email, password);

  loginBoton.disabled = false;
  loginBoton.textContent = "Entrar";

  if (!resultado.ok) {
    mostrarErrorLogin(resultado.error);
    return;
  }

  window.location.href = destinoTrasLogin();
});

[loginEmail, loginPassword].forEach(function (campo) {
  campo.addEventListener("input", function () {
    loginError.classList.remove("visible");
  });
});

function mostrarErrorLogin(mensaje) {
  loginError.textContent = mensaje;
  loginError.classList.add("visible");
}
