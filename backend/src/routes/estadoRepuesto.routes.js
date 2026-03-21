const express = require("express");
const router = express.Router();
const estadoRepuestoController = require("../controllers/estadoRepuesto.controller");

router.get("/", estadoRepuestoController.getAll);
router.get("/:id", estadoRepuestoController.getById);
router.post("/", estadoRepuestoController.create);
router.put("/:id", estadoRepuestoController.update);
router.delete("/:id", estadoRepuestoController.remove);

module.exports = router;