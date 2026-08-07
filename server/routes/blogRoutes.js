const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  createBlog,
  getAllBlogs,
  getUserBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

router.get("/", getAllBlogs);
router.get("/user", protect, getUserBlogs);
router.get("/:id", getBlogById);
router.post("/", protect, createBlog);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);

module.exports = router;
