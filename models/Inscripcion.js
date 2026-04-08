const mongoose = require("mongoose");

const inscripcionSchema = new mongoose.Schema({
  jugador_id: { type: mongoose.Schema.Types.ObjectId, ref: "Jugador", required: true },
  torneo_id: { type: mongoose.Schema.Types.ObjectId, ref: "Torneo", required: true },
  fecha_inscripcion: { type: Date, required: true },
  estado: { type: String, required: true }
}, {
  collection: "inscripciones"
});

module.exports = mongoose.model("Inscripcion", inscripcionSchema);