 const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

// 🔥 PRUEBA DE BASE DE DATOS
app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1");
    res.json({ message: "Conexión exitosa", rows });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error conectando a la DB");
  }
});

app.listen(3001, () => {
  console.log("Servidor corriendo en puerto 3001");
});

//api de estado cliente
const estadoClienteRoutes = require("./routes/estadoCliente.routes");

app.use("/api/estado-cliente", estadoClienteRoutes);
