import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function PostCard({ post }) {
  const date = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-50, 50], [8, -8]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-50, 50], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Link to={`/blog/${post._id}`} className="group block">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformPerspective: 800 }}
        whileHover={{ scale: 1.03 }}
        className="aspect-[4/3] overflow-hidden rounded-lg bg-ink/5 shadow-md hover:shadow-xl transition-shadow duration-300"
      >
        <img
          src={post.thumbnail}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </motion.div>
      <div className="mt-4">
        <span className="font-mono bg-yellow-400 p-1 text-xs uppercase tracking-wide text-cobalt">
          {post.category}
        </span>
        <h3 className="font-display text-xl font-600 mt-1 group-hover:text-cobalt dark:group-hover:text-mustard transition-colors duration-300">
          {post.title}
        </h3>
        <p className="text-sm text-ink/60 dark:text-paper/60 mt-2 line-clamp-2">
          {post.content}
        </p>
        <div className="flex items-center gap-2 mt-3 text-xs text-ink/50 dark:text-paper/50 font-mono">
          <span>{post.author.name}</span>
          <span>·</span>
          <span>{date}</span>
        </div>
      </div>
    </Link>
  );
}
