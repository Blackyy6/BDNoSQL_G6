const baseURL = 'http://localhost:3000/jugador';

async function cargarJugadores() {
  try {
    const res = await fetch(baseURL);
    if (!res.ok) throw new Error('Error al obtener jugadores');

    const jugadores = await res.json();
    const ul = document.getElementById('lista-jugadores');
    ul.innerHTML = '';

    jugadores.forEach(jugador => {
      const li = document.createElement('li');
      li.textContent = `${jugador.nombre} - ${jugador.posicion} - Edad: ${jugador.edad}`;

      const btnBorrar = document.createElement('button');
      btnBorrar.textContent = 'Eliminar';
      btnBorrar.onclick = () => borrarJugador(jugador._id);

      li.appendChild(btnBorrar);
      ul.appendChild(li);
    });
  } catch (error) {
    console.error('Error cargando jugadores:', error);
  }
}

async function agregarJugador(event) {
  event.preventDefault();

  const form = event.target;
  const data = {
    nombre: form.nombre.value,
    fecha_nacimiento: form.fecha_nacimiento.value,
    edad: Number(form.edad.value),
    posicion: form.posicion.value,
    categoria_id: form.categoria_id.value || null,
    equipo_id: form.equipo_id.value || null,
    estado_salud: form.estado_salud.value,
    contacto_emergencia: {
      nombre: form.contacto_nombre.value,
      telefono: form.contacto_telefono.value,
    }
  };

  try {
    const res = await fetch(baseURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error('Error al agregar jugador');

    form.reset();
    cargarJugadores();
  } catch (error) {
    console.error(error);
  }
}

async function borrarJugador(id) {
  try {
    const res = await fetch(`${baseURL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Error al eliminar jugador');

    cargarJugadores();
  } catch (error) {
    console.error(error);
  }
}

document.getElementById('form-jugador').addEventListener('submit', agregarJugador);

cargarJugadores();