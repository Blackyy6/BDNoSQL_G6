const { createCrudPage: createPlayerPage, formatDate, textOf } = window.LeonesFrontend;

createPlayerPage({
  title: "Jugadores",
  singular: "Jugador",
  endpoint: "/api/jugadores",
  description: "Administra plantilla, salud, equipo y categoria del jugador.",
  context: "El modelo Jugador referencia Categoria y Equipo, y conserva el contacto de emergencia embebido.",
  formDescription: "Completa datos personales, deportivos y contacto de emergencia.",
  listDescription: "Listado de jugadores con categoria, equipo y estado de salud.",
  related: {
    categorias: {
      endpoint: "/api/categorias",
      label: (item) => `${item.nombre_categoria} (${item.rango_edad})`
    },
    equipos: {
      endpoint: "/api/equipos",
      label: (item) => item.nombre_equipo
    }
  },
  fields: [
    { name: "nombre", label: "Nombre", type: "text", required: true },
    { name: "fecha_nacimiento", label: "Fecha de nacimiento", type: "date", required: true },
    { name: "edad", label: "Edad", type: "number", required: true },
    { name: "posicion", label: "Posicion", type: "text", required: true },
    { name: "categoria_id", label: "Categoria", type: "select", relatedKey: "categorias" },
    { name: "equipo_id", label: "Equipo", type: "select", relatedKey: "equipos" },
    { name: "estado_salud", label: "Estado de salud", type: "text", required: true },
    {
      name: "contacto_nombre",
      label: "Contacto de emergencia",
      type: "text",
      required: true,
      fromRecord: (record) => record.contacto_emergencia?.nombre || "",
      toPayload: (payload, value) => {
        payload.contacto_emergencia = payload.contacto_emergencia || {};
        payload.contacto_emergencia.nombre = value;
      }
    },
    {
      name: "contacto_telefono",
      label: "Telefono de emergencia",
      type: "text",
      required: true,
      fromRecord: (record) => record.contacto_emergencia?.telefono || "",
      toPayload: (payload, value) => {
        payload.contacto_emergencia = payload.contacto_emergencia || {};
        payload.contacto_emergencia.telefono = value;
      }
    }
  ],
  columns: [
    { label: "Nombre", value: (record) => record.nombre || "-" },
    { label: "Nacimiento", value: (record) => formatDate(record.fecha_nacimiento) },
    { label: "Edad", value: (record) => record.edad || "-" },
    { label: "Posicion", value: (record) => record.posicion || "-" },
    { label: "Categoria", value: (record) => record.categoria_id?.nombre_categoria || textOf(record.categoria_id) },
    { label: "Equipo", value: (record) => record.equipo_id?.nombre_equipo || textOf(record.equipo_id, "Sin equipo") },
    { label: "Salud", value: (record) => record.estado_salud || "-" },
    {
      label: "Contacto",
      value: (record) =>
        record.contacto_emergencia
          ? `${record.contacto_emergencia.nombre} (${record.contacto_emergencia.telefono})`
          : "-"
    }
  ],
  searchable: (record) => [
    record.nombre,
    record.posicion,
    record.estado_salud,
    record.categoria_id?.nombre_categoria,
    record.equipo_id?.nombre_equipo
  ],
  stats: (state) => {
    const teams = new Set(state.records.map((item) => item.equipo_id?._id || item.equipo_id).filter(Boolean));
    const positions = new Set(state.records.map((item) => item.posicion).filter(Boolean));
    return [state.records.length, teams.size, positions.size, state.editingId ? "Edicion" : "Creacion"];
  }
});
