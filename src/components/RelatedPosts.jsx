import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function RelatedPosts({ category, excludeId }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const { data } = await api.get("/blogs", { params: { category } });
        setPosts(data.filter((p) => p._id !== excludeId).slice(0, 3));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRelated();
  }, [category, excludeId]);

  if (loading || posts.length === 0) return null;

  return (
    <section className="mt-16 pt-10 border-t border-ink/10 dark:border-paper/10">
      <h2 className="font-display text-xl font-600 mb-6">More in {category}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post._id} to={`/blog/${post._id}`} className="group block">
            <div className="aspect-[4/3] overflow-hidden rounded-lg bg-ink/5 dark:bg-paper/5">
              <img
                src={post.thumbnail}
                alt={post.title}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/800x600/1C1B19/F7F3EC?text=No+Image";
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="font-display text-base font-600 mt-3 group-hover:text-cobalt dark:group-hover:text-mustard transition-colors duration-300 line-clamp-2">
              {post.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
