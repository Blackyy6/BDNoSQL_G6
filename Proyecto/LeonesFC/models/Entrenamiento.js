const mongoose = require("mongoose");

const entrenamientoSchema = new mongoose.Schema({
  equipo_id: { type: mongoose.Schema.Types.ObjectId, ref: "Equipo", required: true },
  entrenador_id: { type: mongoose.Schema.Types.ObjectId, ref: "Entrenador", required: true },
  fecha: { type: Date, required: true },
  hora_inicio: { type: String, required: true },
  hora_fin: { type: String, required: true },
  objetivo: { type: String, required: true }
}, {
  collection: "entrenamientos"
});

module.exports = mongoose.model("Entrenamiento", entrenamientoSchema);