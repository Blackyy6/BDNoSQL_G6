const express = require("express");
const router = express.Router();
const Pago = require("../models/Pago");

// GET
router.get("/", async (req, res) => {
  const pagos = await Pago.find()
  res.json(pagos);
});

// POST
router.post("/", async (req, res) => {
  const nuevoPago = new Pago(req.body);
  const pagoGuardado = await nuevoPago.save();
  res.json(pagoGuardado);
});

// PUT
router.put("/:id", async (req, res) => {
  const pagoActualizado = await Pago.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(pagoActualizado);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Pago.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Pago eliminado correctamente" });
});

module.exports = router;