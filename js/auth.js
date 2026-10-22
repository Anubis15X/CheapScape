/* =========================================================
   CheapScape — autenticación con Supabase
   =========================================================
   Sustituye a la versión que hablaba con el backend antiguo
   (/api/auth/...). Mantiene los mismos nombres de función para no
   tocar el resto del sitio: estaAutenticado(), esAdmin(),
   emailActual(), cerrarSesion(), iniciarOcrearSesion().

   Las funciones síncronas (estaAutenticado, emailActual...) solo leen
   la sesión que Supabase guarda en localStorage, para pintar el header
   al instante. Eso NO es seguridad: lo que de verdad protege el
   detalle es la regla RLS de la base de datos, que comprueba la sesión
   en el servidor de Supabase.

   Necesita js/config.js antes. Las funciones que hablan con Supabase
   (iniciarOcrearSesion, clienteSupabase) necesitan además la librería
   supabase-js cargada en la página; las síncronas funcionan sin ella. */

// Donde supabase-js guarda la sesión: "sb-<id del proyecto>-auth-token".
const CHEAPSCAPE_SESION_KEY = "sb-" + new URL(SUPABASE_URL).hostname.split(".")[0] + "-auth-token";

let clienteCache = null;

function clienteSupabase() {
  if (!clienteCache) {
    clienteCache = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
  }
  return clienteCache;
}

function sesionGuardada() {
  try {
    return JSON.parse(window.localStorage.getItem(CHEAPSCAPE_SESION_KEY)) || null;
  } catch (e) {
    return null;
  }
}

function estaAutenticado() {
  const sesion = sesionGuardada();
  return Boolean(sesion && sesion.access_token);
}

// El panel de admin queda para la Fase 2: de momento nadie es admin.
function esAdmin() {
  return false;
}

function emailActual() {
  const sesion = sesionGuardada();
  return sesion && sesion.user ? sesion.user.email : "";
}

function cerrarSesion() {
  // Se borra la sesión local al momento (para que la página siguiente
  // ya no la vea) y, si la librería está cargada, se avisa a Supabase.
  window.localStorage.removeItem(CHEAPSCAPE_SESION_KEY);
  if (window.supabase) {
    clienteSupabase().auth.signOut({ scope: "local" });
  }
}

/**
 * Intenta iniciar sesión y, si la cuenta no existe, la crea. Devuelve
 * { ok: true, rol } o { ok: false, error }.
 */
async function iniciarOcrearSesion(email, password) {
  const auth = clienteSupabase().auth;

  try {
    const login = await auth.signInWithPassword({ email, password });
    if (!login.error) {
      return { ok: true, rol: "usuario" };
    }

    if (login.error.code && login.error.code !== "invalid_credentials") {
      return { ok: false, error: traducirError(login.error) };
    }

    // No ha podido entrar: o la cuenta no existe, o la contraseña está
    // mal. Probamos a registrarla.
    const registro = await auth.signUp({ email, password });
    if (registro.error) {
      return { ok: false, error: traducirError(registro.error) };
    }

    // Si el email ya estaba registrado, Supabase no da error (para no
    // revelar qué emails existen) pero devuelve un usuario sin
    // "identities": eso significa que la contraseña era incorrecta.
    const usuario = registro.data.user;
    if (usuario && usuario.identities && usuario.identities.length === 0) {
      return { ok: false, error: "La contraseña no es correcta para ese email." };
    }

    if (!registro.data.session) {
      return { ok: false, error: "Te hemos enviado un email para confirmar la cuenta. Ábrelo y vuelve a entrar." };
    }

    return { ok: true, rol: "usuario" };
  } catch (e) {
    return { ok: false, error: "No se pudo contactar con el servidor." };
  }
}

/**
 * Manda al usuario a Google. Al terminar, Google lo devuelve a Supabase
 * y Supabase a login.html, que recoge la sesión y lo lleva a `volverA`
 * (el detalle de un viaje) o a "Mi cuenta". Si todo va bien la página
 * se va, así que solo devuelve algo cuando hay error: { ok: false, error }.
 */
async function iniciarConGoogle(volverA) {
  const destino = new URL("login.html", window.location.href);
  if (volverA) {
    destino.searchParams.set("volver", volverA);
  }

  try {
    const { error } = await clienteSupabase().auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: destino.href },
    });
    if (error) {
      return { ok: false, error: "No se pudo conectar con Google. Inténtalo de nuevo." };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: "No se pudo contactar con el servidor." };
  }
}

function traducirError(error) {
  const mensajes = {
    weak_password: "La contraseña es demasiado débil. Usa al menos 6 caracteres.",
    over_email_send_rate_limit: "Demasiados intentos. Espera unos minutos y vuelve a probar.",
    over_request_rate_limit: "Demasiados intentos. Espera unos minutos y vuelve a probar.",
    email_address_invalid: "Ese email no es válido.",
    email_not_confirmed: "Tienes que confirmar tu email antes de entrar.",
  };
  return mensajes[error.code] || "No se pudo iniciar sesión. Inténtalo de nuevo.";
}
