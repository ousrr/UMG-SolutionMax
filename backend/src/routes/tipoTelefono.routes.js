const express = require("express");
const router = express.Router();

const {
  getTiposTelefono,
  getTipoTelefonoById,
  createTipoTelefono,
  updateTipoTelefono,
  deleteTipoTelefono,
} = require("../controllers/tipoTelefonoController");

router.get("/", getTiposTelefono);
router.get("/:id", getTipoTelefonoById);
router.post("/", createTipoTelefono);
router.put("/:id", updateTipoTelefono);
router.delete("/:id", deleteTipoTelefono);

module.exports = router;