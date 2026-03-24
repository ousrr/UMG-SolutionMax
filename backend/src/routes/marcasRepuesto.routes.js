const express = require("express");
const router = express.Router();
const controller = require("../controllers/marcasRepuesto.controller");

router.get("/", controller.getAllMarcasRepuesto);
router.get("/:id", controller.getMarcaRepuestoById);
router.post("/", controller.createMarcaRepuesto);
router.put("/:id", controller.updateMarcaRepuesto);
router.delete("/:id", controller.deleteMarcaRepuesto);

module.exports = router;