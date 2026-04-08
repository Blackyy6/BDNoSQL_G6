const API_URL = "http://localhost:3000/api/jugadores";

const jugadorForm = document.getElementById("jugadorForm");
const tablaJugadores = document.getElementById("tablaJugadores");

async function listarJugadores() {
  const res = await fetch(API_URL);
  const jugadores = await res.json();
  tablaJugadores.innerHTML = "";

  jugadores.forEach(j => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${j.nombre}</td>
      <td>${j.edad}</td>
      <td>${j.posicion}</td>
      <td>${j.estado_salud}</td>
      <td>${j.contacto_emergencia.nombre} (${j.contacto_emergencia.telefono})</td>
      <td>
        <button class="btn btn-sm btn-warning" onclick="editarJugador('${j._id}')">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="eliminarJugador('${j._id}')">Eliminar</button>
      </td>
    `;
    tablaJugadores.appendChild(fila);
  });
}

jugadorForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const jugadorId = document.getElementById("jugadorId").value;
  const jugadorData = {
    nombre: document.getElementById("nombre").value,
    fecha_nacimiento: document.getElementById("fecha_nacimiento").value,
    edad: document.getElementById("edad").value,
    posicion: document.getElementById("posicion").value,
    estado_salud: document.getElementById("estado_salud").value,
    contacto_emergencia: {
      nombre: document.getElementById("contacto_nombre").value,
      telefono: document.getElementById("contacto_telefono").value
    }
  };

  if (jugadorId) {
    // Actualizar
    await fetch(`${API_URL}/${jugadorId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jugadorData)
    });
  } else {
    // Crear
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jugadorData)
    });
  }

  jugadorForm.reset();
  document.getElementById("jugadorId").value = "";
  listarJugadores();
});

window.editarJugador = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  const j = await res.json();

  document.getElementById("jugadorId").value = j._id;
  document.getElementById("nombre").value = j.nombre;
  document.getElementById("fecha_nacimiento").value = j.fecha_nacimiento.split("T")[0];
  document.getElementById("edad").value = j.edad;
  document.getElementById("posicion").value = j.posicion;
  document.getElementById("estado_salud").value = j.estado_salud;
  document.getElementById("contacto_nombre").value = j.contacto_emergencia.nombre;
  document.getElementById("contacto_telefono").value = j.contacto_emergencia.telefono;
};

window.eliminarJugador = async (id) => {
  if (confirm("¿Seguro que quieres eliminar este jugador?")) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    listarJugadores();
  }
};

// Al cargar la página
listarJugadores();