const mongoose = require("mongoose");

const partidoSchema = new mongoose.Schema({
  equipo_local_id: { type: mongoose.Schema.Types.ObjectId, ref: "Equipo", required: true },
  equipo_visitante_id: { type: mongoose.Schema.Types.ObjectId, ref: "Equipo", required: true },
  fecha: { type: Date, required: true },
  marcador: {
    local: { type: Number, required: true },
    visitante: { type: Number, required: true }
  },
  estadio_id: { type: mongoose.Schema.Types.ObjectId, ref: "Estadio", required: true },
  tipo: { type: String, required: true }
}, {
  collection: "partidos"
});

module.exports = mongoose.model("Partido", partidoSchema);