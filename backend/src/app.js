const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const estadoClienteRoutes = require("./routes/estadoCliente.routes");
const estadoCotizacionRoutes = require("./routes/estadoCotizacion.routes");
const estadoAprobacionRoutes = require("./routes/estadoAprobacion.routes");
const prioridadRoutes = require("./routes/prioridad.routes");
const servicioRoutes = require("./routes/servicio.routes");
const categoriaRoutes = require("./routes/categoriaRepuesto.routes");
const tipoProveedorRoutes = require("./routes/tipoProveedor.routes");
const estadoProveedorRoutes = require("./routes/estadoProveedor.routes");
const condicionPagoRoutes = require("./routes/condicionPagoProveedor.routes");
const estadoRepuestoRoutes = require("./routes/estadoRepuesto.routes");
const unidadMedidaRoutes = require("./routes/unidadMedida.routes");
const marcaRepuestoRoutes = require("./routes/marcaRepuesto.routes");
const tipoRepuestoRoutes = require("./routes/tipoRepuesto.routes");
const tipoMovimientoInventarioRoutes = require("./routes/tipoMovimientoInventario.routes");
const motivoAjusteInventarioRoutes = require("./routes/motivoAjusteInventario.routes");
const estadoOrdenCompraRoutes = require("./routes/estadoOrdenCompra.routes");
const estadoTareaRoutes = require("./routes/estadoTarea.routes");
const formaPagoRoutes = require("./routes/formaPago.routes");
const estadoPagoRoutes = require("./routes/estadoPago.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1");
    res.json({ message: "Conexión exitosa", rows });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error DB");
  }
});

app.use("/api/estado-cliente", estadoClienteRoutes);
app.use("/api/estado-cotizacion", estadoCotizacionRoutes);
app.use("/api/estado-aprobacion", estadoAprobacionRoutes);
app.use("/api/prioridad", prioridadRoutes);
app.use("/api/servicio", servicioRoutes);
app.use("/api/categorias-repuestos", categoriaRoutes);
app.use("/api/tipos-proveedor", tipoProveedorRoutes);
app.use("/api/estados-proveedor", estadoProveedorRoutes);
app.use("/api/condiciones-pago-proveedor", condicionPagoRoutes);
app.use("/api/estados-repuesto", estadoRepuestoRoutes);
app.use("/api/unidades-medida", unidadMedidaRoutes);
app.use("/api/marcas-repuesto", marcaRepuestoRoutes);
app.use("/api/tipos-repuesto", tipoRepuestoRoutes);
app.use("/api/tipos-movimiento-inventario", tipoMovimientoInventarioRoutes);
app.use("/api/motivos-ajuste-inventario", motivoAjusteInventarioRoutes);
app.use("/api/estados-orden-compra", estadoOrdenCompraRoutes);
app.use("/api/estados-tarea", estadoTareaRoutes);
app.use("/api/formas-pago", formaPagoRoutes);
app.use("/api/estados-pago", estadoPagoRoutes);

app.listen(3001, () => {
  console.log("Servidor corriendo en puerto 3001");
});