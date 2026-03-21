const express = require("express");
const router = express.Router();

const {
  getEstadosCliente,
  getEstadoClienteById,
  createEstadoCliente,
  updateEstadoCliente,
  deleteEstadoCliente,
} = require("../controllers/estadoClienteController");

router.get("/", getEstadosCliente);
router.get("/:id", getEstadoClienteById);
router.post("/", createEstadoCliente);
router.put("/:id", updateEstadoCliente);
router.delete("/:id", deleteEstadoCliente);

module.exports = router;