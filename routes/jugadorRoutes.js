const express = require("express");
const router = express.Router();
const Jugador = require("../models/Jugador");

// GET
router.get("/", async (req, res) => {
  const jugadores = await Jugador.find();
  res.json(jugadores);
});

// POST
router.post("/", async (req, res) => {
  const nuevoJugador = new Jugador(req.body);
  const jugadorGuardado = await nuevoJugador.save();
  res.json(jugadorGuardado);
});

// PUT
router.put("/:id", async (req, res) => {
  const jugadorActualizado = await Jugador.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(jugadorActualizado);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Jugador.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Jugador eliminado correctamente" });
});

module.exports = router;