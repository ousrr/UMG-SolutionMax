const express = require("express");
const router = express.Router();
const controller = require("../controllers/tiposRepuesto.controller");

router.get("/", controller.getAllTiposRepuesto);
router.get("/:id", controller.getTipoRepuestoById);
router.post("/", controller.createTipoRepuesto);
router.put("/:id", controller.updateTipoRepuesto);
router.delete("/:id", controller.deleteTipoRepuesto);

module.exports = router;