const express = require("express");
const router = express.Router();
const Asistencia = require("../models/Asistencia");

// GET
router.get("/", async (req, res) => {
  const asistencias = await Asistencia.find()
  res.json(asistencias);
});

// POST
router.post("/", async (req, res) => {
  const nuevaAsistencia = new Asistencia(req.body);
  const asistenciaGuardada = await nuevaAsistencia.save();
  res.json(asistenciaGuardada);
});

// PUT
router.put("/:id", async (req, res) => {
  const asistenciaActualizada = await Asistencia.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(asistenciaActualizada);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Asistencia.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Asistencia eliminada correctamente" });
});

module.exports = router;