const express = require("express");
const router = express.Router();
const controller = require("../controllers/motivosAjusteInventario.controller");

router.get("/", controller.getAllMotivosAjusteInventario);
router.get("/:id", controller.getMotivoAjusteInventarioById);
router.post("/", controller.createMotivoAjusteInventario);
router.put("/:id", controller.updateMotivoAjusteInventario);
router.delete("/:id", controller.deleteMotivoAjusteInventario);

module.exports = router;