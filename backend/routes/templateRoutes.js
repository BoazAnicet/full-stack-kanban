const express = require("express");
const router = express.Router();
const {
  createTemplate,
  fetchAllTemplates,
} = require("../controllers/templateController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, fetchAllTemplates);
// router.get("/:id", protect, fetchBoard);
router.post("/", createTemplate);
// router.post("/", protect, createTemplate);
// router.patch("/:id", protect, editBoard);
// router.delete("/:id", protect, deleteBoard);

module.exports = router;
