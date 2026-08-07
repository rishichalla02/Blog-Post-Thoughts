import { useState, useMemo, useEffect } from "react";
import HeroBanner from "../components/HeroBanner";
import SearchFilter from "../components/SearchFilter";
import PostCard from "../components/PostCard";
import AnimatedPage from "../components/AnimatedPage";
import api from "../api/axios";

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await api.get("/blogs");
        setPosts(data);
      } catch (err) {
        setError("Could not load posts. Is the backend running?");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch = post.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory, posts]);

  return (
    <AnimatedPage>
      <HeroBanner />
      <SearchFilter
        search={search}
        setSearch={setSearch}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <section className="max-w-6xl mx-auto px-6 pb-20 min-h-[200px]">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-cobalt border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <p className="text-red-600 font-mono text-sm">{error}</p>
        ) : filteredPosts.length === 0 ? (
          <p className="text-ink/50 font-mono text-sm">
            No articles match your search.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {filteredPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </section>
    </AnimatedPage>
  );
}
