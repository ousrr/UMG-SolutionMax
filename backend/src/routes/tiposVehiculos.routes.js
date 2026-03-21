const express = require("express");
const router = express.Router();

const {
  getTiposVehiculos,
  getTipoVehiculoById,
  createTipoVehiculo,
  updateTipoVehiculo,
  deleteTipoVehiculo,
} = require("../controllers/tiposVehiculosController");

router.get("/", getTiposVehiculos);
router.get("/:id", getTipoVehiculoById);
router.post("/", createTipoVehiculo);
router.put("/:id", updateTipoVehiculo);
router.delete("/:id", deleteTipoVehiculo);

module.exports = router;