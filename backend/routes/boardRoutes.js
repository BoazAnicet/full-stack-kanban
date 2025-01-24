const express = require("express");
const router = express.Router();
const boardController = require("../controllers/boardController");
const { fetchAllBoards, createBoard, fetchBoard, editBoard, deleteBoard } = boardController;
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, fetchAllBoards);
router.get("/:id", protect, fetchBoard);
router.post("/", protect, createBoard);
router.patch("/:id", protect, editBoard);
router.delete("/:id", protect, deleteBoard);

module.exports = router;
