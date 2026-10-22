/* Panel de administración: usuarios (solo lectura) y editor de los
   precios de cada destino.

   esAdmin() solo decide si se enseña la página. Lo que protege los
   datos está en Supabase (supabase/admin.sql): admin_usuarios() da
   error si no eres admin y la regla RLS de "destinos" no deja guardar
   a nadie más. */

const NOMBRES_METODO_ADMIN = { email: "Email", google: "Google" };
const ORIGENES = ["Madrid", "Barcelona"];

if (!esAdmin()) {
  window.location.href = estaAutenticado() ? "usuario.html" : "login.html";
} else {
  cargarUsuarios();
  cargarDestinosAdmin();
  document.getElementById("btn-refrescar").addEventListener("click", cargarUsuarios);
}

function fechaCorta(iso) {
  return iso ? new Date(iso).toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" }) : "—";
}

function celda(texto) {
  const td = document.createElement("td");
  td.textContent = texto;
  return td;
}

// ---------- Usuarios ----------

// Opciones del desplegable de baneo: días (0 = para siempre).
const OPCIONES_BANEO = [
  { dias: 1, texto: "1 día" },
  { dias: 7, texto: "7 días" },
  { dias: 30, texto: "30 días" },
  { dias: 0, texto: "Para siempre" },
];

// Pregunta en un modal de la página y devuelve una promesa con true
// (Sí) o false (Cancelar, clic fuera o Escape).
function confirmar(mensaje) {
  const overlay = document.getElementById("confirmar-overlay");
  const si = document.getElementById("confirmar-si");
  const no = document.getElementById("confirmar-no");
  document.getElementById("confirmar-texto").textContent = mensaje;
  overlay.classList.add("open");
  no.focus();

  return new Promise(function (resolver) {
    function cerrar(respuesta) {
      overlay.classList.remove("open");
      si.removeEventListener("click", alSi);
      no.removeEventListener("click", alNo);
      overlay.removeEventListener("click", alFuera);
      document.removeEventListener("keydown", alTecla);
      resolver(respuesta);
    }
    function alSi() { cerrar(true); }
    function alNo() { cerrar(false); }
    function alFuera(e) { if (e.target === overlay) cerrar(false); }
    function alTecla(e) { if (e.key === "Escape") cerrar(false); }
    si.addEventListener("click", alSi);
    no.addEventListener("click", alNo);
    overlay.addEventListener("click", alFuera);
    document.addEventListener("keydown", alTecla);
  });
}

function avisoUsuarios(mensaje, esError) {
  const aviso = document.getElementById("usuarios-aviso");
  aviso.textContent = mensaje;
  aviso.classList.toggle("es-error", Boolean(esError));
}

// Llama a una función de Supabase (admin_cambiar_rol, admin_banear,
// admin_eliminar), enseña el resultado y recarga la lista. Los errores
// vienen del propio servidor ("Solo administradores", "No puedes...").
async function accionUsuario(funcion, parametros, textoOk) {
  avisoUsuarios("Un momento...");
  const respuesta = await clienteSupabase().rpc(funcion, parametros);
  if (respuesta.error) {
    avisoUsuarios("No se ha podido: " + respuesta.error.message, true);
    return;
  }
  avisoUsuarios(textoOk);
  cargarUsuarios();
}

function boton(texto, clase, alPulsar) {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "btn glass btn-glass btn-small " + (clase || "");
  b.textContent = texto;
  b.addEventListener("click", alPulsar);
  return b;
}

function estadoUsuario(u) {
  if (!u.baneado_hasta) return "Activo";
  // Más de 50 años = "para siempre" (la función guarda 100).
  if (new Date(u.baneado_hasta).getFullYear() - new Date().getFullYear() > 50) return "Baneado para siempre";
  return "Baneado hasta " + fechaCorta(u.baneado_hasta);
}

