const express = require("express");
const cors = require("cors");

const app = express();
const db = require("./config/db");

const rolesRoutes = require("./routes/roles.routes");
const nivelCombustibleRoutes = require("./routes/nivelCombustible.routes");
const itemRevisionRoutes = require("./routes/itemRevision.routes");
const horariosRoutes = require("./routes/horarios.routes");
const tipoCitaRoutes = require("./routes/tipoCita.routes");
const estadoCitaRoutes = require("./routes/estadoCita.routes");
const tipoClienteRoutes = require("./routes/tipoCliente.routes");
const estadoClienteRoutes = require("./routes/estadoCliente.routes");
const tipoTelefonoRoutes = require("./routes/tipoTelefono.routes");
const paisRoutes = require("./routes/pais.routes");
const departamentoRoutes = require("./routes/departamento.routes");
const municipioRoutes = require("./routes/municipio.routes");
const marcaVehiculoRoutes = require("./routes/marcaVehiculo.routes");
const tiposVehiculosRoutes = require("./routes/tiposVehiculos.routes");
const colorVehiculoRoutes = require("./routes/colorVehiculo.routes");
const combustibleVehiculoRoutes = require("./routes/combustibleVehiculo.routes");
const tipoServicioRoutes = require("./routes/tipoServicio.routes");
const sistemaVehiculoRoutes = require("./routes/sistemaVehiculo.routes");
const estadoFisicoRoutes = require("./routes/estadoFisico.routes");

app.use(
  cors({
    origin: "http://localhost:3001",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Solution Max funcionando");
});

app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1");
    res.json({
      message: "Conexión exitosa",
      rows,
    });
  } catch (error) {
    console.error("Error en test-db:", error);
    res.status(500).json({
      message: "Error conectando a la base de datos",
      error: error.message,
    });
  }
});

app.use("/api/roles", rolesRoutes);
app.use("/api/nivel-combustible", nivelCombustibleRoutes);
app.use("/api/item-revision", itemRevisionRoutes);
app.use("/api/horarios", horariosRoutes);
app.use("/api/tipo-cita", tipoCitaRoutes);
app.use("/api/estado-cita", estadoCitaRoutes);
app.use("/api/tipo-cliente", tipoClienteRoutes);
app.use("/api/estado-cliente", estadoClienteRoutes);
app.use("/api/tipo-telefono", tipoTelefonoRoutes);
app.use("/api/pais", paisRoutes);
app.use("/api/departamento", departamentoRoutes);
app.use("/api/municipio", municipioRoutes);
app.use("/api/marca-vehiculo", marcaVehiculoRoutes);
app.use("/api/tipos-vehiculos", tiposVehiculosRoutes);
app.use("/api/color-vehiculo", colorVehiculoRoutes);
app.use("/api/combustible-vehiculo", combustibleVehiculoRoutes);
app.use("/api/tipo-servicio", tipoServicioRoutes);
app.use("/api/sistema-vehiculo", sistemaVehiculoRoutes);
app.use("/api/estado-fisico", estadoFisicoRoutes);

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});