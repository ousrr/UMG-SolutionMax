const express = require("express");
const router = express.Router();
const controller = require("../controllers/estadosPago.controller");

router.get("/", controller.getAllEstadosPago);
router.get("/:id", controller.getEstadoPagoById);
router.post("/", controller.createEstadoPago);
router.put("/:id", controller.updateEstadoPago);
router.delete("/:id", controller.deleteEstadoPago);

module.exports = router;