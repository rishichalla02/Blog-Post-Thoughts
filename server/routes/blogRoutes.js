const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  createBlog,
  getAllBlogs,
  getMyBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  toggleLike,
} = require("../controllers/blogController");

router.get("/", getAllBlogs);
router.get("/my-blogs", protect, getMyBlogs);
router.get("/:id", getBlogById);
router.post("/", protect, createBlog);
router.put("/:id", protect, updateBlog);
router.put("/:id/like", protect, toggleLike);
router.delete("/:id", protect, deleteBlog);

module.exports = router;
