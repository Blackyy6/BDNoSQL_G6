const express = require("express");
const router = express.Router();
const Equipo = require("../models/Equipo");

// GET
router.get("/", async (req, res) => {
  const equipos = await Equipo.find();
  res.json(equipos);
});

// POST
router.post("/", async (req, res) => {
  const nuevoEquipo = new Equipo(req.body);
  const equipoGuardado = await nuevoEquipo.save();
  res.json(equipoGuardado);
});

// PUT
router.put("/:id", async (req, res) => {
  const equipoActualizado = await Equipo.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(equipoActualizado);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Equipo.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Equipo eliminado correctamente" });
});

module.exports = router;