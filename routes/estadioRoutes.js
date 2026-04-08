const express = require("express");
const router = express.Router();
const Estadio = require("../models/Estadio");

// GET
router.get("/", async (req, res) => {
  const estadios = await Estadio.find();
  res.json(estadios);
});

// POST
router.post("/", async (req, res) => {
  const nuevoEstadio = new Estadio(req.body);
  const estadioGuardado = await nuevoEstadio.save();
  res.json(estadioGuardado);
});

// PUT
router.put("/:id", async (req, res) => {
  const estadioActualizado = await Estadio.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(estadioActualizado);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Estadio.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Estadio eliminado correctamente" });
});

module.exports = router;