const express = require("express");
const router = express.Router();
const Entrenamiento = require("../models/Entrenamiento");

const entrenamientoPopulate = [
  { path: "equipo_id", select: "nombre_equipo estado puntos", populate: { path: "categoria_id", select: "nombre_categoria" } },
  { path: "entrenador_id", select: "nombre especialidad estado" }
];

// GET
router.get("/", async (req, res) => {
  try {
    const entrenamientos = await Entrenamiento.find().populate(entrenamientoPopulate);
    res.json(entrenamientos);
  } catch (error) {
    res.status(500).json({ mensaje: "No se pudieron cargar los entrenamientos", error: error.message });
  }
});

// POST
router.post("/", async (req, res) => {
  try {
    const nuevoEntrenamiento = new Entrenamiento(req.body);
    const entrenamientoGuardado = await nuevoEntrenamiento.save();
    const entrenamientoCompleto = await Entrenamiento.findById(entrenamientoGuardado._id).populate(entrenamientoPopulate);
    res.json(entrenamientoCompleto);
  } catch (error) {
    res.status(400).json({ mensaje: "No se pudo guardar el entrenamiento", error: error.message });
  }
});

// PUT
router.put("/:id", async (req, res) => {
  try {
    const entrenamientoActualizado = await Entrenamiento.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate(entrenamientoPopulate);

    res.json(entrenamientoActualizado);
  } catch (error) {
    res.status(400).json({ mensaje: "No se pudo actualizar el entrenamiento", error: error.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Entrenamiento.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Entrenamiento eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "No se pudo eliminar el entrenamiento", error: error.message });
  }
});

module.exports = router;
