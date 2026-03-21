const express = require("express");
const router = express.Router();

const {
  getEstadosCita,
  getEstadoCitaById,
  createEstadoCita,
  updateEstadoCita,
  deleteEstadoCita,
} = require("../controllers/estadoCitaController");

router.get("/", getEstadosCita);
router.get("/:id", getEstadoCitaById);
router.post("/", createEstadoCita);
router.put("/:id", updateEstadoCita);
router.delete("/:id", deleteEstadoCita);

module.exports = router;