const express = require("express");
const router = express.Router();
const controller = require("../controllers/unidadesMedida.controller");

router.get("/", controller.getAllUnidadesMedida);
router.get("/:id", controller.getUnidadMedidaById);
router.post("/", controller.createUnidadMedida);
router.put("/:id", controller.updateUnidadMedida);
router.delete("/:id", controller.deleteUnidadMedida);

module.exports = router;