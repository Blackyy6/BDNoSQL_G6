const express = require("express");
const router = express.Router();
const Asistencia = require("../models/Asistencia");

const asistenciaPopulate = [
  { path: "jugador_id", select: "nombre posicion categoria_id", populate: { path: "categoria_id", select: "nombre_categoria" } },
  { path: "equipo_id", select: "nombre_equipo categoria_id", populate: { path: "categoria_id", select: "nombre_categoria" } }
];

// GET
router.get("/", async (req, res) => {
  try {
    const asistencias = await Asistencia.find().populate(asistenciaPopulate);
    res.json(asistencias);
  } catch (error) {
    res.status(500).json({ mensaje: "No se pudieron cargar las asistencias", error: error.message });
  }
});

router.get("/resumen", async (req, res) => {
  try {
    const asistencias = await Asistencia.find().populate(asistenciaPopulate);

    const porJugadorMap = new Map();
    const porEquipoMap = new Map();

    asistencias.forEach((asistencia) => {
      const jugador = asistencia.jugador_id;
      const equipo = asistencia.equipo_id;

      if (jugador?._id) {
        const key = String(jugador._id);
        const actual = porJugadorMap.get(key) || {
          jugador_id: key,
          jugador: jugador.nombre,
          categoria: jugador.categoria_id?.nombre_categoria || "Sin categoria",
          total: 0,
          presentes: 0,
          ausencias: 0
        };

        actual.total += 1;
        actual.presentes += asistencia.asistio ? 1 : 0;
        actual.ausencias += asistencia.asistio ? 0 : 1;
        porJugadorMap.set(key, actual);
      }

      if (equipo?._id) {
        const key = String(equipo._id);
        const actual = porEquipoMap.get(key) || {
          equipo_id: key,
          equipo: equipo.nombre_equipo,
          categoria: equipo.categoria_id?.nombre_categoria || "Sin categoria",
          total: 0,
          presentes: 0,
          ausencias: 0
        };

        actual.total += 1;
        actual.presentes += asistencia.asistio ? 1 : 0;
        actual.ausencias += asistencia.asistio ? 0 : 1;
        porEquipoMap.set(key, actual);
      }
    });

    res.json({
      total_registros: asistencias.length,
      por_jugador: Array.from(porJugadorMap.values()),
      por_equipo: Array.from(porEquipoMap.values())
    });
  } catch (error) {
    res.status(500).json({ mensaje: "No se pudo generar el resumen de asistencias", error: error.message });
  }
});

// POST
router.post("/", async (req, res) => {
  try {
    const nuevaAsistencia = new Asistencia(req.body);
    const asistenciaGuardada = await nuevaAsistencia.save();
    const asistenciaCompleta = await Asistencia.findById(asistenciaGuardada._id).populate(asistenciaPopulate);
    res.json(asistenciaCompleta);
  } catch (error) {
    res.status(400).json({ mensaje: "No se pudo guardar la asistencia", error: error.message });
  }
});

// PUT
router.put("/:id", async (req, res) => {
  try {
    const asistenciaActualizada = await Asistencia.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate(asistenciaPopulate);

    res.json(asistenciaActualizada);
  } catch (error) {
    res.status(400).json({ mensaje: "No se pudo actualizar la asistencia", error: error.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Asistencia.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Asistencia eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "No se pudo eliminar la asistencia", error: error.message });
  }
});

module.exports = router;
