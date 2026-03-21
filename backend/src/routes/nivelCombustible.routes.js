const express = require("express");
const router = express.Router();

const {
  getNivelesCombustible,
  getNivelCombustibleById,
  createNivelCombustible,
  updateNivelCombustible,
  deleteNivelCombustible,
} = require("../controllers/nivelCombustibleController");

router.get("/", getNivelesCombustible);
router.get("/:id", getNivelCombustibleById);
router.post("/", createNivelCombustible);
router.put("/:id", updateNivelCombustible);
router.delete("/:id", deleteNivelCombustible);

module.exports = router;