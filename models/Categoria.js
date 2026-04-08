const mongoose = require("mongoose");

const categoriaSchema = new mongoose.Schema({
  nombre_categoria: { type: String, required: true },
  rango_edad: { type: String, required: true },
  año_competencia: { type: Number, required: true }
});

module.exports = mongoose.model("Categoria", categoriaSchema);