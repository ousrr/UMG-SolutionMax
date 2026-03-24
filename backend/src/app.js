const express = require("express");
const cors = require("cors");

const estadosRepuestoRoutes = require("./routes/estadosRepuesto.routes");
const unidadesMedidaRoutes = require("./routes/unidadesMedida.routes");
const marcasRepuestoRoutes = require("./routes/marcasRepuesto.routes");
const tiposRepuestoRoutes = require("./routes/tiposRepuesto.routes");
const tiposMovimientoInventarioRoutes = require("./routes/tiposMovimientoInventario.routes");
const motivosAjusteInventarioRoutes = require("./routes/motivosAjusteInventario.routes");
const estadosOrdenCompraRoutes = require("./routes/estadosOrdenCompra.routes");
const estadosTareaRoutes = require("./routes/estadosTarea.routes");
const formasPagoRoutes = require("./routes/formasPago.routes");
const estadosPagoRoutes = require("./routes/estadosPago.routes");




const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend Solution Max funcionando");
});
app.use("/api/estados-repuesto", estadosRepuestoRoutes);
app.use("/api/unidades-medida", unidadesMedidaRoutes);
app.use("/api/marcas-repuesto", marcasRepuestoRoutes);
app.use("/api/tipos-repuesto", tiposRepuestoRoutes);
app.use("/api/tipos-movimiento-inventario", tiposMovimientoInventarioRoutes);
app.use("/api/motivos-ajuste-inventario", motivosAjusteInventarioRoutes);
app.use("/api/estados-orden-compra", estadosOrdenCompraRoutes);
app.use("/api/estados-tarea", estadosTareaRoutes);
app.use("/api/formas-pago", formasPagoRoutes);
app.use("/api/estados-pago", estadosPagoRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});