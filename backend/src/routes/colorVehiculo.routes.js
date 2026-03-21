const express = require("express");
const router = express.Router();

const {
  getColoresVehiculo,
  getColorVehiculoById,
  createColorVehiculo,
  updateColorVehiculo,
  deleteColorVehiculo,
} = require("../controllers/colorVehiculoController");

router.get("/", getColoresVehiculo);
router.get("/:id", getColorVehiculoById);
router.post("/", createColorVehiculo);
router.put("/:id", updateColorVehiculo);
router.delete("/:id", deleteColorVehiculo);

module.exports = router;