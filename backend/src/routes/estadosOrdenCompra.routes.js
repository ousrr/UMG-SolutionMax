const express = require("express");
const router = express.Router();
const controller = require("../controllers/estadosOrdenCompra.controller");

router.get("/", controller.getAllEstadosOrdenCompra);
router.get("/:id", controller.getEstadoOrdenCompraById);
router.post("/", controller.createEstadoOrdenCompra);
router.put("/:id", controller.updateEstadoOrdenCompra);
router.delete("/:id", controller.deleteEstadoOrdenCompra);

module.exports = router;