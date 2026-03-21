const express = require("express");
const router = express.Router();

const {
  getTiposServicio,
  getTipoServicioById,
  createTipoServicio,
  updateTipoServicio,
  deleteTipoServicio,
} = require("../controllers/tipoServicioController");

router.get("/", getTiposServicio);
router.get("/:id", getTipoServicioById);
router.post("/", createTipoServicio);
router.put("/:id", updateTipoServicio);
router.delete("/:id", deleteTipoServicio);

module.exports = router;