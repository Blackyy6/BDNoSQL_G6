const mongoose = require("mongoose");

const entrenadorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  especialidad: { type: String, required: true },
  experiencia: { type: Number, required: true },
  telefono: { type: String, required: true },
  correo: { type: String, required: true },
  estado: { type: String, required: true }
}, {
  collection: "entrenadores"
});

module.exports = mongoose.model("Entrenador", entrenadorSchema);