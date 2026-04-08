const express = require("express");
const router = express.Router();
const Entrenador = require("../models/Entrenador");

// GET
router.get("/", async (req, res) => {
  const entrenadores = await Entrenador.find();
  res.json(entrenadores);
});

// POST
router.post("/", async (req, res) => {
  const nuevoEntrenador = new Entrenador(req.body);
  const entrenadorGuardado = await nuevoEntrenador.save();
  res.json(entrenadorGuardado);
});

// PUT
router.put("/:id", async (req, res) => {
  const entrenadorActualizado = await Entrenador.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(entrenadorActualizado);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Entrenador.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Entrenador eliminado correctamente" });
});

module.exports = router;