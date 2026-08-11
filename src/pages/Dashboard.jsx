import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import AnimatedPage from "../components/AnimatedPage";
import ConfirmModal from "../components/ConfirmModal";
import api from "../api/axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    if (!user) return;
    const fetchUserPosts = async () => {
      try {
        const { data } = await api.get("/blogs/user");
        setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserPosts();
  }, [user]);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await api.delete(`/blogs/${deleteTarget._id}`);
      setPosts((prev) => prev.filter((p) => p._id !== deleteTarget._id));
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteTarget(null);
    }
  };

  if (!user) {
    return (
      <AnimatedPage>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <p className="text-ink/60 dark:text-paper/60">
            Please log in to view your dashboard.
          </p>
          <Link
            to="/login"
            className="text-cobalt dark:text-mustard font-medium"
          >
            Go to login
          </Link>
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-center gap-4 mb-12">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h1 className="font-display text-2xl font-700">{user.name}</h1>
            <p className="text-ink/60 dark:text-paper/60 text-sm">
              {user.bio || "No bio yet."}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-600">Your posts</h2>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/create"
              className="bg-cobalt dark:bg-mustard text-paper dark:text-ink px-4 py-2 rounded-md text-sm font-medium hover:bg-cobalt/90 dark:hover:bg-mustard/90 transition-colors duration-200"
            >
              New post
            </Link>
          </motion.div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-2 border-cobalt border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="divide-y divide-ink/10 dark:divide-paper/10 border-t border-b border-ink/10 dark:border-paper/10">
            <AnimatePresence>
              {posts.length === 0 ? (
                <p className="text-ink/50 dark:text-paper/50 py-6 font-mono text-sm">
                  You haven't published anything yet.
                </p>
              ) : (
                posts.map((post) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center justify-between py-4"
                  >
                    <div>
                      <Link
                        to={`/blog/${post._id}`}
                        className="font-medium hover:text-cobalt dark:hover:text-mustard transition-colors duration-200"
                      >
                        {post.title}
                      </Link>
                      <div>
                        <span className="font-mono text-xs text-ink/50 dark:text-paper/50">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => navigate(`/edit/${post._id}`)}
                        className="text-sm text-cobalt dark:text-mustard font-medium hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteTarget(post)}
                        className="text-sm text-red-600 dark:text-red-400 font-medium hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete this post?"
        message={`"${deleteTarget?.title}" will be permanently removed. This can't be undone.`}
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </AnimatedPage>
  );
}
