const express = require("express");
const router = express.Router();
const Notificacion = require("../models/Notificacion");

// GET
router.get("/", async (req, res) => {
  const notificaciones = await Notificacion.find();
  res.json(notificaciones);
});

// POST
router.post("/", async (req, res) => {
  const nuevaNotificacion = new Notificacion(req.body);
  const notificacionGuardada = await nuevaNotificacion.save();
  res.json(notificacionGuardada);
});

// PUT
router.put("/:id", async (req, res) => {
  const notificacionActualizada = await Notificacion.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(notificacionActualizada);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Notificacion.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Notificación eliminada correctamente" });
});

module.exports = router;