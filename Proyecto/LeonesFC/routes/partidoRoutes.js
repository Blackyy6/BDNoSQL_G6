const express = require("express");
const router = express.Router();
const Partido = require("../models/Partido");

// GET
router.get("/", async (req, res) => {
  const partidos = await Partido.find();
  res.json(partidos);
});

// POST
router.post("/", async (req, res) => {
  const nuevoPartido = new Partido(req.body);
  const partidoGuardado = await nuevoPartido.save();
  res.json(partidoGuardado);
});

// PUT
router.put("/:id", async (req, res) => {
  const partidoActualizado = await Partido.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(partidoActualizado);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Partido.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Partido eliminado correctamente" });
});

module.exports = router;