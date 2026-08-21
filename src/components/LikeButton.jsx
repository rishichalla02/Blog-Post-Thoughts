import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

export default function LikeButton({
  postId,
  initialLikes = 0,
  initialLiked = false,
}) {
  const { user } = useAuth();
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(initialLiked);
  const [busy, setBusy] = useState(false);

  const handleClick = async () => {
    if (!user) {
      toast.error("Log in to like posts");
      return;
    }
    if (busy) return;

    setBusy(true);
    // optimistic update
    setLiked((prev) => !prev);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));

    try {
      const { data } = await api.put(`/blogs/${postId}/like`);
      setLikes(data.likes);
      setLiked(data.liked);
    } catch (err) {
      // revert on failure
      setLiked((prev) => !prev);
      setLikes((prev) => (liked ? prev + 1 : prev - 1));
      toast.error(err.response?.data?.message || "Could not update like");
    } finally {
      setBusy(false);
    }
  };

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      className="flex items-center gap-1.5 text-sm font-medium text-ink/60 dark:text-paper/60 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200"
      aria-label={liked ? "Unlike post" : "Like post"}
    >
      <motion.span
        animate={liked ? { scale: [1, 1.3, 1] } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Heart
          size={18}
          fill={liked ? "currentColor" : "none"}
          className={liked ? "text-red-500 dark:text-red-400" : ""}
        />
      </motion.span>
      {likes}
    </motion.button>
  );
}
