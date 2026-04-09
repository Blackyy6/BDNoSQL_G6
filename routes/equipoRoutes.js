const express = require("express");
const router = express.Router();
const Equipo = require("../models/Equipo");

const equipoPopulate = [
  { path: "categoria_id", select: "nombre_categoria rango_edad año_competencia" },
  { path: "entrenador_id", select: "nombre especialidad experiencia estado" },
  { path: "lista_jugadores", select: "nombre posicion edad estado_salud" }
];

// GET
router.get("/", async (req, res) => {
  try {
    const equipos = await Equipo.find().populate(equipoPopulate);
    res.json(equipos);
  } catch (error) {
    res.status(500).json({ mensaje: "No se pudieron cargar los equipos", error: error.message });
  }
});

// POST
router.post("/", async (req, res) => {
  try {
    const nuevoEquipo = new Equipo(req.body);
    const equipoGuardado = await nuevoEquipo.save();
    const equipoCompleto = await Equipo.findById(equipoGuardado._id).populate(equipoPopulate);
    res.json(equipoCompleto);
  } catch (error) {
    res.status(400).json({ mensaje: "No se pudo guardar el equipo", error: error.message });
  }
});

// PUT
router.put("/:id", async (req, res) => {
  try {
    const equipoActualizado = await Equipo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate(equipoPopulate);

    res.json(equipoActualizado);
  } catch (error) {
    res.status(400).json({ mensaje: "No se pudo actualizar el equipo", error: error.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Equipo.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Equipo eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "No se pudo eliminar el equipo", error: error.message });
  }
});

module.exports = router;
