const express = require("express");
const router = express.Router();
const Lesion = require("../models/Lesion");

// GET
router.get("/", async (req, res) => {
  const lesiones = await Lesion.find()
  res.json(lesiones);
});

// POST
router.post("/", async (req, res) => {
  const nuevaLesion = new Lesion(req.body);
  const lesionGuardada = await nuevaLesion.save();
  res.json(lesionGuardada);
});

// PUT
router.put("/:id", async (req, res) => {
  const lesionActualizada = await Lesion.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(lesionActualizada);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Lesion.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Lesión eliminada correctamente" });
});

module.exports = router;