function accionesUsuario(u, esUnoMismo) {
  const td = document.createElement("td");
  const caja = document.createElement("div");
  caja.className = "admin-acciones";
  td.appendChild(caja);

  if (esUnoMismo) {
    const span = document.createElement("span");
    span.className = "admin-destino-extra";
    span.textContent = "(tu cuenta)";
    caja.appendChild(span);
    return td;
  }

  caja.appendChild(boton(u.es_admin ? "Quitar admin" : "Hacer admin", "", async function () {
    const nuevo = u.es_admin ? "usuario" : "admin";
    const pregunta = u.es_admin
      ? "¿Quitar el rol de administrador a " + u.email + "?"
      : "¿Hacer administrador a " + u.email + "? Podrá cambiar precios y gestionar usuarios.";
    if (!(await confirmar(pregunta))) return;
    accionUsuario("admin_cambiar_rol", { p_id: u.id, p_rol: nuevo },
      u.email + (nuevo === "admin" ? " ya es administrador." : " ya no es administrador."));
  }));

  if (u.baneado_hasta) {
    caja.appendChild(boton("Quitar baneo", "", function () {
      accionUsuario("admin_banear", { p_id: u.id, p_dias: null }, u.email + " puede volver a entrar.");
    }));
  } else {
    const select = document.createElement("select");
    select.className = "admin-select";
    select.setAttribute("aria-label", "Banear a " + u.email);
    const primera = document.createElement("option");
    primera.value = "";
    primera.textContent = "Banear…";
    select.appendChild(primera);
    OPCIONES_BANEO.forEach(function (op) {
      const option = document.createElement("option");
      option.value = String(op.dias);
      option.textContent = op.texto;
      select.appendChild(option);
    });
    select.addEventListener("change", async function () {
      if (select.value === "") return;
      const op = OPCIONES_BANEO.find(function (o) { return String(o.dias) === select.value; });
      if (!(await confirmar("¿Banear a " + u.email + " (" + op.texto.toLowerCase() + ")? Se cerrará su sesión."))) {
        select.value = "";
        return;
      }
      accionUsuario("admin_banear", { p_id: u.id, p_dias: op.dias }, u.email + " baneado (" + op.texto.toLowerCase() + ").");
    });
    caja.appendChild(select);
  }

  caja.appendChild(boton("Eliminar", "btn-danger", async function () {
    if (!(await confirmar("¿Eliminar la cuenta de " + u.email + "? Se borra para siempre y no se puede deshacer."))) return;
    accionUsuario("admin_eliminar", { p_id: u.id }, "Cuenta de " + u.email + " eliminada.");
  }));

  return td;
}

async function cargarUsuarios() {
  const tbody = document.getElementById("tabla-usuarios");
  tbody.innerHTML = '<tr><td colspan="7">Cargando...</td></tr>';

  const respuesta = await clienteSupabase().rpc("admin_usuarios");
  if (respuesta.error) {
    tbody.innerHTML = "";
    const fila = document.createElement("tr");
    const td = celda("No se pudo cargar la lista. ¿Has ejecutado supabase/admin.sql y supabase/admin_usuarios.sql?");
    td.colSpan = 7;
    fila.appendChild(td);
    tbody.appendChild(fila);
    return;
  }
  const miId = ((sesionGuardada() || {}).user || {}).id;

  const usuarios = respuesta.data;
  const haceUnaSemana = Date.now() - 7 * 86400000;
  document.getElementById("stat-total").textContent = usuarios.length;
  document.getElementById("stat-google").textContent = usuarios.filter(function (u) {
    return (u.metodos || []).indexOf("google") !== -1;
  }).length;
  document.getElementById("stat-semana").textContent = usuarios.filter(function (u) {
    return new Date(u.alta).getTime() >= haceUnaSemana;
  }).length;

  tbody.innerHTML = "";
  usuarios.forEach(function (u) {
    const fila = document.createElement("tr");
    fila.appendChild(celda(u.email));
    fila.appendChild(celda((u.metodos || []).map(function (m) { return NOMBRES_METODO_ADMIN[m] || m; }).join(" · ") || "—"));
    fila.appendChild(celda(fechaCorta(u.alta)));
    fila.appendChild(celda(fechaCorta(u.ultimo_acceso)));
    fila.appendChild(celda(u.es_admin ? "Administrador" : "Usuario"));
    fila.appendChild(celda(estadoUsuario(u)));
    fila.appendChild(accionesUsuario(u, u.id === miId));
    tbody.appendChild(fila);
  });
}

// ---------- Destinos ----------

async function cargarDestinosAdmin() {
  const lista = document.getElementById("lista-destinos");
  const respuesta = await clienteSupabase()
    .from("destinos")
    .select("id, datos, actualizado")
    .order("orden");

  if (respuesta.error || !respuesta.data.length) {
    lista.textContent = "No se pudieron cargar los destinos. ¿Has ejecutado supabase/admin.sql?";
    return;
  }

  document.getElementById("stat-destinos").textContent = respuesta.data.length;
  lista.innerHTML = "";
  respuesta.data.forEach(function (fila) {
    lista.appendChild(tarjetaDestino(fila));
  });
}

// Lee o escribe un valor dentro de "datos" con una ruta tipo
// "vuelos.Madrid.precio".
function leerRuta(obj, ruta) {
  return ruta.split(".").reduce(function (o, k) { return o ? o[k] : undefined; }, obj);
}

function escribirRuta(obj, ruta, valor) {
  const partes = ruta.split(".");
  const ultima = partes.pop();
  const padre = partes.reduce(function (o, k) { return o[k]; }, obj);
  padre[ultima] = valor;
}

