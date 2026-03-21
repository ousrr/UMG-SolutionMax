const express = require("express");
const router = express.Router();

const {
  getMarcasVehiculo,
  getMarcaVehiculoById,
  createMarcaVehiculo,
  updateMarcaVehiculo,
  deleteMarcaVehiculo,
} = require("../controllers/marcaVehiculoController");

router.get("/", getMarcasVehiculo);
router.get("/:id", getMarcaVehiculoById);
router.post("/", createMarcaVehiculo);
router.put("/:id", updateMarcaVehiculo);
router.delete("/:id", deleteMarcaVehiculo);

module.exports = router;