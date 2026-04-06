const mongoose = require("mongoose");

const asistenciaSchema = new mongoose.Schema({
  jugador_id: { type: mongoose.Schema.Types.ObjectId, ref: "Jugador", required: true },
  equipo_id: { type: mongoose.Schema.Types.ObjectId, ref: "Equipo", required: true },
  fecha: { type: Date, required: true },
  asistio: { type: Boolean, required: true },
  observacion: { type: String }
}, {
  collection: "asistencias"
});

module.exports = mongoose.model("Asistencia", asistenciaSchema);