// Un campo del formulario. tipo: "precio", "nota" o "check".
function campo(etiqueta, ruta, tipo, datos) {
  const label = document.createElement("label");
  label.className = "admin-campo";
  const valor = leerRuta(datos, ruta);

  const input = document.createElement("input");
  input.dataset.ruta = ruta;
  input.dataset.tipo = tipo;
  if (tipo === "check") {
    input.type = "checkbox";
    input.checked = Boolean(valor);
    label.classList.add("admin-campo-check");
    label.appendChild(input);
    label.appendChild(document.createTextNode(etiqueta));
    return label;
  }

  input.type = "number";
  input.min = "0";
  input.step = "0.01";
  if (tipo === "nota") input.max = "10";
  input.value = valor == null ? "" : valor;

  const span = document.createElement("span");
  span.textContent = etiqueta;
  label.appendChild(span);
  label.appendChild(input);
  return label;
}

function grupo(titulo, campos) {
  const fs = document.createElement("fieldset");
  fs.className = "admin-grupo";
  const legend = document.createElement("legend");
  legend.textContent = titulo;
  fs.appendChild(legend);
  campos.forEach(function (c) { fs.appendChild(c); });
  return fs;
}

function tarjetaDestino(fila) {
  const d = fila.datos;
  const details = document.createElement("details");
  details.className = "admin-destino";

  const summary = document.createElement("summary");
  const nombre = document.createElement("strong");
  nombre.textContent = d.destino;
  const extra = document.createElement("span");
  extra.className = "admin-destino-extra";
  extra.textContent = d.pais + " · actualizado " + fechaCorta(fila.actualizado);
  summary.appendChild(nombre);
  summary.appendChild(extra);
  details.appendChild(summary);

  const form = document.createElement("form");
  form.className = "admin-form";

  const vuelos = [];
  ORIGENES.forEach(function (origen) {
    if (!d.vuelos[origen]) return;
    vuelos.push(campo("Desde " + origen + " (€, a " + d.vuelos[origen].aeropuerto + ")", "vuelos." + origen + ".precio", "precio", d));
    vuelos.push(campo("Directo", "vuelos." + origen + ".directo", "check", d));
  });
  form.appendChild(grupo("Vuelo ida y vuelta", vuelos));

  form.appendChild(grupo("Alojamiento (precio de 2 noches)", [
    campo("Privado (€)", "alojamiento.privado.precio2Noches", "precio", d),
    campo("Nota privado", "alojamiento.privado.nota", "nota", d),
    campo("Compartido (€)", "alojamiento.compartido.precio2Noches", "precio", d),
    campo("Nota compartido", "alojamiento.compartido.nota", "nota", d),
  ]));

  form.appendChild(grupo("Traslado aeropuerto ↔ centro", Object.keys(d.traslados).map(function (aeropuerto) {
    return campo(aeropuerto + " ida y vuelta (€)", "traslados." + aeropuerto + ".precioIdaVuelta", "precio", d);
  })));

  form.appendChild(grupo("Otros", [campo("Cuenta como exótico", "exotico", "check", d)]));

  const pie = document.createElement("div");
  pie.className = "admin-form-pie";
  const boton = document.createElement("button");
  boton.type = "submit";
  boton.className = "btn btn-accent btn-small";
  boton.textContent = "Guardar cambios";
  const aviso = document.createElement("p");
  aviso.className = "admin-guardado";
  aviso.setAttribute("role", "status");
  pie.appendChild(boton);
  pie.appendChild(aviso);
  form.appendChild(pie);

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    aviso.classList.remove("es-error");

    const nuevos = JSON.parse(JSON.stringify(d));
    const inputs = form.querySelectorAll("input[data-ruta]");
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      if (input.dataset.tipo === "check") {
        escribirRuta(nuevos, input.dataset.ruta, input.checked);
        continue;
      }
      // Vacío = sin dato: ese destino no saldrá desde ese origen.
      if (input.value.trim() === "") {
        escribirRuta(nuevos, input.dataset.ruta, null);
        continue;
      }
      const numero = Number(input.value);
      const maximo = input.dataset.tipo === "nota" ? 10 : Infinity;
      if (!isFinite(numero) || numero < 0 || numero > maximo) {
        aviso.textContent = "Revisa los números: no pueden ser negativos y la nota va de 0 a 10.";
        aviso.classList.add("es-error");
        input.focus();
        return;
      }
      escribirRuta(nuevos, input.dataset.ruta, numero);
    }

    boton.disabled = true;
    aviso.textContent = "Guardando...";
    const ahora = new Date().toISOString();
    const respuesta = await clienteSupabase()
      .from("destinos")
      .update({ datos: nuevos, actualizado: ahora })
      .eq("id", fila.id)
      .select("id");
    boton.disabled = false;

    // Si la regla RLS no deja guardar, Supabase no da error: devuelve 0 filas.
    if (respuesta.error || !respuesta.data || respuesta.data.length === 0) {
      aviso.textContent = "No se ha guardado: el servidor no te reconoce como admin.";
      aviso.classList.add("es-error");
      return;
    }

    Object.assign(d, nuevos);
    extra.textContent = d.pais + " · actualizado " + fechaCorta(ahora);
    aviso.textContent = "Guardado. Ya se usa en la web.";
  });

  details.appendChild(form);
  return details;
}
