const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();
const { fetchAllPosts, createPost, deletePost, editPost, fetchPost } = postController;
const { protect } = require("../middleware/authMiddleware");

router.get("/", fetchAllPosts);
router.get("/:id", fetchPost);
router.post("/new", protect, createPost);
router.delete("/:id", protect, deletePost);
router.patch("/edit/:id", protect, editPost);

module.exports = router;
