/* =========================================================
   CheapScape — autenticación con Supabase
   =========================================================
   Sustituye a la versión que hablaba con el backend antiguo
   (/api/auth/...). Mantiene los mismos nombres de función para no
   tocar el resto del sitio: estaAutenticado(), esAdmin(),
   emailActual(), cerrarSesion(). Entrar y crear cuenta son funciones
   separadas: iniciarSesion() y crearCuenta().

   Las funciones síncronas (estaAutenticado, emailActual...) solo leen
   la sesión que Supabase guarda en localStorage, para pintar el header
   al instante. Eso NO es seguridad: lo que de verdad protege el
   detalle es la regla RLS de la base de datos, que comprueba la sesión
   en el servidor de Supabase.

   Necesita js/config.js antes. Las funciones que hablan con Supabase
   (iniciarSesion, crearCuenta, clienteSupabase...) necesitan además la librería
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

// Solo para enseñar u ocultar el panel. Quien decide de verdad es
// Supabase: las reglas RLS y admin_usuarios() miran el mismo rol en
// el token (ver supabase/admin.sql).
function esAdmin() {
  const sesion = sesionGuardada();
  const meta = sesion && sesion.user && sesion.user.app_metadata;
  return Boolean(meta && meta.role === "admin");
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

const MENSAJE_YA_EXISTE = t("Ya hay una cuenta con ese email. Entra desde la pestaña «Entrar».");

/**
 * Entra con una cuenta que ya existe. Devuelve { ok: true } o
 * { ok: false, error }. Supabase no dice si el email existe o si la
 * contraseña está mal (para que nadie pueda averiguar qué emails están
 * registrados), así que el mensaje cubre los dos casos.
 */
async function iniciarSesion(email, password) {
  try {
    const { error } = await clienteSupabase().auth.signInWithPassword({ email, password });
    if (!error) return { ok: true };
    if (error.code === "invalid_credentials") {
      return { ok: false, error: t("Email o contraseña incorrectos. Si aún no tienes cuenta, créala en la pestaña «Crear cuenta».") };
    }
    return { ok: false, error: traducirError(error) };
  } catch (e) {
    return { ok: false, error: t("No se pudo contactar con el servidor.") };
  }
}

/**
 * Crea una cuenta nueva y deja la sesión iniciada. Devuelve { ok: true }
 * o { ok: false, error }.
 */
async function crearCuenta(email, password) {
  try {
    const { data, error } = await clienteSupabase().auth.signUp({ email, password });
    if (error) {
      return { ok: false, error: error.code === "user_already_exists" ? MENSAJE_YA_EXISTE : traducirError(error) };
    }

    // Si el email ya estaba registrado, según cómo esté configurado
    // Supabase no da error pero devuelve un usuario sin "identities".
    if (data.user && data.user.identities && data.user.identities.length === 0) {
      return { ok: false, error: MENSAJE_YA_EXISTE };
    }

    if (!data.session) {
      return { ok: false, error: t("Te hemos enviado un email para confirmar la cuenta. Ábrelo y vuelve a entrar.") };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: t("No se pudo contactar con el servidor.") };
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
      return { ok: false, error: t("No se pudo conectar con Google. Inténtalo de nuevo.") };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: t("No se pudo contactar con el servidor.") };
  }
}

const MENSAJE_CUENTA_SUSPENDIDA =
  t("Tu cuenta está suspendida. Si crees que es un error, escríbenos a hola@cheapscape.com.");

/**
 * Pregunta a Supabase si la sesión guardada sigue valiendo (no la han
 * cerrado ni han baneado al usuario). Si el servidor dice que no, la
 * borra y devuelve false. Si no hay conexión, no toca nada.
 */
async function comprobarSesionEnServidor() {
  if (!estaAutenticado() || !window.supabase) return estaAutenticado();
  try {
    const { error } = await clienteSupabase().auth.getUser();
    if (error && error.status >= 400 && error.status < 500) {
      cerrarSesion();
      return false;
    }
  } catch (e) {
    // Sin conexión: mejor no echar a nadie.
  }
  return true;
}

function traducirError(error) {
  const mensajes = {
    user_banned: MENSAJE_CUENTA_SUSPENDIDA,
    weak_password: "La contraseña es demasiado débil. Usa al menos 6 caracteres.",
    over_email_send_rate_limit: "Demasiados intentos. Espera unos minutos y vuelve a probar.",
    over_request_rate_limit: "Demasiados intentos. Espera unos minutos y vuelve a probar.",
    email_address_invalid: "Ese email no es válido.",
    email_not_confirmed: "Tienes que confirmar tu email antes de entrar.",
  };
  return t(mensajes[error.code] || "No se pudo iniciar sesión. Inténtalo de nuevo.");
}
