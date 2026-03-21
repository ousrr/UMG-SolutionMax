const express = require("express");
const router = express.Router();

const {
  getSistemasVehiculo,
  getSistemaVehiculoById,
  createSistemaVehiculo,
  updateSistemaVehiculo,
  deleteSistemaVehiculo,
} = require("../controllers/sistemaVehiculoController");

router.get("/", getSistemasVehiculo);
router.get("/:id", getSistemaVehiculoById);
router.post("/", createSistemaVehiculo);
router.put("/:id", updateSistemaVehiculo);
router.delete("/:id", deleteSistemaVehiculo);

module.exports = router;