import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import AnimatedPage from "../components/AnimatedPage";
import ConfirmModal from "../components/ConfirmModal";
import SEO from "../components/SEO";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await api.get(`/blogs/${id}`);
        setPost(data);
      } catch (err) {
        setError("This post could not be found.");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      await api.delete(`/blogs/${id}`);
      toast.success("Post deleted");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not delete post");
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  const date = post
    ? new Date(post.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  if (loading) {
    return (
      <AnimatedPage>
        <div className="flex items-center justify-center py-32">
          <div className="w-8 h-8 border-2 border-cobalt border-t-transparent rounded-full animate-spin" />
        </div>
      </AnimatedPage>
    );
  }

  if (error || !post) {
    return (
      <AnimatedPage>
        <SEO title="Post not found" />
        <div className="max-w-2xl mx-auto px-6 py-32 text-center">
          <p className="text-ink/60 dark:text-paper/60 mb-4">
            {error || "Post not found."}
          </p>
          <Link to="/" className="text-cobalt dark:text-mustard font-medium">
            Back to home
          </Link>
        </div>
      </AnimatedPage>
    );
  }

  const isAuthor = user && post.author?._id === user._id;

  return (
    <AnimatedPage>
      <SEO
        title={post.title}
        description={post.content?.slice(0, 150)}
        image={post.thumbnail}
        url={window.location.href}
      />
      <article className="max-w-3xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-mono text-xs uppercase tracking-wide text-cobalt dark:text-mustard"
          >
            {post.category}
          </motion.span>

          {isAuthor && (
            <div className="flex gap-4">
              <Link
                to={`/edit/${post._id}`}
                className="text-sm text-cobalt dark:text-mustard font-medium hover:underline"
              >
                Edit
              </Link>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="text-sm text-red-600 dark:text-red-400 font-medium hover:underline"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-display text-3xl sm:text-4xl md:text-5xl font-700 leading-tight mt-3 break-words"
        >
          {post.title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex items-center gap-3 mt-6 text-sm text-ink/60 dark:text-paper/60 font-mono"
        >
          <img
            src={post.author?.avatar}
            alt={post.author?.name}
            className="w-8 h-8 rounded-full object-cover shrink-0"
          />
          <span className="truncate">{post.author?.name}</span>
          <span>·</span>
          <span className="whitespace-nowrap">{date}</span>
        </motion.div>

        {post.thumbnail && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 rounded-lg overflow-hidden aspect-[16/9] bg-ink/5 dark:bg-paper/5"
          >
            <img
              src={post.thumbnail}
              alt={post.title}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        <div className="prose prose-lg max-w-none mt-10 text-ink/80 dark:text-paper/80 leading-relaxed whitespace-pre-line break-words">
          {post.content}
        </div>

        <div className="mt-16 pt-6 border-t border-ink/10 dark:border-paper/10">
          <Link
            to="/"
            className="text-sm text-cobalt dark:text-mustard font-medium hover:underline"
          >
            ← Back to all posts
          </Link>
        </div>
      </article>

      <ConfirmModal
        open={showDeleteConfirm}
        title="Delete this post?"
        message="This will permanently remove the post. This can't be undone."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </AnimatedPage>
  );
}
