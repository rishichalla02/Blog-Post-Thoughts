import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { categories } from "../data/mockData";

export default function CreateBlog() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    category: categories[1],
    thumbnail: "",
    content: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      _id: Date.now().toString(),
      ...form,
      author: { _id: user?._id, name: user?.name },
      createdAt: new Date().toISOString(),
    };
    console.log("Publish payload (ready for POST /api/posts):", newPost);
    navigate("/dashboard");
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="font-display text-3xl font-700 mb-8">Write a new post</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1.5">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-md border border-ink/15 bg-white focus:outline-none focus:ring-2 focus:ring-cobalt/40"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-md border border-ink/15 bg-white focus:outline-none focus:ring-2 focus:ring-cobalt/40"
          >
            {categories
              .filter((c) => c !== "All")
              .map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">
            Thumbnail image URL
          </label>
          <input
            type="url"
            name="thumbnail"
            value={form.thumbnail}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full px-4 py-2.5 rounded-md border border-ink/15 bg-white focus:outline-none focus:ring-2 focus:ring-cobalt/40"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Content</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows={10}
            className="w-full px-4 py-2.5 rounded-md border border-ink/15 bg-white focus:outline-none focus:ring-2 focus:ring-cobalt/40"
          />
        </div>

        <button
          type="submit"
          className="bg-cobalt text-paper px-6 py-2.5 rounded-md font-medium hover:bg-cobalt/90"
        >
          Publish
        </button>
      </form>
    </div>
  );
}
