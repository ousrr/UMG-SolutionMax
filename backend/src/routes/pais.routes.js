const express = require("express");
const router = express.Router();

const {
  getPaises,
  getPaisById,
  createPais,
  updatePais,
  deletePais,
} = require("../controllers/paisController");

router.get("/", getPaises);
router.get("/:id", getPaisById);
router.post("/", createPais);
router.put("/:id", updatePais);
router.delete("/:id", deletePais);

module.exports = router;