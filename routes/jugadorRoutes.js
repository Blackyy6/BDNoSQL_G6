const express = require("express");
const router = express.Router();
const Jugador = require("../models/Jugador");

const jugadorPopulate = [
  { path: "categoria_id", select: "nombre_categoria rango_edad año_competencia" },
  { path: "equipo_id", select: "nombre_equipo estado puntos" }
];

// GET
router.get("/", async (req, res) => {
  try {
    const jugadores = await Jugador.find().populate(jugadorPopulate);
    res.json(jugadores);
  } catch (error) {
    res.status(500).json({ mensaje: "No se pudieron cargar los jugadores", error: error.message });
  }
});

// POST
router.post("/", async (req, res) => {
  try {
    const nuevoJugador = new Jugador(req.body);
    const jugadorGuardado = await nuevoJugador.save();
    const jugadorCompleto = await Jugador.findById(jugadorGuardado._id).populate(jugadorPopulate);
    res.json(jugadorCompleto);
  } catch (error) {
    res.status(400).json({ mensaje: "No se pudo guardar el jugador", error: error.message });
  }
});

// PUT
router.put("/:id", async (req, res) => {
  try {
    const jugadorActualizado = await Jugador.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate(jugadorPopulate);

    res.json(jugadorActualizado);
  } catch (error) {
    res.status(400).json({ mensaje: "No se pudo actualizar el jugador", error: error.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Jugador.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Jugador eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "No se pudo eliminar el jugador", error: error.message });
  }
});

module.exports = router;
