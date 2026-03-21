const express = require("express");
const router = express.Router();
const prioridadController = require("../controllers/prioridad.controller");

router.get("/", prioridadController.getAll);
router.get("/:id", prioridadController.getById);
router.post("/", prioridadController.create);
router.put("/:id", prioridadController.update);
router.delete("/:id", prioridadController.remove);

module.exports = router;