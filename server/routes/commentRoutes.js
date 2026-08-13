const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  getCommentsByPost,
  createComment,
  deleteComment,
} = require("../controllers/commentController");

router.get("/:postId", getCommentsByPost);
router.post("/:postId", protect, createComment);
router.delete("/:id", protect, deleteComment);

module.exports = router;
