const express = require("express");
const router = express.Router();
const Entrenamiento = require("../models/Entrenamiento");

// GET
router.get("/", async (req, res) => {
  const entrenamientos = await Entrenamiento.find();
  res.json(entrenamientos);
});

// POST
router.post("/", async (req, res) => {
  const nuevoEntrenamiento = new Entrenamiento(req.body);
  const entrenamientoGuardado = await nuevoEntrenamiento.save();
  res.json(entrenamientoGuardado);
});

// PUT
router.put("/:id", async (req, res) => {
  const entrenamientoActualizado = await Entrenamiento.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(entrenamientoActualizado);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Entrenamiento.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Entrenamiento eliminado correctamente" });
});

module.exports = router;