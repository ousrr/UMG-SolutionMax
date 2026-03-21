const express = require("express");
const router = express.Router();
const estadoCotizacionController = require("../controllers/estadoCotizacion.controller");

router.get("/", estadoCotizacionController.getAll);
router.get("/:id", estadoCotizacionController.getById);
router.post("/", estadoCotizacionController.create);
router.put("/:id", estadoCotizacionController.update);
router.delete("/:id", estadoCotizacionController.remove);

module.exports = router;