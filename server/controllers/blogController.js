const asyncHandler = require("express-async-handler");
const Blog = require("../models/Blog");

exports.createBlog = asyncHandler(async (req, res) => {
  const { title, category, thumbnail, content } = req.body;

  if (!title || !category || !content) {
    res.status(400);
    throw new Error("Title, category and content are required");
  }

  const blog = await Blog.create({
    title,
    category,
    thumbnail,
    content,
    author: req.user.id,
  });
  const populated = await blog.populate("author", "name email avatar");
  res.status(201).json(populated);
});

exports.getAllBlogs = asyncHandler(async (req, res) => {
  const { search, category } = req.query;
  const query = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
    ];
  }
  if (category && category !== "All") {
    query.category = category;
  }

  const blogs = await Blog.find(query)
    .populate("author", "name email avatar")
    .sort({ createdAt: -1 });
  res.status(200).json(blogs);
});

exports.getMyBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({ author: req.user.id })
    .populate("author", "name email avatar")
    .sort({ createdAt: -1 });
  res.status(200).json(blogs);
});

exports.getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate(
    "author",
    "name email avatar",
  );
  if (!blog) {
    res.status(404);
    throw new Error("Post not found");
  }
  res.status(200).json(blog);
});

exports.updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error("Post not found");
  }
  if (blog.author.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized to edit this post");
  }

  const { title, category, thumbnail, content } = req.body;
  if (!title || !category || !content) {
    res.status(400);
    throw new Error("Title, category and content are required");
  }

  blog.title = title;
  blog.category = category;
  blog.thumbnail = thumbnail ?? blog.thumbnail;
  blog.content = content;

  const updated = await blog.save();
  const populated = await updated.populate("author", "name email avatar");
  res.status(200).json(populated);
});

exports.deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error("Post not found");
  }
  if (blog.author.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized to delete this post");
  }

  await blog.deleteOne();
  res.status(200).json({ message: "Post deleted" });
});
