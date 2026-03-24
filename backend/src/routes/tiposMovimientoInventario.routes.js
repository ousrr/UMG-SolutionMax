const express = require("express");
const router = express.Router();
const controller = require("../controllers/tiposMovimientoInventario.controller");

router.get("/", controller.getAllTiposMovimientoInventario);
router.get("/:id", controller.getTipoMovimientoInventarioById);
router.post("/", controller.createTipoMovimientoInventario);
router.put("/:id", controller.updateTipoMovimientoInventario);
router.delete("/:id", controller.deleteTipoMovimientoInventario);

module.exports = router;