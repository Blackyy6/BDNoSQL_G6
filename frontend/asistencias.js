const {
  createCrudPage: createAttendancePage,
  formatDate: formatAttendanceDate,
  textOf: attendanceText,
  fetchJson
} = window.LeonesFrontend;

createAttendancePage({
  title: "Asistencias",
  singular: "Asistencia",
  endpoint: "/api/asistencias",
  description: "Registra presencia o ausencia por jugador y equipo.",
  context: "El backend devuelve jugador y equipo poblados, y expone un resumen agrupado por jugador y por equipo.",
  formDescription: "Marca la asistencia diaria del jugador dentro de su equipo.",
  listDescription: "Consulta registros con observacion y estado de asistencia.",
  related: {
    jugadores: {
      endpoint: "/api/jugadores",
      label: (item) => `${item.nombre} - ${item.equipo_id?.nombre_equipo || "Sin equipo"}`
    },
    equipos: {
      endpoint: "/api/equipos",
      label: (item) => item.nombre_equipo
    }
  },
  fields: [
    { name: "jugador_id", label: "Jugador", type: "select", required: true, relatedKey: "jugadores" },
    { name: "equipo_id", label: "Equipo", type: "select", required: true, relatedKey: "equipos" },
    { name: "fecha", label: "Fecha", type: "date", required: true },
    { name: "asistio", label: "Asistio", type: "checkbox" },
    { name: "observacion", label: "Observacion", type: "textarea" }
  ],
  columns: [
    { label: "Fecha", value: (record) => formatAttendanceDate(record.fecha) },
    { label: "Jugador", value: (record) => record.jugador_id?.nombre || attendanceText(record.jugador_id) },
    { label: "Equipo", value: (record) => record.equipo_id?.nombre_equipo || attendanceText(record.equipo_id) },
    { label: "Categoria", value: (record) => record.equipo_id?.categoria_id?.nombre_categoria || "Sin categoria" },
    { label: "Asistencia", value: (record) => (record.asistio ? "Presente" : "Ausente") },
    { label: "Observacion", value: (record) => record.observacion || "-" }
  ],
  searchable: (record) => [
    record.jugador_id?.nombre,
    record.equipo_id?.nombre_equipo,
    record.equipo_id?.categoria_id?.nombre_categoria,
    record.observacion,
    record.asistio ? "presente" : "ausente"
  ],
  stats: (state) => {
    const presentes = state.records.filter((item) => item.asistio).length;
    return [
      state.records.length,
      presentes,
      state.records.length - presentes,
      state.editingId ? "Edicion" : "Creacion"
    ];
  },
  renderExtra: async (state, elements) => {
    try {
      const resumen = await fetchJson("/api/asistencias/resumen");

      elements.extra.innerHTML = `
        <article class="summary-card">
          <p class="eyebrow">Conteo por jugador</p>
          <h3>Resumen individual</h3>
          <div class="table-shell">
            <table>
              <thead>
                <tr><th>Jugador</th><th>Categoria</th><th>Total</th><th>Presentes</th><th>Ausencias</th></tr>
              </thead>
              <tbody>
                ${resumen.por_jugador.map((item) => `<tr><td>${item.jugador}</td><td>${item.categoria}</td><td>${item.total}</td><td>${item.presentes}</td><td>${item.ausencias}</td></tr>`).join("") || '<tr><td colspan="5">Sin datos</td></tr>'}
              </tbody>
            </table>
          </div>
        </article>
        <article class="summary-card">
          <p class="eyebrow">Conteo por equipo</p>
          <h3>Resumen grupal</h3>
          <div class="table-shell">
            <table>
              <thead>
                <tr><th>Equipo</th><th>Categoria</th><th>Total</th><th>Presentes</th><th>Ausencias</th></tr>
              </thead>
              <tbody>
                ${resumen.por_equipo.map((item) => `<tr><td>${item.equipo}</td><td>${item.categoria}</td><td>${item.total}</td><td>${item.presentes}</td><td>${item.ausencias}</td></tr>`).join("") || '<tr><td colspan="5">Sin datos</td></tr>'}
              </tbody>
            </table>
          </div>
        </article>
      `;
    } catch (error) {
      elements.extra.innerHTML = `
        <article class="summary-card">
          <p class="eyebrow">Resumen</p>
          <h3>No se pudo cargar el conteo</h3>
          <p>${error.message}</p>
        </article>
      `;
    }
  }
});
