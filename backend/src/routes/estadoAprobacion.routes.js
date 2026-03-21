const express = require("express");
const router = express.Router();
const estadoAprobacionController = require("../controllers/estadoAprobacion.controller");

router.get("/", estadoAprobacionController.getAll);
router.get("/:id", estadoAprobacionController.getById);
router.post("/", estadoAprobacionController.create);
router.put("/:id", estadoAprobacionController.update);
router.delete("/:id", estadoAprobacionController.remove);

module.exports = router;