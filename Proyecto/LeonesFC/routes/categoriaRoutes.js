const express = require("express");
const router = express.Router();
const Categoria = require("../models/Categoria");

// GET
router.get("/", async (req, res) => {
  const categorias = await Categoria.find();
  res.json(categorias);
});

// POST
router.post("/", async (req, res) => {
  const nuevaCategoria = new Categoria(req.body);
  const categoriaGuardada = await nuevaCategoria.save();
  res.json(categoriaGuardada);
});

// PUT
router.put("/:id", async (req, res) => {
  const categoriaActualizada = await Categoria.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(categoriaActualizada);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Categoria.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Categoria eliminada correctamente" });
});

module.exports = router;