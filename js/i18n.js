/* =========================================================
   CheapScape — idiomas (español / inglés)
   =========================================================
   La web está escrita en español. El inglés sale del diccionario
   TEXTOS_EN (js/textos-en.js), cuya clave es el propio texto en
   español, así que el HTML no lleva etiquetas especiales.

   - t("texto en español", { variable: valor }) devuelve el texto en el
     idioma elegido, con {variable} sustituido. Lo usan los JS para
     todo lo que pintan (tarjetas, errores, PDF...).
   - En inglés, al cargar la página se recorren sus textos y se cambian
     los que estén en el diccionario: primero bloques enteros (un
     párrafo con sus enlaces), luego textos sueltos y atributos
     (placeholder, aria-label, alt, title).
   - El interruptor ES | EN se añade solo al header. Al cambiar se
     guarda la elección y se recarga la página.

   Si un texto en español cambia y no se actualiza su clave en
   TEXTOS_EN, en inglés ese texto sale en español (no se rompe nada).

   Se carga antes que el resto de JS de cada página, justo después de
   js/textos-en.js. */

const IDIOMA_STORAGE_KEY = "cheapscape_idioma";

function idiomaActual() {
  try {
    return window.localStorage.getItem(IDIOMA_STORAGE_KEY) === "en" ? "en" : "es";
  } catch (e) {
    return "es";
  }
}

// Para fechas y números: "13 nov 2026" o "13 Nov 2026".
function localeActual() {
  return idiomaActual() === "en" ? "en-GB" : "es-ES";
}

// Nota con un decimal: "8,4" en español, "8.4" en inglés.
function formatearNota(nota) {
  const texto = Number(nota).toFixed(1);
  return idiomaActual() === "en" ? texto : texto.replace(".", ",");
}

function normalizarTexto(texto) {
  return String(texto).replace(/\s+/g, " ").trim();
}

function t(texto, variables) {
  let resultado = texto;
  if (idiomaActual() === "en" && typeof TEXTOS_EN !== "undefined") {
    const traducido = TEXTOS_EN[normalizarTexto(texto)];
    if (traducido != null) resultado = traducido;
  }
  if (variables) {
    Object.keys(variables).forEach(function (nombre) {
      resultado = resultado.split("{" + nombre + "}").join(variables[nombre]);
    });
  }
  return resultado;
}

// Etiquetas que pueden ir dentro de un bloque traducido entero. Si un
// elemento lleva algo más (un icono svg, un input...), solo se traducen
// sus textos sueltos para no borrar esas piezas.
const ETIQUETAS_EN_LINEA = ["A", "STRONG", "EM", "B", "I", "BR", "SPAN", "CODE", "SMALL", "ABBR"];

function soloEnLinea(el) {
  const hijos = el.getElementsByTagName("*");
  for (let i = 0; i < hijos.length; i++) {
    if (ETIQUETAS_EN_LINEA.indexOf(hijos[i].tagName) === -1) return false;
  }
  return true;
}

// Un bloque se traduce entero solo si tiene texto propio además de sus
// etiquetas (un párrafo con un enlace dentro). Un menú, que solo tiene
// enlaces, se traduce enlace a enlace.
function tieneTextoPropio(el) {
  for (let i = 0; i < el.childNodes.length; i++) {
    const n = el.childNodes[i];
    if (n.nodeType === 3 && n.nodeValue.trim()) return true;
  }
  return false;
}

// Traducción de un texto suelto. Si empieza por un número de ranking
// ("#3 💸 Baratos"), se traduce lo de detrás.
function traducirTexto(clave) {
  if (TEXTOS_EN[clave] != null) return TEXTOS_EN[clave];
  const ranking = clave.match(/^(#\d+\s+)(.+)$/);
  if (ranking && TEXTOS_EN[ranking[2]] != null) return ranking[1] + TEXTOS_EN[ranking[2]];
  return null;
}

function traducirPagina() {
  if (idiomaActual() !== "en" || typeof TEXTOS_EN === "undefined") return;

  // 1. Bloques enteros, de fuera hacia dentro.
  const hechos = [];
  document.querySelectorAll("body *").forEach(function (el) {
    if (el.tagName === "SCRIPT" || el.tagName === "STYLE") return;
    if (hechos.some(function (h) { return h.contains(el); })) return;
    if (!el.children.length || !tieneTextoPropio(el) || !soloEnLinea(el)) return;
    const traducido = TEXTOS_EN[normalizarTexto(el.textContent)];
    if (traducido != null) {
      el.innerHTML = traducido;
      hechos.push(el);
    }
  });

  // 2. Textos sueltos (conservando los espacios de alrededor).
  const recorrido = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let nodo;
  while ((nodo = recorrido.nextNode())) {
    const padre = nodo.parentElement;
    if (!padre || padre.tagName === "SCRIPT" || padre.tagName === "STYLE") continue;
    const clave = normalizarTexto(nodo.nodeValue);
    if (!clave) continue;
    const traducido = traducirTexto(clave);
    if (traducido != null) {
      const antes = nodo.nodeValue.match(/^\s*/)[0];
      const despues = nodo.nodeValue.match(/\s*$/)[0];
      nodo.nodeValue = antes + traducido + despues;
    }
  }

  // 3. Atributos.
  ["placeholder", "aria-label", "alt", "title", "label"].forEach(function (atributo) {
    document.querySelectorAll("[" + atributo + "]").forEach(function (el) {
      const traducido = TEXTOS_EN[normalizarTexto(el.getAttribute(atributo))];
      if (traducido != null) el.setAttribute(atributo, traducido);
    });
  });

  // 4. Título de la pestaña y descripción para buscadores.
  const titulo = TEXTOS_EN[normalizarTexto(document.title)];
  if (titulo != null) document.title = titulo;
  const descripcion = document.querySelector('meta[name="description"]');
  if (descripcion) {
    const traducida = TEXTOS_EN[normalizarTexto(descripcion.content)];
    if (traducida != null) descripcion.content = traducida;
  }
}

function cambiarIdioma(idioma) {
  try {
    window.localStorage.setItem(IDIOMA_STORAGE_KEY, idioma);
  } catch (e) {
    // Sin almacenamiento: no se puede recordar, se queda en español.
  }
  window.location.reload();
}

// Interruptor ES | EN en el header, antes del botón de cuenta.
function ponerInterruptor() {
  const header = document.querySelector(".site-header-inner");
  if (!header) return;

  const caja = document.createElement("div");
  caja.className = "idioma-switch";
  caja.setAttribute("role", "group");
  caja.setAttribute("aria-label", idiomaActual() === "en" ? "Language" : "Idioma");

  [["es", "ES", "Español"], ["en", "EN", "English"]].forEach(function (op) {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "idioma-opcion";
    boton.textContent = op[1];
    boton.lang = op[0];
    boton.title = op[2];
    boton.setAttribute("aria-pressed", String(idiomaActual() === op[0]));
    boton.addEventListener("click", function () {
      if (idiomaActual() !== op[0]) cambiarIdioma(op[0]);
    });
    caja.appendChild(boton);
  });

  const antesDe = header.querySelector(".btn-login-desktop") || header.querySelector(".nav-toggle");
  header.insertBefore(caja, antesDe);
}

document.documentElement.lang = idiomaActual();
traducirPagina();
ponerInterruptor();
