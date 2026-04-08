const mongoose = require("mongoose");

const padreSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  telefono: { type: String, required: true },
  correo: { type: String, required: true },
  jugador_id: { type: mongoose.Schema.Types.ObjectId, ref: "Jugador", required: true }
}, {
  collection: "padres"
});

module.exports = mongoose.model("Padre", padreSchema);