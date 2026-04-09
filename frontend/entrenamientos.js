const { createCrudPage: createTrainingPage, formatDate: formatTrainingDate, textOf: trainingText } = window.LeonesFrontend;

createTrainingPage({
  title: "Entrenamientos",
  singular: "Entrenamiento",
  endpoint: "/api/entrenamientos",
  description: "Agenda sesiones tecnicas con equipo, entrenador y objetivo deportivo.",
  context: "La vista muestra equipo y entrenador relacionados mediante populate para leer nombres y categoria del equipo.",
  formDescription: "Programa entrenamientos con horario de inicio, fin y objetivo.",
  listDescription: "Consulta sesiones planificadas por fecha, equipo y cuerpo tecnico.",
  related: {
    equipos: {
      endpoint: "/api/equipos",
      label: (item) => item.nombre_equipo
    },
    entrenadores: {
      endpoint: "/api/entrenadores",
      label: (item) => item.nombre
    }
  },
  fields: [
    { name: "equipo_id", label: "Equipo", type: "select", required: true, relatedKey: "equipos" },
    { name: "entrenador_id", label: "Entrenador", type: "select", required: true, relatedKey: "entrenadores" },
    { name: "fecha", label: "Fecha", type: "date", required: true },
    { name: "hora_inicio", label: "Hora de inicio", type: "time", required: true },
    { name: "hora_fin", label: "Hora de fin", type: "time", required: true },
    { name: "objetivo", label: "Objetivo", type: "textarea", required: true }
  ],
  columns: [
    { label: "Fecha", value: (record) => formatTrainingDate(record.fecha) },
    { label: "Equipo", value: (record) => record.equipo_id?.nombre_equipo || trainingText(record.equipo_id) },
    {
      label: "Categoria",
      value: (record) => record.equipo_id?.categoria_id?.nombre_categoria || "Sin categoria"
    },
    { label: "Entrenador", value: (record) => record.entrenador_id?.nombre || trainingText(record.entrenador_id) },
    { label: "Horario", value: (record) => `${record.hora_inicio || "--"} - ${record.hora_fin || "--"}` },
    { label: "Objetivo", value: (record) => record.objetivo || "-" }
  ],
  searchable: (record) => [
    record.equipo_id?.nombre_equipo,
    record.equipo_id?.categoria_id?.nombre_categoria,
    record.entrenador_id?.nombre,
    record.objetivo
  ],
  stats: (state) => {
    const teams = new Set(state.records.map((item) => item.equipo_id?._id || item.equipo_id).filter(Boolean));
    const coaches = new Set(state.records.map((item) => item.entrenador_id?._id || item.entrenador_id).filter(Boolean));
    return [state.records.length, teams.size, coaches.size, state.editingId ? "Edicion" : "Creacion"];
  }
});
