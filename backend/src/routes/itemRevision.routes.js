const express = require("express");
const router = express.Router();

const {
  getItemsRevision,
  getItemRevisionById,
  createItemRevision,
  updateItemRevision,
  deleteItemRevision,
} = require("../controllers/itemRevisionController");

router.get("/", getItemsRevision);
router.get("/:id", getItemRevisionById);
router.post("/", createItemRevision);
router.put("/:id", updateItemRevision);
router.delete("/:id", deleteItemRevision);

module.exports = router;