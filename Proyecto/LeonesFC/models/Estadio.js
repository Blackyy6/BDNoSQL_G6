const mongoose = require("mongoose");

const estadioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  ubicacion: { type: String, required: true },
  capacidad: { type: Number, required: true },
  tipo_superficie: { type: String, required: true }
}, {
  collection: "estadios"
});

module.exports = mongoose.model("Estadio", estadioSchema);