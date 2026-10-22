(function () {
  if (!esAdmin()) {
    window.location.href = estaAutenticado() ? "usuario.html" : "login.html";
    return;
  }

  const tbody = document.getElementById("tabla-usuarios");
  const avisoEl = document.getElementById("admin-aviso");
  const miEmail = emailActual();

  function mostrarAviso(mensaje, esError) {
    avisoEl.textContent = mensaje;
    avisoEl.classList.add("visible");
    avisoEl.style.color = esError ? "" : "#15803d";
  }

  function ocultarAviso() {
    avisoEl.classList.remove("visible");
  }

  async function cargarUsuarios() {
    ocultarAviso();
    tbody.innerHTML = '<tr><td colspan="4">Cargando...</td></tr>';

    let usuarios = [];
    try {
      usuarios = await listarUsuarios();
    } catch (e) {
      tbody.innerHTML = '<tr><td colspan="4">' + e.message + "</td></tr>";
      return;
    }

    const hoyISO = new Date().toISOString().slice(0, 10);
    document.getElementById("stat-total").textContent = usuarios.length;
    document.getElementById("stat-admins").textContent = usuarios.filter(function (u) {
      return u.rol === "admin";
    }).length;
    document.getElementById("stat-hoy").textContent = usuarios.filter(function (u) {
      return String(u.alta).slice(0, 10) === hoyISO;
    }).length;

    tbody.innerHTML = "";
    usuarios.forEach(function (u) {
      const esUnoMismo = u.email === miEmail;
      const fila = document.createElement("tr");

      const tdAcciones = document.createElement("td");
      tdAcciones.className = "admin-acciones";

      if (esUnoMismo) {
        tdAcciones.innerHTML = '<span class="pais">(tu cuenta)</span>';
      } else {
        const btnRol = document.createElement("button");
        btnRol.className = "btn glass btn-glass btn-small";
        btnRol.type = "button";
        btnRol.textContent = u.rol === "admin" ? "Quitar admin" : "Hacer admin";
        btnRol.addEventListener("click", function () {
          cambiarRol(u, u.rol === "admin" ? "usuario" : "admin");
        });

        const btnEliminar = document.createElement("button");
        btnEliminar.className = "btn glass btn-glass btn-small btn-danger";
        btnEliminar.type = "button";
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener("click", function () {
          eliminar(u);
        });

        tdAcciones.appendChild(btnRol);
        tdAcciones.appendChild(btnEliminar);
      }

      fila.innerHTML =
        "<td>" + u.email + "</td>" +
        "<td>" + (u.rol === "admin" ? "Administrador" : "Usuario") + "</td>" +
        "<td>" + String(u.alta).slice(0, 10) + "</td>";
      fila.appendChild(tdAcciones);
      tbody.appendChild(fila);
    });
  }

  async function cambiarRol(u, nuevoRol) {
    const resultado = await cambiarRolUsuario(u.id, nuevoRol);
    if (!resultado.ok) {
      mostrarAviso(resultado.error, true);
      return;
    }
    mostrarAviso("Rol de " + u.email + " actualizado.", false);
    cargarUsuarios();
  }

  async function eliminar(u) {
    if (!window.confirm("¿Eliminar la cuenta de " + u.email + "? Esto no se puede deshacer.")) {
      return;
    }
    const resultado = await eliminarUsuario(u.id);
    if (!resultado.ok) {
      mostrarAviso(resultado.error, true);
      return;
    }
    mostrarAviso(u.email + " eliminado.", false);
    cargarUsuarios();
  }

  document.getElementById("btn-refrescar").addEventListener("click", cargarUsuarios);

  document.getElementById("btn-cerrar-sesion").addEventListener("click", function () {
    cerrarSesion();
    window.location.href = "index.html";
  });

  cargarUsuarios();
})();
