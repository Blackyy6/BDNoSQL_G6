const express = require("express");
const router = express.Router();
const Padre = require("../models/Padre");

// GET
router.get("/", async (req, res) => {
  const padres = await Padre.find()
  res.json(padres);
});

// POST
router.post("/", async (req, res) => {
  const nuevoPadre = new Padre(req.body);
  const padreGuardado = await nuevoPadre.save();
  res.json(padreGuardado);
});

// PUT
router.put("/:id", async (req, res) => {
  const padreActualizado = await Padre.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(padreActualizado);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Padre.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Padre eliminado correctamente" });
});

module.exports = router;