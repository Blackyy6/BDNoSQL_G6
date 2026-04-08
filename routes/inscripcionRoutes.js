const express = require("express");
const router = express.Router();
const Inscripcion = require("../models/Inscripcion");

// GET
router.get("/", async (req, res) => {
  const inscripciones = await Inscripcion.find()
  res.json(inscripciones);
});

// POST
router.post("/", async (req, res) => {
  const nuevaInscripcion = new Inscripcion(req.body);
  const inscripcionGuardada = await nuevaInscripcion.save();
  res.json(inscripcionGuardada);
});

// PUT
router.put("/:id", async (req, res) => {
  const inscripcionActualizada = await Inscripcion.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(inscripcionActualizada);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Inscripcion.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Inscripción eliminada correctamente" });
});

module.exports = router;