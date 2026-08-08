const Blog = require("../models/Blog");

// POST /api/blogs (protected)
exports.createBlog = async (req, res) => {
  try {
    const { title, category, thumbnail, content } = req.body;

    if (!title || !category || !content) {
      return res
        .status(400)
        .json({ message: "Title, category and content are required" });
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
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET /api/blogs (public)
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name email avatar")
      .sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET /api/blogs/user (protected)
exports.getUserBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user.id })
      .populate("author", "name email avatar")
      .sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// PUT /api/blogs/:id (protected)
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (blog.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to edit this post" });
    }

    const { title, category, thumbnail, content } = req.body;
    blog.title = title ?? blog.title;
    blog.category = category ?? blog.category;
    blog.thumbnail = thumbnail ?? blog.thumbnail;
    blog.content = content ?? blog.content;

    const updated = await blog.save();
    const populated = await updated.populate("author", "name email avatar");
    res.status(200).json(populated);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET /api/blogs/:id (public)
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "name email avatar",
    );

    if (!blog) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(blog);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// DELETE /api/blogs/:id (protected)
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (blog.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this post" });
    }

    await blog.deleteOne();
    res.status(200).json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
