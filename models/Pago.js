const mongoose = require("mongoose");

const pagoSchema = new mongoose.Schema({
  jugador_id: { type: mongoose.Schema.Types.ObjectId, ref: "Jugador", required: true },
  monto: {  type: Number, required: true },
  fecha_pago: {  type: Date, required: true },
  metodo: {  type: String, required: true },
  estado: { type: String, required: true }
}, {
  collection: "pagos"
});

module.exports = mongoose.model("Pago", pagoSchema);