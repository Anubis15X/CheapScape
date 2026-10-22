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

async function cargarUsuarios() {
  const tbody = document.getElementById("tabla-usuarios");
  tbody.innerHTML = '<tr><td colspan="5">Cargando...</td></tr>';

  const respuesta = await clienteSupabase().rpc("admin_usuarios");
  if (respuesta.error) {
    tbody.innerHTML = "";
    const fila = document.createElement("tr");
    const td = celda("No se pudo cargar la lista. ¿Has cerrado sesión y vuelto a entrar después de ejecutar supabase/admin.sql?");
    td.colSpan = 5;
    fila.appendChild(td);
    tbody.appendChild(fila);
    return;
  }

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
