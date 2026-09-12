const asyncHandler = require("express-async-handler");
const Blog = require("../models/Blog");
const User = require("../models/User");

exports.createBlog = asyncHandler(async (req, res) => {
  const { title, category, tags, thumbnail, content } = req.body;

  if (!title || !category || !content) {
    res.status(400);
    throw new Error("Title, category and content are required");
  }

  const blog = await Blog.create({
    title,
    category,
    tags: Array.isArray(tags) ? tags : [],
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
    const matchingUsers = await User.find({
      name: { $regex: search, $options: "i" },
    }).select("_id");
    const userIds = matchingUsers.map((u) => u._id);

    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
      { author: { $in: userIds } },
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

  const { title, category, tags, thumbnail, content } = req.body;
  if (!title || !category || !content) {
    res.status(400);
    throw new Error("Title, category and content are required");
  }

  blog.title = title;
  blog.category = category;
  blog.tags = Array.isArray(tags) ? tags : blog.tags;
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

// PUT /api/blogs/:id/like (protected)
exports.toggleLike = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error("Post not found");
  }

  const alreadyLiked = blog.likes.some((id) => id.toString() === req.user.id);

  if (alreadyLiked) {
    blog.likes = blog.likes.filter((id) => id.toString() !== req.user.id);
  } else {
    blog.likes.push(req.user.id);
  }

  await blog.save();
  res.status(200).json({ likes: blog.likes.length, liked: !alreadyLiked });
});

// GET /api/blogs/suggestions?q= (public)
exports.getSuggestions = asyncHandler(async (req, res) => {
  const { q } = req.query;

  if (!q || q.trim().length < 3) {
    return res.status(200).json([]);
  }

  const matchingUsers = await User.find({
    name: { $regex: q, $options: "i" },
  }).select("_id");
  const userIds = matchingUsers.map((u) => u._id);

  const blogs = await Blog.find({
    $or: [
      { title: { $regex: q, $options: "i" } },
      { author: { $in: userIds } },
    ],
  })
    .populate("author", "name")
    .select("title author")
    .limit(5);

  res.status(200).json(blogs);
});
