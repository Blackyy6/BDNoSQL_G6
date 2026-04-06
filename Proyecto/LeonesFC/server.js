require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Conectado"))
  .catch((err) => console.log("Error de conexión:", err));

const PORT = process.env.PORT || 3000;

app.use("/api/jugadores", require("./routes/jugadorRoutes"));
app.use("/api/entrenadores", require("./routes/entrenadorRoutes"));
app.use("/api/equipos", require("./routes/equipoRoutes"));
app.use("/api/categorias", require("./routes/categoriaRoutes"));
app.use("/api/partidos", require("./routes/partidoRoutes"));
app.use("/api/pagos", require("./routes/pagoRoutes"));
app.use("/api/asistencias", require("./routes/asistenciaRoutes"));
app.use("/api/entrenamientos", require("./routes/entrenamientoRoutes"));
app.use("/api/estadios", require("./routes/estadioRoutes"));
app.use("/api/lesiones", require("./routes/lesionRoutes"));
app.use("/api/torneos", require("./routes/torneoRoutes"));
app.use("/api/inscripciones", require("./routes/inscripcionRoutes"));
app.use("/api/usuarios", require("./routes/usuarioRoutes"));
app.use("/api/padres", require("./routes/padreRoutes"));
app.use("/api/notificaciones", require("./routes/notificacionRoutes"));

app.get("/", (req, res) => {
  res.send("API funcionando");
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});