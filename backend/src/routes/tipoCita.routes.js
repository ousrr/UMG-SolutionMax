const express = require("express");
const router = express.Router();

const {
  getTiposCita,
  getTipoCitaById,
  createTipoCita,
  updateTipoCita,
  deleteTipoCita,
} = require("../controllers/tipoCitaController");

router.get("/", getTiposCita);
router.get("/:id", getTipoCitaById);
router.post("/", createTipoCita);
router.put("/:id", updateTipoCita);
router.delete("/:id", deleteTipoCita);

module.exports = router;