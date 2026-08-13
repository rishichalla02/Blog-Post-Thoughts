import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

const PAGE_SIZE = 3;

export default function CommentSection({ postId }) {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [page, setPage] = useState(0);

  const fetchComments = async () => {
    try {
      const { data } = await api.get(`/comments/${postId}`);
      setComments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setSubmitting(true);
    try {
      const { data } = await api.post(`/comments/${postId}`, { text });
      setComments((prev) => [data, ...prev]);
      setText("");
      setPage(0);
      toast.success("Comment posted");
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not post comment");
    } finally {
      setSubmitting(false);
    }
  };

  const totalPages = Math.ceil(comments.length / PAGE_SIZE);
  const visibleComments = comments.slice(
    page * PAGE_SIZE,
    page * PAGE_SIZE + PAGE_SIZE,
  );

  const goPrev = () => setPage((p) => Math.max(0, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  return (
    <section className="mt-16 pt-10 border-t border-ink/10 dark:border-paper/10">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle size={18} className="text-ink/60 dark:text-paper/60" />
        <h2 className="font-display text-xl font-600">
          {comments.length === 0
            ? "Comments"
            : `${comments.length} Comment${comments.length === 1 ? "" : "s"}`}
        </h2>
      </div>

      {user ? (
        <form onSubmit={handleSubmit} className="mb-10">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a comment..."
            rows={3}
            maxLength={500}
            className="w-full px-4 py-3 rounded-md border border-ink/15 dark:border-paper/15 bg-white dark:bg-ink/40 text-ink dark:text-paper focus:outline-none focus:ring-2 focus:ring-cobalt/40 transition-shadow duration-200 resize-none"
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-ink/40 dark:text-paper/40 font-mono">
              {text.length}/500
            </span>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={submitting || !text.trim()}
              className="bg-cobalt dark:bg-mustard text-paper dark:text-ink px-5 py-2 rounded-md text-sm font-medium hover:bg-cobalt/90 dark:hover:bg-mustard/90 disabled:opacity-50 transition-colors duration-200"
            >
              {submitting ? "Posting..." : "Post comment"}
            </motion.button>
          </div>
        </form>
      ) : (
        <p className="text-sm text-ink/60 dark:text-paper/60 mb-10">
          Log in to leave a comment.
        </p>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-10">
          <div className="w-6 h-6 border-2 border-cobalt border-t-transparent rounded-full animate-spin" />
        </div>
      ) : comments.length === 0 ? (
        <p className="text-sm text-ink/50 dark:text-paper/50 font-mono">
          No comments yet — be the first to say something.
        </p>
      ) : (
        <div className="relative">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              >
                {visibleComments.map((comment) => (
                  <div
                    key={comment._id}
                    className="bg-ink/[0.03] dark:bg-paper/[0.05] rounded-lg p-4 flex flex-col gap-3"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={comment.author?.avatar}
                        alt={comment.author?.name}
                        className="w-7 h-7 rounded-full object-cover shrink-0"
                      />
                      <span className="text-sm font-medium truncate">
                        {comment.author?.name}
                      </span>
                    </div>
                    <p className="text-sm text-ink/70 dark:text-paper/70 leading-relaxed break-words">
                      {comment.text}
                    </p>
                    <span className="text-xs text-ink/40 dark:text-paper/40 font-mono mt-auto">
                      {new Date(comment.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={goPrev}
                disabled={page === 0}
                aria-label="Previous comments"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-ink/5 dark:bg-paper/10 hover:bg-ink/10 dark:hover:bg-paper/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="text-xs text-ink/50 dark:text-paper/50 font-mono">
                {page + 1} / {totalPages}
              </span>
              <button
                onClick={goNext}
                disabled={page === totalPages - 1}
                aria-label="Next comments"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-ink/5 dark:bg-paper/10 hover:bg-ink/10 dark:hover:bg-paper/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
