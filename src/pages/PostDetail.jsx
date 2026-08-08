import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedPage from "../components/AnimatedPage";
import api from "../api/axios";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        <div className="max-w-2xl mx-auto px-6 py-32 text-center">
          <p className="text-ink/60 mb-4">{error || "Post not found."}</p>
          <Link to="/" className="text-cobalt font-medium">
            Back to home
          </Link>
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      <article className="max-w-3xl mx-auto px-6 py-16">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-mono text-xs uppercase tracking-wide text-cobalt"
        >
          {post.category}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-display text-4xl md:text-5xl font-700 leading-tight mt-3"
        >
          {post.title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex items-center gap-3 mt-6 text-sm text-ink/60 font-mono"
        >
          <img
            src={post.author?.avatar}
            alt={post.author?.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span>{post.author?.name}</span>
          <span>·</span>
          <span>{date}</span>
        </motion.div>

        {post.thumbnail && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 rounded-lg overflow-hidden aspect-[16/9]"
          >
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        <div className="prose prose-lg max-w-none mt-10 text-ink/80 dark:text-paper/80 leading-relaxed whitespace-pre-line">
          {post.content}
        </div>

        <div className="mt-16 pt-6 border-t border-ink/10">
          <Link
            to="/"
            className="text-sm text-cobalt dark:text-mustard font-medium hover:underline"
          >
            ← Back to all posts
          </Link>
        </div>
      </article>
    </AnimatedPage>
  );
}
