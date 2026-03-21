const express = require("express");
const router = express.Router();

const {
  getCombustiblesVehiculo,
  getCombustibleVehiculoById,
  createCombustibleVehiculo,
  updateCombustibleVehiculo,
  deleteCombustibleVehiculo,
} = require("../controllers/combustibleVehiculoController");

router.get("/", getCombustiblesVehiculo);
router.get("/:id", getCombustibleVehiculoById);
router.post("/", createCombustibleVehiculo);
router.put("/:id", updateCombustibleVehiculo);
router.delete("/:id", deleteCombustibleVehiculo);

module.exports = router;