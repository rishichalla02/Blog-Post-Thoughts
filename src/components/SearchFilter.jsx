import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { categories } from "../data/mockData";
import api from "../api/axios";

export default function SearchFilter({
  search,
  setSearch,
  activeCategory,
  setActiveCategory,
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (search.trim().length < 3) {
      setSuggestions([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        const { data } = await api.get("/blogs/suggestions", {
          params: { q: search },
        });
        setSuggestions(data);
      } catch (err) {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [search]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectSuggestion = (post) => {
    navigate(`/blog/${post._id}`);
    setShowSuggestions(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between pb-10">
      <div ref={wrapperRef} className="relative w-full md:w-80">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/40 dark:text-paper/40 pointer-events-none"
        />
        <input
          type="text"
          placeholder="Search articles or authors..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          className="w-full pl-10 pr-9 py-2 rounded-md border border-ink/15 dark:border-paper/15 bg-white dark:bg-ink/40 text-ink dark:text-paper focus:outline-none focus:ring-2 focus:ring-cobalt/40 transition-colors duration-200"
        />
        {search && (
          <button
            onClick={() => {
              setSearch("");
              setSuggestions([]);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 dark:text-paper/40 hover:text-ink/70 dark:hover:text-paper/70"
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}

        <AnimatePresence>
          {showSuggestions && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full mt-1.5 w-full bg-white dark:bg-ink border border-ink/10 dark:border-paper/10 rounded-md shadow-lg overflow-hidden z-50"
            >
              {suggestions.map((post) => (
                <button
                  key={post._id}
                  onClick={() => handleSelectSuggestion(post)}
                  className="w-full text-left px-4 py-2.5 hover:bg-ink/5 dark:hover:bg-paper/10 transition-colors duration-150"
                >
                  <p className="text-sm font-medium truncate">{post.title}</p>
                  <p className="text-xs text-ink/50 dark:text-paper/50 font-mono">
                    by {post.author?.name}
                  </p>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
              activeCategory === cat
                ? "bg-cobalt dark:bg-mustard text-paper dark:text-ink"
                : "bg-ink/5 dark:bg-paper/10 text-ink/70 dark:text-paper/70 hover:bg-ink/10 dark:hover:bg-paper/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
