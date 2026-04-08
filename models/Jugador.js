const mongoose = require("mongoose");

const jugadorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  fecha_nacimiento: { type: Date, required: true },
  edad: { type: Number, required: true },
  posicion: { type: String, required: true },
  categoria_id: { type: mongoose.Schema.Types.ObjectId, ref: "Categoria" },
  equipo_id: { type: mongoose.Schema.Types.ObjectId, ref: "Equipo" },
  estado_salud: { type: String, required: true },
  contacto_emergencia: {
    nombre: { type: String, required: true },
    telefono: { type: String, required: true }
  }
}, {
  collection: "jugadores"
});

module.exports = mongoose.model("Jugador", jugadorSchema);