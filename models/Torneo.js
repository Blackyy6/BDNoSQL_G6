const mongoose = require("mongoose");

const torneoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  organizador: { type: String, required: true },
  fecha_inicio: { type: Date, required: true },
  fecha_fin: { type: Date, required: true }
}, {
  collection: "torneos"
});

module.exports = mongoose.model("Torneo", torneoSchema);