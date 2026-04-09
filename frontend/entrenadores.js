const { createCrudPage: createCoachPage } = window.LeonesFrontend;

createCoachPage({
  title: "Entrenadores",
  singular: "Entrenador",
  endpoint: "/api/entrenadores",
  description: "Gestiona cuerpo tecnico, especialidades y disponibilidad.",
  context: "Los entrenadores se relacionan con equipos y entrenamientos mediante entrenador_id.",
  formDescription: "Completa la ficha tecnica y administrativa del entrenador.",
  listDescription: "Consulta entrenadores con experiencia, especialidad y estado operativo.",
  fields: [
    { name: "nombre", label: "Nombre", type: "text", required: true },
    { name: "especialidad", label: "Especialidad", type: "text", required: true },
    { name: "experiencia", label: "Experiencia (años)", type: "number", required: true },
    { name: "telefono", label: "Telefono", type: "text", required: true },
    { name: "correo", label: "Correo", type: "email", required: true },
    { name: "estado", label: "Estado", type: "text", required: true }
  ],
  columns: [
    { label: "Nombre", value: (record) => record.nombre || "-" },
    { label: "Especialidad", value: (record) => record.especialidad || "-" },
    { label: "Experiencia", value: (record) => `${record.experiencia || 0} años` },
    { label: "Telefono", value: (record) => record.telefono || "-" },
    { label: "Correo", value: (record) => record.correo || "-" },
    { label: "Estado", value: (record) => record.estado || "-" }
  ],
  searchable: (record) => [record.nombre, record.especialidad, record.correo, record.estado],
  stats: (state) => {
    const active = state.records.filter((item) => String(item.estado || "").toLowerCase().includes("activo")).length;
    const specialties = new Set(state.records.map((item) => item.especialidad).filter(Boolean));
    return [state.records.length, active, specialties.size, state.editingId ? "Edicion" : "Creacion"];
  }
});
