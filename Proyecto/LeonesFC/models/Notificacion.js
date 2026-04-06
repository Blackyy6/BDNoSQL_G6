const mongoose = require("mongoose");

const notificacionSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  mensaje: { type: String, required: true },
  fecha: { type: Date, required: true },
  destinatarios: { type: [String], required: true },
  leido: { type: Boolean, required: true }
}, {
  collection: "notificaciones"
});

module.exports = mongoose.model("Notificacion", notificacionSchema);