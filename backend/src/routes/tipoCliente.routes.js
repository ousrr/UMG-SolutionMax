const express = require("express");
const router = express.Router();

const {
  getTiposCliente,
  getTipoClienteById,
  createTipoCliente,
  updateTipoCliente,
  deleteTipoCliente,
} = require("../controllers/tipoClienteController");

router.get("/", getTiposCliente);
router.get("/:id", getTipoClienteById);
router.post("/", createTipoCliente);
router.put("/:id", updateTipoCliente);
router.delete("/:id", deleteTipoCliente);

module.exports = router;