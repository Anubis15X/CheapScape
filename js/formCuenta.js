/* Formulario de cuenta con dos pestañas, "Entrar" y "Crear cuenta".
   Lo usan login.html y el modal de resultados.html, cada uno con su
   propio HTML: aquí se buscan las piezas por su atributo data-cuenta
   dentro del contenedor que se pase.

   - Entrar: email + contraseña.
   - Crear cuenta: email + contraseña + repetir contraseña + casilla de
     privacidad y términos.
   - Google: en las dos. En "Crear cuenta" pide la casilla; en "Entrar"
     se avisa debajo de que, si es la primera vez, se aceptan.

   Necesita js/auth.js antes. */

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * raiz: el elemento que contiene el formulario.
 * opciones.modo: "entrar" o "crear" (pestaña con la que empieza).
 * opciones.volverA(): a dónde volver después de Google ("" = Mi cuenta).
 * opciones.alEntrar(): qué hacer cuando entra o crea la cuenta con email.
 * Devuelve { cambiarModo(modo), limpiar() }.
 */
function prepararFormCuenta(raiz, opciones) {
  function pieza(nombre) {
    return raiz.querySelector('[data-cuenta="' + nombre + '"]');
  }

  const tabEntrar = pieza("tab-entrar");
  const tabCrear = pieza("tab-crear");
  const form = pieza("form");
  const email = pieza("email");
  const password = pieza("password");
  const repetir = pieza("repetir");
  const grupoRepetir = pieza("grupo-repetir");
  const grupoPrivacidad = pieza("grupo-privacidad");
  const privacidad = pieza("privacidad");
  const error = pieza("error");
  const boton = pieza("boton");
  const google = pieza("google");
  const avisoGoogle = pieza("aviso-google");
  const notaGoogle = pieza("nota-google");
  const titulo = pieza("titulo");

  let modo = opciones.modo === "crear" ? "crear" : "entrar";

  function mostrarError(el, mensaje) {
    el.textContent = mensaje;
    el.classList.add("visible");
  }

  function limpiar() {
    error.classList.remove("visible");
    avisoGoogle.classList.remove("visible");
  }

  function cambiarModo(nuevo) {
    modo = nuevo;
    const crear = modo === "crear";
    tabEntrar.setAttribute("aria-selected", String(!crear));
    tabCrear.setAttribute("aria-selected", String(crear));
    grupoRepetir.hidden = !crear;
    grupoPrivacidad.hidden = !crear;
    notaGoogle.hidden = crear;
    boton.textContent = crear ? "Crear cuenta" : "Entrar";
    password.autocomplete = crear ? "new-password" : "current-password";
    if (titulo) titulo.textContent = crear ? "Crear cuenta" : "Iniciar sesión";
    limpiar();
  }

  tabEntrar.addEventListener("click", function () { cambiarModo("entrar"); });
  tabCrear.addEventListener("click", function () { cambiarModo("crear"); });

  google.addEventListener("click", async function () {
    if (modo === "crear" && !privacidad.checked) {
      mostrarError(avisoGoogle, "Tienes que marcar la casilla de privacidad y términos.");
      return;
    }
    limpiar();
    google.disabled = true;
    const resultado = await iniciarConGoogle(opciones.volverA());
    if (!resultado.ok) {
      google.disabled = false;
      mostrarError(avisoGoogle, resultado.error);
    }
  });

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const valorEmail = email.value.trim();
    const valorPassword = password.value;

    if (!REGEX_EMAIL.test(valorEmail)) {
      mostrarError(error, "Escribe un email válido.");
      email.focus();
      return;
    }
    if (valorPassword.length < 6) {
      mostrarError(error, "La contraseña debe tener al menos 6 caracteres.");
      password.focus();
      return;
    }
    if (modo === "crear") {
      if (repetir.value !== valorPassword) {
        mostrarError(error, "Las dos contraseñas no coinciden.");
        repetir.focus();
        return;
      }
      if (!privacidad.checked) {
        mostrarError(error, "Tienes que marcar la casilla de privacidad y términos.");
        return;
      }
    }

    limpiar();
    boton.disabled = true;
    boton.textContent = modo === "crear" ? "Creando cuenta..." : "Entrando...";

    const resultado = modo === "crear"
      ? await crearCuenta(valorEmail, valorPassword)
      : await iniciarSesion(valorEmail, valorPassword);

    boton.disabled = false;
    boton.textContent = modo === "crear" ? "Crear cuenta" : "Entrar";

    if (!resultado.ok) {
      mostrarError(error, resultado.error);
      return;
    }
    opciones.alEntrar();
  });

  [email, password, repetir].forEach(function (campo) {
    campo.addEventListener("input", function () {
      error.classList.remove("visible");
    });
  });

  cambiarModo(modo);
  return { cambiarModo: cambiarModo, limpiar: limpiar };
}
