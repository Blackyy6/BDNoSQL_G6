const { createCrudPage: createStadiumPage } = window.LeonesFrontend;

createStadiumPage({
  title: "Estadios",
  singular: "Estadio",
  endpoint: "/api/estadios",
  description: "Administra escenarios deportivos, capacidad y superficie de juego.",
  context: "El estadio es una entidad maestra utilizada por el modelo Partido.",
  formDescription: "Registra sedes disponibles para competencia y entrenamiento.",
  listDescription: "Listado general de estadios con ubicacion y capacidad.",
  fields: [
    { name: "nombre", label: "Nombre", type: "text", required: true },
    { name: "ubicacion", label: "Ubicacion", type: "text", required: true },
    { name: "capacidad", label: "Capacidad", type: "number", required: true },
    { name: "tipo_superficie", label: "Tipo de superficie", type: "text", required: true }
  ],
  columns: [
    { label: "Nombre", value: (record) => record.nombre || "-" },
    { label: "Ubicacion", value: (record) => record.ubicacion || "-" },
    { label: "Capacidad", value: (record) => record.capacidad || 0 },
    { label: "Superficie", value: (record) => record.tipo_superficie || "-" }
  ],
  searchable: (record) => [record.nombre, record.ubicacion, record.tipo_superficie],
  stats: (state) => {
    const capacity = state.records.reduce((sum, item) => sum + (Number(item.capacidad) || 0), 0);
    const surfaces = new Set(state.records.map((item) => item.tipo_superficie).filter(Boolean));
    return [state.records.length, capacity, surfaces.size, state.editingId ? "Edicion" : "Creacion"];
  }
});
