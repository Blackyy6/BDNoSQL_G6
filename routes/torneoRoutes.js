const express = require("express");
const router = express.Router();
const Torneo = require("../models/Torneo");

// GET
router.get("/", async (req, res) => {
  const torneos = await Torneo.find();
  res.json(torneos);
});

// POST
router.post("/", async (req, res) => {
  const nuevoTorneo = new Torneo(req.body);
  const torneoGuardado = await nuevoTorneo.save();
  res.json(torneoGuardado);
});

// PUT
router.put("/:id", async (req, res) => {
  const torneoActualizado = await Torneo.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(torneoActualizado);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Torneo.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Torneo eliminado correctamente" });
});

module.exports = router;