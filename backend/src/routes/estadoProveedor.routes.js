const express = require("express");
const router = express.Router();
const estadoProveedorController = require("../controllers/estadoProveedor.controller");

router.get("/", estadoProveedorController.getAll);
router.get("/:id", estadoProveedorController.getById);
router.post("/", estadoProveedorController.create);
router.put("/:id", estadoProveedorController.update);
router.delete("/:id", estadoProveedorController.remove);

module.exports = router;