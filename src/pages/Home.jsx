import { useState, useMemo } from "react";
import HeroBanner from "../components/HeroBanner";
import SearchFilter from "../components/SearchFilter";
import PostCard from "../components/PostCard";
import { mockPosts } from "../data/mockData";

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = useMemo(() => {
    return mockPosts.filter((post) => {
      const matchesSearch = post.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <div>
      <HeroBanner />
      <SearchFilter
        search={search}
        setSearch={setSearch}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <section className="max-w-6xl mx-auto px-6 pb-20">
        {filteredPosts.length === 0 ? (
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
    </div>
  );
}
