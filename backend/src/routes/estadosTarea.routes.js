const express = require("express");
const router = express.Router();
const controller = require("../controllers/estadosTarea.controller");

router.get("/", controller.getAllEstadosTarea);
router.get("/:id", controller.getEstadoTareaById);
router.post("/", controller.createEstadoTarea);
router.put("/:id", controller.updateEstadoTarea);
router.delete("/:id", controller.deleteEstadoTarea);

module.exports = router;