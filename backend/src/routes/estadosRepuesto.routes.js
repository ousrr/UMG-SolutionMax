const express = require("express");
const router = express.Router();
const controller = require("../controllers/estadosRepuesto.controller");

router.get("/", controller.getAllEstadosRepuesto);
router.get("/:id", controller.getEstadoRepuestoById);
router.post("/", controller.createEstadoRepuesto);
router.put("/:id", controller.updateEstadoRepuesto);
router.delete("/:id", controller.deleteEstadoRepuesto);

module.exports = router;