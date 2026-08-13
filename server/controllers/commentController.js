const asyncHandler = require("express-async-handler");
const Comment = require("../models/Comment");
const Blog = require("../models/Blog");

// GET /api/comments/:postId (public)
exports.getCommentsByPost = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId })
    .populate("author", "name avatar")
    .sort({ createdAt: -1 });
  res.status(200).json(comments);
});

// POST /api/comments/:postId (protected)
exports.createComment = asyncHandler(async (req, res) => {
  const { text } = req.body;

  if (!text || !text.trim()) {
    res.status(400);
    throw new Error("Comment text is required");
  }

  const blog = await Blog.findById(req.params.postId);
  if (!blog) {
    res.status(404);
    throw new Error("Post not found");
  }

  const comment = await Comment.create({
    text: text.trim(),
    post: req.params.postId,
    author: req.user.id,
  });

  const populated = await comment.populate("author", "name avatar");
  res.status(201).json(populated);
});

// DELETE /api/comments/:id (protected, comment author only)
exports.deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }

  if (comment.author.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized to delete this comment");
  }

  await comment.deleteOne();
  res.status(200).json({ message: "Comment deleted" });
});
