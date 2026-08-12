import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { categories } from "../data/mockData";
import AnimatedPage from "../components/AnimatedPage";
import api from "../api/axios";
import SEO from "../components/SEO";
import toast from "react-hot-toast";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    category: categories[1],
    thumbnail: "",
    content: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await api.get(`/blogs/${id}`);
        setForm({
          title: data.title,
          category: data.category,
          thumbnail: data.thumbnail,
          content: data.content,
        });
      } catch (err) {
        setError("Could not load this post.");
      } finally {
        setFetching(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.title || !form.content) {
      setError("Title and content are required.");
      return;
    }
    setLoading(true);
    try {
      await api.put(`/blogs/${id}`, form);
      toast.success("Post updated!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not update post.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <AnimatedPage>
        <div className="flex items-center justify-center py-32">
          <div className="w-8 h-8 border-2 border-cobalt border-t-transparent rounded-full animate-spin" />
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      <SEO title="Edit Post" />
      <div className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="font-display text-3xl font-700 mb-8">Edit post</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-md border border-black dark:border-white bg-white dark:bg-ink/40 text-ink dark:text-paper focus:outline-none focus:ring-2 focus:ring-cobalt/40 transition-shadow duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-md border border-black dark:border-white bg-white dark:bg-ink/40 text-ink dark:text-paper focus:outline-none focus:ring-2 focus:ring-cobalt/40 transition-shadow duration-200"
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
              className="w-full px-4 py-2.5 rounded-md border border-black dark:border-white bg-white dark:bg-ink/40 text-ink dark:text-paper focus:outline-none focus:ring-2 focus:ring-cobalt/40 transition-shadow duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Content</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={10}
              className="w-full px-4 py-2.5 rounded-md border border-black dark:border-white bg-white dark:bg-ink/40 text-ink dark:text-paper focus:outline-none focus:ring-2 focus:ring-cobalt/40 transition-shadow duration-200"
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-600"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="bg-cobalt dark:bg-mustard text-paper dark:text-ink px-6 py-2.5 rounded-md font-medium hover:bg-cobalt/90 dark:hover:bg-mustard/90 disabled:opacity-60 transition-colors duration-200"
          >
            {loading ? "Saving..." : "Save changes"}
          </motion.button>
        </form>
      </div>
    </AnimatedPage>
  );
}
