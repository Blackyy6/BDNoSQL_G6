const { createCrudPage: createTeamPage, textOf } = window.LeonesFrontend;

createTeamPage({
  title: "Equipos",
  singular: "Equipo",
  endpoint: "/api/equipos",
  description: "Controla la estructura competitiva con categoria, entrenador y plantilla.",
  context: "La API ya devuelve categoria, entrenador y lista_jugadores poblados para mostrar nombres y no solo ObjectId.",
  formDescription: "Asigna categoria, entrenador principal, lista de jugadores, puntos y estado del equipo.",
  listDescription: "Visualiza equipos con sus relaciones completas y datos deportivos.",
  related: {
    categorias: {
      endpoint: "/api/categorias",
      label: (item) => `${item.nombre_categoria} (${item.rango_edad})`
    },
    entrenadores: {
      endpoint: "/api/entrenadores",
      label: (item) => `${item.nombre} - ${item.especialidad}`
    },
    jugadores: {
      endpoint: "/api/jugadores",
      label: (item) => `${item.nombre} - ${item.posicion || "Sin posicion"}`
    }
  },
  fields: [
    { name: "nombre_equipo", label: "Nombre del equipo", type: "text", required: true },
    { name: "categoria_id", label: "Categoria", type: "select", required: true, relatedKey: "categorias" },
    { name: "entrenador_id", label: "Entrenador", type: "select", required: true, relatedKey: "entrenadores" },
    { name: "lista_jugadores", label: "Jugadores", type: "multiselect", relatedKey: "jugadores" },
    { name: "puntos", label: "Puntos", type: "number", required: true },
    { name: "estado", label: "Estado", type: "text", required: true }
  ],
  columns: [
    { label: "Equipo", value: (record) => record.nombre_equipo || "-" },
    { label: "Categoria", value: (record) => record.categoria_id?.nombre_categoria || textOf(record.categoria_id) },
    { label: "Entrenador", value: (record) => record.entrenador_id?.nombre || textOf(record.entrenador_id) },
    {
      label: "Jugadores",
      value: (record) =>
        Array.isArray(record.lista_jugadores) && record.lista_jugadores.length
          ? record.lista_jugadores.map((item) => item.nombre || textOf(item)).join(", ")
          : "Sin jugadores"
    },
    { label: "Puntos", value: (record) => record.puntos ?? 0 },
    { label: "Estado", value: (record) => record.estado || "-" }
  ],
  searchable: (record) => [
    record.nombre_equipo,
    record.categoria_id?.nombre_categoria,
    record.entrenador_id?.nombre,
    record.estado,
    ...(record.lista_jugadores || []).map((item) => item.nombre || "")
  ],
  stats: (state) => {
    const active = state.records.filter((item) => String(item.estado || "").toLowerCase().includes("activo")).length;
    const totalPlayers = state.records.reduce(
      (sum, item) => sum + (Array.isArray(item.lista_jugadores) ? item.lista_jugadores.length : 0),
      0
    );
    return [state.records.length, active, totalPlayers, state.editingId ? "Edicion" : "Creacion"];
  }
});
