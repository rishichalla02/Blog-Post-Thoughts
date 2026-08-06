import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  const date = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link to={`/post/${post._id}`} className="group block">
      <div className="aspect-[4/3] overflow-hidden rounded-lg bg-ink/5">
        <img
          src={post.thumbnail}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="mt-4">
        <span className="font-mono text-xs uppercase tracking-wide text-cobalt">
          {post.category}
        </span>
        <h3 className="font-display text-xl font-600 mt-1 group-hover:text-cobalt transition-colors">
          {post.title}
        </h3>
        <p className="text-sm text-ink/60 mt-2 line-clamp-2">{post.content}</p>
        <div className="flex items-center gap-2 mt-3 text-xs text-ink/50 font-mono">
          <span>{post.author.name}</span>
          <span>·</span>
          <span>{date}</span>
        </div>
      </div>
    </Link>
  );
}
