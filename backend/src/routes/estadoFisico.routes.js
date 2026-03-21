const express = require("express");
const router = express.Router();

const {
  getEstadosFisicos,
  getEstadoFisicoById,
  createEstadoFisico,
  updateEstadoFisico,
  deleteEstadoFisico,
} = require("../controllers/estadoFisicoController");

router.get("/", getEstadosFisicos);
router.get("/:id", getEstadoFisicoById);
router.post("/", createEstadoFisico);
router.put("/:id", updateEstadoFisico);
router.delete("/:id", deleteEstadoFisico);

module.exports = router;