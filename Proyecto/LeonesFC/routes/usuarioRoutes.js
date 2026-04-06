const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuario");

// GET
router.get("/", async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
});

// POST
router.post("/", async (req, res) => {
  const nuevoUsuario = new Usuario(req.body);
  const usuarioGuardado = await nuevoUsuario.save();
  res.json(usuarioGuardado);
});

// PUT
router.put("/:id", async (req, res) => {
  const usuarioActualizado = await Usuario.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(usuarioActualizado);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Usuario.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Usuario eliminado correctamente" });
});

module.exports = router;