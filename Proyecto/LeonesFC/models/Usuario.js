const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true },
  contraseña: { type: String, required: true },
  rol: { type: String, required: true }
}, {
  collection: "usuarios"
});

module.exports = mongoose.model("Usuario", usuarioSchema);