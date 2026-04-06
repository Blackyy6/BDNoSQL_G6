const mongoose = require("mongoose");

const lesionSchema = new mongoose.Schema({
  jugador_id: { type: mongoose.Schema.Types.ObjectId, ref: "Jugador", required: true },
  tipo_lesion: { type: String, required: true },
  fecha_inicio: { type: Date, required: true },
  fecha_fin: { type: Date },
  estado: { type: String, required: true }
}, {
  collection: "lesiones"
});

module.exports = mongoose.model("Lesion", lesionSchema);