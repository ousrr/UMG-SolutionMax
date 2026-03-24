const express = require("express");
const router = express.Router();
const controller = require("../controllers/formasPago.controller");

router.get("/", controller.getAllFormasPago);
router.get("/:id", controller.getFormaPagoById);
router.post("/", controller.createFormaPago);
router.put("/:id", controller.updateFormaPago);
router.delete("/:id", controller.deleteFormaPago);

module.exports = router;