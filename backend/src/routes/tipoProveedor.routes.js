const express = require("express");
const router = express.Router();
const tipoProveedorController = require("../controllers/tipoProveedor.controller");

router.get("/", tipoProveedorController.getAll);
router.get("/:id", tipoProveedorController.getById);
router.post("/", tipoProveedorController.create);
router.put("/:id", tipoProveedorController.update);
router.delete("/:id", tipoProveedorController.remove);

module.exports = router;