const mongoose = require("mongoose");

const equipoSchema = new mongoose.Schema({
  nombre_equipo: { type: String, required: true },
  categoria_id: { type: mongoose.Schema.Types.ObjectId, ref: "Categoria", required: true },
  entrenador_id: { type: mongoose.Schema.Types.ObjectId, ref: "Entrenador", required: true },
  lista_jugadores: [{ type: mongoose.Schema.Types.ObjectId, ref: "Jugador" }],
  puntos: { type: Number, required: true },
  estado: { type: String, required: true }
}, {
  collection: "equipos"
});

module.exports = mongoose.model("Equipo", equipoSchema);