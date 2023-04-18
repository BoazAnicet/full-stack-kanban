const express = require("express");
const router = express.Router();
const { createTemplate } = require("../controllers/templateController");
const { protect } = require("../middleware/authMiddleware");

// router.get("/", protect, fetchAllBoards);
// router.get("/:id", protect, fetchBoard);
router.post("/", createTemplate);
// router.post("/", protect, createTemplate);
// router.patch("/:id", protect, editBoard);
// router.delete("/:id", protect, deleteBoard);

module.exports = router;
